import{r as O,g as A,R as V}from"./index-45a6233b.js";const _=t=>{let e;const n=new Set,r=(i,u)=>{const f=typeof i=="function"?i(e):i;if(!Object.is(f,e)){const l=e;e=u??(typeof f!="object"||f===null)?f:Object.assign({},e,f),n.forEach(S=>S(e,l))}},o=()=>e,v={setState:r,getState:o,getInitialState:()=>p,subscribe:i=>(n.add(i),()=>n.delete(i)),destroy:()=>{n.clear()}},p=e=t(r,o,v);return v},$=t=>t?_(t):_;var R={exports:{}},B={},C={exports:{}},T={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=O;function q(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var I=typeof Object.is=="function"?Object.is:q,j=E.useState,F=E.useEffect,P=E.useLayoutEffect,W=E.useDebugValue;function L(t,e){var n=e(),r=j({inst:{value:n,getSnapshot:e}}),o=r[0].inst,a=r[1];return P(function(){o.value=n,o.getSnapshot=e,x(o)&&a({inst:o})},[t,n,e]),F(function(){return x(o)&&a({inst:o}),t(function(){x(o)&&a({inst:o})})},[t]),W(n),n}function x(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!I(t,n)}catch{return!0}}function z(t,e){return e()}var U=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?z:L;T.useSyncExternalStore=E.useSyncExternalStore!==void 0?E.useSyncExternalStore:U;C.exports=T;var k=C.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b=O,G=k;function H(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var J=typeof Object.is=="function"?Object.is:H,K=G.useSyncExternalStore,N=b.useRef,Q=b.useEffect,X=b.useMemo,Y=b.useDebugValue;B.useSyncExternalStoreWithSelector=function(t,e,n,r,o){var a=N(null);if(a.current===null){var c={hasValue:!1,value:null};a.current=c}else c=a.current;a=X(function(){function v(l){if(!p){if(p=!0,i=l,l=r(l),o!==void 0&&c.hasValue){var S=c.value;if(o(S,l))return u=S}return u=l}if(S=u,J(i,l))return S;var s=r(l);return o!==void 0&&o(S,s)?S:(i=l,u=s)}var p=!1,i,u,f=n===void 0?null:n;return[function(){return v(e())},f===null?void 0:function(){return v(f())}]},[e,n,r,o]);var d=K(t,a[0],a[1]);return Q(function(){c.hasValue=!0,c.value=d},[d]),Y(d),d};R.exports=B;var Z=R.exports;const tt=A(Z),{useDebugValue:et}=V,{useSyncExternalStoreWithSelector:nt}=tt;const ot=t=>t;function rt(t,e=ot,n){const r=nt(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,n);return et(r),r}const M=t=>{const e=typeof t=="function"?$(t):t,n=(r,o)=>rt(e,r,o);return Object.assign(n,e),n},st=t=>t?M(t):M,it=(t,e)=>(n,r,o)=>{var a;if(typeof window>"u")return console.warn("BroadcastChannel is not supported in this environment. The store will not be shared."),t(n,r,o);if(typeof BroadcastChannel>"u")return console.warn("BroadcastChannel is not supported in this browser. The store will not be shared."),t(n,r,o);let c=r()!==void 0,d=!1;const v=(a=e==null?void 0:e.name)!=null?a:t.toString();let p=0;const i=[0],u=new BroadcastChannel(v),f=(...s)=>{const h=r();if(n(...s),e!=null&&e.unsync)return;const w=r(),y=Object.entries(w).reduce((g,[m,D])=>(h[m]!==D&&(g={...g,[m]:D}),g),{});u.postMessage({action:"change",state:y})};u.onmessage=s=>{if(s.data.action==="sync"){if(!d)return;const h=Object.entries(r()).reduce((y,[g,m])=>(typeof m!="function"&&typeof m!="symbol"&&(y={...y,[g]:m}),y),{});u.postMessage({action:"change",state:h});const w=i[i.length-1]+1;i.push(w),u.postMessage({action:"add_new_tab",id:w});return}if(s.data.action==="add_new_tab"&&!d&&p===0){p=s.data.id;return}if(s.data.action==="change"&&(n(s.data.state),c=!0),s.data.action==="close"){if(!d)return;const h=i.indexOf(s.data.id);h!==-1&&i.splice(h,1)}s.data.action==="change_main"&&s.data.id===p&&(d=!0,i.splice(0,i.length,...s.data.tabs),e==null||e.onBecomeMain==null||e.onBecomeMain())};const l=()=>{var s;u.postMessage({action:"sync"}),setTimeout(()=>{c||(d=!0,c=!0,e==null||e.onBecomeMain==null||e.onBecomeMain())},(s=e==null?void 0:e.mainTimeout)!=null?s:100)},S=()=>{if(u.postMessage({action:"close",id:p}),d){if(i.length===1){u.close();return}const s=i.filter(h=>h!==p);u.postMessage({action:"change_main",id:s[0],tabs:s});return}};return window.addEventListener("beforeunload",S),c||l(),o.setState=f,t(f,r,o)},ut=it,ct=st()(ut((t,e)=>({count:0,increment:()=>t(n=>({count:n.count+1})),decrement:()=>t({count:e().count-1}),mode:"Sync",setMode:n=>t({mode:n})}),{name:"my-store"}));export{ct as u};
