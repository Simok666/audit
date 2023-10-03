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

class ApprovalAuditPlanControll extends Controller
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

        $query =DB::table('audit_plane as adp')
            ->select(
                'adp.Id as id',
                'adp.NoTrans',
                'oad.Name as Organizer',
                'emp.Name as EmpApproved',
                'adp.Approved',
                'adp.Status',
                'asa.Status as StatusApprovedEmp',
                'adp.AuditPeriode',
                'adp.Purpose',
                'adp.AuditScope',
                'adp.OpeningMeeting',
                'adp.AuditExecutionStart',
                'adp.AuditExecutionDone',
                'adp.CloseMeeting',
                'adp.Objective',
                'adp.StatusApproved',
                'adp.Path',
                'adp.Actived'
            )
            ->join('organizer_audit as oad','oad.Id','=','adp.OrganizerAudit')
            ->join('audit_plane_approval as asa','asa.IdAuditPlane','=','adp.Id')
            ->leftjoin('employee as emp','emp.Id','=','adp.Approved')
            ->orderBy($field, $dir)
            ->where('adp.Actived',2)
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
        $criteria = DB::table('audit_plane_criteria as apc')
            ->select('apc.Id','sdt.Standart')
            ->join('standart_audit as sdt','sdt.Id','=','apc.IdStandartAudit')
            ->where('apc.Actived','>',0)
            ->where('apc.IdAuditPlane',$id)
            ->get();

        return $criteria;
    }

    public function approveData(Request $request){
        $item = DB::table('audit_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();
        $itemApp = DB::table('audit_plane_approval')
            ->select('*')
            ->where('IdAuditPlane',$request->input('Id'))
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
                DB::table('audit_plane_approval')
                    ->where('Id',$itemApp[0]->Id)
                    ->update([
                        'Status'=>2
                ]);
                if(count($itemApp)>1){
                    DB::table('audit_plane')
                        ->where('Id',$request->input('Id'))
                        ->update([
                            'Approved'=>$itemApp[1]->IdEmployeApproval
                    ]);

                    DB::table('notification')
                        ->insert([
                            'IdEmployee'=>$itemApp[1]->IdEmployeApproval,
                            'Header'=>'Audit Plan',
                            'Message'=>'Silahkan Setujui Audit Plan Dengan Id Audit '.$item->NoTrans,
                            'Url'=>'/RoleAdmin/approval/data-approval-audit-plan',
                            'UserEntry'=>session('adminvue')->Id
                        ]);
                }else{
                    DB::table('audit_plane')
                        ->where('Id',$request->input('Id'))
                        ->update([
                            'Status'=>2,
                            'StatusApproved'=>2,
                            'Approved'=>$itemApp[0]->IdEmployeApproval
                        ]);
                }

            }
//            $checkAllApp = DB::table('audit_plane_approval')
//                ->select('*')
//                ->where('Id', $request->input('Id'))
//                ->where('IdAuditPlane',$request->input('Id'))
//                ->where('Status','<>',1)
//                ->where('Status','<>',3)
//                ->where('Actived','>',0)
//                ->orderBy('Ordinal','asc')
//                ->first();

//            if(empty($checkAllApp)||$checkAllApp==null){
//                DB::table('audit_plane')
//                    ->where('Id',$request->input('Id'))
//                    ->update([
//                        'Status'=>2,
//                        'Approved'=>$itemApp[0]->IdEmployeApproval
//                ]);
//            }

            $this->History->store(32,5,json_encode($item));
            DB::commit();
        }catch (\Throwable $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Invalid Server Side! '.$e->getMessage(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Approve Data Success!',
        ));
    }

    public function rejectData(Request $request){
        $item = DB::table('audit_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_plane')
                ->where('Id',$item->Id)
                ->update([
                    'StatusApproved'=>3
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
            'message'=>'Reject Data Success!',
        ));
    }
}
