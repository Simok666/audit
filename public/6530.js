"use strict";(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[6530],{50457:function(t,i,a){var s=a(23645),e=a.n(s)()((function(t){return t[1]}));e.push([t.id,".td-first-child{width:9rem}",""]),i.Z=e},49244:function(t,i,a){var s=a(23645),e=a.n(s)()((function(t){return t[1]}));e.push([t.id,".user-view-table{table-layout:fixed}.user-view-table td{border:0;padding-left:0;padding-right:0}.user-view-table td:first-child{width:9rem}.user-view-table td:not(:first-child){min-width:12rem}.user-edit-fileinput{height:1px;opacity:0;position:absolute;visibility:hidden;width:1px}.user-edit-multiselect~.select2-container{width:100%!important}",""]),i.Z=e},6530:function(t,i,a){a.r(i),a.d(i,{default:function(){return o}});var s={name:"show-domain",metaInfo:{title:"Detail Clause Audit"},components:{},data:function(){return{field:{}}},methods:{getData:function(t){axios.post("/AdminVue/standart-audit-showClause",{Id:t}).then(function(t){var i=t.data;this.field=i.data}.bind(this)).catch((function(t){console.log(t)}))},backIndex:function(){this.$router.push("/RoleAdmin/master/data-standart-audit")}},mounted:function(){if(this.$route.params.Id){var t=this.$route.params.Id;t&&this.getData(t)}}},e=(a(64890),a(93379)),n=a.n(e),d=a(50457),l={insert:"head",singleton:!1},o=(n()(d.Z,l),d.Z.locals,(0,a(51900).Z)(s,(function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("b-card",{staticClass:"mb-0",attrs:{header:"Detail / Data Clause Audit","header-tag":"h4","no-body":""}},[a("b-card-body",[a("h6",{staticClass:"font-weight-semibold"},[t._v("\n\t      Data Clause Audit\n\t    ")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Standart Audit")]),t._v("\n\t        "+t._s(t.field.Standart)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Clause")]),t._v("\n\t        "+t._s(t.field.Clause)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Persyaratan")]),t._v("\n\t        "+t._s(t.field.Requirements)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Detail Persyaratan")]),t._v("\n\t        "+t._s(t.field.RequirementsDetail)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("CreateAt")]),t._v("\n\t        "+t._s(t.field.CreateAt)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("UpdateAt")]),t._v("\n\t        "+t._s(t.field.UpdateAt)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("UserEntry")]),t._v("\n\t        "+t._s(t.field.UserEntry)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-12"},[a("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(i){return t.backIndex()}}},[t._v("Back")])],1)])]),t._v(" "),a("hr",{staticClass:"m-0"})],1)],1)}),[],!1,null,null,null).exports)},64890:function(t,i,a){var s=a(93379),e=a.n(s),n=a(49244),d={insert:"head",singleton:!1};e()(n.Z,d),n.Z.locals}}]);