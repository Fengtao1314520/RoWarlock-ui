(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13a06a29"],{"096d":function(e,t,s){"use strict";s("6c62")},"6c62":function(e,t,s){},aaf8:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("section",{staticClass:"hero"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container"},[s("div",{staticClass:"columns is-left"},[s("div",{staticClass:"column is-2"}),s("div",{staticClass:"column is-two-fifths"},[s("div",{staticClass:"is-cwhite-2 notification message"},[s("strong",{staticClass:"is-size-5"},[e._v("欢迎注册")]),s("p",{staticClass:"is-size-7"},[e._v("请输入必要的信息,协助我们为你注册")]),s("hr",{staticClass:"margin-05 has-background-cgray-1"}),s("b-field",{attrs:{type:"is-cwhite-1"}},[s("strong",{staticClass:"mt-2 mr-4"},[e._v("账号:")]),s("b-input",{attrs:{expanded:"",icon:"account"},model:{value:e.registerinfo.username,callback:function(t){e.$set(e.registerinfo,"username",t)},expression:"registerinfo.username"}})],1),s("b-field",{attrs:{type:"is-cwhite-1"}},[s("strong",{staticClass:"mt-2 mr-4"},[e._v("密码:")]),s("b-input",{attrs:{expanded:"",icon:"lock",type:"password","password-reveal":""},model:{value:e.registerinfo.password,callback:function(t){e.$set(e.registerinfo,"password",t)},expression:"registerinfo.password"}})],1),s("b-field",{attrs:{type:"is-cwhite-1"}},[s("strong",{staticClass:"mt-2 mr-4"},[e._v("昵称:")]),s("b-input",{attrs:{expanded:"",icon:"lock"},model:{value:e.registerinfo.nickname,callback:function(t){e.$set(e.registerinfo,"nickname",t)},expression:"registerinfo.nickname"}})],1),s("b-field",{attrs:{type:"is-cwhite-1"}},[s("strong",{staticClass:"mt-2 mr-4"},[e._v("邮箱:")]),s("b-input",{attrs:{expanded:"",icon:"email",type:"email"},model:{value:e.registerinfo.email,callback:function(t){e.$set(e.registerinfo,"email",t)},expression:"registerinfo.email"}})],1),s("hr",{staticClass:"margin-05"}),s("div",[s("b-button",{staticClass:"mt-3",attrs:{expanded:"",type:"is-cblue-3"},on:{click:function(t){return e.register()}}},[e._v("注册")]),e._m(0)],1)],1)])])])])])])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",{staticClass:"has-text-centered"},[e._v(" 已经有账号? 点击 "),s("a",{attrs:{href:"/login"}},[e._v("这里")]),e._v(" 登陆 ")])}],r=s("e114"),n={name:"Register",data(){return{registerinfo:{username:"",password:"",nickname:"",email:""}}},computed:{},mounted(){},methods:{register(){const e=this;Object(r["c"])("/user/register",this.registerinfo).then(t=>{const s=t;!0===s.resstatus?(e.$store.commit("updateUserInfo",s),e.$router.push("/")):e.$buefy.dialog.alert({title:"错误",type:"is-cred-2",message:s.meesage})})}}},c=n,o=(s("096d"),s("2877")),l=Object(o["a"])(c,i,a,!1,null,"a3b93ebe",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-13a06a29.d8c9d4c3.js.map