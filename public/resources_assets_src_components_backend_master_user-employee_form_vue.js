"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_master_user-employee_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'form-user-employee',
  metaInfo: {
    title: 'Form User Karyawan'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/user-employee-insert',
      headerCard: 'Form / Create Data User Karyawan',
      textBtnSubmit: 'Create',
      field: {// myFile : ''
      },
      allErrors: [],
      isNotif: false,
      isFormCreate: true,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsDepartment: [],
      opsCity: [],
      opsTypeUser: []
    };
  },
  methods: {
    submitForm: function submitForm() {
      var formData = new FormData();
      formData.append("Id", this.field.Id);
      if (this.field.IdDepartment) formData.append("IdDepartment", this.field.IdDepartment.IdDepartment);
      if (this.field.IdDepartment) formData.append("IdPosition", this.field.IdDepartment.IdPosition);
      formData.append("Name", this.field.Name);
      formData.append("NIP", this.field.NIP);
      formData.append("Email", this.field.Email); // formData.append("DateBirth", this.field.DateBirth)
      // formData.append("CellPhone", this.field.CellPhone)
      // formData.append("HomePhone", this.field.HomePhone)
      // if(this.field.IdCity) formData.append("IdCity", this.field.IdCity.Id)

      if (this.field.TypeUser) formData.append("TypeUser", this.field.TypeUser.Id);
      formData.append("UserName", this.field.UserName);
      if (this.field.Password) formData.append("Password", this.field.Password); // formData.append("Address", this.field.Address)
      // formData.append("Bio", this.field.Bio)

      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;

        if (resp.status) {
          this.$router.push({
            name: 'master/data-user-employee',
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
      axios.post('/AdminVue/user-employee-edit', {
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
    getDepartment: function getDepartment() {
      axios.post('/AdminVue/user-get-department').then(function (res) {
        // console.log(res.data.data)
        this.opsDepartment = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsDepartment = [];
      }.bind(this));
    },
    getCity: function getCity() {
      axios.post('/AdminVue/user-get-city').then(function (res) {
        // console.log(res.data.data)
        this.opsCity = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsCity = [];
      }.bind(this));
    },
    getTypeUser: function getTypeUser() {
      axios.post('/AdminVue/user-get-type-user').then(function (res) {
        // console.log(res.data.data)
        this.opsTypeUser = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsTypeUser = [];
      }.bind(this));
    },
    labelDepartment: function labelDepartment(_ref) {
      var Position = _ref.Position,
          Department = _ref.Department;
      return "".concat(Position, " \u2014 ").concat(Department);
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/master/data-user-employee');
    }
  },
  mounted: function mounted() {
    this.getDepartment(); // this.getCity()

    this.getTypeUser();

    if (this.$route.params.isFormEdit) {
      this.isFormCreate = false;
      var Id = this.$route.params.Id;

      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/user-employee-update';
        this.headerCard = 'Form / Edit Data User Karyawan';
        this.textBtnSubmit = 'Update';
      }
    }
  }
});

/***/ }),

/***/ "./resources/assets/src/components/backend/master/user-employee/form.vue":
/*!*******************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/user-employee/form.vue ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=510526ab& */ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/master/user-employee/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab& ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_510526ab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=510526ab& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/user-employee/form.vue?vue&type=template&id=510526ab& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
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
                    { staticClass: "col-md-6" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Position — Department"),
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
                          options: _vm.opsDepartment,
                          "allow-empty": false,
                          "show-labels": false,
                          placeholder: "Pilih Department",
                          label: "Department",
                          "custom-label": _vm.labelDepartment,
                          "track-by": "Department",
                        },
                        model: {
                          value: _vm.field.IdDepartment,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "IdDepartment", $$v)
                          },
                          expression: "field.IdDepartment",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.IdDepartment
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.IdDepartment[0])),
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
                        _vm._v("Nama Karyawan"),
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
                          name: "Name",
                          state: _vm.allErrors.Name ? false : null,
                          required: "",
                        },
                        model: {
                          value: _vm.field.Name,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Name", $$v)
                          },
                          expression: "field.Name",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Name
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Name[0])),
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
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("NIP"),
                      ]),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "NIP",
                          state: _vm.allErrors.NIP ? false : null,
                          type: "number",
                        },
                        model: {
                          value: _vm.field.NIP,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "NIP", $$v)
                          },
                          expression: "field.NIP",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.NIP
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.NIP[0])),
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
                        _vm._v("Email"),
                      ]),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "Email",
                          state: _vm.allErrors.Email ? false : null,
                        },
                        model: {
                          value: _vm.field.Email,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Email", $$v)
                          },
                          expression: "field.Email",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Email
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Email[0])),
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
                        _vm._v("Hak Akses User"),
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
                          options: _vm.opsTypeUser,
                          "allow-empty": false,
                          "show-labels": false,
                          placeholder: "Pilih Type User",
                          label: "TypeUser",
                          "track-by": "TypeUser",
                        },
                        model: {
                          value: _vm.field.TypeUser,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "TypeUser", $$v)
                          },
                          expression: "field.TypeUser",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.TypeUser
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.TypeUser[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("b-form-row"),
              _vm._v(" "),
              _c("b-form-row"),
              _vm._v(" "),
              _c(
                "b-form-row",
                [
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-6" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("User Name"),
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
                          name: "UserName",
                          state: _vm.allErrors.UserName ? false : null,
                          required: "",
                        },
                        model: {
                          value: _vm.field.UserName,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "UserName", $$v)
                          },
                          expression: "field.UserName",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.UserName
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.UserName[0])),
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
                        _vm._v("Password"),
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
                          name: "Password",
                          state: _vm.allErrors.Password ? false : null,
                          type: "password",
                          required: _vm.isFormCreate,
                        },
                        model: {
                          value: _vm.field.Password,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Password", $$v)
                          },
                          expression: "field.Password",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Password
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Password[0])),
                          ])
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("b-form-row"),
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