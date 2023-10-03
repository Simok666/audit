<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminVue extends Authenticatable
{
    use Notifiable;
    
    protected $table = 'users';

    protected $fillable = [
        'Name', 'Email', 'api_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'api_token', 'remember_token',
    ];
}
