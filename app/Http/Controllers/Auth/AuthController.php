<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use DB;
use Session;
use stdClass;
use App\Http\Controllers\BackEnd\HistoryControll;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class AuthController extends Controller
{
    protected $History;
    protected $DBMain;

    public function __construct(){
        $this->History = new HistoryControll();
        $this->DBMain = DB::connection('maindb_widatra');
        $this->middleware('guest:adminvue', ['except' => ['logout', 'getLogout']]);
    }

    public function register(Request $request) {
        $requestData = $request->all();

        DB::begintransaction();
        try{
            $this->DBMain->table('users')
            ->insert([
                'Code'=>Uuid::uuid1()->toString(),
                'IdEmployee'=>0,
                'UserName'=>random_int(820000000000,899999999999),
                'Password'=>Crypt::encrypt("admin"),
                'api_token'=>Crypt::encrypt("20laravuetreenear20"),
                'UserEntry'=>0
            ]);

            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return array('status'=>422,'message'=>'Register Failed');
        }

        return array('status'=>200,'message'=>'Register Success');
    }

    public function login(Request $request){

        $userName = $request->input('username');
        $password = $request->input('password');

        $item = $this->DBMain->table('users as usr')
        ->select(
            'usr.Id',
            'usr.UserName',
            'usr.Password'
        )
        ->where('usr.UserName', $userName)
        ->where('usr.Actived','>',0)
        ->first();


        if(!empty($item)){
            if(Crypt::decrypt($item->Password)===$password){

                $dataUser = $this->DBMain->table('employee as emp')
                ->select(
                    'usr.Id',
                    'emp.Name',
                    'emp.Photo',
                    'emp.Id as IdEmployee',
                    'emp.IdDepartment',
                    'usr.UserName',
                    'usrd.TypeUser'
                )
                ->join('city as cty','cty.Id','emp.IdCity')
                ->join('users as usr','usr.IdEmployee','emp.Id')
                ->join('users_detail as usrd','usrd.IdUsers','=','usr.Id')
                ->where('emp.Actived','>',0)
                ->where('usrd.Apps','Audit')
                ->where('usr.Id',$item->Id)
                ->first();
//                dd($dataUser);
                if(empty($dataUser)){
                    return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Data User Name Or Password Invalid!'], 422);
                }

                $accessMenu = DB::table('user_access')
                ->select(
                    'Action'
                )
                ->where('IdTypeUser',$dataUser->TypeUser)
                ->value('Action');
                session()->put('accessMenu', $accessMenu);

                $glossary = DB::table('glossary_of_terms')
                    ->select('Id','Terms','Description')
                    ->where('Actived','>',0)
                    ->limit(6)
                    ->get();
                
                $notification = DB::table('notification')
                    ->select('Id','Header','Message','Url')
                    ->where('Actived','>',0)
                    ->where('IsRead',0)
                    ->where('IdEmployee',$dataUser->IdEmployee)
                    ->get();

                $filterUser = new stdClass();
                $filterUser->EmpName = substr($dataUser->Name, 0, 16);
                $filterUser->Photo = $dataUser->Photo;
                $filterUser->UserName = $dataUser->UserName;
                $filterUser->IdEmployee = $dataUser->IdEmployee;
                $filterUser->accessMenu = $this->getAccessMenu($accessMenu);
                $filterUser->accessMenuDB = json_decode($accessMenu);
                $filterUser->glossary = $glossary;
                $filterUser->notification = $notification;

                if( !file_exists($dataUser->Photo) ){
                    $filterUser->Photo = 'clouds/backend/files/images/users/user-default.png';
                }

                $this->allowAccess(json_decode($accessMenu));
                session()->put('adminvue', $dataUser);
                $this->History->store(1,6,json_encode($dataUser));

                return response()->json(['status'=>200,'dataUser'=>$filterUser,'message'=>'Login Success']);
            }else{
                return response()->json(['status'=>422,'dataUser'=>null,'message'=>'User Name or Password Wrong!'], 422);
            }
        }

        return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Data User Name Invalid!'], 422);
    }

    public function logout(Request $request) {
        Auth::guard('adminvue')->logout();
        $request->session()->flush();
        $request->session()->regenerate();
        Session::flush();
    }

    public function restrictedPage() {
        return view('404')->render();
    }

    public function reAccessMenu(Request $request) {
        $accessMenu = session('accessMenu');
        $menu = $this->getAccessMenu($accessMenu);
        return response()->json(['status'=>200,'accessMenu'=>$menu,'message'=>'ReAccess Menu Success']);
    }

    public function getAccessMenu($accessMenu) {
        $path = base_path()."/public/clouds/menu.json";
        $jsonMenu = file_get_contents($path);
        $jsonTree = json_decode($jsonMenu);

        if(!empty($accessMenu)){
            $Action = json_decode($accessMenu);
            foreach($jsonTree as $key=>$val){
                $val->opened = true;
                $val->selected = false;
                $val->disabled = false;
                $val->loading = false;

                $key1 = array_search($val->id, array_column($Action, 'id'));
                if($key1 !== false){
                    $val->selected = $Action[$key1]->selected;
                }

                if(!empty($val->children)){
                    foreach($val->children as $k=>$v){
                        $v->opened = true;
                        $v->selected = false;
                        $v->disabled = false;
                        $v->loading = false;

                        $key2 = false;
                        if(isset($Action[$key1]->children))
                            $key2 = array_search($v->id, array_column($Action[$key1]->children, 'id'));
                        if($key2 !== false){
                            $v->selected = $Action[$key1]->children[$key2]->selected;
                        }

                        if(!empty($v->children)){
                            foreach($v->children as $i=>$value){
                                $value->opened = false;
                                $value->selected = false;
                                $value->disabled = false;
                                $value->loading = false;

                                $key3 = false;
                                if(isset($Action[$key1]->children[$key2]->children))
                                    $key3 = array_search($value->id, array_column($Action[$key1]->children[$key2]->children, 'id'));
                                if($key3 !== false){
                                    $value->selected = $Action[$key1]->children[$key2]->children[$key3]->selected;
                                }
                            }
                        }
                    }
                }
            }
        }

        return $jsonTree;
    }

    private function allowAccess($Menu) {
        $allowMenu['/AdminVue/check-token'] = true;
        $allowMenu['/RoleAdmin/main/dashboard'] = true;
        $allowMenu['/RoleAdmin/main/profile'] = true;
        $allowMenu['/RoleAdmin/main/form-profile'] = true;

        $path = base_path()."/public/clouds/menu.json";
        $jsonMenu = file_get_contents($path);
        $jsonMenu = json_decode($jsonMenu);

        foreach($Menu as $key=>$val){
            if( isset($val->selected) && $val->selected == true ) {
                $show = str_replace('data-', 'show-', $val->value);

                $allowMenu[$val->value] = true;
                $allowMenu[$show] = true;

                $key1 = array_search($val->id, array_column($jsonMenu, 'id'));
                if($key1 !== false){ if(isset($jsonMenu[$key1]->submenu) && !empty($jsonMenu[$key1]->submenu)) {
                    foreach ($jsonMenu[$key1]->submenu as $value) {
                        $type = isset($value->type) ? $value->type : '';
                        if($type=='show') $allowMenu[$value->value] = true;
                    }
                } }
            }

            if(!empty($val->children)){ foreach($val->children as $k=>$v){
                if( isset($v->selected) && $v->selected == true ) {
                    $show = str_replace('data-', 'show-', $v->value);

                    $allowMenu[$v->value] = true;
                    $allowMenu[$show] = true;

                    $key2 = false;
                    if(isset($jsonMenu[$key1]->children))
                        $key2 = array_search($v->id, array_column($jsonMenu[$key1]->children, 'id'));
                    if($key2 !== false){ if(isset($jsonMenu[$key1]->children[$key2]->submenu) && !empty($jsonMenu[$key1]->children[$key2]->submenu)) {
                        foreach ($jsonMenu[$key1]->children[$key2]->submenu as $value) {
                            $type = isset($value->type) ? $value->type : '';
                            if($type=='show') $allowMenu[$value->value] = true;
                        }
                    } }
                }

                if(!empty($v->children)){ foreach($v->children as $i=>$val){
                    if( isset($val->selected) && $val->selected == true ) {
                        $show = str_replace('data-', 'show-', $val->value);

                        $allowMenu[$val->value] = true;
                        $allowMenu[$show] = true;

                        $key3 = false;
                        if(isset($jsonMenu[$key1]->children[$key2]->children))
                            $key3 = array_search($val->id, array_column($jsonMenu[$key1]->children[$key2]->children, 'id'));
                        if($key3 !== false){
                        if(isset($jsonMenu[$key1]->children[$key2]->children[$key3]->submenu) && !empty($jsonMenu[$key1]->children[$key2]->children[$key3]->submenu)) {
                            foreach ($jsonMenu[$key1]->children[$key2]->children[$key3]->submenu as $value) {
                                $type = isset($value->type) ? $value->type : '';
                                if($type=='show') $allowMenu[$value->value] = true;
                            }
                        } }

                        if(!empty($val->children)){ foreach($val->children as $ii=>$vVal){
                            if( isset($vVal->selected) && $vVal->selected == true ) {
                                $allowMenu[$vVal->value] = true;
                            }
                        } }
                    }
                } }
            } }
        }
        session()->put('allow_menu', $allowMenu);
    }

    public function ForgotPassword(Request $request){
        $email = $request->input('email');

        $Employee = DB::table('employee')
            ->select('Id as IdEmployee','Email','Name')
            ->where('Actived','>',0)
            ->where('Email',$email)
            ->first();

        do {
            $AuthCode = mt_rand(10000, 99999);
            $isAuthCode = DB::table('forgot_password')
                ->where('Code', $AuthCode)
                ->count();
        } while ( $isAuthCode > 0);

        if(!empty($Employee)){
            DB::begintransaction();
            try{
               DB::table('forgot_password')
                ->insert([
                    'IdEmployee'=>$Employee->IdEmployee,
                    'Code'=>$AuthCode,
                    'Email'=>$Employee->Email,
                    'UserEntry'=>99
                ]);
                
                DB::commit();
            }catch(Exception $e){
                DB::rollback();
                return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Lupa Password Gagal!'], 422);    
            }

            $statusMail = $this->sendMail($email,$AuthCode,$Employee->Name);
            $Employee->AuthCode = $AuthCode;

            if($statusMail == true){
                return response()->json(['status'=>200,'dataUser'=>$Employee,'message'=>'Lupa Password Success']);
            }
        }else{
            return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Data Karyawan Tidak Ada!'], 422);
        }
    }

    public function VerificationCode(Request $request){
        $authcode = $request->input('codeauth');
        $IdEmployee = $request->input('IdEmployee');

        $CodeAuth = DB::table('forgot_password')
            ->select('Code')
            ->where('IdEmployee',$IdEmployee)
            ->orderby('Id','desc')
            ->first();

        if($authcode == $CodeAuth->Code){
            $filterUser = new stdClass();
            $filterUser->IdEmployee = $IdEmployee;
            return response()->json(['status'=>200,'dataUser'=>$filterUser,'message'=>'Verifikasi Kode Success']);
        }else{
            return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Kode Verifikasi Salah!'], 422);
        }
    }

    public function ResetPassword(Request $request){
        $IdEmployee = $request->input('IdEmployee');
        $newpassword = $request->input('newpassword');
        $newpasswordrepeat = $request->input('newpasswordrepeat');

        if($newpassword == $newpasswordrepeat){
            DB::begintransaction();
            try{
                DB::table('users')
                    ->where('IdEmployee', $request->input('IdEmployee'))
                    ->update([
                        'Password'=>Crypt::encrypt($request->input('newpassword')),
                        'api_token'=>Crypt::encrypt($request->input('newpassword')),
                    ]);

                DB::commit();
            }catch(Exception $e){
                DB::rollback();
                return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Update Password Gagal!'], 422);
            }

            return response()->json(['status'=>200,'dataUser'=>$IdEmployee,'message'=>'Update Password Success']);
        }else{
            return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Konfirmasi Password Tidak Sama Dengan Password Baru!'], 422);
        }
    }

    public function sendMail($email,$AuthCode,$Name){
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->SMTPDebug = 0; //SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->AuthType = 'LOGIN';
            $mail->Host       = 'mail.widatra.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'it.support@widatra.com';
            $mail->Password   = 'cinaterias';
            $mail->SMTPSecure = 'ssl';
            $mail->Port       = 587;

            //Recipients
            $mail->setFrom('it.support@widatra.com', 'Kode Verifikasi | do-not-reply');
            $mail->addAddress($email, $Name);

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Kode Verifikasi Reset Password';
            $mail->Body    = view('mail-code',compact('AuthCode'))->render();

            $mail->send();
            // echo 'Message has been sent';
        } catch (Exception $e) {
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            return false;
        }

        return true;
    }
}
