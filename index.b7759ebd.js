function e(e,t,r,i){Object.defineProperty(e,t,{get:r,set:i,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},a=r.parcelRequireb9d2;null==a&&((a=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return i[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},r.parcelRequireb9d2=a),a.register("27Lyk",(function(t,r){var i,n;e(t.exports,"register",(()=>i),(e=>i=e)),e(t.exports,"resolve",(()=>n),(e=>n=e));var a={};i=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)a[t[r]]=e[t[r]]},n=function(e){var t=a[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),a("27Lyk").register(JSON.parse('{"4AsOV":"index.b7759ebd.js","dimdz":"play-circle.27cac745.svg","gxEmx":"pause-circle.98efb98a.svg"}'));var o;o=new URL(a("27Lyk").resolve("dimdz"),import.meta.url).toString();var l;l=new URL(a("27Lyk").resolve("gxEmx"),import.meta.url).toString();class s{constructor(){this._requestPermission()}_requestPermission=async()=>"Notification"in window?Notification.requestPermission().then((e=>["granted"].includes(e))).catch((e=>(console.error(e),!1))):Promise.resolve(!1);async notify(e){await this._requestPermission()&&e&&new Notification("Timer",{body:e})}}window.addEventListener("load",(function(){const e={ref:new YT.Player("player",{height:"0",width:"0",videoId:"tGfQYbArQhc",autoplay:1,controls:0,loop:1,playerVars:{playsinline:1},events:{}}),metadata:{title:null},done:!1},r=document.getElementById("player-action"),i=r.getElementsByTagName("img")?.[0];if(!r||!i)return;const n=new s;r.addEventListener("click",(async r=>{r.preventDefault();const a=r.currentTarget??{},s=()=>a.disabled=!a.disabled;s();const d=e.ref.videoTitle,c=e.ref.getPlayerState();d&&(e.metadata.title=d);[YT.PlayerState.UNSTARTED,YT.PlayerState.PAUSED,YT.PlayerState.CUED].includes(c)?(e.ref.playVideo(),i.src=t(l),e.metadata.title&&await n.notify(`Tocando "${e.metadata.title}"`)):c===YT.PlayerState.PLAYING&&(e.ref.stopVideo(),i.src=t(o),e.metadata.title&&await n.notify(`"${e.metadata.title}" pausado`)),s()}))}));
//# sourceMappingURL=index.b7759ebd.js.map
