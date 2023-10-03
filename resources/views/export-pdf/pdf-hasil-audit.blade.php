<table class="table table-borderless">
    <tbody>
        <tr>
            <th width="20%" style="text-align: center; background-color:#cacaca; border: 2px solid #080808;">Ref.Number</th>
            <td width="30%" colspan="2" style="text-align: center; border: 2px solid #080808;">{{$item->RefNumber}}</td>
            <td width="50%"></td>
        </tr>
    </tbody>
</table>

<table class="table table-bordered">
    <tbody>
        <tr>
            <th width="20%" style="text-align: center; background-color: #cacaca">Tgl. Audit</th>
            <td width="30%" style="text-align: center;">{{\Carbon\Carbon::parse($item->AuditorDate)->format('d/m/Y')}}</td>
            <th width="20%" style="text-align: center; background-color: #cacaca">Departement</th>
            <td width="30%" style="text-align: center;">{{$item->Department}}</td>
        </tr>
        <tr>
            <th width="20%" style="text-align: center; background-color: #cacaca">Auditor</th>
            <td width="30%" style="text-align: center;">
                @foreach($item->Auditor as $key=>$val)
                    @if($key == 0)
                        <strong>{{$val}} (L)</strong>
                    @else
                        {{$val}}
                    @endif
                    <br>
                @endforeach
            </td>
            <th width="20%" style="text-align: center; background-color: #cacaca">Auditee</th>
            <td width="30%" style="text-align: center;">
                @foreach($item->Auditee as $key=>$val)
                    {{$val}}
                    <br>
                @endforeach
            </td>
        </tr>
    </tbody>
</table>

<table class="table table-bordered">
    <tbody>
        <tr>
            <th colspan="8" width="100%" style="text-align: center; background-color: #cacaca">URAIAN / POTENSI KETIDAKSESUAIAN</th>
        </tr>
        <tr>
            <td colspan="8" width="100%" height="220px;" style="text-align: center;">{{$item->PotentialNonConformitiy}}</td>
        </tr>
        <tr>
            <th colspan="8" width="100%" style="text-align: center; background-color: #cacaca">PERSYARATAN TERKAIT</th>
        </tr>
        <tr>
            <td colspan="8" width="100%" style="text-align: center;">
                @foreach($item->AuditClause as $k=>$value)
                    <u>{{$value->StandartAudit}}</u>:
                    <br>
                    Klausa : 
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
        <tr>
            <th width="25%" style="text-align: center; background-color: #cacaca" colspan="2">JENIS KETIDAKSESUAIAN </th>
            <th width="25%" style="text-align: center; background-color: #cacaca" colspan="2">DILAPORKAN OLEH</th>
            <th width="25%" style="text-align: center; background-color: #cacaca" colspan="2">DIVERIFIKASI OLEH</th>
            <th width="25%" style="text-align: center; background-color: #cacaca" colspan="2">DISETUJUI OLEH</th>
        </tr>
        <tr>
            <td width="25%" colspan="2">
                <div class="form-check">
                    @if($item->TypeNonConformity == 'Critical')
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked>    
                    @else
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    @endif
                    <label class="form-check-label" for="defaultCheck1">
                      Critical (Cr)
                    </label>
                </div>
                <div class="form-check">
                    @if($item->TypeNonConformity == 'Major')
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked>
                    @else
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                    @endif
                    <label class="form-check-label" for="defaultCheck2">
                      Major (Ma)
                    </label>
                </div>
                <div class="form-check">
                    @if($item->TypeNonConformity == 'Minor')
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked>
                    @else
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck3">
                    @endif
                    <label class="form-check-label" for="defaultCheck3">
                      Minor (Mi)
                    </label>
                </div>
                <div class="form-check">
                    @if($item->TypeNonConformity == 'Observasi')
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" checked>
                    @else
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck4">
                    @endif
                    <label class="form-check-label" for="defaultCheck4">
                      Observasi (Ob)
                    </label>
                </div>
            </td>
            <td width="25%" colspan="2">
                <br>
                <br>
                Auditor
                <hr />
                Tgl. {{\Carbon\Carbon::parse($item->ApprovalAuditReport[0]->UpdateAt)->format('d/m/Y')}}
            </td>
            <td width="25%" colspan="2">
                <br>
                <br>
                Auditee
                <hr />
                Tgl. {{\Carbon\Carbon::parse($item->ApprovalAuditReport[1]->UpdateAt)->format('d/m/Y')}}
            </td>
            <td width="25%" colspan="2">
                <br>
                <br>
                Manajemen Representatif
                <hr />
                Tgl. {{\Carbon\Carbon::parse($item->ApprovalAuditReport[2]->UpdateAt)->format('d/m/Y')}}
            </td>
        </tr>
    </tbody>
</table>
<br>
<br>

<table class="table table-bordered">
    <tr>
        <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">KONDISI SAAT INI</th>
        <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">GAP ANALYSIS</th>
    </tr>
    <tr>
        <td colspan="4" width="50%" style="text-align: center;">{{$item->ConditionNow}}</td>
        <td colspan="4" width="50%" style="text-align: center;">{{$item->GapAnalysis}}</td>
    </tr>
    <tr>
        <th colspan="8" width="100%" style="text-align: center; background-color: #cacaca">PENYEBAB / POTENSI PENYEBAB KETIDAKSESUAIAN</th>
    </tr>
    <tr>
        <td colspan="8" width="100%" style="text-align: center;">{{$item->PotentialCauseNonConformitiy}}</td>
    </tr>
    <tr>
        <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">KOREKSI / TINDAKAN KOREKTIF</th>
        <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">TINDAKAN PREVENTIF</th>
    </tr>
    <tr>
        <td colspan="4" width="50%" style="text-align: center;">{{$item->CorrectiveAction}}</td>
        <td colspan="4" width="50%" style="text-align: center;">{{$item->PreventiveAction}}</td>
    </tr>
    <tr>
        <th width="20%" colspan="2">PENANGGUNG JAWAB :</th>
        <td width="30%" colspan="2" style="text-align: center;">{{$item->HeadAuditee}}</td>
        <th width="20%" colspan="2">PENANGGUNG JAWAB :</th>
        <td width="30%" colspan="2" style="text-align: center;">{{$item->Auditor[0]}}</td>
    </tr>
    <tr>
        <th width="20%" colspan="2">Target Pelaksanaan :</th>
        <td width="30%" colspan="2" style="text-align: center;">{{\Carbon\Carbon::parse($item->ExecutionPlaneCorrective)->format('d/m/Y')}}</td>
        <th width="20%" colspan="2">Target Pelaksanaan :</th>
        <td width="30%" colspan="2" style="text-align: center;">{{\Carbon\Carbon::parse($item->ExecutionPreventiveAction)->format('d/m/Y')}}</td>
    </tr>
    <tr>
        <th colspan="2" width="25%" style="text-align: center; background-color: #cacaca">DIBUAT OLEH</th>
        <th colspan="2" width="25%" style="text-align: center; background-color: #cacaca">DIPERIKSA OLEH</th>
        <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">DISETUJUI OLEH</th>
    </tr>
    <tr>
        <td width="25%" colspan="2">
            <br>
            <br>
            Auditee
            <hr />
            Tgl. {{\Carbon\Carbon::parse($item->CreateAt)->format('d/m/Y')}}
        </td>
        <td width="25%" colspan="2">
            <br>
            <br>
            Dept. Head Auditee
            <hr />
            Tgl. {{\Carbon\Carbon::parse($item->ApprovalCapaPlane[1]->UpdateAt)->format('d/m/Y')}}
        </td>
        <td width="25%" colspan="2">
            <br>
            <br>
            Auditor
            <hr />
            Tgl. {{\Carbon\Carbon::parse($item->ApprovalCapaPlane[0]->UpdateAt)->format('d/m/Y')}}
        </td>
        <td width="25%" colspan="2">
            <br>
            <br>
            Manajemen Representatif
            <hr />
            Tgl. {{\Carbon\Carbon::parse($item->ApprovalCapaPlane[2]->UpdateAt)->format('d/m/Y')}}
        </td>
    </tr>
</table>

<table class="table table-bordered">
    <tbody>
        <tr>
            <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">VERIFIKASI HASIL TINDAKAN KOREKTIF / PREVENTIF</th>
            <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">STATUS AUDIT</th>
        </tr>
        <tr>
            <td colspan="4" width="50%">
                <br>
                @if($item->IdVerificationExecution == 1)
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked>
                    <label class="form-check-label" for="defaultCheck1">
                        Tindakan telah dilaksanakan dengan baik
                    </label>
                    <br>
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                    <label class="form-check-label" for="defaultCheck2">
                        Tindakan belum dilaksanakan secara efektif
                    </label>
                @else
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        Tindakan telah dilaksanakan dengan baik
                    </label>
                    <br>
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked>
                    <label class="form-check-label" for="defaultCheck2">
                        Tindakan belum dilaksanakan secara efektif
                    </label>
                @endif
            </td>
            <td colspan="2" width="25%">
                Audit Kembali:
                <br>
                @if($item->ReAudit == 1)
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked>
                    <label class="form-check-label" for="defaultCheck1">
                        YA,Tgl. {{\Carbon\Carbon::parse($item->ReAuditDate)->format('d/m/Y')}}
                    </label>
                    <br>
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
                    <label class="form-check-label" for="defaultCheck2">
                        Tidak
                    </label>
                @else
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        YA,Tgl______
                    </label>
                    <br>
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked>
                    <label class="form-check-label" for="defaultCheck2">
                        Tidak
                    </label>
                @endif
            </td>
            <td colspan="2" width="25%">
                <br>
                <br>
                @if($item->Status == 1)
                    <label class="checkbox-inline"><input type="checkbox" value="" checked>Open</label>
                    <label class="checkbox-inline"><input type="checkbox" value="">Close</label>
                @else
                    <label class="checkbox-inline"><input type="checkbox" value="">Open</label>
                    <label class="checkbox-inline"><input type="checkbox" value="" checked>Close</label>
                @endif
            </td>
        </tr>
        <tr>
            <th colspan="4" width="50%" style="text-align: center; background-color: #cacaca">REKOMENDASI TINDAKAN KOREKTIF / PREVENTIF</th>
            <th colspan="2" width="25%" style="text-align: center; background-color: #cacaca">DIVERIFIKASI OLEH</th>
            <th colspan="2" width="25%" style="text-align: center; background-color: #cacaca">DISETUJUI OLEH</th>
        </tr>
        <tr>
            <td width="50%" colspan="4" style="text-align: center;">
                @if($item->RecommendationExecution != '')
                    {{$item->RecommendationExecution}}
                @else
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                @endif
            </td>
            <td width="25%" colspan="2">
                <br>
                <br>
                Auditor
                <hr />
                Tgl. {{\Carbon\Carbon::parse($item->ApprovalCapaVerification[0]->UpdateAt)->format('d/m/Y')}}
            </td>
            <td width="25%" colspan="2">
                <br>
                <br>
                Manajemen Representatif
                <hr />
                Tgl. {{\Carbon\Carbon::parse($item->ApprovalCapaVerification[2]->UpdateAt)->format('d/m/Y')}}
            </td>
        </tr>
    </tbody>
</table>