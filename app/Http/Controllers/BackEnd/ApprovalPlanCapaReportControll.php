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

class ApprovalPlanCapaReportControll extends Controller
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
                'pad.Name as LeadAuditor',
                'asa.IdEmployeAuditor as AuditorId',
                'acp.ApprovedOrdinal',
                'acp.StatusApproved',
                'acp.Actived',
                'aca.Ordinal as OrdinalApproval'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','acp.IdAuditSelection')
            ->join('audit_selection_auditor as asa','asa.IdAuditSelection','=','acp.IdAuditSelection')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','acp.IdDepartmentAuditee')
            ->join('audit_report as adr','adr.Id','=','acp.IdAuditReport')
            ->join('audit_capa_approval as aca','aca.IdAuditPlanCapa','=','acp.Id')
            ->orderBy($field, $dir)
            ->where('acp.Actived',2)
            ->where('asa.Actived','>',0)
            ->where(function($q){
                $q->where('asa.IdEmployeAuditor',session('adminvue')->IdEmployee)
                ->orWhere('aca.IdEmployeApproval',session('adminvue')->IdEmployee);
            })
            ->groupby('acp.Id');

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
        $item = DB::table('audit_capa_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($request->input('Ordinal') == 0){
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>2
                    ]);

                $approval = DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',1)
                    ->first();

                DB::table('notification')
                    ->insert([
                        'IdEmployee'=>$approval->IdEmployeApproval,
                        'Header'=>'Plan Capa Report',
                        'Message'=>'Silahkan Setujui Plan Capa Report Dengan Id Audit '.$item->NoTrans,
                        'Url'=>'/RoleAdmin/approval/data-approval-plan-capa-report',
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }else if($request->input('Ordinal') == 1){
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>2
                    ]);

                $approval = DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',2)
                    ->first();

                DB::table('notification')
                    ->insert([
                        'IdEmployee'=>$approval->IdEmployeApproval,
                        'Header'=>'Plan Capa Report',
                        'Message'=>'Silahkan Setujui Plan Capa Report Dengan Id Audit '.$item->NoTrans,
                        'Url'=>'/RoleAdmin/approval/data-approval-plan-capa-report',
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }else{
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'StatusApproved'=>2
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>2
                    ]);
            }

            $this->History->store(35,5,json_encode($item));
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
        $item = DB::table('audit_capa_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($request->input('Ordinal') == 1){
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>0,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
                        'Status'=>3
                    ]);
            }else if($request->input('Ordinal') == 1){
                DB::table('audit_capa_plane')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_capa_approval')
                    ->where('IdAuditPlanCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'IdEmployeApproval'=>session('adminvue')->IdEmployee,
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
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>3
                    ]);
            }

            DB::table('audit_report')
                ->where('Id',$item->IdAuditReport)
                ->update([
                    'IsCapaPlan'=>0
                ]);

            $this->History->store(35,5,json_encode($item));
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
