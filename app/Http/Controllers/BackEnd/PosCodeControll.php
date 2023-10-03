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

class PosCodeControll extends Controller
{
    protected $UploadFile;
    protected $History;
    protected $AppWeb;
    protected $DBMain;

    public function __construct() {
    	$this->UploadFile = new UploadFileControll();
        $this->History = new HistoryControll();
        $this->AppWeb = new AppWebControll();
        $this->DBMain = DB::connection('maindb_widatra');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query =$this->DBMain->table('districts_poscode as dstp')
            ->select(
                'dstp.Id as id',
                'dstp.PosCode',
                'dst.Name as District',
                'usr.UserName as UserEntry',
                'dstp.CreateAt',
                'dstp.UpdateAt')
            ->join('districts as dst','dst.Id','=','dstp.IdDistrict')
            ->leftjoin('users as usr','usr.Id','=','dstp.UserEntry')
            ->orderBy($field, $dir)
            ->where('dstp.Actived','>',0);

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
        $item = $this->DBMain->table('districts_poscode as dstp')
            ->select('dstp.Id','dstp.PosCode','dstp.IdDistrict','dst.Name as District')
            ->join('districts as dst','dst.Id','=','dstp.IdDistrict')
            ->where('dstp.Actived',1)
            ->where('dstp.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
        }
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
        
    }

    public function getDistrict(Request $request)
    {
        $item = $this->DBMain->table('districts')
            ->select('Id','Name as District')
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

        $isExist = $this->AppWeb->checkDataOneColMaster('districts_poscode','PosCode',$request->input('PosCode'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Kode Pos Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('districts_poscode')
                ->insert([
                    'IdDistrict'=>$request->input('IdDistrict'),
                    'PosCode'=>$request->input('PosCode'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(5,1,json_encode($requestData));
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
        $item = $this->DBMain->table('districts_poscode as dstp')
            ->select('dstp.Id','dstp.PosCode','dstp.IdDistrict','dst.Name as District')
            ->join('districts as dst','dst.Id','=','dstp.IdDistrict')
            ->where('dstp.Actived',1)
            ->where('dstp.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            // $item->DateTrack = Carbon::parse($item->DateTrack)->format('Y-m-d');
            $item->IdDistrict = ['Id'=>$item->IdDistrict, 'District'=>$item->District];
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

        $item = $this->DBMain->table('districts_poscode as dstp')
            ->select('dstp.PosCode')
            ->where('dstp.Actived',1)
            ->where('dstp.Id',$request->input('Id'))
            ->first();

        if($item->PosCode!=$request->input('PosCode')) {
            $isExist = $this->AppWeb->checkDataOneColMaster('districts_poscode','PosCode',$request->input('PosCode'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Kode Pos Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('districts_poscode')
            ->where('Id', $request->input('Id'))
            ->update([
                'IdDistrict'=>$request->input('IdDistrict'),
                'PosCode'=>$request->input('PosCode')
            ]);

            $this->History->store(5,2,json_encode($requestData));
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

        $item = $this->DBMain->table('districts_poscode')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            $this->DBMain->table('districts_poscode')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(5,3,json_encode($item));
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
            'PosCode'=>'required',
            'IdDistrict'=>'required',
        ];

    }


}
