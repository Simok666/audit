<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use App\Http\Controllers\Utils\UploadFileControll;

class ManualBookControll extends Controller
{
    protected $History;
    protected $UploadFile;

    public function __construct() {
        $this->History = new HistoryControll();
        $this->UploadFile = new UploadFileControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('manual_book_user as mbu')
            ->select(
                'mbu.Id as id',
                'mbu.Path',
                'usr.UserName as Name',
                'mbu.Status',
                'mbu.CreateAt',
                'mbu.UpdateAt'
            )
            ->join('users as usr','usr.IdEmployee','=','mbu.IdEmployee')
            ->orderBy($field, $dir)
            ->where('mbu.Actived','>',0)
            ->where(function($query)  {
                if(session('adminvue')->TypeUser != 11 && 30){
                    $query->where('mbu.Status',1);
                }
            });

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

    public function getSelect(){
        return json_encode(array(
            'status'=>true,
            'data'=>session('adminvue')->Name,
        ));
    }

    public function store(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validation());

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $filePath = '';
        if($request->has('Photo') && $request->file('Photo')!=null){
            if(pathinfo($request->file('Photo')->getClientOriginalName(), PATHINFO_EXTENSION)){
                $filePath = $this->UploadFile->uploadFile($request->file('Photo'),1); //6 path member
            }
        }

        DB::begintransaction();
        try{
            DB::table('manual_book_user')
                ->insert([
                    'IdEmployee'=>session('adminvue')->IdEmployee,
                    'Status'=>$request->input('Status'),
                    'Path'=>$filePath,
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(38,1,json_encode($requestData));
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

    public function edit(Request $request){
        $item = DB::table('manual_book_user as mbu')
            ->select(
                'mbu.Id',
                'mbu.IdEmployee',
                'mbu.Status',
                'emp.Name as Employee',
                'mbu.Path'
            )
            ->join('employee as emp','emp.Id','=','mbu.IdEmployee')
            ->where('mbu.Actived', 1)
            ->where('mbu.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $statusName = 'Non Active';
            if($item->Status == 1){
                $statusName = 'Active';
            }
            $item->Path = $item->Path!=null?$item->Path:'';
            $item->Status = ['value'=>$item->Status, 'text'=>$statusName];
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function update(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validation());

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $filePath = $request->input('OldPhoto');
        if($request->has('Photo') && $request->file('Photo')!=null){
            if(pathinfo($request->file('Photo')->getClientOriginalName(), PATHINFO_EXTENSION)){
                $filePath = $this->UploadFile->uploadFile($request->file('Photo'),1); //6 path member
            }
        }

        DB::begintransaction();
        try{
            DB::table('manual_book_user')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IdEmployee'=>$request->input('IdEmployee'),
                    'Status'=>$request->input('Status'),
                    'Path'=>$filePath,
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(38,2,json_encode($requestData));
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

    public function delete(Request $request){
        $item = DB::table('manual_book_user')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('manual_book_user')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(38,3,json_encode($item));
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

    public function validation(){
        return[];
    }
}
