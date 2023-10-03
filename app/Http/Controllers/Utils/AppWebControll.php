<?php

namespace App\Http\Controllers\Utils;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Session;
use DB;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;
use Carbon\Carbon;
use Crypt;
use Validator;

class AppWebControll extends Controller
{

    public function checkDataOneCol($table, $column, $value) {
    	if($table!='' && $column!='' && $value!=''){
	    	$data =DB::table($table)
	            ->where($column, $value)
	            ->where('Actived','>',0)
	            ->count();
        	return $data;
        }else{
        	return 0;
        }
    }

    public function checkDataOneColMaster($table, $column, $value) {
    	if($table!='' && $column!='' && $value!=''){
	    	$data =DB::connection('wdb_auditsys')->table($table)
	            ->where($column, $value)
	            ->where('Actived','>',0)
	            ->count();
        	return $data;
        }else{
        	return 0;
        }
    }

    public function checkDataManyCol($table, $columns=array()) {
    	if( $table!='' && !empty($columns) ) {
	    	$query = DB::table($table)->where('Actived','>',0);
	    	$query->where(function($query) use ($columns) {
                foreach ($columns as $key=>$val) {
                    $query->where($key, $val);
                }
            });
        	return $query->count();
        }else{
        	return 0;
        }
    }

    public function checkDataManyColMaster($table, $columns=array()) {
    	if( $table!='' && !empty($columns) ) {
	    	$query = DB::connection('wdb_auditsys')->table($table)->where('Actived','>',0);
	    	$query->where(function($query) use ($columns) {
                foreach ($columns as $key=>$val) {
                    $query->where($key, $val);
                }
            });
        	return $query->count();
        }else{
        	return 0;
        }
    }

    public function checkDataOrManyCol($table, $columns=array()) {
    	if( $table!='' && !empty($columns) ) {
	    	$query = DB::table($table)->where('Actived','>',0);
	    	$query->where(function($query) use ($columns) {
                foreach ($columns as $key=>$val) {
                    $query->orWhere($key, $val);
                }
            });
        	return $query->count();
        }else{
        	return 0;
        }
    }

    public function FormatDate($from, $date, $format) {
    	return Carbon::createFromFormat($from, $date)->format($format);
    }

    public function getNumeric($value) {
        if($value == '' || $value == null) return null;
        $output = str_replace('.', '', $value);
        $output = str_replace(',', '.', $output);
        return $output;
    }

}
