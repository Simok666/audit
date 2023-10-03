<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class DomainControll extends Controller
{
    protected $History;

    public function __construct() {
        $this->History = new HistoryControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('audit_domain as adm')
            ->select(
                'adm.Id',
                'adm.Code as id',
                'adm.Name',
                'adm.Description',
                'adm.Status',
                'adm.CreateAt',
                'adm.UpdateAt'
            )
            ->orderBy($field, $dir)
            ->where('adm.Actived','>',0);

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
        $item = DB::table('audit_domain as adm')
            ->select('adm.Id','adm.Name','adm.Description','adm.CreateAt','adm.UpdateAt','usr.UserName as UserEntry')
            ->join('audit_widatra.users as usr','usr.Id','=','adm.UserEntry')
            ->where('adm.Actived',1)
            ->where('adm.Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->CreateAt = Carbon::parse($item->CreateAt)->format('d/m/Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('d/m/Y H:i:s');
        }
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
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

        DB::begintransaction();
        try{
            DB::table('audit_domain')
                ->insert([
                    'Code' => Uuid::uuid1()->toString(),
                    'Name'=>$request->input('Name'),
                    'Description'=>$request->input('Description'),
                    'Status'=>$request->input('Status'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(16,1,json_encode($requestData));
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
        $item = DB::table('audit_domain')
            ->select('Id','Name','Description','Status')
            ->where('Actived',1)
            ->where('Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $nameStatus = 'Aktif';
            if($item->Status == 0){
                $nameStatus = 'Tidak Aktif';
            }
            $item->Status = ['value'=>$item->Status,'text'=>$nameStatus];
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

        DB::begintransaction();
        try{
            DB::table('audit_domain')
            ->where('Id', $request->input('Id'))
            ->update([
                'Name'=>$request->input('Name'),
                'Status'=>$request->input('Status'),
                'Description'=>$request->input('Description')
            ]);

            $this->History->store(16,2,json_encode($requestData));
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
        $item = DB::table('audit_domain')
            ->select('*')
            ->where('Code', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_domain')
                ->where('Code', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(16,3,json_encode($item));
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
            'Description'=>'required'
        ];
    }
}