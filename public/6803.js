(self.webpackChunkaudit_widatra=self.webpackChunkaudit_widatra||[]).push([[6803],{84909:function(t){t.exports=function(t){function e(a){if(r[a])return r[a].exports;var i=r[a]={exports:{},id:a,loaded:!1};return t[a].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=r(1);Object.defineProperty(e,"createAutoCorrectedDatePipe",{enumerable:!0,get:function(){return a(i).default}});var n=r(2);Object.defineProperty(e,"createNumberMask",{enumerable:!0,get:function(){return a(n).default}});var s=r(3);Object.defineProperty(e,"emailMask",{enumerable:!0,get:function(){return a(s).default}})},function(t,e){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"mm dd yyyy",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.minYear,n=void 0===r?1:r,s=e.maxYear,o=void 0===s?9999:s,l=t.split(/[^dmyHMS]+/).sort((function(t,e){return i.indexOf(t)-i.indexOf(e)}));return function(e){var r=[],i={dd:31,mm:12,yy:99,yyyy:o,HH:23,MM:59,SS:59},s={dd:1,mm:1,yy:0,yyyy:n,HH:0,MM:0,SS:0},u=e.split("");l.forEach((function(e){var a=t.indexOf(e),n=parseInt(i[e].toString().substr(0,1),10);parseInt(u[a],10)>n&&(u[a+1]=u[a],u[a]=0,r.push(a))}));var d=0,c=l.some((function(r){var l=t.indexOf(r),u=r.length,c=e.substr(l,u).replace(/\D/g,""),f=parseInt(c,10);"mm"===r&&(d=f||0);var h="dd"===r?a[d]:i[r];if("yyyy"===r&&(1!==n||9999!==o)){var p=parseInt(i[r].toString().substring(0,c.length),10);return f<parseInt(s[r].toString().substring(0,c.length),10)||f>p}return f>h||c.length===u&&f<s[r]}));return!c&&{value:u.join(""),indexesOfPipedChars:r}}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var a=[31,31,29,31,30,31,30,31,31,30,31,30,31],i=["yyyy","yy","mm","dd","HH","MM","SS"]},function(t,e){"use strict";function r(){function t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,e=t.length;if(t===o||t[0]===m[0]&&1===e)return m.split(o).concat([p]).concat(g.split(o));if(t===A&&k)return m.split(o).concat(["0",A,p]).concat(g.split(o));var r=t[0]===d&&q;r&&(t=t.toString().substr(1));var s=t.lastIndexOf(A),l=-1!==s,u=void 0,b=void 0,y=void 0;if(t.slice(-1*R)===g&&(t=t.slice(0,-1*R)),l&&(k||M)?(u=t.slice(t.slice(0,$)===m?$:0,s),b=a((b=t.slice(s+1,e)).replace(f,o))):u=t.slice(0,$)===m?t.slice($):t,V&&(void 0===V?"undefined":n(V))===h){var _="."===S?"[.]":""+S,x=(u.match(new RegExp(_,"g"))||[]).length;u=u.slice(0,V+x*j)}return u=u.replace(f,o),N||(u=u.replace(/^0+(0$|[^0])/,"$1")),y=a(u=C?i(u,S):u),(l&&k||!0===M)&&(t[s-1]!==A&&y.push(v),y.push(A,v),b&&((void 0===O?"undefined":n(O))===h&&(b=b.slice(0,O)),y=y.concat(b)),!0===M&&t[s-1]===A&&y.push(p)),$>0&&(y=m.split(o).concat(y)),r&&(y.length===$&&y.push(p),y=[c].concat(y)),g.length>0&&(y=y.concat(g.split(o))),y}var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.prefix,m=void 0===r?s:r,b=e.suffix,g=void 0===b?o:b,y=e.includeThousandsSeparator,C=void 0===y||y,_=e.thousandsSeparatorSymbol,S=void 0===_?l:_,x=e.allowDecimal,k=void 0!==x&&x,P=e.decimalSymbol,A=void 0===P?u:P,w=e.decimalLimit,O=void 0===w?2:w,I=e.requireDecimal,M=void 0!==I&&I,E=e.allowNegative,q=void 0!==E&&E,D=e.allowLeadingZeroes,N=void 0!==D&&D,T=e.integerLimit,V=void 0===T?null:T,$=m&&m.length||0,R=g&&g.length||0,j=S&&S.length||0;return t.instanceOf="createNumberMask",t}function a(t){return t.split(o).map((function(t){return p.test(t)?p:t}))}function i(t,e){return t.replace(/\B(?=(\d{3})+(?!\d))/g,e)}Object.defineProperty(e,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=r;var s="$",o="",l=",",u=".",d="-",c=/-/,f=/\D+/g,h="number",p=/\d/,v="[]"},function(t,e,r){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e){t=t.replace(C,h);var r=e.placeholderChar,a=e.currentCaretPosition,i=t.indexOf(p),d=t.lastIndexOf(f),c=d<i?-1:d,v=n(t,i+1,p),m=n(t,c-1,f),b=s(t,i,r),g=o(t,i,c,r),y=l(t,c,r,a);return b=u(b),g=u(g),y=u(y,!0),b.concat(v).concat(g).concat(m).concat(y)}function n(t,e,r){var a=[];return t[e]===r?a.push(r):a.push(v,r),a.push(v),a}function s(t,e){return-1===e?t:t.slice(0,e)}function o(t,e,r,a){var i=h;return-1!==e&&(i=-1===r?t.slice(e+1,t.length):t.slice(e+1,r)),(i=i.replace(new RegExp("[\\s"+a+"]",b),h))===p?c:i.length<1?m:i[i.length-1]===f?i.slice(0,i.length-1):i}function l(t,e,r,a){var i=h;return-1!==e&&(i=t.slice(e+1,t.length)),0===(i=i.replace(new RegExp("[\\s"+r+".]",b),h)).length?t[e-1]===f&&a!==t.length?c:h:i}function u(t,e){return t.split(h).map((function(t){return t===m?t:e?y:g}))}Object.defineProperty(e,"__esModule",{value:!0});var d=a(r(4)),c="*",f=".",h="",p="@",v="[]",m=" ",b="g",g=/[^\s]/,y=/[^.\s]/,C=/\s/g;e.default={mask:i,pipe:d.default}},function(t,e){"use strict";function r(t,e){var r=e.currentCaretPosition,n=e.rawValue,f=e.previousConformedValue,h=e.placeholderChar,p=t,v=(p=a(p)).indexOf(o);if(null===n.match(new RegExp("[^@\\s."+h+"]")))return s;if(-1!==p.indexOf(u)||-1!==v&&r!==v+1||-1===n.indexOf(i)&&f!==s&&-1!==n.indexOf(l))return!1;var m=p.indexOf(i);return(p.slice(m+1,p.length).match(c)||d).length>1&&p.substr(-1)===l&&r!==n.length&&(p=p.slice(0,p.length-1)),p}function a(t){var e=0;return t.replace(n,(function(){return 1==++e?i:s}))}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var i="@",n=/@/g,s="",o="@.",l=".",u="..",d=[],c=/\./g}])},96803:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return o}});r(30381);var a=r(44612),i=r.n(a),n=r(84909),s={name:"form-standart-audit",metaInfo:{title:"Form Standart Audit Clause"},components:{MaskedInput:i()},data:function(){return{urlSubmit:"/AdminVue/standart-audit-clause-insert",headerCard:"Form / Create Data Standart Audit Clause",textBtnSubmit:"Create",field:{File:"",StandartAudit:""},allErrors:[],isNotif:!1,isEdit:!1,detailClause:[],opsParent:[],alertNotif:"",isDisabled:!1,alertVariant:"alert-dark-danger",numberMask:n.createNumberMask({prefix:"",allowDecimal:!0,thousandsSeparatorSymbol:".",decimalSymbol:",",decimallimit:2})}},methods:{submitForm:function(){var t=new FormData;this.field.Parent?this.field.Parent=this.field.Parent.Id:this.field.Parent=0,t.append("Id",this.field.Id),t.append("IdStandartAudit",this.field.IdStandartAudit),t.append("Clause",this.field.Clause),t.append("Parent",this.field.Parent),t.append("Requirements",this.field.Requirements),t.append("RequirementsDetail",this.field.RequirementsDetail);axios.post(this.urlSubmit,t,{headers:{"content-type":"multipart/form-data"}}).then(function(t){var e=t.data;e.status?this.$router.push({name:"master/data-standart-audit",params:{isNotif:!0,gNotif:"notifications-success",tNotif:this.textBtnSubmit+" Data Success",txNotif:"Save Data Success!"}}):(this.isNotif=!0,this.alertNotif=e.message,this.alertVariant="alert-dark-danger",this.allErrors=e.validation)}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},getData:function(t){axios.post("/AdminVue/standart-audit-clause-edit",{Id:t}).then(function(t){var e=t.data;this.field=e.data,this.isDisabled=!0}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},getClause:function(t){axios.post("/AdminVue/standart-audit-clause-getClauseEdit",{Id:t}).then(function(t){var e=t.data;this.detailClauseAudit=e.data,this.opsParent=e.parent}.bind(this)).catch(function(t){console.log(t),this.isNotif=!0,this.alertNotif="Invalid Server Side!",this.alertVariant="alert-dark-danger"}.bind(this))},backIndex:function(){this.$router.push("/RoleAdmin/master/data-standart-audit")},onAction:function(t,e,r,a){if("view-item"==t&&this.$router.push({name:"master/show-audit-clause",params:{Id:e}}),"edit-item"==t){var i=this.$router.resolve({name:"master/form-audit-clause",query:{isFormEdit:!0,Id:e,IdStandartAudit:r,StandartAudit:a}});window.open(i.href,"_blank")}"delete-item"==t&&this.deleteDataClause("/AdminVue/standart-audit-clause-delete",e,this.vuetable,r,this.detailClauseAudit)},handleFile:function(t){this.field.File=t.map((function(t){return t.file}))}},mounted:function(){if(this.$route.params.isFormEdit||this.$route.query.isFormEdit){var t=this.$route.params.Id;if(this.$route.query.isFormEdit)t=this.$route.query.Id;this.isEdit=!0,t&&(this.getData(t),this.field.Id=t,this.urlSubmit="/AdminVue/standart-audit-clause-update",this.headerCard="Form / Edit Data Standart Audit Clause",this.textBtnSubmit="Update")}this.$route.params.IdStandartAudit||this.$route.query.IdStandartAudit?(this.field.IdStandartAudit=this.$route.params.IdStandartAudit,this.field.StandartAudit=this.$route.params.StandartAudit,this.$route.query.IdStandartAudit&&(this.field.IdStandartAudit=this.$route.query.IdStandartAudit,this.field.StandartAudit=this.$route.query.StandartAudit),0==this.isEdit&&this.getClause(this.field.IdStandartAudit)):this.$router.push("/RoleAdmin/master/data-standart-audit")}},o=(0,r(51900).Z)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("b-card",{staticClass:"mb-4",attrs:{header:t.headerCard,"header-tag":"h4"}},[t.isNotif?r("div",{staticClass:"alert alert-dismissible fade show",class:[t.alertVariant]},[r("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert"},on:{click:function(e){t.isNotif=!t.isNotif}}},[t._v("×")]),t._v("\n      "+t._s(t.alertNotif)+"\n    ")]):t._e(),t._v(" "),r("form",{attrs:{method:"POST"},on:{submit:function(e){return e.preventDefault(),t.submitForm()}}},[r("b-form-row",[r("b-form-group",{staticClass:"col-md-4"},[r("label",{staticClass:"form-label"},[t._v("Persyaratan Standart Audit")]),t._v(" "),r("b-input",{staticClass:"mb-1",attrs:{name:"StandartAudit",state:!t.allErrors.StandartAudit&&null,readonly:""},model:{value:t.field.StandartAudit,callback:function(e){t.$set(t.field,"StandartAudit",e)},expression:"field.StandartAudit"}}),t._v(" "),t.allErrors.StandartAudit?r("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.StandartAudit[0]))]):t._e()],1),t._v(" "),r("b-form-group",{staticClass:"col-md-4"},[r("label",{staticClass:"form-label"},[t._v("Parent Clause Audit")]),t._v(" "),r("multiselect",{attrs:{options:t.opsParent,"allow-empty":!0,"show-labels":!1,disabled:t.isDisabled,placeholder:"Pilih Parent Clause",label:"Requirements","track-by":"Requirements"},model:{value:t.field.Parent,callback:function(e){t.$set(t.field,"Parent",e)},expression:"field.Parent"}}),t._v(" "),t.allErrors.Parent?r("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.Parent[0]))]):t._e()],1),t._v(" "),r("b-form-group",{staticClass:"col-md-4"},[r("label",{staticClass:"form-label"},[t._v("Clause Audit")]),t._v(" "),r("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),r("b-input",{staticClass:"mb-1",attrs:{name:"Clause",state:!t.allErrors.Clause&&null,required:""},model:{value:t.field.Clause,callback:function(e){t.$set(t.field,"Clause",e)},expression:"field.Clause"}}),t._v(" "),t.allErrors.Clause?r("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.Clause[0]))]):t._e()],1)],1),t._v(" "),r("b-form-row",[r("b-form-group",{staticClass:"col-md-6"},[r("label",{staticClass:"form-label"},[t._v("Persyaratan Audit")]),t._v(" "),r("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),r("b-form-textarea",{attrs:{name:"Requirements",rows:"2","no-resize":""},model:{value:t.field.Requirements,callback:function(e){t.$set(t.field,"Requirements",e)},expression:"field.Requirements"}}),t._v(" "),t.allErrors.Requirements?r("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.Requirements[0]))]):t._e()],1),t._v(" "),r("b-form-group",{staticClass:"col-md-6"},[r("label",{staticClass:"form-label"},[t._v("Detail Persyaratan")]),t._v(" "),r("label",{staticClass:"form-label float-right text-danger"},[t._v("*Wajib Diisi")]),t._v(" "),r("b-form-textarea",{attrs:{name:"DetailRequirements",rows:"2","no-resize":""},model:{value:t.field.RequirementsDetail,callback:function(e){t.$set(t.field,"RequirementsDetail",e)},expression:"field.RequirementsDetail"}}),t._v(" "),t.allErrors.RequirementsDetail?r("span",{staticClass:"text-danger"},[t._v(t._s(t.allErrors.RequirementsDetail[0]))]):t._e()],1)],1),t._v(" "),r("b-form-row",[r("b-form-group",{staticClass:"col-md-6"}),t._v(" "),r("b-form-group",{staticClass:"col-md-6",attrs:{label:""}},[r("b-btn",{staticClass:"float-right ml-2",attrs:{type:"submit",variant:"primary"}},[t._v(t._s(t.textBtnSubmit))]),t._v(" "),r("b-btn",{staticClass:"float-right",attrs:{type:"button",variant:"secondary"},on:{click:function(e){return t.backIndex()}}},[t._v("Back")])],1)],1)],1),t._v(" "),0==t.isEdit?r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table table-bordered b-t"},[r("thead",[r("tr",{staticStyle:{"background-color":"white"}},[r("th",[t._v("#")]),t._v(" "),r("th",[t._v("Clause")]),t._v(" "),r("th",[t._v("Persyaratan Audit")]),t._v(" "),r("th",[t._v("Detail Persyaratan")]),t._v(" "),r("th",[t._v("Action")])])]),t._v(" "),t._l(t.detailClauseAudit,(function(e,a){return r("tbody",{key:a},[r("tr",{staticStyle:{"background-color":"white"}},[r("td",[t._v(t._s(a+1))]),t._v(" "),r("td",[t._v(t._s(e.Clause))]),t._v(" "),r("td",[t._v(t._s(e.Requirements))]),t._v(" "),r("td",[t._v(t._s(e.RequirementsDetail))]),t._v(" "),r("td",[r("div",{},[r("b-btn",{staticClass:"btn btn-outline-info btn-sm mr-sm-1",on:{click:function(r){return t.onAction("view-item",e.Id,t.field.IdStandartAudit,t.field.StandartAudit)}}},[r("i",{staticClass:"ion ion-ios-eye"})]),t._v(" "),r("b-btn",{staticClass:"btn btn-outline-secondary btn-sm mr-sm-1",on:{click:function(r){return t.onAction("edit-item",e.Id,t.field.IdStandartAudit,t.field.StandartAudit)}}},[r("i",{staticClass:"ion ion-md-create"})]),t._v(" "),r("b-btn",{staticClass:"btn btn-outline-danger btn-sm mr-sm-1",on:{click:function(r){return t.onAction("delete-item",e.Id,t.field.IdStandartAudit,t.field.StandartAudit)}}},[r("i",{staticClass:"ion ion-md-trash"})])],1)])])])}))],2)]):t._e()])],1)}),[],!1,null,null,null).exports},44612:function(t){t.exports=function(t){function e(a){if(r[a])return r[a].exports;var i=r[a]={exports:{},id:a,loaded:!1};return t[a].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.conformToMask=void 0;var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},n=r(2);Object.defineProperty(e,"conformToMask",{enumerable:!0,get:function(){return a(n).default}});var s=a(r(5));e.default={render:function(t){var e=this;return t("input",{ref:"input",domProps:{value:this.value},attrs:this.$attrs,on:Object.assign(i({},this.$listeners),{input:function(t){return e.updateValue(t.target.value)}})})},name:"masked-input",inheritAttrs:!1,props:{value:{type:String,required:!1,default:""},mask:{type:[Array,Function,Boolean,Object],required:!0},guide:{type:Boolean,required:!1},placeholderChar:{type:String,required:!1},keepCharPositions:{type:Boolean,required:!1},pipe:{type:Function,required:!1},showMask:{type:Boolean,required:!1}},mounted:function(){this.initMask()},methods:{createTextMaskInputElement:s.default,setTextMaskInputElement:function(){this.textMaskInputElement=this.createTextMaskInputElement(i({inputElement:this.$refs.input},this.$options.propsData))},initMask:function(){this.setTextMaskInputElement(),this.textMaskInputElement.update(this.value)},bind:function(){this.setTextMaskInputElement(),this.updateValue(this.value)},updateValue:function(t){this.textMaskInputElement.update(t),this.$emit("input",this.$refs.input.value)}},watch:{mask:function(t,e){this.mask!==e&&this.bind()},guide:function(){this.bind()},placeholderChar:function(){this.bind()},keepCharPositions:function(){this.bind()},pipe:function(){this.bind()},showMask:function(){this.bind()}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.placeholderChar="_",e.strFunction="function"},function(t,e,r){"use strict";function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,n.isArray)(e)){if((void 0===e?"undefined":i(e))!==s.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");e=e(t,r),e=(0,n.processCaretTraps)(e).maskWithoutCaretTraps}var a=r.guide,u=void 0===a||a,d=r.previousConformedValue,c=void 0===d?l:d,f=r.placeholderChar,h=void 0===f?s.placeholderChar:f,p=r.placeholder,v=void 0===p?(0,n.convertMaskToPlaceholder)(e,h):p,m=r.currentCaretPosition,b=r.keepCharPositions,g=!1===u&&void 0!==c,y=t.length,C=c.length,_=v.length,S=e.length,x=y-C,k=x>0,P=m+(k?-x:0),A=P+Math.abs(x);if(!0===b&&!k){for(var w=l,O=P;O<A;O++)v[O]===h&&(w+=h);t=t.slice(0,P)+w+t.slice(P,y)}for(var I=t.split(l).map((function(t,e){return{char:t,isNew:e>=P&&e<A}})),M=y-1;M>=0;M--){var E=I[M].char;E!==h&&E===v[M>=P&&C===S?M-x:M]&&I.splice(M,1)}var q=l,D=!1;t:for(var N=0;N<_;N++){var T=v[N];if(T===h){if(I.length>0)for(;I.length>0;){var V=I.shift(),$=V.char,R=V.isNew;if($===h&&!0!==g){q+=h;continue t}if(e[N].test($)){if(!0===b&&!1!==R&&c!==l&&!1!==u&&k){for(var j=I.length,F=null,B=0;B<j;B++){var H=I[B];if(H.char!==h&&!1===H.isNew)break;if(H.char===h){F=B;break}}null!==F?(q+=$,I.splice(F,1)):N--}else q+=$;continue t}D=!0}!1===g&&(q+=v.substr(N,_));break}q+=T}if(g&&!1===k){for(var W=null,L=0;L<q.length;L++)v[L]===h&&(W=L);q=null!==W?q.substr(0,W+1):l}return{conformedValue:q,meta:{someCharsRejected:D}}}Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=a;var n=r(3),s=r(1),o=[],l=""},function(t,e,r){"use strict";function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.placeholderChar;if(!i(t))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(-1!==t.indexOf(e))throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\nThe placeholder character that was received is: "+JSON.stringify(e)+"\n\nThe mask that was received is: "+JSON.stringify(t));return t.map((function(t){return t instanceof RegExp?e:t})).join("")}function i(t){return Array.isArray&&Array.isArray(t)||t instanceof Array}function n(t){return"string"==typeof t||t instanceof String}function s(t){return"number"==typeof t&&void 0===t.length&&!isNaN(t)}function o(t){return null==t}function l(t){for(var e=[],r=void 0;-1!==(r=t.indexOf(c));)e.push(r),t.splice(r,1);return{maskWithoutCaretTraps:t,indexes:e}}Object.defineProperty(e,"__esModule",{value:!0}),e.convertMaskToPlaceholder=a,e.isArray=i,e.isString=n,e.isNumber=s,e.isNil=o,e.processCaretTraps=l;var u=r(1),d=[],c="[]"},function(t,e){"use strict";function r(t){var e=t.previousConformedValue,r=void 0===e?i:e,n=t.previousPlaceholder,s=void 0===n?i:n,o=t.currentCaretPosition,l=void 0===o?0:o,u=t.conformedValue,d=t.rawValue,c=t.placeholderChar,f=t.placeholder,h=t.indexesOfPipedChars,p=void 0===h?a:h,v=t.caretTrapIndexes,m=void 0===v?a:v;if(0===l||!d.length)return 0;var b=d.length,g=r.length,y=f.length,C=u.length,_=b-g,S=_>0;if(_>1&&!S&&0!==g)return l;var x=0,k=void 0,P=void 0;if(!S||r!==u&&u!==f){var A=u.toLowerCase(),w=d.toLowerCase().substr(0,l).split(i).filter((function(t){return-1!==A.indexOf(t)}));P=w[w.length-1];var O=s.substr(0,w.length).split(i).filter((function(t){return t!==c})).length,I=f.substr(0,w.length).split(i).filter((function(t){return t!==c})).length,M=I!==O,E=void 0!==s[w.length-1]&&void 0!==f[w.length-2]&&s[w.length-1]!==c&&s[w.length-1]!==f[w.length-1]&&s[w.length-1]===f[w.length-2];!S&&(M||E)&&O>0&&f.indexOf(P)>-1&&void 0!==d[l]&&(k=!0,P=d[l]);for(var q=p.map((function(t){return A[t]})),D=q.filter((function(t){return t===P})).length,N=w.filter((function(t){return t===P})).length,T=f.substr(0,f.indexOf(c)).split(i).filter((function(t,e){return t===P&&d[e]!==t})).length,V=T+N+D+(k?1:0),$=0,R=0;R<C&&(x=R+1,A[R]===P&&$++,!($>=V));R++);}else x=l-_;if(S){for(var j=x,F=x;F<=y;F++)if(f[F]===c&&(j=F),f[F]===c||-1!==m.indexOf(F)||F===y)return j}else if(k){for(var B=x-1;B>=0;B--)if(u[B]===P||-1!==m.indexOf(B)||0===B)return B}else for(var H=x;H>=0;H--)if(f[H-1]===c||-1!==m.indexOf(H)||0===H)return H}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var a=[],i=""},function(t,e,r){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function i(t){var e={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:e,update:function(r){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=a.inputElement,p=a.mask,m=a.guide,b=a.pipe,g=a.placeholderChar,y=void 0===g?f.placeholderChar:g,C=a.keepCharPositions,_=void 0!==C&&C,S=a.showMask,x=void 0!==S&&S;if(void 0===r&&(r=i.value),r!==e.previousConformedValue){(void 0===p?"undefined":l(p))===v&&void 0!==p.pipe&&void 0!==p.mask&&(b=p.pipe,p=p.mask);var k=void 0,P=void 0;if(p instanceof Array&&(k=(0,c.convertMaskToPlaceholder)(p,y)),!1!==p){var A=s(r),w=i.selectionEnd,O=e.previousConformedValue,I=e.previousPlaceholder,M=void 0;if((void 0===p?"undefined":l(p))===f.strFunction){if(!1===(P=p(A,{currentCaretPosition:w,previousConformedValue:O,placeholderChar:y})))return;var E=(0,c.processCaretTraps)(P);P=E.maskWithoutCaretTraps,M=E.indexes,k=(0,c.convertMaskToPlaceholder)(P,y)}else P=p;var q={previousConformedValue:O,guide:m,placeholderChar:y,pipe:b,placeholder:k,currentCaretPosition:w,keepCharPositions:_},D=(0,d.default)(A,P,q).conformedValue,N=(void 0===b?"undefined":l(b))===f.strFunction,T={};N&&(!1===(T=b(D,o({rawValue:A},q)))?T={value:O,rejected:!0}:(0,c.isString)(T)&&(T={value:T}));var V=N?T.value:D,$=(0,u.default)({previousConformedValue:O,previousPlaceholder:I,conformedValue:V,placeholder:k,rawValue:A,currentCaretPosition:w,placeholderChar:y,indexesOfPipedChars:T.indexesOfPipedChars,caretTrapIndexes:M}),R=V===k&&0===$?x?k:h:V;e.previousConformedValue=R,e.previousPlaceholder=k,i.value!==R&&(i.value=R,n(i,$))}}}}}function n(t,e){document.activeElement===t&&(m?b((function(){return t.setSelectionRange(e,e,p)}),0):t.setSelectionRange(e,e,p))}function s(t){if((0,c.isString)(t))return t;if((0,c.isNumber)(t))return String(t);if(null==t)return h;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(t))}Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=i;var u=a(r(4)),d=a(r(2)),c=r(3),f=r(1),h="",p="none",v="object",m="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])}}]);