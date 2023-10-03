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
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class PlanCapaReportControll extends Controller
{
    protected $History;
//    protected $DBMain;
    protected $UploadFile;

    public function __construct() {
        $this->History = new HistoryControll();
//        $this->DBMain = DB::connection('maindb_widatra');
        $this->UploadFile = new UploadFileControll();
    }

    public function index(Request $request){
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('audit_capa_plane as acp')
            ->select(
                'acp.Id as id',
                'acp.NoTrans',
                'adr.RefNumber',
                'acp.IdDepartmentAuditee',
                'acp.IdAuditSelection',
                'acp.IdPositionAuditee',
                'acp.OrganizerAudit',
                'acp.AuditorDate',
                'acp.PotentialNonConformitiy',
                'acp.TypeNonConformity',
                'acp.PathCorrective',
                'acp.PathPreventive',
                'asd.IdAuditee',
                'asd.IdAuditor',
                'asd.IdObserver',
                'dpt.Department',
                'acp.IdDepartmentAuditee as IsDepartment',
                'pad.Name as LeadAuditor',
                'acp.ApprovedOrdinal',
                'acp.StatusApproved',
                'acp.Status',
                'acp.Actived'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','acp.IdAuditSelection')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','acp.IdDepartmentAuditee')
            ->join('audit_report as adr','adr.Id','=','acp.IdAuditReport')
            ->orderBy($field, $dir)
            ->where('acp.Actived','>',0);

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
            $val->IsDepartment = false;
            $val->AuditCriteria = $this->getAuditCriteriaPlan($val->IdAuditSelection);
            $val->ApprovedEmployee = $this->getApprovalEmployee($val->ApprovedOrdinal,$val->id);
            $val->Status = $val->Status==1?'OPEN':'CLOSE';
            if($val->IdDepartmentAuditee == session('adminvue')->IdDepartment){
                $val->IsDepartment = true;
            }
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

    public function getSelect(){
        $IdAudit = DB::table('audit_report as adr')
            ->select(
                'adr.Id',
                'adr.RefNumber',
                'adr.IdAuditSelection',
                'adp.Id as IdAuditPlane',
                'adr.IdDepartmentAuditee',
                'adr.NoTrans',
                'dpt.Department as DepartmentAuditee',
                'adp.OrganizerAudit',
                'adp.OpeningMeeting'
            )
            ->join('audit_plane as adp','adp.Id','=','adr.IdAuditPlane')
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->where('adr.Actived','>',0)
            ->where('adr.StatusApproved',2)
            ->where('adr.IsCapaPlan',0)
            ->where('adr.IdDepartmentAuditee',session('adminvue')->IdDepartment)
            ->get();

        return json_encode(array(
            'status'=>true,
            'IdAudit'=>$IdAudit
        ));
    }

    public function getApprovalEmployee($Ordinal,$Id){
        $IdEmployee = DB::table('audit_capa_approval')
            ->where('Ordinal',$Ordinal)
            ->where('IdAuditPlanCapa',$Id)
            ->where('Actived',1)
            ->value('IdEmployeApproval');

        return $IdEmployee;
    }

    public function getAuditDetail(Request $request){
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
            'AuditReport'=>$AuditReport
        ));
    }

    public function show(Request $request){
        $item = DB::table('audit_capa_plane as acp')
            ->select(
                'acp.Id',
                'acp.NoTrans',
                'adr.RefNumber',
                'dpt.Department as AuditeeDepartment',
                'acp.GapAnalysis',
                'acp.ConditionNow',
                'acp.PotentialCauseNonConformitiy',
                'acp.CorrectiveAction',
                'acp.PreventiveAction',
                'acp.ExecutionPreventiveAction',
                'acp.ExecutionPlaneCorrective',
                'acp.CreateAt',
                'acp.UpdateAt',
                'asd.IdLeadAuditor',
                'usr.UserName as UserEntry'
            )
            ->join('department as dpt','dpt.Id','=','acp.IdDepartmentAuditee')
            ->join('audit_report as adr','adr.Id','=','acp.IdAuditReport')
            ->join('users as usr','usr.Id','=','adr.UserEntry')
            ->join('audit_selection as ads','ads.Id','=','acp.IdAuditSelection')
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','ads.Id')
            ->where('acp.Id',$request->input('Id'))
            ->first();

        $Approval = [];

        if(!empty($item)){
            $item->ExecutionPlaneCorrective = Carbon::parse($item->ExecutionPlaneCorrective)->format('d/m/Y');
            $item->ExecutionPreventiveAction = Carbon::parse($item->ExecutionPreventiveAction)->format('d/m/Y');
            $item->CreateAt = Carbon::parse($item->CreateAt)->format('d/m/Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('d/m/Y H:i:s');
            $item->LeadAuditor = DB::table('personnel_auditor')
                ->select('IdEmploye')
                ->where('Actived','>',0)
                ->where('Id',$item->IdLeadAuditor)
                ->value('IdEmploye');
            $Approval = DB::table('audit_capa_approval as acp')
                ->select(
                    'emp.Name',
                    'acp.IdEmployeApproval',
                    'acp.Status'
                )
                ->join('employee as emp','emp.Id','=','acp.IdEmployeApproval')
                ->where('acp.IdAuditPlanCapa',$item->Id)
                ->where('acp.Actived','>',0)
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

        $ExecutionPlaneCorrective = Carbon::parse($request->input('ExecutionPlaneCorrective'))->format('Y-m-d');
        $ExecutionPreventiveAction = Carbon::parse($request->input('ExecutionPreventiveAction'))->format('Y-m-d');

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
            $IdAuditPlanCapa = DB::table('audit_capa_plane')
                ->insertGetId([
                    'NoTrans'=>$request->input('NoTrans'),
                    'IdAuditReport'=>$request->input('IdAuditReport'),
                    'IdAuditSelection'=>$request->input('IdAuditSelection'),
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    'OrganizerAudit'=>$request->input('OrganizerAudit'),
                    'AuditorDate'=>$request->input('AuditorDate'),
                    'PotentialNonConformitiy'=>$request->input('PotentialNonConformitiy'),
                    'TypeNonConformity'=>$request->input('TypeNonConformity'),
                    'ConditionNow'=>$request->input('ConditionNow'),
                    'GapAnalysis'=>$request->input('GapAnalysis'),
                    'PotentialCauseNonConformitiy'=>$request->input('PotentialCauseNonConformitiy'),
                    'CorrectiveAction'=>$request->input('CorrectiveAction'),
                    'ExecutionPlaneCorrective'=>$ExecutionPlaneCorrective,
                    'PreventiveAction'=>$request->input('PreventiveAction'),
                    'ExecutionPreventiveAction'=>$ExecutionPreventiveAction,
                    'PathCorrective'=>$fileAttachmentCorrective,
                    'PathPreventive'=>$FileAttachmentPreventive,
                    'StatusApproved'=>1,
                    'UserEntry'=>session('adminvue')->Id
                ]);

            foreach ($ArrApproval as $key => $value){
                DB::table('audit_capa_approval')
                    ->insert([
                        'Ordinal'=>$key,
                        'IdAuditPlanCapa'=>$IdAuditPlanCapa,
                        'IdAuditReport'=>$request->input('IdAuditReport'),
                        'IdPositionApproval'=>$value['Position'],
                        'IdEmployeApproval'=>$value['Id'],
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

             DB::table('audit_report')
                 ->where('Id',$request->input('IdAuditReport'))
                 ->update([
                     'IsCapaPlan'=>1
             ]);

            $this->History->store(29,1,json_encode($requestData));
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
        $item = DB::table('audit_capa_plane as acp')
            ->select(
                'acp.Id',
                'acp.NoTrans',
                'acp.IdAuditPlane',
                'acp.IdAuditReport',
                'acp.IdAuditSelection',
                'acp.IdDepartmentAuditee',
                'acp.OrganizerAudit',
                'acp.PathPreventive',
                'acp.PathCorrective',
                'acp.ExecutionPlaneCorrective',
                'acp.ExecutionPreventiveAction',
                'acp.CorrectiveAction',
                'acp.PreventiveAction',
                'acp.GapAnalysis',
                'acp.ConditionNow',
                'acp.PotentialCauseNonConformitiy',
                'adp.OpeningMeeting',
                'adr.RefNumber',
                'dpt.Department'
            )
            ->join('department as dpt','dpt.Id','=','acp.IdDepartmentAuditee')
            ->join('audit_plane as adp','adp.Id','=','acp.IdAuditPlane')
            ->join('audit_report as adr','adr.Id','=','acp.IdAuditReport')
            ->where('acp.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->PathCorrective = '';
            $item->PathPreventive = '';
            $item->IdAuditPlan = ['Id'=>$item->IdAuditReport,'RefNumber'=>$item->RefNumber,'IdAuditSelection'=>$item->IdAuditSelection,'IdAuditPlane'=>$item->IdAuditPlane,'IdDepartmentAuditee'=>$item->IdDepartmentAuditee,'NoTrans'=>$item->NoTrans,'DepartmentAuditee'=>$item->Department,'OrganizerAudit'=>$item->OrganizerAudit,'OpeningMeeting'=>$item->OpeningMeeting];
            $item->File = '';
            $item->PotentialNonConformitiy = '';
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

        // $fileAttachmentCorrective = [];
        // if($request->has('FileAttachmentCorrective')){
        //     $arrFile = $request->file('FileAttachmentCorrective');
        //     foreach($arrFile as $key=>$val){
        //         if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
        //             $fileAttachmentCorrective[$key] = $this->UploadFile->uploadFile($val,10); //10 path plan-capa-report
        //         }
        //     }
        // }

        // $FileAttachmentPreventive = [];
        // if($request->has('FileAttachmentPreventive')){
        //     $arrFile = $request->file('FileAttachmentPreventive');
        //     foreach($arrFile as $key=>$val){
        //         if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
        //             $FileAttachmentPreventive[$key] = $this->UploadFile->uploadFile($val,10); //10 path plan-capa-report
        //         }
        //     }
        // }

        // $OldFileAttachmentCorrective = json_decode($request->input('OldFileAttachmentCorrective'));
        // foreach($OldFileAttachmentCorrective as $key=>$val){
        //     array_push($fileAttachmentCorrective,$val);
        // }

        // $OldFileAttachmentPreventive = json_decode($request->input('OldFileAttachmentPreventive'));
        // foreach($OldFileAttachmentPreventive as $key=>$val){
        //     array_push($FileAttachmentPreventive,$val);
        // }

        // if(count($fileAttachmentCorrective) > 0){
        //     $fileAttachmentCorrective = json_encode($fileAttachmentCorrective);
        // }else{
        //     $fileAttachmentCorrective = '';
        // }

        // if(count($FileAttachmentPreventive) > 0){
        //     $FileAttachmentPreventive = json_encode($FileAttachmentPreventive);
        // }else{
        //     $FileAttachmentPreventive = '';
        // }

        $ExecutionPlaneCorrective = Carbon::parse($request->input('ExecutionPlaneCorrective'))->format('Y-m-d');
        $ExecutionPreventiveAction = Carbon::parse($request->input('ExecutionPreventiveAction'))->format('Y-m-d');

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
        $oldItem = DB::table('audit_capa_plane')
            ->select('IdAuditReport')
            ->where('Id',$request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_capa_plane')
                ->where('Id',$request->input('Id'))
                ->update([
                    'NoTrans'=>$request->input('NoTrans'),
                    'IdAuditReport'=>$request->input('IdAuditReport'),
                    'IdAuditSelection'=>$request->input('IdAuditSelection'),
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    'OrganizerAudit'=>$request->input('OrganizerAudit'),
                    'AuditorDate'=>$request->input('AuditorDate'),
                    'PotentialNonConformitiy'=>$request->input('PotentialNonConformitiy'),
                    'TypeNonConformity'=>$request->input('TypeNonConformity'),
                    'ConditionNow'=>$request->input('ConditionNow'),
                    'GapAnalysis'=>$request->input('GapAnalysis'),
                    'PotentialCauseNonConformitiy'=>$request->input('PotentialCauseNonConformitiy'),
                    'CorrectiveAction'=>$request->input('CorrectiveAction'),
                    'ExecutionPlaneCorrective'=>$ExecutionPlaneCorrective,
                    'PreventiveAction'=>$request->input('PreventiveAction'),
                    'ExecutionPreventiveAction'=>$ExecutionPreventiveAction
                    // 'PathCorrective'=>$fileAttachmentCorrective,
                    // 'PathPreventive'=>$FileAttachmentPreventive
                ]);

            foreach ($ArrApproval as $key => $value){
                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$key)
                    ->update([
                        'IdAuditReport'=>$request->input('IdAuditReport'),
                        'IdPositionApproval'=>$value['Position'],
                        'IdEmployeApproval'=>$value['Id']
                    ]);
            }

            DB::table('audit_report')
                ->where('Id',$oldItem->IdAuditReport)
                ->update([
                    'IsCapaPlan'=>0
                ]);

            DB::table('audit_report')
                ->where('Id',$request->input('IdAuditReport'))
                ->update([
                    'IsCapaPlan'=>1
                ]);

            $this->History->store(29,2,json_encode($requestData));
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
        $item = DB::table('audit_capa_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_capa_plane')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_capa_approval')
                ->where('IdAuditPlanCapa',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_report')
                ->where('Id',$item->IdAuditReport)
                ->update([
                    'IsCapaPlan'=>0
                ]);

            $this->History->store(29,3,json_encode($item));
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
        $item = DB::table('audit_capa_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_capa_plane')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>2
                ]);

            $approval = DB::table('audit_capa_approval')
                ->where('IdAuditPlanCapa',$request->input('Id'))
                ->where('Ordinal',0)
                ->first();

            DB::table('notification')
                ->insert([
                    'IdEmployee'=>$approval->IdEmployeApproval,
                    'Header'=>'Plan Capa Report',
                    'Message'=>'Silahkan Setujui Plan Capa Report Dengan Id Audit '.$item->NoTrans,
                    'Url'=>'/RoleAdmin/approval/data-approval-plan-capa-report',
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(29,5,json_encode($item));
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
        $item = DB::table('audit_capa_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($id == 0){
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }else if($id == 1){
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }else{
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'StatusApproved'=>2
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>2
                    ]);
            }

            $this->History->store(29,5,json_encode($item));
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
        $item = DB::table('audit_capa_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($id == 1){
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>3
                    ]);
            }else{
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$id)
                    ->update([
                        'Status'=>3
                    ]);
            }

            $this->History->store(29,5,json_encode($item));
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

    public function sendMail(Request $request){

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->SMTPDebug = 0; //SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->AuthType = 'LOGIN';
            $mail->Host       = 'mail.widatra.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'it.support@widatra.com';
            $mail->Password   = 'cinaterias';
            $mail->SMTPSecure = 'ssl';
            $mail->Port       = 587;

            $IdEmailTemplate = 0;

            $DateNow = Carbon::now()->format('Y-m-d');

            $item = DB::table('audit_capa_plane')
                ->select('*')
                ->where('Actived','>',0)
                ->where('Id',$request->input('Id'))
                ->first();

            $Auditee = DB::table('audit_selection_auditee as asa')
                ->select('asa.*','emp.Name','emp.Email')
                ->join('employee as emp','emp.Id','=','asa.IdEmployeAuditee')
                ->where('asa.Actived','>',0)
                ->where('asa.IdAuditSelection',$item->IdAuditSelection)
                ->get();

            $DateCorrective = Carbon::parse($item->ExecutionPlaneCorrective);

            $diff = $DateCorrective->diffInDays($DateNow);

            if($DateCorrective->format('Y-m-d') > $DateNow){
                if($diff <= 7){
                    $IdEmailTemplate = 3;
                }elseif($diff <= 30){
                    $IdEmailTemplate = 5;
                }else{
                    $IdEmailTemplate = 5;
                }
            }else{
                if($diff <= 30){
                    $IdEmailTemplate = 6;
                }elseif($diff <= 90){
                    $IdEmailTemplate = 7;
                }elseif($diff <= 180){
                    $IdEmailTemplate = 8;
                }else{
                    $IdEmailTemplate = 8;
                }
            }

            $templateEmail = DB::table('email_template')
                ->select('*')
                ->where('Actived','>',0)
                ->where('Id',$IdEmailTemplate)
                ->first();


            foreach ($Auditee as $key => $value){
                $mail->setFrom('it.support@widatra.com', 'Verification Reminder | do-not-reply');
                $mail->ClearAddresses();
                $mail->addAddress($value->Email,$value->Name);
                $BodyEmail = $templateEmail->Body;
                $BodyEmail = str_replace('Para Auditee',$value->Name,$BodyEmail);
                $BodyEmail = str_replace('Verifikasi CAPA Audit','Verifikasi CAPA Audit Dengan Id Audit '.$item->NoTrans,$BodyEmail);

                // Content
                $mail->isHTML(true);
                $mail->Subject = $templateEmail->Subject;
                $mail->Body    = view('email-remainder',compact('BodyEmail'))->render();

                $mail->send();
            }
            // echo 'Message has been sent';
        } catch (Exception $e) {
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            return json_encode(array(
                'status'=>true,
                'message'=>'Send Remainder Data Failed!'
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Send Remainder Data Success!'
        ));

        /*Mail::send('email.email',['data'=>$data, 'dataMail'=>$dataMail], function($message) use ($data) {
            $message->from(env('MAIL_USERNAME', 'widatra@gmail.com'), 'Web e-DMS | do-not-reply');
            $message->to($data['Email'], $data['Employee'])->subject($data['Subject']);
        });*/
    }

    public function sendMailApi($type,$Date){
        $mail = new PHPMailer(true);

        try{
            //Server settings
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->SMTPDebug = 0; //SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->AuthType = 'LOGIN';
            $mail->Host       = 'mail.widatra.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'it.support@widatra.com';
            $mail->Password   = 'cinaterias';
            $mail->SMTPSecure = 'ssl';
            $mail->Port       = 587;

            switch($type){
                case 1:
                    $Date = Carbon::createFromFormat('d/m/Y',$Date)->addDay(7)->toDateString();
                    $item = DB::table('audit_capa_plane')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->whereDate('ExecutionPlaneCorrective', '=', $Date)
                        ->where('StatusApproved',2)
                        ->get();

                    $templateEmail = DB::table('email_template')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->where('Id',3)
                        ->first();
                break;

                case 2:
                    $Date = Carbon::createFromFormat('d/m/Y',$Date)->addDay(30)->toDateString();
                    $item = DB::table('audit_capa_plane')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->whereDate('ExecutionPlaneCorrective', '=', $Date)
                        ->where('StatusApproved',2)
                        ->get();

                    $templateEmail = DB::table('email_template')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->where('Id',5)
                        ->first();
                break;

                case 3:
                    $Date = Carbon::createFromFormat('d/m/Y',$Date)->subDay(30)->toDateString();
                    $item = DB::table('audit_capa_plane')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->whereDate('ExecutionPlaneCorrective', '=', $Date)
                        ->where('StatusApproved',2)
                        ->get();

                    $templateEmail = DB::table('email_template')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->where('Id',6)
                        ->first();
                break;

                case 4:
                    $Date = Carbon::createFromFormat('d/m/Y',$Date)->subDay(90)->toDateString();
                    $item = DB::table('audit_capa_plane')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->whereDate('ExecutionPlaneCorrective', '=', $Date)
                        ->where('StatusApproved',2)
                        ->get();

                    $templateEmail = DB::table('email_template')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->where('Id',7)
                        ->first();
                break;

                case 5:
                    $Date = Carbon::createFromFormat('d/m/Y',$Date)->subDay(180)->toDateString();
                    $item = DB::table('audit_capa_plane')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->whereDate('ExecutionPlaneCorrective', '=', $Date)
                        ->where('StatusApproved',2)
                        ->get();

                    $templateEmail = DB::table('email_template')
                        ->select('*')
                        ->where('Actived','>',0)
                        ->where('Id',8)
                        ->first();
                break;

                default:

                break;
            }

            if(count($item) > 0){
                foreach ($item as $key => $value){
                    $Auditee = DB::table('audit_selection_auditee as asa')
                        ->select('asa.*','emp.Name','emp.Email')
                        ->join('employee as emp','emp.Id','=','asa.IdEmployeAuditee')
                        ->where('asa.Actived','>',0)
                        ->where('asa.IdAuditSelection',$value->IdAuditSelection)
                        ->get();

                    foreach ($Auditee as $k=>$val){
                        $mail->setFrom('it.support@widatra.com', 'Verification Reminder | do-not-reply');
                        $mail->ClearAddresses();
                        $mail->addAddress($val->Email,$val->Name);
                        $BodyEmail = $templateEmail->Body;
                        $BodyEmail = str_replace('Para Auditee',$val->Name,$BodyEmail);
                        $BodyEmail = str_replace('Verifikasi CAPA Audit','Verifikasi CAPA Audit Dengan Id Audit '.$value->NoTrans,$BodyEmail);

                        // Content
                        $mail->isHTML(true);
                        $mail->Subject = $templateEmail->Subject;
                        $mail->Body    = view('email-remainder',compact('BodyEmail'))->render();

                        $mail->send();
                    }
                }
            }
        }catch (Exception $e) {
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            return json_encode(array(
                'status'=>true,
                'message'=>'Send Remainder Data Failed!'
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Send Remainder Data Success!'
        ));
    }

    public function validation(){
        return[
            'IdAuditReport'=>'required'
        ];
    }
}
