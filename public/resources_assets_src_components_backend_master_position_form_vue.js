"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_master_position_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-position',
  metaInfo: {
    title: 'Form Position'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/position-insert',
      headerCard: 'Form / Create Data Position',
      textBtnSubmit: 'Create',
      field: {
        //   myFile : ''
        JobDesk: '',
        Email: '',
        Remarks: ''
      },
      allErrors: [],
      opsParent: [],
      opsDepartment: [],
      opsDivision: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      isShow: false
    };
  },
  methods: {
    submitForm: function submitForm() {
      var formData = new FormData();
      if (this.field.Parent) this.field.Parent = this.field.Parent.Id;else this.field.Parent = 0;
      formData.append("Id", this.field.Id);
      if (this.field.Departement) formData.append("IdDepartment", this.field.Departement.Id);else formData.append("IdDepartment", 0);
      if (this.field.Division) formData.append("IdDivision", this.field.Division.Id);else formData.append("IdDivision", 0);
      formData.append("Parent", this.field.Parent);
      formData.append("Code", this.field.Code);
      formData.append("Name", this.field.Name);
      formData.append("JobDesk", this.field.JobDesk);
      formData.append("Remarks", this.field.Remarks);
      formData.append("Email", this.field.Email);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;
        if (resp.status) {
          this.$router.push({
            name: 'master/data-position',
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
          this.scrollTop(0, 1000);
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getData: function getData(Id) {
      axios.post('/AdminVue/position-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        if (this.field.IdDepartment != 0) {
          this.getParent(null, 1);
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getSelect: function getSelect() {
      axios.post('/AdminVue/position-getSelect', {}).then(function (res) {
        this.opsDepartment = res.data.departement;
        this.opsDivision = res.data.division;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsParent = [];
        this.opsDepartment = [];
      }.bind(this));
    },
    getParent: function getParent(value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (mode == 0) var id = value.Id;else var id = this.field.Departement.Id;
      var idPosition = 0;
      if (this.field.Id) idPosition = this.field.Id;
      axios.post('/AdminVue/position-getParent', {
        IdPosition: idPosition,
        IdDepartment: id
      }).then(function (res) {
        this.opsParent = res.data.parent;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsParent = [];
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/master/data-position');
    }
  },
  mounted: function mounted() {
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/position-update';
        this.headerCard = 'Form / Edit Data Position';
        this.textBtnSubmit = 'Update';
      }
    }
    if (this.$route.params.isShow) {
      this.isShow = this.$route.params.isShow;
      var Id = this.$route.params.Id;
      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.headerCard = 'Show Data Position';
      }
    }
    this.getSelect();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
  }, [_vm._v("Code")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Code",
      state: _vm.allErrors.Code ? false : null,
      required: "",
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.Code,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Code", $$v);
      },
      expression: "field.Code"
    }
  }), _vm._v(" "), _vm.allErrors.Code ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Code[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Divisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDivision,
      "allow-empty": false,
      "show-labels": false,
      placeholder: "Pilih Divisi",
      label: "Department",
      "track-by": "Department",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.Division,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Division", $$v);
      },
      expression: "field.Division"
    }
  }), _vm._v(" "), _vm.allErrors.Division ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Division[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Departement")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsDepartment,
      "show-labels": false,
      placeholder: "Pilih Departement",
      label: "Department",
      "track-by": "Department",
      disabled: _vm.isShow
    },
    on: {
      input: _vm.getParent
    },
    model: {
      value: _vm.field.Departement,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Departement", $$v);
      },
      expression: "field.Departement"
    }
  }), _vm._v(" "), _vm.allErrors.IdDepartment ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.IdDepartment[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Parent Position")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsParent,
      "allow-empty": true,
      "show-labels": false,
      placeholder: "Pilih Department Dahulu",
      label: "Name",
      "track-by": "Name",
      disabled: _vm.isShow
    },
    model: {
      value: _vm.field.Parent,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Parent", $$v);
      },
      expression: "field.Parent"
    }
  }), _vm._v(" "), _vm.allErrors.Parent ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Parent[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-3"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Position")]), _vm._v(" "), _vm.isShow == false ? _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]) : _vm._e(), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Name",
      state: _vm.allErrors.Name ? false : null,
      required: "",
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.Name,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Name", $$v);
      },
      expression: "field.Name"
    }
  }), _vm._v(" "), _vm.allErrors.Name ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Name[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-3"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Email")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Email",
      state: _vm.allErrors.Email ? false : null,
      readonly: _vm.isShow
    },
    model: {
      value: _vm.field.Email,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Email", $$v);
      },
      expression: "field.Email"
    }
  }), _vm._v(" "), _vm.allErrors.Email ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Email[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6",
    attrs: {
      label: ""
    }
  }, [_vm.isShow == false ? _c("b-btn", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "submit",
      variant: "primary"
    }
  }, [_vm._v(_vm._s(_vm.textBtnSubmit))]) : _vm._e(), _vm._v(" "), _c("b-btn", {
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

/***/ "./resources/assets/src/components/backend/master/position/form.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/position/form.vue ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=5c71661c& */ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/master/position/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c& ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_5c71661c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=5c71661c& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/position/form.vue?vue&type=template&id=5c71661c&");


/***/ })

}]);