<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        @page {
            size: A3 landscape;
            margin-top: 30px;
            margin-bottom: 20px;
        }

        body {
            margin: 0;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: left;
            background-color: #fff;
        }

        table {
            display: table;
            border-spacing: 2px;
            border-color: grey;
            border-collapse: collapse;
        }
        
        table tr td,
        table tr th{
            font-size: 10pt;
        }

        .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
        }

        thead {
            display: table-header-group;
            vertical-align: middle;
            border-color: inherit;
        }

        tbody {
            display: table-row-group;
            vertical-align: middle;
            border-color: inherit;
        }

        tr {
            display: table-row;
            vertical-align: inherit;
            border-color: inherit;
        }

        .table td, .table th {
            padding: .10rem;
            vertical-align: top;
            border-top: 1px solid #080808;
        }

        th {
            display: table-cell;
            font-weight: bold;
            text-align: inherit;
        }

        td {
            display: table-cell;
        }

        .table-sm td,.table-sm th {
            padding: .3rem
        }

        .table-borderless tbody+tbody, .table-borderless td, .table-borderless th, .table-borderless thead th {
            border: 0;
        }

        .table-bordered {
            border: 2px solid #080808
        }

        .table-bordered td,.table-bordered th {
            border: 2px solid #080808
        }

        .table-bordered thead td,.table-bordered thead th {
            border-bottom-width: 4px
        }

        .table-bordered td,.table-bordered th {
            border: 2px solid #080808!important
        }
        
        .striped{
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        .subtitle{
            font-size: 10pt;
            font-weight: bold;
        }

        .mt-min-10{
            margin-top: -10px;
        }

        .mt-min-30{
            margin-top: -30px;
        }

        h5 {
            display: block;
            font-size: 0.83em;
            margin-block-start: 1.67em;
            margin-block-end: 1.67em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
        }

        .title{
            font-size: 12pt;
            font-weight: bold;
        }

        h1, h2, h3, h4, h5, h6 {
            margin-top: 0;
            margin-bottom: .5rem;
            line-height: 1.2;
        }

        .text-small{
            font-size: 10pt;
        }

        .text-xs-small{
            font-size: 9pt;
        }

        p {
            margin-top: 0;
            margin-bottom: 1rem;
        }

        .b-bottom{
            border-bottom: 2px solid black;
            border-style: double;
        }

        .m-center{
            margin: 0 auto;
        }

        .mt-8{
            margin-top: 80px;
        }

        .mt-min-8{
            margin-top: -80px !important;
        }

        .ml-15{
            margin-left: 15px;
        }

        .ml-37{
            margin-left: 37px;
        }

        .text-center{
            text-align: center;
        }

        .align-middle{
            vertical-align: middle !important;
        }

        .table-bordered td.no-border-y{
            border-top: unset !important;
            border-bottom: unset !important;
        }

        .weight-light{
            font-weight: 400;
        }

        .footer {
            width: 100%;
            text-align: center;
            position: fixed;
            font-size: 8px;
        }
        .footer {
            bottom: 20px;
        }
        .pagenum:before {
            content: counter(page);
        }
	</style>
    <title>Print Document | {{$Title}}</title>
</head>

<body>
    <?php
        $path = public_path('clouds/backend/files/images/logo-icon.png');
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $logo = 'data:image/' . $type . ';base64,' . base64_encode($data);
    ?>
    <div class="footer">
        <hr>
        Dokumen Original ditandatangani dan distempel dengan tinta biru. "Original", salinan terkendali distempel dengan tinta biru "COPY-...."<br>
        Salinan lain yang dibuat selain salinan terkendali dianggap sebagai "Dokumen Tidak Terkendali"
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
                <td style="width:20%" align="center">
                    <img src="{{$logo}}" width="110px" style="margin-top: 7px">
                </td>
                <td align="center">
                    <h5 class="title">FORMULIR</h5>
                    <h6 class="title"><i>Form</i></h6><hr>
                    <h5 class="title">COMPANY MANAGEMENT</h5>
                    <h6 class="title"><i>Manajemen Perusahaan</i></h6>
                </td>
                <td style="width:20%">
                    <p style="font-size:14px; text-align:center; margin-bottom:33px;">Halaman 1 dari 1</p>
                    <p></p>
                    <hr>
                    <p style="font-size: 14px;">{{$noOrder}}</p>
                    <p style="font-size: 14px;">Tgl. Berlaku : </p>
                </td>
            </tr>
            <tr>
                <td align="center" colspan="3" style="background-color:#cacaca;">
                    <h5 class="title">{{$Header}}</h5>
                    <h6 class="subtitle"><i>{{$SubHeader}}</i></h6>
                </td>
            </tr>
        </thead>
    </table>

    <h3 class="text-center">PERIODE {{\Carbon\Carbon::parse($item[0]->AuditPeriode)->format('F-Y')}}</h3>

    <strong>EDISI :</strong>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">No.Ref.</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Jenis</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Klausa Terkait</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Uraian / Potensi Ketidaksesuaian</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Kondisi Saat Ini & Gap Analysis</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Penyebab / Potensi Penyebab Ketidaksesuaian</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Koreksi & Tindakan Korektif / Tindakan Preventif</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">PIC</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Target Pelaksanaan</th>
                <th colspan="3" style="vertical-align: middle; text-align: center; background-color: #cacaca">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($item as $key=>$val)
                <tr>
                    <td colspan="3" style="text-align: center;">{{$val->RefNumber}}</td>
                    <td colspan="3" style="text-align: center;">{{$val->TypeNonConformity}}</td>
                    <td colspan="3">
                        @foreach($val->Clause as $k=>$value)
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
                    <td colspan="3">{{$val->PotentialNonConformitiy}}</td>
                    <td colspan="3">
                        <u>Kondisi Saat Ini : </u>
                        <br>
                            {{$val->ConditionNow}}
                        <br>
                        <u>Gap Analysis : </u>
                        <br>
                            {{$val->GapAnalysis}}
                    </td>
                    <td colspan="3">{{$val->PotentialCauseNonConformitiy}}</td>
                    <td colspan="3">
                        <u>Tindakan Korektif : </u>
                        <br>
                        {{$val->CorrectiveAction}}
                        <br>
                        <u>Tindakan Preventif : </u>
                        <br>
                        {{$val->PreventiveAction}}
                    </td>
                    <td colspan="3">{{$val->LeadAuditor}}</td>
                    <td colspan="3">
                        <u>Target Korektif : </u>
                        <br>
                        {{\Carbon\Carbon::parse($val->ExecutionPlaneCorrective)->format('d/m/Y')}}
                        <br>
                        <u>Target Preventif : </u>
                        <br>
                        {{\Carbon\Carbon::parse($val->ExecutionPreventiveAction)->format('d/m/Y')}}
                    </td>
                    <td colspan="3">
                        @if($val->Status == 1)
                            Open
                        @else
                            Close
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>