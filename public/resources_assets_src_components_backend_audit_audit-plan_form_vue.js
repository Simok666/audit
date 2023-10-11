(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_audit_audit-plan_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-text-mask */ "./node_modules/vue-text-mask/dist/vueTextMask.js");
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_text_mask__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var text_mask_addons_dist_textMaskAddons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! text-mask-addons/dist/textMaskAddons */ "./node_modules/text-mask-addons/dist/textMaskAddons.js");
/* harmony import */ var text_mask_addons_dist_textMaskAddons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(text_mask_addons_dist_textMaskAddons__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-audit-plan',
  metaInfo: {
    title: 'Form Audit Plan'
  },
  components: {
    MaskedInput: (vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default())
  },
  data: function data() {
    return {
      urlSubmit: '/AdminVue/audit-plan-insert',
      headerCard: 'Form / Create Data Audit Plan',
      textBtnSubmit: 'Create',
      field: {
        //   myFile : ''
        File: '',
        AuditeeDepartment: [{
          Department: '',
          Position: '',
          Email: '',
          opsPosition: []
        }],
        IdAudit: '',
        Date: '',
        Organizer: '',
        AuditPeriode: '',
        AuditCriteria: '',
        Approved: ''
      },
      allErrors: [],
      formatDate: 'MM/yyyy',
      formatDatedmy: 'dd/MM/yyyy',
      formatDateTime: 'dd/MM/yyyy H:i',
      disabledDate: {
        to: new Date(2021, 4, 5)
      },
      opsAuditCriteria: [],
      timeMask: [/\d/, /\d/, ':', /\d/, /\d/],
      opsOrganizer: [],
      opsDepartment: [],
      DepSelected: [],
      DisabledDep: [],
      oldFileAttachment: [],
      opsEmployee: [],
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
      formData.append("OrganizerAudit", this.field.Organizer.Id);
      formData.append("AuditPeriode", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.AuditPeriode).format('MM/DD/YYYY'));
      formData.append("NoTrans", this.field.IdAudit);
      formData.append("Approved", JSON.stringify(this.field.Approved));
      formData.append("Purpose", this.field.Purpose);
      formData.append("AuditScope", this.field.AuditScope);
      formData.append("OpeningMeeting", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.OpeningMeeting).format('MM/DD/YYYY'));
      formData.append("AuditExecutionStart", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.AuditExecutionStart).format('MM/DD/YYYY'));
      formData.append("AuditExecutionDone", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.AuditExecutionDone).format('MM/DD/YYYY'));
      formData.append("ClosingMeeting", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.ClosingMeeting).format('MM/DD/YYYY'));
      formData.append("OpeningMeetingTime", this.field.OpeningMeetingTime);
      formData.append("CloseMeetingTime", this.field.CloseMeetingTime);
      formData.append("AuditCriteria", JSON.stringify(this.field.AuditCriteria));
      formData.append("Objective", this.field.Objective);
      formData.append("AuditeeDepartment", JSON.stringify(this.field.AuditeeDepartment));
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
            name: 'audit/data-audit-plan',
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
      axios.post('/AdminVue/audit-plan-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        this.DepSelected = resp.data.DepSelect;
        this.DisabledDep = resp.data.DepDisabled;
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
        this.getCriteriaAudit(this.field.IdOrganizer, true);
        for (var a = 0; a < this.field.AuditeeDepartment.length; a++) {
          this.getPosition(this.field.AuditeeDepartment[a].Department.Id, true, a);
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/audit/data-audit-plan');
    },
    handleFile: function handleFile(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.File = files.map(function (files) {
        return files.file;
      });
      // console.log( this.field.myFile )
    },
    getSelect: function getSelect(IdEmploye) {
      axios.post('/AdminVue/audit-plan-getSelect', {
        IdEmploye: IdEmploye
      }).then(function (res) {
        var _this = this;
        this.opsOrganizer = res.data.organizer;
        this.opsDepartment = res.data.departement;
        this.field.TotalAuditPlant = res.data.countAuditPlan + 1;
        this.opsEmployee = res.data.employee;
        if (this.field.Id) {
          var _loop = function _loop(index) {
            var IndexDep = _this.opsDepartment.findIndex(function (IdDep) {
              return IdDep.Id === _this.DepSelected[index];
            });
            _this.opsDepartment[IndexDep].$isDisabled = true;
          };
          for (var index = 0; index < this.DepSelected.length; index++) {
            _loop(index);
          }
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsOrganizer = [];
        this.opsDepartment = [];
        this.field.TotalAuditPlant = 0;
        this.opsEmployee = [];
      }.bind(this));
    },
    getPosition: function getPosition(Id, statusEdit, index) {
      axios.post('/AdminVue/audit-plan-getPosition', {
        IdDepartment: Id
      }).then(function (res) {
        this.field.AuditeeDepartment[index].opsPosition = res.data.position;
        if (statusEdit == false) {
          this.field.AuditeeDepartment[index].Position = '';
          this.field.AuditeeDepartment[index].Email = '';
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsPosition = [];
      }.bind(this));
    },
    getCriteriaAudit: function getCriteriaAudit(Id, statusEdit) {
      axios.post('/AdminVue/audit-plan-getCriteria', {
        IdOrganizer: Id
      }).then(function (res) {
        this.opsAuditCriteria = res.data.criteria;
        if (statusEdit == false) {
          this.field.AuditCriteria = '';
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsAuditCriteria = [];
      }.bind(this));
    },
    getIdAudit: function getIdAudit(option) {
      if (this.field.AuditPeriode != '') {
        var StringAngka = ('00' + this.field.TotalAuditPlant).substring(this.field.TotalAuditPlant.length);
        var YearDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.AuditPeriode).format('YYYY');
        this.field.IdAudit = YearDate + '/' + option.Name + '/' + StringAngka;
      }
      this.getCriteriaAudit(option.Id, false);
    },
    dateSelected: function dateSelected() {
      var _this2 = this;
      this.$nextTick(function () {
        return _this2.getIdAuditDate(_this2.field.AuditPeriode);
      });
    },
    priviewFile: function priviewFile() {
      if (this.oldFileAttachment != '') {
        for (var i = 0; i < this.oldFileAttachment.length; i++) {
          var file = "/" + this.oldFileAttachment[i];
          window.open(file, '_blank');
        }
      }
    },
    getIdAuditDate: function getIdAuditDate(DateAudit) {
      if (this.field.Organizer != '') {
        var StringAngka = ('00' + this.field.TotalAuditPlant).substring(this.field.TotalAuditPlant.length);
        var YearDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(DateAudit).format('YYYY');
        this.field.IdAudit = YearDate + '/' + this.field.Organizer.Name + '/' + StringAngka;
      }
    },
    getPositionSelect: function getPositionSelect(option, index) {
      this.DepSelected.splice(index, 1);
      this.DepSelected.splice(index, 0, option.Id);
      this.disabledSelected(option.Id, index, false);
      this.getPosition(option.Id, false, index);
    },
    getEmailEvent: function getEmailEvent(option, index) {
      var Email = this.field.AuditeeDepartment[index].Email;
      if (Email != '') {
        this.field.AuditeeDepartment[index].Email = Email.concat(', ', option.Email);
      } else {
        this.field.AuditeeDepartment[index].Email = option.Email;
      }
    },
    removeEmailEvent: function removeEmailEvent(option, index) {
      this.field.AuditeeDepartment[index].Email = this.field.AuditeeDepartment[index].Email.replace(', ' + option.Email, '');
    },
    addDepartmentAuditee: function addDepartmentAuditee() {
      this.field.AuditeeDepartment.push({
        Department: '',
        Position: '',
        Email: '',
        opsPosition: []
      });
    },
    removeDepartmentAuditee: function removeDepartmentAuditee(index) {
      this.field.AuditeeDepartment.splice(index, 1);
      this.disabledSelected(this.DepSelected[index], index, true);
    },
    handleRemove: function handleRemove(error, files) {
      if (this.isFormEdit == true) {
        var index = this.oldFileAttachment.indexOf(files.source.replace('/clouds', 'clouds'));
        this.oldFileAttachment.splice(index, 1);
      }
    },
    disabledSelected: function disabledSelected(Id, index, isDelete) {
      var IndexDep = this.opsDepartment.findIndex(function (IdDep) {
        return IdDep.Id === Id;
      });
      var Disabled = this.DisabledDep[index];
      if (Disabled === undefined) {
        this.opsDepartment[IndexDep].$isDisabled = true;
        this.DisabledDep.push(Id);
      } else {
        this.opsDepartment[IndexDep].$isDisabled = true;
        var IndexDis = this.opsDepartment.findIndex(function (IdDep) {
          return IdDep.Id === Disabled;
        });
        this.opsDepartment[IndexDis].$isDisabled = false;
        this.DisabledDep.splice(index, 1);
        this.DisabledDep.splice(index, 0, Id);
        if (isDelete) {
          this.DepSelected.splice(index, 1);
        }
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
        this.urlSubmit = '/AdminVue/audit-plan-update';
        this.headerCard = 'Form / Edit Data Audit Plan';
        this.textBtnSubmit = 'Update';
      }
    }
    this.getSelect();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=template&id=84fb6ac2&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=template&id=84fb6ac2& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   staticRenderFns: function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("b-card", {
    staticClass: "mb-4",
    attrs: {
      header: _vm.headerCard,
      "header-tag": "h4"
    }
  }, [_vm.isNotif ? _c("div", {
    staticClass: "alert alert-dismissible fade show",
    "class": [_vm.alertVariant]
  }, [_c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "alert"
    },
    on: {
      click: function click($event) {
        _vm.isNotif = !_vm.isNotif;
      }
    }
  }, [_vm._v("×")]), _vm._v("\n      " + _vm._s(_vm.alertNotif) + "\n    ")]) : _vm._e(), _vm._v(" "), _c("form", {
    attrs: {
      method: "POST"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submitForm();
      }
    }
  }, [_c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Organizer Audit")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsOrganizer,
      "allow-empty": false,
      "show-labels": false,
      placeholder: "Pilih Organizer",
      label: "Name",
      "track-by": "Name"
    },
    on: {
      select: _vm.getIdAudit
    },
    model: {
      value: _vm.field.Organizer,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Organizer", $$v);
      },
      expression: "field.Organizer"
    }
  }), _vm._v(" "), _vm.allErrors.Organizer ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Organizer[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Audit Periode")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("datepicker", {
    staticClass: "mb-1",
    attrs: {
      format: _vm.formatDatedmy,
      state: _vm.allErrors.AuditPeriode ? false : null,
      bootstrapStyling: true,
      typeable: true,
      "minimum-view": "month",
      required: ""
    },
    on: {
      selected: function selected($event) {
        return _vm.dateSelected();
      }
    },
    model: {
      value: _vm.field.AuditPeriode,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "AuditPeriode", $$v);
      },
      expression: "field.AuditPeriode"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("ID Audit")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "IdAudit",
      state: _vm.allErrors.IdAudit ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.IdAudit,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdAudit", $$v);
      },
      expression: "field.IdAudit"
    }
  }), _vm._v(" "), _vm.allErrors.IdAudit ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdAudit[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-3"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Opening Meeting")]), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-8"
  }, [_c("datepicker", {
    staticClass: "mb-1",
    staticStyle: {
      background: "#fff !important"
    },
    attrs: {
      format: _vm.formatDatedmy,
      state: _vm.allErrors.OpeningMeeting ? false : null,
      bootstrapStyling: true,
      typeable: true,
      required: ""
    },
    model: {
      value: _vm.field.OpeningMeeting,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "OpeningMeeting", $$v);
      },
      expression: "field.OpeningMeeting"
    }
  }), _vm._v(" "), _vm.allErrors.DateOpen ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DateOpen[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("masked-input", {
    staticClass: "form-control mb-1",
    attrs: {
      type: "text",
      placeholder: "00:00",
      state: _vm.allErrors.OpeningMeetingTime ? false : null,
      mask: _vm.timeMask
    },
    model: {
      value: _vm.field.OpeningMeetingTime,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "OpeningMeetingTime", $$v);
      },
      expression: "field.OpeningMeetingTime"
    }
  }), _vm._v(" "), _vm.allErrors.OpeningMeetingTime ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.OpeningMeetingTime[0]))]) : _vm._e()], 1)], 1)], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-3"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Audit Execution")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("datepicker", {
    staticClass: "mb-1",
    attrs: {
      format: _vm.formatDatedmy,
      state: _vm.allErrors.AuditExecutionStart ? false : null,
      bootstrapStyling: true,
      typeable: true,
      required: ""
    },
    model: {
      value: _vm.field.AuditExecutionStart,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "AuditExecutionStart", $$v);
      },
      expression: "field.AuditExecutionStart"
    }
  }), _vm._v(" "), _vm.allErrors.AuditExecutionStart ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.AuditExecutionStart[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-3"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Audit Execution(Done)")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("datepicker", {
    staticClass: "mb-1",
    attrs: {
      format: _vm.formatDatedmy,
      state: _vm.allErrors.AuditExecutionDone ? false : null,
      bootstrapStyling: true,
      typeable: true,
      required: ""
    },
    model: {
      value: _vm.field.AuditExecutionDone,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "AuditExecutionDone", $$v);
      },
      expression: "field.AuditExecutionDone"
    }
  }), _vm._v(" "), _vm.allErrors.AuditExecutionDone ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.AuditExecutionDone[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-3"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Close Meeting")]), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-8"
  }, [_c("datepicker", {
    staticClass: "mb-1",
    attrs: {
      format: _vm.formatDatedmy,
      state: _vm.allErrors.ClosingMeeting ? false : null,
      bootstrapStyling: true,
      typeable: true,
      required: ""
    },
    model: {
      value: _vm.field.ClosingMeeting,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "ClosingMeeting", $$v);
      },
      expression: "field.ClosingMeeting"
    }
  }), _vm._v(" "), _vm.allErrors.DateClose ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.DateClose[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("masked-input", {
    staticClass: "form-control mb-1",
    attrs: {
      type: "text",
      placeholder: "00:00",
      state: _vm.allErrors.CloseMeetingTime ? false : null,
      mask: _vm.timeMask
    },
    model: {
      value: _vm.field.CloseMeetingTime,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "CloseMeetingTime", $$v);
      },
      expression: "field.CloseMeetingTime"
    }
  }), _vm._v(" "), _vm.allErrors.CloseMeetingTime ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.CloseMeetingTime[0]))]) : _vm._e()], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Approval")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsEmployee,
      "allow-empty": false,
      "show-labels": false,
      multiple: true,
      placeholder: "Pilih Approval Employee",
      label: "Name",
      "track-by": "Name"
    },
    model: {
      value: _vm.field.Approved,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Approved", $$v);
      },
      expression: "field.Approved"
    }
  }), _vm._v(" "), _vm.allErrors.Approved ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Approved[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Standart Audit")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsAuditCriteria,
      "allow-empty": false,
      multiple: true,
      "show-labels": false,
      placeholder: "Pilih Standart Audit",
      label: "Standart",
      "track-by": "Standart"
    },
    model: {
      value: _vm.field.AuditCriteria,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "AuditCriteria", $$v);
      },
      expression: "field.AuditCriteria"
    }
  }), _vm._v(" "), _vm.allErrors.AuditCriteria ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.AuditCriteria[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Audit Scope")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "AuditScope",
      rows: "3",
      "no-resize": ""
    },
    model: {
      value: _vm.field.AuditScope,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "AuditScope", $$v);
      },
      expression: "field.AuditScope"
    }
  })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Purpose")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "Purpose",
      rows: "3",
      "no-resize": ""
    },
    model: {
      value: _vm.field.Purpose,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Purpose", $$v);
      },
      expression: "field.Purpose"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Objective")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "Objective",
      rows: "3",
      "no-resize": ""
    },
    model: {
      value: _vm.field.Objective,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Objective", $$v);
      },
      expression: "field.Objective"
    }
  })], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "mb-4",
    scopedSlots: _vm._u([{
      key: "header",
      fn: function fn() {
        return [_c("h4", [_vm._v("Department Auditee")])];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _vm._l(_vm.field.AuditeeDepartment, function (item, index) {
    return _c("b-form-row", {
      key: index
    }, [_c("b-form-group", {
      staticClass: "col-md-4"
    }, [index == 0 ? _c("label", [_vm._v("Area Auditee")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        options: _vm.opsDepartment,
        "allow-empty": false,
        "show-labels": false,
        placeholder: "Pilih Department Auditee",
        label: "Department",
        "track-by": "Department"
      },
      on: {
        select: function select($event) {
          return _vm.getPositionSelect($event, index);
        }
      },
      model: {
        value: item.Department,
        callback: function callback($$v) {
          _vm.$set(item, "Department", $$v);
        },
        expression: "item.Department"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-4"
    }, [index == 0 ? _c("label", [_vm._v("Key Area Auditee")]) : _vm._e(), _vm._v(" "), _c("multiselect", {
      attrs: {
        options: item.opsPosition,
        "allow-empty": false,
        "show-labels": false,
        multiple: true,
        placeholder: "Pilih Position Auditee",
        label: "Name",
        "track-by": "Name"
      },
      on: {
        select: function select($event) {
          return _vm.getEmailEvent($event, index);
        },
        remove: function remove($event) {
          return _vm.removeEmailEvent($event, index);
        }
      },
      model: {
        value: item.Position,
        callback: function callback($$v) {
          _vm.$set(item, "Position", $$v);
        },
        expression: "item.Position"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-3 col-10"
    }, [index == 0 ? _c("label", [_vm._v("Emails")]) : _vm._e(), _vm._v(" "), _c("b-form-textarea", {
      attrs: {
        name: "Email",
        rows: "3",
        "background-color": "btn-danger",
        "no-resize": ""
      },
      model: {
        value: item.Email,
        callback: function callback($$v) {
          _vm.$set(item, "Email", $$v);
        },
        expression: "item.Email"
      }
    })], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-1 col-2 text-center"
    }, [index == 0 ? _c("label", [_vm._v("Action")]) : _vm._e(), _vm._v(" "), index > 0 ? _c("b-button", {
      staticClass: "btn btn-sm btn-icon btn-danger text-white",
      attrs: {
        pill: true
      },
      on: {
        click: function click($event) {
          return _vm.removeDepartmentAuditee(index);
        }
      }
    }, [_c("i", {
      staticClass: "ion ion-md-trash"
    })]) : _vm._e()], 1)], 1);
  }), _vm._v(" "), _c("b-btn", {
    staticClass: "float-left btn-info",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        return _vm.addDepartmentAuditee();
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus"
  }), _vm._v(" Tambah")])], 2), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-12"
  }, [_c("label", [_vm._v("Attachment")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "File",
      "label-idle": "Klik Untuk Menambahkan Attachment",
      "allow-multiple": true,
      files: _vm.field.File,
      required: ""
    },
    on: {
      updatefiles: _vm.handleFile,
      removefile: _vm.handleRemove
    }
  }), _vm._v(" "), _vm.textBtnSubmit == "Update" ? _c("b-btn", {
    staticClass: "float-right",
    attrs: {
      type: "button",
      variant: "secondary"
    },
    on: {
      click: function click($event) {
        return _vm.priviewFile();
      }
    }
  }, [_vm._v("Preview File")]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "submit",
      variant: "primary"
    }
  }, [_vm._v(_vm._s(_vm.textBtnSubmit))]), _vm._v(" "), _c("b-btn", {
    staticClass: "float-right",
    attrs: {
      type: "button",
      variant: "secondary"
    },
    on: {
      click: function click($event) {
        return _vm.backIndex();
      }
    }
  }, [_vm._v("Back")])], 1)], 1)], 1)])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\ninput:disabled {\n    background-color:red;\n}\ninput.disable-input {\n    background-color: gray;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.custom-datepicker {\n    background-color: #ffffff;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_1_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_1_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_1_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/text-mask-addons/dist/textMaskAddons.js":
/*!**************************************************************!*\
  !*** ./node_modules/text-mask-addons/dist/textMaskAddons.js ***!
  \**************************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1);Object.defineProperty(t,"createAutoCorrectedDatePipe",{enumerable:!0,get:function(){return r(i).default}});var o=n(2);Object.defineProperty(t,"createNumberMask",{enumerable:!0,get:function(){return r(o).default}});var u=n(3);Object.defineProperty(t,"emailMask",{enumerable:!0,get:function(){return r(u).default}})},function(e,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"mm dd yyyy",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.minYear,o=void 0===n?1:n,u=t.maxYear,a=void 0===u?9999:u,c=e.split(/[^dmyHMS]+/).sort(function(e,t){return i.indexOf(e)-i.indexOf(t)});return function(t){var n=[],i={dd:31,mm:12,yy:99,yyyy:a,HH:23,MM:59,SS:59},u={dd:1,mm:1,yy:0,yyyy:o,HH:0,MM:0,SS:0},l=t.split("");c.forEach(function(t){var r=e.indexOf(t),o=parseInt(i[t].toString().substr(0,1),10);parseInt(l[r],10)>o&&(l[r+1]=l[r],l[r]=0,n.push(r))});var s=0,d=c.some(function(n){var c=e.indexOf(n),l=n.length,d=t.substr(c,l).replace(/\D/g,""),f=parseInt(d,10);"mm"===n&&(s=f||0);var p="dd"===n?r[s]:i[n];if("yyyy"===n&&(1!==o||9999!==a)){var v=parseInt(i[n].toString().substring(0,d.length),10),y=parseInt(u[n].toString().substring(0,d.length),10);return f<y||f>v}return f>p||d.length===l&&f<u[n]});return!d&&{value:l.join(""),indexesOfPipedChars:n}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var r=[31,31,29,31,30,31,30,31,31,30,31,30,31],i=["yyyy","yy","mm","dd","HH","MM","SS"]},function(e,t){"use strict";function n(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=e.length;if(e===a||e[0]===g[0]&&1===t)return g.split(a).concat([v]).concat(h.split(a));if(e===P&&_)return g.split(a).concat(["0",P,v]).concat(h.split(a));var n=e[0]===s&&D;n&&(e=e.toString().substr(1));var u=e.lastIndexOf(P),c=u!==-1,l=void 0,m=void 0,b=void 0;if(e.slice($*-1)===h&&(e=e.slice(0,$*-1)),c&&(_||I)?(l=e.slice(e.slice(0,N)===g?N:0,u),m=e.slice(u+1,t),m=r(m.replace(f,a))):l=e.slice(0,N)===g?e.slice(N):e,L&&("undefined"==typeof L?"undefined":o(L))===p){var O="."===S?"[.]":""+S,M=(l.match(new RegExp(O,"g"))||[]).length;l=l.slice(0,L+M*V)}return l=l.replace(f,a),R||(l=l.replace(/^0+(0$|[^0])/,"$1")),l=x?i(l,S):l,b=r(l),(c&&_||I===!0)&&(e[u-1]!==P&&b.push(y),b.push(P,y),m&&(("undefined"==typeof C?"undefined":o(C))===p&&(m=m.slice(0,C)),b=b.concat(m)),I===!0&&e[u-1]===P&&b.push(v)),N>0&&(b=g.split(a).concat(b)),n&&(b.length===N&&b.push(v),b=[d].concat(b)),h.length>0&&(b=b.concat(h.split(a))),b}var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.prefix,g=void 0===n?u:n,m=t.suffix,h=void 0===m?a:m,b=t.includeThousandsSeparator,x=void 0===b||b,O=t.thousandsSeparatorSymbol,S=void 0===O?c:O,M=t.allowDecimal,_=void 0!==M&&M,j=t.decimalSymbol,P=void 0===j?l:j,w=t.decimalLimit,C=void 0===w?2:w,H=t.requireDecimal,I=void 0!==H&&H,k=t.allowNegative,D=void 0!==k&&k,E=t.allowLeadingZeroes,R=void 0!==E&&E,A=t.integerLimit,L=void 0===A?null:A,N=g&&g.length||0,$=h&&h.length||0,V=S&&S.length||0;return e.instanceOf="createNumberMask",e}function r(e){return e.split(a).map(function(e){return v.test(e)?v:e})}function i(e,t){return e.replace(/\B(?=(\d{3})+(?!\d))/g,t)}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=n;var u="$",a="",c=",",l=".",s="-",d=/-/,f=/\D+/g,p="number",v=/\d/,y="[]"},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){e=e.replace(O,v);var n=t.placeholderChar,r=t.currentCaretPosition,i=e.indexOf(y),s=e.lastIndexOf(p),d=s<i?-1:s,f=o(e,i+1,y),g=o(e,d-1,p),m=u(e,i,n),h=a(e,i,d,n),b=c(e,d,n,r);m=l(m),h=l(h),b=l(b,!0);var x=m.concat(f).concat(h).concat(g).concat(b);return x}function o(e,t,n){var r=[];return e[t]===n?r.push(n):r.push(g,n),r.push(g),r}function u(e,t){return t===-1?e:e.slice(0,t)}function a(e,t,n,r){var i=v;return t!==-1&&(i=n===-1?e.slice(t+1,e.length):e.slice(t+1,n)),i=i.replace(new RegExp("[\\s"+r+"]",h),v),i===y?f:i.length<1?m:i[i.length-1]===p?i.slice(0,i.length-1):i}function c(e,t,n,r){var i=v;return t!==-1&&(i=e.slice(t+1,e.length)),i=i.replace(new RegExp("[\\s"+n+".]",h),v),0===i.length?e[t-1]===p&&r!==e.length?f:v:i}function l(e,t){return e.split(v).map(function(e){return e===m?e:t?x:b})}Object.defineProperty(t,"__esModule",{value:!0});var s=n(4),d=r(s),f="*",p=".",v="",y="@",g="[]",m=" ",h="g",b=/[^\s]/,x=/[^.\s]/,O=/\s/g;t.default={mask:i,pipe:d.default}},function(e,t){"use strict";function n(e,t){var n=t.currentCaretPosition,o=t.rawValue,f=t.previousConformedValue,p=t.placeholderChar,v=e;v=r(v);var y=v.indexOf(a),g=null===o.match(new RegExp("[^@\\s."+p+"]"));if(g)return u;if(v.indexOf(l)!==-1||y!==-1&&n!==y+1||o.indexOf(i)===-1&&f!==u&&o.indexOf(c)!==-1)return!1;var m=v.indexOf(i),h=v.slice(m+1,v.length);return(h.match(d)||s).length>1&&v.substr(-1)===c&&n!==o.length&&(v=v.slice(0,v.length-1)),v}function r(e){var t=0;return e.replace(o,function(){return t++,1===t?i:u})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var i="@",o=/@/g,u="",a="@.",c=".",l="..",s=[],d=/\./g}])});

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/audit-plan/form.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/audit-plan/form.vue ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_84fb6ac2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=84fb6ac2& */ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=template&id=84fb6ac2&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _form_vue_vue_type_style_index_0_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css& */ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css&");
/* harmony import */ var _form_vue_vue_type_style_index_1_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css& */ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_84fb6ac2___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_84fb6ac2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/audit/audit-plan/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=template&id=84fb6ac2&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=template&id=84fb6ac2& ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_84fb6ac2___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_84fb6ac2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_84fb6ac2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=84fb6ac2& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=template&id=84fb6ac2&");


/***/ }),

/***/ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css&":
/*!************************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css& ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=0&id=84fb6ac2&lang=css&");


/***/ }),

/***/ "./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css&":
/*!************************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css& ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_1_id_84fb6ac2_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/audit-plan/form.vue?vue&type=style&index=1&id=84fb6ac2&lang=css&");


/***/ }),

/***/ "./node_modules/vue-text-mask/dist/vueTextMask.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-text-mask/dist/vueTextMask.js ***!
  \********************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.conformToMask=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=r(5),u=n(a);t.default={render:function(e){var t=this;return e("input",{ref:"input",domProps:{value:this.value},attrs:this.$attrs,on:Object.assign(o({},this.$listeners),{input:function(e){return t.updateValue(e.target.value)}})})},name:"masked-input",inheritAttrs:!1,props:{value:{type:String,required:!1,default:""},mask:{type:[Array,Function,Boolean,Object],required:!0},guide:{type:Boolean,required:!1},placeholderChar:{type:String,required:!1},keepCharPositions:{type:Boolean,required:!1},pipe:{type:Function,required:!1},showMask:{type:Boolean,required:!1}},mounted:function(){this.initMask()},methods:{createTextMaskInputElement:u.default,setTextMaskInputElement:function(){this.textMaskInputElement=this.createTextMaskInputElement(o({inputElement:this.$refs.input},this.$options.propsData))},initMask:function(){this.setTextMaskInputElement(),this.textMaskInputElement.update(this.value)},bind:function(){this.setTextMaskInputElement(),this.updateValue(this.value)},updateValue:function(e){this.textMaskInputElement.update(e),this.$emit("input",this.$refs.input.value)}},watch:{mask:function(e,t){this.mask!==t&&this.bind()},guide:function(){this.bind()},placeholderChar:function(){this.bind()},keepCharPositions:function(){this.bind()},pipe:function(){this.bind()},showMask:function(){this.bind()}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_",t.strFunction="function"},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(t)){if(("undefined"==typeof t?"undefined":o(t))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");t=t(e,r),t=(0,i.processCaretTraps)(t).maskWithoutCaretTraps}var n=r.guide,l=void 0===n||n,f=r.previousConformedValue,d=void 0===f?s:f,c=r.placeholderChar,p=void 0===c?a.placeholderChar:c,h=r.placeholder,v=void 0===h?(0,i.convertMaskToPlaceholder)(t,p):h,m=r.currentCaretPosition,y=r.keepCharPositions,g=l===!1&&void 0!==d,b=e.length,k=d.length,C=v.length,x=t.length,P=b-k,M=P>0,T=m+(M?-P:0),O=T+Math.abs(P);if(y===!0&&!M){for(var w=s,S=T;S<O;S++)v[S]===p&&(w+=p);e=e.slice(0,T)+w+e.slice(T,b)}for(var j=e.split(s).map(function(e,t){return{char:e,isNew:t>=T&&t<O}}),V=b-1;V>=0;V--){var E=j[V].char;if(E!==p){var _=V>=T&&k===x;E===v[_?V-P:V]&&j.splice(V,1)}}var A=s,N=!1;e:for(var I=0;I<C;I++){var q=v[I];if(q===p){if(j.length>0)for(;j.length>0;){var F=j.shift(),$=F.char,B=F.isNew;if($===p&&g!==!0){A+=p;continue e}if(t[I].test($)){if(y===!0&&B!==!1&&d!==s&&l!==!1&&M){for(var R=j.length,J=null,W=0;W<R;W++){var L=j[W];if(L.char!==p&&L.isNew===!1)break;if(L.char===p){J=W;break}}null!==J?(A+=$,j.splice(J,1)):I--}else A+=$;continue e}N=!0}g===!1&&(A+=v.substr(I,C));break}A+=q}if(g&&M===!1){for(var D=null,z=0;z<A.length;z++)v[z]===p&&(D=z);A=null!==D?A.substr(0,D+1):s}return{conformedValue:A,meta:{someCharsRejected:N}}}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=n;var i=r(3),a=r(1),u=[],s=""},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){return"undefined"==typeof e||null===e}function s(e){for(var t=[],r=void 0;r=e.indexOf(d),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isArray=o,t.isString=i,t.isNumber=a,t.isNil=u,t.processCaretTraps=s;var l=r(1),f=[],d="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,s=void 0===u?0:u,l=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,h=void 0===p?n:p,v=e.caretTrapIndexes,m=void 0===v?n:v;if(0===s||!f.length)return 0;var y=f.length,g=r.length,b=c.length,k=l.length,C=y-g,x=C>0,P=0===g,M=C>1&&!x&&!P;if(M)return s;var T=x&&(r===l||l===c),O=0,w=void 0,S=void 0;if(T)O=s-C;else{var j=l.toLowerCase(),V=f.toLowerCase(),E=V.substr(0,s).split(o),_=E.filter(function(e){return j.indexOf(e)!==-1});S=_[_.length-1];var A=a.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,I=N!==A,q=void 0!==a[_.length-1]&&void 0!==c[_.length-2]&&a[_.length-1]!==d&&a[_.length-1]!==c[_.length-1]&&a[_.length-1]===c[_.length-2];!x&&(I||q)&&A>0&&c.indexOf(S)>-1&&void 0!==f[s]&&(w=!0,S=f[s]);for(var F=h.map(function(e){return j[e]}),$=F.filter(function(e){return e===S}).length,B=_.filter(function(e){return e===S}).length,R=c.substr(0,c.indexOf(d)).split(o).filter(function(e,t){return e===S&&f[t]!==e}).length,J=R+B+$+(w?1:0),W=0,L=0;L<k;L++){var D=j[L];if(O=L+1,D===S&&W++,W>=J)break}}if(x){for(var z=O,G=O;G<=b;G++)if(c[G]===d&&(z=G),c[G]===d||m.indexOf(G)!==-1||G===b)return z}else if(w){for(var H=O-1;H>=0;H--)if(l[H]===S||m.indexOf(H)!==-1||0===H)return H}else for(var K=O;K>=0;K--)if(c[K-1]===d||m.indexOf(K)!==-1||0===K)return K}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=[],o=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:t,update:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,l=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?h.placeholderChar:g,k=n.keepCharPositions,C=void 0!==k&&k,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof r&&(r=o.value),r!==t.previousConformedValue){("undefined"==typeof l?"undefined":s(l))===y&&void 0!==l.pipe&&void 0!==l.mask&&(m=l.pipe,l=l.mask);var M=void 0,T=void 0;if(l instanceof Array&&(M=(0,p.convertMaskToPlaceholder)(l,b)),l!==!1){var O=a(r),w=o.selectionEnd,S=t.previousConformedValue,j=t.previousPlaceholder,V=void 0;if(("undefined"==typeof l?"undefined":s(l))===h.strFunction){if(T=l(O,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),T===!1)return;var E=(0,p.processCaretTraps)(T),_=E.maskWithoutCaretTraps,A=E.indexes;T=_,V=A,M=(0,p.convertMaskToPlaceholder)(T,b)}else T=l;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:M,currentCaretPosition:w,keepCharPositions:C},I=(0,c.default)(O,T,N),q=I.conformedValue,F=("undefined"==typeof m?"undefined":s(m))===h.strFunction,$={};F&&($=m(q,u({rawValue:O},N)),$===!1?$={value:S,rejected:!0}:(0,p.isString)($)&&($={value:$}));var B=F?$.value:q,R=(0,f.default)({previousConformedValue:S,previousPlaceholder:j,conformedValue:B,placeholder:M,rawValue:O,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:$.indexesOfPipedChars,caretTrapIndexes:V}),J=B===M&&0===R,W=P?M:v,L=J?W:B;t.previousConformedValue=L,t.previousPlaceholder=M,o.value!==L&&(o.value=L,i(o,R))}}}}}function i(e,t){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(t,t,m)},0):e.setSelectionRange(t,t,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return v;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var l=r(4),f=n(l),d=r(2),c=n(d),p=r(3),h=r(1),v="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ })

}]);