<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class GlossaryOfTermsControll extends Controller
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

        $query =DB::table('glossary_of_terms as got')
            ->select(
                'got.Id as id',
                'got.Group',
                'got.Description',
                'got.Terms',
                'got.CreateAt',
                'got.UpdateAt'
            )
            ->orderBy($field, $dir)
            ->where('got.Actived','>',0);

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
        $item = DB::table('glossary_of_terms as got')
            ->select('got.Id','got.Group','got.Terms','got.Description','got.CreateAt','got.UpdateAt','usr.UserName as UserEntry')
            ->join('users as usr','usr.Id','=','got.UserEntry')
            ->where('got.Actived',1)
            ->where('got.Id',$request->input('Id'))
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
            DB::table('glossary_of_terms')
                ->insert([
                    'Group'=>$request->input('Group'),
                    'Description'=>$request->input('Description'),
                    'Terms'=>$request->input('Terms'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(23,1,json_encode($requestData));
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
        $item = DB::table('glossary_of_terms')
            ->select('Id','Group','Description','Terms')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

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
            DB::table('glossary_of_terms')
            ->where('Id', $request->input('Id'))
            ->update([
                'Group'=>$request->input('Group'),
                'Description'=>$request->input('Description'),
                'Terms'=>$request->input('Terms')
            ]);

            $this->History->store(23,2,json_encode($requestData));
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
        $item = DB::table('glossary_of_terms')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('glossary_of_terms')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(23,3,json_encode($item));
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

    public function search(Request $request){
        $glossary = DB::table('glossary_of_terms')
            ->select('Id','Terms','Description')
            ->where('Actived','>',0)
            ->where(function($q)use($request){
                $q->where('Terms','like','%'.$request->input('searchvalue').'%')
                ->orwhere('Description','like','%'.$request->input('searchvalue').'%');
            })
            ->limit(6)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$glossary,
        ));
    }

    public function notificationRead(Request $request){
        $item = DB::table('notification')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('notification')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsRead'=>1
                ]);

            $this->History->store(23,3,json_encode($item));
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
            'message'=>'Read Data Success!',
        ));
    }

    function validation(){
        return [
            'Group'=>'required',
            'Terms'=>'required',
            'Description'=>'required'
        ];
    }
}
