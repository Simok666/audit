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
    <tbody>
        <tr>
            <th colspan="2" width="50%" style="text-align: center; background-color: #cacaca">Pembukaan (Opening)</th>
            <th colspan="2" style="text-align: center; background-color: #cacaca">Penutupan (Closing)</th>
        </tr>
        <tr>
            <th width="20%" style="text-align: center; background-color: #cacaca">Hari/Tanggal</th>
            <td width="30%">{{$item->OpeningMeeting}}</td>
            <th width="20%" style="text-align: center; background-color: #cacaca">Hari/Tanggal</th>
            <td width="30%">{{$item->CloseMeeting}}</td>
        </tr>
        <tr>
            <th width="20%" style="text-align: center; background-color: #cacaca">Waktu</th>
            <td width="30%">{{$item->HourStart}}</td>
            <th width="20%" style="text-align: center; background-color: #cacaca">Waktu</th>
            <td width="30%">{{$item->HourDone}}</td>
        </tr>
    </tbody>
</table>

<table class="table table-bordered">
    <thead>
        <tr>
            <th colspan="1" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca;">No.</th>
            <th colspan="3" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca;">Nama</th>
            <th colspan="2" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca;">Dept.</th>
            <th colspan="6" style="text-align: center; background-color: #cacaca;">Tanda Tangan</th>
            <th colspan="3" rowspan="2" style="vertical-align: middle; text-align: center; background-color: #cacaca;">Keterangan</th>
        </tr>
        <tr>
            <th colspan="3" style="text-align: center; background-color: #cacaca">Opening</th>
            <th colspan="3" style="text-align: center; background-color: #cacaca">Closing</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($item->Employee as $key=>$val)
            <tr>
                <td colspan="1">{{$key+1}}</td>
                <td colspan="3">{{$val['Name']}}</td>
                <td colspan="2">{{$val['Department']}}</td>
                <td colspan="3"></td>
                <td colspan="3"></td>
                <td colspan="3"></td>
            </tr>
        @endforeach
    </tbody>
</table>