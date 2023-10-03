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

class ApprovalAuditorReportControll extends Controller
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
                'asa.IdEmployeAuditor',
                'ase.IdEmployeAuditee',
                'ase.IsHead',
                'arp.IdEmployeApproval',
                'adr.ApprovedOrdinal',
                'adr.StatusApproved',
                'adr.Actived',
                'arp.Ordinal as OrdinalApproval'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','adr.IdAuditSelection')
            ->join('audit_selection_auditor as asa','asa.IdAuditSelection','=','adr.IdAuditSelection')
            ->join('audit_selection_auditee as ase','ase.IdAuditSelection','=','adr.IdAuditSelection')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->join('audit_report_approval as arp','arp.IdAuditReport','=','adr.Id')
            ->orderBy($field, $dir)
            ->where('adr.Actived',2)
            ->where('asa.Actived','>',0)
            ->where('ase.Actived','>',0)
            ->where(function($q){
                $q->where('asa.IdEmployeAuditor',session('adminvue')->IdEmployee)
                ->orWhere('ase.IdEmployeAuditee',session('adminvue')->IdEmployee)
                ->orWhere('arp.IdEmployeApproval',session('adminvue')->IdEmployee);
            })
            ->groupby('adr.Id');

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

    public function approveData(Request $request){
        $item = DB::table('audit_report as adr')
            ->select('adr.*','dpt.Department','sdt.Standart')
            ->join('department as dpt','dpt.Id','=','adr.IdDepartmentAuditee')
            ->join('audit_selection_clause as asc','asc.IdAuditSelection','=','adr.IdAuditSelection')
            ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
            ->where('adr.Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($request->input('Ordinal') == 0){
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>2
                    ]);

                $approval = DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',1)
                    ->first();

                DB::table('notification')
                    ->insert([
                        'IdEmployee'=>$approval->IdEmployeApproval,
                        'Header'=>'Audit Report',
                        'Message'=>'Silahkan Setujui Audit Report Dengan Id Audit '.$item->NoTrans,
                        'Url'=>'/RoleAdmin/approval/data-approval-auditor-report',
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }else if($request->input('Ordinal') == 1){
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>2
                    ]);

                $approval = DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',2)
                    ->first();

                DB::table('notification')
                    ->insert([
                        'IdEmployee'=>$approval->IdEmployeApproval,
                        'Header'=>'Audit Report',
                        'Message'=>'Silahkan Setujui Audit Report Dengan Id Audit '.$item->NoTrans,
                        'Url'=>'/RoleAdmin/approval/data-approval-auditor-report',
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }else{
                $countSequence = DB::table('audit_report')
                    ->where('Actived','>',0)
                    ->count();
                $RefNumber = Carbon::now()->format('Y').'.'.$item->Standart.'.'.$item->Department.'.'.str_pad($countSequence, 3, '0', STR_PAD_LEFT);

                $temuanClause = 0;

                $AuditClause = DB::table('audit_selection_clause')
                    ->select('Id','IdClauseAudit')
                    ->where('Actived','>',0)
                    ->where('IdAuditSelection',$item->IdAuditSelection)
                    ->get();

                foreach($AuditClause as $key=>$val){
                    $temuanClause += count(json_decode($val->IdClauseAudit));
                }

                $valueScore = DB::table('audit_score')
                    ->where('Actived','>',0)
                    ->where('Name',$item->TypeNonConformity)
                    ->value('Value');

                $scoreCritical = DB::table('audit_score')
                    ->where('Actived','>',0)
                    ->where('Name','Critical')
                    ->value('Value');

                $scoreCritical = floatval($scoreCritical) * 4;
                switch (true){
                    case ($temuanClause == 0):
                        $valueScore = 0;
                    break;

                    case ($temuanClause <= 3):
                        $valueScore = floatval($valueScore) * 1;
                    break;

                    case ($temuanClause <= 6):
                        $valueScore = floatval($valueScore) * 2;
                    break;

                    case ($temuanClause <= 9):
                        $valueScore = floatval($valueScore) * 3;
                    break;

                    case ($temuanClause > 9):
                        $valueScore = floatval($valueScore) * 4;
                    break;
                }

                $value = floatval($valueScore) / 1;


                if($scoreCritical==0){$scoreCritical=0;}
                if($value==0){$value=0;}

                if($scoreCritical==0 || $value==0){

                    $scoreAudit = 10-0;

                }else{
                    $scoreAudit = 10-(10/floatval($scoreCritical) * floatval($value));
                    $scoreAudit = number_format($scoreAudit,2,'.','');
                }


                $GradeAudit = DB::table('audit_score_grade')
                    ->where('RangeStart','<=',floatval($scoreAudit))
                    ->where('RangeEnd','>=',floatval($scoreAudit))
                    ->value('Name');

                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'StatusApproved'=>2,
                        'RefNumber'=>$RefNumber,
                        'AuditScore'=>floatval($scoreAudit),
                        'AuditGrade'=>$GradeAudit
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>2
                    ]);
            }


            $this->History->store(34,5,json_encode($item));
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

    public function rejectData(Request $request){
        $item = DB::table('audit_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($request->input('Ordinal') == 0){
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>0,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>3
                    ]);
            }else if($request->input('Ordinal') == 1){
                DB::table('audit_report')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_report_approval')
                    ->where('IdAuditReport',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
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
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>3
                    ]);
            }
            DB::table('audit_selection')
                ->where('Id',$item->IdAuditSelection)
                ->update([
                    'IsReport'=>0
                ]);

            $this->History->store(34,5,json_encode($item));
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
}
