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
use stdClass;

class DashboardControll extends Controller
{
    protected $History;
    protected $UploadFile;

    public function __construct() {
        $this->History = new HistoryControll();
        $this->UploadFile = new UploadFileControll();
    }

    public function getSelect(){
        $departement = DB::table('department')
            ->select('Id','Department')
            ->where('Actived','>',0)
            ->get()
            ->toArray();

        $newObject = new stdClass();
        $newObject->Id = 0;
        $newObject->Department = 'All Departement';
        $newArr = array($newObject);
        array_splice($departement,0,0,$newArr);

        $Standart = DB::table('standart_audit')
            ->select('Id','Standart')
            ->where('Actived','>',0)
            ->where('Status',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'Departement'=>$departement,
            'Standart'=>$Standart
        ));
    }

    public function getAuditTemuan(Request $request){
        $dataColumn = [];
        $dataLabel = [];
        $AuditTemuan = DB::table('audit_report as arp')
            ->select('arp.Id','dpt.Department',DB::raw('count(arc.Id) as TotalData'),DB::raw('YEAR(AuditorDate) as YearAudit'))
            ->join('audit_report_criteria as arc','arc.IdAuditReport','=','arp.Id')
            ->join('department as dpt','dpt.Id','=','arp.IdDepartmentAuditee')
            ->where('arp.Actived',2)
            ->where('arp.StatusApproved',2)
            ->where('arc.IdStandartAudit',$request->input('StandartAudit'))
            ->where('arc.Actived','>',0)
            ->groupby('arp.IdDepartmentAuditee',DB::raw('YEAR(AuditorDate)'))
            ->get()
            ->toArray();

        foreach(json_decode($request->input('Year')) as $key => $value){
            $year = $value->value;
            $newArr = array_filter($AuditTemuan,function($var) use($year){
                return ($var->YearAudit == $year);
            });
            array_push($dataLabel,$year);
            if(count($newArr) > 0){
                foreach($newArr as $k => $val){
                    if(count($dataColumn) == 0){
                        array_push($dataColumn,array('label'=>$val->Department,'data'=>[$val->TotalData],'borderWidth'=>1,'backgroundColor'=>$this->rand_color(),'borderColor'=>$this->rand_color()));
                    }else{
                        $keyArr = array_search($val->Department, array_column($dataColumn, 'label'));
                        if($keyArr === false){
                            array_push($dataColumn,array('label'=>$val->Department,'data'=>[$val->TotalData],'borderWidth'=>1,'backgroundColor'=>$this->rand_color(),'borderColor'=>$this->rand_color()));
                        }else{
                            array_push($dataColumn[$keyArr]['data'],$val->TotalData);
                        }
                    }
                }
                foreach ($dataColumn as $k => $val){
                    $exsist = array_key_exists($key,$dataColumn[$k]['data']);
                    if($exsist === false){
                        array_push($dataColumn[$k]['data'],0);
                    }
                }
            }else{
                if(count($dataColumn) > 0){
                    foreach ($dataColumn as $k => $val){
                        $exsist = array_key_exists($key,$dataColumn[$k]['data']);
                        if($exsist === false){
                            array_push($dataColumn[$k]['data'],0);
                        }
                    }
                }
            }
        }

        return json_encode(array(
            'status'=>true,
            'dataColumn'=>$dataColumn,
            'dataLabel'=>$dataLabel
        ));
    }

    public function getAuditClause(Request $request){
        $dataLabel = [];
        $dataColumn = [];

        if($request->input('DepartmentClause') == 0){
            $AuditClause = DB::table('audit_report as arp')
                ->select('arp.Id','sdt.Standart','cad.Clause',DB::raw('count(arc.Id) as TotalData'))
                ->join('audit_report_criteria as arc','arc.IdAuditReport','=','arp.Id')
                ->join('standart_audit as sdt','sdt.Id','=','arc.IdStandartAudit')
                ->join('clause_audit as cad','cad.Id','=','arc.IdClauseAudit')
                ->where('arp.Actived',2)
                ->where('arp.StatusApproved',2)
                ->where('arc.IdStandartAudit',$request->input('StandartAudit'))
                ->where('arc.Actived','>',0)
                ->whereYear('AuditorDate',$request->input('Year'))
                ->orderByRaw('cad.Clause * 1 asc')
                ->groupby('arc.IdClauseAudit')
                ->get();
        }else{
            $AuditClause = DB::table('audit_report as arp')
                ->select('arp.Id','sdt.Standart','cad.Clause',DB::raw('count(arc.Id) as TotalData'))
                ->join('audit_report_criteria as arc','arc.IdAuditReport','=','arp.Id')
                ->join('standart_audit as sdt','sdt.Id','=','arc.IdStandartAudit')
                ->join('clause_audit as cad','cad.Id','=','arc.IdClauseAudit')
                ->where('arp.Actived',2)
                ->where('arp.StatusApproved',2)
                ->where('arc.IdStandartAudit',$request->input('StandartAudit'))
                ->where('arc.Actived','>',0)
                ->where('arp.IdDepartmentAuditee',$request->input('DepartmentClause'))
                ->whereYear('AuditorDate',$request->input('Year'))
                ->orderByRaw('cad.Clause * 1 asc')
                ->groupby('arc.IdClauseAudit')
                ->get();
        }

        if(count($AuditClause) > 0){
            foreach ($AuditClause as $key=>$val){
                array_push($dataLabel,$val->Clause);
                if(count($dataColumn) == 0){
                    array_push($dataColumn,array('label'=>$val->Standart,'data'=>[$val->TotalData],'borderWidth'=>1,'backgroundColor'=>'#f87979'));
                }else{
                    array_push($dataColumn[0]['data'],$val->TotalData);
                }
            }
        }else{
            array_push($dataLabel,0);
            array_push($dataColumn,array('label'=>$request->input('StandartAuditName'),'data'=>[0],'borderWidth'=>1,'backgroundColor'=>'#f87979'));
        }

        return json_encode(array(
            'status'=>true,
            'dataColumn'=>$dataColumn,
            'dataLabel'=>$dataLabel
        ));
    }

    public function getAuditClauseTable(Request $request){
        $totalClause = [];
        $headerOne = [];
        $headerTwo = [];
        $dataTable = [];

        $AuditClause = DB::table('audit_report as arp')
                ->select('arp.Id','dpt.Department','sdt.Standart','cad.Clause',DB::raw('COUNT(arc.Id) as TotalData'))
                ->join('audit_report_criteria as arc','arc.IdAuditReport','=','arp.Id')
                ->join('standart_audit as sdt','sdt.Id','=','arc.IdStandartAudit')
                ->join('clause_audit as cad','cad.Id','=','arc.IdClauseAudit')
                ->join('department as dpt','dpt.Id','=','arp.IdDepartmentAuditee')
                ->where('arp.Actived',2)
                ->where('arp.StatusApproved',2)
                ->where('arc.Actived','>',0)
                ->whereYear('AuditorDate',$request->input('Year'))
                ->orderby('sdt.Id','asc')
                ->orderByRaw('cad.Clause * 1 asc')
                ->orderby('arp.IdDepartmentAuditee','asc')
                ->groupby('arp.IdDepartmentAuditee','arc.IdClauseAudit')
                ->get()
                ->toArray();

        if(count($AuditClause) > 0){
            foreach($AuditClause as $key => $value){
                $existHead = array_search($value->Standart,$headerOne);
                if($existHead === false){
                    array_push($headerOne,$value->Standart);
                }

                $existHeadTwo =array_keys($headerTwo,['Standart'=>$value->Standart,'Clause'=>$value->Clause]);
                if(count($existHeadTwo) == 0){
                    array_push($headerTwo,array('Standart'=>$value->Standart,'Clause'=>$value->Clause));
                }

                $keyArr = array_search($value->Department, array_column($dataTable, 'Department'));
                if($keyArr === false){
                    array_push($dataTable,array('Department'=>$value->Department,'TotalData'=>[array('Standart'=>$value->Standart,'Clause'=>$value->Clause,'TotalData'=>$value->TotalData)]));
                }else{
                    array_push($dataTable[$keyArr]['TotalData'],array('Standart'=>$value->Standart,'Clause'=>$value->Clause,'TotalData'=>$value->TotalData));
                }
            }

            foreach ($headerTwo as $key=>$val){
                foreach ($dataTable as $k=>$value){
                    $existArr = array_filter($value['TotalData'],function($var) use($val){
                        return ($var['Standart'] == $val['Standart'] && $var['Clause'] == $val['Clause']);
                    });
                    if(count($existArr) == 0){
                        $newArr = array_merge(array_slice($value['TotalData'], 0, $key), [array('Standart'=>$val['Standart'],'Clause'=>$val['Clause'],'TotalData'=>0)], array_slice($value['TotalData'], $key));
                        $dataTable[$k]['TotalData'] = $newArr;
                    }
                }

                $newArrClause = array_filter($AuditClause,function($var) use($val){
                    return ($var->Standart == $val['Standart'] && $var->Clause == $val['Clause']);
                });

                array_push($totalClause,array_sum(array_column($newArrClause,'TotalData')));
            }

            $headerOneString = '<th rowspan="2" style="text-align:center">No</th><th rowspan="2" style="text-align:center">Departemen</th>';

            foreach ($headerOne as $key => $value){
                $newArrHead = array_filter($headerTwo,function($var) use($value){
                    return ($var['Standart'] == $value);
                });

                $headerOneString .= '<th colspan="'.count($newArrHead).'" style="text-align:center;">'.$value.'</th>';
            }

            return json_encode(array(
                'status'=>true,
                'HeaderOne'=>$headerOneString,
                'HeaderTwo'=>$headerTwo,
                'DataTable'=>$dataTable,
                'TotalClause'=>$totalClause
            ));
        }else{
            return json_encode(array(
                'status'=>false
            )); 
        }
    }

    public function getOutstandingAudit(Request $request){
        $totalOutstanding = [];
        $totalTindakLanjut = [];
        $standartKriteria = [];
        $standartTindakLanjut = [];
        $totalKriteria = [];
        $standartAudit = [];
        $headerTwo = [];
        $dataTable = [];

        $AuditClause = DB::table('audit_report as arp')
                ->select('arp.Id','dpt.Department','arp.IdDepartmentAuditee','sdt.Standart',DB::raw('COUNT(arc.Id) as TotalData'),'arp.IsCapaPlan')
                ->join('audit_report_criteria as arc','arc.IdAuditReport','=','arp.Id')
                ->join('standart_audit as sdt','sdt.Id','=','arc.IdStandartAudit')
                ->join('department as dpt','dpt.Id','=','arp.IdDepartmentAuditee')
                ->where('arp.Actived',2)
                ->where('arp.StatusApproved',2)
                ->where('arc.Actived','>',0)
                ->whereYear('AuditorDate',$request->input('Year'))
                ->orderby('sdt.Id','asc')
                ->orderby('arp.IdDepartmentAuditee','asc')
                ->groupby('arp.IdDepartmentAuditee','arc.IdStandartAudit')
                ->get()
                ->toArray();

        if(count($AuditClause) > 0){
            foreach($AuditClause as $key => $value){
                $existHead = array_search($value->Standart,$standartAudit);
                if($existHead === false){
                    array_push($standartAudit,$value->Standart);
                }

                $keyArr = array_search($value->Department, array_column($dataTable, 'Department'));
                if($keyArr === false){
                    $Status = 'Open';
                    if($value->IsCapaPlan == 1){
                        $Status = 'Close';
                    }
                    array_push($dataTable,array('IdDepartment'=>$value->IdDepartmentAuditee,'Department'=>$value->Department,'TotalData'=>[array('Standart'=>$value->Standart,'TotalData'=>$value->TotalData)],'TotalAllData'=>$value->TotalData,'TotalDataTindakLanjut'=>[],'IsStatus'=>$Status,'RestFound'=>0,'PercentageFound'=>0));
                }else{
                    array_push($dataTable[$keyArr]['TotalData'],array('Standart'=>$value->Standart,'TotalData'=>$value->TotalData));
                    $dataTable[$keyArr]['TotalAllData'] += $value->TotalData;
                }
            }
            
            $dataTotalAll = 0;
            $dataTotalRest = 0;
            foreach ($dataTable as $key => $value){
                $TindakLanjutAudit = DB::table('audit_capa_verification as vcp')
                    ->select('dpt.Department','sdt.Standart',DB::raw('COUNT(arc.Id) as TotalData'))
                    ->join('audit_report_criteria as arc','arc.IdAuditReport','=','vcp.IdAuditReport')
                    ->join('standart_audit as sdt','sdt.Id','=','arc.IdStandartAudit')
                    ->join('department as dpt','dpt.Id','=','vcp.IdDepartmentAuditee')
                    ->where('vcp.Actived',2)
                    ->where('vcp.StatusApproved',2)
                    ->where('arc.Actived','>',0)
                    ->whereYear('vcp.AuditorDate',$request->input('Year'))
                    ->where('vcp.IdDepartmentAuditee',$value['IdDepartment'])
                    ->orderby('sdt.Id','asc')
                    ->orderby('vcp.IdDepartmentAuditee','asc')
                    ->groupby('vcp.IdDepartmentAuditee','arc.IdStandartAudit')
                    ->get()
                    ->toArray();

                $dataTotalTindakLanjut = 0;
                if(count($TindakLanjutAudit) > 0){
                    foreach($TindakLanjutAudit as $k => $val){
                        array_push($dataTable[$key]['TotalDataTindakLanjut'],array('Standart'=>$val->Standart,'TotalData'=>$val->TotalData));
                        array_push($standartTindakLanjut,array('Standart'=>$val->Standart,'TotalData'=>$val->TotalData));
                        $dataTotalTindakLanjut += $val->TotalData;
                    }
                }

                foreach ($value['TotalData'] as $k => $val){
                    array_push($standartKriteria,array('Standart'=>$val['Standart'],'TotalData'=>$val['TotalData']));
                }

                $dataTable[$key]['RestFound'] = $value['TotalAllData'] - $dataTotalTindakLanjut;
                $dataTotalRest += $dataTable[$key]['RestFound'];
                $dataTable[$key]['PercentageFound'] = round((floatval($dataTotalTindakLanjut)/floatval($value['TotalAllData'])) * 100,2);
                

                $dataTotalAll += $value['TotalAllData'];
            }
            

            foreach($standartAudit as $key => $val){
                foreach ($dataTable as $k => $value){
                    $existArr = array_filter($value['TotalData'],function($var) use($val){
                        return ($var['Standart'] == $val);
                    });
                    if(count($existArr) == 0){
                        $newArr = array_merge(array_slice($value['TotalData'], 0, $key), [array('Standart'=>$val,'TotalData'=>0)], array_slice($value['TotalData'], $key));
                        $dataTable[$k]['TotalData'] = $newArr;
                    }

                    $existArrTindak = array_filter($value['TotalDataTindakLanjut'],function($var) use($val){
                        return ($var['Standart'] == $val);
                    });
                    if(count($existArrTindak) == 0){
                        $newArr = array_merge(array_slice($value['TotalDataTindakLanjut'], 0, $key), [array('Standart'=>$val,'TotalData'=>0)], array_slice($value['TotalDataTindakLanjut'], $key));
                        $dataTable[$k]['TotalDataTindakLanjut'] = $newArr;
                    }
                }

                $newArrKriteria = array_filter($standartKriteria,function($var) use($val){
                    return ($var['Standart'] == $val);
                });

                $newArrTindakLanjut = array_filter($standartTindakLanjut,function($var) use($val){
                    return ($var['Standart'] == $val);
                });

                if(count($newArrKriteria) > 0){
                    array_push($totalKriteria,array_sum(array_column($newArrKriteria,'TotalData')));
                }else{
                    array_push($totalTindakLanjut,0);
                }

                if(count($newArrTindakLanjut) > 0){
                    array_push($totalTindakLanjut,array_sum(array_column($newArrTindakLanjut,'TotalData')));
                }else{
                    array_push($totalTindakLanjut,0);
                }
            }

            $headerOneString = '<th rowspan="2">No.</th><th rowspan="2">Departement</th><th colspan="'.count($standartAudit).'" style="text-align:center;">Kriteria Temuan</th><th rowspan="2">&#931;</th><th colspan="'.count($standartAudit).'" style="text-align:center;">Tindak Lanjut</th><th rowspan="2">Closed</th><th rowspan="2">Sisa Temuan Open</th><th rowspan="2" style="text-align:center;">%</th>';
            $headerTwo = array_merge($headerTwo,$standartAudit);
            $headerTwo = array_merge($headerTwo,$standartAudit);
            $totalOutstanding = array_merge($totalOutstanding,$totalKriteria);
            array_push($totalOutstanding,$dataTotalAll);
            $totalOutstanding = array_merge($totalOutstanding,$totalTindakLanjut);
            array_push($totalOutstanding,'');
            array_push($totalOutstanding,$dataTotalRest);

            return json_encode(array(
                'status'=>true,
                'HeaderOne'=>$headerOneString,
                'HeaderTwo'=>$headerTwo,
                'DataTable'=>$dataTable,
                'TotalOutstanding'=>$totalOutstanding
            ));
        }else{
            return json_encode(array(
                'status'=>false
            )); 
        }

        dd($dataTable);
    }

    function rand_color() {
        return '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
    }
}
