<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class StructureAuditorControll extends Controller
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

        $query =DB::table('structure_auditor as sdr')
            ->select(
                'sdr.Id',
                'sdr.Code as id',
                'sdr.Name',
                'sdr.Description',
                'sdr.Group',
                'sdr.CreateAt',
                'sdr.UpdateAt'
            )
            ->orderBy($field, $dir)
            ->where('sdr.Actived','>',0);

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

    public function show(Request $request){
        $item = DB::table('structure_auditor as sdt')
            ->select('sdt.Id','sdt.Name','sdt.Description','sdt.Group','sdt.CreateAt','sdt.UpdateAt','usr.UserName as UserEntry')
            ->join('users as usr','usr.Id','=','sdt.UserEntry')
            ->where('sdt.Actived',1)
            ->where('sdt.Code',$request->input('Id'))
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
            DB::table('structure_auditor')
                ->insert([
                    'Code' => Uuid::uuid1()->toString(),
                    'Name'=>$request->input('Name'),
                    'Group'=>$request->input('Group'),
                    'Description'=>$request->input('Description'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(17,1,json_encode($requestData));
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
        $item = DB::table('structure_auditor')
            ->select('Id','Name','Description','Group')
            ->where('Actived',1)
            ->where('Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->Group = ['value'=>$item->Group,'text'=>$item->Group];
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
            DB::table('structure_auditor')
            ->where('Id', $request->input('Id'))
            ->update([
                'Name'=>$request->input('Name'),
                'Group'=>$request->input('Group'),
                'Description'=>$request->input('Description')
            ]);

            $this->History->store(17,2,json_encode($requestData));
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
        $item = DB::table('structure_auditor')
            ->select('*')
            ->where('Code', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('structure_auditor')
                ->where('Code', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(17,3,json_encode($item));
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
            'Description'=>'required',
            'Group'=>'required'
        ];
    }
}
