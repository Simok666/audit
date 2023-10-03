<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class PersonelAuditorControll extends Controller
{
    protected $History;
//    protected $DBMain;
    protected $UploadFile;

    public function __construct() {
        $this->History = new HistoryControll();
//        $this->DBMain = DB::connection('wdb_auditsys');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('personnel_auditor as psa')
            ->select(
                'psa.Id',
                'psa.Code as id',
                'psa.Type',
                'psa.Category',
                'psa.Email',
                'psa.Status',
                'psa.Name as EmpName',
                'psa.Department',
                'psa.Position'
            )
            // ->join('wdb_auditsys.employee as emp','emp.Id','=','psa.IdEmploye')
            // ->join('wdb_auditsys.department as dpt','dpt.Id','=','psa.IdDepartment')
            // ->join('wdb_auditsys.position as pst','pst.Id','=','psa.IdPosition')
            ->orderBy($field, $dir)
            ->where('psa.Actived','>',0);


        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($key=='psa.Category') {
                        if($val=='Internal'){
                            $val=1;
                            $query->where($key, 'like', '%'.$val.'%');
                        }else if($val=='External'){
                            $val=2;
                            $query->where($key, 'like', '%'.$val.'%');
                        }

                    }else if($key=='psa.Type') {
                        if($val!='All'){
                            $query->where($key, 'like', '%'.$val.'%');
                        }
                    }else{
                        $query->where($key, 'like', '%'.$val.'%');
                    }

                }
            });
        }

        $data = $query->paginate($limit);
        foreach ($data as $key=>$val){
            $data[$key]->CategoryName=$val->Category==1?'INTERNAL':'EXTERNAL';
        }

        return $data;
    }

    public function getSelect(Request $request){
        $IdEmployee = $request->input('IdEmploye');
        $employee =DB::table('employee as emp')
            ->select('emp.Id','emp.Name','emp.NIP','emp.IdDepartment','emp.IdPosition','dpt.Department','pst.Name as Position','emp.Email')
            ->join('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->join('position as pst','pst.Id','=','emp.IdPosition')
            ->where('emp.Actived','>',0)
            ->get();


        $department = DB::table('department')
            ->select('Id','Department')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'departement'=>$department,
            'employee'=>$employee
        ));
    }

    public function getPosition(Request $request){
        $position = DB::table('position')
            ->select('Id','Name')
            ->where('IdDepartment',$request->input('IdDepartment'))
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'position'=>$position
        ));
    }

    public function show(Request $request){
        $item = DB::table('personnel_auditor as psa')
            ->select(
                'psa.Id',
                'psa.Type',
                'psa.Email',
                'psa.Name',
                'psa.NIP',
                'psa.Category',
                'psa.Department',
                'psa.Position',
                'psa.CreateAt',
                'psa.UpdateAt',
                'usr.UserName as UserEntry'
            )
            ->join('users as usr','usr.Id','=','psa.UserEntry')
            ->where('psa.Actived',1)
            ->where('psa.Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $CategoryName = 'Internal';
            if($item->Category == 2){
                $CategoryName = 'Eksternal';
            }

            $item->Category = $CategoryName;
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
            DB::table('personnel_auditor')
                ->insert([
                    'Code' => Uuid::uuid1()->toString(),
                    'Name'=>$request->input('Name'),
                    'NIP'=>$request->input('NIP'),
                    'IdEmploye'=>$request->input('IdEmploye'),
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdPosition'=>$request->input('IdPosition'),
                    'Department'=>$request->input('Department'),
                    'Position'=>$request->input('Position'),
                    'Category'=>$request->input('Category'),
                    'Type'=>$request->input('Type'),
                    'Email'=>$request->input('Email'),
                    'Status'=>$request->input('Status'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            // $this->DBMain->table('employee')
            //     ->where('Id',$request->input('IdEmploye'))
            //     ->update([
            //         'IsPersonel'=>1
            //     ]);

            $this->History->store(20,1,json_encode($requestData));
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
        $item = DB::table('personnel_auditor as psa')
            ->select(
                'psa.Id',
                'psa.IdDepartment',
                'psa.IdPosition',
                'psa.IdEmploye',
                'psa.Department as DepartmentName',
                'psa.Position as PositionName',
                'psa.Category',
                'psa.Type',
                'psa.Status',
                'psa.Email',
                'psa.NIP',
                'psa.IdEmploye',
                'psa.Name'
            )
            ->where('psa.Actived',1)
            ->where('psa.Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->Department = ['Id'=>$item->IdDepartment,'Department'=>$item->DepartmentName];
            $item->Position = ['Id'=>$item->IdPosition,'Name'=>$item->PositionName];
            $item->Employee = ['Id'=>$item->IdEmploye,'Name'=>$item->Name];
            $item->Type = ['value'=>$item->Type,'text'=>$item->Type];
            $statusName = 'Aktif';
            if($item->Status == 0){
                $statusName = 'Tidak Aktif';
            }
            $CategoryName = 'Internal';
            if($item->Category == 2){
                $CategoryName = 'Eksternal';
            }
            $item->Categoryvalue = $item->Category;
            $item->Status = ['value'=>$item->Status,'text'=>$statusName];
            $item->Category = ['value'=>$item->Category,'text'=>$CategoryName];
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

        $oldItem = DB::table('personnel_auditor')
            ->select('IdEmploye')
            ->where('Id',$request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('personnel_auditor')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Name'=>$request->input('Name'),
                    'NIP'=>$request->input('NIP'),
                    'IdEmploye'=>$request->input('IdEmploye'),
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdPosition'=>$request->input('IdPosition'),
                    'Department'=>$request->input('Department'),
                    'Position'=>$request->input('Position'),
                    'Category'=>$request->input('Category'),
                    'Type'=>$request->input('Type'),
                    'Email'=>$request->input('Email'),
                    'Status'=>$request->input('Status')
                ]);

            if($oldItem->IdEmploye != $request->input('IdEmploye')){
                // $this->DBMain->table('employee')
                //     ->where('Id',$oldItem->IdEmploye)
                //     ->update([
                //         'IsPersonel'=>0
                //     ]);

                // $this->DBMain->table('employee')
                //     ->where('Id',$request->input('IdEmploye'))
                //     ->update([
                //         'IsPersonel'=>1
                //     ]);
            }

            $this->History->store(20,2,json_encode($requestData));
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
        $item = DB::table('personnel_auditor')
            ->select('*')
            ->where('Code', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('personnel_auditor')
                ->where('Code',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            // $this->DBMain->table('employee')
            //     ->where('Id', $item->IdEmploye)
            //     ->update([
            //         'IsPersonel'=>0
            //     ]);

            $this->History->store(20,3,json_encode($item));
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
            'IdEmploye'=>'required',
            'IdDepartment'=>'required',
            'IdPosition'=>'required',
            'Type'=>'required',
            'Email'=>'required',
        ];
    }
}
