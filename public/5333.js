"use strict";(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[5333],{27481:function(t,i,s){var a=s(23645),e=s.n(a)()((function(t){return t[1]}));e.push([t.id,".td-first-child{width:9rem}",""]),i.Z=e},49244:function(t,i,s){var a=s(23645),e=s.n(a)()((function(t){return t[1]}));e.push([t.id,".user-view-table{table-layout:fixed}.user-view-table td{border:0;padding-left:0;padding-right:0}.user-view-table td:first-child{width:9rem}.user-view-table td:not(:first-child){min-width:12rem}.user-edit-fileinput{height:1px;opacity:0;position:absolute;visibility:hidden;width:1px}.user-edit-multiselect~.select2-container{width:100%!important}",""]),i.Z=e},35333:function(t,i,s){s.r(i),s.d(i,{default:function(){return o}});var a={name:"show-division",metaInfo:{title:"Detail Auditor Team"},components:{},data:function(){return{field:{}}},methods:{getData:function(t){axios.post("/AdminVue/auditor-team-show",{Id:t}).then(function(t){var i=t.data;this.field=i.data}.bind(this)).catch((function(t){console.log(t)}))},getStringClause:function(t){for(var i="",s=0;s<t.length;s++)i=""!=i?i.concat(", ",t[s].Clause):t[s].Clause;return i},backIndex:function(){this.$router.push("/RoleAdmin/audit/data-auditor-team")}},mounted:function(){if(this.$route.params.Id){var t=this.$route.params.Id;t&&this.getData(t)}}},e=(s(64890),s(93379)),n=s.n(e),d=s(27481),l={insert:"head",singleton:!1},o=(n()(d.Z,l),d.Z.locals,(0,s(51900).Z)(a,(function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("b-card",{staticClass:"mb-0",attrs:{header:"Detail / Data Auditor Team","header-tag":"h4","no-body":""}},[s("b-card-body",[s("h6",{staticClass:"font-weight-semibold"},[t._v("\n\t      Data Auditor Team\n\t    ")]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("ID Audit")]),t._v("\n\t        "+t._s(t.field.NoTrans)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("Departement Auditee")]),t._v("\n\t        "+t._s(t.field.AuditeeDepartment)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("Pemberi Persetujuan")]),t._v("\n\t        "+t._s(t.field.EmpApproved)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("Tanggal Audit")]),t._v("\n\t        "+t._s(t.field.AuditDate)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("Jam Mulai")]),t._v("\n\t        "+t._s(t.field.HourStart)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("Jam Berakhir")]),t._v("\n\t        "+t._s(t.field.HourDone)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("CreateAt")]),t._v("\n\t        "+t._s(t.field.CreateAt)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("UpdateAt")]),t._v("\n\t        "+t._s(t.field.UpdateAt)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("UserEntry")]),t._v("\n\t        "+t._s(t.field.UserEntry)+"\n\t      ")])]),t._v(" "),s("hr",{staticClass:"m-0"}),t._v(" "),s("h6",{staticClass:"font-weight-semibold"},[t._v("\n\t      Data Standart Audit\n\t    ")]),t._v(" "),t._l(t.field.ClauseAudit,(function(i,a){return s("div",{key:a,staticClass:"row"},[s("div",{staticClass:"col-md-4 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("Standart Audit")]),t._v("\n\t        "+t._s(i.Standart)+"\n\t      ")]),t._v(" "),s("div",{staticClass:"col-md-8 mb-3"},[s("div",{staticClass:"font-weight-semibold"},[t._v("Clause")]),t._v("\n\t        "+t._s(t.getStringClause(JSON.parse(i.Clause)))+"\n\t      ")])])})),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(i){return t.backIndex()}}},[t._v("Back")])],1)])],2),t._v(" "),s("hr",{staticClass:"m-0"})],1)],1)}),[],!1,null,null,null).exports)},64890:function(t,i,s){var a=s(93379),e=s.n(a),n=s(49244),d={insert:"head",singleton:!1};e()(n.Z,d),n.Z.locals}}]);