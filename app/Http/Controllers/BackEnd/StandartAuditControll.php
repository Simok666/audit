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
use App\Http\Controllers\Utils\AppWebControll;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Collection;

class StandartAuditControll extends Controller
{
    protected $History;
    protected $UploadFile;
    protected $AppWeb;

    public function __construct() {
        $this->History = new HistoryControll();
        $this->AppWeb = new AppWebControll();
        $this->UploadFile = new UploadFileControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query =DB::table('standart_audit as sdt')
            ->select(
                'sdt.Id',
                'sdt.Code as id',
                'aog.Name as Organizer',
                'sdt.Standart',
                'sdt.Description',
                'sdt.Path',
                'sdt.Status',
                'sdt.CreateAt',
                'sdt.UpdateAt'
            )
            ->join('organizer_audit as aog','aog.Id','=','sdt.IdOrganizer')
            ->orderBy($field, $dir)
            ->where('aog.Actived','>',0)
            ->where('sdt.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function show(Request $request){
        $item = DB::table('standart_audit as sdt')
            ->select('sdt.Id','sdt.Standart','sdt.Description','aog.Name as Organizer','sdt.CreateAt','sdt.UpdateAt','usr.UserName as UserEntry')
            ->join('organizer_audit as aog','aog.Id','=','sdt.IdOrganizer')
            ->join('users as usr','usr.Id','=','sdt.UserEntry')
            ->where('sdt.Actived',1)
            ->where('sdt.Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->CreateAt = Carbon::parse($item->CreateAt)->format('d/m/Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('d/m/Y H:i:s');
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function showClause(Request $request){
        $item = DB::table('clause_audit as cdt')
            ->select('cdt.Id','sdt.Standart','cdt.Requirements','cdt.Clause','cdt.RequirementsDetail','cdt.CreateAt','cdt.UpdateAt','usr.UserName as UserEntry')
            ->join('standart_audit as sdt','sdt.Id','=','cdt.IdStandart')
            ->join('users as usr','usr.Id','=','sdt.UserEntry')
            ->where('cdt.Actived',1)
            ->where('cdt.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->CreateAt = Carbon::parse($item->CreateAt)->format('d/m/Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('d/m/Y H:i:s');
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getClauseEdit(Request $request){
        $item = DB::table('clause_audit')
            ->select('Id','Clause','Requirements','RequirementsDetail')
            ->where('IdStandart',$request->input('Id'))
            ->where('Actived','>',0)
            ->orderByRaw('Clause * 1 asc')
            ->get();

        $parent = DB::table('clause_audit')
            ->select(
                'Id',
                DB::raw('CONCAT(Clause," ",Requirements)as Requirements')
            )
            ->where('Actived','>',0)
            ->where('IdStandart',$request->input('Id'))
            ->orderByRaw('Clause * 1 asc')
            ->get();


        return json_encode(array(
            'data'=>$item,
            'parent'=>$parent
        ));
    }

    public function detail($id){
        $item = DB::table('clause_audit')
            ->select('Id','Clause','Requirements','RequirementsDetail')
            ->where('IdStandart',$id)
            ->where('Actived','>',0)
            ->orderByRaw('Clause * 1 asc')
            ->get();

        return json_encode(array(
            'data'=>$item
        ));
    }

    public function getSelect(){
        $organizer = DB::table('organizer_audit')
            ->select('Id','Name')
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'organizer'=>$organizer
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

        $FileRefrensi = [];
        if($request->has('FileRefrensi')){
            $arrFile = $request->file('FileRefrensi');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $FileRefrensi[$key] = $this->UploadFile->uploadFile($val,5); //5 path standart-audit
                }
            }
        }

        if(count($FileRefrensi) > 0){
            $FileRefrensi = json_encode($FileRefrensi);
        }else{
            $FileRefrensi = '';
        }

        DB::begintransaction();
        try{
            DB::table('standart_audit')
                ->insert([
                    'Code' => Uuid::uuid1()->toString(),
                    'IdOrganizer'=>$request->input('IdOrganizer'),
                    'Standart'=>$request->input('Standart'),
                    'Description'=>$request->input('Description'),
                    'Path'=>$FileRefrensi,
                    'Status'=>$request->input('Status'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(19,1,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
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

    public function storeClauseAudit(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validationClause());

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('clause_audit')
                ->insert([
                    'Code' => Uuid::uuid1()->toString(),
                    'IdStandart'=>$request->input('IdStandartAudit'),
                    'Parent'=>$request->input('Parent'),
                    'Clause'=>$request->input('Clause'),
                    'Requirements'=>$request->input('Requirements'),
                    'RequirementsDetail'=>$request->input('RequirementsDetail'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(19,1,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
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
        $item = DB::table('standart_audit as sdt')
            ->select('sdt.Id','sdt.IdOrganizer','aog.Name as Organizer','sdt.Standart','sdt.Status','sdt.Description','sdt.Path')
            ->join('organizer_audit as aog','aog.Id','=','sdt.IdOrganizer')
            ->where('sdt.Actived',1)
            ->where('sdt.Code',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->Organizer = ['Id'=>$item->IdOrganizer,'Name'=>$item->Organizer];
            $nameStatus = 'Aktif';
            if($item->Status == 0){
                $nameStatus = 'Tidak Aktif';
            }
            $item->Status = ['value'=>$item->Status,'text'=>$nameStatus];
            $item->Path = json_decode($item->Path);
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

        $FileRefrensi = [];
        if($request->has('FileRefrensi')){
            $arrFile = $request->file('FileRefrensi');
            foreach($arrFile as $key=>$val){
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $FileRefrensi[$key] = $this->UploadFile->uploadFile($val,5); //5 path standart-audit
                }
            }
        }

        $oldFileRefrensi = json_decode($request->input('OldFileRefrensi'));
        foreach($oldFileRefrensi as $key=>$val){
            array_push($FileRefrensi,$val);
        }

        if(count($FileRefrensi) > 0){
            $FileRefrensi = json_encode($FileRefrensi);
        }else{
            $FileRefrensi = '';
        }

        DB::begintransaction();
        try{
            DB::table('standart_audit')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IdOrganizer'=>$request->input('IdOrganizer'),
                    'Standart'=>$request->input('Standart'),
                    'Description'=>$request->input('Description'),
                    'Path'=>$FileRefrensi,
                    'Status'=>$request->input('Status')
                ]);

            $this->History->store(19,2,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
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

    public function editClauseAudit(Request $request){
        $item = DB::table('clause_audit as cad')
            ->select(
                'cad.Id',
                'cad.IdStandart as IdStandartAudit',
                'sdt.Standart as StandartAudit',
                'cad.Clause',
                'cad.Parent',
                'cad.Requirements',
                'cad.RequirementsDetail'
            )
            ->join('standart_audit as sdt','sdt.Id','=','cad.IdStandart')
            ->where('cad.Actived',1)
            ->where('cad.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            // $item->Clause = str_replace('.',',',$item->Clause);
            if($item->Parent == 0){
                $item->Parent = [];
            }else{
                $req = DB::table('clause_audit')
                    ->where('Id',$item->Parent)
                    ->where('Actived','>',0)
                    ->value('Requirements');
                $item->Parent = ['Id'=>$item->Parent,'Requirements'=>$req];
            }
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function updateClauseAudit(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validationClause());

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('clause_audit')
                ->where('Id',$request->input('Id'))
                ->update([
                    'IdStandart'=>$request->input('IdStandartAudit'),
                    // 'Parent'=>$request->input('Parent'),
                    'Clause'=>$request->input('Clause'),
                    'Requirements'=>$request->input('Requirements'),
                    'RequirementsDetail'=>$request->input('RequirementsDetail')
                ]);

            $this->History->store(19,2,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
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
        $item = DB::table('standart_audit')
            ->select('*')
            ->where('Code', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('standart_audit')
                ->where('Code', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(19,3,json_encode($item));
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

    public function deleteClauseAudit(Request $request){
        $item = DB::table('clause_audit')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('clause_audit')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(19,3,json_encode($item));
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

    public function import(Request $request){
        $requestData = $request->all();
        if($request->has('File')){
            $fileimport = $request->file('File');
            $dataImport = Excel::toArray(new ImportDataControll, $fileimport);

            DB::begintransaction();
            try {
                foreach($dataImport[0] as $val){
                    $clauseAudit = $val['clause_audit'];
                    $persyaratanAudit = $val['persyaratan_audit'];
                    $detailPersyaratan = $val['detail_persyaratan'];

                    if($clauseAudit != null){
                        $clauseAudit = str_replace(',','.',$clauseAudit);
                        $clauseAudit = trim($clauseAudit);
                        $persyaratanAudit = trim($persyaratanAudit);
                        $detailPersyaratan = trim($detailPersyaratan);

                        $isData = DB::table('clause_audit')
                            ->select('Id')
                            ->where('IdStandart',$request->input('IdStandart'))
                            ->where('Clause',$clauseAudit)
                            ->where('Actived','>',0)
                            ->first();

                        if(!empty($isData)){
                            DB::table('clause_audit')
                                ->where('Id',$isData->Id)
                                ->update([
                                    'Requirements'=>$persyaratanAudit,
                                    'RequirementsDetail'=>$detailPersyaratan
                                ]);
                        }else{
                            DB::table('clause_audit')
                                ->insert([
                                    'Code' => Uuid::uuid1()->toString(),
                                    'IdStandart'=>$request->input('Id'),
                                    'Clause'=>$clauseAudit,
                                    'Requirements'=>$persyaratanAudit,
                                    'RequirementsDetail'=>$detailPersyaratan,
                                    'UserEntry'=>session('adminvue')->Id
                                ]);
                        }
                    }
                }

                $this->History->store(19,1,json_encode($requestData));
                DB::commit();
            }catch(Exception $e){
                DB::rollback();
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Invalid Server Side, Import Data Failed!',
                ));
            }
            return json_encode(array(
                'status'=>true,
                'message'=>'Import Data Success!',
            ));
        }else{
            return json_encode(array(
                'status'=>false,
                'message'=>'Invalid Server Side, Import Data Failed!',
            ));
        }
    }

    public function validation(){
        return[
            'IdOrganizer'=>'required',
            'Standart'=>'required'
        ];
    }

    public function validationClause(){
        return[
            'IdStandartAudit'=>'required',
            'Clause'=>'required',
            'Requirements'=>'required'
        ];
    }

}

class ImportDataControll implements ToCollection, WithHeadingRow, WithCalculatedFormulas
{
    use Importable;

    public function collection(Collection $rows)
    {
        return $rows;
    }
}
