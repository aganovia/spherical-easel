(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{312:function(t,e,n){},370:function(t,e,n){"use strict";var i=n(312);n.n(i).a},375:function(t,e,n){"use strict";n.r(e);n(351),n(170);var i=n(352),a=n(353),r=n.n(a);function s(){var t=Object(i.a)(['<script type="text/tikz">']);return s=function(){return t},t}var c={name:"tik-z-picture",props:{latex:""},data:function(){return{latexSnippet:"",doneFetching:!1}},mounted:function(){var t,e=this;t=this.latex.startsWith(".")||this.latex.startsWith("/")?this.latex:"/"+this.latex,this.doneFetching=!1,r.a.get(t).then((function(t){e.latexSnippet=String.raw(s())+t.data+"<\\/script>",e.doneFetching=!0}))}},o=(n(370),n(41)),u=Object(o.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-card",{attrs:{elevation:20}},[e("div",{staticClass:"tikz",domProps:{innerHTML:this._s(this.latexSnippet)}},[this._v("\n    Please refresh your browser\n  ")])])}),[],!1,null,"37414a06",null);e.default=u.exports}}]);