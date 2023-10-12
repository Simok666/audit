<table class="table table-borderless">
    <tbody>
        <tr>
            <th width="20%" style="text-align: center; background-color:#cacaca; border: 2px solid #080808;">PERIODE AUDIT</th>
            <td width="30%" colspan="2" style="text-align: center; border: 2px solid #080808;">{{\Carbon\Carbon::parse($item->AuditPeriode)->format('m.y')}}</td>
            <th width="50%"></th>
        </tr>
        <tr>
            <th width="20%" style="text-align: center; background-color:#cacaca; border: 2px solid #080808;">JENIS AUDIT</th>
            <td width="30%" colspan="2" style="text-align: center; border: 2px solid #080808;">{{$item->Classification}}</td>
            <th width="50%"></th>
        </tr>
        <tr>
            <th width="20%" style="text-align: center; background-color:#cacaca; border: 2px solid #080808;">KRITERIA AUDIT</th>
            <td width="30%" colspan="2" style="text-align: center; border: 2px solid #080808;">{{$item->KriteriaAudit}}</td>
            <th width="50%"></th>
        </tr>
    </tbody>
</table>

<table class="table table-bordered">
    <thead>
        <tr>
            <th colspan="1" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">No.</th>
            <th colspan="4" style="text-align: center; background-color: #cacaca">Departemen</th>
            <th colspan="5" style="text-align: center; background-color: #cacaca">Jenis Temuan</th>
            <th colspan="3" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Nilai Audit</th>
            <th colspan="3" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Penerapan Audit</th>
        </tr>
        <tr>
            <th colspan="2" style="text-align: center; background-color: #cacaca">Nama</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">Code</th>
            <th style="text-align: center; background-color: #cacaca">Cr</th>
            <th style="text-align: center; background-color: #cacaca">Ma</th>
            <th style="text-align: center; background-color: #cacaca">Ml</th>
            <th style="text-align: center; background-color: #cacaca">Ob</th>
            <th style="text-align: center; background-color: #cacaca">Total</th>
        </tr>
    </thead>
    <tbody>
        @php
            $totalCr = 0;
            $totalMa = 0;
            $totalMI = 0;
            $totalOb = 0;
            $totalAll = 0;
        @endphp
        @foreach($item->DepartmentClause as $key=>$val)
            @php
                $cr = 0;
                $Ma = 0;
                $MI = 0;
                $Ob = 0;
                $total = 0;
            @endphp
            <tr>
                <td colspan="1" style="text-align: center;">{{$key+1}}</td>
                <td colspan="2" style="text-align: center;">{{$val->Department}}</td>
                <td colspan="2" style="text-align: center;">{{$val->Code}}</td>
                @foreach($val->ClauseAudit as $k=>$value)
                    @foreach(json_decode($value->IdClauseAudit) as $i=>$v)
                        @if($val->TypeNonConformity == 'Critical')
                            @php
                                $cr++;
                                $totalCr++;
                            @endphp
                        @elseif($val->TypeNonConformity == 'Major')
                            @php
                                $Ma++;
                                $totalMa++;
                            @endphp
                        @elseif($val->TypeNonConformity == 'Minor')
                            @php
                                $MI++;
                                $totalMI++;
                            @endphp
                        @else
                            @php
                                $Ob++;
                                $totalOb++;
                            @endphp
                        @endif

                        @php
                            $total++;
                            $totalAll++;
                        @endphp
                    @endforeach
                @endforeach
                <td colspan="1" style="text-align: center;">{{$cr}}</td>
                <td colspan="1" style="text-align: center;">{{$Ma}}</td>
                <td colspan="1" style="text-align: center;">{{$MI}}</td>
                <td colspan="1" style="text-align: center;">{{$Ob}}</td>
                <td colspan="1" style="text-align: center;">{{$total}}</td>
                <td colspan="3" style="text-align: center;">{{$val->AuditScore}}</td>
                <td colspan="3" style="text-align: center;">{{$val->AuditGrade}}</td>
            </tr>
        @endforeach
        <tr>
            <td colspan="5" style="text-align: right">Total:</td>
            <td colspan="1" style="text-align: center">{{$totalCr}}</td>
            <td colspan="1" style="text-align: center">{{$totalMa}}</td>
            <td colspan="1" style="text-align: center">{{$totalMI}}</td>
            <td colspan="1" style="text-align: center">{{$totalOb}}</td>
            <td colspan="1" style="text-align: center">{{$totalAll}}</td>
            <td colspan="3"></td>
            <td colspan="3"></td>
        </tr>
    </tbody>
</table>

<table class="table table-bordered">
    <thead>
        <tr>
            <th colspan="4" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Persyaratan Terkait</th>
            <th colspan="5" style="text-align: center; background-color: #cacaca">Jenis Temuan</th>
            <th colspan="{{count($item->DepartmentClause)+1}}" style="text-align: center; background-color: #cacaca">Departemen</th>
        </tr>
        <tr>
            <th style="text-align: center; background-color: #cacaca">Cr</th>
            <th style="text-align: center; background-color: #cacaca">Ma</th>
            <th style="text-align: center; background-color: #cacaca">Ml</th>
            <th style="text-align: center; background-color: #cacaca">Ob</th>
            <th style="text-align: center; background-color: #cacaca">Total</th>
            @foreach($item->DepartmentClause as $key=>$val)
                <th style="text-align: center; background-color: #cacaca">{{$val->Code}}</th>
            @endforeach
            <th style="text-align: center; background-color: #cacaca">Total</th>
        </tr>
    </thead>
    <tbody>
        @php
            $ArrStandartAudit = [];
            $ArrCr = [];
            $ArrMa = [];
            $ArrMl = [];
            $ArrOb = [];
            $ArrTotal = [];
            $ArrTotalDep = [];
            $totalDepartment = count($item->DepartmentClause);
            $totalCr = 0;
            $totalMa = 0;
            $totalMI = 0;
            $totalOb = 0;
            $totalAll = 0;
            $totalAllDep = 0;
        @endphp
        @foreach($item->DepartmentClause as $key=>$val)
            @foreach($val->ClauseAudit as $k=>$value)
                @foreach(json_decode($value->IdClauseAudit) as $i=>$v)
                    @php
                        $StandartClause = $value->Standart.',Ch. '.$v->Clause;
                    @endphp
                    @if(in_array($StandartClause,$ArrStandartAudit))
                        @php
                            $i = array_search($StandartClause,$ArrStandartAudit);
                            if($val->TypeNonConformity == 'Critical'){
                                $ArrCr[$i] = $ArrCr[$i]+1;
                                $ArrTotal[$i] = $ArrTotal[$i]+1;
                                $ArrTotalDep[$i] = $ArrTotalDep[$i]+1;
                                $totalCr++;
                                $totalAll++;
                                $totalAllDep++;
                                if(count($val->ClauseTemuan)>0)$val->ClauseTemuan[$i]++;
                                if($val->TotalClauseTemuan>0)$val->TotalClauseTemuan++;
                            }elseif($val->TypeNonConformity == 'Major'){
                                $ArrMa[$i] = $ArrMa[$i]+1;
                                $ArrTotal[$i] = $ArrTotal[$i]+1;
                                $ArrTotalDep[$i] = $ArrTotalDep[$i]+1;
                                $totalMa++;
                                $totalAll++;
                                $totalAllDep++;
                                (!empty($val->ClauseTemuan)) ? $val->ClauseTemuan[$i]++ : $val->ClauseTemuan;
                                $val->TotalClauseTemuan++;
                            }elseif($val->TypeNonConformity == 'Minor'){
                                $ArrMl[$i] = $ArrMl[$i]+1;
                                $ArrTotal[$i] = $ArrTotal[$i]+1;
                                $ArrTotalDep[$i] = $ArrTotalDep[$i]+1;
                                $totalMI++;
                                $totalAll++;
                                $totalAllDep++;
                                $val->ClauseTemuan[$i]++;
                                $val->TotalClauseTemuan++;
                            }else{
                                $ArrOb[$i] = $ArrOb[$i]+1;
                                $ArrTotal[$i] = $ArrTotal[$i]+1;
                                $ArrTotalDep[$i] = $ArrTotalDep[$i]+1;
                                $totalOb++;
                                $totalAll++;
                                $totalAllDep++;
                                $val->ClauseTemuan[$i]++;
                                $val->TotalClauseTemuan++;
                            }
                        @endphp
                    @else
                        @php
                            array_push($ArrStandartAudit,$StandartClause);
                            if($val->TypeNonConformity == 'Critical'){
                                array_push($ArrCr,1);
                                array_push($ArrMa,0);
                                array_push($ArrMl,0);
                                array_push($ArrOb,0);
                                array_push($ArrTotal,1);
                                array_push($ArrTotalDep,1);
                                array_push($val->ClauseTemuan,1);
                                $totalCr++;
                                $totalAll++;
                                $totalAllDep++;
                                $val->TotalClauseTemuan++;
                            }elseif($val->TypeNonConformity == 'Major'){
                                array_push($ArrCr,0);
                                array_push($ArrMa,1);
                                array_push($ArrMl,0);
                                array_push($ArrOb,0);
                                array_push($ArrTotal,1);
                                array_push($ArrTotalDep,1);
                                array_push($val->ClauseTemuan,1);
                                $totalMa++;
                                $totalAll++;
                                $totalAllDep++;
                                $val->TotalClauseTemuan++;
                            }elseif($val->TypeNonConformity == 'Minor'){
                                array_push($ArrCr,0);
                                array_push($ArrMa,0);
                                array_push($ArrMl,1);
                                array_push($ArrOb,0);
                                array_push($ArrTotal,1);
                                array_push($ArrTotalDep,1);
                                array_push($val->ClauseTemuan,1);
                                $totalMI++;
                                $totalAll++;
                                $totalAllDep++;
                                $val->TotalClauseTemuan++;
                            }else{
                                array_push($ArrCr,0);
                                array_push($ArrMa,0);
                                array_push($ArrMl,0);
                                array_push($ArrOb,1);
                                array_push($ArrTotal,1);
                                array_push($ArrTotalDep,1);
                                array_push($val->ClauseTemuan,1);
                                $totalOb++;
                                $totalAll++;
                                $totalAllDep++;
                                $val->TotalClauseTemuan++;
                            }
                        @endphp
                    @endif
                @endforeach
            @endforeach
        @endforeach
        @for ($i = 0; $i < count($ArrStandartAudit); $i++)
            <tr>
                <td colspan="4">{{$ArrStandartAudit[$i]}}</td>
                <td style="text-align: center">{{$ArrCr[$i]}}</td>
                <td style="text-align: center">{{$ArrMa[$i]}}</td>
                <td style="text-align: center">{{$ArrMl[$i]}}</td>
                <td style="text-align: center">{{$ArrOb[$i]}}</td>
                <td style="text-align: center">{{$ArrTotal[$i]}}</td>
                @foreach ($item->DepartmentClause as $key=>$val)
                    <td style="text-align: center">@if(count($val->ClauseTemuan) > 0){{$val->ClauseTemuan[$i]}}@endif</td>
                @endforeach
                <td style="text-align: center">{{$ArrTotalDep[$i]}}</td>
            </tr>
        @endfor
        <tr>
            <td colspan="4">Total:</td>
            <td style="text-align: center">{{$totalCr}}</td>
            <td style="text-align: center">{{$totalMa}}</td>
            <td style="text-align: center">{{$totalMI}}</td>
            <td style="text-align: center">{{$totalOb}}</td>
            <td style="text-align: center">{{$totalAll}}</td>
            @foreach ($item->DepartmentClause as $key=>$val)
                <td style="text-align: center">{{$val->TotalClauseTemuan}}</td>
            @endforeach
            <td style="text-align: center">{{$totalAllDep}}</td>
        </tr>
    </tbody>
</table>
<table class="table table-borderless">
    <tbody>
        <tr>
            <th width="100%">KESIMPULAN</th>
        </tr>
        <tr>
            <td width="100%" style="border: 2px solid #080808;"><br><br><br></td>
        </tr>
    </tbody>
</table>

<table class="table table-borderless">
    <tbody>
        <tr>
            <th>Pandaan, {{\Carbon\Carbon::now()->format('d F Y')}}</th>
        </tr>
        <tr>
            <td style="width: 30%">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td width="50%">Dibuat Oleh,</td>
                        </tr>
                        <tr>
                            <td colspan="4"><br><br><br></td>
                        </tr>
                        <tr>
                            <td colspan="4"><hr></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-center">QMS Unit Head</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style="width: 35%">

            </td>
            <td style="width: 35%">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td width="50%">Disetujui Oleh,</td>
                        </tr>
                        <tr>
                            <td colspan="4"><br><br><br></td>
                        </tr>
                        <tr>
                            <td colspan="4"><hr></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-center">Manajemen Representatif</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
