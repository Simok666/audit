<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use App\Http\Controllers\Utils\AppWebControll;

class DivisionControll extends Controller
{
    protected $History;
    protected $AppWeb;
    protected $DBMain;

    public function __construct() {
        $this->History = new HistoryControll();
        $this->AppWeb = new AppWebControll();
        $this->DBMain = DB::connection('wdb_auditsys');
    }

    public function index(Request $request) {
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query = $this->DBMain->table('department as dpt')
            ->select(
                'dpt.Id as id',
                'dpt.Code',
                'dpt.Department as Division',
                'dpt.CreateAt',
                'dpt.UpdateAt'
            )
            ->orderBy($field, $dir)
            ->where('dpt.Parent',0)
            ->where('dpt.Actived','>',0);

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

    public function show(Request $request) {
        $item = $this->DBMain->table('department as dpt')
            ->select(
                'dpt.Id',
                'dpt.Code',
                'dpt.Department as Division',
                'dpt.CreateAt',
                'dpt.UpdateAt'
            )
            ->where('dpt.Actived', 1)
            ->where('dpt.Id',$request->input('Id'))
            ->first();
        
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

        $isExist = $this->AppWeb->checkDataManyColMaster('department', [
            'Code'=>$request->input('Code'),
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Code Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataManyColMaster('department', [
            'Department'=>$request->input('Division')
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Division Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('department')
                ->insert([
                    'Code'=>$request->input('Code'),
                    'Department'=>$request->input('Division'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(32,1,json_encode($requestData));
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

    public function edit(Request $request) {

        $item = $this->DBMain->table('department as dpt')
            ->select(
                'dpt.Id',
                'dpt.Code',
                'dpt.Department as Division'
            )
            ->where('dpt.Actived', 1)
            ->where('dpt.Id',$request->input('Id'))
            ->first();

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

        $item = $this->DBMain->table('department')
            ->select('Code','Department')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($request->input('Code')!=$item->Code) {
            $isExist = $this->AppWeb->checkDataManyColMaster('department', [
                'Code'=>$request->input('Code'),
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Code Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($request->input('Division')!=$item->Department) {
            $isExist = $this->AppWeb->checkDataManyColMaster('department', [
                'Department'=>$request->input('Division')
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Division Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('department')
            ->where('Id', $request->input('Id'))
            ->update([
                'Code'=>$request->input('Code'),
                'Department'=>$request->input('Division'),
            ]);

            $this->History->store(32,2,json_encode($requestData));
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
        $item = $this->DBMain->table('department')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            $this->DBMain->table('department')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(32,3,json_encode($item));
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

    function validation(){
        return [
            'Code'=>'required',
            'Division'=>'required',
        ];
    }
}