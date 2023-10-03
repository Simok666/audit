<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use App\Http\Controllers\Utils\UploadFileControll;

class AuditorSkillControll extends Controller
{
    protected $History;
//    protected $DBMain;

    public function __construct() {
        $this->History = new HistoryControll();
//        $this->DBMain = DB::connection('maindb_widatra');
        $this->UploadFile = new UploadFileControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('personnel_auditor_skill as pas')
            ->select(
                'pas.Id',
                'pas.Code as id',
                'pas.Date',
                'pas.Certificate',
                'pas.Training',
                'pas.Institution',
                'pas.Path',
                'pas.Status',
                'pas.Organizer',
                'psa.Department',
                'psa.Category',
                'sdt.Standart as StandartAudit',
                'psa.Name as EmpName'
            )
            ->join('personnel_auditor as psa','psa.Id','=','pas.IdPersonel')
            ->join('standart_audit as sdt','sdt.Id','=','pas.IdStandartAudit')
            ->orderBy($field, $dir)
            ->where('sdt.Actived','>',0)
            ->where('psa.Actived','>',0)
            ->where('pas.Actived','>',0);


        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);
        foreach ($data as $key=>$val){
            $data[$key]->CategoryName=$val->Category==1?'INTERNAL':'EXTERNAL';
        }
        return $data;
    }

    public function show(Request $request){
        $item = DB::table('personnel_auditor_skill as pas')
            ->select(
                'pas.Id',
                'pas.Date',
                'pas.Certificate',
                'pas.Training',
                'pas.Institution',
                'pas.Organizer',
//                'oad.Name as Organizer',
                'sdt.Standart',
                'sdt.Standart as StandartName',
                'psa.Name',
                'psa.NIP',
                'psa.Category',
                'pas.CreateAt',
                'pas.UpdateAt',
                'usr.UserName as UserEntry'
            )
            ->join('personnel_auditor as psa','psa.Id','=','pas.IdPersonel')
//            ->join('organizer_audit as oad','oad.Id','=','pas.IdOrganizer')
            ->join('standart_audit as sdt','sdt.Id','=','pas.IdStandartAudit')
            ->join('users as usr','usr.Id','=','pas.UserEntry')
            ->where('pas.Actived',1)
            ->where('pas.Code',$request->input('Id'))
            ->first();

        $standartaudit = DB::table('personnel_auditor_skill as pas')
            ->select(
                'pas.Id',
                'sdt.Standart',
                'pas.Certificate',
                'pas.Training',
                'pas.Institution',
                'pas.Organizer',
                'pas.Date'
            )
            ->join('standart_audit as sdt','sdt.Id','=','pas.IdStandartAudit')
            ->join('personnel_auditor as psa','psa.Id','=','pas.IdPersonel')
            ->where('pas.Actived','>',0)
            ->where('psa.NIP',$item->NIP)
            ->get();

        $StandartName='';
        $TrainingName='';
        $DateName='';
        $InstitutionName='';
        foreach ($standartaudit as $valstandart){
            $StandartName.=$valstandart->Standart.' </br> ';
            $TrainingName.=$valstandart->Training.' </br> ';
            $DateName.=Carbon::parse($valstandart->Date)->format('d/m/Y').' </br> ';
            $InstitutionName.=$valstandart->Institution.' </br> ';
        }
        $item->StandartName=$StandartName;
        $item->Training=$TrainingName;
        $item->Date=$DateName;
        $item->Institution=$InstitutionName;

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

    public function getSelect(Request $request){
        $employee = DB::table('personnel_auditor')
            ->select('Id','Name','NIP')
            ->where('Actived','>',0)
            ->get();

        $organizer = DB::table('organizer_audit')
            ->select('Id','Name')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'organizer'=>$organizer,
            'employee'=>$employee
        ));
    }

    public function getStandartAudit(Request $request){
        $standart = DB::table('standart_audit')
            ->select('Id','Standart')
//            ->where('IdOrganizer',$request->input('IdOrganizer'))
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'standart'=>$standart
        ));
    }

    public function getClauseAudit(Request $request){
        $clause = DB::table('clause_audit')
            ->select('Id','Clause')
            ->where('IdStandart',$request->input('IdStandartAudit'))
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'clause'=>$clause
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

        $fileAttachment = [];
        if($request->has('FileAttachment')){
            $arrFile = $request->file('FileAttachment');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,6); //6 path auditor-skill
                }
            }
        }

        if(count($fileAttachment) > 0){
            $fileAttachment = json_encode($fileAttachment);
        }else{
            $fileAttachment = '';
        }

        $Date = Carbon::createFromFormat('D M d Y H:i:s e+',$request->input('Date'))->format('Y-m-d');

        DB::begintransaction();
        try{
            DB::table('personnel_auditor_skill')
                ->insert([
                    'Code' => Uuid::uuid1()->toString(),
                    'IdPersonel'=>$request->input('IdPersonel'),
                    'IdOrganizer'=>$request->input('IdOrganizer'),
                    'IdStandartAudit'=>$request->input('IdStandartAudit'),
                    'Date'=>$Date,
                    'Certificate'=>$request->input('Certificate'),
                    'Organizer'=>$request->input('Organizer'),
                    'Training'=>$request->input('Training'),
                    'Institution'=>$request->input('Institution'),
                    'Path'=>$fileAttachment,
                    'Status'=>$request->input('Status'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            // DB::table('personnel_auditor')
            //     ->where('Id',$request->input('IdPersonel'))
            //     ->update([
            //         'IsSkill'=>1
            //     ]);

            $this->History->store(21,1,json_encode($requestData));
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
        $item = DB::table('personnel_auditor_skill as pas')
            ->select(
                'pas.Id',
                'pas.IdOrganizer',
//                'oad.Name as Organizer',
                'pas.IdStandartAudit',
                'pas.IdClauseAudit',
                'pas.IdPersonel',
                'sdt.Standart as StandartAudit',
                'pas.Date',
                'pas.Status',
                'pas.Path',
                'pas.Organizer',
                'pas.Certificate',
                'pas.Training',
                'pas.Institution',
                'psa.Name as Employee',
                'psa.NIP as NIK'
            )
//            ->join('organizer_audit as oad','oad.Id','=','pas.IdOrganizer')
            ->leftjoin('standart_audit as sdt','sdt.Id','=','pas.IdStandartAudit')
            ->leftjoin('personnel_auditor as psa','psa.Id','=','pas.IdPersonel')
            ->where('pas.Actived',1)
            ->where('pas.Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->StandartAudit = ['Id'=>$item->IdStandartAudit,'Standart'=>$item->StandartAudit];
            $item->Organizer = $item->Organizer;
            $item->Employee = ['Id'=>$item->IdPersonel,'Name'=>$item->Employee];
            // $item->Certificate = ['value'=>$item->Certificate,'text'=>$item->Certificate];
            $statusName = 'Aktif';
            if($item->Status == 0){
                $statusName = 'Tidak Aktif';
            }
            $item->Status = ['value'=>$item->Status,'text'=>$statusName];
            $item->Path = json_decode($item->Path);
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

        $fileAttachment = [];
        if($request->has('FileAttachment')){
            $arrFile = $request->file('FileAttachment');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,6); //6 path auditor-skill
                }
            }
        }

        $OldFileAttachment = json_decode($request->input('OldFileAttachment'));
        foreach($OldFileAttachment as $key=>$val){
            array_push($fileAttachment,$val);
        }

        if(count($fileAttachment) > 0){
            $fileAttachment = json_encode($fileAttachment);
        }else{
            $fileAttachment = '';
        }

        $oldItem = DB::table('personnel_auditor_skill')
            ->select('IdPersonel')
            ->where('Id',$request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('personnel_auditor_skill')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IdPersonel'=>$request->input('IdPersonel'),
                    'IdOrganizer'=>$request->input('IdOrganizer'),
                    'IdStandartAudit'=>$request->input('IdStandartAudit'),
                    'Date'=>$request->input('Date'),
                    'Organizer'=>$request->input('Organizer'),
                    'Certificate'=>$request->input('Certificate'),
                    'Training'=>$request->input('Training'),
                    'Institution'=>$request->input('Institution'),
                    'Path'=>$fileAttachment,
                    'Status'=>$request->input('Status')
                ]);

            // DB::table('personnel_auditor')
            //     ->where('Id',$oldItem->IdPersonel)
            //     ->update([
            //         'IsSkill'=>0
            //     ]);

            // DB::table('personnel_auditor')
            //     ->where('Id',$request->input('IdPersonel'))
            //     ->update([
            //         'IsSkill'=>1
            //     ]);

            $this->History->store(21,2,json_encode($requestData));
            DB::commit();
        }catch (\Throwable $e){
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
        $item = DB::table('personnel_auditor_skill')
            ->select('*')
            ->where('Code', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('personnel_auditor_skill')
                ->where('Code',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            // DB::table('personnel_auditor')
            //     ->where('Id',$item->IdPersonel)
            //     ->update([
            //         'IsSkill'=>0
            //     ]);

            $this->History->store(21,3,json_encode($item));
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
            'IdPersonel'=>'required',
            'IdOrganizer'=>'required',
            'IdStandartAudit'=>'required',
            'Date'=>'required'
        ];
    }
}
