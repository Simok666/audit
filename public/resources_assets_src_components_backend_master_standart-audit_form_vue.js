"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_master_standart-audit_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'form-standart-audit',
  metaInfo: {
    title: 'Form Standart Audit'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/standart-audit-insert',
      headerCard: 'Form / Create Data Standart Audit',
      textBtnSubmit: 'Create',
      field: {
        //   myFile : ''
        File: []
      },
      allErrors: [],
      oldFileRefrensi: [],
      opsStatus: [{
        'value': 1,
        'text': 'Aktif'
      }, {
        'value': 0,
        'text': 'Tidak Aktif'
      }],
      opsOrganizer: [],
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
      formData.append("IdOrganizer", this.field.Organizer.Id);
      formData.append("Standart", this.field.Standart);
      formData.append("Description", this.field.Description);

      for (var i = 0; i < this.field.File.length; i++) {
        var file = this.field.File[i];
        formData.append('FileRefrensi[' + i + ']', file);
      }

      formData.append("OldFileRefrensi", JSON.stringify(this.oldFileRefrensi));
      formData.append("Status", this.field.Status.value);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post(this.urlSubmit, formData, config).then(function (res) {
        var resp = res.data;

        if (resp.status) {
          this.$router.push({
            name: 'master/data-standart-audit',
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
      axios.post('/AdminVue/standart-audit-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        this.field.File = [];

        if (this.field.Path != '') {
          var countPath = this.field.Path.length;

          for (var i = 0; i < countPath; i++) {
            this.oldFileRefrensi.push(this.field.Path[i]);
            this.field.File.push("/" + this.field.Path[i]);
          }
        } else {
          this.oldFileRefrensi = '';
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getSelect: function getSelect() {
      axios.post('/AdminVue/standart-audit-getSelect').then(function (res) {
        this.opsOrganizer = res.data.organizer;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsOrganizer = [];
      }.bind(this));
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/master/data-standart-audit');
    },
    handleFile: function handleFile(files) {
      // console.log('FilePond Updated')
      // example of instance method call on pond reference
      this.field.File = files.map(function (files) {
        return files.file;
      }); // console.log( this.field.myFile )
    },
    priviewFile: function priviewFile() {
      if (this.oldFileRefrensi != '') {
        for (var i = 0; i < this.oldFileRefrensi.length; i++) {
          var file = "/" + this.oldFileRefrensi[i];
          window.open(file, '_blank');
        }
      }
    },
    handleRemove: function handleRemove(error, files) {
      if (this.isFormEdit == true) {
        var index = this.oldFileRefrensi.indexOf(files.source.replace('/clouds', 'clouds'));
        this.oldFileRefrensi.splice(index, 1);
      }
    },
    handleFinish: function handleFinish(files) {
      this.oldFileRefrensi.push('');
    }
  },
  mounted: function mounted() {
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;

      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.isFormEdit = true;
        this.urlSubmit = '/AdminVue/standart-audit-update';
        this.headerCard = 'Form / Edit Data Standart Audit';
        this.textBtnSubmit = 'Update';
      }
    }

    this.getSelect();
  }
});

/***/ }),

/***/ "./resources/assets/src/components/backend/master/standart-audit/form.vue":
/*!********************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/standart-audit/form.vue ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=05d1d980& */ "./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/master/standart-audit/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&":
/*!***************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980& ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=05d1d980& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
                    { staticClass: "col-md-4" },
                    [
                      _c("label", { staticClass: "form-label" }, [
                        _vm._v("Organizer"),
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
                          options: _vm.opsOrganizer,
                          "allow-empty": false,
                          "preselect-first": true,
                          "show-labels": false,
                          placeholder: "Pilih Organizer",
                          label: "Name",
                          "track-by": "Name",
                        },
                        model: {
                          value: _vm.field.Organizer,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Organizer", $$v)
                          },
                          expression: "field.Organizer",
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
                        _vm._v("Standart Audit"),
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
                          name: "Standart",
                          state: _vm.allErrors.Standart ? false : null,
                          required: "",
                        },
                        model: {
                          value: _vm.field.Standart,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Standart", $$v)
                          },
                          expression: "field.Standart",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Standart
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Standart[0])),
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
                        _vm._v("Status"),
                      ]),
                      _vm._v(" "),
                      _c("multiselect", {
                        attrs: {
                          options: _vm.opsStatus,
                          "allow-empty": false,
                          "preselect-first": true,
                          "show-labels": false,
                          placeholder: "Pilih Status",
                          label: "text",
                          "track-by": "text",
                        },
                        model: {
                          value: _vm.field.Status,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Status", $$v)
                          },
                          expression: "field.Status",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Group
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Group[0])),
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
                        _vm._v("Description"),
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
                          name: "Description",
                          rows: "3",
                          "no-resize": "",
                        },
                        model: {
                          value: _vm.field.Description,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Description", $$v)
                          },
                          expression: "field.Description",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Description
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Description[0])),
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
                      _c("label", [_vm._v("Refrensi")]),
                      _vm._v(" "),
                      _c("file-pond", {
                        ref: "pondMyFile",
                        attrs: {
                          name: "File",
                          "label-idle": "Klik Untuk Menambahkan Refrensi",
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



/***/ })

}]);