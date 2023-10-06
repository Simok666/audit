"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_master_standart-audit_form_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'form-standart-audit',
  metaInfo: {
    title: 'Form Standart Audit'
  },
  components: {
    quillEditor: function quillEditor() {
      return __webpack_require__.e(/*! import() */ "node_modules_vue-quill-editor_dist_vue-quill-editor_js").then(__webpack_require__.t.bind(__webpack_require__, /*! vue-quill-editor/dist/vue-quill-editor */ "./node_modules/vue-quill-editor/dist/vue-quill-editor.js", 23)).then(function (m) {
        return m.quillEditor;
      })["catch"](function () {});
    }
  },
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
      alertVariant: 'alert-dark-danger',
      editorOptions: {
        modules: {
          toolbar: [[{
            header: [1, 2, 3, 4, 5, 6, false]
          }, {
            font: []
          }, {
            size: []
          }], ['bold', 'italic', 'underline', 'strike'], [{
            align: []
          }], ['link', 'video']]
        }
      }
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
      });
      // console.log( this.field.myFile )
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("Organizer")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsOrganizer,
      "allow-empty": false,
      "preselect-first": true,
      "show-labels": false,
      placeholder: "Pilih Organizer",
      label: "Name",
      "track-by": "Name"
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
  }, [_vm._v("Standart Audit")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-input", {
    staticClass: "mb-1",
    attrs: {
      name: "Standart",
      state: _vm.allErrors.Standart ? false : null,
      required: ""
    },
    model: {
      value: _vm.field.Standart,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Standart", $$v);
      },
      expression: "field.Standart"
    }
  }), _vm._v(" "), _vm.allErrors.Standart ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Standart[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-4"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Status")]), _vm._v(" "), _c("multiselect", {
    attrs: {
      options: _vm.opsStatus,
      "allow-empty": false,
      "preselect-first": true,
      "show-labels": false,
      placeholder: "Pilih Status",
      label: "text",
      "track-by": "text"
    },
    model: {
      value: _vm.field.Status,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Status", $$v);
      },
      expression: "field.Status"
    }
  }), _vm._v(" "), _vm.allErrors.Group ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Group[0]))]) : _vm._e()], 1)], 1), _vm._v(" "), _c("b-form-row", [_c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", {
    staticClass: "form-label"
  }, [_vm._v("Description")]), _vm._v(" "), _c("label", {
    staticClass: "form-label float-right text-danger"
  }, [_vm._v("*Wajib Diisi")]), _vm._v(" "), _c("b-form-textarea", {
    attrs: {
      name: "Description",
      rows: "3",
      "no-resize": ""
    },
    model: {
      value: _vm.field.Description,
      callback: function callback($$v) {
        _vm.$set(_vm.field, "Description", $$v);
      },
      expression: "field.Description"
    }
  }), _vm._v(" "), _vm.allErrors.Description ? _c("span", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.allErrors.Description[0]))]) : _vm._e()], 1), _vm._v(" "), _c("b-form-group", {
    staticClass: "col-md-6"
  }, [_c("label", [_vm._v("Refrensi")]), _vm._v(" "), _c("file-pond", {
    ref: "pondMyFile",
    attrs: {
      name: "File",
      "label-idle": "Klik Untuk Menambahkan Refrensi",
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ql-container {\n  position: relative;\n  margin: 0;\n  display: block;\n}\n.ql-container.ql-disabled .ql-tooltip {\n  visibility: hidden;\n}\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n  pointer-events: none;\n}\n.ql-clipboard {\n  position: absolute;\n  top: 50%;\n  left: -6250rem;\n  overflow-y: hidden;\n  height: .0625rem;\n}\n.ql-editor {\n  box-sizing: border-box;\n  height: 100%;\n  outline: none;\n  overflow-y: auto;\n  -o-tab-size: 4;\n     tab-size: 4;\n  -moz-tab-size: 4;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  display: block;\n}\n.ql-editor > * {\n  cursor: text;\n}\n.ql-editor.ql-blank::before {\n  content: attr(data-placeholder);\n  position: absolute;\n  right: 0;\n  left: 0;\n  font-style: italic;\n  pointer-events: none;\n}\n.ql-snow,\n.ql-bubble {\n  box-sizing: border-box;\n}\n.ql-snow *,\n.ql-bubble * {\n  box-sizing: border-box;\n}\n.ql-snow .ql-hidden,\n.ql-bubble .ql-hidden {\n  display: none !important;\n}\n.ql-snow .ql-out-bottom,\n.ql-snow .ql-out-top,\n.ql-bubble .ql-out-bottom,\n.ql-bubble .ql-out-top {\n  visibility: hidden;\n}\n.ql-snow .ql-empty,\n.ql-bubble .ql-empty {\n  fill: none;\n}\n.ql-snow .ql-even,\n.ql-bubble .ql-even {\n  fill-rule: evenodd;\n}\n.ql-snow .ql-thin,\n.ql-snow .ql-stroke.ql-thin,\n.ql-bubble .ql-thin,\n.ql-bubble .ql-stroke.ql-thin {\n  stroke-width: 1;\n}\n.ql-snow .ql-transparent,\n.ql-bubble .ql-transparent {\n  opacity: .4;\n}\n.ql-snow .ql-direction svg:last-child,\n.ql-bubble .ql-direction svg:last-child {\n  display: none;\n}\n.ql-snow .ql-direction.ql-active svg:last-child,\n.ql-bubble .ql-direction.ql-active svg:last-child {\n  display: inline;\n}\n.ql-snow .ql-direction.ql-active svg:first-child,\n.ql-bubble .ql-direction.ql-active svg:first-child {\n  display: none;\n}\n.ql-snow .ql-editor a,\n.ql-bubble .ql-editor a {\n  text-decoration: underline;\n}\n.ql-snow.ql-toolbar,\n.ql-snow .ql-toolbar,\n.ql-bubble.ql-toolbar,\n.ql-bubble .ql-toolbar {\n  box-sizing: border-box;\n  padding: .5rem;\n}\n.ql-snow.ql-toolbar::after,\n.ql-snow .ql-toolbar::after,\n.ql-bubble.ql-toolbar::after,\n.ql-bubble .ql-toolbar::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.ql-snow.ql-toolbar button,\n.ql-snow .ql-toolbar button,\n.ql-bubble.ql-toolbar button,\n.ql-bubble .ql-toolbar button {\n  display: inline-block;\n  float: left;\n  padding: .1875rem .3125rem;\n  width: 1.75rem;\n  height: 1.5rem;\n  border: none;\n  background: none;\n  cursor: pointer;\n}\n.ql-snow.ql-toolbar button:active:hover,\n.ql-snow .ql-toolbar button:active:hover,\n.ql-bubble.ql-toolbar button:active:hover,\n.ql-bubble .ql-toolbar button:active:hover {\n  outline: none;\n}\n.ql-snow.ql-toolbar button svg,\n.ql-snow .ql-toolbar button svg,\n.ql-bubble.ql-toolbar button svg,\n.ql-bubble .ql-toolbar button svg {\n  float: left;\n  height: 100%;\n}\n.ql-snow.ql-toolbar input.ql-image[type=file],\n.ql-snow .ql-toolbar input.ql-image[type=file],\n.ql-bubble.ql-toolbar input.ql-image[type=file],\n.ql-bubble .ql-toolbar input.ql-image[type=file] {\n  display: none;\n}\n.ql-snow .ql-tooltip,\n.ql-bubble .ql-tooltip {\n  position: absolute;\n  -webkit-transform: translateY(0.625rem);\n          transform: translateY(0.625rem);\n}\n.ql-snow .ql-tooltip.ql-flip,\n.ql-bubble .ql-tooltip.ql-flip {\n  -webkit-transform: translateY(-0.625rem);\n          transform: translateY(-0.625rem);\n}\n.ql-snow .ql-tooltip a,\n.ql-bubble .ql-tooltip a {\n  text-decoration: none;\n  cursor: pointer;\n}\n.ql-snow .ql-formats,\n.ql-bubble .ql-formats {\n  display: inline-block;\n  margin-right: .9375rem;\n  vertical-align: middle;\n}\n.ql-snow .ql-formats::after,\n.ql-bubble .ql-formats::after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.ql-snow .ql-picker,\n.ql-bubble .ql-picker {\n  position: relative;\n  display: inline-block;\n  float: left;\n  height: 1.5rem;\n  vertical-align: middle;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-options,\n.ql-bubble .ql-picker.ql-expanded .ql-picker-options {\n  top: 100%;\n  z-index: 1;\n  display: block;\n  margin-top: -.0625rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before, .ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before, .ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {\n  content: attr(data-label);\n}\n.ql-snow .ql-picker.ql-header,\n.ql-bubble .ql-picker.ql-header {\n  width: 6.125rem;\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item::before {\n  content: 'Normal';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  content: 'Heading 1';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  content: 'Heading 2';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  content: 'Heading 3';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  content: 'Heading 4';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  content: 'Heading 5';\n}\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]::before,\n.ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  content: 'Heading 6';\n}\n.ql-snow .ql-picker.ql-font,\n.ql-bubble .ql-picker.ql-font {\n  width: 6.75rem;\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-label::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item::before {\n  content: 'Sans Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  content: 'Serif';\n}\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n.ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  content: 'Monospace';\n}\n.ql-snow .ql-picker.ql-size,\n.ql-bubble .ql-picker.ql-size {\n  width: 6.125rem;\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-label::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item::before {\n  content: 'Normal';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  content: 'Small';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  content: 'Large';\n}\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n.ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  content: 'Huge';\n}\n.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg,\n.ql-bubble .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n  position: absolute;\n  top: 50%;\n  right: 0;\n  margin-top: -.5625rem;\n  width: 1.125rem;\n}\n.ql-snow .ql-picker-label,\n.ql-bubble .ql-picker-label {\n  position: relative;\n  display: inline-block;\n  padding-right: .125rem;\n  padding-left: .5rem;\n  width: 100%;\n  height: 100%;\n  border: 1px solid transparent;\n  cursor: pointer;\n}\n.ql-snow .ql-picker-label::before,\n.ql-bubble .ql-picker-label::before {\n  display: inline-block;\n  line-height: 1.375rem;\n}\n.ql-snow .ql-picker-options,\n.ql-bubble .ql-picker-options {\n  position: absolute;\n  display: none;\n  padding: .25rem .5rem;\n  min-width: 100%;\n  white-space: nowrap;\n}\n.ql-snow .ql-picker-options .ql-picker-item,\n.ql-bubble .ql-picker-options .ql-picker-item {\n  display: block;\n  padding-top: .3125rem;\n  padding-bottom: .3125rem;\n  cursor: pointer;\n}\n.ql-snow .ql-color-picker,\n.ql-snow .ql-icon-picker,\n.ql-bubble .ql-color-picker,\n.ql-bubble .ql-icon-picker {\n  width: 1.75rem;\n}\n.ql-snow .ql-color-picker .ql-picker-label,\n.ql-snow .ql-icon-picker .ql-picker-label,\n.ql-bubble .ql-color-picker .ql-picker-label,\n.ql-bubble .ql-icon-picker .ql-picker-label {\n  padding: .125rem .25rem;\n}\n.ql-snow .ql-icon-picker .ql-picker-options,\n.ql-bubble .ql-icon-picker .ql-picker-options {\n  padding: .25rem 0;\n}\n.ql-snow .ql-icon-picker .ql-picker-item,\n.ql-bubble .ql-icon-picker .ql-picker-item {\n  padding: .125rem .25rem;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.ql-snow .ql-color-picker .ql-picker-options,\n.ql-bubble .ql-color-picker .ql-picker-options {\n  padding: .1875rem .3125rem;\n  width: 9.5rem;\n}\n.ql-snow .ql-color-picker .ql-picker-item,\n.ql-bubble .ql-color-picker .ql-picker-item {\n  float: left;\n  margin: .125rem;\n  padding: 0;\n  width: 1rem;\n  height: 1rem;\n  border: 1px solid transparent;\n}\n.ql-snow .ql-color-picker.ql-background .ql-picker-item,\n.ql-bubble .ql-color-picker.ql-background .ql-picker-item {\n  background-color: #fff;\n}\n.ql-snow .ql-color-picker.ql-color .ql-picker-item,\n.ql-bubble .ql-color-picker.ql-color .ql-picker-item {\n  background-color: #000;\n}\n.ql-snow.ql-toolbar,\n.ql-snow .ql-toolbar {\n  background-clip: padding-box;\n}\n.ql-snow .ql-editor {\n  min-height: 15rem;\n  background-clip: padding-box;\n  border: 1px solid;\n}\n.ql-snow .ql-picker.ql-expanded .ql-picker-label {\n  z-index: 2;\n}\n.ql-snow .ql-stroke {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n}\n.ql-snow .ql-stroke-miter {\n  fill: none;\n  stroke-miterlimit: 10;\n  stroke-width: 2;\n}\n.ql-snow .ql-picker-label {\n  border: 1px solid transparent;\n}\n.ql-snow .ql-picker-options {\n  border: 1px solid transparent;\n  background-clip: padding-box;\n}\n.ql-snow .ql-color-picker .ql-picker-item.ql-selected,\n.ql-snow .ql-color-picker .ql-picker-item:hover {\n  border-color: #000;\n}\n.ql-snow .ql-tooltip {\n  display: -ms-flexbox;\n  display: flex;\n  padding: .3125rem .75rem;\n  background-clip: padding-box;\n  white-space: nowrap;\n}\n.ql-snow .ql-tooltip::before {\n  content: \"Visit URL:\";\n  margin-right: .5rem;\n  line-height: 1.625rem;\n}\n.ql-snow .ql-tooltip input[type=text] {\n  display: none;\n  margin: 0;\n  padding: .1875rem .3125rem;\n  width: 10.625rem;\n  height: 1.625rem;\n  font-size: .8125rem;\n}\n.ql-snow .ql-tooltip a.ql-preview {\n  display: inline-block;\n  overflow-x: hidden;\n  max-width: 12.5rem;\n  vertical-align: top;\n  text-overflow: ellipsis;\n}\n.ql-snow .ql-tooltip a.ql-action::after {\n  content: 'Edit';\n  margin-left: 1rem;\n  padding-right: .5rem;\n  border-right: .0625rem solid;\n}\n.ql-snow .ql-tooltip a.ql-remove::before {\n  content: 'Remove';\n  margin-left: .5rem;\n}\n.ql-snow .ql-tooltip a {\n  line-height: 1.625rem;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-preview,\n.ql-snow .ql-tooltip.ql-editing a.ql-remove {\n  display: none;\n}\n.ql-snow .ql-tooltip.ql-editing input[type=text] {\n  display: inline-block;\n}\n.ql-snow .ql-tooltip.ql-editing a.ql-action::after {\n  content: 'Save';\n  padding-right: 0;\n  border-right: 0;\n}\n.ql-snow .ql-tooltip[data-mode=link]::before {\n  content: \"Enter link:\";\n}\n.ql-snow .ql-tooltip[data-mode=formula]::before {\n  content: \"Enter formula:\";\n}\n.ql-snow .ql-tooltip[data-mode=video]::before {\n  content: \"Enter video:\";\n}\n.ql-bubble.ql-toolbar button:hover,\n.ql-bubble.ql-toolbar button:focus,\n.ql-bubble.ql-toolbar button.ql-active,\n.ql-bubble.ql-toolbar .ql-picker-label:hover,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active,\n.ql-bubble.ql-toolbar .ql-picker-item:hover,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected,\n.ql-bubble .ql-toolbar button:hover,\n.ql-bubble .ql-toolbar button:focus,\n.ql-bubble .ql-toolbar button.ql-active,\n.ql-bubble .ql-toolbar .ql-picker-label:hover,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active,\n.ql-bubble .ql-toolbar .ql-picker-item:hover,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected {\n  color: #fff;\n}\n.ql-bubble.ql-toolbar button:hover .ql-fill,\n.ql-bubble.ql-toolbar button:focus .ql-fill,\n.ql-bubble.ql-toolbar button.ql-active .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-bubble.ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar button:hover .ql-fill,\n.ql-bubble .ql-toolbar button:focus .ql-fill,\n.ql-bubble .ql-toolbar button.ql-active .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-bubble .ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n  fill: #fff;\n}\n.ql-bubble.ql-toolbar button:hover .ql-stroke,\n.ql-bubble.ql-toolbar button:focus .ql-stroke,\n.ql-bubble.ql-toolbar button.ql-active .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-bubble.ql-toolbar button:hover .ql-stroke-miter,\n.ql-bubble.ql-toolbar button:focus .ql-stroke-miter,\n.ql-bubble.ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-bubble.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n.ql-bubble .ql-toolbar button:hover .ql-stroke,\n.ql-bubble .ql-toolbar button:focus .ql-stroke,\n.ql-bubble .ql-toolbar button.ql-active .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-bubble .ql-toolbar button:hover .ql-stroke-miter,\n.ql-bubble .ql-toolbar button:focus .ql-stroke-miter,\n.ql-bubble .ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-bubble .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n  stroke: #fff;\n}\n.ql-bubble .ql-stroke {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n}\n.ql-bubble .ql-stroke-miter {\n  fill: none;\n  stroke-miterlimit: 10;\n  stroke-width: 2;\n}\n.ql-bubble .ql-picker.ql-expanded .ql-picker-label {\n  z-index: 2;\n}\n.ql-bubble .ql-color-picker .ql-picker-label svg,\n.ql-bubble .ql-icon-picker .ql-picker-label svg {\n  right: .25rem;\n}\n.ql-bubble .ql-color-picker .ql-color-picker svg {\n  margin: .0625rem;\n}\n.ql-bubble .ql-color-picker .ql-picker-item.ql-selected,\n.ql-bubble .ql-color-picker .ql-picker-item:hover {\n  border-color: #fff;\n}\n.ql-bubble .ql-toolbar .ql-formats {\n  margin: .5rem .75rem .5rem 0;\n}\n.ql-bubble .ql-toolbar .ql-formats:first-child {\n  margin-left: .75rem;\n}\n.ql-bubble .ql-tooltip-arrow {\n  content: \" \";\n  position: absolute;\n  left: 50%;\n  display: block;\n  margin-left: -.375rem;\n  border-right: .375rem solid transparent;\n  border-left: .375rem solid transparent;\n}\n.ql-bubble .ql-tooltip {\n  color: #fff;\n}\n.ql-bubble .ql-tooltip:not(.ql-flip) .ql-tooltip-arrow {\n  top: -.375rem;\n  border-bottom: .375rem solid;\n}\n.ql-bubble .ql-tooltip.ql-flip .ql-tooltip-arrow {\n  bottom: -.375rem;\n  border-top: .375rem solid;\n}\n.ql-bubble .ql-tooltip.ql-editing .ql-tooltip-editor {\n  display: block;\n}\n.ql-bubble .ql-tooltip.ql-editing .ql-formats {\n  visibility: hidden;\n}\n.ql-bubble .ql-tooltip-editor {\n  display: none;\n}\n.ql-bubble .ql-tooltip-editor input[type=text] {\n  position: absolute;\n  padding: .625rem 1.25rem;\n  width: 100%;\n  height: 100%;\n  outline: none;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: .8125rem;\n}\n.ql-bubble .ql-tooltip-editor a {\n  position: absolute;\n  top: .625rem;\n  right: 1.25rem;\n}\n.ql-bubble .ql-tooltip-editor a::before {\n  content: \"\\D7\";\n  font-weight: bold;\n  font-size: 1rem;\n}\n.ql-bubble.ql-container:not(.ql-disabled) a {\n  position: relative;\n  white-space: nowrap;\n}\n.ql-bubble.ql-container:not(.ql-disabled) a::before, .ql-bubble.ql-container:not(.ql-disabled) a::after {\n  position: absolute;\n  left: 0;\n  visibility: hidden;\n  margin-left: 50%;\n  transition: visibility 0s ease 200ms;\n  -webkit-transform: translate(-50%, -100%);\n          transform: translate(-50%, -100%);\n}\n.ql-bubble.ql-container:not(.ql-disabled) a:hover::before, .ql-bubble.ql-container:not(.ql-disabled) a:hover::after {\n  visibility: visible;\n}\n.ql-bubble.ql-container:not(.ql-disabled) a::before {\n  content: attr(href);\n  top: -.3125rem;\n  z-index: 1;\n  overflow: hidden;\n  padding: .3125rem .9375rem;\n  border-radius: .9375rem;\n  color: #fff;\n  text-decoration: none;\n  font-weight: normal;\n  font-size: .75rem;\n}\n.ql-bubble.ql-container:not(.ql-disabled) a::after {\n  content: \" \";\n  top: 0;\n  width: 0;\n  height: 0;\n  border-top: .375rem solid;\n  border-right: .375rem solid transparent;\n  border-left: .375rem solid transparent;\n}\n.light-style .ql-editor.ql-blank:before {\n  color: #babbbc;\n}\n.light-style .ql-snow.ql-toolbar .ql-picker-options,\n.light-style .ql-snow .ql-toolbar .ql-picker-options,\n.light-style .ql-bubble.ql-toolbar .ql-picker-options,\n.light-style .ql-bubble .ql-toolbar .ql-picker-options {\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.09);\n}\n.light-style .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before,\n.light-style .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  font-size: 2.25rem;\n}\n.light-style .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before,\n.light-style .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  font-size: 1.813rem;\n}\n.light-style .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before,\n.light-style .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  font-size: 1.563rem;\n}\n.light-style .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before,\n.light-style .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  font-size: 1.313rem;\n}\n.light-style .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before,\n.light-style .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  font-size: 1rem;\n}\n.light-style .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before,\n.light-style .ql-bubble .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  font-size: 0.894rem;\n}\n.light-style .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before,\n.light-style .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  font-family: Georgia, \"Times New Roman\", serif;\n}\n.light-style .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before,\n.light-style .ql-bubble .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  font-family: \"SFMono-Regular\", Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n.light-style .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before,\n.light-style .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  font-size: 0.75rem;\n}\n.light-style .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before,\n.light-style .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  font-size: 1rem;\n}\n.light-style .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before,\n.light-style .ql-bubble .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  font-size: 1.25rem;\n}\n.light-style .ql-snow .ql-editor.ql-blank::before {\n  padding: 0 1.125rem;\n}\n.light-style .ql-snow.ql-container .ql-editor {\n  border-color: rgba(24, 28, 33, 0.1);\n}\n.light-style .ql-snow.ql-container .ql-editor:focus {\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.light-style .ql-snow .ql-editor {\n  background: #fff;\n  border-color: #fff;\n  padding: 1.125rem;\n}\n.light-style .ql-snow.ql-toolbar,\n.light-style .ql-snow .ql-toolbar {\n  border: 1px solid rgba(24, 28, 33, 0.1);\n  border-bottom: 0;\n  background: #fff;\n}\n@media (pointer: coarse) {\n.light-style .ql-snow.ql-toolbar button:hover:not(.ql-active),\n  .light-style .ql-snow .ql-toolbar button:hover:not(.ql-active) {\n    color: #4E5155;\n}\n.light-style .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .light-style .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n  .light-style .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .light-style .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n    fill: #4E5155;\n}\n.light-style .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .light-style .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n  .light-style .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .light-style .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n    stroke: #4E5155;\n}\n}\n.light-style .ql-snow .ql-stroke {\n  stroke: #4E5155;\n}\n.light-style .ql-snow .ql-stroke-miter {\n  stroke: #4E5155;\n}\n.light-style .ql-snow .ql-fill,\n.light-style .ql-snow .ql-stroke.ql-fill {\n  fill: #4E5155;\n}\n.light-style .ql-snow .ql-picker.ql-expanded .ql-picker-label {\n  color: #babbbc !important;\n}\n.light-style .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n  fill: #babbbc !important;\n}\n.light-style .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n  stroke: #babbbc !important;\n}\n.light-style .ql-snow .ql-picker-options {\n  background-color: #fff;\n}\n.light-style .ql-snow .ql-picker {\n  color: #4E5155;\n}\n.light-style .ql-snow .ql-picker.ql-expanded .ql-picker-label {\n  border-color: rgba(24, 28, 33, 0.1);\n}\n.light-style .ql-snow .ql-picker.ql-expanded .ql-picker-options {\n  border-color: rgba(24, 28, 33, 0.05);\n}\n.light-style .ql-snow .ql-tooltip {\n  border: 1px solid rgba(24, 28, 33, 0.05);\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.09);\n  color: #4E5155;\n  background-color: #fff;\n}\n.light-style .ql-snow .ql-tooltip input[type=text] {\n  border: 1px solid rgba(24, 28, 33, 0.1);\n}\n.light-style .ql-snow .ql-tooltip a.ql-action::after {\n  border-color: #babbbc;\n}\n@media (pointer: coarse) {\n.light-style .ql-bubble.ql-toolbar button:hover:not(.ql-active),\n  .light-style .ql-bubble .ql-toolbar button:hover:not(.ql-active) {\n    color: #ccc;\n}\n.light-style .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .light-style .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n  .light-style .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n  .light-style .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n    fill: #ccc;\n}\n.light-style .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .light-style .ql-bubble.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n  .light-style .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n  .light-style .ql-bubble .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n    stroke: #ccc;\n}\n}\n.light-style .ql-bubble .ql-stroke,\n.light-style .ql-bubble .ql-stroke-miter {\n  stroke: #ccc;\n}\n.light-style .ql-bubble .ql-fill,\n.light-style .ql-bubble .ql-stroke.ql-fill {\n  fill: #ccc;\n}\n.light-style .ql-bubble .ql-picker {\n  color: #ccc;\n}\n.light-style .ql-bubble .ql-picker.ql-expanded .ql-picker-label {\n  color: #777;\n}\n.light-style .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n  fill: #777;\n}\n.light-style .ql-bubble .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n  stroke: #777;\n}\n.light-style .ql-bubble .ql-picker-options {\n  background-color: #444;\n}\n.light-style .ql-bubble .ql-tooltip {\n  border-radius: 0.25rem;\n  z-index: 1090;\n  background-color: #444;\n}\n.light-style .ql-bubble .ql-tooltip:not(.ql-flip) .ql-tooltip-arrow {\n  border-bottom-color: #444;\n}\n.light-style .ql-bubble .ql-tooltip.ql-flip .ql-tooltip-arrow {\n  border-top-color: #444;\n}\n.light-style .ql-bubble .ql-tooltip-editor a::before {\n  color: #ccc;\n}\n.light-style .ql-bubble.ql-container:not(.ql-disabled) a::before {\n  background-color: #444;\n}\n.light-style .ql-bubble.ql-container:not(.ql-disabled) a::after {\n  border-top-color: #444;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6,\n.ql-content p,\n.ql-content ol,\n.ql-content ul,\n.ql-content pre,\n.ql-content blockquote,\n.ql-content h1,\n.ql-content h2,\n.ql-content h3,\n.ql-content h4,\n.ql-content h5,\n.ql-content h6 {\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol,\n.ql-editor ul,\n.ql-content ol,\n.ql-content ul {\n  margin-right: 0;\n  margin-left: 0;\n  padding-right: 0;\n  padding-left: 0;\n}\n.ql-editor ol > li,\n.ql-editor ul > li,\n.ql-content ol > li,\n.ql-content ul > li {\n  list-style-type: none;\n}\n.ql-editor ol > li:not(.ql-direction-rtl),\n.ql-editor ul > li:not(.ql-direction-rtl),\n.ql-content ol > li:not(.ql-direction-rtl),\n.ql-content ul > li:not(.ql-direction-rtl) {\n  padding-left: 2rem;\n}\n.ql-editor ol > li.ql-direction-rtl,\n.ql-editor ul > li.ql-direction-rtl,\n.ql-content ol > li.ql-direction-rtl,\n.ql-content ul > li.ql-direction-rtl {\n  padding-right: 2rem;\n}\n.ql-editor ul > li::before,\n.ql-content ul > li::before {\n  content: '\\2022';\n}\n.ql-editor ul[data-checked=true],\n.ql-editor ul[data-checked=false],\n.ql-content ul[data-checked=true],\n.ql-content ul[data-checked=false] {\n  pointer-events: none;\n}\n.ql-editor ul[data-checked=true] > li *,\n.ql-editor ul[data-checked=false] > li *,\n.ql-content ul[data-checked=true] > li *,\n.ql-content ul[data-checked=false] > li * {\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li *::before,\n.ql-editor ul[data-checked=false] > li *::before,\n.ql-content ul[data-checked=true] > li *::before,\n.ql-content ul[data-checked=false] > li *::before {\n  color: #777;\n  cursor: pointer;\n  pointer-events: all;\n}\n.ql-editor ul[data-checked=true] > li::before,\n.ql-content ul[data-checked=true] > li::before {\n  content: '\\2611';\n}\n.ql-editor ul[data-checked=false] > li::before,\n.ql-content ul[data-checked=false] > li::before {\n  content: '\\2610';\n}\n.ql-editor li::before,\n.ql-content li::before {\n  display: inline-block;\n  width: calc(2rem - .3em);\n  white-space: nowrap;\n}\n.ql-editor li:not(.ql-direction-rtl)::before,\n.ql-content li:not(.ql-direction-rtl)::before {\n  margin-right: .3em;\n  margin-left: -2rem;\n  text-align: right;\n}\n.ql-editor li.ql-direction-rtl::before,\n.ql-content li.ql-direction-rtl::before {\n  margin-right: -2rem;\n  margin-left: .3em;\n  text-align: left;\n}\n.ql-editor ol li,\n.ql-content ol li {\n  counter-increment: list-0;\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li::before,\n.ql-content ol li::before {\n  content: counter(list-0, decimal) \". \";\n}\n.ql-editor ol li.ql-indent-1,\n.ql-content ol li.ql-indent-1 {\n  counter-increment: list-1;\n  counter-reset:  list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-1::before,\n.ql-content ol li.ql-indent-1::before {\n  content: counter(list-1, lower-alpha) \". \";\n}\n.ql-editor .ql-indent-1:not(.ql-direction-rtl),\n.ql-content .ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 2rem;\n}\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl),\n.ql-content li.ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 4rem;\n}\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 2rem;\n}\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 4rem;\n}\n.ql-editor ol li.ql-indent-2,\n.ql-content ol li.ql-indent-2 {\n  counter-increment: list-2;\n  counter-reset:  list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-2::before,\n.ql-content ol li.ql-indent-2::before {\n  content: counter(list-2, lower-roman) \". \";\n}\n.ql-editor .ql-indent-2:not(.ql-direction-rtl),\n.ql-content .ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 4rem;\n}\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl),\n.ql-content li.ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 6rem;\n}\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 4rem;\n}\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 6rem;\n}\n.ql-editor ol li.ql-indent-3,\n.ql-content ol li.ql-indent-3 {\n  counter-increment: list-3;\n  counter-reset:  list-4 list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-3::before,\n.ql-content ol li.ql-indent-3::before {\n  content: counter(list-3, decimal) \". \";\n}\n.ql-editor .ql-indent-3:not(.ql-direction-rtl),\n.ql-content .ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 6rem;\n}\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl),\n.ql-content li.ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 8rem;\n}\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 6rem;\n}\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 8rem;\n}\n.ql-editor ol li.ql-indent-4,\n.ql-content ol li.ql-indent-4 {\n  counter-increment: list-4;\n  counter-reset:  list-5 list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-4::before,\n.ql-content ol li.ql-indent-4::before {\n  content: counter(list-4, lower-alpha) \". \";\n}\n.ql-editor .ql-indent-4:not(.ql-direction-rtl),\n.ql-content .ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 8rem;\n}\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl),\n.ql-content li.ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 10rem;\n}\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 8rem;\n}\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 10rem;\n}\n.ql-editor ol li.ql-indent-5,\n.ql-content ol li.ql-indent-5 {\n  counter-increment: list-5;\n  counter-reset:  list-6 list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-5::before,\n.ql-content ol li.ql-indent-5::before {\n  content: counter(list-5, lower-roman) \". \";\n}\n.ql-editor .ql-indent-5:not(.ql-direction-rtl),\n.ql-content .ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 10rem;\n}\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl),\n.ql-content li.ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 12rem;\n}\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 10rem;\n}\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 12rem;\n}\n.ql-editor ol li.ql-indent-6,\n.ql-content ol li.ql-indent-6 {\n  counter-increment: list-6;\n  counter-reset:  list-7 list-8 list-9;\n}\n.ql-editor ol li.ql-indent-6::before,\n.ql-content ol li.ql-indent-6::before {\n  content: counter(list-6, decimal) \". \";\n}\n.ql-editor .ql-indent-6:not(.ql-direction-rtl),\n.ql-content .ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 12rem;\n}\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl),\n.ql-content li.ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 14rem;\n}\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 12rem;\n}\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 14rem;\n}\n.ql-editor ol li.ql-indent-7,\n.ql-content ol li.ql-indent-7 {\n  counter-increment: list-7;\n  counter-reset:  list-8 list-9;\n}\n.ql-editor ol li.ql-indent-7::before,\n.ql-content ol li.ql-indent-7::before {\n  content: counter(list-7, lower-alpha) \". \";\n}\n.ql-editor .ql-indent-7:not(.ql-direction-rtl),\n.ql-content .ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 14rem;\n}\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl),\n.ql-content li.ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 16rem;\n}\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 14rem;\n}\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 16rem;\n}\n.ql-editor ol li.ql-indent-8,\n.ql-content ol li.ql-indent-8 {\n  counter-increment: list-8;\n  counter-reset:  list-9;\n}\n.ql-editor ol li.ql-indent-8::before,\n.ql-content ol li.ql-indent-8::before {\n  content: counter(list-8, lower-roman) \". \";\n}\n.ql-editor .ql-indent-8:not(.ql-direction-rtl),\n.ql-content .ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 16rem;\n}\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl),\n.ql-content li.ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 18rem;\n}\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 16rem;\n}\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 18rem;\n}\n.ql-editor ol li.ql-indent-9,\n.ql-content ol li.ql-indent-9 {\n  counter-increment: list-9;\n}\n.ql-editor ol li.ql-indent-9::before,\n.ql-content ol li.ql-indent-9::before {\n  content: counter(list-9, decimal) \". \";\n}\n.ql-editor .ql-indent-9:not(.ql-direction-rtl),\n.ql-content .ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 18rem;\n}\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl),\n.ql-content li.ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 20rem;\n}\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right,\n.ql-content .ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 18rem;\n}\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right,\n.ql-content li.ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 20rem;\n}\n.ql-editor .ql-video,\n.ql-content .ql-video {\n  display: block;\n  max-width: 100%;\n}\n.ql-editor .ql-video.ql-align-center,\n.ql-content .ql-video.ql-align-center {\n  margin: 0 auto;\n}\n.ql-editor .ql-video.ql-align-right,\n.ql-content .ql-video.ql-align-right {\n  margin: 0 0 0 auto;\n}\n.ql-editor .ql-bg-black,\n.ql-content .ql-bg-black {\n  background-color: #000;\n}\n.ql-editor .ql-bg-red,\n.ql-content .ql-bg-red {\n  background-color: #e60000;\n}\n.ql-editor .ql-bg-orange,\n.ql-content .ql-bg-orange {\n  background-color: #f90;\n}\n.ql-editor .ql-bg-yellow,\n.ql-content .ql-bg-yellow {\n  background-color: #ff0;\n}\n.ql-editor .ql-bg-green,\n.ql-content .ql-bg-green {\n  background-color: #008a00;\n}\n.ql-editor .ql-bg-blue,\n.ql-content .ql-bg-blue {\n  background-color: #06c;\n}\n.ql-editor .ql-bg-purple,\n.ql-content .ql-bg-purple {\n  background-color: #93f;\n}\n.ql-editor .ql-color-white,\n.ql-content .ql-color-white {\n  color: #fff;\n}\n.ql-editor .ql-color-red,\n.ql-content .ql-color-red {\n  color: #e60000;\n}\n.ql-editor .ql-color-orange,\n.ql-content .ql-color-orange {\n  color: #f90;\n}\n.ql-editor .ql-color-yellow,\n.ql-content .ql-color-yellow {\n  color: #ff0;\n}\n.ql-editor .ql-color-green,\n.ql-content .ql-color-green {\n  color: #008a00;\n}\n.ql-editor .ql-color-blue,\n.ql-content .ql-color-blue {\n  color: #06c;\n}\n.ql-editor .ql-color-purple,\n.ql-content .ql-color-purple {\n  color: #93f;\n}\n.ql-editor .ql-direction-rtl,\n.ql-content .ql-direction-rtl {\n  text-align: inherit;\n  direction: rtl;\n}\n.ql-editor .ql-align-center,\n.ql-content .ql-align-center {\n  text-align: center;\n}\n.ql-editor .ql-align-justify,\n.ql-content .ql-align-justify {\n  text-align: justify;\n}\n.ql-editor .ql-align-right,\n.ql-content .ql-align-right {\n  text-align: right;\n}\n.ql-editor img,\n.ql-content img {\n  max-width: 100%;\n}\n.light-style .ql-editor blockquote,\n.light-style .ql-content blockquote {\n  margin-bottom: 1rem;\n  font-size: 1.1175rem;\n}\n.light-style .ql-editor .ql-font-serif,\n.light-style .ql-content .ql-font-serif {\n  font-family: Georgia, \"Times New Roman\", serif;\n}\n.light-style .ql-editor .ql-font-monospace,\n.light-style .ql-content .ql-font-monospace {\n  font-family: \"SFMono-Regular\", Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n.light-style .ql-editor .ql-size-small,\n.light-style .ql-content .ql-size-small {\n  font-size: 0.75rem;\n}\n.light-style .ql-editor .ql-size-large,\n.light-style .ql-content .ql-size-large {\n  font-size: 1rem;\n}\n.light-style .ql-editor .ql-size-huge,\n.light-style .ql-content .ql-size-huge {\n  font-size: 1.25rem;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_editor_scss_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./editor.scss?vue&type=style&index=1&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_editor_scss_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_editor_scss_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_typography_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./typography.scss?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_typography_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_typography_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/assets/src/components/backend/master/standart-audit/form.vue":
/*!********************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/standart-audit/form.vue ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=05d1d980& */ "./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js&");
/* harmony import */ var _vendor_libs_vue_quill_editor_typography_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss& */ "./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _vendor_libs_vue_quill_editor_editor_scss_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss& */ "./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&":
/*!***************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980& ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   staticRenderFns: function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_05d1d980___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./form.vue?vue&type=template&id=05d1d980& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/master/standart-audit/form.vue?vue&type=template&id=05d1d980&");


/***/ }),

/***/ "./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss& ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_editor_scss_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./editor.scss?vue&type=style&index=1&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/editor.scss?vue&type=style&index=1&lang=scss&");


/***/ }),

/***/ "./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************!*\
  !*** ./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_use_3_typography_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./typography.scss?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51.use[3]!./resources/assets/src/vendor/libs/vue-quill-editor/typography.scss?vue&type=style&index=0&lang=scss&");


/***/ })

}]);