<?php

namespace App\Http\Controllers\BackEnd;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use Ramsey\Uuid\Uuid;
use Crypt;

class MasterModuleControll extends Controller
{
    protected $UploadFile;
    protected $AppWeb;
    protected $History;

    public function __construct() {
    	$this->UploadFile = new UploadFileControll();
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('module as mdl')
            ->select(
                'mdl.Id as id',
                'mdlp.Name as Parent',
                'mdl.Name',
                'usr.UserName as UserEntry',
                'mdl.UpdateAt'
            )
            ->leftjoin('module as mdlp','mdlp.Id','=','mdl.Parent')
            ->leftjoin('users as usr','usr.Id','=','mdl.UserEntry')
            ->orderBy($field, $dir)
            ->where('mdl.Actived','>',0);

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
        $item = DB::table('module as mdl')
            ->select(
                'mdl.*',
                'mdlp.Name as Parent',
                'usr.UserName as UserEntry'
            )
            ->leftjoin('module as mdlp','mdlp.Id','=','mdl.Parent')
            ->leftjoin('users as usr','usr.Id','=','mdl.UserEntry')
            ->where('mdl.Actived',1)
            ->where('mdl.Id',$request->input('Id'))
            ->first();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getParent(Request $request)
    {
        $item = DB::table('module')
            ->select('Id','Name as Parent')
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

        $isExist = $this->AppWeb->checkDataOneCol('module','Name',$request->input('Name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Master Module Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('module')
                ->insert([
                    'Parent'=>$request->input('Parent'),
                    'Name'=>$request->input('Name'),
                    'Description'=>$request->input('Description'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(13,1,json_encode($requestData));
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
        $item = DB::table('module as mdl')
            ->select('mdl.Id','mdl.Parent','mdl.Name','mdl.Description','mdlp.Name as Parentt')
            ->leftjoin('module as mdlp','mdlp.Id','=','mdl.Parent')
            ->where('mdl.Actived',1)
            ->where('mdl.Id', $request->input('Id'))
            ->first();

        if($item->Parentt == null) {
            $item->IdParent = ['Id'=>$item->Parent, 'Parent'=>''];
        } else {
            $item->IdParent = ['Id'=>$item->Parent, 'Parent'=>$item->Parentt];
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

        $item = DB::table('module as mdl')
            ->select('mdl.Name')
            ->where('mdl.Actived',1)
            ->where('mdl.Id', $request->input('Id'))
            ->first();

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataOneCol('module','Name',$request->input('Name'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Master Module Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('module')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Parent'=>$request->input('Parent'),
                    'Name'=>$request->input('Name'),
                    'Description'=>$request->input('Description')
                ]);

            $this->History->store(13,2,json_encode($requestData));
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
        $item = DB::table('module')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('module')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(13,3,json_encode($item));
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
            'Name'=>'required'
        ];
    }
}
