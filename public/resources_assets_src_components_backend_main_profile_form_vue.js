"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_main_profile_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-profile',
  metaInfo: {
    title: 'Form Edit Profile'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/profile-update',
      headerCard: 'Form / Update Data Profile',
      textBtnSubmit: 'Update',
      field: {
        myFile: ''
      },
      allErrors: [],
      isNotif: false,
      alertNotif: '',
      alertVariant: 'alert-dark-danger',
      opsCity: []
    };
  },
  methods: {
    submitForm: function submitForm() {
      if (this.field.myFile.length == 0) this.field.myOldFile = '';
      var formData = new FormData();
      formData.append("Id", this.$route.params.Id);
      formData.append("EmpName", this.field.EmpName);
      formData.append("NIP", this.field.NIP);
      formData.append("DateBirth", this.field.DateBirth);
      formData.append("CellPhone", this.field.CellPhone);
      formData.append("IdCity", this.field.IdCity.Id);
      formData.append("OldPassword", this.field.OldPassword);
      formData.append("NewPassword", this.field.NewPassword);
      formData.append("ConfirmPassword", this.field.ConfirmPassword);
      formData.append("Address", this.field.Address);
      formData.append("Bio", this.field.Bio);
      formData.append("File", this.field.myFile[0]);
      formData.append("OldFile", this.field.myOldFile);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;

        if (resp.status) {
          this.$store.replaceState({
            savedUserProfile: {}
          });
          this.$router.push({
            name: 'main/profile',
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
      axios.post('/AdminVue/profile-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        this.field.myFile = "/" + this.field.Photo;
        this.field.myOldFile = this.field.Photo;
      }.bind(this))["catch"](function (e) {
        console.log(e);
      }.bind(this));
    },
    getCity: function getCity() {
      axios.post('/AdminVue/profile-get-city').then(function (res) {
        this.opsCity = res.data.data;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsCity = [];
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/main/profile');
    },
    handleFile: function handleFile(files) {
      this.field.myFile = files.map(function (files) {
        return files.file;
      });
    }
  },
  mounted: function mounted() {
    this.getCity();
    var Id = this.$route.params.Id;

    if (Id) {
      this.getData(Id); // this.field.Id = Id
    }
  }
});

/***/ }),

/***/ "./resources/assets/src/components/backend/main/profile/form.vue":
/*!***********************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/profile/form.vue ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=3e30e44a& */ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/main/profile/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a& ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_3e30e44a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=3e30e44a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/main/profile/form.vue?vue&type=template&id=3e30e44a& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
                        _vm._v("Upload Foto"),
                      ]),
                      _vm._v(" "),
                      _c("file-pond", {
                        ref: "pondMyFile",
                        attrs: {
                          name: "myFile",
                          "label-idle": "Click to Browse or Drop files here...",
                          "allow-multiple": false,
                          files: _vm.field.myFile,
                          "accepted-file-types": "image/jpeg, image/png",
                        },
                        on: { updatefiles: _vm.handleFile },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    { staticClass: "col-md-6" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Nama Lengkap"),
                      ]),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "EmpName",
                          state: _vm.allErrors.EmpName ? false : null,
                          required: "",
                        },
                        model: {
                          value: _vm.field.EmpName,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "EmpName", $$v)
                          },
                          expression: "field.EmpName",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.EmpName
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.EmpName[0])),
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
                        _vm._v("Nomor HP"),
                      ]),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "CellPhone",
                          state: _vm.allErrors.CellPhone ? false : null,
                          type: "number",
                          required: "",
                        },
                        model: {
                          value: _vm.field.CellPhone,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "CellPhone", $$v)
                          },
                          expression: "field.CellPhone",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.CellPhone
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.CellPhone[0])),
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
                        _vm._v("Kota / Kab"),
                      ]),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsCity,
                          "allow-empty": false,
                          "show-labels": false,
                          placeholder: "Pilih Kota / Kab",
                          label: "City",
                          "track-by": "City",
                        },
                        model: {
                          value: _vm.field.IdCity,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "IdCity", $$v)
                          },
                          expression: "field.IdCity",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.IdCity
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.IdCity[0])),
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
                        _vm._v("Password Lama"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-primary" },
                        [_vm._v("*Isi jika ingin merubah Password")]
                      ),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "OldPassword",
                          state: _vm.allErrors.OldPassword ? false : null,
                          type: "password",
                        },
                        model: {
                          value: _vm.field.OldPassword,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "OldPassword", $$v)
                          },
                          expression: "field.OldPassword",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.OldPassword
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.OldPassword[0])),
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
                        _vm._v("Password Baru"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-primary" },
                        [_vm._v("*Isi jika ingin merubah Password")]
                      ),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "NewPassword",
                          state: _vm.allErrors.NewPassword ? false : null,
                          type: "password",
                        },
                        model: {
                          value: _vm.field.NewPassword,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "NewPassword", $$v)
                          },
                          expression: "field.NewPassword",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.NewPassword
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.NewPassword[0])),
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
                        _vm._v("Password Confirm Password"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-primary" },
                        [_vm._v("*Isi jika ingin merubah Password")]
                      ),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "ConfirmPassword",
                          state: _vm.allErrors.ConfirmPassword ? false : null,
                          type: "password",
                        },
                        model: {
                          value: _vm.field.ConfirmPassword,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "ConfirmPassword", $$v)
                          },
                          expression: "field.ConfirmPassword",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.ConfirmPassword
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.ConfirmPassword[0])),
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