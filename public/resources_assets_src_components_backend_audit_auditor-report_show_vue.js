"use strict";
(self["webpackChunkaudit_widatra"] = self["webpackChunkaudit_widatra"] || []).push([["resources_assets_src_components_backend_audit_auditor-report_show_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'show-division',
  metaInfo: {
    title: 'Detail Auditor Report'
  },
  components: {},
  data: function data() {
    return {
      field: {},
      detailApproval: []
    };
  },
  methods: {
    getData: function getData(Id) {
      axios.post('/AdminVue/auditor-report-show', {
        Id: Id
      }).then(function (res) {
        var resp = res.data;
        this.field = resp.data;
        this.detailApproval = resp.Approval;
      }.bind(this))["catch"](function (e) {
        console.log(e);
      });
    },
    backIndex: function backIndex() {
      this.$router.push('/RoleAdmin/audit/data-auditor-report');
    }
  },
  mounted: function mounted() {
    if (this.$route.params.Id) {
      var Id = this.$route.params.Id;

      if (Id) {
        this.getData(Id);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.td-first-child{\n\twidth: 9rem;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".user-view-table {\n  table-layout: fixed;\n}\n.user-view-table td {\n  padding-right: 0;\n  padding-left: 0;\n  border: 0;\n}\n.user-view-table td:first-child {\n  width: 9rem;\n}\n.user-view-table td:not(:first-child) {\n  min-width: 12rem;\n}\n.user-edit-fileinput {\n  position: absolute;\n  visibility: hidden;\n  width: 1px;\n  height: 1px;\n  opacity: 0;\n}\n.user-edit-multiselect ~ .select2-container {\n  width: 100% !important;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./show.vue?vue&type=style&index=1&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_3_users_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./users.scss?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_3_users_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_3_users_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/auditor-report/show.vue":
/*!*******************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/auditor-report/show.vue ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _show_vue_vue_type_template_id_7ffe0e60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show.vue?vue&type=template&id=7ffe0e60& */ "./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=template&id=7ffe0e60&");
/* harmony import */ var _show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show.vue?vue&type=script&lang=js& */ "./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=script&lang=js&");
/* harmony import */ var _vendor_styles_pages_users_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss& */ "./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _show_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./show.vue?vue&type=style&index=1&lang=css& */ "./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _show_vue_vue_type_template_id_7ffe0e60___WEBPACK_IMPORTED_MODULE_0__.render,
  _show_vue_vue_type_template_id_7ffe0e60___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/src/components/backend/audit/auditor-report/show.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./show.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css&":
/*!****************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css& ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_48_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./show.vue?vue&type=style&index=1&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-48[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=style&index=1&lang=css&");


/***/ }),

/***/ "./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_51_0_rules_0_use_3_users_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./users.scss?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-51[0].rules[0].use[3]!./resources/assets/src/vendor/styles/pages/users.scss?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=template&id=7ffe0e60&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=template&id=7ffe0e60& ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_7ffe0e60___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_7ffe0e60___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_show_vue_vue_type_template_id_7ffe0e60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./show.vue?vue&type=template&id=7ffe0e60& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=template&id=7ffe0e60&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=template&id=7ffe0e60&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/src/components/backend/audit/auditor-report/show.vue?vue&type=template&id=7ffe0e60& ***!
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
          staticClass: "mb-0",
          attrs: {
            header: "Detail / Data Auditor Report",
            "header-tag": "h4",
            "no-body": "",
          },
        },
        [
          _c(
            "b-card-body",
            [
              _c("h6", { staticClass: "font-weight-semibold" }, [
                _vm._v("\n\t      Data Auditor Report\n\t    "),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("ID Audit"),
                  ]),
                  _vm._v(
                    "\n\t        " + _vm._s(_vm.field.NoTrans) + "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("Ref Number"),
                  ]),
                  _vm._v(
                    "\n\t        " + _vm._s(_vm.field.RefNumber) + "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("Departement Auditee"),
                  ]),
                  _vm._v(
                    "\n\t        " +
                      _vm._s(_vm.field.AuditeeDepartment) +
                      "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("Tanggal Auditor"),
                  ]),
                  _vm._v(
                    "\n\t        " +
                      _vm._s(_vm.field.AuditorDate) +
                      "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("Uraian / Potensi Ketidaksesuaian"),
                  ]),
                  _vm._v(
                    "\n\t        " +
                      _vm._s(_vm.field.PotentialNonConformitiy) +
                      "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("Jenis Ketidaksesuaian"),
                  ]),
                  _vm._v(
                    "\n\t        " +
                      _vm._s(_vm.field.TypeNonConformity) +
                      "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("CreateAt"),
                  ]),
                  _vm._v(
                    "\n\t        " + _vm._s(_vm.field.CreateAt) + "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("UpdateAt"),
                  ]),
                  _vm._v(
                    "\n\t        " + _vm._s(_vm.field.UpdateAt) + "\n\t      "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-4 mb-3" }, [
                  _c("div", { staticClass: "font-weight-semibold" }, [
                    _vm._v("UserEntry"),
                  ]),
                  _vm._v(
                    "\n\t        " + _vm._s(_vm.field.UserEntry) + "\n\t      "
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c("h6", { staticClass: "font-weight-semibold" }, [
                _vm._v("\n\t      Approval Auditor Report\n\t    "),
              ]),
              _vm._v(" "),
              _vm._l(_vm.detailApproval, function (item, index) {
                return _c("div", { key: index, staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-4 mb-3" }, [
                    _c("div", { staticClass: "font-weight-semibold" }, [
                      _vm._v("Nama Karyawan"),
                    ]),
                    _vm._v("\n\t        " + _vm._s(item.Name) + "\n\t      "),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-4 mb-3" }, [
                    _c("div", { staticClass: "font-weight-semibold" }, [
                      _vm._v("Type"),
                    ]),
                    _vm._v(" "),
                    index == 0 &&
                    _vm.field.LeadAuditor == item.IdEmployeApproval
                      ? _c("div", [_vm._v("\n\t\t\t\tAuditor\n\t\t\t")])
                      : index == 0 &&
                        _vm.field.LeadAuditor != item.IdEmployeApproval
                      ? _c("div", [_vm._v("\n\t\t\t\tAuditor\n\t\t\t")])
                      : index == 1
                      ? _c("div", [_vm._v("\n\t\t\t\tHead Auditee\n\t\t\t")])
                      : _c("div", [
                          _vm._v("\n\t\t\t\tManajemen Representatif\n\t\t\t"),
                        ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-4 mb-3" }, [
                    _c("div", { staticClass: "font-weight-semibold" }, [
                      _vm._v("Status"),
                    ]),
                    _vm._v(" "),
                    item.Status == 1
                      ? _c("div", [_vm._v("\n\t\t\t\tBelum Disetujui\n\t\t\t")])
                      : item.Status == 2
                      ? _c("div", [_vm._v("\n\t\t\t\tSudah Disetujui\n\t\t\t")])
                      : _c("div", [_vm._v("\n\t\t\t\tDitolak\n\t\t\t")]),
                  ]),
                ])
              }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c(
                  "div",
                  { staticClass: "col-12" },
                  [
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
              ]),
            ],
            2
          ),
          _vm._v(" "),
          _c("hr", { staticClass: "m-0" }),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);