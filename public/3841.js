"use strict";(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[3841],{24741:function(t,i,a){var e=a(23645),n=a.n(e)()((function(t){return t[1]}));n.push([t.id,".td-first-child{width:9rem}",""]),i.Z=n},49244:function(t,i,a){var e=a(23645),n=a.n(e)()((function(t){return t[1]}));n.push([t.id,".user-view-table{table-layout:fixed}.user-view-table td{border:0;padding-left:0;padding-right:0}.user-view-table td:first-child{width:9rem}.user-view-table td:not(:first-child){min-width:12rem}.user-edit-fileinput{height:1px;opacity:0;position:absolute;visibility:hidden;width:1px}.user-edit-multiselect~.select2-container{width:100%!important}",""]),i.Z=n},34994:function(t,i,a){a.r(i),a.d(i,{default:function(){return d}});var e={name:"show-province",metaInfo:{title:"Detail Provinsi"},components:{},data:function(){return{field:{}}},methods:{getData:function(t){axios.post("/AdminVue/province-show",{Id:t}).then(function(t){var i=t.data;this.field=i.data}.bind(this)).catch((function(t){console.log(t)}))},backIndex:function(){this.$router.push("/RoleAdmin/master/data-province")}},mounted:function(){if(this.$route.params.Id){var t=this.$route.params.Id;t&&this.getData(t)}}},n=(a(64890),a(93379)),s=a.n(n),r=a(24741),o={insert:"head",singleton:!1},d=(s()(r.Z,o),r.Z.locals,(0,a(51900).Z)(e,(function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("b-card",{staticClass:"mb-0",attrs:{header:"Detail / Data Provinsi","header-tag":"h4","no-body":""}},[a("b-card-body",[a("h6",{staticClass:"font-weight-semibold"},[t._v("\n\t      Data Provinsi\n\t    ")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Provinsi")]),t._v("\n\t        "+t._s(t.field.Name)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-md-4 mb-3"},[a("div",{staticClass:"font-weight-semibold"},[t._v("Negara")]),t._v("\n\t        "+t._s(t.field.Country)+"\n\t      ")]),t._v(" "),a("div",{staticClass:"col-12"},[a("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(i){return t.backIndex()}}},[t._v("Back")])],1)])]),t._v(" "),a("hr",{staticClass:"m-0"})],1)],1)}),[],!1,null,null,null).exports)},64890:function(t,i,a){var e=a(93379),n=a.n(e),s=a(49244),r={insert:"head",singleton:!1};n()(s.Z,r),s.Z.locals}}]);