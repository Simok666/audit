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

class AuditorTeamControll extends Controller
{
    protected $History;
    protected $DBMain;
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
                'ads.StatusApproved',
                'emp.Name as EmpApproved',
                'ads.Path',
                'ads.IsReport',
                'ads.Actived'
            )
            ->join('audit_selection_detail as asd','asd.IdAuditSelection','=','ads.Id')
            ->join('audit_plane as adp','adp.Id','=','ads.IdAuditPlane')
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->join('department as dpt','dpt.Id','=','ads.IdDepartmentAuditee')
            ->join('audit_selection_approval as asa','asa.IdAuditSelection','=','ads.Id')
            ->join('audit_selection_auditor as asr','asr.IdAuditSelection','=','ads.Id')
            ->join('audit_selection_auditee as ase','ase.IdAuditSelection','=','ads.Id')
            ->leftjoin('employee as emp','emp.Id','=','ads.Approved')
            ->orderBy($field, $dir)
            ->where('ads.Actived','>',0)
            ->whereRaw((
                'CASE 
                    WHEN ads.StatusApproved = 1 OR ads.StatusApproved = 3 THEN ads.UserEntry ='.session('adminvue')->Id.'
                    WHEN ads.StatusApproved = 1 OR ads.StatusApproved = 3 THEN asa.IdEmployeApproval ='.session('adminvue')->IdEmployee.'
                    WHEN ads.StatusApproved = 2 THEN asr.IdEmployeAuditor ='.session('adminvue')->IdEmployee.'
                    WHEN ads.StatusApproved = 2 THEN ase.IdEmployeAuditee ='.session('adminvue')->IdEmployee.'
                    ELSE ads.Actived > 0
                END'
            ))
            ->orwhereRaw(
                'CASE 
                    WHEN ads.StatusApproved = 2 THEN asa.IdEmployeApproval ='.session('adminvue')->IdEmployee.'
                    WHEN ads.StatusApproved = 2 THEN ads.UserEntry ='.session('adminvue')->Id.'
                END'
            )
            ->where('ads.Actived','>',0)
            ->groupby('ads.Id');

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
            $val->CekAuditor = $this->cekAuditorSelection($val->id);
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
            ->where('sdt.Actived','>',0)
            ->where('apc.IdAuditSelection',$id)
            ->get();

        return $criteria;
    }

    public function getSelect(Request $request){
        $IdAudit = DB::table('audit_plane')
            ->select('Id','NoTrans','Purpose','OpeningMeeting')
            ->where('Actived','>',0)
            ->where('StatusApproved',2)
            ->where('IsSelection',0)
            ->get();

        $employee = DB::table('employee')
            ->select('Id','Name','NIP')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'IdAudit'=>$IdAudit,
            'employee'=>$employee
        ));
    }

    public function getAuditeeDepartment(Request $request){
        $statusEdit = $request->Status;
        $AuditeeDepartment = DB::table('audit_plane_detail as apd')
            ->select('apd.IdDepartmentAuditee','dpt.Department','apd.IdPositionAuditee','apd.Email')
            ->join('department as dpt','dpt.Id','=','apd.IdDepartmentAuditee')
            ->where('apd.Actived','>',0)
            ->where('apd.IdAuditPlane',$request->input('IdAuditPlan'))
            ->where(function($q)use($statusEdit,$request){
                if($statusEdit == false){
                    $q->where('apd.IsSelectionDep',0);
                }else{
                    $q->where('apd.IsSelectionDep',0)
                    ->orwhere('apd.IdDepartmentAuditee',$request->input('IdDepartmentAuditee'));
                }
            })
            ->get();

        $AuditClause = [];
        $StandartAudit = [];
        if($request->Status == false){
            $AuditClause = DB::table('audit_plane_criteria as apc')
                ->select('apc.Id','apc.IdStandartAudit','sdt.Standart as StandartAudit')
                ->join('standart_audit as sdt','sdt.Id','=','apc.IdStandartAudit')
                ->where('apc.Actived','>',0)
                ->where('apc.IdAuditPlane',$request->input('IdAuditPlan'))
                ->get();

            if(count($AuditClause) > 0){
                foreach($AuditClause as $key=>$val){
                    $ClauseAudit = DB::table('clause_audit')
                        ->select(
                            'Id',
                            DB::raw('CONCAT(Clause,"-",Requirements) as Clause')
                        )
                        ->where('Actived','>',0)
                        ->where('IdStandart',$val->IdStandartAudit)
                        ->orderByRaw('Clause * 1 asc')
                        ->get();

                    array_push($StandartAudit,$val->IdStandartAudit);

                    $val->ClauseAudit = '';
                    $val->opsClauseAudit = $ClauseAudit;
                }
            }
        }

        return json_encode(array(
            'status'=>true,
            'AuditeeDepartment'=>$AuditeeDepartment,
            'AuditClause'=>$AuditClause,
            'StandartAudit'=>$StandartAudit
        ));
    }

    public function getAuditee(Request $request){
        // $Auditee = DB::table('personnel_auditor as pad')
        //     ->select('pad.IdEmployee as Id','emp.Name as Employee')
        //     ->join('maindb_widatra.employee as emp','emp.Id','=','pad.IdEmploye')
        //     ->where('pad.IdDepartment',$request->input('IdAuditeeDepartment'))
        //     ->where('pad.Actived','>',0)
        //     ->where('pad.Status',1)
        //     ->get();

        $Auditee = DB::table('employee')
            ->select('Id','Name as Employee')
            ->where('IdDepartment',$request->input('IdAuditeeDepartment'))
            ->where('Actived','>',0)
            ->get();

        // $LeadAuditor = DB::table('personnel_auditor_skill as pas')
        //     ->select('pas.IdEmploye as Id','pad.IdDepartment','pad.Name as Employee')
        //     ->join('personnel_auditor as pad','pad.Id','=','pas.IdPersonel')
        //     ->where('pad.IdDepartment','<>',$request->input('IdAuditeeDepartment'))
        //     ->where('pad.Type','Auditor')
        //     ->whereIn('IdStandartAudit',$request->input('StandartAudit'))
        //     ->where('pas.Actived','>',0)
        //     ->groupby('pas.IdPersonel')
        //     ->get();

        // $Auditor = DB::table('personnel_auditor_skill as pas')
        //     ->select('pad.Id as Id','pad.IdDepartment','pad.Name as Employee')
        //     ->join('personnel_auditor as pad','pad.Id','=','pas.IdPersonel')
        //     ->where('pad.IdDepartment','<>',$request->input('IdAuditeeDepartment'))
        //     ->where('pad.Type','Auditor')
        //     ->whereIn('pas.IdStandartAudit',$request->input('StandartAudit'))
        //     ->where('pas.Actived','>',0)
        //     ->where('pad.Actived','>',0)
        //     ->groupby('pas.IdPersonel')
        //     ->get();

        return json_encode(array(
            'status'=>true,
            'Auditee'=>$Auditee,
            // 'LeadAuditor'=>$LeadAuditor,
            // 'Auditor'=>$Auditor
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

    public function getAuditorDepartment(Request $request){
        $LeadAuditor = DB::table('personnel_auditor_skill as pas')
            ->select('pas.IdEmploye as Id','pad.IdDepartment','pad.Name as Employee')
            ->join('personnel_auditor as pad','pad.Id','=','pas.IdPersonel')
            ->where('pad.IdDepartment','<>',$request->input('IdAuditeeDepartment'))
            ->where('pad.Type','Auditor')
            ->whereIn('IdStandartAudit',$request->input('StandartAudit'))
            ->whereNotIn('pad.IdEmploye',$request->input('AuditeeSelect'))
            ->where('pad.Actived','>',0)
            ->where('pas.Actived','>',0)
            ->groupby('pas.IdPersonel')
            ->get();

        $Auditor = DB::table('personnel_auditor_skill as pas')
            ->select('pad.Id as Id','pad.IdDepartment','pad.Name as Employee')
            ->join('personnel_auditor as pad','pad.Id','=','pas.IdPersonel')
            ->where('pad.IdDepartment','<>',$request->input('IdAuditeeDepartment'))
            ->where('pad.Type','Auditor')
            ->whereIn('pas.IdStandartAudit',$request->input('StandartAudit'))
            ->whereNotIn('pad.IdEmploye',$request->input('AuditeeSelect'))
            ->where('pas.Actived','>',0)
            ->where('pad.Actived','>',0)
            ->groupby('pas.IdPersonel')
            ->get();

        return json_encode(array(
            'status'=>true,
            'LeadAuditor'=>$LeadAuditor,
            'Auditor'=>$Auditor
        ));
    }

    public function getObserver(Request $request){
        $Observer = DB::table('personnel_auditor')
            ->select('Id','IdDepartment','Name as Employee')
            ->where('IdDepartment','<>',$request->input('IdAuditeeDepartment'))
            ->where('Type','Observer')
            ->where('Actived','>',0)
            ->whereNotIn('IdEmploye',$request->input('AuditeeSelect'))
            ->get();

        return json_encode(array(
            'status'=>true,
            'Observer'=>$Observer
        ));
    }

    public function show(Request $request){
        $item = DB::table('audit_selection as ads')
            ->select(
                'ads.Id',
                'ads.NoTrans',
                'emp.Name as EmpApproved',
                'dpt.Department as AuditeeDepartment',
                'ads.AuditDate',
                'ads.AuditDate as DataStandartAudit',
                'ads.AuditDate as DataClauseAudit',
                'ads.HourStart',
                'ads.HourDone',
                'ads.CreateAt',
                'ads.UpdateAt',
                'usr.UserName as UserEntry'
            )
            ->join('department as dpt','dpt.Id','=','ads.IdDepartmentAuditee')
            ->leftjoin('employee as emp','emp.Id','=','ads.Approved')
            ->join('users as usr','usr.Id','=','ads.UserEntry')
            ->where('ads.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->AuditDate = Carbon::parse($item->AuditDate)->format('d/m/Y');
            $item->HourStart = Carbon::parse($item->HourStart)->format('H:II');
            $item->HourDone = Carbon::parse($item->HourDone)->format('H:II');
            $item->CreateAt = Carbon::parse($item->CreateAt)->format('d/m/Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('d/m/Y H:i:s');
            $dataStandart=json_decode($this->getAuditCriteriaPlan($item->Id));
            $item->ClauseAudit = $dataStandart;


            $standart='';
            $clause='';
            foreach ($dataStandart as $valstandart){
                $standart .=$valstandart->Standart.'<br>';
                $arrClause=json_decode($valstandart->Clause );
                if(!empty($arrClause) || $arrClause!=""){
                    foreach ($arrClause as $key=>$valcaluse){
                        if(sizeof($arrClause)>1){
                            if(sizeof($arrClause)-1 == $key){
                                $clause.=$valcaluse->Clause;
                            }else{
                                $clause.=$valcaluse->Clause.' , ';
                            }

                        }else{
                            $clause.=$valcaluse->Clause;
                        }
                    }

                }

                $clause.='<br>';

            }
            $item->DataStandartAudit=$standart;
            $item->DataClauseAudit=$clause;

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

        $checkHeadAuditee = 0;
        $AuditeeArr = json_decode($request->input('Auditee'));
        foreach($AuditeeArr as $key=>$val){
            $employeeAuditee = DB::table('employee as emp')
                ->select('pst.Id as Position')
                ->join('position as pst','pst.Id','=','emp.IdPosition')
                ->where('emp.Id',$val->Id)
                ->where('pst.Parent',0)
                ->where('emp.Actived','>',0)
                ->where('pst.Actived','>',0)
                ->first();

            if(!empty($employeeAuditee)){
                $checkHeadAuditee++;
            }
        }

        if($checkHeadAuditee == 0){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Pilih Head Auditee Terlebih Dahulu',
                'validation'=>$validation->errors()
            ));
        }

        if(json_decode($request->input('Auditor')) == ""){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Isi Auditor Terlebih Dahulu',
                'validation'=>$validation->errors()
            ));
        }

        if($request->input('LeadAuditor') == "undefined"){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Isi Lead Auditor Terlebih Dahulu',
                'validation'=>$validation->errors()
            ));
        }

        if(json_decode($request->input('Observer')) == "''"){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Isi Observer Terlebih Dahulu',
                'validation'=>$validation->errors()
            ));
        }

        $fileAttachment = [];
        if($request->has('FileAttachment')){
            $arrFile = $request->file('FileAttachment');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,8); //8 path auditor-team
                }
            }
        }

        if(count($fileAttachment) > 0){
            $fileAttachment = json_encode($fileAttachment);
        }else{
            $fileAttachment = '';
        }

        $AuditDate = Carbon::parse($request->input('AuditDate'))->format('Y-m-d');
        $IsSelection = 0;

        $countAuditPlaneDetail = DB::table('audit_plane_detail')
        ->where('Actived','>',0)
        ->where('IdAuditPlane',$request->input('IdAuditPlane'))
        ->count();

        $countAuditPlaneSelection = DB::table('audit_plane_detail')
        ->where('Actived','>',0)
        ->where('IdAuditPlane',$request->input('IdAuditPlane'))
        ->where('IsSelectionDep',1)
        ->count();

        if($countAuditPlaneDetail == $countAuditPlaneSelection+1){
            $IsSelection = 1;
        }
        $Aprroved       =json_decode($request->input('Approved'));
        $AuditorId = array();

        DB::begintransaction();
        try {
            $IdAuditSelection = DB::table('audit_selection')
                ->insertGetId([
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'NoTrans'=>$request->input('NoTrans'),
                    'Approved'=>$Aprroved[0]->Id,
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'AuditDate'=>$AuditDate,
                    'HourStart'=>$request->input('HourStart'),
                    'HourDone'=>$request->input('HourDone'),
                    'Path'=>$fileAttachment,
                    'StatusApproved'=>1,
                    'UserEntry'=>session('adminvue')->Id
                ]);

            foreach(json_decode($request->input('AuditClause')) as $key=>$value){
                DB::table('audit_selection_clause')
                    ->insert([
                        'IdAuditSelection'=>$IdAuditSelection,
                        'IdStandartAudit'=>$value->IdStandartAudit,
                        'IdClauseAudit'=>json_encode($value->ClauseAudit),
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            foreach(json_decode($request->input('Auditee')) as $key => $value){
                $IsHead = 0;
                $employeeAuditee = DB::table('employee as emp')
                    ->select('pst.Id as Position')
                    ->join('position as pst','pst.Id','=','emp.IdPosition')
                    ->where('emp.Id',$value->Id)
                    ->where('pst.Parent',0)
                    ->where('emp.Actived','>',0)
                    ->where('pst.Actived','>',0)
                    ->first();

                if(!empty($employeeAuditee)){
                    $IsHead=1;
                }

                DB::table('audit_selection_auditee')
                    ->insert([
                        'IdAuditSelection'=>$IdAuditSelection,
                        'IdEmployeAuditee'=>$value->Id,
                        'IsHead'=>$IsHead,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            $IdEmpLead = DB::table('personnel_auditor')
                    ->where('Id',$request->input('LeadAuditor'))
                    ->where('Actived','>',0)
                    ->value('IdEmploye');

            DB::table('audit_selection_auditor')
                    ->insert([
                        'IdAuditSelection'=>$IdAuditSelection,
                        'IdEmployeAuditor'=>$IdEmpLead,
                        'UserEntry'=>session('adminvue')->Id
                    ]);

            foreach(json_decode($request->input('Auditor')) as $key => $value){
                $IdEmpAuditor = DB::table('personnel_auditor')
                    ->where('Id',$value->Id)
                    ->where('Actived','>',0)
                    ->value('IdEmploye');

                DB::table('audit_selection_auditor')
                    ->insert([
                        'IdAuditSelection'=>$IdAuditSelection,
                        'IdEmployeAuditor'=>$IdEmpAuditor,
                        'UserEntry'=>session('adminvue')->Id
                    ]);

                array_push($AuditorId,$IdEmpAuditor);
            }

            $AuditorId = json_encode($AuditorId);

            DB::table('audit_selection_detail')
                ->insert([
                    'IdAuditSelection'=>$IdAuditSelection,
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    'IdAuditee'=>$request->input('Auditee'),
                    'IdAuditorDepartment'=>$request->input('IdAuditorDepartment'),
                    'IdLeadAuditor'=>$request->input('LeadAuditor'),
                    'IdAuditor'=>$request->input('Auditor'),
                    'AuditorId'=>$AuditorId,
                    'IdDepartmentObserver'=>$request->input('IdDepartmentObserver'),
                    'IdObserver'=>$request->input('Observer'),
                    'Email'=>$request->input('Email'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            DB::table('audit_plane')
                ->where('Id',$request->input('IdAuditPlane'))
                ->update([
                    'IsSelection'=>$IsSelection
                ]);

            DB::table('audit_plane_detail')
                ->where('IdAuditPlane',$request->input('IdAuditPlane'))
                ->where('IdDepartmentAuditee',$request->input('IdDepartmentAuditee'))
                ->update([
                    'IsSelectionDep'=>1
            ]);

            foreach(json_decode($request->input('Approved')) as $key=>$value){
                DB::table('audit_selection_approval')
                    ->insert([
                        'IdAuditSelection'=>$IdAuditSelection,
                        'Ordinal'=>$key,
                        'IdEmployeApproval'=>$value->Id,
                        'UserEntry'=>session('adminvue')->Id
                ]);
            }
            $this->History->store(26,1,json_encode($requestData));
            DB::commit();
        }catch(\Throwable $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Save Data Failed, Server Invalid! '.$e->getMessage(),
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Save Data Success!',
        ));
    }

    public function edit(Request $request){
        $item = DB::table('audit_selection as ads')
            ->select(
                'ads.Id',
                'ads.IdAuditPlane',
                'ads.NoTrans',
                'ads.Approved',
                'emp.Name as Employee',
                'emp.NIP',
                'adp.Purpose',
                'adp.OpeningMeeting',
                'ads.IdDepartmentAuditee',
                'dpt.Department',
                'ads.AuditDate',
                'ads.HourStart',
                'ads.HourDone',
                'ads.Path'
            )
            ->join('audit_plane as adp','adp.Id','=','ads.IdAuditPlane')
            ->join('department as dpt','dpt.Id','=','ads.IdDepartmentAuditee')
            ->join('employee as emp','emp.Id','=','ads.Approved')
            ->where('ads.Actived','>',0)
            ->where('ads.Id',$request->input('Id'))
            ->first();

        $ClauseAudit = DB::table('audit_selection_clause as asc')
            ->select('asc.Id','asc.IdStandartAudit','sdt.Standart as StandartAudit','asc.IdClauseAudit as ClauseAudit')
            ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
            ->where('asc.Actived','>',0)
            ->where('asc.IdAuditSelection',$request->input('Id'))
            ->get();

        $detailSelection = DB::table('audit_selection_detail as asd')
            ->select(
                'asd.Id',
                'asd.IdDepartmentAuditee',
                'asd.IdPositionAuditee',
                'asd.IdAuditee',
                'asd.IdAuditorDepartment',
                'asd.IdLeadAuditor',
                'asd.IdAuditor',
                'asd.IdDepartmentObserver',
                'asd.IdObserver',
                'asd.Email',
                'pad.Name as Employee'
            )
            ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
            ->where('asd.Actived','>',0)
            ->where('asd.IdAuditSelection',$request->input('Id'))
            ->first();

        $Approved = DB::table('audit_selection_approval as asp')
            ->select('asp.IdAuditSelection','asp.IdEmployeApproval','emp.Name','emp.NIP')
            ->join('employee as emp','emp.Id','=','asp.IdEmployeApproval')
            ->where('asp.IdAuditSelection',$request->input('Id'))
            ->where('asp.Actived','>',0)
            ->get();


        if(!empty($item)){
            $item->IdAuditPlan = ['Id'=>$item->IdAuditPlane,'NoTrans'=>$item->NoTrans,'Purpose'=>$item->Purpose,'OpeningMeeting'=>$item->OpeningMeeting];
            $item->Approved = ['Id'=>$item->Approved,'Name'=>$item->Employee,'NIP'=>$item->NIP];
            $item->HourStart = Carbon::createFromFormat('H:i:s',$item->HourStart)->format('H:i');
            $item->HourDone = Carbon::createFromFormat('H:i:s',$item->HourDone)->format('H:i');
            $item->Path = json_decode($item->Path);
            $item->AuditeeDepartment = ['IdDepartmentAuditee'=>$item->IdDepartmentAuditee,'Department'=>$item->Department,'IdPositionAuditee'=>$detailSelection->IdPositionAuditee,'Email'=>$detailSelection->Email];
            $item->Auditee = json_decode($detailSelection->IdAuditee);
            $item->IdDepartmentObserver = json_decode($detailSelection->IdDepartmentObserver);
            $item->IdAuditorDepartment = json_decode($detailSelection->IdAuditorDepartment);
            $item->Auditor = json_decode($detailSelection->IdAuditor);
            $item->Observer = json_decode($detailSelection->IdObserver);
            $item->LeadAuditor = ['Id'=>$detailSelection->IdLeadAuditor,'Employee'=>$detailSelection->Employee];
            $AuditClauseArr = array();
            $clauseSelect = array();
            $standartAuditSelect = array();
            $ApprovedArr = array();
            $auditeeSelect = array();

            foreach($ClauseAudit as $key=>$val){
                $AuditClauseArr[$key] = array('IdStandartAudit'=>$val->IdStandartAudit,'StandartAudit'=>$val->StandartAudit,'ClauseAudit'=>json_decode($val->ClauseAudit),'opsClauseAudit'=>$this->getClauseAudit($val->IdStandartAudit));
                foreach(json_decode($val->ClauseAudit) as $k => $value){
                    array_push($clauseSelect,$value->Id);
                }
                array_push($standartAuditSelect,$val->IdStandartAudit);
            }
            foreach($Approved as $key=>$val){
                $ApprovedArr[$key] = array('Id'=>$val->IdEmployeApproval,'Name'=>$val->Name,'NIP'=>$val->NIP,'opsEmployee'=>[]);
            }
            foreach($item->Auditee as $key=>$val){
                array_push($auditeeSelect,$val->Id);
            }

            $item->Approved = $ApprovedArr;
            $item->AuditClause = $AuditClauseArr;
            $item->ClauseSelect = $clauseSelect;
            $item->StandartAuditSelect = $standartAuditSelect;
            $item->AuditeeSelect = $auditeeSelect;
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getClauseAudit($id){
        $ClauseAudit = DB::table('clause_audit')
            ->select(
                'Id',
                DB::raw('CONCAT(Clause,"-",Requirements) as Clause')

            )
            ->where('Actived','>',0)
            ->where('IdStandart',$id)
            ->get();


        return $ClauseAudit;
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

        $checkHeadAuditee = 0;
        $AuditeeArr = json_decode($request->input('Auditee'));
        foreach($AuditeeArr as $key=>$val){
            $employeeAuditee = DB::table('employee as emp')
                ->select('pst.Id as Position')
                ->join('position as pst','pst.Id','=','emp.IdPosition')
                ->where('emp.Id',$val->Id)
                ->where('pst.Parent',0)
                ->where('emp.Actived','>',0)
                ->where('pst.Actived','>',0)
                ->first();

            if(!empty($employeeAuditee)){
                $checkHeadAuditee++;
            }
        }

        if($checkHeadAuditee == 0){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Pilih Head Auditee Terlebih Dahulu',
                'validation'=>$validation->errors()
            ));
        }

        if(json_decode($request->input('Auditor')) == ""){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Isi Auditor Terlebih Dahulu',
                'validation'=>$validation->errors()
            ));
        }

        if($request->input('LeadAuditor') == "undefined"){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Isi Lead Auditor Terlebih Dahulu',
                'validation'=>$validation->errors()
            ));
        }

        if(json_decode($request->input('Observer')) == "''"){
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan Isi Observer Terlebih Dahulu',
                'validation'=>$validation->errors()
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

        $AuditDate = Carbon::parse($request->input('AuditDate'))->format('Y-m-d');
        $oldItem = DB::table('audit_selection as asd')
            ->select('IdDepartmentAuditee','IdAuditPlane')
            ->where('Id',$request->input('Id'))
            ->first();
        $Aprroved       =json_decode($request->input('Approved'));
        $AuditorId = array();
        DB::begintransaction();
        try {
            DB::table('audit_selection')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IdAuditPlane'=>$request->input('IdAuditPlane'),
                    'NoTrans'=>$request->input('NoTrans'),
                    'Approved'=>$Aprroved[0]->Id,
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'AuditDate'=>$AuditDate,
                    'HourStart'=>$request->input('HourStart'),
                    'HourDone'=>$request->input('HourDone'),
                    'Path'=>$fileAttachment,
                    'StatusApproved'=>1
                ]);

            DB::table('audit_selection_clause')
                ->where('IdAuditSelection',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);
            foreach(json_decode($request->input('AuditClause')) as $key=>$value){
                DB::table('audit_selection_clause')
                    ->insert([
                        'IdAuditSelection'=>$request->input('Id'),
                        'IdStandartAudit'=>$value->IdStandartAudit,
                        'IdClauseAudit'=>json_encode($value->ClauseAudit),
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            DB::table('audit_selection_approval')
                ->where('IdAuditSelection',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);
            foreach(json_decode($request->input('Approved')) as $key=>$value){
                DB::table('audit_selection_approval')
                    ->insert([
                        'IdAuditSelection'=>$request->input('Id'),
                        'Ordinal'=>$key,
                        'IdEmployeApproval'=>$value->Id,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            DB::table('audit_selection_auditee')->where('IdAuditSelection',$request->input('Id'))->update(['Actived'=>0]);

            foreach(json_decode($request->input('Auditee')) as $key => $value){
                $IsHead = 0;
                $employeeAuditee = DB::table('employee as emp')
                    ->select('pst.Id as Position')
                    ->join('position as pst','pst.Id','=','emp.IdPosition')
                    ->where('emp.Id',$value->Id)
                    ->where('pst.Parent',0)
                    ->where('emp.Actived','>',0)
                    ->where('pst.Actived','>',0)
                    ->first();

                if(!empty($employeeAuditee)){
                    $IsHead=1;
                }

                DB::table('audit_selection_auditee')
                    ->insert([
                        'IdAuditSelection'=>$request->input('Id'),
                        'IdEmployeAuditee'=>$value->Id,
                        'IsHead'=>$IsHead,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
            }

            DB::table('audit_selection_auditor')->where('IdAuditSelection',$request->input('Id'))->update(['Actived'=>0]);

            $IdEmpLead = DB::table('personnel_auditor')
                    ->where('Id',$request->input('LeadAuditor'))
                    ->where('Actived','>',0)
                    ->value('IdEmploye');

            DB::table('audit_selection_auditor')
                    ->insert([
                        'IdAuditSelection'=>$request->input('Id'),
                        'IdEmployeAuditor'=>$IdEmpLead,
                        'UserEntry'=>session('adminvue')->Id
                    ]);

            foreach(json_decode($request->input('Auditor')) as $key => $value){
                $IdEmpAuditor = DB::table('personnel_auditor')
                    ->where('Id',$value->Id)
                    ->where('Actived','>',0)
                    ->value('IdEmploye');

                DB::table('audit_selection_auditor')
                    ->insert([
                        'IdAuditSelection'=>$request->input('Id'),
                        'IdEmployeAuditor'=>$IdEmpAuditor,
                        'UserEntry'=>session('adminvue')->Id
                    ]);

                array_push($AuditorId,$IdEmpAuditor);
            }

            $AuditorId = json_encode($AuditorId);

            DB::table('audit_selection_detail')
                ->where('IdAuditSelection',$request->input('Id'))
                ->update([
                    'IdDepartmentAuditee'=>$request->input('IdDepartmentAuditee'),
                    'IdPositionAuditee'=>$request->input('IdPositionAuditee'),
                    'IdAuditee'=>$request->input('Auditee'),
                    'IdAuditorDepartment'=>$request->input('IdAuditorDepartment'),
                    'IdLeadAuditor'=>$request->input('LeadAuditor'),
                    'AuditorId'=>$AuditorId,
                    'IdAuditor'=>$request->input('Auditor'),
                    'IdDepartmentObserver'=>$request->input('IdDepartmentObserver'),
                    'IdObserver'=>$request->input('Observer'),
                    'Email'=>$request->input('Email')
                ]);

            if($oldItem->IdAuditPlane != $request->input('IdAuditPlane') || $oldItem->IdDepartmentAuditee != $request->input('IdDepartmentAuditee')){
                DB::table('audit_plane_detail')
                    ->where('IdAuditPlane',$oldItem->IdAuditPlane)
                    ->where('IdDepartmentAuditee',$oldItem->IdDepartmentAuditee)
                    ->update([
                        'IsSelectionDep'=>0
                    ]);

                DB::table('audit_plane')
                    ->where('Id',$oldItem->IdAuditPlane)
                    ->update([
                        'IsSelection'=>0
                    ]);

                if($oldItem->IdAuditPlane != $request->input('IdAuditPlane')){
                    $countAuditPlaneDetail = DB::table('audit_plane_detail')
                        ->where('Actived','>',0)
                        ->where('IdAuditPlane',$request->input('IdAuditPlane'))
                        ->count();

                    $countAuditPlaneSelection = DB::table('audit_plane_detail')
                        ->where('Actived','>',0)
                        ->where('IdAuditPlane',$request->input('IdAuditPlane'))
                        ->where('IsSelectionDep',1)
                        ->count();

                    $IsSelection = 0;

                    if($countAuditPlaneDetail == $countAuditPlaneSelection+1){
                        $IsSelection = 1;
                    }

                    DB::table('audit_plane')
                        ->where('Id',$request->input('IdAuditPlane'))
                        ->update([
                            'IsSelection'=>$IsSelection
                        ]);
                }
            }

            DB::table('audit_plane_detail')
                ->where('IdAuditPlane',$request->input('IdAuditPlane'))
                ->where('IdDepartmentAuditee',$request->input('IdDepartmentAuditee'))
                ->update([
                    'IsSelectionDep'=>1
                ]);

            $this->History->store(26,2,json_encode($requestData));
            DB::commit();
        }catch(\Throwable $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Save Data Failed, Server Invalid! '.$e->getMessage(),
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Save Data Success!',
        ));
    }

    public function delete(Request $request) {
        $item = DB::table('audit_selection')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_selection')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_selection_detail')
                ->where('IdAuditSelection',$request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('audit_selection_clause')
                ->where('IdAuditSelection',$request->input('Id'))
                ->update([
                    'Actived'=>0
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

            $this->History->store(32,3,json_encode($item));
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
        $item = DB::table('audit_selection')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $approval = DB::table('audit_selection_approval')
            ->where('IdAuditSelection',$request->input('Id'))
            ->where('Actived','>',0)
            ->get();

        DB::begintransaction();
        try{
            DB::table('audit_selection')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Actived'=>2
                ]);

            DB::table('notification')
                ->insert([
                    'IdEmployee'=>$approval[0]->IdEmployeApproval,
                    'Header'=>'Auditor Team',
                    'Message'=>'Silahkan Setujui Auditor Team Dengan Id Audit '.$item->NoTrans,
                    'Url'=>'/RoleAdmin/approval/data-approval-auditor-team',
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(32,5,json_encode($item));
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

    public function approval(Request $request){
        $item = DB::table('audit_selection')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_selection')
                ->where('Id',$request->input('Id'))
                ->update([
                    'Approved'=>$request->input('Approve'),
                    'StatusApproved'=>2
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
            'message'=>'Approve Data Success!',
        ));
    }

    public function exportDaftarHadir($id){
        $item = DB::table('audit_selection as ads')
            ->select('ads.Id','dpt.Department','ads.HourStart','ads.HourDone','adp.OpeningMeeting','adp.CloseMeeting','adp.AuditPeriode')
            ->join('audit_plane as adp','adp.Id','=','ads.IdAuditPlane')
            ->join('department as dpt','dpt.Id','=','ads.IdDepartmentAuditee')
            ->where('ads.Actived','>',0)
            ->where('ads.Id',$id)
            ->first();

        if(!empty($item)){
            $item->KriteriaAudit = '';
            $item->AuditPeriode = Carbon::parse($item->AuditPeriode)->format('F-Y');
            $Employee = [];
            $DetailAuditSelection = DB::table('audit_selection_detail as asd')
                ->select('asd.IdPositionAuditee','asd.IdAuditee','asd.IdAuditor','asd.IdObserver','asd.IdAuditorDepartment','asd.IdDepartmentObserver','pad.Name as LeadAuditor','asd.IdLeadAuditor')
                ->join('personnel_auditor as pad','pad.Id','=','asd.IdLeadAuditor')
                ->where('asd.IdAuditSelection',$item->Id)
                ->where('asd.Actived','>',0)
                ->first();

            $DetailAuditClause = DB::table('audit_selection_clause as asc')
                ->select('asc.IdClauseAudit','sdt.Standart as StandartAudit')
                ->join('standart_audit as sdt','sdt.Id','=','asc.IdStandartAudit')
                ->where('asc.Actived','>',0)
                ->where('asc.IdAuditSelection',$item->Id)
                ->get();

            foreach ($DetailAuditClause as $k => $value){
                if($k+1 == count($DetailAuditClause)){
                    $item->KriteriaAudit .= $value->StandartAudit;
                }else{
                    $item->KriteriaAudit .= $value->StandartAudit.',';
                }
            }

            $IdAuditorDepartment = json_decode($DetailAuditSelection->IdAuditorDepartment);
            $IdObserverDepartment = json_decode($DetailAuditSelection->IdDepartmentObserver);

            foreach (json_decode($DetailAuditSelection->IdAuditee) as $key => $value){
                $Auditee = array('Name'=>$value->Employee,'Department'=>$item->Department);

                array_push($Employee,$Auditee);
            }

            $DepLeadAuditor = DB::table('personnel_auditor')
                ->where('Id',$DetailAuditSelection->IdLeadAuditor)
                ->value('Department');



            $LeadAuditor = array('Name'=>$DetailAuditSelection->LeadAuditor,'Department'=>$DepLeadAuditor);

            array_push($Employee,$LeadAuditor);

            foreach (json_decode($DetailAuditSelection->IdAuditor) as $key => $value){
                $DepAuditor = DB::table('personnel_auditor')
                    ->where('Id',$value->Id)
                    ->value('Department');
                $Auditor = array('Name'=>$value->Employee,'Department'=>$DepAuditor);


                array_push($Employee,$Auditor);
            }

            $can_foreach = is_array($DetailAuditSelection->IdObserver) || is_object($DetailAuditSelection->IdObserver);
            if($can_foreach){
                foreach (json_decode($DetailAuditSelection->IdObserver) as $key => $value){
                    $DepObserver = DB::table('personnel_auditor')
                        ->where('Id',$value->Id)
                        ->value('Department');

                    $Observer = array('Name'=>$value->Employee,'Department'=>$DepObserver);

                    array_push($Employee,$Observer);
                }
            }else{
                $DetailAuditSelection->IdObserver=[];
            }



            $item->Employee = $Employee;
            $item->OpeningMeeting = Carbon::parse($item->OpeningMeeting)->format('l, d F Y');
            $item->CloseMeeting = Carbon::parse($item->CloseMeeting)->format('l, d F Y');
            $item->HourStart = Carbon::parse($item->HourStart)->format('H.II');
            $item->HourDone = Carbon::parse($item->HourDone)->format('H.II');

            $Title = "Data Daftar Hadir Audit";
            $Header = "Daftar Hadir Rapat Pembukaan / Penutupan Audit Internal";
            $SubHeader = "Attendance List of Internal Audit Opening / Closing Meeting";
            $noOrder = "010GH0-003.01";


            $view = view('export-pdf.header-potrait',compact('Title','Header','SubHeader','noOrder'))->render();
            $view .= view('export-pdf.pdf-hadir-audit',compact('item'))->render();
            $view .= view('export-pdf.footer')->render();

            $pdf = PDF::loadHTML($view);
            return $pdf->stream();
        }
    }

    public function closeData(Request $request){
        $item = DB::table('audit_selection')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('audit_selection')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IsReport'=>1
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
            'IdAuditPlane'=>'required'
        ];
    }
}
