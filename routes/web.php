<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return redirect('/RoleAdmin/manage');
});

Route::get('/sendmail-web', 'BackEnd\HistoryControll@sendMailWeb');


Route::get('RoleAdmin/{any}', 'ApplicationController')->where('any', '.*');

Route::get('register', 'Auth\AuthController@register');
Route::post('/AdminVue/login', 'Auth\AuthController@login');
Route::post('/AdminVue/forgot-password', 'Auth\AuthController@ForgotPassword');
Route::post('/AdminVue/reset-password', 'Auth\AuthController@ResetPassword');
Route::post('/AdminVue/verification-code', 'Auth\AuthController@VerificationCode');
Route::post('/AdminVue/logout', 'Auth\AuthController@logout');
Route::get('/AdminVue/{type}/{date}/sendReminder', 'BackEnd\PlanCapaReportControll@sendMailApi');

Route::group(['middleware'=>['adminvue']], function () {
	Route::group(['prefix' => 'AdminVue'], function () {

	    Route::post('check-token', function(Request $request){
	    	$allowMenu = session('allow_menu');
	    	if(array_key_exists( $request->input('Url') , $allowMenu)){
	    		return response()->json(['status'=>200,'message'=>'Access Accepted']);
	    	}else{
	    		return response()->json(['status'=>406,'message'=>'Access Not Acceptable']);
	    	}
	    });

	    Route::get('restricted','Auth\AuthController@restrictedPage');
	    Route::post('auth-reaccess-menu','Auth\AuthController@reAccessMenu');

		Route::get('data-district','BackEnd\DistrictControll@index');
		Route::post('district-get-city','BackEnd\DistrictControll@getCity');
		Route::post('district-show','BackEnd\DistrictControll@show');
		Route::post('district-insert','BackEnd\DistrictControll@store');
		Route::post('district-edit','BackEnd\DistrictControll@edit');
		Route::post('district-update','BackEnd\DistrictControll@update');
		Route::post('district-delete','BackEnd\DistrictControll@delete');
		Route::post('district-export-pdf','BackEnd\DistrictControll@exportPdf');

		Route::get('data-pos-code','BackEnd\PosCodeControll@index');
		Route::post('pos-code-get-district','BackEnd\PosCodeControll@getDistrict');
		Route::post('pos-code-show','BackEnd\PosCodeControll@show');
		Route::post('pos-code-insert','BackEnd\PosCodeControll@store');
		Route::post('pos-code-edit','BackEnd\PosCodeControll@edit');
		Route::post('pos-code-update','BackEnd\PosCodeControll@update');
		Route::post('pos-code-delete','BackEnd\PosCodeControll@delete');

		Route::get('data-city','BackEnd\CityControll@index');
		Route::post('city-get-province','BackEnd\CityControll@getProvince');
		Route::post('city-show','BackEnd\CityControll@show');
		Route::post('city-insert','BackEnd\CityControll@store');
		Route::post('city-edit','BackEnd\CityControll@edit');
		Route::post('city-update','BackEnd\CityControll@update');
		Route::post('city-delete','BackEnd\CityControll@delete');

		Route::get('data-province','BackEnd\ProvinceControll@index');
		Route::post('province-get-country','BackEnd\ProvinceControll@getCountry');
		Route::post('province-show','BackEnd\ProvinceControll@show');
		Route::post('province-insert','BackEnd\ProvinceControll@store');
		Route::post('province-edit','BackEnd\ProvinceControll@edit');
		Route::post('province-update','BackEnd\ProvinceControll@update');
		Route::post('province-delete','BackEnd\ProvinceControll@delete');

		Route::get('data-country','BackEnd\CountryControll@index');
		Route::post('country-show','BackEnd\CountryControll@show');
		Route::post('country-insert','BackEnd\CountryControll@store');
		Route::post('country-edit','BackEnd\CountryControll@edit');
		Route::post('country-update','BackEnd\CountryControll@update');
		Route::post('country-delete','BackEnd\CountryControll@delete');

		Route::get('data-division','BackEnd\DivisionControll@index');
		Route::post('division-show','BackEnd\DivisionControll@show');
		Route::post('division-insert','BackEnd\DivisionControll@store');
		Route::post('division-edit','BackEnd\DivisionControll@edit');
		Route::post('division-update','BackEnd\DivisionControll@update');
		Route::post('division-delete','BackEnd\DivisionControll@delete');

		Route::get('data-department','BackEnd\DepartmentControll@index');
		Route::post('department-get-division','BackEnd\DepartmentControll@getDivision');
		Route::post('department-show','BackEnd\DepartmentControll@show');
		Route::post('department-insert','BackEnd\DepartmentControll@store');
		Route::post('department-edit','BackEnd\DepartmentControll@edit');
		Route::post('department-update','BackEnd\DepartmentControll@update');
		Route::post('department-delete','BackEnd\DepartmentControll@delete');

		Route::get('data-position','BackEnd\PositionControll@index');
		Route::post('position-getSelect','BackEnd\PositionControll@getSelect');
		Route::post('position-getParent','BackEnd\PositionControll@getParent');
		Route::post('position-show','BackEnd\PositionControll@show');
		Route::post('position-insert','BackEnd\PositionControll@store');
		Route::post('position-edit','BackEnd\PositionControll@edit');
		Route::post('position-update','BackEnd\PositionControll@update');
		Route::post('position-delete','BackEnd\PositionControll@delete');

		Route::get('data-user-employee','BackEnd\UsersEmployeeControll@index');
		Route::post('user-get-department','BackEnd\UsersEmployeeControll@getDepartment');
		Route::post('user-get-type-user','BackEnd\UsersEmployeeControll@getTypeUser');
		Route::post('user-get-city','BackEnd\UsersEmployeeControll@getCity');
		Route::post('user-employee-show','BackEnd\UsersEmployeeControll@show');
		Route::post('user-employee-insert','BackEnd\UsersEmployeeControll@store');
		Route::post('user-employee-edit','BackEnd\UsersEmployeeControll@edit');
		Route::post('user-employee-update','BackEnd\UsersEmployeeControll@update');
		Route::post('user-employee-delete','BackEnd\UsersEmployeeControll@delete');

		Route::get('master-module','BackEnd\MasterModuleControll@index');
		Route::post('master-module-get-parent','BackEnd\MasterModuleControll@getParent');
		Route::post('master-module-show','BackEnd\MasterModuleControll@show');
		Route::post('master-module-insert','BackEnd\MasterModuleControll@store');
		Route::post('master-module-edit','BackEnd\MasterModuleControll@edit');
		Route::post('master-module-update','BackEnd\MasterModuleControll@update');
		Route::post('master-module-delete','BackEnd\MasterModuleControll@delete');

		Route::post('profile','BackEnd\ProfileControll@index');
		Route::post('profile-get-city','BackEnd\ProfileControll@getCity');
		Route::post('profile-edit','BackEnd\ProfileControll@edit');
		Route::post('profile-update','BackEnd\ProfileControll@update');

		Route::get('user-access','BackEnd\UserAccessControll@index');
		Route::post('user-access-getJsonTree','BackEnd\UserAccessControll@getJsonTree');
		Route::post('user-access-show','BackEnd\UserAccessControll@show');
		Route::post('user-access-insert','BackEnd\UserAccessControll@store');
		Route::post('user-access-edit','BackEnd\UserAccessControll@edit');
		Route::post('user-access-update','BackEnd\UserAccessControll@update');
		Route::post('user-access-delete','BackEnd\UserAccessControll@delete');

		Route::get('data-history-data','BackEnd\HistoryTableControll@index');
		Route::post('history-data-show','BackEnd\HistoryTableControll@show');

		Route::get('data-domain','BackEnd\DomainControll@index');
		Route::post('domain-show','BackEnd\DomainControll@show');
		Route::post('domain-insert','BackEnd\DomainControll@store');
		Route::post('domain-edit','BackEnd\DomainControll@edit');
		Route::post('domain-update','BackEnd\DomainControll@update');
		Route::post('domain-delete','BackEnd\DomainControll@delete');

		Route::get('data-structure-auditor','BackEnd\StructureAuditorControll@index');
		Route::post('structure-auditor-show','BackEnd\StructureAuditorControll@show');
		Route::post('structure-auditor-insert','BackEnd\StructureAuditorControll@store');
		Route::post('structure-auditor-edit','BackEnd\StructureAuditorControll@edit');
		Route::post('structure-auditor-update','BackEnd\StructureAuditorControll@update');
		Route::post('structure-auditor-delete','BackEnd\StructureAuditorControll@delete');

		Route::get('data-organizer-auditor','BackEnd\OrganizerAuditorControll@index');
		Route::post('organizer-auditor-show','BackEnd\OrganizerAuditorControll@show');
		Route::post('organizer-auditor-insert','BackEnd\OrganizerAuditorControll@store');
		Route::post('organizer-auditor-edit','BackEnd\OrganizerAuditorControll@edit');
		Route::post('organizer-auditor-update','BackEnd\OrganizerAuditorControll@update');
		Route::post('organizer-auditor-delete','BackEnd\OrganizerAuditorControll@delete');

		Route::get('data-standart-audit','BackEnd\StandartAuditControll@index');
		Route::post('standart-audit-getSelect','BackEnd\StandartAuditControll@getSelect');
		Route::post('standart-audit-show','BackEnd\StandartAuditControll@show');
		Route::post('standart-audit-showClause','BackEnd\StandartAuditControll@showClause');
		Route::post('standart-audit/{Id}/detail','BackEnd\StandartAuditControll@detail');
		Route::post('standart-audit-insert','BackEnd\StandartAuditControll@store');
		Route::post('standart-audit-edit','BackEnd\StandartAuditControll@edit');
		Route::post('standart-audit-update','BackEnd\StandartAuditControll@update');
		Route::post('standart-audit-delete','BackEnd\StandartAuditControll@delete');

		Route::post('standart-audit-clause-insert','BackEnd\StandartAuditControll@storeClauseAudit');
		Route::post('standart-audit-clause-import','BackEnd\StandartAuditControll@import');
		Route::post('standart-audit-clause-getClauseEdit','BackEnd\StandartAuditControll@getClauseEdit');
		Route::post('standart-audit-clause-edit','BackEnd\StandartAuditControll@editClauseAudit');
		Route::post('standart-audit-clause-update','BackEnd\StandartAuditControll@updateClauseAudit');
		Route::post('standart-audit-clause-delete','BackEnd\StandartAuditControll@deleteClauseAudit');

		Route::get('data-personel-auditor','BackEnd\PersonelAuditorControll@index');
		Route::post('personel-auditor-getSelect','BackEnd\PersonelAuditorControll@getSelect');
		Route::post('personel-auditor-getPosition','BackEnd\PersonelAuditorControll@getPosition');
		Route::post('personel-auditor-show','BackEnd\PersonelAuditorControll@show');
		Route::post('personel-auditor-insert','BackEnd\PersonelAuditorControll@store');
		Route::post('personel-auditor-edit','BackEnd\PersonelAuditorControll@edit');
		Route::post('personel-auditor-update','BackEnd\PersonelAuditorControll@update');
		Route::post('personel-auditor-delete','BackEnd\PersonelAuditorControll@delete');

		Route::get('data-auditor-skill','BackEnd\AuditorSkillControll@index');
		Route::post('auditor-skill-getSelect','BackEnd\AuditorSkillControll@getSelect');
		Route::post('auditor-skill-getStandartAudit','BackEnd\AuditorSkillControll@getStandartAudit');
		Route::post('auditor-skill-getClauseAudit','BackEnd\AuditorSkillControll@getClauseAudit');
		Route::post('auditor-skill-show','BackEnd\AuditorSkillControll@show');
		Route::post('auditor-skill-insert','BackEnd\AuditorSkillControll@store');
		Route::post('auditor-skill-edit','BackEnd\AuditorSkillControll@edit');
		Route::post('auditor-skill-update','BackEnd\AuditorSkillControll@update');
		Route::post('auditor-skill-delete','BackEnd\AuditorSkillControll@delete');

		Route::get('data-audit-plan','BackEnd\AuditPlantControll@index');
		Route::get('audit-plan/{Id}/exportJadwal','BackEnd\AuditPlantControll@exportJadwal')->name('export.audit-jadwal');
		Route::get('audit-plan/{Id}/exportTindakLanjut','BackEnd\AuditPlantControll@exportTindakLanjut')->name('export.audit-tindak-lanjut');
		Route::get('audit-plan/{Id}/exportAnalisis','BackEnd\AuditPlantControll@exportAnalisis')->name('export.audit-analisis');
		Route::get('audit-plan/{Id}/exportProgram','BackEnd\AuditPlantControll@exportProgram')->name('export.audit-program');
		Route::get('audit-plan-export','BackEnd\AuditPlantControll@exportExcel')->name('export.audit-excel');
		Route::post('audit-plan-getSelect','BackEnd\AuditPlantControll@getSelect');
		Route::post('audit-plan-getPosition','BackEnd\AuditPlantControll@getPosition');
		Route::post('audit-plan-getCriteria','BackEnd\AuditPlantControll@getCriteria');
		Route::post('audit-plan-getApproval','BackEnd\AuditPlantControll@getApproval');
		Route::post('audit-plan-approval','BackEnd\AuditPlantControll@approval');
		Route::post('audit-plan-publish','BackEnd\AuditPlantControll@publish');
		Route::post('audit-plan-getAuditeeDepartment','BackEnd\AuditPlantControll@getAuditeeDepartment');
		Route::post('audit-plan-show','BackEnd\AuditPlantControll@show');
		Route::post('audit-plan-insert','BackEnd\AuditPlantControll@store');
		Route::post('audit-plan-edit','BackEnd\AuditPlantControll@edit');
		Route::post('audit-plan-update','BackEnd\AuditPlantControll@update');
		Route::post('audit-plan-delete','BackEnd\AuditPlantControll@delete');

		Route::get('data-auditor-team','BackEnd\AuditorTeamControll@index');
		Route::get('auditor-team/{Id}/exportDaftarHadir','BackEnd\AuditorTeamControll@exportDaftarHadir')->name('export.audit-daftar-hadir');
		Route::post('auditor-team-getSelect','BackEnd\AuditorTeamControll@getSelect');
		Route::post('auditor-team-getObserver','BackEnd\AuditorTeamControll@getObserver');
		Route::post('auditor-team-getAuditorDepartment','BackEnd\AuditorTeamControll@getAuditorDepartment');
		Route::post('auditor-team-getApproval','BackEnd\AuditorTeamControll@getApproval');
		Route::post('auditor-team-getAuditee','BackEnd\AuditorTeamControll@getAuditee');
		Route::post('auditor-team-approval','BackEnd\AuditorTeamControll@approval');
		Route::post('auditor-team-publish','BackEnd\AuditorTeamControll@publish');
		Route::post('auditor-team-getAuditeeDepartment','BackEnd\AuditorTeamControll@getAuditeeDepartment');
		Route::post('auditor-team-show','BackEnd\AuditorTeamControll@show');
		Route::post('auditor-team-insert','BackEnd\AuditorTeamControll@store');
		Route::post('auditor-team-edit','BackEnd\AuditorTeamControll@edit');
		Route::post('auditor-team-update','BackEnd\AuditorTeamControll@update');
		Route::post('auditor-team-delete','BackEnd\AuditorTeamControll@delete');
		Route::post('auditor-team-close','BackEnd\AuditorTeamControll@closeData');

		Route::get('data-auditor-report','BackEnd\AuditorReportControll@index');
		Route::get('auditor-report/{Id}/exportStatusAudit','BackEnd\AuditorReportControll@exportStatusAudit')->name('export.audit-status-audit');
		Route::post('auditor-report-getSelect','BackEnd\AuditorReportControll@getSelect');
		Route::post('auditor-report-getAuditDetail','BackEnd\AuditorReportControll@getAuditDetail');
		Route::post('auditor-report-getFoundCriteria','BackEnd\AuditorReportControll@getFoundCriteria');
		Route::post('auditor-report-getApprovalEmployee','BackEnd\AuditorReportControll@getApprovalEmployee');
		Route::post('auditor-report-show','BackEnd\AuditorReportControll@show');
		Route::post('auditor-report-insert','BackEnd\AuditorReportControll@store');
		Route::post('auditor-report-edit','BackEnd\AuditorReportControll@edit');
		Route::post('auditor-report-update','BackEnd\AuditorReportControll@update');
		Route::post('auditor-report-delete','BackEnd\AuditorReportControll@delete');
		Route::post('auditor-report-publish','BackEnd\AuditorReportControll@publish');
		Route::post('auditor-report-close','BackEnd\AuditorReportControll@closeData');
		Route::post('auditor-report/{Id}/approveData','BackEnd\AuditorReportControll@approveData');
		Route::post('auditor-report/{Id}/rejectData','BackEnd\AuditorReportControll@rejectData');

		Route::get('data-plan-capa-report','BackEnd\PlanCapaReportControll@index');
		Route::post('plan-capa-report-getSelect','BackEnd\PlanCapaReportControll@getSelect');
		Route::post('plan-capa-report-getAuditDetail','BackEnd\PlanCapaReportControll@getAuditDetail');
		Route::post('plan-capa-report-getApprovalEmployee','BackEnd\PlanCapaReportControll@getApprovalEmployee');
		Route::post('plan-capa-report-show','BackEnd\PlanCapaReportControll@show');
		Route::post('plan-capa-report-insert','BackEnd\PlanCapaReportControll@store');
		Route::post('plan-capa-report-edit','BackEnd\PlanCapaReportControll@edit');
		Route::post('plan-capa-report-update','BackEnd\PlanCapaReportControll@update');
		Route::post('plan-capa-report-delete','BackEnd\PlanCapaReportControll@delete');
		Route::post('plan-capa-report-publish','BackEnd\PlanCapaReportControll@publish');
		Route::post('plan-capa-report-sendEmail','BackEnd\PlanCapaReportControll@sendMail');
		Route::post('plan-capa-report/{Id}/approveData','BackEnd\PlanCapaReportControll@approveData');
		Route::post('plan-capa-report/{Id}/rejectData','BackEnd\PlanCapaReportControll@rejectData');

		Route::get('data-verification-capa-report','BackEnd\VerificationCapaReportControll@index');
		Route::get('verification-capa-report/{Id}/exportHasilAudit','BackEnd\VerificationCapaReportControll@exportHasilAudit')->name('export.audit-hasil-audit');
		Route::post('verification-capa-report-getSelect','BackEnd\VerificationCapaReportControll@getSelect');
		Route::post('verification-capa-report-getAuditDetail','BackEnd\VerificationCapaReportControll@getAuditDetail');
		Route::post('verification-capa-report-getApprovalEmployee','BackEnd\VerificationCapaReportControll@getApprovalEmployee');
		Route::post('verification-capa-report-show','BackEnd\VerificationCapaReportControll@show');
		Route::post('verification-capa-report-insert','BackEnd\VerificationCapaReportControll@store');
		Route::post('verification-capa-report-edit','BackEnd\VerificationCapaReportControll@edit');
		Route::post('verification-capa-report-update','BackEnd\VerificationCapaReportControll@update');
		Route::post('verification-capa-report-delete','BackEnd\VerificationCapaReportControll@delete');
		Route::post('verification-capa-report-publish','BackEnd\VerificationCapaReportControll@publish');
		Route::post('verification-capa-report-publish-revisi','BackEnd\VerificationCapaReportControll@publishRevisi');
		Route::post('verification-capa-report-revisi','BackEnd\VerificationCapaReportControll@storeRevisi');
		Route::post('verification-capa-report-revisi-update','BackEnd\VerificationCapaReportControll@updateRevisi');
		Route::post('verification-capa-report/{Id}/approveData','BackEnd\VerificationCapaReportControll@approveData');
		Route::post('verification-capa-report/{Id}/rejectData','BackEnd\VerificationCapaReportControll@rejectData');

		Route::get('data-approval-auditor-report','BackEnd\ApprovalAuditorReportControll@index');
		Route::post('approval-auditor-report-show','BackEnd\ApprovalAuditorReportControll@show');
		Route::post('approval-auditor-report-approveData','BackEnd\ApprovalAuditorReportControll@approveData');
		Route::post('approval-auditor-report-rejectData','BackEnd\ApprovalAuditorReportControll@rejectData');

		Route::get('data-approval-plan-capa-report','BackEnd\ApprovalPlanCapaReportControll@index');
		Route::post('approval-plan-capa-report-show','BackEnd\ApprovalPlanCapaReportControll@show');
		Route::post('approval-plan-capa-report-approveData','BackEnd\ApprovalPlanCapaReportControll@approveData');
		Route::post('approval-plan-capa-report-rejectData','BackEnd\ApprovalPlanCapaReportControll@rejectData');

		Route::get('data-approval-verification-capa-report','BackEnd\ApprovalVerificationCapaReportControll@index');
		Route::post('approval-verification-capa-report-show','BackEnd\ApprovalVerificationCapaReportControll@show');
		Route::post('approval-verification-capa-report-approveData','BackEnd\ApprovalVerificationCapaReportControll@approveData');
		Route::post('approval-verification-capa-report-rejectData','BackEnd\ApprovalVerificationCapaReportControll@rejectData');

		Route::get('data-approval-audit-plan','BackEnd\ApprovalAuditPlanControll@index');
		Route::post('approval-audit-plan-show','BackEnd\ApprovalAuditPlanControll@show');
		Route::post('approval-audit-plan-approveData','BackEnd\ApprovalAuditPlanControll@approveData');
		Route::post('approval-audit-plan-rejectData','BackEnd\ApprovalAuditPlanControll@rejectData');

		Route::get('data-approval-auditor-team','BackEnd\ApprovalAuditorTeamControll@index');
		Route::post('approval-auditor-team-show','BackEnd\ApprovalAuditorTeamControll@show');
		Route::post('approval-auditor-team-approveData','BackEnd\ApprovalAuditorTeamControll@approveData');
		Route::post('approval-auditor-team-rejectData','BackEnd\ApprovalAuditorTeamControll@rejectData');

		Route::get('data-email-template','BackEnd\EmailTemplateControll@index');
		Route::post('email-template-getSelect','BackEnd\EmailTemplateControll@getSelect');
		Route::post('email-template-show','BackEnd\EmailTemplateControll@show');
		Route::post('email-template-insert','BackEnd\EmailTemplateControll@store');
		Route::post('email-template-edit','BackEnd\EmailTemplateControll@edit');
		Route::post('email-template-update','BackEnd\EmailTemplateControll@update');
		Route::post('email-template-delete','BackEnd\EmailTemplateControll@delete');

		Route::get('data-glossary-of-terms','BackEnd\GlossaryOfTermsControll@index');
		Route::post('glossary-of-terms-show','BackEnd\GlossaryOfTermsControll@show');
		Route::post('glossary-of-terms-insert','BackEnd\GlossaryOfTermsControll@store');
		Route::post('glossary-of-terms-edit','BackEnd\GlossaryOfTermsControll@edit');
		Route::post('glossary-of-terms-update','BackEnd\GlossaryOfTermsControll@update');
		Route::post('glossary-of-terms-delete','BackEnd\GlossaryOfTermsControll@delete');
		Route::post('glossary-of-terms-search','BackEnd\GlossaryOfTermsControll@search');
		Route::post('notification-read','BackEnd\GlossaryOfTermsControll@notificationRead');

		Route::get('data-manual-book','BackEnd\ManualBookControll@index');
		Route::post('manual-book-insert','BackEnd\ManualBookControll@store');
		Route::post('manual-book-getSelect','BackEnd\ManualBookControll@getSelect');
		Route::post('manual-book-edit','BackEnd\ManualBookControll@edit');
		Route::post('manual-book-update','BackEnd\ManualBookControll@update');
		Route::post('manual-book-delete','BackEnd\ManualBookControll@delete');

		Route::post('dashboard-getSelect','BackEnd\DashboardControll@getSelect');
		Route::post('dashboard-getAuditTemuan','BackEnd\DashboardControll@getAuditTemuan');
		Route::post('dashboard-getAuditClause','BackEnd\DashboardControll@getAuditClause');
		Route::post('dashboard-getAuditClauseTable','BackEnd\DashboardControll@getAuditClauseTable');
		Route::post('dashboard-getOutstandingAudit','BackEnd\DashboardControll@getOutstandingAudit');
		
	});
});
