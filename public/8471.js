"use strict";(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[8471],{48471:function(t,a,i){i.r(a),i.d(a,{default:function(){return s}});var e={name:"form-city",metaInfo:{title:"Form Kota / Kabupaten"},components:{},data:function(){return{urlSubmit:"/AdminVue/city-insert",headerCard:"Form / Create Data Kota / Kabupaten",textBtnSubmit:"Create",field:{},allErrors:[],isNotif:!1,alertNotif:"",alertVariant:"alert-dark-danger",opsProvince:[]}},methods:{submitForm:function(){var t=new FormData;t.append("Id",this.field.Id),t.append("Name",this.field.Name),this.field.IdProvince&&t.append("IdProvince",this.field.IdProvince.Id);axios.post(this.urlSubmit,t,{headers:{"content-type":"multipart/form-data"}}).then(function(t){var a=t.data;a.status?this.$router.push({name:"master/data-city",params:{isNotif:!0,gNotif:"notifications-success",tNotif:this.textBtnSubmit+" Data Success",txNotif:"Save Data Success!"}}):(this.isNotif=!0,this.alertNotif=a.message,this.alertVariant="alert-dark-danger",this.allErrors=a.validation,this.scrollTop(0,1e3))}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},getData:function(t){axios.post("/AdminVue/city-edit",{Id:t}).then(function(t){var a=t.data;this.field=a.data}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},getProvince:function(){axios.post("/AdminVue/city-get-province").then(function(t){this.opsProvince=t.data.data}.bind(this)).catch(function(t){console.log(t),this.opsProvince=[]}.bind(this))},backIndex:function(){this.$router.push("/RoleAdmin/master/data-city")},convertSelectBox:function(t){var a=t.Province;t.Id;return"".concat(a)}},mounted:function(){if(this.getProvince(),this.$route.params.isFormEdit){var t=this.$route.params.Id;t&&(this.getData(t),this.field.Id=t,this.urlSubmit="/AdminVue/city-update",this.headerCard="Form / Edit Data Kota / Kabupaten",this.textBtnSubmit="Update")}}},s=(0,i(51900).Z)(e,(function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("b-card",{staticClass:"mb-4",attrs:{header:t.headerCard,"header-tag":"h4"}},[t.isNotif?i("div",{staticClass:"alert alert-dismissible fade show",class:[t.alertVariant]},[i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert"},on:{click:function(a){t.isNotif=!t.isNotif}}},[t._v("×")]),t._v("\n      "+t._s(t.alertNotif)+"\n    ")]):t._e(),t._v(" "),i("form",{attrs:{method:"POST"},on:{submit:function(a){return a.preventDefault(),t.submitForm()}}},[i("b-form-row",[i("b-form-group",{staticClass:"col-md-6"},[i("label",{staticClass:"form-label"},[t._v("Kota / Kabupaten")]),t._v(" "),i("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),i("b-input",{staticClass:"mb-1",attrs:{name:"Name",state:!t.allErrors.Name&&null,required:""},model:{value:t.field.Name,callback:function(a){t.$set(t.field,"Name",a)},expression:"field.Name"}}),t._v(" "),t.allErrors.Name?i("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.Name[0]))]):t._e()],1),t._v(" "),i("b-form-group",{staticClass:"col-md-6"},[i("label",{staticClass:"form-label"},[t._v("Provinsi")]),t._v(" "),i("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),i("multiselect",{attrs:{options:t.opsProvince,"allow-empty":!1,"show-labels":!1,placeholder:"Pilih Provinsi",label:"Province","track-by":"Province"},model:{value:t.field.IdProvince,callback:function(a){t.$set(t.field,"IdProvince",a)},expression:"field.IdProvince"}}),t._v(" "),t.allErrors.IdProvince?i("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.IdProvince[0]))]):t._e()],1)],1),t._v(" "),i("b-form-row",[i("b-form-group",{staticClass:"col-md-6"}),t._v(" "),i("b-form-group",{staticClass:"col-md-6",attrs:{label:""}},[i("b-btn",{staticClass:"float-right ml-2",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.textBtnSubmit))]),t._v(" "),i("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(a){return t.backIndex()}}},[t._v("Back")])],1)],1)],1)])],1)}),[],!1,null,null,null).exports}}]);