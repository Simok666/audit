<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use Ramsey\Uuid\Uuid;
use Crypt;

class ProfileControll extends Controller
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
        $item = DB::table('users as usr')
            ->select(
                'usr.Id as id',
                'usr.Code',
                'usr.UserName',
                'emp.Name as EmpName',
                'emp.NIP',
                'emp.DateBirth',
                'emp.CellPhone',
                'emp.Address',
                'emp.Bio',
                'emp.Photo',
                'dpt.Department',
                'pst.Name as Position',
                'pst.JobDesk',
                'cty.Name as City',
                'ua.Action as accessMenuDB',
                'emp.UpdateAt'
            )
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('city as cty','cty.Id','=','emp.IdCity')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->leftjoin('user_access as ua','ua.IdTypeUser','=','usrd.TypeUser')
            ->where('ua.IdTypeUser', session('adminvue')->TypeUser)
            ->where('usr.Actived','>',0)
            ->where('usr.Id', session('adminvue')->Id)
            ->first();

        if( !file_exists($item->Photo) ){
            $item->Photo = 'clouds/backend/files/images/users/user-default.png';
        }

        if(!empty($item)){
            $item->DateBirth = Carbon::parse($item->DateBirth)->format('d/m/Y');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('l, d-m-Y H:i:s');
            $item->accessMenuDB = json_decode($item->accessMenuDB, true);
        }

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

    public function edit(Request $request)
    {
        $item =DB::table('users as usr')
            ->select(
                'usr.Id as id',
                'usr.Code',
                'emp.Name as EmpName',
                'emp.NIP',
                'emp.DateBirth',
                'emp.CellPhone',
                'emp.IdCity',
                'cty.Name as City',
                'emp.Address',
                'emp.Bio',
                'emp.Photo')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('city as cty','cty.Id','=','emp.IdCity')
            ->where('usr.Actived','>',0)
            ->where('usr.Id', $request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->IdCity = ['Id'=>$item->IdCity, 'City'=>$item->City];
        }

        if( !file_exists($item->Photo) ){
            $item->Photo = 'clouds/backend/files/images/users/user-default.png';
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));

    }

    public function update(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation());

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $dtUser =DB::table('users')
            ->select('IdEmployee','Password')
            ->where('Actived','>',0)
            ->where('Id', $request->input('Id'))
            ->first();

        $isChangePass = false;
        if($request->input('OldPassword')!='undefined' && $request->input('NewPassword')!='undefined' && $request->input('ConfirmPassword')!='undefined'){
            $oldPassword = Crypt::decrypt($dtUser->Password);
            if($request->input('OldPassword') != $oldPassword){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Password Lama Salah! Silahkan Cek Kembali',
                    'validation'=>$validation->errors(),
                ));
            }else{
                if($request->input('ConfirmPassword') != $request->input('NewPassword')){
                    return json_encode(array(
                        'status'=>false,
                        'message'=>'Confirm Password Salah! Silahkan Cek Kembali',
                        'validation'=>$validation->errors(),
                    ));
                }else{
                    $isChangePass = true;
                }
            }
        }

        $Photo = $request->input('OldFile');
        if($request->has('File') && $request->file('File')!=null){
            if( pathinfo($request->file('File')->getClientOriginalName(), PATHINFO_EXTENSION) ){
                // format: uploadFile($File, $pathFolder=0, $FileName='')
                $Photo = $this->UploadFile->uploadFile($request->file('File'), 2);
            }
        }

        if($Photo=='') $Photo = 'clouds/backend/files/images/users/user-default.png';

        DB::begintransaction();
        try{
            DB::table('employee')
                ->where('Id',$dtUser->IdEmployee)
                ->update([
                    'Name'=>$request->input('EmpName'),
                    'NIP'=>$request->input('NIP'),
//                    'DateBirth'=>$request->input('DateBirth'),
                    'CellPhone'=>$request->input('CellPhone'),
                    'IdCity'=>$request->input('IdCity'),
                    'Address'=>$request->input('Address'),
                    'Photo'=>$Photo,
                    'Bio'=>$request->input('Bio'),
                ]);

            if($isChangePass){
                DB::table('users')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Password'=>Crypt::encrypt($request->input('NewPassword')),
                    ]);
            }

            $this->History->store(1,2,json_encode($requestData));
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

    function validation() {
        return [

        ];
    }
}
