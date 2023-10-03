"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_master_personel-auditor_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'form-personel-auditor',
  metaInfo: {
    title: 'Form Personel Auditor'
  },
  components: {},
  data: function data() {
    return {
      urlSubmit: '/AdminVue/personel-auditor-insert',
      headerCard: 'Form / Create Data Personel Auditor',
      textBtnSubmit: 'Create',
      field: {
        //   myFile : ''
        NIK: '',
        Position: '',
        Department: '',
        IdEmploye: 0,
        IdDepartment: 0,
        IdPosition: 0
      },
      allErrors: [],
      opsType: [{
        'value': 'Auditor',
        'text': 'Auditor'
      }, {
        'value': 'Auditee',
        'text': 'Auditee'
      }, {
        'value': 'Observer',
        'text': 'Observer'
      }],
      opsCategory: [{
        'value': 1,
        'text': 'Internal'
      }, {
        'value': 2,
        'text': 'Eksternal'
      }],
      opsStatus: [{
        'value': 1,
        'text': 'Aktif'
      }, {
        'value': 0,
        'text': 'Tidak Aktif'
      }],
      opsEmployee: [],
      opsDepartement: [],
      opsPosition: [],
      placeholdertext: 'Pilih Departement Terlebih Dahulu',
      isNotif: false,
      isReadOnly: true,
      isSelect: true,
      alertNotif: '',
      alertVariant: 'alert-dark-danger'
    };
  },
  methods: {
    submitForm: function submitForm() {
      var formData = new FormData();
      formData.append("Id", this.field.Id);
      formData.append("IdDepartment", this.field.IdDepartment);
      formData.append("IdEmploye", this.field.IdEmploye);
      formData.append("NIP", this.field.NIP);
      formData.append("Name", this.field.Name);
      formData.append("Department", this.field.DepartmentName);
      formData.append("Position", this.field.PositionName);
      formData.append("Category", this.field.Category.value);
      formData.append("IdPosition", this.field.IdPosition);
      formData.append("Type", this.field.Type.value);
      formData.append("Status", this.field.Status.value);
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
            name: 'master/data-personel-auditor',
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
      axios.post('/AdminVue/personel-auditor-edit', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;

        if (this.field.Categoryvalue == 1) {
          this.isReadOnly = true;
          this.isSelect = true;
        } else {
          this.isReadOnly = false;
          this.isSelect = false;
        }

        this.getPosition(this.field.IdDepartment, true);
        this.getSelect(this.field.IdEmploye);
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.isNotif = true;
        this.alertNotif = 'Invalid Server Side!';
        this.alertVariant = 'alert-dark-danger';
      }.bind(this));
    },
    getSelect: function getSelect(IdEmploye) {
      axios.post('/AdminVue/personel-auditor-getSelect', {
        IdEmploye: IdEmploye
      }).then(function (res) {
        this.opsEmployee = res.data.employee;
        this.opsDepartement = res.data.departement;
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsEmployee = [];
        this.opsDepartement = [];
      }.bind(this));
    },
    getPosition: function getPosition(Id, statusEdit) {
      var statusSelectEmployee = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var IdPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var Position = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      axios.post('/AdminVue/personel-auditor-getPosition', {
        IdDepartment: Id
      }).then(function (res) {
        this.opsPosition = res.data.position;

        if (statusEdit == false) {
          this.placeholdertext = 'Pilih Posisition';
          this.field.Position = '';
        }

        if (statusSelectEmployee == true) {
          this.field.Position = [{
            'Id': IdPosition,
            'Name': Position
          }];
          this.field.IdPosition = IdPosition;
          this.field.PositionName = Position;
        }
      }.bind(this))["catch"](function (e) {
        console.log(e);
        this.opsPosition = [];
      }.bind(this));
    },
    getEmployeeNip: function getEmployeeNip(option) {
      this.field.NIP = option.NIP;
      this.field.IdEmploye = option.Id;
      this.field.Name = option.Name;
      this.field.Email = option.Email;
      this.field.Department = [{
        'Id': option.IdDepartment,
        'Department': option.Department
      }];
      this.field.IdDepartment = option.Id;
      this.field.DepartmentName = option.Department;
      this.getPosition(option.IdDepartment, false, true, option.IdPosition, option.Position);
    },
    getPositionSelect: function getPositionSelect(option) {
      this.field.IdDepartment = option.Id;
      this.field.DepartmentName = option.Department;
      this.getPosition(option.Id, false);
    },
    getPositionId: function getPositionId(option) {
      this.field.IdPosition = option.Id;
      this.field.PositionName = option.Name;
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/master/data-personel-auditor');
    },
    getClassification: function getClassification(option) {
      if (option.text == 'Internal') {
        this.isReadOnly = true;
        this.isSelect = true;
      } else {
        this.isReadOnly = false;
        this.isSelect = false;
      }
    }
  },
  mounted: function mounted() {
    if (this.$route.params.isFormEdit) {
      var Id = this.$route.params.Id;

      if (Id) {
        this.getData(Id);
        this.field.Id = Id;
        this.urlSubmit = '/AdminVue/personel-auditor-update';
        this.headerCard = 'Form / Edit Data Personel Auditor';
        this.textBtnSubmit = 'Update';
      }
    } else {
      this.getSelect(this.field.IdEmploye);
    }
  }
});

/***/ }),

/***/ "./resources/assets/src/components/backend/master/personel-auditor/form.vue":
/*!**********************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/personel-auditor/form.vue ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_67c0c5ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=67c0c5ae& */ "./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=template&id=67c0c5ae&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_67c0c5ae___WEBPACK_IMPORTED_MODULE_0__.render,
  _form_vue_vue_type_template_id_67c0c5ae___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/master/personel-auditor/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=template&id=67c0c5ae&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=template&id=67c0c5ae& ***!
  \*****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_67c0c5ae___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_67c0c5ae___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_67c0c5ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=67c0c5ae& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=template&id=67c0c5ae&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=template&id=67c0c5ae&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/personel-auditor/form.vue?vue&type=template&id=67c0c5ae& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
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
                        _vm._v("Klasifikasi"),
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
                          options: _vm.opsCategory,
                          "allow-empty": false,
                          "preselect-first": true,
                          "show-labels": false,
                          placeholder: "Pilih Klasifikasi",
                          label: "text",
                          "track-by": "text",
                        },
                        on: { select: _vm.getClassification },
                        model: {
                          value: _vm.field.Category,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Category", $$v)
                          },
                          expression: "field.Category",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Category
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Category[0])),
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
                        _vm._v("Nama Karyawan"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _vm.isSelect == true
                        ? _c("multiselect", {
                            attrs: {
                              options: _vm.opsEmployee,
                              "allow-empty": false,
                              "show-labels": false,
                              placeholder: "Pilih Karyawan",
                              label: "Name",
                              "track-by": "Name",
                            },
                            on: { select: _vm.getEmployeeNip },
                            model: {
                              value: _vm.field.Employee,
                              callback: function ($$v) {
                                _vm.$set(_vm.field, "Employee", $$v)
                              },
                              expression: "field.Employee",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isSelect == false
                        ? _c("b-input", {
                            staticClass: "mb-1",
                            attrs: {
                              name: "Name",
                              state: _vm.allErrors.Name ? false : null,
                            },
                            model: {
                              value: _vm.field.Name,
                              callback: function ($$v) {
                                _vm.$set(_vm.field, "Name", $$v)
                              },
                              expression: "field.Name",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.allErrors.Name
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Name[0])),
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
                        _vm._v("NIK/NIP"),
                      ]),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "NIP",
                          state: _vm.allErrors.NIP ? false : null,
                          type: "number",
                          readonly: _vm.isReadOnly,
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
                      _vm.allErrors.NIK
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.NIK[0])),
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
                        _vm._v("Departement"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _vm.isSelect == true
                        ? _c("multiselect", {
                            attrs: {
                              options: _vm.opsDepartement,
                              "allow-empty": false,
                              "show-labels": false,
                              placeholder: "Pilih Departement",
                              label: "Department",
                              "track-by": "Department",
                            },
                            on: { select: _vm.getPositionSelect },
                            model: {
                              value: _vm.field.Department,
                              callback: function ($$v) {
                                _vm.$set(_vm.field, "Department", $$v)
                              },
                              expression: "field.Department",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isSelect == false
                        ? _c("b-input", {
                            staticClass: "mb-1",
                            attrs: {
                              name: "DepartmentName",
                              state: _vm.allErrors.DepartmentName
                                ? false
                                : null,
                            },
                            model: {
                              value: _vm.field.DepartmentName,
                              callback: function ($$v) {
                                _vm.$set(_vm.field, "DepartmentName", $$v)
                              },
                              expression: "field.DepartmentName",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.allErrors.Departement
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Departement[0])),
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
                        _vm._v("Position"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _vm.isSelect == true
                        ? _c("multiselect", {
                            attrs: {
                              options: _vm.opsPosition,
                              "show-labels": false,
                              placeholder: _vm.placeholdertext,
                              label: "Name",
                              "track-by": "Name",
                            },
                            on: { select: _vm.getPositionId },
                            model: {
                              value: _vm.field.Position,
                              callback: function ($$v) {
                                _vm.$set(_vm.field, "Position", $$v)
                              },
                              expression: "field.Position",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isSelect == false
                        ? _c("b-input", {
                            staticClass: "mb-1",
                            attrs: {
                              name: "PositionName",
                              state: _vm.allErrors.PositionName ? false : null,
                            },
                            model: {
                              value: _vm.field.PositionName,
                              callback: function ($$v) {
                                _vm.$set(_vm.field, "PositionName", $$v)
                              },
                              expression: "field.PositionName",
                            },
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.allErrors.Position
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Position[0])),
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
                      _c(
                        "label",
                        { staticClass: "form-label float-right text-danger" },
                        [_vm._v("*Wajib Diisi")]
                      ),
                      _vm._v(" "),
                      _c("b-input", {
                        staticClass: "mb-1",
                        attrs: {
                          name: "Email",
                          state: _vm.allErrors.Email ? false : null,
                          required: "",
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
                        _vm._v("Type"),
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
                          options: _vm.opsType,
                          "allow-empty": false,
                          "preselect-first": true,
                          "show-labels": false,
                          placeholder: "Pilih Type",
                          label: "text",
                          "track-by": "text",
                        },
                        model: {
                          value: _vm.field.Type,
                          callback: function ($$v) {
                            _vm.$set(_vm.field, "Type", $$v)
                          },
                          expression: "field.Type",
                        },
                      }),
                      _vm._v(" "),
                      _vm.allErrors.Type
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Type[0])),
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
                        _vm._v("Status"),
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
                      _vm.allErrors.Status
                        ? _c("span", { staticClass: "text-danger" }, [
                            _vm._v(_vm._s(_vm.allErrors.Status[0])),
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