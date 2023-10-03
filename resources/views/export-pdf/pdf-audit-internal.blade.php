<table class="table table-borderless">
    <tbody>
        <tr>
            <td style="width: 50%">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">KRITERIA AUDIT</th>
                            <td colspan="2" style="text-align: center">{{$item->KriteriaAudit}}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>

            </td>
            <td style="width: 30%">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">PERIODE AUDIT</th>
                            <td colspan="2" style="text-align: center">{{$item->AuditPeriode}}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<table class="table table-bordered">
    <thead>
        <tr>
            <th colspan="1" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">No.</th>
            <th colspan="2" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Auditee</th>
            <th colspan="3" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Klausa Terkait</th>
            <th colspan="24" style="text-align: center; background-color: #cacaca">Bulan</th>
            <th colspan="3" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Tingkat Penerapan Kriteria Audit Sebelumnya</th>
        </tr>
        <tr>
            <th colspan="2" style="text-align: center; background-color: #cacaca">JAN</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">FEB</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">MAR</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">APR</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">MEI</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">JUN</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">JUL</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">AUG</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">SEP</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">OCT</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">NOV</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">DES</th>
        </tr>
    </thead>
    <tbody>
        @foreach($item->AuditSelection as $key=>$val)
            <tr>
                <td colspan="1" style="text-align: center;" rowspan="2">{{$key+1}}</td>
                <td colspan="2" style="text-align: center;" rowspan="2">{{$val->Department}}</td>
                <td colspan="3" style="text-align: center;" rowspan="2">
                    @foreach($val->DetailAuditClause as $k=>$value)
                        <u>{{$value->StandartAudit}}</u>: Klausa  
                        @foreach(json_decode($value->IdClauseAudit) as $i=>$v)
                            @if($i+1 == count(json_decode($value->IdClauseAudit)))
                                {{$v->Clause}}
                            @else
                                {{$v->Clause}},
                            @endif
                        @endforeach
                        <br>
                    @endforeach
                </td>
                @if($item->MonthExcecution == 1)
                    @if($item->MonthExcecutionDone == 1)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 1)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 2)
                    @if($item->MonthExcecutionDone == 2)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 2)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 3)
                    @if($item->MonthExcecutionDone == 3)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 3)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 4)
                    @if($item->MonthExcecutionDone == 4)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 4)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 5)
                    @if($item->MonthExcecutionDone == 5)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 5)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 6)
                    @if($item->MonthExcecutionDone == 6)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 6)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 7)
                    @if($item->MonthExcecutionDone == 7)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 7)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 8)
                    @if($item->MonthExcecutionDone == 8)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 8)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 9)
                    @if($item->MonthExcecutionDone == 9)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 9)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 10)
                    @if($item->MonthExcecutionDone == 10)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 10)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 11)
                    @if($item->MonthExcecutionDone == 11)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 11)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 12)
                    @if($item->MonthExcecutionDone == 12)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 12)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($val->AuditGrade != '')
                    @switch($val->AuditGrade)
                        @case('Kurang Sekali')
                            <td colspan="3" style="vertical-align: middle; text-align: center; background-color:#fd2525;" rowspan="2"><h4>Kurang Sekali</h4></td>        
                        @break
                        @case('Kurang')
                            <td colspan="3" style="vertical-align: middle; text-align: center; background-color:#fc7a7a;" rowspan="2"><h4>Kurang</h4></td>
                        @break
                        @case('Cukup')
                            <td colspan="3" style="vertical-align: middle; text-align: center; background-color:#ffff00;" rowspan="2"><h4>Cukup</h4></td>
                        @break
                        @case('Baik')
                            <td colspan="3" style="vertical-align: middle; text-align: center; background-color:#92d14f;" rowspan="2"><h4>Baik</h4></td>
                        @break
                        @case('Baik Sekali')
                            <td colspan="3" style="vertical-align: middle; text-align: center; background-color:#00af50;" rowspan="2"><h4>Baik Sekali</h4></td>
                        @break
                        @default
                        <td colspan="3" style="vertical-align: middle; text-align: center; background-color:#cacaca;" rowspan="2"><h4>Tidak Ada Data Audit Sebelumnya</h4></td>        
                    @endswitch
                @else
                    <td colspan="3" style="vertical-align: middle; text-align: center; background-color:#cacaca;" rowspan="2"><h4>Tidak Ada Data Audit Sebelumnya</h4></td>
                @endif
            </tr>
            <tr>
                @if($item->MonthExcecution == 1)
                    @if($item->MonthExcecutionDone == 1)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 1)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 2)
                    @if($item->MonthExcecutionDone == 2)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 2)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 3)
                    @if($item->MonthExcecutionDone == 3)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 3)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 4)
                    @if($item->MonthExcecutionDone == 4)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 4)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 5)
                    @if($item->MonthExcecutionDone == 5)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 5)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 6)
                    @if($item->MonthExcecutionDone == 6)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 6)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 7)
                    @if($item->MonthExcecutionDone == 7)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 7)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 8)
                    @if($item->MonthExcecutionDone == 8)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 8)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 9)
                    @if($item->MonthExcecutionDone == 9)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 9)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 10)
                    @if($item->MonthExcecutionDone == 10)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 10)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 11)
                    @if($item->MonthExcecutionDone == 11)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 11)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
                @if($item->MonthExcecution == 12)
                    @if($item->MonthExcecutionDone == 12)
                        <td colspan="2" class="diagonal" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2" class="diagonal"></td>
                    @endif
                @else
                    @if($item->MonthExcecutionDone == 12)
                        <td colspan="2" style="background-color: #cacaca"></td>
                    @else
                        <td colspan="2"></td>
                    @endif
                @endif
            </tr>
        @endforeach
    </tbody>
</table>

<table class="table table-borderless">
    <tbody>
        <tr>
            <td style="width: 20%">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th width="40%" style="text-align: center; border: 2px solid #080808;" class="diagonalBawah"></th>
                            <td colspan="2" style="text-align: center;">: Rencana Audit</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style="width: 20%">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th width="40%" style="text-align: center; background-color:#cacaca; border: 2px solid #080808;"></th>
                            <td colspan="2" style="text-align: center;">: Realisasi Audit</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>

            </td>
        </tr>
    </tbody>
</table>

<table class="table table-borderless">
    <tbody>
        <tr>
            <th>Pandaan, {{\Carbon\Carbon::now()->format('d F Y')}}</th>
        </tr>
        <tr>
            <td style="width: 20%">
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
                            <td colspan="4" class="text-center">Manajemen Representatif</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style="width: 10%">

            </td>
            <td style="width: 20%">
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
                            <td colspan="4" class="text-center">Factory Director</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>

            </td>
        </tr>
        {{-- <tr>
            
        </tr>
        <tr>
            <td colspan="2"><hr></td>
            <td colspan="2"><hr></td>
        </tr>
        <tr>
            <td colspan="2" class="text-center">Manajemen Representatif</td>
            <td colspan="2" class="text-center">Factory Director</td>
        </tr> --}}
    </tbody>
</table>