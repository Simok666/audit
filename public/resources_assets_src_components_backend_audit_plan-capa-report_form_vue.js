(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_audit_plan-capa-report_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-text-mask */ "./node_modules/vue-text-mask/dist/vueTextMask.js");
/* harmony import */ var vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_text_mask__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-plan-capa-report',
  metaInfo: {
    title: 'Form Plan Capa Report'
  },
  components: {
    MaskedInput: (vue_text_mask__WEBPACK_IMPORTED_MODULE_1___default())
  },
  data: function data() {
    return {
      urlSubmit: '/AdminVue/plan-capa-report-insert',
      headerCard: 'Form / Create Data Plan Capa Report',
      textBtnSubmit: 'Create',
      field: {
        //   myFile : ''
        File: '',
        FileCorrective: '',
        FilePreventive: '',
        AuditClause: [{
          StandartAudit: '',
          Clause: ''
        }],
        RefNumber: '',
        PotentialNonConformitiy: ''
      },
      allErrors: [],
      opsIdAudit: [],
      oldFileAttachmentCorrective: [],
      oldFileAttachmentPreventive: [],
      opsType: [{
        'value': 'Critical',
        'text': 'Critical'
      }, {
        'value': 'Major',
        'text': 'Major'
      }, {
        'value': 'Minor',
        'text': 'Minor'
      }, {
        'value': 'Observasi',
        'text': 'Observasi'
      }],
      disabledDate: {},
      formatDate: 'dd/MM/yyyy',
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
      formData.append("NoTrans", this.field.IdAuditPlan.NoTrans);
      formData.append("IdAuditReport", this.field.IdAuditPlan.Id);
      formData.append("IdAuditSelection", this.field.IdAuditPlan.IdAuditSelection);
      formData.append("IdAuditPlane", this.field.IdAuditPlan.IdAuditPlane);
      formData.append("IdDepartmentAuditee", this.field.IdAuditPlan.IdDepartmentAuditee);
      formData.append("IdPositionAuditee", this.field.IdPositionAuditee);
      formData.append("OrganizerAudit", this.field.IdAuditPlan.OrganizerAudit);
      formData.append("AuditorDate", this.field.AuditorDate);
      formData.append("PotentialNonConformitiy", this.field.PotentialNonConformitiy);
      formData.append("TypeNonConformity", this.field.TypeNonConformity);
      formData.append("HeadAuditee", this.field.HeadAuditee);
      formData.append("HeadAuditeePosition", this.field.HeadAuditeePosition);
      formData.append("IdLeadAuditor", this.field.IdLeadAuditor);
      formData.append("ConditionNow", this.field.ConditionNow);
      formData.append("GapAnalysis", this.field.GapAnalysis);
      formData.append("PotentialCauseNonConformitiy", this.field.PotentialCauseNonConformitiy);
      formData.append("CorrectiveAction", this.field.CorrectiveAction);
      formData.append("ExecutionPlaneCorrective", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.ExecutionPlaneCorrective).format('MM/DD/YYYY'));
      formData.append("PreventiveAction", this.field.PreventiveAction);
      formData.append("ExecutionPreventiveAction", moment__WEBPACK_IMPORTED_MODULE_0___default()(this.field.ExecutionPreventiveAction).format('MM/DD/YYYY'));

      // for( var i = 0; i < this.field.FileCorrective.length; i++ ){
      //   let file = this.field.FileCorrective[i];
      //   formData.append('FileAttachmentCorrective[' + i + ']', file);
      // }
      // formData.append("OldFileAttachmentCorrective", JSON.stringify(this.oldFileAttachmentCorrective))
      // for( var i = 0; i < this.field.FilePreventive.length; i++ ){
      //   let file = this.field.FilePreventive[i];
      //   formData.append('FileAttachmentPreventive[' + i + ']', file);
      // }
      // formData.append("OldFileAttachmentPreventive", JSON.stringify(this.oldFileAttachmentPreventive))

      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;
        if (resp.status) {
          this.$router.push({
            name: 'audit/data-plan-capa-report',
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
      axios.post('/AdminVue/plan-capa-report-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        // this.field.FileCorrective = []
        // if(this.field.PathCorrective != ''){
        //   let countPath = this.field.PathCorrective.length
        //   for (let i = 0; i < countPath; i++) {
        //     this.oldFileAttachmentCorrective.push(this.field.PathCorrective[i])
        //     this.field.FileCorrective.push(process.env.BASE_URL + this.field.PathCorrective[i])
        //   }
        // }else{
        //   this.oldFileAttachmentCorrective = ''
        // }
        // this.field.FilePreventive = []
        // if(this.field.PathPreventive != ''){
        //   let countPath = this.field.PathPreventive.length
        //   for (let i = 0; i < countPath; i++) {
        //     this.oldFileAttachmentPreventive.push(this.field.PathPreventive[i])
        //     this.field.FilePreventive.push(process.env.BASE_URL + this.field.PathPreventive[i])
        //   }
        // }else{
        //   this.oldFileAttachmentPreventive = ''
        // }
        var Year = moment__WEBPACK_IMPORTED_MODULE_0___default()(resp.data.OpeningMeeting).format('YYYY');
        var Month = moment__WEBPACK_IMPORTED_MODULE_0___default()(resp.data.OpeningMeeting).format('MM') - 1;
        var Day = moment__WEBPACK_IMPORTED_MODULE_0___default()(resp.data.OpeningMeeting).format('DD');
        this.disabledDate = {
          to: new Date(Year, Month, Day)
        };
        this.getAuditDetail(resp.data.IdAuditReport, resp.data.IdAuditSelection);
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getSelect: function getSelect() {
      axios.post('/AdminVue/plan-capa-report-getSelect').then(function (res) {
        this.opsIdAudit = res.data.IdAudit;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsIdAudit = [];
      }.bind(this));
    },
    convertSelectBox: function convertSelectBox(_ref) {
      var NoTrans = _ref.NoTrans,
        DepartmentAuditee = _ref.DepartmentAuditee,
        RefNumber = _ref.RefNumber;
      return "".concat(NoTrans, " - ").concat(DepartmentAuditee, " NoReff. ").concat(RefNumber);
    },
    getAuditDetailSelect: function getAuditDetailSelect(option) {
      var Year = moment__WEBPACK_IMPORTED_MODULE_0___default()(option.OpeningMeeting).format('YYYY');
      var Month = moment__WEBPACK_IMPORTED_MODULE_0___default()(option.OpeningMeeting).format('MM') - 1;
      var Day = moment__WEBPACK_IMPORTED_MODULE_0___default()(option.OpeningMeeting).format('DD');
      this.disabledDate = {
        to: new Date(Year, Month, Day)
      };
      this.field.RefNumber = option.RefNumber;
      this.getAuditDetail(option.Id, option.IdAuditSelection);
    },
    getAuditDetail: function getAuditDetail(Id, IdAuditSelection) {
      axios.post('/AdminVue/plan-capa-report-getAuditDetail', {
        IdAuditSelection: IdAuditSelection,
        IdAuditReport: Id
      }).then(function (res) {
        this.field.HeadAuditee = res.data.HeadAuditee;
        this.field.HeadAuditeePosition = res.data.HeadAuditeePosition;
        this.field.AuditClause = res.data.AuditClause;
        this.field.IdPositionAuditee = res.data.IdPositionAuditee;
        this.field.IdLeadAuditor = res.data.IdLeadAuditor;
        var AuditReport = res.data.AuditReport;
        this.field.PotentialNonConformitiy = AuditReport.PotentialNonConformitiy;
        this.field.TypeNonConformity = AuditReport.TypeNonConformity;
        this.field.AuditorDate = AuditReport.AuditorDate;
        this.field.File = [];
        var countPath = AuditReport.Path.length;
        for (var i = 0; i < countPath; i++) {
          this.field.File.push("/" + AuditReport.Path[i]);
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/audit/data-plan-capa-report');
    },
    handleFile: function handleFile(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.File = files.map(function (files) {
        return files.file;
      });
      // console.log( this.field.myFile )
    },

    handleFileCorrective: function handleFileCorrective(files) {
      this.field.FileCorrective = files.map(function (files) {
        return files.file;
      });
    },
    handleFilePreventive: function handleFilePreventive(files) {
      this.field.FilePreventive = files.map(function (files) {
        return files.file;
      });
    }

    // handleRemoveCorrective: function(error,files){
    //   if(this.isFormEdit == true){
    //     let index = this.oldFileAttachmentCorrective.indexOf(files.source.replace('/clouds','clouds'))
    //     this.oldFileAttachmentCorrective.splice(index,1)
    //   }
    // },

    // handleRemovePreventive: function(error,files){
    //   if(this.isFormEdit == true){
    //     let index = this.oldFileAttachmentPreventive.indexOf(files.source.replace('/clouds','clouds'))
    //     this.oldFileAttachmentPreventive.splice(index,1)
    //   }
    // }
  },
  mounted: function mounted() {
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.isFormEdit = true;
        this.urlSubmit = '/AdminVue/plan-capa-report-update';
        this.headerCard = 'Form / Edit Data Plan Capa Report';
        this.textBtnSubmit = 'Update';
      }
    }
    this.getSelect();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=template&id=10e4214c&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=template&id=10e4214c& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "col-md-7"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Id Audit")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Dipilih")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsIdAudit,
      "allow-empty": true,
      "show-labels": false,
      "custom-label": _vm.convertSelectBox,
      placeholder: "Pilih Id Audit Plan",
      label: "Id",
      "track-by": "Id"
    },
    on: {
      select: _vm.getAuditDetailSelect
    },
    model: {
      value: _vm.field.IdAuditPlan,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "IdAuditPlan", $$v);
      },
      expression: "field.IdAuditPlan"
    }
  }), _vm._v(" "), _vm.allErrors.IdAuditPlan ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdAuditPlan[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-3"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Ref.Number")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "RefNumber",
      state: _vm.allErrors.RefNumber ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.RefNumber,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "RefNumber", $$v);
      },
      expression: "field.RefNumber"
    }
  }), _vm._v(" "), _vm.allErrors.RefNumber ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.RefNumber[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-2"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Type of Non Conformity")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "TypeNonConformity",
      state: _vm.allErrors.TypeNonConformity ? false : null,
      readonly: ""
    },
    model: {
      value: _vm.field.TypeNonConformity,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "TypeNonConformity", $$v);
      },
      expression: "field.TypeNonConformity"
    }
  }), _vm._v(" "), _vm.allErrors.TypeNonConformity ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.TypeNonConformity[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "mb-4",
    scopedSlots: _vm._u([{
      key: "header",
      fn: function fn() {
        return [_c("h4", [_vm._v("Standar Audit")])];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _vm._l(_vm.field.AuditClause, function (item, index) {
    return _c("b-form-row", {
      key: index
    }, [_c("b-form-group", {
      staticClass: "col-md-6"
    }, [index == 0 ? _c("label", [_vm._v("Standar ")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "StandartAudit",
        state: _vm.allErrors.StandartAudit ? false : null,
        readonly: ""
      },
      model: {
        value: item.StandartAudit,
        callback: function callback($$v) {
          _vm.$set(item, "StandartAudit", $$v);
        },
        expression: "item.StandartAudit"
      }
    }), _vm._v(" "), _vm.allErrors.StandartAudit ? _c("span", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(_vm.allErrors.StandartAudit[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
      staticClass: "col-md-6"
    }, [index == 0 ? _c("label", [_vm._v("Clause")]) : _vm._e(), _vm._v(" "), _c("b-input", {
      staticClass: "mb-1",
      attrs: {
        name: "Clause",
        state: _vm.allErrors.Clause ? false : null,
        readonly: ""
      },
      model: {
        value: item.Clause,
        callback: function callback($$v) {
          _vm.$set(item, "Clause", $$v);
        },
        expression: "item.Clause"
      }
    }), _vm._v(" "), _vm.allErrors.Clause ? _c("span", {
      staticClass: "text-danger"
    }, [_vm._v(_vm._s(_vm.allErrors.Clause[0]))]) : _vm._e()], 1)], 1);
  })], 2), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Potential Non Comformity")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "PotentialNonConformitiy",
      rows: "3",
      "no-resize": "",
      readonly: ""
    },
    model: {
      value: _vm.field.PotentialNonConformitiy,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "PotentialNonConformitiy", $$v);
      },
      expression: "field.PotentialNonConformitiy"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", [_vm._v("Attachment")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "File",
      "label-idle": "Attachment",
      "allow-multiple": true,
      files: _vm.field.File,
      disabled: true
    },
    on: {
      updatefiles: _vm.handleFile
    }
  })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-12"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Kondisi Saat Ini")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "ConditionNow",
      rows: "3",
      "no-resize": "",
      required: ""
    },
    model: {
      value: _vm.field.ConditionNow,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "ConditionNow", $$v);
      },
      expression: "field.ConditionNow"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-12"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Gap Analysis")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "GapAnalysis",
      rows: "3",
      "no-resize": "",
      required: ""
    },
    model: {
      value: _vm.field.GapAnalysis,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "GapAnalysis", $$v);
      },
      expression: "field.GapAnalysis"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-12"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Potential Clause Non Comformity")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "PotentialCauseNonConformitiy",
      rows: "3",
      "no-resize": "",
      required: ""
    },
    model: {
      value: _vm.field.PotentialCauseNonConformitiy,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "PotentialCauseNonConformitiy", $$v);
      },
      expression: "field.PotentialCauseNonConformitiy"
    }
  })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Corrective Action")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "CorrectiveAction",
      rows: "3",
      "no-resize": "",
      required: ""
    },
    model: {
      value: _vm.field.CorrectiveAction,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "CorrectiveAction", $$v);
      },
      expression: "field.CorrectiveAction"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Execution Plan")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("datepicker", {
    staticClass: "mb-1",
    attrs: {
      format: _vm.formatDate,
      state: _vm.allErrors.ExecutionPlaneCorrective ? false : null,
      bootstrapStyling: true,
      "disabled-dates": _vm.disabledDate,
      required: ""
    },
    model: {
      value: _vm.field.ExecutionPlaneCorrective,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "ExecutionPlaneCorrective", $$v);
      },
      expression: "field.ExecutionPlaneCorrective"
    }
  })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Preventive Action")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "PreventiveAction",
      rows: "3",
      "no-resize": "",
      required: ""
    },
    model: {
      value: _vm.field.PreventiveAction,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "PreventiveAction", $$v);
      },
      expression: "field.PreventiveAction"
    }
  })], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Execution Plan")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("datepicker", {
    staticClass: "mb-1",
    attrs: {
      format: _vm.formatDate,
      state: _vm.allErrors.ExecutionPreventiveAction ? false : null,
      bootstrapStyling: true,
      "disabled-dates": _vm.disabledDate,
      required: ""
    },
    model: {
      value: _vm.field.ExecutionPreventiveAction,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "ExecutionPreventiveAction", $$v);
      },
      expression: "field.ExecutionPreventiveAction"
    }
  })], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
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

/***/ "./resources/assets/src/components/backend/audit/plan-capa-report/form.vue":
/*!*********************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/plan-capa-report/form.vue ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_10e4214c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=10e4214c& */ "./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=template&id=10e4214c&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_10e4214c___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_10e4214c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/audit/plan-capa-report/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=template&id=10e4214c&":
/*!****************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=template&id=10e4214c& ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_10e4214c___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_10e4214c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_10e4214c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=10e4214c& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/plan-capa-report/form.vue?vue&type=template&id=10e4214c&");


/***/ }),

/***/ "./node_modules/vue-text-mask/dist/vueTextMask.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-text-mask/dist/vueTextMask.js ***!
  \********************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.conformToMask=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=r(5),u=n(a);t.default={render:function(e){var t=this;return e("input",{ref:"input",domProps:{value:this.value},attrs:this.$attrs,on:Object.assign(o({},this.$listeners),{input:function(e){return t.updateValue(e.target.value)}})})},name:"masked-input",inheritAttrs:!1,props:{value:{type:String,required:!1,default:""},mask:{type:[Array,Function,Boolean,Object],required:!0},guide:{type:Boolean,required:!1},placeholderChar:{type:String,required:!1},keepCharPositions:{type:Boolean,required:!1},pipe:{type:Function,required:!1},showMask:{type:Boolean,required:!1}},mounted:function(){this.initMask()},methods:{createTextMaskInputElement:u.default,setTextMaskInputElement:function(){this.textMaskInputElement=this.createTextMaskInputElement(o({inputElement:this.$refs.input},this.$options.propsData))},initMask:function(){this.setTextMaskInputElement(),this.textMaskInputElement.update(this.value)},bind:function(){this.setTextMaskInputElement(),this.updateValue(this.value)},updateValue:function(e){this.textMaskInputElement.update(e),this.$emit("input",this.$refs.input.value)}},watch:{mask:function(e,t){this.mask!==t&&this.bind()},guide:function(){this.bind()},placeholderChar:function(){this.bind()},keepCharPositions:function(){this.bind()},pipe:function(){this.bind()},showMask:function(){this.bind()}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_",t.strFunction="function"},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(t)){if(("undefined"==typeof t?"undefined":o(t))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");t=t(e,r),t=(0,i.processCaretTraps)(t).maskWithoutCaretTraps}var n=r.guide,l=void 0===n||n,f=r.previousConformedValue,d=void 0===f?s:f,c=r.placeholderChar,p=void 0===c?a.placeholderChar:c,h=r.placeholder,v=void 0===h?(0,i.convertMaskToPlaceholder)(t,p):h,m=r.currentCaretPosition,y=r.keepCharPositions,g=l===!1&&void 0!==d,b=e.length,k=d.length,C=v.length,x=t.length,P=b-k,M=P>0,T=m+(M?-P:0),O=T+Math.abs(P);if(y===!0&&!M){for(var w=s,S=T;S<O;S++)v[S]===p&&(w+=p);e=e.slice(0,T)+w+e.slice(T,b)}for(var j=e.split(s).map(function(e,t){return{char:e,isNew:t>=T&&t<O}}),V=b-1;V>=0;V--){var E=j[V].char;if(E!==p){var _=V>=T&&k===x;E===v[_?V-P:V]&&j.splice(V,1)}}var A=s,N=!1;e:for(var I=0;I<C;I++){var q=v[I];if(q===p){if(j.length>0)for(;j.length>0;){var F=j.shift(),$=F.char,B=F.isNew;if($===p&&g!==!0){A+=p;continue e}if(t[I].test($)){if(y===!0&&B!==!1&&d!==s&&l!==!1&&M){for(var R=j.length,J=null,W=0;W<R;W++){var L=j[W];if(L.char!==p&&L.isNew===!1)break;if(L.char===p){J=W;break}}null!==J?(A+=$,j.splice(J,1)):I--}else A+=$;continue e}N=!0}g===!1&&(A+=v.substr(I,C));break}A+=q}if(g&&M===!1){for(var D=null,z=0;z<A.length;z++)v[z]===p&&(D=z);A=null!==D?A.substr(0,D+1):s}return{conformedValue:A,meta:{someCharsRejected:N}}}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=n;var i=r(3),a=r(1),u=[],s=""},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){return"undefined"==typeof e||null===e}function s(e){for(var t=[],r=void 0;r=e.indexOf(d),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isArray=o,t.isString=i,t.isNumber=a,t.isNil=u,t.processCaretTraps=s;var l=r(1),f=[],d="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?o:t,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,s=void 0===u?0:u,l=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,h=void 0===p?n:p,v=e.caretTrapIndexes,m=void 0===v?n:v;if(0===s||!f.length)return 0;var y=f.length,g=r.length,b=c.length,k=l.length,C=y-g,x=C>0,P=0===g,M=C>1&&!x&&!P;if(M)return s;var T=x&&(r===l||l===c),O=0,w=void 0,S=void 0;if(T)O=s-C;else{var j=l.toLowerCase(),V=f.toLowerCase(),E=V.substr(0,s).split(o),_=E.filter(function(e){return j.indexOf(e)!==-1});S=_[_.length-1];var A=a.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,N=c.substr(0,_.length).split(o).filter(function(e){return e!==d}).length,I=N!==A,q=void 0!==a[_.length-1]&&void 0!==c[_.length-2]&&a[_.length-1]!==d&&a[_.length-1]!==c[_.length-1]&&a[_.length-1]===c[_.length-2];!x&&(I||q)&&A>0&&c.indexOf(S)>-1&&void 0!==f[s]&&(w=!0,S=f[s]);for(var F=h.map(function(e){return j[e]}),$=F.filter(function(e){return e===S}).length,B=_.filter(function(e){return e===S}).length,R=c.substr(0,c.indexOf(d)).split(o).filter(function(e,t){return e===S&&f[t]!==e}).length,J=R+B+$+(w?1:0),W=0,L=0;L<k;L++){var D=j[L];if(O=L+1,D===S&&W++,W>=J)break}}if(x){for(var z=O,G=O;G<=b;G++)if(c[G]===d&&(z=G),c[G]===d||m.indexOf(G)!==-1||G===b)return z}else if(w){for(var H=O-1;H>=0;H--)if(l[H]===S||m.indexOf(H)!==-1||0===H)return H}else for(var K=O;K>=0;K--)if(c[K-1]===d||m.indexOf(K)!==-1||0===K)return K}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=[],o=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var t={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:t,update:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,l=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?h.placeholderChar:g,k=n.keepCharPositions,C=void 0!==k&&k,x=n.showMask,P=void 0!==x&&x;if("undefined"==typeof r&&(r=o.value),r!==t.previousConformedValue){("undefined"==typeof l?"undefined":s(l))===y&&void 0!==l.pipe&&void 0!==l.mask&&(m=l.pipe,l=l.mask);var M=void 0,T=void 0;if(l instanceof Array&&(M=(0,p.convertMaskToPlaceholder)(l,b)),l!==!1){var O=a(r),w=o.selectionEnd,S=t.previousConformedValue,j=t.previousPlaceholder,V=void 0;if(("undefined"==typeof l?"undefined":s(l))===h.strFunction){if(T=l(O,{currentCaretPosition:w,previousConformedValue:S,placeholderChar:b}),T===!1)return;var E=(0,p.processCaretTraps)(T),_=E.maskWithoutCaretTraps,A=E.indexes;T=_,V=A,M=(0,p.convertMaskToPlaceholder)(T,b)}else T=l;var N={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:M,currentCaretPosition:w,keepCharPositions:C},I=(0,c.default)(O,T,N),q=I.conformedValue,F=("undefined"==typeof m?"undefined":s(m))===h.strFunction,$={};F&&($=m(q,u({rawValue:O},N)),$===!1?$={value:S,rejected:!0}:(0,p.isString)($)&&($={value:$}));var B=F?$.value:q,R=(0,f.default)({previousConformedValue:S,previousPlaceholder:j,conformedValue:B,placeholder:M,rawValue:O,currentCaretPosition:w,placeholderChar:b,indexesOfPipedChars:$.indexesOfPipedChars,caretTrapIndexes:V}),J=B===M&&0===R,W=P?M:v,L=J?W:B;t.previousConformedValue=L,t.previousPlaceholder=M,o.value!==L&&(o.value=L,i(o,R))}}}}}function i(e,t){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(t,t,m)},0):e.setSelectionRange(t,t,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return v;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var l=r(4),f=n(l),d=r(2),c=n(d),p=r(3),h=r(1),v="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ })

}]);