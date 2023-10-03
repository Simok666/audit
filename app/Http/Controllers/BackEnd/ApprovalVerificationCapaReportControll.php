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

class ApprovalVerificationCapaReportControll extends Controller
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
                'acv.IdDepartmentAuditee',
                'acv.IdAuditSelection',
                'acv.IdPositionAuditee',
                'acv.OrganizerAudit',
                'acv.AuditorDate',
                'acv.PotentialNonConformitiy',
                'acv.TypeNonConformity',
                'asd.IdAuditee',
                'asd.IdAuditor',
                'asd.IdObserver',
                'dpt.Department',
                'pad.Name as LeadAuditor',
                'acv.ApprovedOrdinal',
                'acv.StatusApproved',
                'acv.Actived',
                'apv.Ordinal as OrdinalApproval'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','acv.IdAuditSelection')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','acv.IdDepartmentAuditee')
            ->join('audit_report as adr','adr.Id','=','acv.IdAuditReport')
            ->join('audit_capa_approval_verification as apv','apv.IdAuditVerificationCapa','=','acv.Id')
            ->orderBy($field, $dir)
            ->where('acv.Actived',2)
            ->where('acv.ApprovedOrdinal',2)
            ->where('apv.IdEmployeApproval',session('adminvue')->IdEmployee);

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
        $item = DB::table('audit_capa_verification')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($request->input('Ordinal') == 0){
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>2
                    ]);

                $approval = DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',1)
                    ->first();

                // DB::table('notification')
                //     ->insert([
                //         'IdEmployee'=>$approval->IdEmployeApproval,
                //         'Header'=>'Verification Capa Report',
                //         'Message'=>'Silahkan Setujui Verification Capa Report Dengan Id Audit '.$item->NoTrans,
                //         'Url'=>'/RoleAdmin/approval/data-approval-verification-capa-report',
                //         'UserEntry'=>session('adminvue')->Id
                //     ]);
            }else if($request->input('Ordinal') == 1){
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>2
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>2
                    ]);

                $approval = DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',2)
                    ->first();

                // DB::table('notification')
                //     ->insert([
                //         'IdEmployee'=>$approval->IdEmployeApproval,
                //         'Header'=>'Verification Capa Report',
                //         'Message'=>'Silahkan Setujui Verification Capa Report Dengan Id Audit '.$item->NoTrans,
                //         'Url'=>'/RoleAdmin/approval/data-approval-verification-capa-report',
                //         'UserEntry'=>session('adminvue')->Id
                //     ]);
            }else{
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'StatusApproved'=>2
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>2
                    ]);
            }

            $this->History->store(36,5,json_encode($item));
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
        $item = DB::table('audit_capa_verification')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($request->input('Ordinal') == 1){
                DB::table('audit_capa_verification')
                    ->where('Id',$request->input('Id'))
                    ->update([
                        'ApprovedOrdinal'=>1,
                        'StatusApproved'=>3
                    ]);

                DB::table('audit_capa_approval_verification')
                    ->where('IdAuditVerificationCapa',$request->input('Id'))
                    ->where('Ordinal',$request->input('Ordinal'))
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
                    ->where('Ordinal',$request->input('Ordinal'))
                    ->update([
                        'Status'=>3
                    ]);
            }

            DB::table('audit_capa_plane')
                ->where('Id',$item->IdAuditCapaPlane)
                ->update([
                    'IsVerif'=>0
                ]);

            $this->History->store(36,5,json_encode($item));
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
