"use strict";(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[2137],{12137:function(t,a,i){i.r(a),i.d(a,{default:function(){return e}});var s={name:"form-pos-code",metaInfo:{title:"Form Kode Pos"},components:{},data:function(){return{urlSubmit:"/AdminVue/pos-code-insert",headerCard:"Form / Create Data Kode Pos",textBtnSubmit:"Create",field:{myFile:""},allErrors:[],isNotif:!1,alertNotif:"",alertVariant:"alert-dark-danger",opsDistrict:[]}},methods:{submitForm:function(){var t=new FormData;t.append("Id",this.field.Id),t.append("PosCode",this.field.PosCode),this.field.IdDistrict&&t.append("IdDistrict",this.field.IdDistrict.Id);axios.post(this.urlSubmit,t,{headers:{"content-type":"multipart/form-data"}}).then(function(t){var a=t.data;a.status?this.$router.push({name:"master/data-pos-code",params:{isNotif:!0,gNotif:"notifications-success",tNotif:this.textBtnSubmit+" Data Success",txNotif:"Save Data Success!"}}):(this.isNotif=!0,this.alertNotif=a.message,this.alertVariant="alert-dark-danger",this.allErrors=a.validation,this.scrollTop(0,1e3))}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},getData:function(t){axios.post("/AdminVue/pos-code-edit",{Id:t}).then(function(t){var a=t.data;this.field=a.data}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},getCity:function(){axios.post("/AdminVue/pos-code-get-district").then(function(t){this.opsDistrict=t.data.data}.bind(this)).catch(function(t){console.log(t),this.opsDistrict=[]}.bind(this))},backIndex:function(){this.$router.push("/RoleAdmin/master/data-pos-code")}},mounted:function(){if(this.getCity(),this.$route.params.isFormEdit){var t=this.$route.params.Id;t&&(this.getData(t),this.field.Id=t,this.urlSubmit="/AdminVue/pos-code-update",this.headerCard="Form / Edit Data Kode Pos",this.textBtnSubmit="Update")}}},e=(0,i(51900).Z)(s,(function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("b-card",{staticClass:"mb-4",attrs:{header:t.headerCard,"header-tag":"h4"}},[t.isNotif?i("div",{staticClass:"alert alert-dismissible fade show",class:[t.alertVariant]},[i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert"},on:{click:function(a){t.isNotif=!t.isNotif}}},[t._v("×")]),t._v("\n      "+t._s(t.alertNotif)+"\n    ")]):t._e(),t._v(" "),i("form",{attrs:{method:"POST"},on:{submit:function(a){return a.preventDefault(),t.submitForm()}}},[i("b-form-row",[i("b-form-group",{staticClass:"col-md-6"},[i("label",{staticClass:"form-label"},[t._v("Kode Pos")]),t._v(" "),i("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),i("b-input",{staticClass:"mb-1",attrs:{name:"PosCode",state:!t.allErrors.PosCode&&null,required:""},model:{value:t.field.PosCode,callback:function(a){t.$set(t.field,"PosCode",a)},expression:"field.PosCode"}}),t._v(" "),t.allErrors.PosCode?i("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.PosCode[0]))]):t._e()],1),t._v(" "),i("b-form-group",{staticClass:"col-md-6"},[i("label",{staticClass:"form-label"},[t._v("Kecamatan")]),t._v(" "),i("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),i("multiselect",{attrs:{options:t.opsDistrict,"allow-empty":!1,"show-labels":!1,placeholder:"Pilih Kota / Kabupaten",label:"District","track-by":"District"},model:{value:t.field.IdDistrict,callback:function(a){t.$set(t.field,"IdDistrict",a)},expression:"field.IdDistrict"}}),t._v(" "),t.allErrors.IdDistrict?i("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.IdDistrict[0]))]):t._e()],1),t._v(" "),i("b-form-group",{staticClass:"col-md-6",attrs:{label:""}}),t._v(" "),i("b-form-group",{staticClass:"col-md-6",attrs:{label:""}},[i("b-btn",{staticClass:"float-right ml-2",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.textBtnSubmit))]),t._v(" "),i("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(a){return t.backIndex()}}},[t._v("Back")])],1)],1)],1)])],1)}),[],!1,null,null,null).exports}}]);