(()=>{"use strict";var t={8877:(t,e,n)=>{var r=n(144),i=n(7968),a=n.n(i);r.Z.use(a());const s=new(a().Store)({strict:!0,state:{theme:window.localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")||"light"},mutations:{updateTheme:function(t,e){t.theme=e,window.localStorage.setItem("theme",e)}},actions:{toggleTheme:function(t){this.commit("updateTheme","dark"!==t.state.theme?"dark":"light")}}});var o=n(8345);const c={props:["type"]};var u=n(1900);const l=(0,u.Z)(c,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("button",{staticClass:"btn",attrs:{type:t.type},on:{click:function(e){return t.$emit("click")}}},[t._t("default")],2)}),[],!1,null,"f025249a",null).exports;const p={props:["name","type","placeholder","value","ariaLabel"]};const f=(0,u.Z)(p,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{staticClass:"textfield",attrs:{name:t.name,type:t.type,placeholder:t.placeholder,"aria-label":t.ariaLabel},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}})}),[],!1,null,"335f049a",null).exports,h={components:{Btn:l,Textfield:f},data:function(){return{editing:!1}}};const m=(0,u.Z)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"search"},[n("textfield",{attrs:{name:"q",type:"text",placeholder:"Search","aria-label":"Search",value:t.$route.query.q},nativeOn:{focus:function(e){t.editing=!0},blur:function(e){t.editing=!1}}}),t._v(" "),n("btn",{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}]},[t._v("->")])],1)}),[],!1,null,"51a482aa",null).exports;const d={components:{Btn:l,Textfield:f},data:function(){return{editing:!1}},computed:{region:function(){var t;return null===(t=this.$route.query.region)||void 0===t?void 0:t.toUpperCase()},regions:function(){var t;return null===(t=this.$route.query.region)||void 0===t?void 0:t.toUpperCase().split("-").filter((function(t){return t&&""!==t}))},global:function(){return!this.regions||0===this.regions.length}},methods:{edit:function(){this.editing=!0,this.$nextTick((function(){return document.getElementById("textfield").focus()}))},unedit:function(){this.editing=!1}}};const g=(0,u.Z)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"unclick",rawName:"v-unclick",value:t.unedit,expression:"unedit"}],staticClass:"region-picker"},[n("btn",{directives:[{name:"show",rawName:"v-show",value:!t.editing,expression:"!editing"}],class:{square:t.global},attrs:{type:"button"},on:{click:t.edit}},[t._l(t.regions,(function(e,r){return[n("span",[t._v(t._s(e))]),t._v(" "),r+1<t.regions.length?n("span",[t._v(" ¬ ")]):t._e()]})),t._v(" "),t.global?n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24px",height:"24px"}},[n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),t._v(" "),n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"}})]):t._e()],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.editing,expression:"editing"}],staticClass:"form"},[n("textfield",{attrs:{id:"textfield",name:"region",placeholder:"US-NJ",value:t.region}}),t._v(" "),n("btn",[t._v("->")])],1)],1)}),[],!1,null,"4beac519",null).exports;function v(t){return function(t){if(Array.isArray(t))return b(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return b(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function w(t,e,n,r,i,a,s){try{var o=t[a](s),c=o.value}catch(t){return void n(t)}o.done?e(c):Promise.resolve(c).then(r,i)}function y(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var a=t.apply(e,n);function s(t){w(a,r,i,s,o,"next",t)}function o(t){w(a,r,i,s,o,"throw",t)}s(void 0)}))}}function x(t){return _.apply(this,arguments)}function _(){return(_=y(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.selftext){t.next=2;break}return t.abrupt("return",[]);case 2:if(n=v(new Set(v(e.selftext.matchAll(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]*\.[a-zA-Z0-9]*\b([-a-zA-Z0-9@:%_+.~#/]*)/g)).map((function(t){return t[0]}))))){t.next=5;break}return t.abrupt("return",{});case 5:return t.next=7,Promise.all(n.map(function(){var t=y(regeneratorRuntime.mark((function t(e){var n,r,i,a,s,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!/\/\/imgur\.com\/a\//.test(e)){t.next=11;break}return n=e.split("/").pop(),t.next=4,fetch("https://api.imgur.com/3/album/".concat(n,"/images"),{headers:{Authorization:"Client-ID 18506a441ae08ca"}});case 4:return r=t.sent,t.next=7,r.json();case 7:return i=t.sent,t.abrupt("return",i.data.map((function(t){return t.link})));case 11:if(!/\/\/imgur\.com\/gallery\//.test(e)){t.next=22;break}return a=e.split("/").pop(),t.next=15,fetch("https://api.imgur.com/3/gallery/".concat(a),{headers:{Authorization:"Client-ID 18506a441ae08ca"}});case 15:return s=t.sent,t.next=18,s.json();case 18:return o=t.sent,t.abrupt("return",o.data.images.map((function(t){return t.link})));case 22:/\/\/imgur\.com\/[A-Za-z0-9]*$/.test(e)&&(e="https://i.imgur.com/".concat(e.split("/").pop(),".jpg"));case 23:return t.abrupt("return",e);case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 7:return n=(n=t.sent).flat().filter((function(t){return/\.(png|jpg|jpeg|gif|webp)\/?$/.test(t)})),t.abrupt("return",n);case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(t){return C.apply(this,arguments)}function C(){return(C=y(regeneratorRuntime.mark((function t(e){var n,r,i,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.loading=!0,n=Object.entries(e).filter((function(t){return t[1]&&"content"!==t[0]})).map((function(t){return t.join(":")})).join(" "),t.next=4,fetch("https://www.reddit.com/r/mechmarket/search/.json?q=".concat(n||"").concat(e.content?" ".concat(e.content):"","&restrict_sr=on&sort=new"));case 4:return r=t.sent,t.next=7,r.json();case 7:return i=t.sent,a=i.data.children,t.next=11,Promise.all(a.map(function(){var t=y(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.t0=/\[\w+(-\w+)?]/.exec(n.data.title)[0].slice(1,-1).split("-"),t.t1=n.data.title.split("[H]")[1].split("[W]")["buying"===e.flair?1:0].trim(),"buying"===e.flair){t.next=8;break}return t.next=5,x(n.data);case 5:t.t2=t.sent,t.next=9;break;case 8:t.t2=[];case 9:return t.t3=t.t2,t.t4=n.data.url,t.abrupt("return",{regions:t.t0,title:t.t1,pictures:t.t3,href:t.t4});case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 11:this.posts=t.sent,this.loading=!1;case 13:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}const $={props:{flair:String},components:{RegionPicker:g,Search:m,Btn:l},data:function(){return{loading:!0,posts:[]}},computed:{theme:function(){return this.$store.state.theme},query:function(){return this.$route.query.q},region:function(){return this.$route.query.region?"[".concat(this.$route.query.region.toUpperCase()):""}},watch:{flair:function(t){k.bind(this)({flair:t,title:this.region,content:this.query})}},created:function(){k.bind(this)({flair:this.flair,title:this.region,content:this.query})}};const q=(0,u.Z)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"surface",class:t.theme,attrs:{id:"app"}},[n("div",{staticClass:"titlebar"},[n("div",{staticClass:"control"},[n("form",[n("search"),t._v(" "),n("region-picker")],1),t._v(" "),n("btn",{staticClass:"theme",on:{click:function(e){return t.$store.dispatch("toggleTheme")}}},[n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",height:"24",width:"24",viewBox:"0 0 6.3499998 6.35"}},[n("g",{attrs:{transform:"translate(0,-290.64998)"}},[n("path",{attrs:{d:"m 4.3466476,291.17915 a 2.8163548,2.8163548 0 0 1 0.3476437,1.34877 2.8163548,2.8163548 0 0 1 -2.8163547,2.81635 2.8163548,2.8163548 0 0 1 -1.34216911,-0.34104 2.8163548,2.8163548 0 0 0 2.46871101,1.46758 2.8163548,2.8163548 0 0 0 2.8163548,-2.81635 2.8163548,2.8163548 0 0 0 -1.4741857,-2.47531 z"}})])])])],1),t._v(" "),n("nav",{staticClass:"tabs"},[n("router-link",{staticClass:"tab",attrs:{to:{name:"home",params:{flair:"selling"},query:t.$route.query},selected:"selling"===t.$route.params.flair}},[t._v("\n                Selling\n            ")]),t._v(" "),n("router-link",{staticClass:"tab",attrs:{to:{name:"home",params:{flair:"buying"},query:t.$route.query},selected:"buying"===t.$route.params.flair}},[t._v("\n                Buying\n            ")]),t._v(" "),n("router-link",{staticClass:"tab",attrs:{to:{name:"home",params:{flair:"trading"},query:t.$route.query},selected:"trading"===t.$route.params.flair}},[t._v("\n                Trading\n            ")])],1)]),t._v(" "),n("main",{staticClass:"surface"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading"},[n("div",{staticClass:"surface"},[t._v("> loading...")])]),t._v(" "),t._l(t.posts,(function(e){return n("a",{staticClass:"post",attrs:{href:e.href}},[n("div",{staticClass:"overline"},[n("h2",[t._l(e.regions,(function(r,i){return[n("span",[t._v(t._s(r))]),t._v(" "),i+1<e.regions.length?n("span",{staticClass:"sub"},[t._v(" ¬ ")]):t._e()]}))],2),t._v(" "),n("hr")]),t._v(" "),n("h1",{domProps:{innerHTML:t._s(e.title)}}),t._v(" "),n("div",{staticClass:"gallery"},t._l(e.pictures.slice(0,4),(function(t){return n("div",{staticClass:"img",style:{"background-image":"url("+t}})})),0),t._v(" "),e.pictures.length>4?n("p",{staticClass:"gallery-hint"},[t._v("\n                + "+t._s(e.pictures.length-4)+" more image"+t._s(5!==e.pictures.length?"s":"")+"\n            ")]):t._e()])}))],2)])}),[],!1,null,null,null).exports;r.Z.use(o.Z);const j=new o.Z({mode:"history",base:"/Mechmarket/",fallback:!1,routes:[{path:"/",redirect:"/selling"},{path:"/:flair",name:"home",component:q,props:!0}]});r.Z.directive("unclick",{bind:function(t,e,n){t.clickOutsideEvent=function(r){t===r.target||t.contains(r.target)||n.context[e.expression](r)},document.body.addEventListener("click",t.clickOutsideEvent)},unbind:function(t){document.body.removeEventListener("click",t.clickOutsideEvent)}}),new r.Z({el:"#app",store:s,router:j,render:function(t){return t("router-view")}})}},e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.m=t,n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={179:0},e=[[6981,964],[8877,964]],r=()=>{};function i(){for(var r,i=0;i<e.length;i++){for(var a=e[i],s=!0,o=1;o<a.length;o++){var c=a[o];0!==t[c]&&(s=!1)}s&&(e.splice(i--,1),r=n(n.s=a[0]))}return 0===e.length&&(n.x(),n.x=()=>{}),r}n.x=()=>{n.x=()=>{},s=s.slice();for(var t=0;t<s.length;t++)a(s[t]);return(r=i)()};var a=i=>{for(var a,s,[c,u,l,p]=i,f=0,h=[];f<c.length;f++)s=c[f],n.o(t,s)&&t[s]&&h.push(t[s][0]),t[s]=0;for(a in u)n.o(u,a)&&(n.m[a]=u[a]);for(l&&l(n),o(i);h.length;)h.shift()();return p&&e.push.apply(e,p),r()},s=self.webpackChunkmechmarket=self.webpackChunkmechmarket||[],o=s.push.bind(s);s.push=a})(),n.x()})();
//# sourceMappingURL=main.bundle.js.map