<?php

namespace App\Http\Controllers\BackEnd;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Yajra\DataTables\DataTables;
use Carbon\Carbon;

class HistoryTableControll extends Controller
{
    public function index(Request $request){
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field,$dir) = explode('|',$sortRules);

        $query =DB::table('history as hry')
            ->select(
                'hry.Id as id',
                'mdl.Name as Module',
                'hry.From',
                'hry.Action',
                'hry.Description',
                'usr.UserName as UserEntry',
                'hry.CreateAt',
                'hry.UpdateAt')
            ->leftjoin('module as mdl','mdl.Id','=','hry.IdModule')
            ->leftjoin('users as usr','usr.Id','=','hry.UserEntry')
            ->orderBy($field,$dir);

        if ($searchValue){
            $query->where(function($query) use ($searchValue){
                foreach($searchValue as $key=>$val){
                    $key = str_replace('__','.',$key);
                    $query->where($key,'like','%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);
        
        return $data;
    }

    public function show(Request $request){
        $item = DB::table('history as hry')
            ->select(
                'hry.Id',
                'mdl.Name as Module',
                'hry.From',
                'hry.Action',
                'hry.Description',
                'usr.UserName as UserEntry',
                'hry.CreateAt',
                'hry.UpdateAt',
                'hry.Description')
            ->join('module as mdl','mdl.Id','=','hry.IdModule')
            ->leftjoin('users as usr','usr.Id','=','hry.UserEntry')
            ->where('hry.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->CreateAt = Carbon::parse($item->CreateAt)->format('l, d-m-Y H:i:s');
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('l, d-m-Y H:i:s');
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }
}
