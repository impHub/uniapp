(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-input/u-input"],{3270:function(t,e,n){"use strict";n.r(e);var i=n("e790"),u=n("9ab2");for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);n("a396");var o,r=n("f0c5"),l=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,"5ea4f0d7",null,!1,i["a"],o);e["default"]=l.exports},3372:function(t,e,n){},"4a82":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(n("0651"));function u(t){return t&&t.__esModule?t:{default:t}}var a={name:"u-input",mixins:[i.default],props:{value:{type:[String,Number],default:""},type:{type:String,default:"text"},inputAlign:{type:String,default:"left"},placeholder:{type:String,default:"请输入内容"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},placeholderStyle:{type:String,default:"color: #c0c4cc;"},confirmType:{type:String,default:"done"},customStyle:{type:Object,default:function(){return{}}},fixed:{type:Boolean,default:!1},focus:{type:Boolean,default:!1},passwordIcon:{type:Boolean,default:!0},border:{type:Boolean,default:!1},borderColor:{type:String,default:"#dcdfe6"},autoHeight:{type:Boolean,default:!0},selectOpen:{type:Boolean,default:!1},height:{type:[Number,String],default:""},clearable:{type:Boolean,default:!0},cursorSpacing:{type:[Number,String],default:0},selectionStart:{type:[Number,String],default:-1},selectionEnd:{type:[Number,String],default:-1}},data:function(){return{defaultValue:this.value,inputHeight:70,textareaHeight:100,validateState:!1,focused:!1,showPassword:!1}},watch:{value:function(t,e){this.defaultValue=t,t!=e&&"select"==this.type&&this.handleInput({detail:{value:t}})}},computed:{inputMaxlength:function(){return Number(this.maxlength)},getStyle:function(){var t={};return t.minHeight=this.height?this.height+"rpx":"textarea"==this.type?this.textareaHeight+"rpx":this.inputHeight+"rpx",t=Object.assign(t,this.customStyle),t},getCursorSpacing:function(){return Number(this.cursorSpacing)},uSelectionStart:function(){return String(this.selectionStart)},uSelectionEnd:function(){return String(this.selectionEnd)}},created:function(){this.$on("on-form-item-error",this.onFormItemError)},methods:{handleInput:function(t){var e=this;this.defaultValue=t.detail.value,this.$emit("input",t.detail.value),this.$nextTick((function(){e.dispatch("u-form-item","on-form-change",t.detail.value)}))},handleBlur:function(t){var e=this;this.focused=!1,this.$emit("blur",t.detail.value),this.$nextTick((function(){e.dispatch("u-form-item","on-form-blur",t.detail.value)}))},onFormItemError:function(t){this.validateState=t},onFocus:function(t){this.focused=!0,this.$emit("focus")},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},inputClick:function(){this.$emit("click")}}};e.default=a},"9ab2":function(t,e,n){"use strict";n.r(e);var i=n("4a82"),u=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=u.a},a396:function(t,e,n){"use strict";var i=n("3372"),u=n.n(i);u.a},e790:function(t,e,n){"use strict";var i={uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"ae25"))}},u=function(){var t=this,e=t.$createElement,n=(t._self._c,"textarea"==t.type?t.__get_style([t.getStyle]):null),i="textarea"!=t.type?t.__get_style([t.getStyle]):null;t._isMounted||(t.e0=function(e){t.showPassword=!t.showPassword}),t.$mp.data=Object.assign({},{$root:{s0:n,s1:i}})},a=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-input/u-input-create-component',
    {
        'uview-ui/components/u-input/u-input-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3270"))
        })
    },
    [['uview-ui/components/u-input/u-input-create-component']]
]);
