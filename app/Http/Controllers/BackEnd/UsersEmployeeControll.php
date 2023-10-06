<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use Ramsey\Uuid\Uuid;
use Crypt;

class UsersEmployeeControll extends Controller
{
    protected $UploadFile;
    protected $AppWeb;
    protected $History;
//    protected $DBMain;

    public function __construct() {
    	$this->UploadFile = new UploadFileControll();
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
//        $this->DBMain = DB::connection('wdb_auditsys');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('employee as emp')
            ->select(
                'emp.Id as id',
                'dpt.Department as Departement',
                'emp.Name',
                'usr.UserName as Username',
                'tyu.Name as TypeUser',
                'emp.UpdateAt'
            )
            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->leftJoin('type_user as tyu','tyu.Id','=','usrd.TypeUser')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->orderBy($field, $dir)
            ->where('usrd.Apps','Audit')
            ->where('emp.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function show(Request $request)
    {
        $item = DB::table('employee as emp')
            ->select(
                'emp.*',
                'dpt.Department as Departement',
                'pst.Name as Position',
                'cty.Name as City',
                'usr.UserName',
                'tyu.Name as TypeUser',
                'usr.UserName',
                'usr.Password'
            )
            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->leftJoin('type_user as tyu','tyu.Id','=','usrd.TypeUser')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('city as cty','cty.Id','=','emp.IdCity')
            ->where('emp.Actived',1)
            ->where('emp.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->DateBirth = Carbon::parse($item->DateBirth)->format('d/m/Y');
            $item->Password = Crypt::decrypt($item->Password);
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));

    }

    public function getDepartment(Request $request)
    {
        $item = DB::table('position as pst')
            ->select(
                'pst.Id as IdPosition',
                'Name as Position',
                'pst.IdDepartment',
                'dpt.Department'
            )
            ->join('department as dpt','dpt.Id','=','pst.IdDepartment')
            ->where('pst.Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getTypeUser(Request $request)
    {
        $item = DB::table('type_user')
            ->select('Id','Name as TypeUser')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getCity(Request $request)
    {
        $item = DB::table('city')
            ->select('Id','Name as City')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function store(Request $request) {
    	$requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMaster('employee','Name',$request->input('Name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Nama Karyawan Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMaster('employee','NIP',$request->input('NIP'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data NIP Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMaster('users','UserName',$request->input('UserName'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data User Name Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $IdEmp = DB::table('employee')
                ->insertGetId([
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdPosition'=>$request->input('IdPosition'),
                    'Name'=>$request->input('Name'),
                    'NIP'=>$request->input('NIP'),
                    // 'DateBirth'=>$request->input('DateBirth'),
                    // 'CellPhone'=>$request->input('CellPhone'),
                    // 'HomePhone'=>$request->input('HomePhone'),
                    'IdCity'=>223,
                    'Email'=>$request->input('Email'),
                    // 'Address'=>$request->input('Address'),
                    // 'Bio'=>$request->input('Bio'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $IdUser = DB::table('users')
                ->insertGetId([
                    'Code'=>Uuid::uuid1()->toString(),
                    'IdEmployee'=>$IdEmp,
                    'UserName'=>$request->input('UserName'),
                    'Password'=>Crypt::encrypt($request->input('Password')),
                    'api_token'=>Crypt::encrypt($request->input('Password')),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            DB::table('users_detail')
                ->insert([
                    'IdUsers'=>$IdUser,
                    'Apps'=>'Audit',
                    'TypeUser'=>$request->input('TypeUser'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(12,1,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Save Data Failed, Server Invalid!',
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Save Data Success!',
        ));
    }

    public function edit(Request $request)
    {
        $item = DB::table('employee as emp')
            ->select(
                'emp.*',
                'usrd.TypeUser as Type',
                'usr.UserName',
                'usr.Password',
                'dpt.Department as Department',
                'tyu.Name as TypeUser',
                'pst.Name as Position'
            )
            ->join('users as usr', 'usr.IdEmployee', '=', 'emp.Id')
            ->join('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->join('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->join('type_user as tyu','tyu.Id','=','usrd.TypeUser')
            ->where('emp.Actived',1)
            ->where('emp.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            foreach ($item as $key => $value) {
                 if($value==null) $item->$key = ''; 
            }
            $item->IdDepartment = ['IdDepartment'=>$item->IdDepartment, 'Department'=>$item->Department,'IdPosition'=>$item->IdPosition, 'Position'=>$item->Position];
            $item->Password = Crypt::decrypt($item->Password);
            $item->TypeUser = ['Id'=>$item->Type, 'TypeUser'=>$item->TypeUser];
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));

    }

    public function update(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $item = DB::table('employee as emp')
            ->select(
                'emp.Name',
                'emp.NIP',
                'usr.UserName',
                'usr.Id as IdUser'
            )
            ->join('users as usr', 'usr.IdEmployee', '=', 'emp.Id')
            ->where('emp.Actived',1)
            ->where('emp.Id',$request->input('Id'))
            ->first();

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataOneColMaster('employee','Name',$request->input('Name'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Nama Karyawan Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->NIP!=$request->input('NIP')) {
            $isExist = $this->AppWeb->checkDataOneColMaster('employee','NIP',$request->input('NIP'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data NIP Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->UserName!=$request->input('UserName')) {
            $isExist = $this->AppWeb->checkDataOneColMaster('users','UserName',$request->input('UserName'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data User Name Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('employee')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdPosition'=>$request->input('IdPosition'),
                    'Name'=>$request->input('Name'),
                    'NIP'=>$request->input('NIP'),
                    'Email'=>$request->input('Email')
                    // 'DateBirth'=>$request->input('DateBirth'),
                    // 'CellPhone'=>$request->input('CellPhone'),
                    // 'HomePhone'=>$request->input('HomePhone'),
                    // 'IdCity'=>$request->input('IdCity'),
                    // 'Address'=>$request->input('Address'),
                    // 'Bio'=>$request->input('Bio')
                ]);

            if($request->input('Password')){
                DB::table('users')
                    ->where('IdEmployee', $request->input('Id'))
                    ->update([
                        'Code'=>Uuid::uuid1()->toString(),
                        'UserName'=>$request->input('UserName'),
                        'Password'=>Crypt::encrypt($request->input('Password')),
                        'api_token'=>Crypt::encrypt($request->input('Password')),
                    ]);
            }else{
                DB::table('users')
                    ->where('IdEmployee', $request->input('Id'))
                    ->update([
                        'Code'=>Uuid::uuid1()->toString(),
                        'UserName'=>$request->input('UserName')
                    ]);
            }

            DB::table('users_detail')
                ->where('IdUsers', $item->IdUser)
                ->where('Apps', 'Audit')
                ->update([
                    'TypeUser'=>$request->input('TypeUser')
                ]);

            $this->History->store(12,2,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Save Data Failed, Server Invalid!',
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Save Data Success!',
        ));
    }

    public function delete(Request $request) {
        $item = DB::table('employee')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('employee')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('users')
                ->where('IdEmployee', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(12,3,json_encode($item));
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Invalid Server Side, Delete Data Failed!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Delete Data Success!',
        ));
    }

    function validation() {
        return [
            'IdDepartment'=>'required',
            'Name'=>'required',
            // 'IdCity'=>'required',
            // 'Address'=>'required',
            'UserName'=>'required',
            'TypeUser'=>'required',
        ];
    }
}
