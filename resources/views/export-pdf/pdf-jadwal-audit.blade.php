<table class="table table-bordered">
    <tbody>
        <tr>
            <th width="20%" style="text-align: center; background-color:#cacaca;">KRITERIA AUDIT</th>
            <td width="50%" colspan="2" style="text-align: center">{{$item->KriteriaAudit}}</td>
            <th width="20%" style="text-align: center; background-color:#cacaca;">PERIODE AUDIT</th>
            <td width="10%" colspan="2" style="text-align: center">{{$item->AuditPeriode}}</td>
        </tr>
    </tbody>
</table>

<table class="table table-bordered">
    <thead>
        <tr>
            <th colspan="2" style="text-align: center; background-color:#cacaca;">Hari/Jam</th>
            <th colspan="3" style="text-align: center; background-color:#cacaca;">Departement/Divisi</th>
            <th colspan="3" style="text-align: center; background-color:#cacaca;">Auditor</th>
            <th colspan="3" style="text-align: center; background-color:#cacaca;">Auditee</th>
            <th colspan="3" style="text-align: center; background-color:#cacaca;">Klausa Terkait</th>
        </tr>
    </thead>
    <tbody>
        @php
            $AuditDate = '';
        @endphp
        @foreach($item->AuditSelection as $key=>$val)
            @if($val->AuditDate != $AuditDate)
                <tr>
                    <td colspan="14"><strong>{{$val->AuditDateHari}}</strong></td>
                </tr>
                <tr>
                    <td colspan="2">{{$val->HourStart}} - {{$val->HourDone}}</td>
                    <td colspan="3" style="text-align: center"><strong>{{$val->Department}}</strong></td>
                    <td colspan="3">
                        <strong>{{$val->LeadAuditor}} (L)</strong>
                        <br>
                        @foreach(json_decode($val->DetailAudit->IdAuditor) as $k=>$value)
                            {{$value->Employee}}
                            <br>
                        @endforeach
                    </td>
                    <td colspan="3">
                        @foreach (json_decode($val->DetailAudit->IdPositionAuditee) as $k=>$value)
                            {{$value->Name}}
                            <br>
                        @endforeach
                    </td>
                    <td colspan="3">
                        @foreach($val->DetailAuditClause as $k=>$value)
                            <u>{{$value->StandartAudit}}</u>:
                            <br>
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
                </tr>
            @else
                <tr>
                    <td colspan="2">{{$val->HourStart}} - {{$val->HourDone}}</td>
                    <td colspan="3" style="text-align: center"><strong>{{$val->Department}}</strong></td>
                    <td colspan="3">
                        <strong>{{$val->LeadAuditor}} (L)</strong>
                        <br>
                        @foreach(json_decode($val->DetailAudit->IdAuditor) as $k=>$value)
                            {{$value->Employee}}
                            <br>
                        @endforeach
                    </td>
                    <td colspan="3">
                        @foreach (json_decode($val->DetailAudit->IdPositionAuditee) as $k=>$value)
                            {{$value->Name}}
                            <br>
                        @endforeach
                    </td>
                    <td colspan="3">
                        @foreach($val->DetailAuditClause as $k=>$value)
                            <u>{{$value->StandartAudit}}</u>:
                            <br>
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
                </tr>
            @endif
            @php
                $AuditDate == $val->AuditDate;
            @endphp    
        @endforeach
    </tbody>
</table>

<table class="table table-borderless">
    <tbody>
        <tr>
            <td style="width: 50%">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th colspan="6" class="text-center" style="background-color: #cacaca">Auditor</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($item->LeadAuditor as $val)
                            <tr>
                                <td colspan="6" class="text-center">{{$val}}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </td>
            <td>

            </td>
            <td style="width: 30%">
                <table class="table table-bordered">
                    <tbody>
                        <tbody>
                            <tr>
                                <th colspan="6" class="text-center" style="background-color: #cacaca">Observer</th>
                            </tr>
                        </tbody>
                        <tbody>
                            @foreach ($item->Observer as $val)
                                <tr>
                                    <td colspan="6" class="text-center">{{$val}}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </tbody>
                </table>
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
        </tr>
    </tbody>
</table>