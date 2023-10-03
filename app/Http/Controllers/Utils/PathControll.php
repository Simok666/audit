<?php

namespace App\Http\Controllers\Utils;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PathControll extends Controller
{
    public function pathFile($id){
        switch ($id) {
            case 1:
                return 'clouds/backend/files/documents/';
                break;
            case 2:
                return 'clouds/backend/files/images/';
                break;
            case 3:
                return 'clouds/backend/files/videos/';
                break;
            case 4:
                return 'clouds/backend/files/images/users/';
                break;
            case 5:
                return 'clouds/backend/files/standart-audit/';
                break;
            case 6:
                return 'clouds/backend/files/auditor-skill/';
                break;
            case 7:
                return 'clouds/backend/files/audit-plan/';
            break;
            case 8:
                return 'clouds/backend/files/auditor-team/';
            break;
            case 9:
                return 'clouds/backend/files/auditor-report/';
            break;
            case 10:
                return 'clouds/backend/files/plan-capa-report/';
            break;
            default:
                return 'clouds/backend/files/documents/';
        }
    }

}
