<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;


class AuditEmailTemplate extends Controller
{
    protected $History;

    public function __construct() {
        $this->History = new HistoryControll();
    }

    public function index() {
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);
        
        $query =DB::table('audit_email as ae')
            ->select(
                'ae.id',
                'oag.Name as organizer',
                'ae.from',
                'ae.to',
                'ae.cc',
                'ae.subject',
                'ae.content',
            )
            ->join('organizer_audit as oag','oag.Id','=','ae.id_audit')
            ->orderBy($field, $dir)
            ->where('ae.actived','>',0);

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
}