"use strict";(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[6528],{47568:function(t,i,a){var s=a(23645),e=a.n(s)()((function(t){return t[1]}));e.push([t.id,".td-first-child{width:9rem}",""]),i.Z=e},49244:function(t,i,a){var s=a(23645),e=a.n(s)()((function(t){return t[1]}));e.push([t.id,".user-view-table{table-layout:fixed}.user-view-table td{border:0;padding-left:0;padding-right:0}.user-view-table td:first-child{width:9rem}.user-view-table td:not(:first-child){min-width:12rem}.user-edit-fileinput{height:1px;opacity:0;position:absolute;visibility:hidden;width:1px}.user-edit-multiselect~.select2-container{width:100%!important}",""]),i.Z=e},56528:function(t,i,a){a.r(i),a.d(i,{default:function(){return o}});var s={name:"show-division",metaInfo:{title:"Detail Plan Capa Report"},components:{},data:function(){return{field:{},detailApproval:[]}},methods:{getData:function(t){axios.post("/AdminVue/plan-capa-report-show",{Id:t}).then(function(t){var i=t.data;this.field=i.data,this.detailApproval=i.Approval}.bind(this)).catch((function(t){console.log(t)}))},backIndex:function(){this.$router.push("/RoleAdmin/approval/data-approval-plan-capa-report")}},mounted:function(){if(this.$route.params.Id){var t=this.$route.params.Id;t&&this.getData(t)}}},e=(a(64890),a(93379)),n=a.n(e),d=a(47568),l={insert:"head",singleton:!1},o=(n()(d.Z,l),d.Z.locals,(0,a(51900).Z)(s,(function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("b-card",{staticClass:"mb-0",attrs:{header:"Detail / Data Plan Capa Report","header-tag":"h4","no-body":""}},[a("b-card-body",[a("h6",{staticClass:"font-weight-semibold"},[t._v("\n\t      Data Plan Capa Report\n\t    ")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("ID Audit")]),t._v("\n\t        "+t._s(t.field.NoTrans)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Ref Number")]),t._v("\n\t        "+t._s(t.field.RefNumber)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Departement Auditee")]),t._v("\n\t        "+t._s(t.field.AuditeeDepartment)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Kondisi Saat Ini")]),t._v("\n\t        "+t._s(t.field.ConditionNow)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Gap Analysis")]),t._v("\n\t        "+t._s(t.field.GapAnalysis)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Penyebab / Potensi Penyebab Ketidaksesuaian")]),t._v("\n\t        "+t._s(t.field.PotentialCauseNonConformitiy)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Tindakan Korektif")]),t._v("\n\t        "+t._s(t.field.CorrectiveAction)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Eksekusi Tindakan Korektif")]),t._v("\n\t        "+t._s(t.field.ExecutionPlaneCorrective)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Tindakan Preventif")]),t._v("\n\t        "+t._s(t.field.PreventiveAction)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Eksekusi Tindakan Preventif")]),t._v("\n\t        "+t._s(t.field.ExecutionPreventiveAction)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("CreateAt")]),t._v("\n\t        "+t._s(t.field.CreateAt)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("UpdateAt")]),t._v("\n\t        "+t._s(t.field.UpdateAt)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("UserEntry")]),t._v("\n\t        "+t._s(t.field.UserEntry)+"\n\t      ")])]),t._v(" "),a("hr"),t._v(" "),a("h6",{staticClass:"font-weight-semibold"},[t._v("\n\t      Approval Plan Capa Report\n\t    ")]),t._v(" "),t._l(t.detailApproval,(function(i,s){return a("div",{key:s,staticClass:"row"},[a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Nama Karyawan")]),t._v("\n\t        "+t._s(i.Name)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Type")]),t._v(" "),0==s?a("div",[t._v("\n\t\t\t\tHead Auditee\n\t\t\t")]):1==s&&t.field.LeadAuditor==i.IdEmployeApproval?a("div",[t._v("\n\t\t\t\tLead Auditor\n\t\t\t")]):1==s&&t.field.LeadAuditor!=i.IdEmployeApproval?a("div",[t._v("\n\t\t\t\tAuditor\n\t\t\t")]):a("div",[t._v("\n\t\t\t\tManajemen Representatif\n\t\t\t")])]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Status")]),t._v(" "),1==i.Status?a("div",[t._v("\n\t\t\t\tBelum Disetujui\n\t\t\t")]):2==i.Status?a("div",[t._v("\n\t\t\t\tSudah Disetujui\n\t\t\t")]):a("div",[t._v("\n\t\t\t\tDitolak\n\t\t\t")])])])})),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(i){return t.backIndex()}}},[t._v("Back")])],1)])],2),t._v(" "),a("hr",{staticClass:"m-0"})],1)],1)}),[],!1,null,null,null).exports)},64890:function(t,i,a){var s=a(93379),e=a.n(s),n=a(49244),d={insert:"head",singleton:!1};e()(n.Z,d),n.Z.locals}}]);