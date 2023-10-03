<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use stdClass;

class UserAccessControll extends Controller
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

        $query = DB::table('type_user as tyu')
            ->select(
                'tyu.Id as id',
                'tyu.Name',
                'tyu.Description',
                'tyu.CreateAt',
                'tyu.UpdateAt')
            ->orderBy($field, $dir)
            ->where(function ($q){
                if(session('adminvue')->TypeUser!=1){ // Id 1: IT Developer
                  $q->where('Id','<>',1);
                }
            })
            ->where('tyu.Actived','>',0);

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
        $item = DB::table('type_user as tyu')
            ->select(
                'tyu.Id',
                'tyu.Name',
                'tyu.Description',
                'tyu.CreateAt',
                'tyu.UpdateAt',
                'usr.UserName as UserEntry'
            )
            ->leftJoin('users as usr','usr.Id','=','tyu.UserEntry')
            ->where('tyu.Actived','>',0)
            ->where('tyu.Id', $request->input('Id'))
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

        $isExist = $this->AppWeb->checkDataManyCol('type_user',[
            'Name'=>$request->input('Name')
        ]);

        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Hak Akses User Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $idTypeUser = DB::table('type_user')
                ->insertGetId([
                    'Name'=>$request->input('Name'),
                    'Description'=>$request->input('Description'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $isUserAccess = $this->AppWeb->checkDataManyCol('user_access',[
                'IdTypeUser'=>$idTypeUser
            ]);

            if($isUserAccess==0) {
                DB::table('user_access')
                ->insert([
                    'IdTypeUser'=>$idTypeUser,
                    'IdModule'=>0,
                    'Action'=>$request->input('Action')
                ]);
            }else{
                DB::table('user_access')
                ->where('IdTypeUser', $idTypeUser)
                ->update([
                    'Action'=>$request->input('Action')
                ]);
            }

            $this->History->store(3,1,json_encode($requestData));
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

    public function getJsonMenu() {
        $path = base_path()."/public/clouds/menu.json";
        $jsonMenu = file_get_contents($path);
        return $jsonMenu;
    }

    public function getJsonTree() {
        $sendTree = new stdClass();
        $jsonTree = json_decode($this->getJsonMenu());

        foreach($jsonTree as $key=>$val){
            $val->opened = true;
            $val->selected = false;
            $val->disabled = false;
            $val->loading = false;

            if(!empty($val->children)){ foreach($val->children as $k=>$v){
                $v->opened = true;
                $v->selected = false;
                $v->disabled = false;
                $v->loading = false;

                if(!empty($v->children)){ foreach($v->children as $i=>$value){
                    $value->opened = false;
                    $value->selected = false;
                    $value->disabled = false;
                    $value->loading = false;
                    $submenu = isset($value->submenu) ? $value->submenu : [];
                    if(empty($value->children)) $value->children = $this->getChildren($i, $value, $submenu);

                } } else {
                    $v->opened = false;
                    $submenu = isset($v->submenu) ? $v->submenu : [];
                    $v->children = $this->getChildren($k, $v, $submenu);
                }
            } } else {
                $val->opened = false;
                $submenu = isset($val->submenu) ? $val->submenu : [];
                $val->children = $this->getChildren($key, $val, $submenu);
            }
        }

        $sendTree->action = json_encode($jsonTree);
        return json_encode($sendTree);
    }

    public function getChildren($i, $val, $submenu) {
        $children[] = (object) [
            "id"=>$val->id.$i.'1c',
            "text"=>"Create & Edit",
            "value"=>str_replace('data-', 'form-', $val->value),
            "icon"=>"ion ion-md-bookmark",
            "opened" => false,
            "selected" => false,
            "disabled" => false,
            "loading" => false,
            "notmenu" => true,
            "type" => "form"
        ];

        $route = explode('/', $val->value);
        $delValue = str_replace('data-', '', end($route));
        $delValue = '/AdminVue/'.$delValue.'-delete';
        $children[] = (object) [
            "id"=>$val->id.$i.'2c',
            "text"=>'Delete',
            "value"=>$delValue,
            "icon"=>"ion ion-md-bookmark",
            "opened" => false,
            "selected" => false,
            "disabled" => false,
            "loading" => false,
            "notmenu" => true,
            "type" => "delete"
        ];

        $numb = 3;
        if(!empty($submenu)) { foreach ($submenu as $key=>$sub) {
            $type = isset($sub->type) ? $sub->type : '';
            if($type=='form') {
                $children[0]->value = $sub->value;
            }

            if($type=='delete') {
                $children[1]->value = $sub->value;
            }

            if($type!='form' && $type!='delete' && $type!='show' && $type!='') {
                $children[] = (object) [
                    "id"=>$val->id.$i.$numb.'c',
                    "text"=>$sub->text,
                    "value"=>$sub->value,
                    "icon"=>"ion ion-md-bookmark",
                    "opened" => false,
                    "selected" => false,
                    "disabled" => false,
                    "loading" => false,
                    "notmenu" => true,
                    "type" => $sub->type
                ];
            }
            $numb++;
        } }

        return $children;
    }

    public function edit(Request $request)
    {
        $item = DB::table('type_user as tyu')
            ->select(
                'tyu.Id',
                'tyu.Name',
                'tyu.Description',
                'tyu.CreateAt',
                'tyu.UpdateAt',
                'usc.Action as action'
            )
            ->leftJoin('user_access as usc','usc.IdTypeUser','=','tyu.Id')
            ->where('tyu.Actived','>',0)
            ->where('tyu.Id', $request->input('Id'))
            ->first();

        $jsonTree = json_decode($this->getJsonMenu());

        if(!empty($item)){
            $Action = json_decode($item->action);
            foreach($jsonTree as $key=>$val){
                $val->opened = true;
                $val->selected = false;
                $val->disabled = false;
                $val->loading = false;

                $key1 = array_search($val->id, array_column($Action, 'id'));
                if($key1 !== false){
                    $val->selected = $Action[$key1]->selected;
                }

                if(!empty($val->children)){
                    foreach($val->children as $k=>$v){
                        $v->opened = true;
                        $v->selected = false;
                        $v->disabled = false;
                        $v->loading = false;

                        $key2 = false;
                        if(isset($Action[$key1]->children))
                            $key2 = array_search($v->id, array_column($Action[$key1]->children, 'id'));
                        if($key2 !== false){
                            $v->selected = $Action[$key1]->children[$key2]->selected;
                        }

                        if(!empty($v->children)){
                            foreach($v->children as $i=>$value){
                                $value->opened = false;
                                $value->selected = false;
                                $value->disabled = false;
                                $value->loading = false;

                                $key3 = false;
                                if(isset($Action[$key1]->children[$key2]->children))
                                    $key3 = array_search($value->id, array_column($Action[$key1]->children[$key2]->children, 'id'));
                                if($key3 !== false){
                                    $value->selected = $Action[$key1]->children[$key2]->children[$key3]->selected;
                                }

                                $submenu = isset($value->submenu) ? $value->submenu : [];
                                if(empty($value->children)) $value->children = $this->getChildren($i, $value, $submenu);

                                if(!empty($value->children)){ foreach($value->children as $val){
                                    $key33 = false;
                                    if(isset($Action[$key1]->children[$key2]->children[$key3]->children))
                                        $key33 = array_search($val->id, array_column($Action[$key1]->children[$key2]->children[$key3]->children, 'id'));
                                    if($key33 !== false){
                                        $val->selected = $Action[$key1]->children[$key2]->children[$key3]->children[$key33]->selected;
                                    }

                                } }
                            }
                        } else {
                            $v->opened = false;
                            $submenu = isset($v->submenu) ? $v->submenu : [];
                            if(empty($v->children)) $v->children = $this->getChildren($k, $v, $submenu);

                            if(!empty($v->children)){ foreach($v->children as $val){
                                $key22 = false;
                                if(isset($Action[$key1]->children[$key2]->children))
                                    $key22 = array_search($val->id, array_column($Action[$key1]->children[$key2]->children, 'id'));
                                if($key22 !== false){
                                    $val->selected = $Action[$key1]->children[$key2]->children[$key22]->selected;
                                }

                            } }
                        }
                    }
                } else {
                    $val->opened = false;
                    $submenu = isset($v->submenu) ? $val->submenu : [];
                    if(empty($val->children)) $val->children = $this->getChildren($key, $val, $submenu);

                    if(!empty($val->children)){ foreach($val->children as $v){
                        $key11 = false;
                        if(isset($Action[$key1]->children))
                            $key11 = array_search($v->id, array_column($Action[$key1]->children, 'id'));
                        if($key11 !== false){
                            $v->selected = $Action[$key1]->children[$key11]->selected;
                        }

                    } }
                }
            }
            $item->action = json_encode($jsonTree);
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

        $item = DB::table('type_user')
            ->select('Name')
            ->where('Id', $request->input('Id'))
            ->first();

        if( $item->Name != $request->input('Name') ) {
            $isExist = $this->AppWeb->checkDataManyCol('type_user',[
                'Name'=>$request->input('Name')
            ]);

            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Hak Akses User Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('type_user')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Name'=>$request->input('Name'),
                    'Description'=>$request->input('Description'),
                ]);

            DB::table('user_access')
                ->where('IdTypeUser', $request->input('Id'))
                ->update([
                    'Action'=>$request->input('Action'),
                ]);

            $this->History->store(3,2,json_encode($requestData));
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
        $item = DB::table('type_user')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('type_user')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(3,3,json_encode($item));
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
