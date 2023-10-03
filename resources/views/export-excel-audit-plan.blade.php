<table class="datatable table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline">
    <thead>
        <tr>
            <th colspan="14">Audit Plant</th>
        </tr>
    </thead>
</table>

<table class="datatable table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline">
    <thead>
        <tr></tr>
        <tr>
            <th>No.</th>
            <th>Id Audit</th>
            <th>Auditee Department</th>
            <th>Purpose</th>
            <th>Audit Scope</th>
            <th>Audit Periode</th>
            <th>Opening Meeting</th>
            <th>Audit Execution Start</th>
            <th>Audit Execution Done</th>
            <th>Closing Meeting</th>
            <th>Standard Audit</th>
            <th>Objective</th>
            <th>Organizer Audit</th>
            <th>Status Execution</th>
        </tr>
    </thead>
    <tbody>
        @foreach($data as $key=>$val)
            <tr>
                <td>{{$key+1}}</td>
                <td>{{$val->NoTrans}}</td>
                <td>
                    @foreach($val->AuditeeDepartment as $i=>$v)
                        @if($i+1 == count($val->AuditeeDepartment))
                            {{$v->Department}}
                        @else
                            {{$v->Department}},
                        @endif
                    @endforeach
                </td>
                <td>{{$val->Purpose}}</td>
                <td>{{$val->AuditScope}}</td>
                <td>{{\Carbon\Carbon::parse($val->AuditPeriode)->format('F-Y')}}</td>
                <td>{{\Carbon\Carbon::parse($val->OpeningMeeting)->format('d/m/Y')}}</td>
                <td>{{\Carbon\Carbon::parse($val->AuditExecutionStart)->format('d/m/Y')}}</td>
                <td>{{\Carbon\Carbon::parse($val->AuditExecutionDone)->format('d/m/Y')}}</td>
                <td>{{\Carbon\Carbon::parse($val->CloseMeeting)->format('d/m/Y')}}</td>
                <td>
                    @foreach($val->AuditCriteria as $i=>$v)
                        @if($i+1 == count($val->AuditCriteria))
                            {{$v->Standart}}
                        @else
                            {{$v->Standart}},
                        @endif
                    @endforeach
                </td>
                <td>{{$val->Objective}}</td>
                <td>{{$val->Organizer}}</td>
                <td>
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