"use strict";(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[1692],{61692:function(t,a,i){i.r(a),i.d(a,{default:function(){return s}});i(30381);var e={name:"form-domain",metaInfo:{title:"Form Domain"},components:{},data:function(){return{urlSubmit:"/AdminVue/domain-insert",headerCard:"Form / Create Data Domain",textBtnSubmit:"Create",field:{},allErrors:[],opsStatus:[{value:1,text:"Aktif"},{value:0,text:"Tidak Aktif"}],isNotif:!1,alertNotif:"",alertVariant:"alert-dark-danger"}},methods:{submitForm:function(){var t=new FormData;t.append("Id",this.field.Id),t.append("Name",this.field.Name),t.append("Status",this.field.Status.value),t.append("Description",this.field.Description);axios.post(this.urlSubmit,t,{headers:{"content-type":"multipart/form-data"}}).then(function(t){var a=t.data;a.status?this.$router.push({name:"master/data-domain",params:{isNotif:!0,gNotif:"notifications-success",tNotif:this.textBtnSubmit+" Data Success",txNotif:"Save Data Success!"}}):(this.isNotif=!0,this.alertNotif=a.message,this.alertVariant="alert-dark-danger",this.allErrors=a.validation)}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},getData:function(t){axios.post("/AdminVue/domain-edit",{Id:t}).then(function(t){var a=t.data;this.field=a.data}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},backIndex:function(){this.$router.push("/RoleAdmin/master/data-domain")}},mounted:function(){if(this.$route.params.isFormEdit){var t=this.$route.params.Id;t&&(this.getData(t),this.field.Id=t,this.urlSubmit="/AdminVue/domain-update",this.headerCard="Form / Edit Data Domain",this.textBtnSubmit="Update")}}},s=(0,i(51900).Z)(e,(function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("b-card",{staticClass:"mb-4",attrs:{header:t.headerCard,"header-tag":"h4"}},[t.isNotif?i("div",{staticClass:"alert alert-dismissible fade show",class:[t.alertVariant]},[i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert"},on:{click:function(a){t.isNotif=!t.isNotif}}},[t._v("×")]),t._v("\n      "+t._s(t.alertNotif)+"\n    ")]):t._e(),t._v(" "),i("form",{attrs:{method:"POST"},on:{submit:function(a){return a.preventDefault(),t.submitForm()}}},[i("b-form-row",[i("b-form-group",{staticClass:"col-md-6"},[i("label",{staticClass:"form-label"},[t._v("Domain")]),t._v(" "),i("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),i("b-input",{staticClass:"mb-1",attrs:{name:"Name",state:!t.allErrors.Name&&null,required:""},model:{value:t.field.Name,callback:function(a){t.$set(t.field,"Name",a)},expression:"field.Name"}}),t._v(" "),t.allErrors.Name?i("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.Name[0]))]):t._e()],1),t._v(" "),i("b-form-group",{staticClass:"col-md-6"},[i("label",{staticClass:"form-label"},[t._v("Status")]),t._v(" "),i("multiselect",{attrs:{options:t.opsStatus,"allow-empty":!1,"preselect-first":!0,"show-labels":!1,placeholder:"Pilih Status",label:"text","track-by":"text"},model:{value:t.field.Status,callback:function(a){t.$set(t.field,"Status",a)},expression:"field.Status"}}),t._v(" "),t.allErrors.Group?i("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.Group[0]))]):t._e()],1)],1),t._v(" "),i("b-form-row",[i("b-form-group",{staticClass:"col-md-6"},[i("label",{staticClass:"form-label"},[t._v("Deskripsi")]),t._v(" "),i("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),i("b-form-textarea",{attrs:{name:"Description",rows:"3","no-resize":""},model:{value:t.field.Description,callback:function(a){t.$set(t.field,"Description",a)},expression:"field.Description"}}),t._v(" "),t.allErrors.Description?i("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.Description[0]))]):t._e()],1)],1),t._v(" "),i("b-form-row",[i("b-form-group",{staticClass:"col-md-6"}),t._v(" "),i("b-form-group",{staticClass:"col-md-6",attrs:{label:""}},[i("b-btn",{staticClass:"float-right ml-2",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.textBtnSubmit))]),t._v(" "),i("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(a){return t.backIndex()}}},[t._v("Back")])],1)],1)],1)])],1)}),[],!1,null,null,null).exports}}]);