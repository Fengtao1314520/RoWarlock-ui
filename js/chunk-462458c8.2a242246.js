(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-462458c8"],{"17ad":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return l})),n.d(e,"a",(function(){return o}));var i=n("21a6"),s=n.n(i);const o=t=>(t.forEach(t=>{t.cases.forEach(t=>{t.steps.forEach(t=>{t.response.body="",t.response.completeres={}})})}),t),a=t=>{console.log(t);const e=new File([t],"testsuite.json",{type:"json;charset=utf-8"});s.a.saveAs(e)},l=t=>{console.log(t);const e=new File([t],"history.json",{type:"json;charset=utf-8"});s.a.saveAs(e)}},"1e1d":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-title-bar"},[n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"},[n("div",{staticClass:"level-item"},[n("ul",t._l(t.titleStack,(function(e,i){return n("li",{key:i},[t._v(t._s(e))])})),0)])]),n("div",{staticClass:"level-right"})])])},s=[],o={name:"TitleBar",props:{titleStack:{type:Array,default:()=>[]}}},a=o,l=n("2877"),c=Object(l["a"])(a,i,s,!1,null,null,null);e["a"]=c.exports},"21a6":function(t,e,n){(function(n){var i,s,o;(function(n,a){s=[],i=a,o="function"===typeof i?i.apply(e,s):i,void 0===o||(t.exports=o)})(0,(function(){"use strict";function e(t,e){return"undefined"==typeof e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}function i(t,e,n){var i=new XMLHttpRequest;i.open("GET",t),i.responseType="blob",i.onload=function(){c(i.response,e,n)},i.onerror=function(){console.error("could not download file")},i.send()}function s(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return 200<=e.status&&299>=e.status}function o(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(i){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,l=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),c=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!l?function(t,e,n){var l=a.URL||a.webkitURL,c=document.createElement("a");e=e||t.name||"download",c.download=e,c.rel="noopener","string"==typeof t?(c.href=t,c.origin===location.origin?o(c):s(c.href)?i(t,e,n):o(c,c.target="_blank")):(c.href=l.createObjectURL(t),setTimeout((function(){l.revokeObjectURL(c.href)}),4e4),setTimeout((function(){o(c)}),0))}:"msSaveOrOpenBlob"in navigator?function(t,n,a){if(n=n||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(e(t,a),n);else if(s(t))i(t,n,a);else{var l=document.createElement("a");l.href=t,l.target="_blank",setTimeout((function(){o(l)}))}}:function(t,e,n,s){if(s=s||open("","_blank"),s&&(s.document.title=s.document.body.innerText="downloading..."),"string"==typeof t)return i(t,e,n);var o="application/octet-stream"===t.type,c=/constructor/i.test(a.HTMLElement)||a.safari,r=/CriOS\/[\d]+/.test(navigator.userAgent);if((r||o&&c||l)&&"undefined"!=typeof FileReader){var u=new FileReader;u.onloadend=function(){var t=u.result;t=r?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),s?s.location.href=t:location=t,s=null},u.readAsDataURL(t)}else{var d=a.URL||a.webkitURL,f=d.createObjectURL(t);s?s.location=f:location.href=f,s=null,setTimeout((function(){d.revokeObjectURL(f)}),4e4)}});a.saveAs=c.saveAs=c,t.exports=c}))}).call(this,n("c8ba"))},"5f5d":function(t,e,n){"use strict";n("79d7")},"79d7":function(t,e,n){},b5ca:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("title-bar",{attrs:{"title-stack":t.titleStack}}),n("section",[n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-2"},[n("div",{staticClass:"notification has-background-cwhite-2 padding-02"},[n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"},[n("div",{staticClass:"file is-cblue-3",staticStyle:{zoom:"70%"}},[n("b-upload",{staticClass:"file-label",attrs:{size:"is-small"},on:{input:t.importHistory}},[n("span",{staticClass:"file-cta"},[n("span",{staticClass:"file-label"},[t._v("导入")])])])],1)]),n("div",{staticClass:"level-right"},[n("b-button",{attrs:{size:"is-small",type:"is-cred-2",outlined:""},on:{click:function(e){return t.exportHistory()}}},[n("p",{staticClass:"has-text-weight-bold"},[t._v("导出")])])],1)]),n("p",{staticClass:"title is-6"},[t._v("历史释放列表:")]),t._l(t.allhistorys,(function(e,i){return n("div",{key:i},[n("div",{staticClass:"notification padding-02"},[n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"},[n("c-button",{attrs:{"variant-color":"blue",variant:"outline",size:"sm",width:"220px"},on:{click:function(n){return t.openHistory(e)}}},[t._v(" "+t._s(e.taskname)+" ")])],1),n("div",{staticClass:"level-irght"},[n("c-button",{attrs:{"left-icon":"phone","variant-color":"green",variant:"outline",size:"sm",width:"30px"},on:{click:function(n){return t.openIntoActive(e,i)}}})],1)])])])}))],2)]),n("div",{staticClass:"column"},[void 0!==t.selectdata?n("div",[n("vue-json-pretty",{attrs:{data:t.selectdata,deep:4,virtual:!0}})],1):t._e()])])])],1)},s=[],o=n("17ad"),a=n("6c4d"),l=n("838b"),c=n.n(l),r=(n("b83f"),n("1e1d")),u={name:"NowSprint",components:{TitleBar:r["a"],VueJsonPretty:c.a,CButton:a["a"]},data(){return{allhistorys:[],selectdata:{}}},computed:{titleStack(){return["RoWalock","历史释放"]}},mounted(){this.init()},methods:{init(){this.allhistorys=this.$store.state.releasemanagement.historyRelease},openHistory(t){this.selectdata=t},exportHistory(){const t=JSON.stringify(this.allhistorys);Object(o["c"])(t)},importHistory(t){const e=this,n=new FileReader;n.readAsText(t,"UTF-8"),n.onload=function(t){const n=t.target.result;e.$store.commit("uploadHistoryReleaseByFile",n),e.init()}},openIntoActive(t,e){this.$store.commit("takeHistoryIntoActive",{item:t,index:e})}}},d=u,f=(n("5f5d"),n("2877")),p=Object(f["a"])(d,i,s,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-462458c8.2a242246.js.map