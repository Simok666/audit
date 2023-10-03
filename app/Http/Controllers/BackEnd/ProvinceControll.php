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

class ProvinceControll extends Controller
{
    protected $UploadFile;
    protected $AppWeb;
    protected $History;
//    protected $DBMain;

    public function __construct() {
    	$this->UploadFile = new UploadFileControll();
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
//        $this->DBMain = DB::connection('maindb_widatra');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('province as pvc')
            ->select(
                'pvc.Id as id',
                'pvc.Name',
                'ctr.Name as Country',
                'usr.UserName as UserEntry',
                'pvc.CreateAt',
                'pvc.UpdateAt')
            ->join('country as ctr','ctr.Id','=','pvc.IdCountry')
            ->leftjoin('users as usr','usr.Id','=','pvc.UserEntry')
            ->orderBy($field, $dir)
            ->where('pvc.Actived','>',0);

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
        $item =DB::table('province as pvc')
            ->select('pvc.Id','pvc.Name','pvc.IdCountry','ctr.Name as Country')
            ->join('country as ctr','ctr.Id','=','pvc.IdCountry')
            ->where('pvc.Actived',1)
            ->where('pvc.Id',$request->input('Id'))
            ->first();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));

    }

    public function getCountry(Request $request)
    {
        $item = DB::table('country')
            ->select('Id','Name as Country')
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

        $isExist = $this->AppWeb->checkDataManyColMaster('province', [
            'Name'=>$request->input('Name'),
            'IdCountry'=>$request->input('IdCountry')
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Provinsi Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('province')
                ->insert([
                    'IdCountry'=>$request->input('IdCountry'),
                    'Name'=>$request->input('Name'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(8,1,json_encode($requestData));
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
        $item = DB::table('province as pvc')
            ->select('pvc.Id','pvc.Name','pvc.IdCountry','ctr.Name as Country')
            ->join('country as ctr','ctr.Id','=','pvc.IdCountry')
            ->where('pvc.Actived',1)
            ->where('pvc.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            // $item->DateTrack = Carbon::parse($item->DateTrack)->format('Y-m-d');
            $item->IdCountry = ['Id'=>$item->IdCountry, 'Country'=>$item->Country];
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

        $item = DB::table('province as pvc')
            ->select('pvc.Name')
            ->where('pvc.Actived',1)
            ->where('pvc.Id',$request->input('Id'))
            ->first();

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataManyColMaster('province', [
                'Name'=>$request->input('Name'),
                'IdCountry'=>$request->input('IdCountry')
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Provinsi Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('province')
            ->where('Id', $request->input('Id'))
            ->update([
                'IdCountry'=>$request->input('IdCountry'),
                'Name'=>$request->input('Name')
            ]);

            $this->History->store(8,2,json_encode($requestData));
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

        $item = DB::table('province')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('province')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(8,3,json_encode($item));
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
            'IdCountry'=>'required',
        ];

    }


}
