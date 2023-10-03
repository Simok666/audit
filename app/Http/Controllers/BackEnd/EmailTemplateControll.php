<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;


class EmailTemplateControll extends Controller
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

        $query =DB::table('email_template as emt')
            ->select(
                'emt.Id as id',
                'emt.Subject',
                'emt.Body',
                'oag.Name as Organizer',
                'emt.CreateAt',
                'emt.UpdateAt'
            )
            ->join('organizer_audit as oag','oag.Id','=','emt.IdOrganizer')
            ->orderBy($field, $dir)
            ->where('emt.Actived','>',0);

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
        $item = DB::table('email_template as emt')
            ->select(
                'emt.Id',
                'emt.Subject',
                'emt.Body',
                'oag.Name as Organizer',
                'emt.CreateAt',
                'emt.UpdateAt',
                'usr.UserName as UserEntry'
            )
            ->join('users as usr','usr.Id','=','emt.UserEntry')
            ->join('organizer_audit as oag','oag.Id','=','emt.IdOrganizer')
            ->where('emt.Actived',1)
            ->where('emt.Id',$request->input('Id'))
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

    public function getSelect(){
        $organizer = DB::table('organizer_audit')
            ->select('Id','Name')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'organizer'=>$organizer
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
            DB::table('email_template')
                ->insert([
                    'Subject'=>$request->input('Subject'),
                    'Body'=>$request->input('Body'),
                    'Category'=>$request->input('Category'),
                    'IdOrganizer'=>$request->input('IdOrganizer'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(22,1,json_encode($requestData));
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
        $item = DB::table('email_template as emt')
            ->select(
                'emt.Id',
                'emt.IdOrganizer',
                'emt.Subject',
                'emt.Body',
                'emt.Category',
                'oag.Name as Organizer'
            )
            ->join('organizer_audit as oag','oag.Id','=','emt.IdOrganizer')
            ->where('emt.Actived',1)
            ->where('emt.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->Organizer = ['Id'=>$item->IdOrganizer,'Name'=>$item->Organizer];
            $item->Category = ['text'=>$item->Category,'value'=>$item->Category];
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
            DB::table('email_template')
            ->where('Id', $request->input('Id'))
            ->update([
                'Subject'=>$request->input('Subject'),
                'Body'=>$request->input('Body'),
                'Category'=>$request->input('Category'),
                'IdOrganizer'=>$request->input('IdOrganizer')
            ]);

            $this->History->store(22,2,json_encode($requestData));
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
        $item = DB::table('email_template')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('email_template')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(22,3,json_encode($item));
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
        return[
            'IdOrganizer'=>'required',
            'Subject'=>'required'
        ];
    }
}
