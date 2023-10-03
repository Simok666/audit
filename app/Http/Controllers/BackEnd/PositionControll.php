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

class PositionControll extends Controller
{
    protected $History;
    protected $AppWeb;
//    protected $DBMain;

    public function __construct() {
        $this->History = new HistoryControll();
        $this->AppWeb = new AppWebControll();
//        $this->DBMain = DB::connection('wdb_auditsys');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('position as pst')
            ->select(
                'pst.Id as id',
                'psp.Name as ParentName',
                'dpt.Department as Department',
                'dvs.Department as Division',
                'pst.Code',
                'pst.Name',
                'pst.JobDesk',
                'pst.Email',
                'pst.CreateAt',
                'pst.UpdateAt'
            )
            ->leftjoin('department as dvs','dvs.Id','=','pst.IdDivision')
            ->leftjoin('department as dpt','dpt.Id','=','pst.IdDepartment')
            ->leftjoin('position as psp','psp.Id','=','pst.Parent')
            ->orderBy($field, $dir)
            ->where('pst.Actived','>',0);

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

    }

    public function getSelect(Request $request){
        $IdPosition = $request->input('IdPosition');
        $departement = DB::table('department')
            ->select('Id','Department')
            ->where('Parent','<>',0)
            ->where('Actived','>',0)
            ->get();

        $division = DB::table('department')
            ->select('Id','Department')
            ->where('Parent',0)
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'departement'=>$departement,
            'division'=>$division
        ));
    }

    public function getParent(Request $request){
        $Id = $request->input('IdDepartment');
        $IdPosition = $request->input('IdPosition');

        $parent = DB::table('position')
            ->select('Id','Name')
            ->where('IdDepartment',$Id)
            ->where('Actived',1)
            ->where(function($q) use($IdPosition){
                if($IdPosition > 0){
                    $q->where('Id','<>',$IdPosition);
                }
            })
            ->get();

        return json_encode(array(
            'status'=>true,
            'parent'=>$parent
        ));
    }

    public function store(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails() || $request->input('IdDepartment') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataManyColMaster('position', [
            'Code'=>$request->input('Code')
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Code Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataManyColMaster('position', [
            'IdDepartment'=>$request->input('IdDepartment'),
            'Name'=>$request->input('Name')
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Position Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('position')
                ->insert([
                    'Parent'=>$request->input('Parent'),
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdDivision'=>$request->input('IdDivision'),
                    'Code'=>$request->input('Code'),
                    'Name'=>$request->input('Name'),
                    'JobDesk'=>$request->input('JobDesk'),
                    'Remarks'=>$request->input('Remarks'),
                    'Email'=>$request->input('Email'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(33,1,json_encode($requestData));
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
        $item =DB::table('position as pst')
            ->select('pst.Id','pst.IdDepartment','dpt.Department','pst.Email','psp.Name as ParentName','pst.Parent','pst.Code','pst.Name','pst.JobDesk','pst.Remarks','dvs.Department as Division','pst.IdDivision')
            ->leftjoin('department as dvs','dvs.Id','=','pst.IdDivision')
            ->leftjoin('department as dpt','dpt.Id','=','pst.IdDepartment')
            ->leftjoin('position as psp','psp.Id','=','pst.Parent')
            ->where('pst.Actived',1)
            ->where('pst.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            foreach ($item as $key => $value) { if($value==null) $item->$key = ''; }

            if($item->IdDepartment != 0){
                $item->Departement = ['Id'=>$item->IdDepartment,'Department'=>$item->Department];
            }else{
                $item->Department = [];
            }

            if($item->IdDivision != 0){
                $item->Division = ['Id'=>$item->IdDivision,'Department'=>$item->Division];
            }else{
                $item->Division = [];
            }

            if($item->Parent == null) {
                $item->Parent = ['Id'=>$item->Parent, 'Name'=>''];
            } else {
                $item->Parent = ['Id'=>$item->Parent, 'Name'=>$item->ParentName];
            }
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

        $item = DB::table('position')
            ->select('Code','Name')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($request->input('Code')!=$item->Code) {
            $isExist = $this->AppWeb->checkDataManyColMaster('position', [
                'Code'=>$request->input('Code')
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Code Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($request->input('Name')!=$item->Name) {
            $isExist = $this->AppWeb->checkDataManyColMaster('position', [
                'IdDepartment'=>$request->input('IdDepartment'),
                'Name'=>$request->input('Name')
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Position Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('position')
            ->where('Id', $request->input('Id'))
            ->update([
                'Parent'=>$request->input('Parent'),
                'IdDepartment'=>$request->input('IdDepartment'),
                'IdDivision'=>$request->input('IdDivision'),
                'Code'=>$request->input('Code'),
                'Name'=>$request->input('Name'),
                'JobDesk'=>$request->input('JobDesk'),
                'Email'=>$request->input('Email'),
                'Remarks'=>$request->input('Remarks')
            ]);

            $this->History->store(33,2,json_encode($requestData));
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
        $item = DB::table('position')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('position')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(33,3,json_encode($item));
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
            // 'IdDepartment'=>'required',
            'Code'=>'required',
            'Name'=>'required'
        ];
    }
}
