(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_audit_auditor-team_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-text-mask */ "./node_modules/vue-text-mask/dist/vueTextMask.js");
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_text_mask__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-auditor-team',
  metaInfo: {
    title: 'Form Auditor Team'
  },
  components: {
    MaskedInput: (vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default())
  },
  data: function data() {
    return {
      urlSubmit: '/AdminVue/auditor-team-insert',
      headerCard: 'Form / Create Data Auditor Team',
      textBtnSubmit: 'Create',
      field: {
        //   myFile : ''
        File: '',
        AuditClause: [{
          IdStandartAudit: '',
          StandartAudit: '',
          ClauseAudit: '',
          opsClauseAudit: []
        }],
        AuditeeDepartment: '',
        Purpose: '',
        Auditee: '',
        Auditor: '',
        LeadAuditor: '',
        Observer: ''
      },
      allErrors: [],
      opsIdAudit: [],
      opsAuditeeDepartment: [],
      opsAuditee: [],
      opsAuditor: [],
      opsLeadAuditor: [],
      opsObserver: [],
      clauseSelect: [],
      auditeeSelect: [],
      standartAuditSelect: [],
      opsEmployee: [],
      departmentAuditorSelect: [],
      departmentObserverSelect: [],
      oldFileAttachment: [],
      formatDate: 'dd/MM/yyyy',
      disabledDate: {},
      timeMask: [/\d/, /\d/, ':', /\d/, /\d/],
      isNotif: false,
      isFormEdit: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    };
  },
  methods: {
    submitForm: function submitForm() {
      var formData = new FormData();
      formData.append("Id", this.field.Id);
      formData.append("IdAuditPlane", this.field.IdAuditPlan.Id);
      formData.append("NoTrans", this.field.IdAuditPlan.NoTrans);
      formData.append("Approved", JSON.stringify(this.field.Approved));
      formData.append("IdDepartmentAuditee", this.field.AuditeeDepartment.IdDepartmentAuditee);
      formData.append("IdPositionAuditee", this.field.AuditeeDepartment.IdPositionAuditee);
      formData.append("AuditDate", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.AuditDate).format('MM/DD/YYYY'));
      formData.append("HourStart", this.field.HourStart);
      formData.append("HourDone", this.field.HourDone);
      formData.append("AuditClause", JSON.stringify(this.field.AuditClause));
      formData.append("Auditee", JSON.stringify(this.field.Auditee));
      formData.append("IdAuditorDepartment", JSON.stringify(this.departmentAuditorSelect));
      formData.append("Auditor", JSON.stringify(this.field.Auditor));
      formData.append("LeadAuditor", this.field.LeadAuditor.Id);
      formData.append("Observer", JSON.stringify(this.field.Observer));
      formData.append("IdDepartmentObserver", JSON.stringify(this.departmentObserverSelect));
      formData.append("Email", this.field.AuditeeDepartment.Email);

      for (var i = 0; i < this.field.File.length; i++) {
        var file = this.field.File[i];
        formData.append('FileAttachment[' + i + ']', file);
      }

      formData.append("OldFileAttachment", JSON.stringify(this.oldFileAttachment));
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;

        if (resp.status) {
          this.$router.push({
            name: 'audit/data-auditor-team',
            params: {
              isNotif: true,
              gNotif: 'notifications-success',
              tNotif: this.textBtnSubmit + ' Data Success',
              txNotif: 'Save Data Success!'
            }
          });
        } else {
          this.isNotif = true;
          this.alertNotif = resp.message;
          this.alertVariant = 'alert-dark-danger';
          this.allErrors = resp.validation;
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/auditor-team-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        this.field.File = [];

        if (this.field.Path != '') {
          var countPath = this.field.Path.length;

          for (var i = 0; i < countPath; i++) {
            this.oldFileAttachment.push(this.field.Path[i]);
            this.field.File.push("/" + this.field.Path[i]);
          }
        } else {
          this.oldFileAttachment = '';
        }

        this.departmentAuditorSelect = this.field.IdAuditorDepartment;
        this.departmentObserverSelect = this.field.IdDepartmentObserver;
        this.clauseSelect = this.field.ClauseSelect;
        this.standartAuditSelect = this.field.StandartAuditSelect;
        this.auditeeSelect = this.field.AuditeeSelect;
        var Year = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.OpeningMeeting).format('YYYY');
        var Month = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.OpeningMeeting).format('MM') - 1;
        var Day = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.OpeningMeeting).format('DD');
        this.disabledDate = {
          to: new Date(Year, Month, Day)
        };
        this.getAuditeeDepartment(this.field.IdAuditPlane, true);
        this.getAuditee(this.field.IdDepartmentAuditee, true);
        this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.auditeeSelect, true);
        this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.departmentAuditorSelect, this.auditeeSelect, true);
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/audit/data-auditor-team');
    },
    getSelect: function getSelect() {
      axios.post('/AdminVue/auditor-team-getSelect').then(function (res) {
        this.opsIdAudit = res.data.IdAudit;
        this.opsEmployee = res.data.employee;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsIdAudit = [];
        this.opsEmployee = [];
      }.bind(this));
    },
    getAuditeeDepartment: function getAuditeeDepartment(IdAuditPlan, statusEdit) {
      axios.post('/AdminVue/auditor-team-getAuditeeDepartment', {
        IdAuditPlan: IdAuditPlan,
        IdDepartmentAuditee: this.field.IdDepartmentAuditee,
        Status: statusEdit
      }).then(function (res) {
        this.opsAuditeeDepartment = res.data.AuditeeDepartment;

        if (statusEdit == false) {
          this.field.AuditeeDepartment = '';
          this.field.Auditee = '';
          this.field.LeadAuditor = '';
          this.field.Auditor = '';
          this.field.Observer = '';
          this.opsAuditee = [];
          this.opsAuditor = [];
          this.opsLeadAuditor = [];
          this.opsObserver = [];
          this.field.AuditClause = res.data.AuditClause;
          this.standartAuditSelect = res.data.StandartAudit;
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsAuditeeDepartment = [];
      }.bind(this));
    },
    getAuditorDepartment: function getAuditorDepartment(IdAuditeeDepartment, AuditeeSelect, statusEdit) {
      axios.post('/AdminVue/auditor-team-getAuditorDepartment', {
        IdAuditeeDepartment: IdAuditeeDepartment,
        StandartAudit: this.standartAuditSelect,
        AuditeeSelect: AuditeeSelect
      }).then(function (res) {
        this.opsAuditor = res.data.Auditor;
        this.opsLeadAuditor = res.data.Auditor;

        if (statusEdit == false) {
          this.field.LeadAuditor = '';
          this.field.Auditor = '';
          this.field.Observer = '';
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsAuditor = [];
        this.opsLeadAuditor = [];
      }.bind(this));
    },
    getAuditee: function getAuditee(IdAuditeeDepartment, statusEdit) {
      axios.post('/AdminVue/auditor-team-getAuditee', {
        IdAuditeeDepartment: IdAuditeeDepartment,
        StandartAudit: this.standartAuditSelect
      }).then(function (res) {
        this.opsAuditee = res.data.Auditee; // this.opsAuditor = res.data.Auditor
        // this.opsLeadAuditor = res.data.Auditor

        if (statusEdit == false) {
          this.field.Auditee = '';
          this.field.LeadAuditor = '';
          this.field.Auditor = '';
          this.field.Observer = '';
          this.opsObserver = [];
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsAuditee = [];
      }.bind(this));
    },
    getObserverDepartment: function getObserverDepartment(IdAuditeeDepartment, AuditorDepartment, AuditeeSelect, statusEdit) {
      axios.post('/AdminVue/auditor-team-getObserver', {
        IdAuditeeDepartment: IdAuditeeDepartment,
        AuditorDepartment: AuditorDepartment,
        AuditeeSelect: AuditeeSelect
      }).then(function (res) {
        this.opsObserver = res.data.Observer;

        if (statusEdit == false) {
          this.field.Observer = '';
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsObserver = [];
      }.bind(this));
    },
    getAuditDetail: function getAuditDetail(option) {
      this.field.Purpose = option.Purpose;
      var Year = moment__WEBPACK_IMPORTED_MODULE_0___default()(option.OpeningMeeting).format('YYYY');
      var Month = moment__WEBPACK_IMPORTED_MODULE_0___default()(option.OpeningMeeting).format('MM') - 1;
      var Day = moment__WEBPACK_IMPORTED_MODULE_0___default()(option.OpeningMeeting).format('DD');
      this.disabledDate = {
        to: new Date(Year, Month, Day)
      };
      this.getAuditeeDepartment(option.Id, false);
    },
    getDepartmentAuditeeDetail: function getDepartmentAuditeeDetail(option) {
      this.getAuditee(option.IdDepartmentAuditee, false); // if(this.clauseSelect.length > 0){
      //   this.getAuditorDepartment(option.IdDepartmentAuditee,this.clauseSelect,false)
      // }
    },
    getClauseDetail: function getClauseDetail(option) {// this.clauseSelect.push(option.Id)
      // this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.clauseSelect,false)
    },
    removeClauseDetail: function removeClauseDetail(option) {// let index = this.clauseSelect.indexOf(option.Id)
      // this.clauseSelect.splice(index,1)
      // this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee,this.clauseSelect,false)
    },
    getAuditeeDetail: function getAuditeeDetail(option) {
      this.auditeeSelect.push(option.Id);
      this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.auditeeSelect, false);
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.departmentAuditorSelect, this.auditeeSelect, false);
    },
    removeAuditeeDetail: function removeAuditeeDetail(option) {
      var index = this.auditeeSelect.indexOf(option.Id);
      this.auditeeSelect.splice(index, 1);
      this.getAuditorDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.auditeeSelect, false);
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.departmentAuditorSelect, this.auditeeSelect, false);
    },
    getAuditorDetail: function getAuditorDetail(option) {
      this.departmentAuditorSelect.push(option.IdDepartment);
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.departmentAuditorSelect, this.auditeeSelect, false);
    },
    removeAuditorDetail: function removeAuditorDetail(option) {
      var index = this.departmentAuditorSelect.indexOf(option.IdDepartment);
      this.departmentAuditorSelect.splice(index, 1);
      this.getObserverDepartment(this.field.AuditeeDepartment.IdDepartmentAuditee, this.departmentAuditorSelect, this.auditeeSelect, false);
    },
    getObserverDetail: function getObserverDetail(option) {
      this.departmentObserverSelect.push(option.IdDepartment);
    },
    removeObserverDetail: function removeObserverDetail(option) {
      console.log('Remove Observer');
      var index = this.departmentObserverSelect.indexOf(option.IdDepartment);
      this.departmentObserverSelect.splice(index, 1);
    },
    handleFile: function handleFile(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.File = files.map(function (files) {
        return files.file;
      }); // console.log( this.field.myFile )
    },
    priviewFile: function priviewFile() {
      if (this.oldFileAttachment != '') {
        for (var i = 0; i < this.oldFileAttachment.length; i++) {
          var file = "/" + this.oldFileAttachment[i];
          window.open(file, '_blank');
        }
      }
    },
    handleRemove: function handleRemove(error, files) {
      if (this.isFormEdit == true) {
        var index = this.oldFileAttachment.indexOf(files.source.replace('/clouds', 'clouds'));
        this.oldFileAttachment.splice(index, 1);
      }
    }
  },
  mounted: function mounted() {
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;

      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.isFormEdit = true;
        this.urlSubmit = '/AdminVue/auditor-team-update';
        this.headerCard = 'Form / Edit Data Auditor Team';
        this.textBtnSubmit = 'Update';
      }
    }

    this.getSelect();
  }
});

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/auditor-team/form.vue":
/*!*****************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/auditor-team/form.vue ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_6ae6dfe4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=6ae6dfe4& */ "./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=template&id=6ae6dfe4&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_6ae6dfe4___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_6ae6dfe4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/audit/auditor-team/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=template&id=6ae6dfe4&":
/*!************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=template&id=6ae6dfe4& ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_6ae6dfe4___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_6ae6dfe4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_6ae6dfe4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=6ae6dfe4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=template&id=6ae6dfe4&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=template&id=6ae6dfe4&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-team/form.vue?vue&type=template&id=6ae6dfe4& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "b-card",
        {
          staticClass: "mb-4",
          attrs: { header: _vm.headerCard, "header-tag": "h4" },
        },
        [
          _vm.isNotif
            ? _c(
                "div",
                {
                  staticClass: "alert alert-dismissible fade show",
                  class: [_vm.alertVariant],
                },
                [
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: { type: "button", "data-dismiss": "alert" },
                      on: {
                        click: function ($event) {
                          _vm.isNotif = !_vm.isNotif
                        },
                      },
                    },
                    [_vm._v("×")]
                  ),
                  _vm._v("\n      " + _vm._s(_vm.alertNotif) + "\n    "),
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "form",
            {
              attrs: { method: "POST" },
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.submitForm()
                },
              },
            },
            [
              _c(
                "b-form-row",
                [
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("ID Audit Plan"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsIdAudit,
                          "allow-empty": false,
                          "show-labels": false,
                          placeholder: "Pilih ID Audit Plan",
                          label: "NoTrans",
                          "track-by": "NoTrans",
                        },
                        on: { select: _vm.getAuditDetail },
                        model: {
                          value: _vm.field.IdAuditPlan,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "IdAuditPlan", $$v)
                          },
                          expression: "field.IdAuditPlan",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Organizer
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Organizer[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Approval"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsEmployee,
                          "allow-empty": false,
                          "show-labels": false,
                          multiple: true,
                          placeholder: "Pilih Approval Employee",
                          label: "Name",
                          "track-by": "Name",
                        },
                        model: {
                          value: _vm.field.Approved,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Approved", $$v)
                          },
                          expression: "field.Approved",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Approved
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Approved[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Purpose"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("b-form-textarea", {
                        attrs: {
                          name: "Purpose",
                          rows: "3",
                          "no-resize": "",
                          readonly: "",
                        },
                        model: {
                          value: _vm.field.Purpose,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Purpose", $$v)
                          },
                          expression: "field.Purpose",
                        },
                      }),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-form-row",
                [
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Audit Date"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("datepicker", {
                        staticClass: "mb-1",
                        attrs: {
                          format: _vm.formatDate,
                          state: _vm.allErrors.AuditDate ? false : null,
                          bootstrapStyling: true,
                          "disabled-dates": _vm.disabledDate,
                          required: "",
                        },
                        model: {
                          value: _vm.field.AuditDate,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "AuditDate", $$v)
                          },
                          expression: "field.AuditDate",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Hour Start"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("masked-input", {
                        staticClass: "form-control mb-1",
                        attrs: {
                          type: "text",
                          state: _vm.allErrors.HourStart ? false : null,
                          mask: _vm.timeMask,
                        },
                        model: {
                          value: _vm.field.HourStart,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "HourStart", $$v)
                          },
                          expression: "field.HourStart",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.HourStart
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.HourStart[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Hour End"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("masked-input", {
                        staticClass: "form-control mb-1",
                        attrs: {
                          type: "text",
                          state: _vm.allErrors.HourDone ? false : null,
                          mask: _vm.timeMask,
                        },
                        model: {
                          value: _vm.field.HourDone,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "HourDone", $$v)
                          },
                          expression: "field.HourDone",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.HourDone
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.HourDone[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-form-row",
                [
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-6" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Auditee Departement"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsAuditeeDepartment,
                          "allow-empty": false,
                          "show-labels": false,
                          placeholder: "Pilih Auditee Departement",
                          label: "Department",
                          "track-by": "Department",
                        },
                        on: { select: _vm.getDepartmentAuditeeDetail },
                        model: {
                          value: _vm.field.AuditeeDepartment,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "AuditeeDepartment", $$v)
                          },
                          expression: "field.AuditeeDepartment",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.AuditeeDepartment
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.AuditeeDepartment[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-6" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Auditee"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsAuditee,
                          "allow-empty": false,
                          "show-labels": false,
                          multiple: true,
                          placeholder: "Pilih Auditee",
                          label: "Employee",
                          "track-by": "Employee",
                        },
                        on: {
                          select: _vm.getAuditeeDetail,
                          remove: _vm.removeAuditeeDetail,
                        },
                        model: {
                          value: _vm.field.Auditee,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Auditee", $$v)
                          },
                          expression: "field.Auditee",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Auditee
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Auditee[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-card",
                {
                  staticClass: "mb-4",
                  scopedSlots: _vm._u([
                    {
                      key: "header",
                      fn: function () {
                        return [_c("h4", [_vm._v("Standart Audit")])]
                      },
                      proxy: true,
                    },
                  ]),
                },
                [
                  _vm._v(" "),
                  _vm._l(_vm.field.AuditClause, function (item, index) {
                    return _c(
                      "b-form-row",
                      { key: index },
                      [
                        _c(
                          "b-form-group",
                          { staticClass: "col-md-6" },
                          [
                            index == 0
                              ? _c("label", [_vm._v("Standart ")])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("b-input", {
                              staticClass: "mb-1",
                              attrs: {
                                name: "StandartAudit",
                                state: _vm.allErrors.StandartAudit
                                  ? false
                                  : null,
                                readonly: "",
                              },
                              model: {
                                value: item.StandartAudit,
                                callback: function ($$v) {
                                  _vm.$set(item, "StandartAudit", $$v)
                                },
                                expression: "item.StandartAudit",
                              },
                            }),
                            _vm._v(" "),
                            _vm.allErrors.StandartAudit
                              ? _c("span", { staticClass: "text-danger" }, [
                                  _vm._v(
                                    _vm._s(_vm.allErrors.StandartAudit[0])
                                  ),
                                ])
                              : _vm._e(),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-group",
                          { staticClass: "col-md-6" },
                          [
                            index == 0
                              ? _c("label", [_vm._v("Clause")])
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                staticClass:
                                  "form-label float-right text-danger",
                              },
                              [_vm._v("*Wajib Diisi")]
                            ),
                            _vm._v(" "),
                            _c("multiselect", {
                              attrs: {
                                options: item.opsClauseAudit,
                                "allow-empty": false,
                                "show-labels": false,
                                multiple: true,
                                placeholder: "Pilih Clause",
                                label: "Clause",
                                "track-by": "Clause",
                              },
                              on: {
                                select: _vm.getClauseDetail,
                                remove: _vm.removeClauseDetail,
                              },
                              model: {
                                value: item.ClauseAudit,
                                callback: function ($$v) {
                                  _vm.$set(item, "ClauseAudit", $$v)
                                },
                                expression: "item.ClauseAudit",
                              },
                            }),
                            _vm._v(" "),
                            _vm.allErrors.Organizer
                              ? _c("span", { staticClass: "text-danger" }, [
                                  _vm._v(_vm._s(_vm.allErrors.Organizer[0])),
                                ])
                              : _vm._e(),
                          ],
                          1
                        ),
                      ],
                      1
                    )
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "b-form-row",
                [
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Lead Auditor"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsLeadAuditor,
                          "allow-empty": true,
                          "show-labels": false,
                          placeholder: "Pilih Lead Auditor",
                          label: "Employee",
                          "track-by": "Employee",
                        },
                        on: {
                          select: _vm.getAuditorDetail,
                          remove: _vm.removeAuditorDetail,
                        },
                        model: {
                          value: _vm.field.LeadAuditor,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "LeadAuditor", $$v)
                          },
                          expression: "field.LeadAuditor",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.LeadAuditor
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.LeadAuditor[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Auditor"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsAuditor,
                          "allow-empty": false,
                          "show-labels": false,
                          multiple: true,
                          placeholder: "Pilih Auditor",
                          label: "Employee",
                          "track-by": "Employee",
                        },
                        on: {
                          select: _vm.getAuditorDetail,
                          remove: _vm.removeAuditorDetail,
                        },
                        model: {
                          value: _vm.field.Auditor,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Auditor", $$v)
                          },
                          expression: "field.Auditor",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Auditor
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Auditor[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Observer"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsObserver,
                          "allow-empty": true,
                          "show-labels": false,
                          multiple: true,
                          placeholder: "Pilih Observer",
                          label: "Employee",
                          "track-by": "Employee",
                        },
                        on: {
                          select: _vm.getObserverDetail,
                          remove: _vm.removeObserverDetail,
                        },
                        model: {
                          value: _vm.field.Observer,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Observer", $$v)
                          },
                          expression: "field.Observer",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Observer
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Observer[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-form-row",
                [
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-12" },
                    [
                      _c("label", [_vm._v("Attachment")]),
                      _vm._v(" "),
                      _c("file-pond", {
                        ref: "pondMyFile",
                        attrs: {
                          name: "File",
                          "label-idle": "Klik Untuk Menambahkan Attachment",
                          "allow-multiple": true,
                          files: _vm.field.File,
                          required: "",
                        },
                        on: {
                          updatefiles: _vm.handleFile,
                          removefile: _vm.handleRemove,
                        },
                      }),
                      _vm._v(" "),
                      _vm.textBtnSubmit == "Update"
                        ? _c(
                            "b-btn",
                            {
                              staticClass: "float-right",
                              attrs: { type: "button", variant: "secondary" },
                              on: {
                                click: function ($event) {
                                  return _vm.priviewFile()
                                },
                              },
                            },
                            [_vm._v("Preview File")]
                          )
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-form-row",
                [
                  _c("b-form-group", { staticClass: "col-md-6" }),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-6", attrs: { label: "" } },
                    [
                      _c(
                        "b-btn",
                        {
                          staticClass: "float-right ml-2",
                          attrs: { type: "submit", variant: "primary" },
                        },
                        [_vm._v(_vm._s(_vm.textBtnSubmit))]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-btn",
                        {
                          staticClass: "float-right",
                          attrs: { type: "button", variant: "secondary" },
                          on: {
                            click: function ($event) {
                              return _vm.backIndex()
                            },
                          },
                        },
                        [_vm._v("Back")]
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-text-mask/dist/vueTextMask.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-text-mask/dist/vueTextMask.js ***!
  \********************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.conformToMask=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=r(5),u=n(a);t.default={render:function(e){var t=this;return e("input",{ref:"input",domProps:{value:this.value},attrs:this.$attrs,on:Object.assign(o({},this.$listeners),{input:function(e){return t.updateValue(e.target.value)}})})},name:"masked-input",inheritAttrs:!1,props:{value:{type:String,required:!1,default:""},mask:{type:[Array,Function,Boolean,Object],required:!0},guide:{type:Boolean,required:!1},placeholderChar:{type:String,required:!1},keepCharPositions:{type:Boolean,required:!1},pipe:{type:Function,required:!1},showMask:{type:Boolean,required:!1}},mounted:function(){this.initMask()},methods:{createTextMaskInputElement:u.default,setTextMaskInputElement:function(){this.textMaskInputElement=this.createTextMaskInputElement(o({inputElement:this.$refs.input},this.$options.propsData))},initMask:function(){this.setTextMaskInputElement(),this.textMaskInputElement.update(this.value)},bind:function(){this.setTextMaskInputElement(),this.updateValue(this.value)},updateValue:function(e){this.textMaskInputElement.update(e),this.$emit("input",this.$refs.input.value)}},watch:{mask:function(e,t){this.mask!==t&&this.bind()},guide:function(){this.bind()},placeholderChar:function(){this.bind()},keepCharPositions:function(){this.bind()},pipe:function(){this.bind()},showMask:function(){this.bind()}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_",t.strFunction="function"},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(t)){if(("undefined"==typeof t?"undefined":o(t))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");t=t(e,r),t=(0,i.processCaretTraps)(t).maskWithoutCaretTraps}var n=r.guide,l=void 0===n||n,f=r.previousConformedValue,d=void 0===f?s:f,c=r.placeholderChar,p=void 0===c?a.placeholderChar:c,h=r.placeholder,v=void 0===h?(0,i.convertMaskToPlaceholder)(t,p):h,m=r.currentCaretPosition,y=r.keepCharPositions,g=l===!1&&void 0!==d,b=e.length,k=d.length,C=v.length,x=t.length,P=b-k,M=P>0,T=m+(M?-P:0),O=T+Math.abs(P);if(y===!0&&!M){for(var w=s,S=T;S<O;S++)v[S]===p&&(w+=p);e=e.slice(0,T)+w+e.slice(T,b)}for(var j=e.split(s).map(function(e,t){return{char:e,isNew:t>=T&&t<O}}),V=b-1;V>=0;V--){var E=j[V].char;if(E!==p){var _=V>=T&&k===x;E===v[_?V-P:V]&&j.splice(V,1)}}var A=s,N=!1;e:for(var I=0;I<C;I++){var q=v[I];if(q===p){if(j.length>0)for(;j.length>0;){var F=j.shift(),$=F.char,B=F.isNew;if($===p&&g!==!0){A+=p;continue e}if(t[I].test($)){if(y===!0&&B!==!1&&d!==s&&l!==!1&&M){for(var R=j.length,J=null,W=0;W<R;W++){var L=j[W];if(L.char!==p&&L.isNew===!1)break;if(L.char===p){J=W;break}}null!==J?(A+=$,j.splice(J,1)):I--}else A+=$;continue e}N=!0}g===!1&&(A+=v.substr(I,C));break}A+=q}if(g&&M===!1){for(var D=null,z=0;z<A.length;z++)v[z]===p&&(D=z);A=null!==D?A.substr(0,D+1):s}return{conformedValue:A,meta:{someCharsRejected:N}}}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=n;var i=r(3),a=r(1),u=[],s=""},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){return"undefined"==typeof e||null===e}function s(e){for(var t=[],r=void 0;r=e.indexOf(d),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isArray=o,t.isString=i,t.isNumber=a,t.isNil=u,t.processCaretTraps=s;var l=r(1),f=[],d="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,s=void 0===u?0:u,l=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,h=void 0===p?n:p,v=e.caretTrapIndexes,m=void 0===v?n:v;if(0===s||!f.length)return 0;var y=f.length,g=r.length,b=c.length,k=l.length,C=y-g,x=C>0,P=0===g,M=C>1&&!x&&!P;if(M)return s;var T=x&&(r===l||l===c),O=0,w=void 0,S=void 0;if(T)O=s-C;else{var j=l.toLowerCase(),V=f.toLowerCase(),E=V.substr(0,s).split(o),_=E.filter(function(e){return j.indexOf(e)!==-1});S=_[_.length-1];var A=a.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,I=N!==A,q=void 0!==a[_.length-1]&&void 0!==c[_.length-2]&&a[_.length-1]!==d&&a[_.length-1]!==c[_.length-1]&&a[_.length-1]===c[_.length-2];!x&&(I||q)&&A>0&&c.indexOf(S)>-1&&void 0!==f[s]&&(w=!0,S=f[s]);for(var F=h.map(function(e){return j[e]}),$=F.filter(function(e){return e===S}).length,B=_.filter(function(e){return e===S}).length,R=c.substr(0,c.indexOf(d)).split(o).filter(function(e,t){return e===S&&f[t]!==e}).length,J=R+B+$+(w?1:0),W=0,L=0;L<k;L++){var D=j[L];if(O=L+1,D===S&&W++,W>=J)break}}if(x){for(var z=O,G=O;G<=b;G++)if(c[G]===d&&(z=G),c[G]===d||m.indexOf(G)!==-1||G===b)return z}else if(w){for(var H=O-1;H>=0;H--)if(l[H]===S||m.indexOf(H)!==-1||0===H)return H}else for(var K=O;K>=0;K--)if(c[K-1]===d||m.indexOf(K)!==-1||0===K)return K}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=[],o=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:t,update:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,l=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?h.placeholderChar:g,k=n.keepCharPositions,C=void 0!==k&&k,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof r&&(r=o.value),r!==t.previousConformedValue){("undefined"==typeof l?"undefined":s(l))===y&&void 0!==l.pipe&&void 0!==l.mask&&(m=l.pipe,l=l.mask);var M=void 0,T=void 0;if(l instanceof Array&&(M=(0,p.convertMaskToPlaceholder)(l,b)),l!==!1){var O=a(r),w=o.selectionEnd,S=t.previousConformedValue,j=t.previousPlaceholder,V=void 0;if(("undefined"==typeof l?"undefined":s(l))===h.strFunction){if(T=l(O,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),T===!1)return;var E=(0,p.processCaretTraps)(T),_=E.maskWithoutCaretTraps,A=E.indexes;T=_,V=A,M=(0,p.convertMaskToPlaceholder)(T,b)}else T=l;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:M,currentCaretPosition:w,keepCharPositions:C},I=(0,c.default)(O,T,N),q=I.conformedValue,F=("undefined"==typeof m?"undefined":s(m))===h.strFunction,$={};F&&($=m(q,u({rawValue:O},N)),$===!1?$={value:S,rejected:!0}:(0,p.isString)($)&&($={value:$}));var B=F?$.value:q,R=(0,f.default)({previousConformedValue:S,previousPlaceholder:j,conformedValue:B,placeholder:M,rawValue:O,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:$.indexesOfPipedChars,caretTrapIndexes:V}),J=B===M&&0===R,W=P?M:v,L=J?W:B;t.previousConformedValue=L,t.previousPlaceholder=M,o.value!==L&&(o.value=L,i(o,R))}}}}}function i(e,t){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(t,t,m)},0):e.setSelectionRange(t,t,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return v;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var l=r(4),f=n(l),d=r(2),c=n(d),p=r(3),h=r(1),v="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ })

}]);