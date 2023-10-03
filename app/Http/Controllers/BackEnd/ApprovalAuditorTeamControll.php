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

class ApprovalAuditorTeamControll extends Controller
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

        $query =DB::table('audit_selection as ads')
            ->select(
                'ads.Id as id',
                'ads.NoTrans',
                'adp.Purpose',
                'ads.Approved',
                'ads.Status',
                'ads.AuditDate',
                'ads.HourStart',
                'ads.HourDone',
                'asd.IdAuditee',
                'asd.IdAuditor',
                'asd.IdObserver',
                'dpt.Department',
                'pad.Name as LeadAuditor',
                'asa.Status as StatusApprovedEmp',
                'ads.StatusApproved',
                'emp.Name as EmpApproved',
                'ads.Path',
                'ads.Actived'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','ads.Id')
            ->join('audit_plane as adp','adp.Id','=','ads.IdAuditPlane')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','ads.IdDepartmentAuditee')
            ->leftjoin('employee as emp','emp.Id','=','adp.Approved')
            ->join('audit_selection_approval as asa','asa.IdAuditSelection','ads.Id')
            ->orderBy($field, $dir)
            ->where('ads.Actived',2)
            ->where('asa.Actived','>',0)
            ->where('asa.IdEmployeApproval',session('adminvue')->IdEmployee);

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
            $val->AuditCriteria = $this->getAuditCriteriaPlan($val->id);
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
        $item = DB::table('audit_selection')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $itemApp = DB::table('audit_selection_approval')
            ->select('*')
            ->where('IdAuditSelection',$request->input('Id'))
            ->where('Status',1)
            ->where('Actived','>',0)
            ->orderBy('Ordinal','asc')
            ->get();


        if(count($itemApp)>0){
            if($itemApp[0]->IdEmployeApproval!=session('adminvue')->IdEmployee){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Anda Belum Bisa  Approve !',
                ));
            }
        }

        DB::begintransaction();
        try{
            if(count($itemApp)>0){
                DB::table('audit_selection_approval')
                    ->where('Id',$itemApp[0]->Id)
                    ->update([
                        'Status'=>2
                ]);
                if(count($itemApp)>1){
                    DB::table('audit_selection')
                        ->where('Id',$request->input('Id'))
                        ->update([
                            'Approved'=>$itemApp[1]->IdEmployeApproval
                    ]);

                    DB::table('notification')
                        ->insert([
                            'IdEmployee'=>$itemApp[1]->IdEmployeApproval,
                            'Header'=>'Auditor Team',
                            'Message'=>'Silahkan Setujui Auditor Team Dengan Id Audit '.$item->NoTrans,
                            'Url'=>'/RoleAdmin/approval/data-approval-auditor-team',
                            'UserEntry'=>session('adminvue')->Id
                        ]);
                }else{
                    DB::table('audit_selection')
                        ->where('Id',$request->input('Id'))
                        ->update([
                            'Status'=>2,
                            'StatusApproved'=>2,
                            'Approved'=>$itemApp[0]->IdEmployeApproval
                    ]);
                }


            }


            $this->History->store(33,5,json_encode($item));
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
            'message'=>'Approve Data Success!',
        ));
    }

    public function rejectData(Request $request){
        $item = DB::table('audit_selection')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_selection')
                ->where('Id',$request->input('Id'))
                ->update([
                    'StatusApproved'=>3
                ]);

            DB::table('audit_plane_detail')
                ->where('IdAuditPlane',$item->IdAuditPlane)
                ->where('IdDepartmentAuditee',$item->IdDepartmentAuditee)
                ->update([
                    'IsSelectionDep'=>0
                ]);

            DB::table('audit_plane')
                ->where('Id',$item->IdAuditPlane)
                ->update([
                    'IsSelection'=>0
                ]);

            $this->History->store(33,5,json_encode($item));
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
}
