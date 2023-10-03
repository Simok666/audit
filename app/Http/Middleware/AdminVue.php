<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;


class AdminVue
{

    public function handle($request, Closure $next, $guard = null){
    	$allowMenu = session('allow_menu');
    	$uri = $request->route()->action;
    	$url = isset($uri['as']) ? $uri['as'] : 'url.url';
    	$urlCheck = explode('.', $url);

    	if($urlCheck[0]=='export' && !array_key_exists( $url , $allowMenu) ) return redirect('AdminVue/restricted');;

        if(!session()->get('adminvue')) return response()->json(['User Data Expired!'], 401);

        return $next($request);
    }
}
