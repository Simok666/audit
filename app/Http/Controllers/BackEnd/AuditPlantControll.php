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
use App\Http\Controllers\Utils\ExcellAuditPlanControll;
use PDF;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Facades\Excel;

class AuditPlantControll extends Controller
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
                'adp.Actived',
                'ads.Id as IdAuditSelection'
            )
            ->join('organizer_audit as oad','oad.Id','=','adp.OrganizerAudit')
            ->leftjoin('employee as emp','emp.Id','=','adp.Approved')
            ->leftjoin('audit_selection as ads','ads.IdAuditPlane','=','adp.Id')
            ->join('audit_plane_approval as apa','apa.IdAuditPlane','=','adp.Id')
            ->orderBy($field, $dir)
            ->where('adp.Actived','>',0)
            ->whereRaw((
                'CASE 
                    WHEN adp.StatusApproved = 1 OR adp.StatusApproved = 3 THEN adp.UserEntry ='.session('adminvue')->Id.'
                    WHEN adp.StatusApproved = 1 OR adp.StatusApproved = 3 THEN apa.IdEmployeApproval ='.session('adminvue')->IdEmployee.'
                    ELSE adp.Actived > 0
                END'
            ))
            ->groupby('adp.Id');

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

        session()->put('AuditPlan',$data);

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

    public function getSelect(Request $request){
        $depArr = array();
        $departement = DB::table('department')
            ->select('Id','Department')
            ->where('Actived','>',0)
            ->get();

        foreach ($departement as $key => $value){
            array_push($depArr,array('Id'=>$value->Id,'Department'=>$value->Department,'$isDisabled'=>false));
        }

        $organizer = DB::table('organizer_audit')
            ->select('Id','Name')
            ->where('Actived','>',0)
            ->get();

        $countAuditPlan = DB::table('audit_plane')
            ->where('Actived','>',0)
            ->count();

        $employee = DB::table('employee')
            ->select('Id','Name','NIP')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'departement'=>$depArr,
            'organizer'=>$organizer,
            'countAuditPlan'=>$countAuditPlan,
            'employee'=>$employee
        ));
    }

    public function getPosition(Request $request){
        $position = DB::table('position')
            ->select('Id','IdDepartment','Name','Email')
            ->where('IdDepartment',$request->input('IdDepartment'))
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'position'=>$position
        ));
    }

    public function getCriteria(Request $request){
        $criteria = DB::table('standart_audit')
            ->select('Id','Standart')
            ->where('IdOrganizer',$request->input('IdOrganizer'))
            ->where('Actived','>',0)
            ->where('Status',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'criteria'=>$criteria
        ));
    }

    public function getAuditeeDepartment(Request $request){
        $AuditeeDepartment = DB::table('audit_plane_detail as apd')
            ->select('apd.IdDepartmentAuditee','dpt.Department','apd.IdPositionAuditee')
            ->join('department as dpt','dpt.Id','=','apd.IdDepartmentAuditee')
            ->where('apd.IdAuditPlane',$request->input('Id'))
            ->where('apd.Actived','>',0)
            ->get();

        if(count($AuditeeDepartment) > 0){
            foreach($AuditeeDepartment as $key=>$val){
                $val->AuditeePosition = json_decode($val->IdPositionAuditee);
            }
        }

        return json_encode(array(
            'status'=>true,
            'AuditeeDepartment'=>$AuditeeDepartment
        ));
    }

    public function getApproval(Request $request){
        $employee = DB::table('employee')
            ->select('Id','Name','NIP')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'employee'=>$employee
        ));
    }

    public function show(Request $request){
        $item = DB::table('audit_plane as adp')
            ->select(
                'adp.Id',
                'adp.NoTrans',
                'oad.Name as Organizer',
                'app.Name as ApprovedEmployee',
                'adp.AuditPeriode',
                'adp.Purpose',
                'adp.AuditScope',
                'adp.OpeningMeeting',
                'adp.OpeningMeetingTime',
                'adp.CloseMeetingTime',
                'adp.AuditExecutionStart',
                'adp.AuditExecutionDone',
                'adp.CloseMeeting',
                'adp.Objective',
                'adp.Status',
                'adp.CreateAt',
                'adp.UpdateAt',
                'usr.UserName as UserEntry'
            )
            ->join('organizer_audit as oad','oad.Id','=','adp.OrganizerAudit')
            ->join('employee as app','app.Id','=','adp.Approved')
            ->join('users as usr','usr.Id','=','adp.UserEntry')
            ->where('adp.Id',$request->input('Id'))
            ->first();

        $criteria = DB::table('audit_plane_criteria as apc')
            ->select('apc.Id','sdt.Standart')
            ->join('standart_audit as sdt','sdt.Id','=','apc.IdStandartAudit')
            ->where('apc.Actived','>',0)
            ->where('apc.IdAuditPlane',$request->input('Id'))
            ->get();

        if(!empty($item)){
            $item->AuditPeriode = Carbon::parse($item->AuditPeriode)->format('F-Y');
            $item->OpeningMeeting = Carbon::parse($item->OpeningMeeting)->format('d/m/Y').' '.$item->OpeningMeetingTime;
            $item->AuditExecutionStart = Carbon::parse($item->AuditExecutionStart)->format('d/m/Y');
            $item->AuditExecutionDone = Carbon::parse($item->AuditExecutionDone)->format('d/m/Y');
            $item->CloseMeeting = Carbon::parse($item->CloseMeeting)->format('d/m/Y').' '.$item->CloseMeetingTime;
            if($item->Status == 2){
                $item->Status = 'Close';
            }else{
                $item->Status = 'Open';
            }
            $item->Criteria = $criteria;
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

        $fileAttachment = [];
        if($request->has('FileAttachment')){
            $arrFile = $request->file('FileAttachment');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,7); //7 path auditor-skill
                }
            }
        }

        if(count($fileAttachment) > 0){
            $fileAttachment = json_encode($fileAttachment);
        }else{
            $fileAttachment = '';
        }

        $AuditPeriode = Carbon::parse($request->input('AuditPeriode'))->format('Y-m-d');
        $OpeningMeeting = Carbon::parse($request->input('OpeningMeeting'))->format('Y-m-d');
        $AuditExecutionStart = Carbon::parse($request->input('AuditExecutionStart'))->format('Y-m-d');
        $AuditExecutionDone = Carbon::parse($request->input('AuditExecutionDone'))->format('Y-m-d');
        $ClosingMeeting = Carbon::parse($request->input('ClosingMeeting'))->format('Y-m-d');
        $OpeningMeetingTime = $request->input('OpeningMeetingTime').':00';
        $CloseMeetingTime = $request->input('CloseMeetingTime').':00';
        $Aprroved       =json_decode($request->input('Approved'));

        DB::begintransaction();
        try{
            $IdAuditPlan = DB::table('audit_plane')
                ->insertGetId([
                    'NoTrans'=>$request->input('NoTrans'),
                    'OrganizerAudit'=>$request->input('OrganizerAudit'),
                    'Approved'=>$Aprroved[0]->Id,
                    'AuditPeriode'=>$AuditPeriode,
                    'OpeningMeeting'=>$OpeningMeeting,
                    'AuditExecutionStart'=>$AuditExecutionStart,
                    'AuditExecutionDone'=>$AuditExecutionDone,
                    'CloseMeeting'=>$ClosingMeeting,
                    'OpeningMeetingTime'=>$OpeningMeetingTime,
                    'CloseMeetingTime'=>$CloseMeetingTime,
                    'Objective'=>$request->input('Objective'),
                    'Purpose'=>$request->input('Purpose'),
                    'AuditScope'=>$request->input('AuditScope'),
                    'Path'=>$fileAttachment,
                    'StatusApproved'=>1,
                    'UserEntry'=>session('adminvue')->Id
                ]);

            foreach(json_decode($request->input('AuditCriteria')) as $key=>$value){
                DB::table('audit_plane_criteria')
                ->insert([
                    'IdAuditPlane'=>$IdAuditPlan,
                    'IdStandartAudit'=>$value->Id,
                    'UserEntry'=>session('adminvue')->Id
                ]);
            }

            foreach(json_decode($request->input('AuditeeDepartment')) as $key=>$value){
                if($value->Department != ''){
                    DB::table('audit_plane_detail')
                    ->insert([
                        'IdAuditPlane'=>$IdAuditPlan,
                        'IdDepartmentAuditee'=>$value->Department->Id,
                        'IdPositionAuditee'=>json_encode($value->Position),
                        'Email'=>$value->Email,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                }

            }
            foreach(json_decode($request->input('Approved')) as $key=>$value){
                DB::table('audit_plane_approval')
                    ->insert([
                        'IdAuditPlane'=>$IdAuditPlan,
                        'Ordinal'=>$key,
                        'IdEmployeApproval'=>$value->Id,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            $this->History->store(25,1,json_encode($requestData));
            DB::commit();
        }catch(\Throwable $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>$e->getMessage(),
                'validation'=>$e->getMessage(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Save Data Success!',
        ));
    }

    public function edit(Request $request){
        $item = DB::table('audit_plane as adp')
            ->select(
                'adp.Id',
                'adp.NoTrans as IdAudit',
                'adp.Approved',
                'emp.Name as Employee',
                'emp.NIP',
                'adp.OrganizerAudit',
                'adp.AuditPeriode',
                'adp.Purpose',
                'adp.AuditScope',
                'adp.OpeningMeeting',
                'adp.AuditExecutionStart',
                'adp.AuditExecutionDone',
                'adp.OpeningMeetingTime',
                'adp.CloseMeetingTime',
                'adp.CloseMeeting as ClosingMeeting',
                'adp.Objective',
                'oad.Name as Organizer',
                'adp.Path'
            )

            ->join('organizer_audit as oad','oad.Id','=','adp.OrganizerAudit')
            ->join('employee as emp','emp.Id','=','adp.Approved')
            ->where('adp.Id',$request->input('Id'))
            ->where('adp.Actived','>',0)
            ->first();

        $AuditCriteria = DB::table('audit_plane_criteria as apc')
            ->select('sdt.Id','sdt.Standart')
            ->join('standart_audit as sdt','sdt.Id','=','apc.IdStandartAudit')
            ->where('apc.IdAuditPlane',$item->Id)
            ->where('apc.Actived','>',0)
            ->get();

        $AuditDetail = DB::table('audit_plane_detail as apd')
            ->select('apd.IdDepartmentAuditee','dpt.Department','apd.IdPositionAuditee','apd.Email')
            ->join('department as dpt','dpt.Id','=','apd.IdDepartmentAuditee')
            ->where('apd.IdAuditPlane',$item->Id)
            ->where('apd.Actived','>',0)
            ->get();

        $Approved = DB::table('audit_plane_approval as apa')
            ->select('apa.IdAuditPlane','apa.IdEmployeApproval','emp.Name','emp.NIP')
            ->join('employee as emp','emp.Id','=','apa.IdEmployeApproval')
            ->where('apa.IdAuditPlane',$item->Id)
            ->where('apa.Actived','>',0)
            ->get();

        if(!empty($item)){
            $item->IdOrganizer = $item->OrganizerAudit;
            $item->OpeningMeetingTime = Carbon::parse($item->OpeningMeetingTime)->format('H:i');
            $item->CloseMeetingTime = Carbon::parse($item->CloseMeetingTime)->format('H:i');
            $item->Organizer = ['Id'=>$item->OrganizerAudit,'Name'=>$item->Organizer];

            $item->Path = json_decode($item->Path);
            $item->AuditCriteria = $AuditCriteria;
            $AuditDetailArr = array();
            $ApprovedArr = array();
            $DepSelect = array();
            $DepDisabled = array();

            foreach($AuditDetail as $key=>$val){
                $AuditDetailArr[$key] = array('Department'=>['Id'=>$val->IdDepartmentAuditee,'Department'=>$val->Department],'Position'=>json_decode($val->IdPositionAuditee),'Email'=>$val->Email,'opsPosition'=>[]);
                array_push($DepSelect,$val->IdDepartmentAuditee);
                array_push($DepDisabled,$val->IdDepartmentAuditee);
            }
            foreach($Approved as $key=>$val){
                $ApprovedArr[$key] = array('Id'=>$val->IdEmployeApproval,'Name'=>$val->Name,'NIP'=>$val->NIP,'opsEmployee'=>[]);
            }

            $item->Approved = $ApprovedArr;
            $item->AuditeeDepartment = $AuditDetailArr;
            $item->DepSelect = $DepSelect;
            $item->DepDisabled = $DepDisabled;
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
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,7); //6 path auditor-skill
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

        $AuditPeriode = Carbon::parse($request->input('AuditPeriode'))->format('Y-m-d');
        $OpeningMeeting = Carbon::parse($request->input('OpeningMeeting'))->format('Y-m-d');
        $AuditExecutionStart = Carbon::parse($request->input('AuditExecutionStart'))->format('Y-m-d');
        $AuditExecutionDone = Carbon::parse($request->input('AuditExecutionDone'))->format('Y-m-d');
        $ClosingMeeting = Carbon::parse($request->input('ClosingMeeting'))->format('Y-m-d');
        $OpeningMeetingTime = $request->input('OpeningMeetingTime').':00';
        $CloseMeetingTime = $request->input('CloseMeetingTime').':00';
        $Aprroved       =json_decode($request->input('Approved'));


        DB::begintransaction();
        try{
            DB::table('audit_plane')
            ->where('Id',$request->input('Id'))
            ->update([
                'NoTrans'=>$request->input('NoTrans'),
                'OrganizerAudit'=>$request->input('OrganizerAudit'),
                'Approved'=>$Aprroved[0]->Id,
                'AuditPeriode'=>$AuditPeriode,
                'OpeningMeeting'=>$OpeningMeeting,
                'AuditExecutionStart'=>$AuditExecutionStart,
                'AuditExecutionDone'=>$AuditExecutionDone,
                'CloseMeeting'=>$ClosingMeeting,
                'OpeningMeetingTime'=>$OpeningMeetingTime,
                'CloseMeetingTime'=> $CloseMeetingTime,
                'Objective'=>$request->input('Objective'),
                'Purpose'=>$request->input('Purpose'),
                'AuditScope'=>$request->input('AuditScope'),
                'Path'=>$fileAttachment
            ]);

            DB::table('audit_plane_criteria')
                ->where('IdAuditPlane',$request->input('Id'))
                ->update([
                    'Actived'=>0
            ]);

            foreach(json_decode($request->input('AuditCriteria')) as $key=>$value){
                DB::table('audit_plane_criteria')
                ->insert([
                    'IdAuditPlane'=>$request->input('Id'),
                    'IdStandartAudit'=>$value->Id,
                    'UserEntry'=>session('adminvue')->Id
                ]);
            }

            DB::table('audit_plane_detail')
                ->where('IdAuditPlane',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            foreach(json_decode($request->input('AuditeeDepartment')) as $key=>$value){
                if($value->Department != ''){
                    DB::table('audit_plane_detail')
                    ->insert([
                        'IdAuditPlane'=>$request->input('Id'),
                        'IdDepartmentAuditee'=>$value->Department->Id,
                        'IdPositionAuditee'=>json_encode($value->Position),
                        'Email'=>$value->Email,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                }
            }

            DB::table('audit_plane_approval')
                ->where('IdAuditPlane',$request->input('Id'))
                ->update([
                    'Actived'=>0
            ]);

            foreach(json_decode($request->input('Approved')) as $key=>$value){
                DB::table('audit_plane_approval')
                    ->insert([
                        'IdAuditPlane'=>$request->input('Id'),
                        'Ordinal'=>$key,
                        'IdEmployeApproval'=>$value->Id,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            $this->History->store(25,2,json_encode($requestData));
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
        $item = DB::table('audit_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_plane')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_plane_detail')
                ->where('IdAuditPlane',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_plane_criteria')
                ->where('IdAuditPlane',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(25,3,json_encode($item));
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
        $item = DB::table('audit_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $approval = DB::table('audit_plane_approval')
            ->where('IdAuditPlane',$request->input('Id'))
            ->where('Actived','>',0)
            ->get();

        DB::begintransaction();
        try{
            DB::table('audit_plane')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>2
                ]);

            DB::table('notification')
                ->insert([
                    'IdEmployee'=>$approval[0]->IdEmployeApproval,
                    'Header'=>'Audit Plan',
                    'Message'=>'Silahkan Setujui Audit Plan Dengan Id Audit '.$item->NoTrans,
                    'Url'=>'/RoleAdmin/approval/data-approval-audit-plan',
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(25,5,json_encode($item));
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

    public function approval(Request $request){
        $item = DB::table('audit_plane')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_plane')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Approved'=>$request->input('Approve'),
                    'StatusApproved'=>2
                ]);

            $this->History->store(25,5,json_encode($item));
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

    public function exportExcel(){
        $session = session('AuditPlan');
        $data = $session->items();
        if(!empty($data)){
            foreach ($data as $key => $val){
                $AuditDetail = DB::table('audit_plane_detail as apd')
                    ->select('apd.IdDepartmentAuditee','dpt.Department')
                    ->join('department as dpt','dpt.Id','=','apd.IdDepartmentAuditee')
                    ->where('apd.IdAuditPlane',$val->id)
                    ->where('apd.Actived','>',0)
                    ->get();

                $val->AuditeeDepartment = $AuditDetail;
            }



            $excelClass = new ExcellAuditPlanControll(str_replace('</br>','',json_encode($data)), 'export-excel-audit-plan');
            return Excel::download($excelClass, 'ExportAuditPlant.xlsx');
        }
    }

    public function exportJadwal($id){
        $item = DB::table('audit_plane')
            ->select('AuditPeriode','Id')
            ->where('Actived','>',0)
            ->where('Id',$id)
            ->first();

        if(!empty($item)){
            $item->KriteriaAudit = '';
            $item->AuditPeriode = Carbon::parse($item->AuditPeriode)->format('F-Y');
            $AuditSelection = DB::table('audit_selection as ads')
                ->select('ads.Id','dpt.Department','ads.AuditDate','ads.HourStart','ads.HourDone')
                ->join('department as dpt','dpt.Id','=','ads.IdDepartmentAuditee')
                ->where('ads.Actived','>',0)
                ->where('ads.IdAuditPlane',$item->Id)
                ->orderby('ads.AuditDate','asc')
                ->get();

            if(count($AuditSelection) > 0){
                $LeadAuditor = [];
                $Observer = [];
                foreach ($AuditSelection as $key => $val){
                    $DetailAuditSelection = DB::table('audit_selection_detail as asd')
                        ->select('asd.IdPositionAuditee','asd.IdAuditee','asd.IdAuditor','asd.IdObserver','psa.Name as LeadAuditor')
                        ->join('personnel_auditor as psa','psa.Id','=','asd.IdLeadAuditor')
                        ->where('asd.IdAuditSelection',$val->Id)
                        ->where('asd.Actived','>',0)
                        ->first();

                    $DetailAuditClause = DB::table('audit_selection_clause as asc')
                        ->select('asc.IdClauseAudit','sdt.Standart as StandartAudit')
                        ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
                        ->where('asc.Actived','>',0)
                        ->where('asc.IdAuditSelection',$val->Id)
                        ->get();

                    foreach ($DetailAuditClause as $k => $value){
                        if($k+1 == count($DetailAuditClause)){
                            $item->KriteriaAudit .= $value->StandartAudit;
                        }else{
                            $item->KriteriaAudit .= $value->StandartAudit.',';
                        }
                    }


                    $ObserverAudit = json_decode($DetailAuditSelection->IdObserver);
                    array_push($LeadAuditor,$DetailAuditSelection->LeadAuditor);
                    foreach ($ObserverAudit as $k => $value){
                        array_push($Observer,$value->Employee);
                    }

                    $val->DetailAudit = $DetailAuditSelection;
                    $val->DetailAuditClause = $DetailAuditClause;
                    $val->LeadAuditor = $DetailAuditSelection->LeadAuditor;
                    $val->AuditDateHari = Carbon::parse($val->AuditDate)->format('l, d F Y');
                    $val->HourStart = Carbon::parse($val->HourStart)->format('H.II');
                    $val->HourDone = Carbon::parse($val->HourDone)->format('H.II');
                }
            }

            $item->LeadAuditor = $LeadAuditor;
            $item->Observer = $Observer;
            $item->AuditSelection = $AuditSelection;

            $Title = "Data Jadwal Audit";
            $Header = "Jadwal Audit Internal Sistem Mutu, K3 dan Lingkungan";
            $SubHeader = "Quality, Health, Safety and Environment System Internal Audit Schedule";
            $noOrder = "010GH0-002.01";

            $view = view('export-pdf.header-potrait',compact('Title','Header','SubHeader','noOrder'))->render();
            $view .= view('export-pdf.pdf-jadwal-audit',compact('item'))->render();
            $view .= view('export-pdf.footer')->render();

            $pdf = PDF::loadHTML($view);
            return $pdf->stream();
        }
    }

    public function exportTindakLanjut($id){
        $item=DB::table('audit_plane as apl')
            ->select(
                'apl.AuditPeriode',
                'asl.Id as IdAuditSelection',
                'arp.RefNumber',
                'arp.PotentialNonConformitiy',
                'arp.TypeNonConformity',
                'acp.ConditionNow',
                'acp.GapAnalysis',
                'acp.PotentialCauseNonConformitiy',
                'acp.ExecutionPlaneCorrective',
                'acp.CorrectiveAction',
                'acp.PreventiveAction',
                'asd.IdLeadAuditor',
                'acp.ExecutionPreventiveAction',
                'oad.Classification',
                'apl.Status'
            )
            ->join('audit_selection as asl','asl.IdAuditPlane','=','apl.Id')
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','asl.Id')
            ->join('audit_report as arp','arp.IdAuditPlane','=','apl.Id')
            ->join('audit_capa_plane as acp','acp.IdAuditPlane','=','apl.Id')
            ->join('organizer_audit as oad','oad.Id','=','apl.OrganizerAudit')
            ->where('asl.StatusApproved',2)
            ->where('arp.StatusApproved',2)
            ->where('acp.StatusApproved',2)
            ->where('asd.Actived','>',0)
            ->where('apl.Id',$id)
            ->get();

        if(count($item) > 0){
            foreach($item as $key=>$val){
                $DetailAuditClause = DB::table('audit_selection_clause as asc')
                ->select('asc.IdClauseAudit','sdt.Standart as StandartAudit')
                ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
                ->where('asc.Actived','>',0)
                ->where('asc.IdAuditSelection',$val->IdAuditSelection)
                ->get();

                $LeadAuditor = DB::table('personnel_auditor as psa')
                    ->select('psa.Name')
                    ->where('psa.Id',$val->IdLeadAuditor)
                    ->value('psa.Name');

                $val->Clause = $DetailAuditClause;
                $val->LeadAuditor = $LeadAuditor;
            }

            // dd($item);
            $Title = "Data Tindak Lanjut Audit";
            $Header = "Laporan Hasil Tindak Lanjut Audit Internal Sistem Mutu, K3 dan Lingkungan";
            $SubHeader = "Report of Quality, Health, Safety and Environment System Internal Audit Follow-up Report";
            $noOrder = "010GH0-006.01";

            $view = view('export-pdf.pdf-hasiltindak-audit',compact('item','Title','Header','SubHeader','noOrder'))->render();
            $view .= view('export-pdf.footer')->render();

            $pdf = PDF::loadHTML($view);
            return $pdf->stream();
        }
    }

    public function exportAnalisis($id){
        $item = DB::table('audit_plane as adp')
            ->select('adp.AuditPeriode','adp.Id','oad.Classification')
            ->join('organizer_audit as oad','oad.Id','=','adp.OrganizerAudit')
            ->where('adp.Actived','>',0)
            ->where('adp.Id',$id)
            ->first();

        if(!empty($item)){
            $item->KriteriaAudit = '';
            $AuditCriteria = DB::table('audit_plane_criteria as apc')
                ->select('sdt.Standart')
                ->join('standart_audit as sdt','sdt.Id','=','apc.IdStandartAudit')
                ->where('apc.IdAuditPlane',$item->Id)
                ->where('apc.Actived','>',0)
                ->get();

            foreach ($AuditCriteria as $key => $value) {
                if($key+1 == count($AuditCriteria)){
                    $item->KriteriaAudit .= $value->Standart;
                }else{
                    $item->KriteriaAudit .= $value->Standart.',';
                }
            }

            $DepartmentClause = DB::table('audit_selection as asl')
                ->select(
                    'asl.Id',
                    'dpt.Department',
                    'dpt.Code',
                    'arp.TypeNonConformity',
                    'arp.AuditScore',
                    'arp.AuditGrade'
                )
                ->join('audit_report as arp','arp.IdAuditSelection','=','asl.Id')
                ->join('department as dpt','dpt.Id','=','asl.IdDepartmentAuditee')
                ->where('asl.IdAuditPlane',$item->Id)
                ->where('asl.StatusApproved',2)
                ->where('asl.Actived','>',0)
                ->where('arp.StatusApproved','<>',3)
                ->where('arp.Actived','>',0)
                ->get();

            foreach($DepartmentClause as $key => $value){
                $value->ClauseAudit = DB::table('audit_selection_clause as asc')
                    ->select('asc.IdClauseAudit','sdt.Standart')
                    ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
                    ->where('asc.Actived','>',0)
                    ->where('asc.IdAuditSelection',$value->Id)
                    ->get();

                $value->ClauseTemuan = [];
                $value->TotalClauseTemuan = 0;
            }

            $item->DepartmentClause = $DepartmentClause;

            $Title = "Data Analisis Audit";
            $Header = "Analisa Hasil Audit Internal Sistem Mutu, K3 dan Lingkungan";
            $SubHeader = "Analysis of Quality, Health, Safety and Environment System Internal Audit Result";
            $noOrder = "010GH0-007.01";

            $view = view('export-pdf.header-potrait',compact('Title','Header','SubHeader','noOrder'))->render();
//            dd($item);
            $view .= view('export-pdf.pdf-analisis-audit',compact('item'))->render();
            $view .= view('export-pdf.footer')->render();

            $pdf = PDF::loadHTML($view);
            return $pdf->stream();
        }
    }

    public function exportProgram($id){
        $item = DB::table('audit_plane')
            ->select('AuditPeriode','Id','AuditExecutionStart','AuditExecutionDone')
            ->where('Actived','>',0)
            ->where('Id',$id)
            ->first();

        if(!empty($item)){
            $item->KriteriaAudit = '';
            $item->PeriodeYear = Carbon::parse($item->AuditPeriode)->format('Y');
            $item->AuditPeriode = Carbon::parse($item->AuditPeriode)->format('F-Y');
            $item->MonthExcecution = Carbon::parse($item->AuditExecutionStart)->format('m');
            $item->MonthExcecutionDone = Carbon::parse($item->AuditExecutionDone)->format('m');
            $AuditSelection = DB::table('audit_selection as ads')
                ->select('ads.Id','dpt.Department','ads.IdDepartmentAuditee')
                ->join('department as dpt','dpt.Id','=','ads.IdDepartmentAuditee')
                ->where('ads.Actived','>',0)
                ->where('ads.IdAuditPlane',$item->Id)
                ->get();

            if(count($AuditSelection) > 0){
                foreach ($AuditSelection as $key => $val){
                    $DetailAuditClause = DB::table('audit_selection_clause as asc')
                    ->select('asc.IdClauseAudit','sdt.Standart as StandartAudit')
                    ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
                    ->where('asc.Actived','>',0)
                    ->where('asc.IdAuditSelection',$val->Id)
                    ->get();

                    foreach ($DetailAuditClause as $k => $value){
                        if($k+1 == count($DetailAuditClause)){
                            $item->KriteriaAudit .= $value->StandartAudit;
                        }else{
                            $item->KriteriaAudit .= $value->StandartAudit.',';
                        }
                    }

                    $val->DetailAuditClause = $DetailAuditClause;

                    $PrevAuditDepartment = DB::table('audit_report as arp')
                        ->select('arp.AuditScore','arp.AuditGrade')
                        ->join('audit_plane as adp','adp.Id','=','arp.IdAuditPlane')
                        ->whereYear('adp.AuditPeriode','<',$item->PeriodeYear)
                        ->where('arp.IdDepartmentAuditee',$val->IdDepartmentAuditee)
                        ->where('arp.Actived','>',0)
                        ->where('adp.Actived','>',0)
                        ->orderby('arp.Id','desc')
                        ->first();

                    if(!empty($PrevAuditDepartment)){
                        $val->AuditScore = $PrevAuditDepartment->AuditScore;
                        $val->AuditGrade = $PrevAuditDepartment->AuditGrade;
                    }else{
                        $val->AuditScore = 0.00;
                        $val->AuditGrade = '';
                    }
                }
            }

            $item->AuditSelection = $AuditSelection;

            $Title = "Data Program Audit";
            $Header = "Program Audit Internal Sistem Mutu, K3 dan Lingkungan";
            $SubHeader = "Quality, Health, Safety and Environment System Internal Audit Program";
            $noOrder = "010GH0-001.01";

            $view = view('export-pdf.header-landscape',compact('Title','Header','SubHeader','noOrder'))->render();
            $view .= view('export-pdf.pdf-audit-internal',compact('item'))->render();
            $view .= view('export-pdf.footer')->render();

            $pdf = PDF::loadHTML($view);
            return $pdf->stream();
        }
    }
    function formatDate($date, $format){
        return Carbon::createFromFormat('d/m/Y', $date)->format($format);
    }

    public function validation(){
        return[
            'OrganizerAudit'=>'required'
        ];
    }
}
