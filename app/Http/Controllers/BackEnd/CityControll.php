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

class CityControll extends Controller
{
    protected $UploadFile;
    protected $AppWeb;
    protected $History;
    protected $DBMain;

    public function __construct() {
    	$this->UploadFile = new UploadFileControll();
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->DBMain = DB::connection('wdb_auditsys');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query =$this->DBMain->table('city as cty')
            ->select(
                'cty.Id as id',
                'cty.Name',
                'pvc.Name as Province',
                'usr.UserName as UserEntry',
                'cty.CreateAt',
                'cty.UpdateAt')
            ->join('province as pvc','pvc.Id','=','cty.IdProvince')
            ->leftjoin('users as usr','usr.Id','=','cty.UserEntry')
            ->orderBy($field, $dir)
            ->where('cty.Actived','>',0);

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
        $item = $this->DBMain->table('city as cty')
            ->select('cty.Id','cty.Name','cty.IdProvince','pvc.Name as City')
            ->join('province as pvc','pvc.Id','=','cty.IdProvince')
            ->where('cty.Actived',1)
            ->where('cty.Id',$request->input('Id'))
            ->first();
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
        
    }

    public function getProvince(Request $request)
    {
        $item = $this->DBMain->table('province')
            ->select('Id','Name as Province')
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

        $isExist = $this->AppWeb->checkDataOneColMaster('city','Name',$request->input('Name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Kota / Kabupaten Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('city')
                ->insert([
                    'IdProvince'=>$request->input('IdProvince'),
                    'Name'=>$request->input('Name'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(7,1,json_encode($requestData));
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
        $item = $this->DBMain->table('city as cty')
            ->select('cty.Id','cty.Name','cty.IdProvince','pvc.Name as Province')
            ->join('province as pvc','pvc.Id','=','cty.IdProvince')
            ->where('cty.Actived',1)
            ->where('cty.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            // $item->DateTrack = Carbon::parse($item->DateTrack)->format('Y-m-d');
            $item->IdProvince = ['Id'=>$item->IdProvince, 'Province'=>$item->Province];
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

        $item = $this->DBMain->table('city as cty')
            ->select('cty.Name')
            ->where('cty.Actived',1)
            ->where('cty.Id',$request->input('Id'))
            ->first();

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataOneColMaster('city','Name',$request->input('Name'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Kota / Kabupaten Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('city')
            ->where('Id', $request->input('Id'))
            ->update([
                'IdProvince'=>$request->input('IdProvince'),
                'Name'=>$request->input('Name')
            ]);

            $this->History->store(7,2,json_encode($requestData));
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

        $item = $this->DBMain->table('city')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            $this->DBMain->table('city')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(7,3,json_encode($item));
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
            'Name'=>'required',
            'IdProvince'=>'required',
        ];

    }


}
