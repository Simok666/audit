<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class OrganizerAuditorControll extends Controller
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

        $query =DB::table('organizer_audit as oad')
            ->select(
                'oad.Id',
                'oad.Code as id',
                'oad.Name',
                'oad.Description',
                'oad.Classification',
                'oad.CreateAt',
                'oad.UpdateAt'
            )
            ->orderBy($field, $dir)
            ->where('oad.Actived','>',0);

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
        $item = DB::table('organizer_audit as oag')
            ->select('oag.Id','oag.Name','oag.Description','oag.Classification','oag.CreateAt','oag.UpdateAt','usr.UserName as UserEntry')
            ->join('users as usr','usr.Id','=','oag.UserEntry')
            ->where('oag.Actived',1)
            ->where('oag.Code',$request->input('Id'))
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
            DB::table('organizer_audit')
                ->insert([
                    'Code' => Uuid::uuid1()->toString(),
                    'Name'=>$request->input('Name'),
                    'Classification'=>$request->input('Classification'),
                    'Description'=>$request->input('Description'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(18,1,json_encode($requestData));
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
        $item = DB::table('organizer_audit')
            ->select('Id','Name','Description','Classification')
            ->where('Actived',1)
            ->where('Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->Classification = ['value'=>$item->Classification,'text'=>$item->Classification];
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
            DB::table('organizer_audit')
            ->where('Id', $request->input('Id'))
            ->update([
                'Name'=>$request->input('Name'),
                'Classification'=>$request->input('Classification'),
                'Description'=>$request->input('Description')
            ]);

            $this->History->store(18,2,json_encode($requestData));
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
        $item = DB::table('organizer_audit')
            ->select('*')
            ->where('Code', $request->input('Id'))
            ->first();

        $isStandart =DB::table('standart_audit as sdt')
            ->select(
                'sdt.Id'
            )
            ->where('sdt.IdOrganizer',$item->Id)
            ->where('sdt.Actived','>',0)
            ->first();
        if(!empty($isStandart)){
            return json_encode(array(
                'status'=>false,
                'message'=>'Organisasi Sudah Terinput Di Standart Audit.Hapus Terlebih Dahulu Data Standart Audit!',
            ));
        }

        DB::begintransaction();
        try{
            DB::table('organizer_audit')
                ->where('Code', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(18,3,json_encode($item));
            DB::commit();
        }catch (\Throwable $e){
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
            'Classification'=>'required'
        ];
    }
}
