"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_master_department_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/department/form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/department/form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
  name: 'form-department',
  metaInfo: {
    title: 'Form Department'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/department-insert',
      headerCard: 'Form / Create Data Department',
      textBtnSubmit: 'Create',
      field: {//   myFile : ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsDivision: []
    };
  },
  methods: {
    submitForm: function submitForm() {
      var formData = new FormData();
      formData.append("Id", this.field.Id);
      formData.append("Code", this.field.Code);
      if (this.field.Parent) formData.append("Parent", this.field.Parent.Id);
      formData.append("Department", this.field.Department);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;

        if (resp.status) {
          this.$router.push({
            name: 'master/data-department',
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
      axios.post('/AdminVue/department-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/master/data-department');
    },
    getDivision: function getDivision() {
      axios.post('/AdminVue/department-get-division').then(function (res) {
        this.opsDivision = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsDivision = [];
      }.bind(this));
    }
  },
  mounted: function mounted() {
    this.getDivision();

    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;

      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/department-update';
        this.headerCard = 'Form / Edit Data Department';
        this.textBtnSubmit = 'Update';
      }
    }
  }
});

/***/ }),

/***/ "./resources/assets/src/components/backend/master/department/form.vue":
/*!****************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/department/form.vue ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_0d5d362e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=0d5d362e& */ "./resources/assets/src/components/backend/master/department/form.vue?vue&type=template&id=0d5d362e&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/department/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_0d5d362e___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_0d5d362e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/master/department/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/master/department/form.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/department/form.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/department/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/department/form.vue?vue&type=template&id=0d5d362e&":
/*!***********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/department/form.vue?vue&type=template&id=0d5d362e& ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_0d5d362e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_0d5d362e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_0d5d362e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=0d5d362e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/department/form.vue?vue&type=template&id=0d5d362e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/department/form.vue?vue&type=template&id=0d5d362e&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/department/form.vue?vue&type=template&id=0d5d362e& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
                    { staticClass: "col-md-2" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Code"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "Code",
                          state: _vm.allErrors.Code ? false : null,
                          required: "",
                        },
                        model: {
                          value: _vm.field.Code,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Code", $$v)
                          },
                          expression: "field.Code",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Code
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Code[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-5" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Division"),
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
                          options: _vm.opsDivision,
                          "allow-empty": false,
                          "show-labels": false,
                          placeholder: "Pilih Division",
                          label: "Division",
                          "track-by": "Division",
                        },
                        model: {
                          value: _vm.field.Parent,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Parent", $$v)
                          },
                          expression: "field.Parent",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Parent
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Parent[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-5" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Department"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "Department",
                          state: _vm.allErrors.Department ? false : null,
                          required: "",
                        },
                        model: {
                          value: _vm.field.Department,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Department", $$v)
                          },
                          expression: "field.Department",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Department
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Department[0])),
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



/***/ })

}]);