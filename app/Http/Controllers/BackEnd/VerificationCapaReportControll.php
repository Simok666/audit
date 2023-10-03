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

class VerificationCapaReportControll extends Controller
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

        $query =DB::table('audit_capa_verification as acv')
            ->select(
                'acv.Id as id',
                'acv.NoTrans',
                'adr.RefNumber',
                'adr.Path as PathReport',
                'acv.IdVerificationExecution',
                'asa.IdEmployeAuditor',
                'ase.IdEmployeAuditee',
                'acv.IdDepartmentAuditee',
                'acv.IdAuditSelection',
                'acv.IdPositionAuditee',
                'acv.OrganizerAudit',
                'acv.AuditorDate',
                'acv.PotentialNonConformitiy',
                'acv.TypeNonConformity',
                'acp.PathPreventive',
                'acp.PathCorrective',
                'asd.IdAuditee',
                'asd.IdAuditor',
                'asd.IdObserver',
                'dpt.Department',
                'pad.Name as LeadAuditor',
                'acv.ApprovedOrdinal',
                'acv.StatusApproved',
                'acv.Actived'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','acv.IdAuditSelection')
            ->join('audit_selection_auditor as asa','asa.IdAuditSelection','=','acv.IdAuditSelection')
            ->join('audit_selection_auditee as ase','ase.IdAuditSelection','=','acv.IdAuditSelection')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','acv.IdDepartmentAuditee')
            ->join('audit_report as adr','adr.Id','=','acv.IdAuditReport')
            ->join('audit_capa_plane as acp','acp.Id','=','acv.IdAuditCapaPlane')
            ->orderBy($field, $dir)
            ->where('acv.Actived','>',0)
            ->where('asa.Actived','>',0)
            ->where('ase.Actived','>',0)
            ->where(function($q){
                $q->where('asa.IdEmployeAuditor',session('adminvue')->IdEmployee)
                ->orwhere('ase.IdEmployeAuditee',session('adminvue')->IdEmployee);
            })
            ->groupby('acv.Id');;

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
        }

        return $data;
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

    public function getSelect(Request $request){
        if($request->input('Auditee') == true){
            $IdAudit = DB::table('audit_capa_plane as acp')
                ->select('acp.Id','acp.IdAuditReport','acp.IdAuditSelection','adp.Id as IdAuditPlane','acp.IdDepartmentAuditee','acp.NoTrans','dpt.Department as DepartmentAuditee','adp.OrganizerAudit')
                ->join('audit_plane as adp','adp.Id','=','acp.IdAuditPlane')
                ->join('department as dpt','dpt.Id','=','acp.IdDepartmentAuditee')
                ->join('audit_selection_auditee as ase','ase.IdAuditSelection','=','acp.IdAuditSelection')
                ->where('acp.Actived','>',0)
                ->where('acp.StatusApproved',2)
                ->where('acp.IsVerif',0)
                ->where('ase.IdEmployeAuditee',session('adminvue')->IdEmployee)
                ->where('ase.Actived','>',0)
                ->groupby('acp.Id')
                ->get();
        }else{
            $IdAudit = DB::table('audit_capa_plane as acp')
                ->select('acp.Id','acp.IdAuditReport','acp.IdAuditSelection','adp.Id as IdAuditPlane','acp.IdDepartmentAuditee','acp.NoTrans','dpt.Department as DepartmentAuditee','adp.OrganizerAudit')
                ->join('audit_plane as adp','adp.Id','=','acp.IdAuditPlane')
                ->join('department as dpt','dpt.Id','=','acp.IdDepartmentAuditee')
                ->where('acp.Actived','>',0)
                ->where('acp.StatusApproved',2)
                ->where('acp.IsVerif',0)
                ->get();
        }
        

        $Verif = DB::table('capa_verification_excecution')
            ->select('Id','Name')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'IdAudit'=>$IdAudit,
            'Verif'=>$Verif
        ));
    }

    public function getApprovalEmployee($Ordinal,$Id){
        $IdEmployee = DB::table('audit_capa_approval_verification')
            ->where('Ordinal',$Ordinal)
            ->where('IdAuditVerificationCapa',$Id)
            ->where('Actived',1)
            ->value('IdEmployeApproval');

        return $IdEmployee;
    }

    public function getAuditDetail(Request $request){
        $PlanCapaReport = DB::table('audit_capa_plane')
            ->select('GapAnalysis','ConditionNow','PotentialCauseNonConformitiy','CorrectiveAction','ExecutionPlaneCorrective','PreventiveAction','ExecutionPreventiveAction','PathCorrective','PathPreventive')
            ->where('Id',$request->input('IdAuditCapaPlane'))
            ->first();

        $AuditReport = DB::table('audit_report')
            ->select('PotentialNonConformitiy','TypeNonConformity','Path','RefNumber','AuditorDate')
            ->where('Actived','>',0)
            ->where('Id',$request->input('IdAuditReport'))
            ->first();

        $DetailAuditSelection = DB::table('audit_selection_detail as asd')
            ->select('asd.IdPositionAuditee','asd.IdAuditee','asd.IdLeadAuditor')
            ->where('asd.Actived','>',0)
            ->where('asd.IdAuditSelection',$request->input('IdAuditSelection'))
            ->first();

        $ClauseAuditSelection = DB::table('audit_selection_clause as asc')
            ->select('asc.IdStandartAudit','asc.IdClauseAudit','sdt.Standart as StandartAudit')
            ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
            ->where('asc.Actived','>',0)
            ->where('asc.IdAuditSelection',$request->input('IdAuditSelection'))
            ->get();

        $HeadAuditeeId = 0;
        $HeadAuditeePosition = 0;
        $AuditReport->Path = json_decode($AuditReport->Path);
        $PlanCapaReport->PathCorrective = json_decode($PlanCapaReport->PathCorrective);
        $PlanCapaReport->PathPreventive = json_decode($PlanCapaReport->PathPreventive);

        foreach(json_decode($DetailAuditSelection->IdAuditee) as $key=>$val){
            $employeeAuditee = DB::table('employee as emp')
                ->select('emp.Id','emp.Name','pst.Id as Position')
                ->join('position as pst','pst.Id','=','emp.IdPosition')
                ->where('emp.Id',$val->Id)
                ->where('pst.Parent',0)
                ->first();

            if(!empty($employeeAuditee)){
                $HeadAuditeeId = $employeeAuditee->Id;
                $HeadAuditeePosition = $employeeAuditee->Position;
            }
        }

        foreach($ClauseAuditSelection as $key=>$val){
            $Clause = '';

            foreach(json_decode($val->IdClauseAudit) as $i=>$value){
                if($i == 0){
                    $Clause = $value->Clause;
                }else{
                    $Clause .= ', '.$value->Clause;
                }
            }

            $val->Clause = $Clause;
        }

        return json_encode(array(
            'status'=>true,
            'HeadAuditee'=>$HeadAuditeeId,
            'HeadAuditeePosition'=>$HeadAuditeePosition,
            'AuditClause'=>$ClauseAuditSelection,
            'IdPositionAuditee'=>$DetailAuditSelection->IdPositionAuditee,
            'IdLeadAuditor'=>$DetailAuditSelection->IdLeadAuditor,
            'AuditReport'=>$AuditReport,
            'PlanCapaReport'=>$PlanCapaReport
        ));
    }

    public function show(Request $request){
        $item = DB::table('audit_capa_verification as acv')
            ->select(
                'acv.Id',
                'acv.NoTrans',
                'adr.RefNumber',
                'dpt.Department as AuditeeDepartment',
                'acv.ReAudit',
                'acv.ReAuditDate',
                'acv.RecommendationExecution',
                'cve.Name as VerificationExcecution',
                'acv.CreateAt',
                'acv.UpdateAt',
                'usr.UserName as UserEntry'
            )
            ->join('department as dpt','dpt.Id','=','acv.IdDepartmentAuditee')
            ->join('audit_report as adr','adr.Id','=','acv.IdAuditReport')
            ->leftjoin('capa_verification_excecution as cve','cve.Id','=','acv.IdVerificationExecution')
            ->join('users as usr','usr.Id','=','adr.UserEntry')
            ->where('acv.Id',$request->input('Id'))
            ->first();

        $Approval = [];

        if(!empty($item)){
            if($item->ReAudit == 1){
                $item->ReAuditDate = Carbon::parse($item->ReAuditDate)->format('d/m/Y');
                $item->ReAudit = 'Ya';
            }else{
                $item->ReAudit = 'Tidak';
            }

            $item->CreateAt = Carbon::parse($item->CreateAt)->format('d/m/Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('d/m/Y H:i:s');
            $Approval = DB::table('audit_capa_approval_verification as acv')
                ->select(
                    'emp.Name',
                    'acv.Status'
                )
                ->join('employee as emp','emp.Id','=','acv.IdEmployeApproval')
                ->where('acv.IdAuditVerificationCapa',$item->Id)
                ->where('acv.Actived','>',0)
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

        $fileAttachmentCorrective = [];
        if($request->has('FileAttachmentCorrective')){
            $arrFile = $request->file('FileAttachmentCorrective');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $fileAttachmentCorrective[$key] = $this->UploadFile->uploadFile($val,10); //10 path plan-capa-report
                }
            }
        }

        $FileAttachmentPreventive = [];
        if($request->has('FileAttachmentPreventive')){
            $arrFile = $request->file('FileAttachmentPreventive');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $FileAttachmentPreventive[$key] = $this->UploadFile->uploadFile($val,10); //10 path plan-capa-report
                }
            }
        }

        if(count($fileAttachmentCorrective) > 0){
            $fileAttachmentCorrective = json_encode($fileAttachmentCorrective);
        }else{
            $fileAttachmentCorrective = '';
        }

        if(count($FileAttachmentPreventive) > 0){
            $FileAttachmentPreventive = json_encode($FileAttachmentPreventive);
        }else{
            $FileAttachmentPreventive = '';
        }

        // $ReAuditDate = '';
        // if($request->input('ReAuditDate') != ''){
        //     $ReAuditDate = Carbon::parse($request->input('ReAuditDate'))->format('Y-m-d');
        // }
        $AuditorDate = Carbon::parse($request->input('AuditorDate'))->format('Y-m-d');

        $MREmployee = DB::table('employee as emp')
            ->select('emp.Id','emp.Name','pst.Id as IdPosition')
            ->join('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->join('position as pst','pst.Id','=','emp.IdPosition')
            ->where('emp.Actived','>',0)
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

        $ArrApproval = [];
        array_push($ArrApproval,$HeadAuditeeArr,$LeadAuditorArr,$MREmployeeArr);

        DB::begintransaction();
        try{
            $IdAuditVerificationCapa = DB::table('audit_capa_verification')
                ->insertGetId([
                    'NoTrans'=>$request->input('NoTrans'),
                    'IdAuditReport'=>$request->input('IdAuditReport'),
                    'IdAuditSelection'=>$request->input('IdAuditSelection'),
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'IdAuditCapaPlane'=>$request->input('IdAuditCapaPlane'),
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    // 'IdVerificationExecution'=>$request->input('IdVerificationExecution'),
                    'OrganizerAudit'=>$request->input('OrganizerAudit'),
                    'AuditorDate'=>$AuditorDate,
                    'PotentialNonConformitiy'=>$request->input('PotentialNonConformitiy'),
                    'TypeNonConformity'=>$request->input('TypeNonConformity'),
                    // 'ReAudit'=>$request->input('ReAudit'),
                    // 'ReAuditDate'=>$ReAuditDate,
                    // 'RecommendationExecution'=>$request->input('RecommendationExecution'),
                    // 'Status'=>$request->input('Status'),
                    'StatusApproved'=>1,
                    'UserEntry'=>session('adminvue')->Id
                ]);

            foreach ($ArrApproval as $key => $value){
                DB::table('audit_capa_approval_verification')
                    ->insert([
                        'Ordinal'=>$key,
                        'IdAuditVerificationCapa'=>$IdAuditVerificationCapa,
                        'IdAuditReport'=>$request->input('IdAuditReport'),
                        'IdPositionApproval'=>$value['Position'],
                        'IdEmployeApproval'=>$value['Id'],
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            DB::table('audit_capa_plane')
                ->where('Id',$request->input('IdAuditCapaPlane'))
                ->update([
                    'IsVerif'=>1,
                    'PathCorrective'=>$fileAttachmentCorrective,
                    'PathPreventive'=>$FileAttachmentPreventive
                ]);

            $this->History->store(30,1,json_encode($requestData));
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

    public function edit(Request $request){
        $item = DB::table('audit_capa_verification as acv')
            ->select(
                'acv.Id',
                'acv.NoTrans',
                'acv.IdAuditPlane',
                'acv.IdAuditReport',
                'acv.IdAuditCapaPlane',
                'acv.IdAuditSelection',
                'acv.IdDepartmentAuditee',
                'acv.OrganizerAudit',
                'acv.IdVerificationExecution',
                'acv.ReAudit',
                'acv.ReAuditDate',
                'acv.RecommendationExecution',
                'acp.PathPreventive',
                'acp.PathCorrective',
                'acv.Status',
                'dpt.Department',
                'cve.Name as VerificationExecution'
            )
            ->join('department as dpt','dpt.Id','=','acv.IdDepartmentAuditee')
            ->leftjoin('capa_verification_excecution as cve','cve.Id','=','acv.IdVerificationExecution')
            ->join('audit_capa_plane as acp','acp.Id','=','acv.IdAuditCapaPlane')
            ->where('acv.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $Status = 'Open';
            if($item->Status == 2){
                $Status = 'Close';
            }
            $item->IdAuditPlan = ['Id'=>$item->IdAuditCapaPlane,'IdAuditReport'=>$item->IdAuditReport,'IdAuditSelection'=>$item->IdAuditSelection,'IdAuditPlane'=>$item->IdAuditPlane,'IdDepartmentAuditee'=>$item->IdDepartmentAuditee,'NoTrans'=>$item->NoTrans,'DepartmentAuditee'=>$item->Department,'OrganizerAudit'=>$item->OrganizerAudit];
            if($request->input('RevisiEdit') === true){
                $item->Status = $Status;
                $item->VerificationExecution = ['Id'=>$item->IdVerificationExecution,'Name'=>$item->VerificationExecution];
                if($item->IdVerificationExecution == 1){
                    $item->ReAudit = '';
                    $item->ReAuditDate = '';
                    $item->RecommendationExecution = '';
                }else{
                    $ReAudit = 'Ya';
                    if($item->ReAudit == 2){
                        $ReAudit = 'Tidak';
                    }
                    $item->ReAudit = ['value'=>$item->ReAudit,'text'=>$ReAudit];
                }
            }
            $item->File = '';
            $item->RefNumber = '';
            $item->PotentialNonConformitiy = '';
            $item->AuditorDate = '';
            $item->GapAnalysis = '';
            $item->PotentialCauseNonConformitiy = '';
            $item->CorrectiveAction = '';
            $item->ExecutionPlaneCorrective = '';
            $item->PreventiveAction = '';
            $item->ExecutionPreventiveAction = '';
            $item->PathCorrective = json_decode($item->PathCorrective);
            $item->PathPreventive = json_decode($item->PathPreventive);
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

        $fileAttachmentCorrective = [];
        if($request->has('FileAttachmentCorrective')){
            $arrFile = $request->file('FileAttachmentCorrective');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $fileAttachmentCorrective[$key] = $this->UploadFile->uploadFile($val,10); //10 path plan-capa-report
                }
            }
        }

        $FileAttachmentPreventive = [];
        if($request->has('FileAttachmentPreventive')){
            $arrFile = $request->file('FileAttachmentPreventive');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $FileAttachmentPreventive[$key] = $this->UploadFile->uploadFile($val,10); //10 path plan-capa-report
                }
            }
        }

        $OldFileAttachmentCorrective = json_decode($request->input('OldFileAttachmentCorrective'));
        foreach($OldFileAttachmentCorrective as $key=>$val){
            array_push($fileAttachmentCorrective,$val);
        }

        $OldFileAttachmentPreventive = json_decode($request->input('OldFileAttachmentPreventive'));
        foreach($OldFileAttachmentPreventive as $key=>$val){
            array_push($FileAttachmentPreventive,$val);
        }

        if(count($fileAttachmentCorrective) > 0){
            $fileAttachmentCorrective = json_encode($fileAttachmentCorrective);
        }else{
            $fileAttachmentCorrective = '';
        }

        if(count($FileAttachmentPreventive) > 0){
            $FileAttachmentPreventive = json_encode($FileAttachmentPreventive);
        }else{
            $FileAttachmentPreventive = '';
        }

        // $ReAuditDate = '';
        // if($request->input('ReAuditDate') != ''){
        //     $ReAuditDate = Carbon::parse($request->input('ReAuditDate'))->format('Y-m-d');
        // }
        $AuditorDate = Carbon::parse($request->input('AuditorDate'))->format('Y-m-d');

        $MREmployee = DB::table('employee as emp')
            ->select('emp.Id','emp.Name','pst.Id as IdPosition')
            ->join('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->join('position as pst','pst.Id','=','emp.IdPosition')
            ->where('emp.Actived','>',0)
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

        $ArrApproval = [];
        array_push($ArrApproval,$HeadAuditeeArr,$LeadAuditorArr,$MREmployeeArr);
        $oldItem = DB::table('audit_capa_verification')
            ->select('IdAuditCapaPlane')
            ->where('Id',$request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            $IdAuditVerificationCapa = DB::table('audit_capa_verification')
                ->where('Id',$request->input('Id'))
                ->update([
                    'NoTrans'=>$request->input('NoTrans'),
                    'IdAuditReport'=>$request->input('IdAuditReport'),
                    'IdAuditSelection'=>$request->input('IdAuditSelection'),
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'IdAuditCapaPlane'=>$request->input('IdAuditCapaPlane'),
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    // 'IdVerificationExecution'=>$request->input('IdVerificationExecution'),
                    'OrganizerAudit'=>$request->input('OrganizerAudit'),
                    'AuditorDate'=>$AuditorDate,
                    'PotentialNonConformitiy'=>$request->input('PotentialNonConformitiy'),
                    'TypeNonConformity'=>$request->input('TypeNonConformity'),
                    // 'ReAudit'=>$request->input('ReAudit'),
                    // 'ReAuditDate'=>$ReAuditDate,
                    // 'RecommendationExecution'=>$request->input('RecommendationExecution'),
                    // 'Status'=>$request->input('Status')
                ]);

            foreach ($ArrApproval as $key => $value){
                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$key)
                    ->update([
                        'IdAuditReport'=>$request->input('IdAuditReport'),
                        'IdPositionApproval'=>$value['Position'],
                        'IdEmployeApproval'=>$value['Id']
                    ]);
            }

            DB::table('audit_capa_plane')
                ->where('Id',$oldItem->IdAuditCapaPlane)
                ->update([
                    'IsVerif'=>0
                ]);

            DB::table('audit_capa_plane')
                ->where('Id',$request->input('IdAuditCapaPlane'))
                ->update([
                    'IsVerif'=>1,
                    'PathCorrective'=>$fileAttachmentCorrective,
                    'PathPreventive'=>$FileAttachmentPreventive
                ]);

            $this->History->store(30,2,json_encode($requestData));
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

    public function storeRevisi(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validation());

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $ReAuditDate = '';
        if($request->input('ReAuditDate') != ''){
            $ReAuditDate = Carbon::parse($request->input('ReAuditDate'))->format('Y-m-d');
        }
        // $AuditorDate = Carbon::parse($request->input('AuditorDate'))->format('Y-m-d');

        if($request->input('Status') == 'Close'){
            $Status = 2;
        }else{
            $Status = 1;
        }

        DB::begintransaction();
        try{
            DB::table('audit_capa_verification')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IdVerificationExecution'=>$request->input('IdVerificationExecution'),
                    'ReAudit'=>$request->input('ReAudit'),
                    'ReAuditDate'=>$ReAuditDate,
                    'RecommendationExecution'=>$request->input('RecommendationExecution'),
                    'Status'=>$Status
                ]);

            $this->History->store(30,2,json_encode($requestData));
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

    public function updateRevisi(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validation());

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $ReAuditDate = '';
        if($request->input('ReAuditDate') != ''){
            $ReAuditDate = Carbon::parse($request->input('ReAuditDate'))->format('Y-m-d');
        }
        // $AuditorDate = Carbon::parse($request->input('AuditorDate'))->format('Y-m-d');

        if($request->input('Status') == 'Close'){
            $Status = 2;
        }else{
            $Status = 1;
        }

        DB::begintransaction();
        try{
            DB::table('audit_capa_verification')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IdVerificationExecution'=>$request->input('IdVerificationExecution'),
                    'ReAudit'=>$request->input('ReAudit'),
                    'ReAuditDate'=>$ReAuditDate,
                    'RecommendationExecution'=>$request->input('RecommendationExecution'),
                    'Status'=>$Status
                ]);

            $this->History->store(30,2,json_encode($requestData));
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
        $item = DB::table('audit_capa_verification')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_capa_verification')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_capa_approval_verification')
                ->where('IdAuditVerificationCapa',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_capa_plane')
                ->where('Id',$item->IdAuditCapaPlane)
                ->update([
                    'IsVerif'=>0
                ]);

            $this->History->store(30,3,json_encode($item));
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

    public function publish(Request $request){
        $item = DB::table('audit_capa_verification')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($item->ApprovedOrdinal == 0){
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'Actived'=>2,
                        'ApprovedOrdinal'=>1
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('Ordinal',0)
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>2
                    ]);
            }else{
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('Ordinal',1)
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>2
                    ]);
            }
            

            // $approval = DB::table('audit_capa_approval_verification')
            //     ->where('IdAuditVerificationCapa',$request->input('Id'))
            //     ->where('Ordinal',0)
            //     ->first();

            // DB::table('notification')
            //     ->insert([
            //         'IdEmployee'=>$approval->IdEmployeApproval,
            //         'Header'=>'Verification Capa Report',
            //         'Message'=>'Silahkan Setujui Verification Capa Report Dengan Id Audit '.$item->NoTrans,
            //         'Url'=>'/RoleAdmin/approval/data-approval-verification-capa-report',
            //         'UserEntry'=>session('adminvue')->Id
            //     ]);

            $this->History->store(30,5,json_encode($item));
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
            'message'=>'Send to Workflow Success!',
        ));
    }

    public function approveData($id,Request $request){
        $item = DB::table('audit_capa_verification')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($id == 0){
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }else if($id == 1){
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }else{
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'StatusApproved'=>2
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }

            $this->History->store(30,5,json_encode($item));
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
        $item = DB::table('audit_capa_verification')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($id == 1){
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>3
                    ]);
            }else{
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>3
                    ]);
            }

            $this->History->store(30,5,json_encode($item));
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

    public function exportHasilAudit($id){
        $item = DB::table('audit_capa_verification as acv')
            ->select(
                'acv.Id',
                'adr.RefNumber',
                'acv.IdAuditSelection',
                'acv.IdAuditCapaPlane',
                'acv.IdAuditReport',
                'acv.AuditorDate',
                'acv.PotentialNonConformitiy',
                'acv.TypeNonConformity',
                'acv.ReAudit',
                'acv.ReAuditDate',
                'acv.RecommendationExecution',
                'acv.Status',
                'acp.GapAnalysis',
                'acp.ConditionNow',
                'acp.PotentialCauseNonConformitiy',
                'acp.CorrectiveAction',
                'acp.ExecutionPlaneCorrective',
                'acp.PreventiveAction',
                'acp.ExecutionPreventiveAction',
                'acp.CreateAt',
                'acv.IdVerificationExecution',
                'dpt.Department'
            )
            ->join('audit_capa_plane as acp','acp.Id','=','acv.IdAuditCapaPlane')
            ->join('audit_report as adr','adr.Id','=','acv.IdAuditReport')
            ->join('capa_verification_excecution as ave','ave.Id','=','acv.IdVerificationExecution')
            ->join('department as dpt','dpt.Id','=','acv.IdDepartmentAuditee')
            ->where('acv.Id',$id)
            ->first();

        if(!empty($item)){
            $Auditor = [];
            $Auditee = [];
            $item->HeadAuditee = '';
            $ApprovalCapaPlane = DB::table('audit_capa_approval')
                ->select('UpdateAt','Ordinal')
                ->where('IdAuditPlanCapa',$item->IdAuditCapaPlane)
                ->where('Actived','>',0)
                ->get();

            $ApprovalAuditReport = DB::table('audit_report_approval')
                ->select('UpdateAt','Ordinal')
                ->where('IdAuditReport',$item->IdAuditReport)
                ->where('Actived','>',0)
                ->get();

            $ApprovalCapaVerification = DB::table('audit_capa_approval_verification')
                ->select('UpdateAt','Ordinal')
                ->where('IdAuditVerificationCapa',$item->Id)
                ->where('Actived','>',0)
                ->get();

            $DetailAuditSelection = DB::table('audit_selection_detail as asd')
                ->select('asd.IdAuditee','asd.IdAuditor','pad.Name as LeadAuditor')
                ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
                ->where('asd.Actived','>',0)
                ->where('asd.IdAuditSelection',$item->IdAuditSelection)
                ->first();

            $DetailAuditClause = DB::table('audit_selection_clause as asc')
                ->select('asc.IdClauseAudit','sdt.Standart as StandartAudit')
                ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
                ->where('asc.Actived','>',0)
                ->where('asc.IdAuditSelection',$item->IdAuditSelection)
                ->get();

            foreach(json_decode($DetailAuditSelection->IdAuditee) as $key=>$val){
                array_push($Auditee,$val->Employee);
                $headAuditee = DB::table('employee as emp')
                ->select('emp.Id','emp.Name','pst.Id as Position')
                ->join('position as pst','pst.Id','=','emp.IdPosition')
                ->where('emp.Id',$val->Id)
                ->where('pst.Parent',0)
                ->first();

                if(!empty($headAuditee)){
                    $item->HeadAuditee = $headAuditee->Name;
                }
            }

            array_push($Auditor,$DetailAuditSelection->LeadAuditor);

            foreach(json_decode($DetailAuditSelection->IdAuditor) as $key=>$val){
                array_push($Auditor,$val->Employee);
            }

            $item->ApprovalCapaPlane = $ApprovalCapaPlane;
            $item->ApprovalAuditReport = $ApprovalAuditReport;
            $item->ApprovalCapaVerification = $ApprovalCapaVerification;
            $item->Auditor = $Auditor;
            $item->Auditee = $Auditee;
            $item->AuditClause = $DetailAuditClause;

            $Title = "Data Laporan Hasil Audit";
            $Header = "Laporan Hasil Audit Internal Sistem Mutu, K3 dan Lingkungan";
            $SubHeader = "Quality, Health, Safety and Environment System Internal Audit Result";
            $noOrder = "010GH0-004.01";

            $view = view('export-pdf.header-potrait',compact('Title','Header','SubHeader','noOrder'))->render();
            $view .= view('export-pdf.pdf-hasil-audit',compact('item'))->render();
            $view .= view('export-pdf.footer')->render();

            $pdf = PDF::loadHTML($view);
            return $pdf->stream();
        }
    }

    public function validation(){
        return[
            'IdAuditCapaPlane'=>'required'
        ];
    }
}
