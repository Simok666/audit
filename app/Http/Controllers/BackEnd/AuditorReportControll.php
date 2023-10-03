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
use PDF;

class AuditorReportControll extends Controller
{
    protected $History;
//    protected $DBMain;
    protected $UploadFile;

    public function __construct() {
        $this->History = new HistoryControll();
//        $this->DBMain = DB::connection('wdb_auditsys');
        $this->UploadFile = new UploadFileControll();
    }

    public function index(Request $request){
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('audit_report as adr')
            ->select(
                'adr.Id as id',
                'adr.NoTrans',
                'adr.RefNumber',
                'adr.IdDepartmentAuditee',
                'adr.IdAuditSelection',
                'adr.IdPositionAuditee',
                'adr.OrganizerAudit',
                'adr.AuditorDate',
                'adr.PotentialNonConformitiy',
                'adr.TypeNonConformity',
                'adr.Path',
                'asd.IdAuditee',
                'asd.IdAuditor',
                'asd.IdObserver',
                'dpt.Department',
                'pad.Name as LeadAuditor',
                'adr.ApprovedOrdinal',
                'adr.StatusApproved',
                'adr.IsCapaPlan',
                'adr.Actived'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','adr.IdAuditSelection')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->orderBy($field, $dir)
            ->where('adr.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);


        foreach($data as $key=>$val){
            $val->AuditCriteria = $this->getAuditCriteriaPlan($val->IdAuditSelection);
            $val->ApprovedEmployee = $this->getApprovalEmployee($val->ApprovedOrdinal,$val->id);
            $val->CekAuditor = $this->cekAuditorSelection($val->IdAuditSelection);
        }

        return $data;
    }

    public function cekAuditorSelection($id){
        $Status = false;
        $Auditor = DB::table('audit_selection_auditor')
            ->where('Actived','>',0)
            ->where('IdAuditSelection',$id)
            ->where('IdEmployeAuditor',session('adminvue')->IdEmployee)
            ->first();

        if(!empty($Auditor)){
            $Status = true;
        }

        return $Status;
    }

    public function getAuditCriteriaPlan($id){
        $criteria = DB::table('audit_selection_clause as apc')
            ->select('apc.Id','sdt.Standart','apc.IdClauseAudit as Clause')
            ->join('standart_audit as sdt','sdt.Id','=','apc.IdStandartAudit')
            ->where('apc.Actived','>',0)
            ->where('apc.IdAuditSelection',$id)
            ->get();

        return $criteria;
    }

    public function getSelect(){
        $IdAudit = DB::table('audit_selection as asl')
            ->select('asl.Id','adp.Id as IdAuditPlane','asl.IdDepartmentAuditee','asl.NoTrans','dpt.Department as DepartmentAuditee','adp.OrganizerAudit','adp.OpeningMeeting')
            ->join('audit_plane as adp','adp.Id','=','asl.IdAuditPlane')
            ->join('department as dpt','dpt.Id','=','asl.IdDepartmentAuditee')
            ->join('audit_selection_auditor as asa','asa.IdAuditSelection','=','asl.Id')
            ->where('asl.Actived','>',0)
            ->where('asl.StatusApproved',2)
            ->where('asl.IsReport',0)
            ->where('asa.IdEmployeAuditor',session('adminvue')->IdEmployee)
            ->groupby('asl.Id')
            ->get();

        return json_encode(array(
            'status'=>true,
            'IdAudit'=>$IdAudit
        ));
    }

    public function getApprovalEmployee($Ordinal,$Id){
        $IdEmployee = DB::table('audit_report_approval')
            ->where('Ordinal',$Ordinal)
            ->where('IdAuditReport',$Id)
            ->where('Actived',1)
            ->value('IdEmployeApproval');

        return $IdEmployee;
    }

    public function getAuditDetail(Request $request){
        $DetailAuditSelection = DB::table('audit_selection_detail as asd')
            ->select('asd.IdPositionAuditee','asd.IdAuditee','asd.IdLeadAuditor','pad.Name as LeadAuditor','asd.IdAuditor','asd.IdObserver')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->where('asd.Actived','>',0)
            ->where('asd.IdAuditSelection',$request->input('IdAuditSelection'))
            ->first();

        $ClauseAuditSelection = DB::table('audit_selection_clause as asc')
            ->select('asc.IdStandartAudit','asc.IdClauseAudit','sdt.Standart as StandartAudit')
            ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
            ->where('asc.Actived','>',0)
            ->where('asc.IdAuditSelection',$request->input('IdAuditSelection'))
            ->get();

        $Auditor = '';
        $Auditee = '';
        $Observer = '';
        $LeadAuditor = $DetailAuditSelection->LeadAuditor;
        $IdPositionAuditee = $DetailAuditSelection->IdPositionAuditee;
        $HeadAuditeeId = 0;
        $HeadAuditeePosition = 0;

        foreach(json_decode($DetailAuditSelection->IdAuditor) as $key=>$val){
            if($key == 0){
                $Auditor = $val->Employee;
            }else{
                $Auditor .= ', '.$val->Employee;
            }
        }

        foreach(json_decode($DetailAuditSelection->IdAuditee) as $key=>$val){
            if($key == 0){
                $Auditee = $val->Employee;
            }else{
                $Auditee .= ', '.$val->Employee;
            }

            $employeeAuditee = DB::table('employee as emp')
                ->select('emp.Id','emp.Name','pst.Id as Position')
                ->join('position as pst','pst.Id','=','emp.IdPosition')
                ->where('emp.Id',$val->Id)
                ->where('pst.Parent',0)
                ->where('pst.Actived','>',0)
                ->where('emp.Actived','>',0)
                ->first();



            if(!empty($employeeAuditee)){
                $HeadAuditeeId = $employeeAuditee->Id;
                $HeadAuditeePosition = $employeeAuditee->Position;
            }
        }


        if(json_decode($DetailAuditSelection->IdObserver)!=""){
            foreach(json_decode($DetailAuditSelection->IdObserver) as $key=>$val){
                if($key == 0){
                    $Observer = $val->Employee;
                }else{
                    $Observer .= ', '.$val->Employee;
                }
            }
        }else{
            $DetailAuditSelection->IdObserver=[];
        }

        foreach($ClauseAuditSelection as $key=>$val){
            $Clause = '';

            if(!empty($val->IdClauseAudit)||$val->IdClauseAudit!=""){
                $arrCaluse=json_decode($val->IdClauseAudit);

                foreach($arrCaluse as $i=>$value){
                    if($i == 0){
                        $Clause = $value->Clause;
                    }else{
                        $Clause .= ', '.$value->Clause;
                    }
                }
            }

            $val->Clause = $Clause;
        }

        return json_encode(array(
            'status'=>true,
            'Auditor'=>$Auditor,
            'Auditee'=>$Auditee,
            'LeadAuditor'=>$LeadAuditor,
            'Observer'=>$Observer,
            'HeadAuditee'=>$HeadAuditeeId,
            'HeadAuditeePosition'=>$HeadAuditeePosition,
            'AuditClause'=>$ClauseAuditSelection,
            'IdPositionAuditee'=>$IdPositionAuditee,
            'IdLeadAuditor'=>$DetailAuditSelection->IdLeadAuditor
        ));
    }

    public function getFoundCriteria(Request $request){
        $clause = DB::table('clause_audit as cad')
            ->select(
                'cad.Id',
                'cad.IdStandart',
                'cad.Parent',
                DB::raw('CONCAT(sdt.Standart," ",cad.Clause," ",cad.Requirements)as Requirements')
            )
            ->join('standart_audit as sdt','sdt.Id','=','cad.IdStandart')
            ->where('cad.Actived','>',0)
            ->whereIn('cad.Parent',$request->input('ClauseArr'))
            ->orderby('sdt.Id','asc')
            ->orderByRaw('cad.Clause * 1 asc')
            ->get();

        return json_encode(array(
            'status'=>true,
            'Clause'=>$clause
        ));
    }

    public function show(Request $request){
        $item = DB::table('audit_report as adr')
            ->select(
                'adr.Id',
                'adr.NoTrans',
                'adr.RefNumber',
                'dpt.Department as AuditeeDepartment',
                'adr.AuditorDate',
                'adr.PotentialNonConformitiy',
                'adr.TypeNonConformity',
                'adr.CreateAt',
                'adr.UpdateAt',
                'asd.IdLeadAuditor',
                'usr.UserName as UserEntry'
            )
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->join('users as usr','usr.Id','=','adr.UserEntry')
            ->join('audit_selection as ads','ads.Id','=','adr.IdAuditSelection')
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','ads.Id')
            ->where('adr.Id',$request->input('Id'))
            ->first();

        $Approval = [];

        if(!empty($item)){
            $item->AuditorDate = Carbon::parse($item->AuditorDate)->format('d/m/Y');
            $item->CreateAt = Carbon::parse($item->CreateAt)->format('d/m/Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('d/m/Y H:i:s');
            $item->LeadAuditor = DB::table('personnel_auditor')
                ->select('IdEmploye')
                ->where('Actived','>',0)
                ->where('Id',$item->IdLeadAuditor)
                ->value('IdEmploye');
            $Approval = DB::table('audit_report_approval as arp')
                ->select(
                    'emp.Name',
                    'arp.IdEmployeApproval',
                    'arp.Status'
                )
                ->join('employee as emp','emp.Id','=','arp.IdEmployeApproval')
                ->where('arp.IdAuditReport',$item->Id)
                ->where('arp.Actived','>',0)
                ->get();
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'Approval'=>$Approval
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
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,9); //9 path auditor-report
                }
            }
        }

        if(count($fileAttachment) > 0){
            $fileAttachment = json_encode($fileAttachment);
        }else{
            $fileAttachment = '';
        }

        $AuditorDate = Carbon::parse($request->input('AuditorDate'))->format('Y-m-d');
        $MREmployee = DB::table('employee as emp')
            ->select('emp.Id','emp.Name','pst.Id as IdPosition')
            ->join('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->join('position as pst','pst.Id','=','emp.IdPosition')
            ->where('emp.Actived','>',0)
            ->where('dpt.Actived','>',0)
            ->where('pst.Actived','>',0)
            ->where('pst.Id',85)
            ->where('pst.IdDepartment',100)
            ->first();


        $LeadAuditor = DB::table('personnel_auditor')
            ->select('IdEmploye','IdPosition')
            ->where('Actived','>',0)
            ->where('Id',$request->input('IdLeadAuditor'))
            ->first();

        if($request->input('HeadAuditee')==0){
            return json_encode(array(
                'status'=>false,
                'message'=>'Head Auditee Tidak Tersedia Cek User Karyawan Dan Personal Auditor',
                'validation'=>$validation->errors()
            ));
        }
        if(empty($LeadAuditor)||$LeadAuditor==null){
            return json_encode(array(
                'status'=>false,
                'message'=>'Lead Auditor Tidak Tersedia Cek User Karyawan Dan Personal Auditor',
                'validation'=>$validation->errors()
            ));
        }
        if(empty($MREmployee)){
            return json_encode(array(
                'status'=>false,
                'message'=>'MR Belum Di Pilih',
                'validation'=>$validation->errors()
            ));
        }
        $LeadAuditorArr = array('Id'=>$LeadAuditor->IdEmploye,'Position'=>$LeadAuditor->IdPosition);
        $HeadAuditeeArr = array('Id'=>$request->input('HeadAuditee'),'Position'=>$request->input('HeadAuditeePosition'));
        $MREmployeeArr = array('Id'=>$MREmployee->Id,'Position'=>$MREmployee->IdPosition);



        if(empty($MREmployee)){
            return json_encode(array(
                'status'=>false,
                'message'=>'MR Belum Di Pilih',
                'validation'=>$validation->errors()
            ));
        }
        if(empty($LeadAuditor)){
            return json_encode(array(
                'status'=>false,
                'message'=>'Lead Auditor Belum Di Pilih',
                'validation'=>$validation->errors(),
            ));
        }
        $ArrApproval = [];
        array_push($ArrApproval,$LeadAuditorArr,$HeadAuditeeArr,$MREmployeeArr);

        DB::begintransaction();
        try {
            $IdAuditReport = DB::table('audit_report')
                ->insertGetId([
                    'NoTrans'=>$request->input('NoTrans'),
                    'IdAuditSelection'=>$request->input('IdAuditSelection'),
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    'OrganizerAudit'=>$request->input('OrganizerAudit'),
                    'AuditorDate'=>$AuditorDate,
                    'PotentialNonConformitiy'=>$request->input('PotentialNonConformitiy'),
                    'TypeNonConformity'=>$request->input('TypeNonConformity'),
                    'Path'=>$fileAttachment,
                    'StatusApproved'=>1,
                    'UserEntry'=>session('adminvue')->Id
                ]);

            foreach ($ArrApproval as $key => $value){
                DB::table('audit_report_approval')
                    ->insert([
                        'Ordinal'=>$key,
                        'IdAuditReport'=>$IdAuditReport,
                        'IdPositionApproval'=>$value['Position'],
                        'IdEmployeApproval'=>$value['Id'],
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            foreach(json_decode($request->input('CriteriaFound')) as $key => $value){
                DB::table('audit_report_criteria')
                    ->insert([
                        'IdAuditReport'=>$IdAuditReport,
                        'IdClauseAudit'=>$value->Id,
                        'IdStandartAudit'=>$value->IdStandart,
                        'Parent'=>$value->Parent,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }
            DB::table('audit_report')
                ->select('Id')
                ->where('Actived','>',0)
                ->where('StatusApproved','<',3)
                ->where('IdAuditSelection',$request->input('IdAuditSelection'))
                ->count();

            $auditorteam= DB::table('audit_selection_detail')
                ->select('IdAuditor')
                ->where('Actived','>',0)
                ->where('IdAuditSelection',$request->input('IdAuditSelection'))
                ->value('IdAuditor');
            if(!empty($auditorteam)){
                $countauditor=json_decode($auditorteam);
//                if($countreport>=count($countauditor)){
//                    DB::table('audit_selection')
//                        ->where('Id',$request->input('IdAuditSelection'))
//                        ->update([
//                            'IsReport'=>1
//                        ]);
//                }
            }


            $this->History->store(28,1,json_encode($requestData));
            DB::commit();
        }catch(\Throwable $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Save Data Failed, Server Invalid!',
                'validation'=>$e->getMessage(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Save Data Success!',
        ));
    }

    public function edit(Request $request){
        $item = DB::table('audit_report as adr')
            ->select(
                'adr.Id',
                'adr.NoTrans',
                'adr.IdAuditPlane',
                'adr.IdAuditSelection',
                'adr.IdDepartmentAuditee',
                'adr.OrganizerAudit',
                'adr.AuditorDate',
                'adr.PotentialNonConformitiy',
                'adr.TypeNonConformity',
                'adr.Path',
                'adp.OpeningMeeting',
                'dpt.Department'
            )
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->join('audit_plane as adp','adp.Id','=','adr.IdAuditPlane')
            ->where('adr.Id',$request->input('Id'))
            ->first();

        $criteria = DB::table('audit_report_criteria as arc')
            ->select(
                'cas.Id',
                'cas.IdStandart',
                'cas.Parent',
                DB::raw('CONCAT(sdt.Standart," ",cas.Clause," ",cas.Requirements)as Requirements')
            )
            ->join('clause_audit as cas','cas.Id','=','arc.IdClauseAudit')
            ->join('standart_audit as sdt','sdt.Id','=','cas.IdStandart')
            ->where('arc.Actived','>',0)
            ->where('arc.IdAuditReport',$request->input('Id'))
            ->get();

        if(!empty($item)){
            $item->Path = json_decode($item->Path);
            $item->IdAuditPlan = ['Id'=>$item->IdAuditSelection,'IdAuditPlane'=>$item->IdAuditPlane,'IdDepartmentAuditee'=>$item->IdDepartmentAuditee,'NoTrans'=>$item->NoTrans,'DepartmentAuditee'=>$item->Department,'OrganizerAudit'=>$item->OrganizerAudit,'OpeningMeeting'=>$item->OpeningMeeting];
            $item->TypeNonConformity = ['value'=>$item->TypeNonConformity,'text'=>$item->TypeNonConformity];
            $item->CriteriaFound = $criteria;
            $item->Auditor = '';
            $item->Auditee = '';
            $item->Observer = '';
            $item->LeadAuditor = '';
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
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,8); //6 path auditor-skill
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

        $AuditorDate = Carbon::parse($request->input('AuditorDate'))->format('Y-m-d');
        $MREmployee = DB::table('employee as emp')
            ->select('emp.Id','emp.Name','pst.Id as IdPosition')
            ->join('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->join('position as pst','pst.Id','=','emp.IdPosition')
            ->where('emp.Actived','>',0)
            ->where('dpt.Actived','>',0)
            ->where('pst.Actived','>',0)
            ->where('pst.Id',85)
            ->where('pst.IdDepartment',100)
            ->first();


        $LeadAuditor = DB::table('personnel_auditor')
            ->select('IdEmploye','IdPosition')
            ->where('Actived','>',0)
            ->where('Id',$request->input('IdLeadAuditor'))
            ->first();

        $LeadAuditorArr = array('Id'=>$LeadAuditor->IdEmploye,'Position'=>$LeadAuditor->IdPosition);
        $HeadAuditeeArr = array('Id'=>$request->input('HeadAuditee'),'Position'=>$request->input('HeadAuditeePosition'));
        $MREmployeeArr = array('Id'=>$MREmployee->Id,'Position'=>$MREmployee->IdPosition);

        if($request->input('HeadAuditee')==0){
            return json_encode(array(
                'status'=>false,
                'message'=>'HeadAuditee Belum Di Pilih',
                'validation'=>$validation->errors(),
            ));
        }
        if(empty($MREmployee)){
            return json_encode(array(
                'status'=>false,
                'message'=>'MR Belum Di Pilih',
                'validation'=>$validation->errors(),
            ));
        }
        if(empty($LeadAuditor)){
            return json_encode(array(
                'status'=>false,
                'message'=>'Lead Auditor Belum Di Pilih',
                'validation'=>$validation->errors(),
            ));
        }

        $ArrApproval = [];
        array_push($ArrApproval,$LeadAuditorArr,$HeadAuditeeArr,$MREmployeeArr);

        $oldItem = DB::table('audit_report')
            ->select('IdAuditSelection')
            ->where('Id',$request->input('Id'))
            ->first();

        DB::begintransaction();
        try {
            DB::table('audit_report')
                ->where('Id',$request->input('Id'))
                ->update([
                    'NoTrans'=>$request->input('NoTrans'),
                    'CriteriaFound'=>$request->input('CriteriaFound'),
                    'IdAuditSelection'=>$request->input('IdAuditSelection'),
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    'OrganizerAudit'=>$request->input('OrganizerAudit'),
                    'AuditorDate'=>$AuditorDate,
                    'PotentialNonConformitiy'=>$request->input('PotentialNonConformitiy'),
                    'TypeNonConformity'=>$request->input('TypeNonConformity'),
                    'Path'=>$fileAttachment
                ]);

            foreach ($ArrApproval as $key => $value){
                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$key)
                    ->update([
                        'IdPositionApproval'=>$value['Position'],
                        'IdEmployeApproval'=>$value['Id']
                    ]);
            }

            DB::table('audit_report_criteria')->where('Actived','>',0)->where('IdAuditReport',$request->input('Id'))->update(['Actived'=>0]);

            foreach(json_decode($request->input('CriteriaFound')) as $key => $value){
                DB::table('audit_report_criteria')
                    ->insert([
                        'IdAuditReport'=>$request->input('Id'),
                        'IdClauseAudit'=>$value->Id,
                        'IdStandartAudit'=>$value->IdStandart,
                        'Parent'=>$value->Parent,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            DB::table('audit_selection')
                ->where('Id',$oldItem->IdAuditSelection)
                ->update([
                    'IsReport'=>0
                ]);

//            DB::table('audit_selection')
//                ->where('Id',$request->input('IdAuditSelection'))
//                ->update([
//                    'IsReport'=>1
//            ]);

            $this->History->store(28,2,json_encode($requestData));
            DB::commit();
        }catch(Exception $e){
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
        $item = DB::table('audit_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_report')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_report_approval')
                ->where('IdAuditReport',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);


            $countreport= DB::table('audit_report')
                ->select('Id')
                ->where('Actived','>',0)
                ->where('StatusApproved','<',3)
                ->where('IdAuditSelection',$request->input('IdAuditSelection'))
                ->count();

            $auditorteam= DB::table('audit_selection_detail')
                ->select('IdAuditor')
                ->where('Actived','>',0)
                ->where('IdAuditSelection',$item->IdAuditSelection)
                ->value('IdAuditor');

            if(!empty($auditorteam)){
                $countauditor=json_decode($auditorteam);
                if($countreport>=count($countauditor)){
                    DB::table('audit_selection')
                        ->where('Id',$item->IdAuditSelection)
                        ->update([
                            'IsReport'=>0
                        ]);
                }
            }

            $this->History->store(28,3,json_encode($item));
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

    public function publish(Request $request){
        $item = DB::table('audit_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $approval = DB::table('audit_report_approval')
            ->where('IdAuditReport',$request->input('Id'))
            ->where('Ordinal',0)
            ->first();

        $auditApprove = DB::table('audit_selection_detail')
            ->select('AuditorId')
            ->where('IdAuditSelection',$item->IdAuditSelection)
            ->where('Actived','>',0)
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_report')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>2
                ]);

            DB::table('notification')
                ->insert([
                    'IdEmployee'=>$approval->IdEmployeApproval,
                    'Header'=>'Audit Report',
                    'Message'=>'Silahkan Setujui Audit Report Dengan Id Audit '.$item->NoTrans,
                    'Url'=>'/RoleAdmin/approval/data-approval-auditor-report',
                    'UserEntry'=>session('adminvue')->Id
                ]);

            foreach(json_decode($auditApprove->AuditorId) as $key => $value){
                DB::table('notification')
                    ->insert([
                        'IdEmployee'=>$value,
                        'Header'=>'Audit Report',
                        'Message'=>'Silahkan Setujui Audit Report Dengan Id Audit '.$item->NoTrans,
                        'Url'=>'/RoleAdmin/approval/data-approval-auditor-report',
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            $this->History->store(28,5,json_encode($item));
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
            'message'=>'Send to Workflow Success!',
        ));
    }

    public function approveData($id,Request $request){
        $item = DB::table('audit_report as adr')
            ->select('adr.*','dpt.Department','sdt.Standart')
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->join('audit_selection_clause as asc','asc.IdAuditSelection','=','adr.IdAuditSelection')
            ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
            ->where('adr.Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($id == 0){
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }else if($id == 1){
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }else{
                $countSequence = DB::table('audit_report')
                    ->where('Actived','>',0)
                    ->count();
                $RefNumber = Carbon::now()->format('Y').'.'.$item->Standart.'.'.$item->Department.'.'.str_pad($countSequence, 3, '0', STR_PAD_LEFT);

                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'StatusApproved'=>2,
                        'RefNumber'=>$RefNumber
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }


            $this->History->store(28,5,json_encode($item));
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
            'message'=>'Approve Data Success!',
        ));
    }

    public function rejectData($id,Request $request){
        $item = DB::table('audit_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($id == 1){
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>3
                    ]);
            }else{
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>3
                    ]);
            }

            $this->History->store(28,5,json_encode($item));
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
            'message'=>'Reject Data Success!',
        ));
    }

    public function exportStatusAudit($id){
        $item = DB::table('audit_report as adr')
            ->select(
                'adr.Id',
                'adr.IdAuditSelection',
                'adr.TypeNonConformity',
                'ads.AuditDate',
                'ads.HourStart',
                'ads.HourDone',
                'adr.AuditScore',
                'adr.AuditGrade',
                'dpt.Department'
            )
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->join('audit_selection as ads','ads.Id','=','adr.IdAuditSelection')
            ->where('adr.Id',$id)
            ->first();

        if(!empty($item)){
            $Auditor = [];
            $Auditee = [];

            $DetailAuditSelection = DB::table('audit_selection_detail as asd')
                ->select('asd.IdAuditee','asd.IdAuditor','pad.Name as LeadAuditor')
                ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
                ->where('asd.Actived','>',0)
                ->where('asd.IdAuditSelection',$item->IdAuditSelection)
                ->first();

            $DetailAuditClause = DB::table('audit_selection_clause as asc')
                ->select('asc.IdClauseAudit','sdt.Standart as StandartAudit')
                ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
                ->where('sdt.Actived','>',0)
                ->where('asc.Actived','>',0)
                ->where('asc.IdAuditSelection',$item->IdAuditSelection)
                ->get();

            foreach(json_decode($DetailAuditSelection->IdAuditee) as $key=>$val){
                array_push($Auditee,$val->Employee);
            }

            array_push($Auditor,$DetailAuditSelection->LeadAuditor);

            foreach(json_decode($DetailAuditSelection->IdAuditor) as $key=>$val){
                array_push($Auditor,$val->Employee);
            }
            $item->Auditor = $Auditor;
            $item->Auditee = $Auditee;
            $item->AuditClause = $DetailAuditClause;

            $item->AuditDate = Carbon::parse($item->AuditDate)->format('l, d F Y');
            $item->HourStart = Carbon::parse($item->HourStart)->format('H.II');
            $item->HourDone = Carbon::parse($item->HourDone)->format('H.II');

            $Title = "Data Status Audit";
            $Header = "Kartu Status Audit Internal Sistem Mutu, K3 dan Lingkungan";
            $SubHeader = "Quality, Health, Safety and Environment System Internal Audit Status Card";
            $noOrder = "010GH0-005.01";

            $view = view('export-pdf.header-landscape',compact('Title','Header','SubHeader','noOrder'))->render();
            $view .= view('export-pdf.pdf-status-audit',compact('item'))->render();
            $view .= view('export-pdf.footer')->render();



            $pdf = PDF::loadHTML($view);
            return $pdf->stream();
        }

    }

    public function closeData(Request $request){
        $item = DB::table('audit_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_report')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IsCapaPlan'=>1
                ]);

            $this->History->store(32,5,json_encode($item));
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
            'message'=>'Close Data Success!',
        ));
    }

    public function validation(){
        return[
            'IdAuditSelection'=>'required'
        ];
    }
}
