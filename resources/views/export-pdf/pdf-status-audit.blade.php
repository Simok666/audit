<table class="table table-borderless">
    <tbody>
        <tr>
            <td style="width: 50%">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Departement</th>
                            <td colspan="4" style="text-align: center">{{$item->Department}}</td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Hari/Tanggal</th>
                            <td colspan="4" style="text-align: center">{{$item->AuditDate}}</td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Waktu</th>
                            <td colspan="4" style="text-align: center">{{$item->HourStart}} - {{$item->HourDone}}</td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Auditee</th>
                            <td colspan="4" style="text-align: center">
                                @foreach ($item->Auditee as $key=>$val)
                                    {{$val}}
                                @endforeach
                            </td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Auditor</th>
                            <td colspan="4" style="text-align: center">
                                @foreach ($item->Auditor as $key=>$val)
                                    @if($key == 0)
                                        <strong>{{$val}} (L)</strong>,
                                    @elseif($key+1 == count($item->Auditor))
                                        {{$val}}
                                    @else
                                        {{$val}},
                                    @endif
                                @endforeach
                            </td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Kriteria Audit</th>
                            <td width="50%" colspan="4" style="text-align: center">
                                @php
                                    $countClauseAudit = 0;    
                                @endphp
                                @foreach($item->AuditClause as $k=>$value)
                                    <u>{{$value->StandartAudit}}</u>:
                                    @foreach(json_decode($value->IdClauseAudit) as $i=>$v)
                                        @if($i+1 == count(json_decode($value->IdClauseAudit)))
                                            {{$v->Clause}};
                                        @else
                                            {{$v->Clause}},
                                        @endif
                                        @php
                                            $countClauseAudit++;    
                                        @endphp
                                    @endforeach
                                @endforeach
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>

            </td>
            <td style="width: 30%">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <th width="100%" style="text-align: center; background-color:#cacaca; border: 2px solid #080808;">Nilai Audit</th>
                        </tr>
                        <tr>
                            <td width="100%" style="border: 2px solid #080808; text-align:center;"><strong>{{$item->AuditScore}}</strong></td>
                        </tr>
                        <tr>
                            <td width="100%"><br></td>
                        </tr>
                        <tr>
                            <th width="100%" style="text-align: center; background-color:#cacaca; border: 2px solid #080808;">Tingkat Penerapan</th>
                        </tr>
                        <tr>
                            <td width="100%" style="border: 2px solid #080808; text-align:center;"><strong>{{$item->AuditGrade}}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<h5>Evaluasi Hasil Audit</h5>
<hr>
<table class="table table-borderless">
    <tbody>
        <tr>
            <th width="30%"></th>
            <th width="70%"><strong>Kelemahan penerapan persyaratan terindikasi pada :</strong></th>
        </tr>
        <tr>
            <td width="30%">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Jumlah Temuan</th>
                            <td colspan="2" style="text-align: center">{{$countClauseAudit}}</td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Critical (cr)</th>
                            <td colspan="2" style="text-align: center">
                                @if($item->TypeNonConformity == 'Critical')
                                    {{$countClauseAudit}}
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Major (Ma)</th>
                            <td colspan="2" style="text-align: center">
                                @if($item->TypeNonConformity == 'Major')
                                    {{$countClauseAudit}}
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Minor (Mi)</th>
                            <td colspan="2" style="text-align: center">
                                @if($item->TypeNonConformity == 'Minor')
                                    {{$countClauseAudit}}
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <th width="50%" style="text-align: center; background-color:#cacaca;">Observasi (Ob)</th>
                            <td colspan="2" style="text-align: center">
                                @if($item->TypeNonConformity == 'Observasi')
                                    {{$countClauseAudit}}
                                @endif
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td width="70%">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th colspan="2" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Klausa</th>
                            <th colspan="4" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca">Deskripsi Persyaratan</th>
                            <th colspan="4" style="text-align: center; background-color: #cacaca">Jumlah Temuan</th>
                        </tr>
                        <tr>
                            <th style="text-align: center; background-color: #cacaca">Cr</th>
                            <th style="text-align: center; background-color: #cacaca">Ma</th>
                            <th style="text-align: center; background-color: #cacaca">Mi</th>
                            <th style="text-align: center; background-color: #cacaca">Ob</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($item->AuditClause as $k=>$value)
                            @foreach(json_decode($value->IdClauseAudit) as $i=>$v)
                                <tr>
                                    <td colspan="2" style="text-align: center;">{{$v->Clause}}</td>
                                    <td colspan="4" style="text-align: center;">{{$value->StandartAudit}}</td>
                                    <td style="text-align: center;">
                                        @if($item->TypeNonConformity == 'Critical')
                                            1
                                        @endif
                                    </td>
                                    <td style="text-align: center;">
                                        @if($item->TypeNonConformity == 'Major')
                                            1
                                        @endif
                                    </td>
                                    <td style="text-align: center;">
                                        @if($item->TypeNonConformity == 'Minor')
                                            1
                                        @endif
                                    </td>
                                    <td style="text-align: center;">
                                        @if($item->TypeNonConformity == 'Observasi')
                                            1
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        @endforeach
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
                            <td colspan="4" class="text-center">QMS Unit Head</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style="width: 60%">

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
                            <td colspan="4" class="text-center">Manajemen Representatif</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>