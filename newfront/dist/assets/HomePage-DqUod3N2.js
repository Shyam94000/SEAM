import{bn as Cr,bo as Er,r as D,bp as Mr,bq as Lr,br as Rr,bj as zr,bi as Dr,bk as Ir,bf as pe,bl as $r,bs as Nr,bh as Wr,b9 as b,bg as Ar,bt as ze,bu as ft,bm as Hr,bv as Br,bw as Fr,bx as Yr,by as d,bz as qr,bA as He,bB as Xr,ba as ye,b7 as Vr,bb as Gr,bc as te,bd as W,bC as vt,bD as Be}from"./index-BKTy4h11.js";import{u as Ur,B as gt}from"./Button-DcO0qGCa.js";import{c as Kr}from"./createSvgIcon-CLvP75nm.js";import{P as Q}from"./Paper-BJo6EO63.js";import{g as Qr}from"./proxy-Bml_j8Ev.js";function Zr(t,e,n,i,r){const[a,o]=D.useState(()=>r&&n?n(t).matches:i?i(t).matches:e);return Ur(()=>{let s=!0;if(!n)return;const l=n(t),c=()=>{s&&o(l.matches)};return c(),l.addListener(c),()=>{s=!1,l.removeListener(c)}},[t,n]),a}const Wt=D.useSyncExternalStore;function Jr(t,e,n,i,r){const a=D.useCallback(()=>e,[e]),o=D.useMemo(()=>{if(r&&n)return()=>n(t).matches;if(i!==null){const{matches:u}=i(t);return()=>u}return a},[a,t,i,r,n]),[s,l]=D.useMemo(()=>{if(n===null)return[a,()=>()=>{}];const u=n(t);return[()=>u.matches,f=>(u.addListener(f),()=>{u.removeListener(f)})]},[a,n,t]);return Wt(l,s,o)}function en(t,e={}){const n=Cr(),i=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:r=!1,matchMedia:a=i?window.matchMedia:null,ssrMatchMedia:o=null,noSsr:s=!1}=Er({name:"MuiUseMediaQuery",props:e,theme:n});let l=typeof t=="function"?t(n):t;return l=l.replace(/^@media( ?)/m,""),(Wt!==void 0?Jr:Zr)(l,r,a,o,s)}function At(){const t=Mr(Rr);return t[Lr]||t}const yt=D.createContext();function tn(t){return zr("MuiGrid",t)}const rn=[0,1,2,3,4,5,6,7,8,9,10],nn=["column-reverse","column","row-reverse","row"],on=["nowrap","wrap-reverse","wrap"],fe=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],he=Dr("MuiGrid",["root","container","item","zeroMinWidth",...rn.map(t=>`spacing-xs-${t}`),...nn.map(t=>`direction-xs-${t}`),...on.map(t=>`wrap-xs-${t}`),...fe.map(t=>`grid-xs-${t}`),...fe.map(t=>`grid-sm-${t}`),...fe.map(t=>`grid-md-${t}`),...fe.map(t=>`grid-lg-${t}`),...fe.map(t=>`grid-xl-${t}`)]),an=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function re(t){const e=parseFloat(t);return`${e}${String(t).replace(String(e),"")||"px"}`}function sn({theme:t,ownerState:e}){let n;return t.breakpoints.keys.reduce((i,r)=>{let a={};if(e[r]&&(n=e[r]),!n)return i;if(n===!0)a={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if(n==="auto")a={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const o=ze({values:e.columns,breakpoints:t.breakpoints.values}),s=typeof o=="object"?o[r]:o;if(s==null)return i;const l=`${Math.round(n/s*1e8)/1e6}%`;let c={};if(e.container&&e.item&&e.columnSpacing!==0){const u=t.spacing(e.columnSpacing);if(u!=="0px"){const f=`calc(${l} + ${re(u)})`;c={flexBasis:f,maxWidth:f}}}a=pe({flexBasis:l,flexGrow:0,maxWidth:l},c)}return t.breakpoints.values[r]===0?Object.assign(i,a):i[t.breakpoints.up(r)]=a,i},{})}function ln({theme:t,ownerState:e}){const n=ze({values:e.direction,breakpoints:t.breakpoints.values});return ft({theme:t},n,i=>{const r={flexDirection:i};return i.indexOf("column")===0&&(r[`& > .${he.item}`]={maxWidth:"none"}),r})}function Ht({breakpoints:t,values:e}){let n="";Object.keys(e).forEach(r=>{n===""&&e[r]!==0&&(n=r)});const i=Object.keys(t).sort((r,a)=>t[r]-t[a]);return i.slice(0,i.indexOf(n))}function cn({theme:t,ownerState:e}){const{container:n,rowSpacing:i}=e;let r={};if(n&&i!==0){const a=ze({values:i,breakpoints:t.breakpoints.values});let o;typeof a=="object"&&(o=Ht({breakpoints:t.breakpoints.values,values:a})),r=ft({theme:t},a,(s,l)=>{var c;const u=t.spacing(s);return u!=="0px"?{marginTop:`-${re(u)}`,[`& > .${he.item}`]:{paddingTop:re(u)}}:(c=o)!=null&&c.includes(l)?{}:{marginTop:0,[`& > .${he.item}`]:{paddingTop:0}}})}return r}function un({theme:t,ownerState:e}){const{container:n,columnSpacing:i}=e;let r={};if(n&&i!==0){const a=ze({values:i,breakpoints:t.breakpoints.values});let o;typeof a=="object"&&(o=Ht({breakpoints:t.breakpoints.values,values:a})),r=ft({theme:t},a,(s,l)=>{var c;const u=t.spacing(s);return u!=="0px"?{width:`calc(100% + ${re(u)})`,marginLeft:`-${re(u)}`,[`& > .${he.item}`]:{paddingLeft:re(u)}}:(c=o)!=null&&c.includes(l)?{}:{width:"100%",marginLeft:0,[`& > .${he.item}`]:{paddingLeft:0}}})}return r}function fn(t,e,n={}){if(!t||t<=0)return[];if(typeof t=="string"&&!Number.isNaN(Number(t))||typeof t=="number")return[n[`spacing-xs-${String(t)}`]];const i=[];return e.forEach(r=>{const a=t[r];Number(a)>0&&i.push(n[`spacing-${r}-${String(a)}`])}),i}const dn=Ir("div",{name:"MuiGrid",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t,{container:i,direction:r,item:a,spacing:o,wrap:s,zeroMinWidth:l,breakpoints:c}=n;let u=[];i&&(u=fn(o,c,e));const f=[];return c.forEach(g=>{const x=n[g];x&&f.push(e[`grid-${g}-${String(x)}`])}),[e.root,i&&e.container,a&&e.item,l&&e.zeroMinWidth,...u,r!=="row"&&e[`direction-xs-${String(r)}`],s!=="wrap"&&e[`wrap-xs-${String(s)}`],...f]}})(({ownerState:t})=>pe({boxSizing:"border-box"},t.container&&{display:"flex",flexWrap:"wrap",width:"100%"},t.item&&{margin:0},t.zeroMinWidth&&{minWidth:0},t.wrap!=="wrap"&&{flexWrap:t.wrap}),ln,cn,un,sn);function pn(t,e){if(!t||t<=0)return[];if(typeof t=="string"&&!Number.isNaN(Number(t))||typeof t=="number")return[`spacing-xs-${String(t)}`];const n=[];return e.forEach(i=>{const r=t[i];if(Number(r)>0){const a=`spacing-${i}-${String(r)}`;n.push(a)}}),n}const hn=t=>{const{classes:e,container:n,direction:i,item:r,spacing:a,wrap:o,zeroMinWidth:s,breakpoints:l}=t;let c=[];n&&(c=pn(a,l));const u=[];l.forEach(g=>{const x=t[g];x&&u.push(`grid-${g}-${String(x)}`)});const f={root:["root",n&&"container",r&&"item",s&&"zeroMinWidth",...c,i!=="row"&&`direction-xs-${String(i)}`,o!=="wrap"&&`wrap-xs-${String(o)}`,...u]};return Hr(f,tn,e)},X=D.forwardRef(function(e,n){const i=$r({props:e,name:"MuiGrid"}),{breakpoints:r}=At(),a=Nr(i),{className:o,columns:s,columnSpacing:l,component:c="div",container:u=!1,direction:f="row",item:g=!1,rowSpacing:x,spacing:w=0,wrap:h="wrap",zeroMinWidth:S=!1}=a,_=Wr(a,an),p=x||w,O=l||w,P=D.useContext(yt),j=u?s||12:P,C={},I=pe({},_);r.keys.forEach(v=>{_[v]!=null&&(C[v]=_[v],delete I[v])});const H=pe({},a,{columns:j,container:u,direction:f,item:g,rowSpacing:p,columnSpacing:O,wrap:h,zeroMinWidth:S,spacing:w},C,{breakpoints:r.keys}),y=hn(H);return b.jsx(yt.Provider,{value:j,children:b.jsx(dn,pe({ownerState:H,className:Ar(y.root,o),as:c,ref:n},I))})});var mn=b.Fragment;function A(t,e,n){return Br.call(e,"css")?b.jsx(Fr,Yr(t,e),n):b.jsx(t,e,n)}var vn=Object.defineProperty,gn=(t,e,n)=>e in t?vn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,be=(t,e,n)=>gn(t,typeof e!="symbol"?e+"":e,n),Je=new Map,Se=new WeakMap,bt=0,yn=void 0;function bn(t){return t?(Se.has(t)||(bt+=1,Se.set(t,bt.toString())),Se.get(t)):"0"}function Sn(t){return Object.keys(t).sort().filter(e=>t[e]!==void 0).map(e=>`${e}_${e==="root"?bn(t.root):t[e]}`).toString()}function wn(t){const e=Sn(t);let n=Je.get(e);if(!n){const i=new Map;let r;const a=new IntersectionObserver(o=>{o.forEach(s=>{var l;const c=s.isIntersecting&&r.some(u=>s.intersectionRatio>=u);t.trackVisibility&&typeof s.isVisible>"u"&&(s.isVisible=c),(l=i.get(s.target))==null||l.forEach(u=>{u(c,s)})})},t);r=a.thresholds||(Array.isArray(t.threshold)?t.threshold:[t.threshold||0]),n={id:e,observer:a,elements:i},Je.set(e,n)}return n}function Bt(t,e,n={},i=yn){if(typeof window.IntersectionObserver>"u"&&i!==void 0){const l=t.getBoundingClientRect();return e(i,{isIntersecting:i,target:t,intersectionRatio:typeof n.threshold=="number"?n.threshold:0,time:0,boundingClientRect:l,intersectionRect:l,rootBounds:l}),()=>{}}const{id:r,observer:a,elements:o}=wn(n),s=o.get(t)||[];return o.has(t)||o.set(t,s),s.push(e),a.observe(t),function(){s.splice(s.indexOf(e),1),s.length===0&&(o.delete(t),a.unobserve(t)),o.size===0&&(a.disconnect(),Je.delete(r))}}function On(t){return typeof t.children!="function"}var St=class extends D.Component{constructor(t){super(t),be(this,"node",null),be(this,"_unobserveCb",null),be(this,"handleNode",e=>{this.node&&(this.unobserve(),!e&&!this.props.triggerOnce&&!this.props.skip&&this.setState({inView:!!this.props.initialInView,entry:void 0})),this.node=e||null,this.observeNode()}),be(this,"handleChange",(e,n)=>{e&&this.props.triggerOnce&&this.unobserve(),On(this.props)||this.setState({inView:e,entry:n}),this.props.onChange&&this.props.onChange(e,n)}),this.state={inView:!!t.initialInView,entry:void 0}}componentDidMount(){this.unobserve(),this.observeNode()}componentDidUpdate(t){(t.rootMargin!==this.props.rootMargin||t.root!==this.props.root||t.threshold!==this.props.threshold||t.skip!==this.props.skip||t.trackVisibility!==this.props.trackVisibility||t.delay!==this.props.delay)&&(this.unobserve(),this.observeNode())}componentWillUnmount(){this.unobserve()}observeNode(){if(!this.node||this.props.skip)return;const{threshold:t,root:e,rootMargin:n,trackVisibility:i,delay:r,fallbackInView:a}=this.props;this._unobserveCb=Bt(this.node,this.handleChange,{threshold:t,root:e,rootMargin:n,trackVisibility:i,delay:r},a)}unobserve(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)}render(){const{children:t}=this.props;if(typeof t=="function"){const{inView:x,entry:w}=this.state;return t({inView:x,entry:w,ref:this.handleNode})}const{as:e,triggerOnce:n,threshold:i,root:r,rootMargin:a,onChange:o,skip:s,trackVisibility:l,delay:c,initialInView:u,fallbackInView:f,...g}=this.props;return D.createElement(e||"div",{ref:this.handleNode,...g},t)}};function Ft({threshold:t,delay:e,trackVisibility:n,rootMargin:i,root:r,triggerOnce:a,skip:o,initialInView:s,fallbackInView:l,onChange:c}={}){var u;const[f,g]=D.useState(null),x=D.useRef(),[w,h]=D.useState({inView:!!s,entry:void 0});x.current=c,D.useEffect(()=>{if(o||!f)return;let O;return O=Bt(f,(P,j)=>{h({inView:P,entry:j}),x.current&&x.current(P,j),j.isIntersecting&&a&&O&&(O(),O=void 0)},{root:r,rootMargin:i,threshold:t,trackVisibility:n,delay:e},l),()=>{O&&O()}},[Array.isArray(t)?t.toString():t,f,r,i,a,o,n,l,e]);const S=(u=w.entry)==null?void 0:u.target,_=D.useRef();!f&&S&&!a&&!o&&_.current!==S&&(_.current=S,h({inView:!!s,entry:void 0}));const p=[g,w.inView,w.entry];return p.ref=p[0],p.inView=p[1],p.entry=p[2],p}d`
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
`;d`
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
`;d`
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
`;d`
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }
`;d`
  from,
  11.1%,
  to {
    transform: translate3d(0, 0, 0);
  }

  22.2% {
    transform: skewX(-12.5deg) skewY(-12.5deg);
  }

  33.3% {
    transform: skewX(6.25deg) skewY(6.25deg);
  }

  44.4% {
    transform: skewX(-3.125deg) skewY(-3.125deg);
  }

  55.5% {
    transform: skewX(1.5625deg) skewY(1.5625deg);
  }

  66.6% {
    transform: skewX(-0.78125deg) skewY(-0.78125deg);
  }

  77.7% {
    transform: skewX(0.390625deg) skewY(0.390625deg);
  }

  88.8% {
    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
  }
`;d`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;d`
  from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;d`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
  }
`;d`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
  }
`;d`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(0, -10px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(0, 10px, 0);
  }
`;d`
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }
`;d`
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;d`
  from {
    transform: translate3d(0, 0, 0);
  }

  15% {
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }

  30% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  45% {
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }

  75% {
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;const xn=d`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`,_n=d`
  from {
    opacity: 0;
    transform: translate3d(-100%, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,kn=d`
  from {
    opacity: 0;
    transform: translate3d(100%, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Pn=d`
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Tn=d`
  from {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,dt=d`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,jn=d`
  from {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Cn=d`
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,En=d`
  from {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Mn=d`
  from {
    opacity: 0;
    transform: translate3d(-100%, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Ln=d`
  from {
    opacity: 0;
    transform: translate3d(100%, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Rn=d`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,zn=d`
  from {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;function Dn({duration:t=1e3,delay:e=0,timingFunction:n="ease",keyframes:i=dt,iterationCount:r=1}){return Xr`
    animation-duration: ${t}ms;
    animation-timing-function: ${n};
    animation-delay: ${e}ms;
    animation-name: ${i};
    animation-direction: normal;
    animation-fill-mode: both;
    animation-iteration-count: ${r};

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `}function In(t){return t==null}function $n(t){return typeof t=="string"||typeof t=="number"||typeof t=="boolean"}function Yt(t,e){return n=>n?t():e()}function me(t){return Yt(t,()=>null)}function et(t){return me(()=>({opacity:0}))(t)}const qt=t=>{const{cascade:e=!1,damping:n=.5,delay:i=0,duration:r=1e3,fraction:a=0,keyframes:o=dt,triggerOnce:s=!1,className:l,style:c,childClassName:u,childStyle:f,children:g,onVisibilityChange:x}=t,w=D.useMemo(()=>Dn({keyframes:o,duration:r}),[r,o]);return In(g)?null:$n(g)?A(Wn,{...t,animationStyles:w,children:String(g)}):qr.isFragment(g)?A(Xt,{...t,animationStyles:w}):A(mn,{children:D.Children.map(g,(h,S)=>{if(!D.isValidElement(h))return null;const _=i+(e?S*r*n:0);switch(h.type){case"ol":case"ul":return A(He,{children:({cx:p})=>A(h.type,{...h.props,className:p(l,h.props.className),style:Object.assign({},c,h.props.style),children:A(qt,{...t,children:h.props.children})})});case"li":return A(St,{threshold:a,triggerOnce:s,onChange:x,children:({inView:p,ref:O})=>A(He,{children:({cx:P})=>A(h.type,{...h.props,ref:O,className:P(u,h.props.className),css:me(()=>w)(p),style:Object.assign({},f,h.props.style,et(!p),{animationDelay:_+"ms"})})})});default:return A(St,{threshold:a,triggerOnce:s,onChange:x,children:({inView:p,ref:O})=>A("div",{ref:O,className:l,css:me(()=>w)(p),style:Object.assign({},c,et(!p),{animationDelay:_+"ms"}),children:A(He,{children:({cx:P})=>A(h.type,{...h.props,className:P(u,h.props.className),style:Object.assign({},f,h.props.style)})})})})}})})},Nn={display:"inline-block",whiteSpace:"pre"},Wn=t=>{const{animationStyles:e,cascade:n=!1,damping:i=.5,delay:r=0,duration:a=1e3,fraction:o=0,triggerOnce:s=!1,className:l,style:c,children:u,onVisibilityChange:f}=t,{ref:g,inView:x}=Ft({triggerOnce:s,threshold:o,onChange:f});return Yt(()=>A("div",{ref:g,className:l,style:Object.assign({},c,Nn),children:u.split("").map((w,h)=>A("span",{css:me(()=>e)(x),style:{animationDelay:r+h*a*i+"ms"},children:w},h))}),()=>A(Xt,{...t,children:u}))(n)},Xt=t=>{const{animationStyles:e,fraction:n=0,triggerOnce:i=!1,className:r,style:a,children:o,onVisibilityChange:s}=t,{ref:l,inView:c}=Ft({triggerOnce:i,threshold:n,onChange:s});return A("div",{ref:l,className:r,css:me(()=>e)(c),style:Object.assign({},a,et(!c)),children:o})};d`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;d`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0) scaleX(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0) scaleX(1);
  }

  75% {
    transform: translate3d(-10px, 0, 0) scaleX(0.98);
  }

  90% {
    transform: translate3d(5px, 0, 0) scaleX(0.995);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0) scaleX(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0) scaleX(1);
  }

  75% {
    transform: translate3d(10px, 0, 0) scaleX(0.98);
  }

  90% {
    transform: translate3d(-5px, 0, 0) scaleX(0.995);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0) scaleY(5);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, 10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
`;d`
  20% {
    transform: translate3d(0, 10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0) scaleY(3);
  }
`;d`
  20% {
    opacity: 1;
    transform: translate3d(20px, 0, 0) scaleX(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0) scaleX(2);
  }
`;d`
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0) scaleX(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0) scaleX(2);
  }
`;d`
  20% {
    transform: translate3d(0, -10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, 20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0) scaleY(3);
  }
`;const An=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`,Hn=d`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, 100%, 0);
  }
`,Bn=d`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 100%, 0);
  }
`,Fn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
`,Yn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
`,qn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
`,Xn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }
`,Vn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
`,Gn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
`,Un=d`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, -100%, 0);
  }
`,Kn=d`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(100%, -100%, 0);
  }
`,Qn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
`,Zn=d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
`;function Jn(t,e,n){switch(n){case"bottom-left":return e?Hn:_n;case"bottom-right":return e?Bn:kn;case"down":return t?e?Yn:Tn:e?Fn:Pn;case"left":return t?e?Xn:jn:e?qn:dt;case"right":return t?e?Gn:En:e?Vn:Cn;case"top-left":return e?Un:Mn;case"top-right":return e?Kn:Ln;case"up":return t?e?Zn:zn:e?Qn:Rn;default:return e?An:xn}}const de=t=>{const{big:e=!1,direction:n,reverse:i=!1,...r}=t,a=D.useMemo(()=>Jn(e,i,n),[e,n,i]);return A(qt,{keyframes:a,...r})};d`
  from {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);
    animation-timing-function: ease-out;
  }

  40% {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg);
    animation-timing-function: ease-out;
  }

  50% {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg);
    animation-timing-function: ease-in;
  }

  80% {
    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg);
    animation-timing-function: ease-in;
  }

  to {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);
    animation-timing-function: ease-in;
  }
`;d`
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
`;d`
  from {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
`;d`
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
`;d`
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
`;d`
  0% {
    animation-timing-function: ease-in-out;
  }

  20%,
  60% {
    transform: rotate3d(0, 0, 1, 80deg);
    animation-timing-function: ease-in-out;
  }

  40%,
  80% {
    transform: rotate3d(0, 0, 1, 60deg);
    animation-timing-function: ease-in-out;
    opacity: 1;
  }

  to {
    transform: translate3d(0, 700px, 0);
    opacity: 0;
  }
`;d`
  from {
    opacity: 0;
    transform: scale(0.1) rotate(30deg);
    transform-origin: center bottom;
  }

  50% {
    transform: rotate(-10deg);
  }

  70% {
    transform: rotate(3deg);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;d`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;d`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
  }
`;d`
  from {
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;d`
  from {
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;d`
  from {
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;d`
  from {
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;d`
  from {
    transform: rotate3d(0, 0, 1, -90deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;d`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, 200deg);
    opacity: 0;
  }
`;d`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }
`;d`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }
`;d`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }
`;d`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, 90deg);
    opacity: 0;
  }
`;d`
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;d`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
`;d`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
  }
`;d`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
`;d`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
  }
`;d`
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
`;d`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;d`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;d`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;d`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;d`
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
`;d`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;d`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);
  }

  to {
    opacity: 0;
    transform: scale(0.1) translate3d(-2000px, 0, 0);
  }
`;d`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);
  }

  to {
    opacity: 0;
    transform: scale(0.1) translate3d(2000px, 0, 0);
  }
`;d`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;var Vt={},Gt={},De={},Ut={};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={animating:!1,autoplaying:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,dragging:!1,edgeDragged:!1,initialized:!1,lazyLoadedList:[],listHeight:null,listWidth:null,scrolling:!1,slideCount:null,slideHeight:null,slideWidth:null,swipeLeft:null,swiped:!1,swiping:!1,touchObject:{startX:0,startY:0,curX:0,curY:0},trackStyle:{},trackWidth:0,targetSlide:0};t.default=e})(Ut);var ei="Expected a function",wt=NaN,ti="[object Symbol]",ri=/^\s+|\s+$/g,ni=/^[-+]0x[0-9a-f]+$/i,ii=/^0b[01]+$/i,oi=/^0o[0-7]+$/i,ai=parseInt,si=typeof ye=="object"&&ye&&ye.Object===Object&&ye,li=typeof self=="object"&&self&&self.Object===Object&&self,ci=si||li||Function("return this")(),ui=Object.prototype,fi=ui.toString,di=Math.max,pi=Math.min,Fe=function(){return ci.Date.now()};function hi(t,e,n){var i,r,a,o,s,l,c=0,u=!1,f=!1,g=!0;if(typeof t!="function")throw new TypeError(ei);e=Ot(e)||0,tt(n)&&(u=!!n.leading,f="maxWait"in n,a=f?di(Ot(n.maxWait)||0,e):a,g="trailing"in n?!!n.trailing:g);function x(C){var I=i,H=r;return i=r=void 0,c=C,o=t.apply(H,I),o}function w(C){return c=C,s=setTimeout(_,e),u?x(C):o}function h(C){var I=C-l,H=C-c,y=e-I;return f?pi(y,a-H):y}function S(C){var I=C-l,H=C-c;return l===void 0||I>=e||I<0||f&&H>=a}function _(){var C=Fe();if(S(C))return p(C);s=setTimeout(_,h(C))}function p(C){return s=void 0,g&&i?x(C):(i=r=void 0,o)}function O(){s!==void 0&&clearTimeout(s),c=0,i=l=r=s=void 0}function P(){return s===void 0?o:p(Fe())}function j(){var C=Fe(),I=S(C);if(i=arguments,r=this,l=C,I){if(s===void 0)return w(l);if(f)return s=setTimeout(_,e),x(l)}return s===void 0&&(s=setTimeout(_,e)),o}return j.cancel=O,j.flush=P,j}function tt(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function mi(t){return!!t&&typeof t=="object"}function vi(t){return typeof t=="symbol"||mi(t)&&fi.call(t)==ti}function Ot(t){if(typeof t=="number")return t;if(vi(t))return wt;if(tt(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=tt(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=t.replace(ri,"");var n=ii.test(t);return n||oi.test(t)?ai(t.slice(2),n?2:8):ni.test(t)?wt:+t}var gi=hi,Kt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(t){(function(){var e={}.hasOwnProperty;function n(){for(var a="",o=0;o<arguments.length;o++){var s=arguments[o];s&&(a=r(a,i(s)))}return a}function i(a){if(typeof a=="string"||typeof a=="number")return a;if(typeof a!="object")return"";if(Array.isArray(a))return n.apply(null,a);if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]"))return a.toString();var o="";for(var s in a)e.call(a,s)&&a[s]&&(o=r(o,s));return o}function r(a,o){return o?a?a+" "+o:a+o:a}t.exports?(n.default=n,t.exports=n):window.classNames=n})()})(Kt);var Ie=Kt.exports,m={},pt={};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=n(D);function n(r){return r&&r.__esModule?r:{default:r}}var i={accessibility:!0,adaptiveHeight:!1,afterChange:null,appendDots:function(a){return e.default.createElement("ul",{style:{display:"block"}},a)},arrows:!0,autoplay:!1,autoplaySpeed:3e3,beforeChange:null,centerMode:!1,centerPadding:"50px",className:"",cssEase:"ease",customPaging:function(a){return e.default.createElement("button",null,a+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:null,nextArrow:null,onEdge:null,onInit:null,onLazyLoadError:null,onReInit:null,pauseOnDotsHover:!1,pauseOnFocus:!1,pauseOnHover:!0,prevArrow:null,responsive:null,rows:1,rtl:!1,slide:"div",slidesPerRow:1,slidesToScroll:1,slidesToShow:1,speed:500,swipe:!0,swipeEvent:null,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,waitForAnimate:!0,asNavFor:null};t.default=i})(pt);Object.defineProperty(m,"__esModule",{value:!0});m.checkSpecKeys=m.checkNavigable=m.changeSlide=m.canUseDOM=m.canGoNext=void 0;m.clamp=Zt;m.extractObject=void 0;m.filterSettings=Li;m.validSettings=m.swipeStart=m.swipeMove=m.swipeEnd=m.slidesOnRight=m.slidesOnLeft=m.slideHandler=m.siblingDirection=m.safePreventDefault=m.lazyStartIndex=m.lazySlidesOnRight=m.lazySlidesOnLeft=m.lazyEndIndex=m.keyHandler=m.initializedState=m.getWidth=m.getTrackLeft=m.getTrackCSS=m.getTrackAnimateCSS=m.getTotalSlides=m.getSwipeDirection=m.getSlideCount=m.getRequiredLazySlides=m.getPreClones=m.getPostClones=m.getOnDemandLazySlides=m.getNavigableIndexes=m.getHeight=void 0;var yi=Qt(D),bi=Qt(pt);function Qt(t){return t&&t.__esModule?t:{default:t}}function ve(t){"@babel/helpers - typeof";return ve=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ve(t)}function xt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function $(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?xt(Object(n),!0).forEach(function(i){Si(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):xt(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function Si(t,e,n){return e=wi(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function wi(t){var e=Oi(t,"string");return ve(e)=="symbol"?e:String(e)}function Oi(t,e){if(ve(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(ve(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Zt(t,e,n){return Math.max(e,Math.min(t,n))}var ne=m.safePreventDefault=function(e){var n=["onTouchStart","onTouchMove","onWheel"];n.includes(e._reactName)||e.preventDefault()},Jt=m.getOnDemandLazySlides=function(e){for(var n=[],i=er(e),r=tr(e),a=i;a<r;a++)e.lazyLoadedList.indexOf(a)<0&&n.push(a);return n};m.getRequiredLazySlides=function(e){for(var n=[],i=er(e),r=tr(e),a=i;a<r;a++)n.push(a);return n};var er=m.lazyStartIndex=function(e){return e.currentSlide-xi(e)},tr=m.lazyEndIndex=function(e){return e.currentSlide+_i(e)},xi=m.lazySlidesOnLeft=function(e){return e.centerMode?Math.floor(e.slidesToShow/2)+(parseInt(e.centerPadding)>0?1:0):0},_i=m.lazySlidesOnRight=function(e){return e.centerMode?Math.floor((e.slidesToShow-1)/2)+1+(parseInt(e.centerPadding)>0?1:0):e.slidesToShow},rt=m.getWidth=function(e){return e&&e.offsetWidth||0},rr=m.getHeight=function(e){return e&&e.offsetHeight||0},nr=m.getSwipeDirection=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i,r,a,o;return i=e.startX-e.curX,r=e.startY-e.curY,a=Math.atan2(r,i),o=Math.round(a*180/Math.PI),o<0&&(o=360-Math.abs(o)),o<=45&&o>=0||o<=360&&o>=315?"left":o>=135&&o<=225?"right":n===!0?o>=35&&o<=135?"up":"down":"vertical"},ir=m.canGoNext=function(e){var n=!0;return e.infinite||(e.centerMode&&e.currentSlide>=e.slideCount-1||e.slideCount<=e.slidesToShow||e.currentSlide>=e.slideCount-e.slidesToShow)&&(n=!1),n};m.extractObject=function(e,n){var i={};return n.forEach(function(r){return i[r]=e[r]}),i};m.initializedState=function(e){var n=yi.default.Children.count(e.children),i=e.listRef,r=Math.ceil(rt(i)),a=e.trackRef&&e.trackRef.node,o=Math.ceil(rt(a)),s;if(e.vertical)s=r;else{var l=e.centerMode&&parseInt(e.centerPadding)*2;typeof e.centerPadding=="string"&&e.centerPadding.slice(-1)==="%"&&(l*=r/100),s=Math.ceil((r-l)/e.slidesToShow)}var c=i&&rr(i.querySelector('[data-index="0"]')),u=c*e.slidesToShow,f=e.currentSlide===void 0?e.initialSlide:e.currentSlide;e.rtl&&e.currentSlide===void 0&&(f=n-1-e.initialSlide);var g=e.lazyLoadedList||[],x=Jt($($({},e),{},{currentSlide:f,lazyLoadedList:g}));g=g.concat(x);var w={slideCount:n,slideWidth:s,listWidth:r,trackWidth:o,currentSlide:f,slideHeight:c,listHeight:u,lazyLoadedList:g};return e.autoplaying===null&&e.autoplay&&(w.autoplaying="playing"),w};m.slideHandler=function(e){var n=e.waitForAnimate,i=e.animating,r=e.fade,a=e.infinite,o=e.index,s=e.slideCount,l=e.lazyLoad,c=e.currentSlide,u=e.centerMode,f=e.slidesToScroll,g=e.slidesToShow,x=e.useCSS,w=e.lazyLoadedList;if(n&&i)return{};var h=o,S,_,p,O={},P={},j=a?o:Zt(o,0,s-1);if(r){if(!a&&(o<0||o>=s))return{};o<0?h=o+s:o>=s&&(h=o-s),l&&w.indexOf(h)<0&&(w=w.concat(h)),O={animating:!0,currentSlide:h,lazyLoadedList:w,targetSlide:h},P={animating:!1,targetSlide:h}}else S=h,h<0?(S=h+s,a?s%f!==0&&(S=s-s%f):S=0):!ir(e)&&h>c?h=S=c:u&&h>=s?(h=a?s:s-1,S=a?0:s-1):h>=s&&(S=h-s,a?s%f!==0&&(S=0):S=s-g),!a&&h+g>=s&&(S=s-g),_=_e($($({},e),{},{slideIndex:h})),p=_e($($({},e),{},{slideIndex:S})),a||(_===p&&(h=S),_=p),l&&(w=w.concat(Jt($($({},e),{},{currentSlide:h})))),x?(O={animating:!0,currentSlide:S,trackStyle:or($($({},e),{},{left:_})),lazyLoadedList:w,targetSlide:j},P={animating:!1,currentSlide:S,trackStyle:xe($($({},e),{},{left:p})),swipeLeft:null,targetSlide:j}):O={currentSlide:S,trackStyle:xe($($({},e),{},{left:p})),lazyLoadedList:w,targetSlide:j};return{state:O,nextState:P}};m.changeSlide=function(e,n){var i,r,a,o,s,l=e.slidesToScroll,c=e.slidesToShow,u=e.slideCount,f=e.currentSlide,g=e.targetSlide,x=e.lazyLoad,w=e.infinite;if(o=u%l!==0,i=o?0:(u-f)%l,n.message==="previous")a=i===0?l:c-i,s=f-a,x&&!w&&(r=f-a,s=r===-1?u-1:r),w||(s=g-l);else if(n.message==="next")a=i===0?l:i,s=f+a,x&&!w&&(s=(f+l)%u+i),w||(s=g+l);else if(n.message==="dots")s=n.index*n.slidesToScroll;else if(n.message==="children"){if(s=n.index,w){var h=ji($($({},e),{},{targetSlide:s}));s>n.currentSlide&&h==="left"?s=s-u:s<n.currentSlide&&h==="right"&&(s=s+u)}}else n.message==="index"&&(s=Number(n.index));return s};m.keyHandler=function(e,n,i){return e.target.tagName.match("TEXTAREA|INPUT|SELECT")||!n?"":e.keyCode===37?i?"next":"previous":e.keyCode===39?i?"previous":"next":""};m.swipeStart=function(e,n,i){return e.target.tagName==="IMG"&&ne(e),!n||!i&&e.type.indexOf("mouse")!==-1?"":{dragging:!0,touchObject:{startX:e.touches?e.touches[0].pageX:e.clientX,startY:e.touches?e.touches[0].pageY:e.clientY,curX:e.touches?e.touches[0].pageX:e.clientX,curY:e.touches?e.touches[0].pageY:e.clientY}}};m.swipeMove=function(e,n){var i=n.scrolling,r=n.animating,a=n.vertical,o=n.swipeToSlide,s=n.verticalSwiping,l=n.rtl,c=n.currentSlide,u=n.edgeFriction,f=n.edgeDragged,g=n.onEdge,x=n.swiped,w=n.swiping,h=n.slideCount,S=n.slidesToScroll,_=n.infinite,p=n.touchObject,O=n.swipeEvent,P=n.listHeight,j=n.listWidth;if(!i){if(r)return ne(e);a&&o&&s&&ne(e);var C,I={},H=_e(n);p.curX=e.touches?e.touches[0].pageX:e.clientX,p.curY=e.touches?e.touches[0].pageY:e.clientY,p.swipeLength=Math.round(Math.sqrt(Math.pow(p.curX-p.startX,2)));var y=Math.round(Math.sqrt(Math.pow(p.curY-p.startY,2)));if(!s&&!w&&y>10)return{scrolling:!0};s&&(p.swipeLength=y);var v=(l?-1:1)*(p.curX>p.startX?1:-1);s&&(v=p.curY>p.startY?1:-1);var L=Math.ceil(h/S),T=nr(n.touchObject,s),E=p.swipeLength;return _||(c===0&&(T==="right"||T==="down")||c+1>=L&&(T==="left"||T==="up")||!ir(n)&&(T==="left"||T==="up"))&&(E=p.swipeLength*u,f===!1&&g&&(g(T),I.edgeDragged=!0)),!x&&O&&(O(T),I.swiped=!0),a?C=H+E*(P/j)*v:l?C=H-E*v:C=H+E*v,s&&(C=H+E*v),I=$($({},I),{},{touchObject:p,swipeLeft:C,trackStyle:xe($($({},n),{},{left:C}))}),Math.abs(p.curX-p.startX)<Math.abs(p.curY-p.startY)*.8||p.swipeLength>10&&(I.swiping=!0,ne(e)),I}};m.swipeEnd=function(e,n){var i=n.dragging,r=n.swipe,a=n.touchObject,o=n.listWidth,s=n.touchThreshold,l=n.verticalSwiping,c=n.listHeight,u=n.swipeToSlide,f=n.scrolling,g=n.onSwipe,x=n.targetSlide,w=n.currentSlide,h=n.infinite;if(!i)return r&&ne(e),{};var S=l?c/s:o/s,_=nr(a,l),p={dragging:!1,edgeDragged:!1,scrolling:!1,swiping:!1,swiped:!1,swipeLeft:null,touchObject:{}};if(f||!a.swipeLength)return p;if(a.swipeLength>S){ne(e),g&&g(_);var O,P,j=h?w:x;switch(_){case"left":case"up":P=j+kt(n),O=u?_t(n,P):P,p.currentDirection=0;break;case"right":case"down":P=j-kt(n),O=u?_t(n,P):P,p.currentDirection=1;break;default:O=j}p.triggerSlideHandler=O}else{var C=_e(n);p.trackStyle=or($($({},n),{},{left:C}))}return p};var ki=m.getNavigableIndexes=function(e){for(var n=e.infinite?e.slideCount*2:e.slideCount,i=e.infinite?e.slidesToShow*-1:0,r=e.infinite?e.slidesToShow*-1:0,a=[];i<n;)a.push(i),i=r+e.slidesToScroll,r+=Math.min(e.slidesToScroll,e.slidesToShow);return a},_t=m.checkNavigable=function(e,n){var i=ki(e),r=0;if(n>i[i.length-1])n=i[i.length-1];else for(var a in i){if(n<i[a]){n=r;break}r=i[a]}return n},kt=m.getSlideCount=function(e){var n=e.centerMode?e.slideWidth*Math.floor(e.slidesToShow/2):0;if(e.swipeToSlide){var i,r=e.listRef,a=r.querySelectorAll&&r.querySelectorAll(".slick-slide")||[];if(Array.from(a).every(function(l){if(e.vertical){if(l.offsetTop+rr(l)/2>e.swipeLeft*-1)return i=l,!1}else if(l.offsetLeft-n+rt(l)/2>e.swipeLeft*-1)return i=l,!1;return!0}),!i)return 0;var o=e.rtl===!0?e.slideCount-e.currentSlide:e.currentSlide,s=Math.abs(i.dataset.index-o)||1;return s}else return e.slidesToScroll},ht=m.checkSpecKeys=function(e,n){return n.reduce(function(i,r){return i&&e.hasOwnProperty(r)},!0)?null:console.error("Keys Missing:",e)},xe=m.getTrackCSS=function(e){ht(e,["left","variableWidth","slideCount","slidesToShow","slideWidth"]);var n,i,r=e.slideCount+2*e.slidesToShow;e.vertical?i=r*e.slideHeight:n=Ti(e)*e.slideWidth;var a={opacity:1,transition:"",WebkitTransition:""};if(e.useTransform){var o=e.vertical?"translate3d(0px, "+e.left+"px, 0px)":"translate3d("+e.left+"px, 0px, 0px)",s=e.vertical?"translate3d(0px, "+e.left+"px, 0px)":"translate3d("+e.left+"px, 0px, 0px)",l=e.vertical?"translateY("+e.left+"px)":"translateX("+e.left+"px)";a=$($({},a),{},{WebkitTransform:o,transform:s,msTransform:l})}else e.vertical?a.top=e.left:a.left=e.left;return e.fade&&(a={opacity:1}),n&&(a.width=n),i&&(a.height=i),window&&!window.addEventListener&&window.attachEvent&&(e.vertical?a.marginTop=e.left+"px":a.marginLeft=e.left+"px"),a},or=m.getTrackAnimateCSS=function(e){ht(e,["left","variableWidth","slideCount","slidesToShow","slideWidth","speed","cssEase"]);var n=xe(e);return e.useTransform?(n.WebkitTransition="-webkit-transform "+e.speed+"ms "+e.cssEase,n.transition="transform "+e.speed+"ms "+e.cssEase):e.vertical?n.transition="top "+e.speed+"ms "+e.cssEase:n.transition="left "+e.speed+"ms "+e.cssEase,n},_e=m.getTrackLeft=function(e){if(e.unslick)return 0;ht(e,["slideIndex","trackRef","infinite","centerMode","slideCount","slidesToShow","slidesToScroll","slideWidth","listWidth","variableWidth","slideHeight"]);var n=e.slideIndex,i=e.trackRef,r=e.infinite,a=e.centerMode,o=e.slideCount,s=e.slidesToShow,l=e.slidesToScroll,c=e.slideWidth,u=e.listWidth,f=e.variableWidth,g=e.slideHeight,x=e.fade,w=e.vertical,h=0,S,_,p=0;if(x||e.slideCount===1)return 0;var O=0;if(r?(O=-Oe(e),o%l!==0&&n+l>o&&(O=-(n>o?s-(n-o):o%l)),a&&(O+=parseInt(s/2))):(o%l!==0&&n+l>o&&(O=s-o%l),a&&(O=parseInt(s/2))),h=O*c,p=O*g,w?S=n*g*-1+p:S=n*c*-1+h,f===!0){var P,j=i&&i.node;if(P=n+Oe(e),_=j&&j.childNodes[P],S=_?_.offsetLeft*-1:0,a===!0){P=r?n+Oe(e):n,_=j&&j.children[P],S=0;for(var C=0;C<P;C++)S-=j&&j.children[C]&&j.children[C].offsetWidth;S-=parseInt(e.centerPadding),S+=_&&(u-_.offsetWidth)/2}}return S},Oe=m.getPreClones=function(e){return e.unslick||!e.infinite?0:e.variableWidth?e.slideCount:e.slidesToShow+(e.centerMode?1:0)},Pi=m.getPostClones=function(e){return e.unslick||!e.infinite?0:e.slideCount},Ti=m.getTotalSlides=function(e){return e.slideCount===1?1:Oe(e)+e.slideCount+Pi(e)},ji=m.siblingDirection=function(e){return e.targetSlide>e.currentSlide?e.targetSlide>e.currentSlide+Ci(e)?"left":"right":e.targetSlide<e.currentSlide-Ei(e)?"right":"left"},Ci=m.slidesOnRight=function(e){var n=e.slidesToShow,i=e.centerMode,r=e.rtl,a=e.centerPadding;if(i){var o=(n-1)/2+1;return parseInt(a)>0&&(o+=1),r&&n%2===0&&(o+=1),o}return r?0:n-1},Ei=m.slidesOnLeft=function(e){var n=e.slidesToShow,i=e.centerMode,r=e.rtl,a=e.centerPadding;if(i){var o=(n-1)/2+1;return parseInt(a)>0&&(o+=1),!r&&n%2===0&&(o+=1),o}return r?n-1:0};m.canUseDOM=function(){return!!(typeof window<"u"&&window.document&&window.document.createElement)};var Mi=m.validSettings=Object.keys(bi.default);function Li(t){return Mi.reduce(function(e,n){return t.hasOwnProperty(n)&&(e[n]=t[n]),e},{})}var $e={};Object.defineProperty($e,"__esModule",{value:!0});$e.Track=void 0;var G=ar(D),Ye=ar(Ie),qe=m;function ar(t){return t&&t.__esModule?t:{default:t}}function oe(t){"@babel/helpers - typeof";return oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},oe(t)}function nt(){return nt=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},nt.apply(this,arguments)}function Ri(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function zi(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,lr(i.key),i)}}function Di(t,e,n){return e&&zi(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function Ii(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&it(t,e)}function it(t,e){return it=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},it(t,e)}function $i(t){var e=sr();return function(){var i=ke(t),r;if(e){var a=ke(this).constructor;r=Reflect.construct(i,arguments,a)}else r=i.apply(this,arguments);return Ni(this,r)}}function Ni(t,e){if(e&&(oe(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ot(t)}function ot(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function sr(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(sr=function(){return!!t})()}function ke(t){return ke=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},ke(t)}function Pt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function Y(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Pt(Object(n),!0).forEach(function(i){at(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Pt(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function at(t,e,n){return e=lr(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function lr(t){var e=Wi(t,"string");return oe(e)=="symbol"?e:String(e)}function Wi(t,e){if(oe(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(oe(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var Xe=function(e){var n,i,r,a,o;e.rtl?o=e.slideCount-1-e.index:o=e.index,r=o<0||o>=e.slideCount,e.centerMode?(a=Math.floor(e.slidesToShow/2),i=(o-e.currentSlide)%e.slideCount===0,o>e.currentSlide-a-1&&o<=e.currentSlide+a&&(n=!0)):n=e.currentSlide<=o&&o<e.currentSlide+e.slidesToShow;var s;e.targetSlide<0?s=e.targetSlide+e.slideCount:e.targetSlide>=e.slideCount?s=e.targetSlide-e.slideCount:s=e.targetSlide;var l=o===s;return{"slick-slide":!0,"slick-active":n,"slick-center":i,"slick-cloned":r,"slick-current":l}},Ai=function(e){var n={};return(e.variableWidth===void 0||e.variableWidth===!1)&&(n.width=e.slideWidth),e.fade&&(n.position="relative",e.vertical?n.top=-e.index*parseInt(e.slideHeight):n.left=-e.index*parseInt(e.slideWidth),n.opacity=e.currentSlide===e.index?1:0,n.zIndex=e.currentSlide===e.index?999:998,e.useCSS&&(n.transition="opacity "+e.speed+"ms "+e.cssEase+", visibility "+e.speed+"ms "+e.cssEase)),n},Ve=function(e,n){return e.key||n},Hi=function(e){var n,i=[],r=[],a=[],o=G.default.Children.count(e.children),s=(0,qe.lazyStartIndex)(e),l=(0,qe.lazyEndIndex)(e);return G.default.Children.forEach(e.children,function(c,u){var f,g={message:"children",index:u,slidesToScroll:e.slidesToScroll,currentSlide:e.currentSlide};!e.lazyLoad||e.lazyLoad&&e.lazyLoadedList.indexOf(u)>=0?f=c:f=G.default.createElement("div",null);var x=Ai(Y(Y({},e),{},{index:u})),w=f.props.className||"",h=Xe(Y(Y({},e),{},{index:u}));if(i.push(G.default.cloneElement(f,{key:"original"+Ve(f,u),"data-index":u,className:(0,Ye.default)(h,w),tabIndex:"-1","aria-hidden":!h["slick-active"],style:Y(Y({outline:"none"},f.props.style||{}),x),onClick:function(p){f.props&&f.props.onClick&&f.props.onClick(p),e.focusOnSelect&&e.focusOnSelect(g)}})),e.infinite&&e.fade===!1){var S=o-u;S<=(0,qe.getPreClones)(e)&&(n=-S,n>=s&&(f=c),h=Xe(Y(Y({},e),{},{index:n})),r.push(G.default.cloneElement(f,{key:"precloned"+Ve(f,n),"data-index":n,tabIndex:"-1",className:(0,Ye.default)(h,w),"aria-hidden":!h["slick-active"],style:Y(Y({},f.props.style||{}),x),onClick:function(p){f.props&&f.props.onClick&&f.props.onClick(p),e.focusOnSelect&&e.focusOnSelect(g)}}))),n=o+u,n<l&&(f=c),h=Xe(Y(Y({},e),{},{index:n})),a.push(G.default.cloneElement(f,{key:"postcloned"+Ve(f,n),"data-index":n,tabIndex:"-1",className:(0,Ye.default)(h,w),"aria-hidden":!h["slick-active"],style:Y(Y({},f.props.style||{}),x),onClick:function(p){f.props&&f.props.onClick&&f.props.onClick(p),e.focusOnSelect&&e.focusOnSelect(g)}}))}}),e.rtl?r.concat(i,a).reverse():r.concat(i,a)};$e.Track=function(t){Ii(n,t);var e=$i(n);function n(){var i;Ri(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return i=e.call.apply(e,[this].concat(a)),at(ot(i),"node",null),at(ot(i),"handleRef",function(s){i.node=s}),i}return Di(n,[{key:"render",value:function(){var r=Hi(this.props),a=this.props,o=a.onMouseEnter,s=a.onMouseOver,l=a.onMouseLeave,c={onMouseEnter:o,onMouseOver:s,onMouseLeave:l};return G.default.createElement("div",nt({ref:this.handleRef,className:"slick-track",style:this.props.trackStyle},c),r)}}]),n}(G.default.PureComponent);var Ne={};function ae(t){"@babel/helpers - typeof";return ae=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ae(t)}Object.defineProperty(Ne,"__esModule",{value:!0});Ne.Dots=void 0;var we=cr(D),Bi=cr(Ie),Tt=m;function cr(t){return t&&t.__esModule?t:{default:t}}function jt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function Fi(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?jt(Object(n),!0).forEach(function(i){Yi(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):jt(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function Yi(t,e,n){return e=ur(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function qi(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Xi(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,ur(i.key),i)}}function Vi(t,e,n){return e&&Xi(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function ur(t){var e=Gi(t,"string");return ae(e)=="symbol"?e:String(e)}function Gi(t,e){if(ae(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(ae(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Ui(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&st(t,e)}function st(t,e){return st=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},st(t,e)}function Ki(t){var e=fr();return function(){var i=Pe(t),r;if(e){var a=Pe(this).constructor;r=Reflect.construct(i,arguments,a)}else r=i.apply(this,arguments);return Qi(this,r)}}function Qi(t,e){if(e&&(ae(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Zi(t)}function Zi(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function fr(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(fr=function(){return!!t})()}function Pe(t){return Pe=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},Pe(t)}var Ji=function(e){var n;return e.infinite?n=Math.ceil(e.slideCount/e.slidesToScroll):n=Math.ceil((e.slideCount-e.slidesToShow)/e.slidesToScroll)+1,n};Ne.Dots=function(t){Ui(n,t);var e=Ki(n);function n(){return qi(this,n),e.apply(this,arguments)}return Vi(n,[{key:"clickHandler",value:function(r,a){a.preventDefault(),this.props.clickHandler(r)}},{key:"render",value:function(){for(var r=this.props,a=r.onMouseEnter,o=r.onMouseOver,s=r.onMouseLeave,l=r.infinite,c=r.slidesToScroll,u=r.slidesToShow,f=r.slideCount,g=r.currentSlide,x=Ji({slideCount:f,slidesToScroll:c,slidesToShow:u,infinite:l}),w={onMouseEnter:a,onMouseOver:o,onMouseLeave:s},h=[],S=0;S<x;S++){var _=(S+1)*c-1,p=l?_:(0,Tt.clamp)(_,0,f-1),O=p-(c-1),P=l?O:(0,Tt.clamp)(O,0,f-1),j=(0,Bi.default)({"slick-active":l?g>=P&&g<=p:g===P}),C={message:"dots",index:S,slidesToScroll:c,currentSlide:g},I=this.clickHandler.bind(this,C);h=h.concat(we.default.createElement("li",{key:S,className:j},we.default.cloneElement(this.props.customPaging(S),{onClick:I})))}return we.default.cloneElement(this.props.appendDots(h),Fi({className:this.props.dotsClass},w))}}]),n}(we.default.PureComponent);var se={};function le(t){"@babel/helpers - typeof";return le=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},le(t)}Object.defineProperty(se,"__esModule",{value:!0});se.PrevArrow=se.NextArrow=void 0;var ie=pr(D),dr=pr(Ie),eo=m;function pr(t){return t&&t.__esModule?t:{default:t}}function Te(){return Te=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Te.apply(this,arguments)}function Ct(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function je(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Ct(Object(n),!0).forEach(function(i){to(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ct(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function to(t,e,n){return e=vr(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function hr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ro(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,vr(i.key),i)}}function mr(t,e,n){return e&&ro(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function vr(t){var e=no(t,"string");return le(e)=="symbol"?e:String(e)}function no(t,e){if(le(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(le(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function gr(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&lt(t,e)}function lt(t,e){return lt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},lt(t,e)}function yr(t){var e=br();return function(){var i=Ce(t),r;if(e){var a=Ce(this).constructor;r=Reflect.construct(i,arguments,a)}else r=i.apply(this,arguments);return io(this,r)}}function io(t,e){if(e&&(le(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return oo(t)}function oo(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function br(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(br=function(){return!!t})()}function Ce(t){return Ce=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},Ce(t)}se.PrevArrow=function(t){gr(n,t);var e=yr(n);function n(){return hr(this,n),e.apply(this,arguments)}return mr(n,[{key:"clickHandler",value:function(r,a){a&&a.preventDefault(),this.props.clickHandler(r,a)}},{key:"render",value:function(){var r={"slick-arrow":!0,"slick-prev":!0},a=this.clickHandler.bind(this,{message:"previous"});!this.props.infinite&&(this.props.currentSlide===0||this.props.slideCount<=this.props.slidesToShow)&&(r["slick-disabled"]=!0,a=null);var o={key:"0","data-role":"none",className:(0,dr.default)(r),style:{display:"block"},onClick:a},s={currentSlide:this.props.currentSlide,slideCount:this.props.slideCount},l;return this.props.prevArrow?l=ie.default.cloneElement(this.props.prevArrow,je(je({},o),s)):l=ie.default.createElement("button",Te({key:"0",type:"button"},o)," ","Previous"),l}}]),n}(ie.default.PureComponent);se.NextArrow=function(t){gr(n,t);var e=yr(n);function n(){return hr(this,n),e.apply(this,arguments)}return mr(n,[{key:"clickHandler",value:function(r,a){a&&a.preventDefault(),this.props.clickHandler(r,a)}},{key:"render",value:function(){var r={"slick-arrow":!0,"slick-next":!0},a=this.clickHandler.bind(this,{message:"next"});(0,eo.canGoNext)(this.props)||(r["slick-disabled"]=!0,a=null);var o={key:"1","data-role":"none",className:(0,dr.default)(r),style:{display:"block"},onClick:a},s={currentSlide:this.props.currentSlide,slideCount:this.props.slideCount},l;return this.props.nextArrow?l=ie.default.cloneElement(this.props.nextArrow,je(je({},o),s)):l=ie.default.createElement("button",Te({key:"1",type:"button"},o)," ","Next"),l}}]),n}(ie.default.PureComponent);var Sr=function(){if(typeof Map<"u")return Map;function t(e,n){var i=-1;return e.some(function(r,a){return r[0]===n?(i=a,!0):!1}),i}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(n){var i=t(this.__entries__,n),r=this.__entries__[i];return r&&r[1]},e.prototype.set=function(n,i){var r=t(this.__entries__,n);~r?this.__entries__[r][1]=i:this.__entries__.push([n,i])},e.prototype.delete=function(n){var i=this.__entries__,r=t(i,n);~r&&i.splice(r,1)},e.prototype.has=function(n){return!!~t(this.__entries__,n)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(n,i){i===void 0&&(i=null);for(var r=0,a=this.__entries__;r<a.length;r++){var o=a[r];n.call(i,o[1],o[0])}},e}()}(),ct=typeof window<"u"&&typeof document<"u"&&window.document===document,Ee=function(){return typeof global<"u"&&global.Math===Math?global:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()}(),ao=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(Ee):function(t){return setTimeout(function(){return t(Date.now())},1e3/60)}}(),so=2;function lo(t,e){var n=!1,i=!1,r=0;function a(){n&&(n=!1,t()),i&&s()}function o(){ao(a)}function s(){var l=Date.now();if(n){if(l-r<so)return;i=!0}else n=!0,i=!1,setTimeout(o,e);r=l}return s}var co=20,uo=["top","right","bottom","left","width","height","size","weight"],fo=typeof MutationObserver<"u",po=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=lo(this.refresh.bind(this),co)}return t.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},t.prototype.removeObserver=function(e){var n=this.observers_,i=n.indexOf(e);~i&&n.splice(i,1),!n.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){var e=this.updateObservers_();e&&this.refresh()},t.prototype.updateObservers_=function(){var e=this.observers_.filter(function(n){return n.gatherActive(),n.hasActive()});return e.forEach(function(n){return n.broadcastActive()}),e.length>0},t.prototype.connect_=function(){!ct||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),fo?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){!ct||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(e){var n=e.propertyName,i=n===void 0?"":n,r=uo.some(function(a){return!!~i.indexOf(a)});r&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),wr=function(t,e){for(var n=0,i=Object.keys(e);n<i.length;n++){var r=i[n];Object.defineProperty(t,r,{value:e[r],enumerable:!1,writable:!1,configurable:!0})}return t},ce=function(t){var e=t&&t.ownerDocument&&t.ownerDocument.defaultView;return e||Ee},Or=We(0,0,0,0);function Me(t){return parseFloat(t)||0}function Et(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.reduce(function(i,r){var a=t["border-"+r+"-width"];return i+Me(a)},0)}function ho(t){for(var e=["top","right","bottom","left"],n={},i=0,r=e;i<r.length;i++){var a=r[i],o=t["padding-"+a];n[a]=Me(o)}return n}function mo(t){var e=t.getBBox();return We(0,0,e.width,e.height)}function vo(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return Or;var i=ce(t).getComputedStyle(t),r=ho(i),a=r.left+r.right,o=r.top+r.bottom,s=Me(i.width),l=Me(i.height);if(i.boxSizing==="border-box"&&(Math.round(s+a)!==e&&(s-=Et(i,"left","right")+a),Math.round(l+o)!==n&&(l-=Et(i,"top","bottom")+o)),!yo(t)){var c=Math.round(s+a)-e,u=Math.round(l+o)-n;Math.abs(c)!==1&&(s-=c),Math.abs(u)!==1&&(l-=u)}return We(r.left,r.top,s,l)}var go=function(){return typeof SVGGraphicsElement<"u"?function(t){return t instanceof ce(t).SVGGraphicsElement}:function(t){return t instanceof ce(t).SVGElement&&typeof t.getBBox=="function"}}();function yo(t){return t===ce(t).document.documentElement}function bo(t){return ct?go(t)?mo(t):vo(t):Or}function So(t){var e=t.x,n=t.y,i=t.width,r=t.height,a=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,o=Object.create(a.prototype);return wr(o,{x:e,y:n,width:i,height:r,top:n,right:e+i,bottom:r+n,left:e}),o}function We(t,e,n,i){return{x:t,y:e,width:n,height:i}}var wo=function(){function t(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=We(0,0,0,0),this.target=e}return t.prototype.isActive=function(){var e=bo(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},t}(),Oo=function(){function t(e,n){var i=So(n);wr(this,{target:e,contentRect:i})}return t}(),xo=function(){function t(e,n,i){if(this.activeObservations_=[],this.observations_=new Sr,typeof e!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=e,this.controller_=n,this.callbackCtx_=i}return t.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(e instanceof ce(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_;n.has(e)||(n.set(e,new wo(e)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(e instanceof ce(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_;n.has(e)&&(n.delete(e),n.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach(function(n){n.isActive()&&e.activeObservations_.push(n)})},t.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,n=this.activeObservations_.map(function(i){return new Oo(i.target,i.broadcastRect())});this.callback_.call(e,n,e),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),xr=typeof WeakMap<"u"?new WeakMap:new Sr,_r=function(){function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=po.getInstance(),i=new xo(e,n,this);xr.set(this,i)}return t}();["observe","unobserve","disconnect"].forEach(function(t){_r.prototype[t]=function(){var e;return(e=xr.get(this))[t].apply(e,arguments)}});var _o=function(){return typeof Ee.ResizeObserver<"u"?Ee.ResizeObserver:_r}();const ko=Object.freeze(Object.defineProperty({__proto__:null,default:_o},Symbol.toStringTag,{value:"Module"})),Po=Vr(ko);Object.defineProperty(De,"__esModule",{value:!0});De.InnerSlider=void 0;var F=ge(D),To=ge(Ut),jo=ge(gi),Co=ge(Ie),N=m,Eo=$e,Mo=Ne,Mt=se,Lo=ge(Po);function ge(t){return t&&t.__esModule?t:{default:t}}function Z(t){"@babel/helpers - typeof";return Z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Z(t)}function Le(){return Le=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Le.apply(this,arguments)}function Ro(t,e){if(t==null)return{};var n=zo(t,e),i,r;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)i=a[r],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(t,i)&&(n[i]=t[i])}return n}function zo(t,e){if(t==null)return{};var n={},i=Object.keys(t),r,a;for(a=0;a<i.length;a++)r=i[a],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function Lt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Lt(Object(n),!0).forEach(function(i){z(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Lt(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function Do(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Io(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,Pr(i.key),i)}}function $o(t,e,n){return e&&Io(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function No(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ut(t,e)}function ut(t,e){return ut=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,r){return i.__proto__=r,i},ut(t,e)}function Wo(t){var e=kr();return function(){var i=Re(t),r;if(e){var a=Re(this).constructor;r=Reflect.construct(i,arguments,a)}else r=i.apply(this,arguments);return Ao(this,r)}}function Ao(t,e){if(e&&(Z(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return R(t)}function R(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function kr(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(kr=function(){return!!t})()}function Re(t){return Re=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},Re(t)}function z(t,e,n){return e=Pr(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Pr(t){var e=Ho(t,"string");return Z(e)=="symbol"?e:String(e)}function Ho(t,e){if(Z(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(Z(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}De.InnerSlider=function(t){No(n,t);var e=Wo(n);function n(i){var r;Do(this,n),r=e.call(this,i),z(R(r),"listRefHandler",function(o){return r.list=o}),z(R(r),"trackRefHandler",function(o){return r.track=o}),z(R(r),"adaptHeight",function(){if(r.props.adaptiveHeight&&r.list){var o=r.list.querySelector('[data-index="'.concat(r.state.currentSlide,'"]'));r.list.style.height=(0,N.getHeight)(o)+"px"}}),z(R(r),"componentDidMount",function(){if(r.props.onInit&&r.props.onInit(),r.props.lazyLoad){var o=(0,N.getOnDemandLazySlides)(k(k({},r.props),r.state));o.length>0&&(r.setState(function(l){return{lazyLoadedList:l.lazyLoadedList.concat(o)}}),r.props.onLazyLoad&&r.props.onLazyLoad(o))}var s=k({listRef:r.list,trackRef:r.track},r.props);r.updateState(s,!0,function(){r.adaptHeight(),r.props.autoplay&&r.autoPlay("update")}),r.props.lazyLoad==="progressive"&&(r.lazyLoadTimer=setInterval(r.progressiveLazyLoad,1e3)),r.ro=new Lo.default(function(){r.state.animating?(r.onWindowResized(!1),r.callbackTimers.push(setTimeout(function(){return r.onWindowResized()},r.props.speed))):r.onWindowResized()}),r.ro.observe(r.list),document.querySelectorAll&&Array.prototype.forEach.call(document.querySelectorAll(".slick-slide"),function(l){l.onfocus=r.props.pauseOnFocus?r.onSlideFocus:null,l.onblur=r.props.pauseOnFocus?r.onSlideBlur:null}),window.addEventListener?window.addEventListener("resize",r.onWindowResized):window.attachEvent("onresize",r.onWindowResized)}),z(R(r),"componentWillUnmount",function(){r.animationEndCallback&&clearTimeout(r.animationEndCallback),r.lazyLoadTimer&&clearInterval(r.lazyLoadTimer),r.callbackTimers.length&&(r.callbackTimers.forEach(function(o){return clearTimeout(o)}),r.callbackTimers=[]),window.addEventListener?window.removeEventListener("resize",r.onWindowResized):window.detachEvent("onresize",r.onWindowResized),r.autoplayTimer&&clearInterval(r.autoplayTimer),r.ro.disconnect()}),z(R(r),"componentDidUpdate",function(o){if(r.checkImagesLoad(),r.props.onReInit&&r.props.onReInit(),r.props.lazyLoad){var s=(0,N.getOnDemandLazySlides)(k(k({},r.props),r.state));s.length>0&&(r.setState(function(u){return{lazyLoadedList:u.lazyLoadedList.concat(s)}}),r.props.onLazyLoad&&r.props.onLazyLoad(s))}r.adaptHeight();var l=k(k({listRef:r.list,trackRef:r.track},r.props),r.state),c=r.didPropsChange(o);c&&r.updateState(l,c,function(){r.state.currentSlide>=F.default.Children.count(r.props.children)&&r.changeSlide({message:"index",index:F.default.Children.count(r.props.children)-r.props.slidesToShow,currentSlide:r.state.currentSlide}),r.props.autoplay?r.autoPlay("update"):r.pause("paused")})}),z(R(r),"onWindowResized",function(o){r.debouncedResize&&r.debouncedResize.cancel(),r.debouncedResize=(0,jo.default)(function(){return r.resizeWindow(o)},50),r.debouncedResize()}),z(R(r),"resizeWindow",function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,s=!!(r.track&&r.track.node);if(s){var l=k(k({listRef:r.list,trackRef:r.track},r.props),r.state);r.updateState(l,o,function(){r.props.autoplay?r.autoPlay("update"):r.pause("paused")}),r.setState({animating:!1}),clearTimeout(r.animationEndCallback),delete r.animationEndCallback}}),z(R(r),"updateState",function(o,s,l){var c=(0,N.initializedState)(o);o=k(k(k({},o),c),{},{slideIndex:c.currentSlide});var u=(0,N.getTrackLeft)(o);o=k(k({},o),{},{left:u});var f=(0,N.getTrackCSS)(o);(s||F.default.Children.count(r.props.children)!==F.default.Children.count(o.children))&&(c.trackStyle=f),r.setState(c,l)}),z(R(r),"ssrInit",function(){if(r.props.variableWidth){var o=0,s=0,l=[],c=(0,N.getPreClones)(k(k(k({},r.props),r.state),{},{slideCount:r.props.children.length})),u=(0,N.getPostClones)(k(k(k({},r.props),r.state),{},{slideCount:r.props.children.length}));r.props.children.forEach(function(I){l.push(I.props.style.width),o+=I.props.style.width});for(var f=0;f<c;f++)s+=l[l.length-1-f],o+=l[l.length-1-f];for(var g=0;g<u;g++)o+=l[g];for(var x=0;x<r.state.currentSlide;x++)s+=l[x];var w={width:o+"px",left:-s+"px"};if(r.props.centerMode){var h="".concat(l[r.state.currentSlide],"px");w.left="calc(".concat(w.left," + (100% - ").concat(h,") / 2 ) ")}return{trackStyle:w}}var S=F.default.Children.count(r.props.children),_=k(k(k({},r.props),r.state),{},{slideCount:S}),p=(0,N.getPreClones)(_)+(0,N.getPostClones)(_)+S,O=100/r.props.slidesToShow*p,P=100/p,j=-P*((0,N.getPreClones)(_)+r.state.currentSlide)*O/100;r.props.centerMode&&(j+=(100-P*O/100)/2);var C={width:O+"%",left:j+"%"};return{slideWidth:P+"%",trackStyle:C}}),z(R(r),"checkImagesLoad",function(){var o=r.list&&r.list.querySelectorAll&&r.list.querySelectorAll(".slick-slide img")||[],s=o.length,l=0;Array.prototype.forEach.call(o,function(c){var u=function(){return++l&&l>=s&&r.onWindowResized()};if(!c.onclick)c.onclick=function(){return c.parentNode.focus()};else{var f=c.onclick;c.onclick=function(g){f(g),c.parentNode.focus()}}c.onload||(r.props.lazyLoad?c.onload=function(){r.adaptHeight(),r.callbackTimers.push(setTimeout(r.onWindowResized,r.props.speed))}:(c.onload=u,c.onerror=function(){u(),r.props.onLazyLoadError&&r.props.onLazyLoadError()}))})}),z(R(r),"progressiveLazyLoad",function(){for(var o=[],s=k(k({},r.props),r.state),l=r.state.currentSlide;l<r.state.slideCount+(0,N.getPostClones)(s);l++)if(r.state.lazyLoadedList.indexOf(l)<0){o.push(l);break}for(var c=r.state.currentSlide-1;c>=-(0,N.getPreClones)(s);c--)if(r.state.lazyLoadedList.indexOf(c)<0){o.push(c);break}o.length>0?(r.setState(function(u){return{lazyLoadedList:u.lazyLoadedList.concat(o)}}),r.props.onLazyLoad&&r.props.onLazyLoad(o)):r.lazyLoadTimer&&(clearInterval(r.lazyLoadTimer),delete r.lazyLoadTimer)}),z(R(r),"slideHandler",function(o){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,l=r.props,c=l.asNavFor,u=l.beforeChange,f=l.onLazyLoad,g=l.speed,x=l.afterChange,w=r.state.currentSlide,h=(0,N.slideHandler)(k(k(k({index:o},r.props),r.state),{},{trackRef:r.track,useCSS:r.props.useCSS&&!s})),S=h.state,_=h.nextState;if(S){u&&u(w,S.currentSlide);var p=S.lazyLoadedList.filter(function(O){return r.state.lazyLoadedList.indexOf(O)<0});f&&p.length>0&&f(p),!r.props.waitForAnimate&&r.animationEndCallback&&(clearTimeout(r.animationEndCallback),x&&x(w),delete r.animationEndCallback),r.setState(S,function(){c&&r.asNavForIndex!==o&&(r.asNavForIndex=o,c.innerSlider.slideHandler(o)),_&&(r.animationEndCallback=setTimeout(function(){var O=_.animating,P=Ro(_,["animating"]);r.setState(P,function(){r.callbackTimers.push(setTimeout(function(){return r.setState({animating:O})},10)),x&&x(S.currentSlide),delete r.animationEndCallback})},g))})}}),z(R(r),"changeSlide",function(o){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,l=k(k({},r.props),r.state),c=(0,N.changeSlide)(l,o);if(!(c!==0&&!c)&&(s===!0?r.slideHandler(c,s):r.slideHandler(c),r.props.autoplay&&r.autoPlay("update"),r.props.focusOnSelect)){var u=r.list.querySelectorAll(".slick-current");u[0]&&u[0].focus()}}),z(R(r),"clickHandler",function(o){r.clickable===!1&&(o.stopPropagation(),o.preventDefault()),r.clickable=!0}),z(R(r),"keyHandler",function(o){var s=(0,N.keyHandler)(o,r.props.accessibility,r.props.rtl);s!==""&&r.changeSlide({message:s})}),z(R(r),"selectHandler",function(o){r.changeSlide(o)}),z(R(r),"disableBodyScroll",function(){var o=function(l){l=l||window.event,l.preventDefault&&l.preventDefault(),l.returnValue=!1};window.ontouchmove=o}),z(R(r),"enableBodyScroll",function(){window.ontouchmove=null}),z(R(r),"swipeStart",function(o){r.props.verticalSwiping&&r.disableBodyScroll();var s=(0,N.swipeStart)(o,r.props.swipe,r.props.draggable);s!==""&&r.setState(s)}),z(R(r),"swipeMove",function(o){var s=(0,N.swipeMove)(o,k(k(k({},r.props),r.state),{},{trackRef:r.track,listRef:r.list,slideIndex:r.state.currentSlide}));s&&(s.swiping&&(r.clickable=!1),r.setState(s))}),z(R(r),"swipeEnd",function(o){var s=(0,N.swipeEnd)(o,k(k(k({},r.props),r.state),{},{trackRef:r.track,listRef:r.list,slideIndex:r.state.currentSlide}));if(s){var l=s.triggerSlideHandler;delete s.triggerSlideHandler,r.setState(s),l!==void 0&&(r.slideHandler(l),r.props.verticalSwiping&&r.enableBodyScroll())}}),z(R(r),"touchEnd",function(o){r.swipeEnd(o),r.clickable=!0}),z(R(r),"slickPrev",function(){r.callbackTimers.push(setTimeout(function(){return r.changeSlide({message:"previous"})},0))}),z(R(r),"slickNext",function(){r.callbackTimers.push(setTimeout(function(){return r.changeSlide({message:"next"})},0))}),z(R(r),"slickGoTo",function(o){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(o=Number(o),isNaN(o))return"";r.callbackTimers.push(setTimeout(function(){return r.changeSlide({message:"index",index:o,currentSlide:r.state.currentSlide},s)},0))}),z(R(r),"play",function(){var o;if(r.props.rtl)o=r.state.currentSlide-r.props.slidesToScroll;else if((0,N.canGoNext)(k(k({},r.props),r.state)))o=r.state.currentSlide+r.props.slidesToScroll;else return!1;r.slideHandler(o)}),z(R(r),"autoPlay",function(o){r.autoplayTimer&&clearInterval(r.autoplayTimer);var s=r.state.autoplaying;if(o==="update"){if(s==="hovered"||s==="focused"||s==="paused")return}else if(o==="leave"){if(s==="paused"||s==="focused")return}else if(o==="blur"&&(s==="paused"||s==="hovered"))return;r.autoplayTimer=setInterval(r.play,r.props.autoplaySpeed+50),r.setState({autoplaying:"playing"})}),z(R(r),"pause",function(o){r.autoplayTimer&&(clearInterval(r.autoplayTimer),r.autoplayTimer=null);var s=r.state.autoplaying;o==="paused"?r.setState({autoplaying:"paused"}):o==="focused"?(s==="hovered"||s==="playing")&&r.setState({autoplaying:"focused"}):s==="playing"&&r.setState({autoplaying:"hovered"})}),z(R(r),"onDotsOver",function(){return r.props.autoplay&&r.pause("hovered")}),z(R(r),"onDotsLeave",function(){return r.props.autoplay&&r.state.autoplaying==="hovered"&&r.autoPlay("leave")}),z(R(r),"onTrackOver",function(){return r.props.autoplay&&r.pause("hovered")}),z(R(r),"onTrackLeave",function(){return r.props.autoplay&&r.state.autoplaying==="hovered"&&r.autoPlay("leave")}),z(R(r),"onSlideFocus",function(){return r.props.autoplay&&r.pause("focused")}),z(R(r),"onSlideBlur",function(){return r.props.autoplay&&r.state.autoplaying==="focused"&&r.autoPlay("blur")}),z(R(r),"render",function(){var o=(0,Co.default)("slick-slider",r.props.className,{"slick-vertical":r.props.vertical,"slick-initialized":!0}),s=k(k({},r.props),r.state),l=(0,N.extractObject)(s,["fade","cssEase","speed","infinite","centerMode","focusOnSelect","currentSlide","lazyLoad","lazyLoadedList","rtl","slideWidth","slideHeight","listHeight","vertical","slidesToShow","slidesToScroll","slideCount","trackStyle","variableWidth","unslick","centerPadding","targetSlide","useCSS"]),c=r.props.pauseOnHover;l=k(k({},l),{},{onMouseEnter:c?r.onTrackOver:null,onMouseLeave:c?r.onTrackLeave:null,onMouseOver:c?r.onTrackOver:null,focusOnSelect:r.props.focusOnSelect&&r.clickable?r.selectHandler:null});var u;if(r.props.dots===!0&&r.state.slideCount>=r.props.slidesToShow){var f=(0,N.extractObject)(s,["dotsClass","slideCount","slidesToShow","currentSlide","slidesToScroll","clickHandler","children","customPaging","infinite","appendDots"]),g=r.props.pauseOnDotsHover;f=k(k({},f),{},{clickHandler:r.changeSlide,onMouseEnter:g?r.onDotsLeave:null,onMouseOver:g?r.onDotsOver:null,onMouseLeave:g?r.onDotsLeave:null}),u=F.default.createElement(Mo.Dots,f)}var x,w,h=(0,N.extractObject)(s,["infinite","centerMode","currentSlide","slideCount","slidesToShow","prevArrow","nextArrow"]);h.clickHandler=r.changeSlide,r.props.arrows&&(x=F.default.createElement(Mt.PrevArrow,h),w=F.default.createElement(Mt.NextArrow,h));var S=null;r.props.vertical&&(S={height:r.state.listHeight});var _=null;r.props.vertical===!1?r.props.centerMode===!0&&(_={padding:"0px "+r.props.centerPadding}):r.props.centerMode===!0&&(_={padding:r.props.centerPadding+" 0px"});var p=k(k({},S),_),O=r.props.touchMove,P={className:"slick-list",style:p,onClick:r.clickHandler,onMouseDown:O?r.swipeStart:null,onMouseMove:r.state.dragging&&O?r.swipeMove:null,onMouseUp:O?r.swipeEnd:null,onMouseLeave:r.state.dragging&&O?r.swipeEnd:null,onTouchStart:O?r.swipeStart:null,onTouchMove:r.state.dragging&&O?r.swipeMove:null,onTouchEnd:O?r.touchEnd:null,onTouchCancel:r.state.dragging&&O?r.swipeEnd:null,onKeyDown:r.props.accessibility?r.keyHandler:null},j={className:o,dir:"ltr",style:r.props.style};return r.props.unslick&&(P={className:"slick-list"},j={className:o}),F.default.createElement("div",j,r.props.unslick?"":x,F.default.createElement("div",Le({ref:r.listRefHandler},P),F.default.createElement(Eo.Track,Le({ref:r.trackRefHandler},l),r.props.children)),r.props.unslick?"":w,r.props.unslick?"":u)}),r.list=null,r.track=null,r.state=k(k({},To.default),{},{currentSlide:r.props.initialSlide,targetSlide:r.props.initialSlide?r.props.initialSlide:0,slideCount:F.default.Children.count(r.props.children)}),r.callbackTimers=[],r.clickable=!0,r.debouncedResize=null;var a=r.ssrInit();return r.state=k(k({},r.state),a),r}return $o(n,[{key:"didPropsChange",value:function(r){for(var a=!1,o=0,s=Object.keys(this.props);o<s.length;o++){var l=s[o];if(!r.hasOwnProperty(l)){a=!0;break}if(!(Z(r[l])==="object"||typeof r[l]=="function"||isNaN(r[l]))&&r[l]!==this.props[l]){a=!0;break}}return a||F.default.Children.count(this.props.children)!==F.default.Children.count(r.children)}}]),n}(F.default.Component);var Bo=function(t){return t.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}).toLowerCase()},Fo=Bo,Yo=Fo,qo=function(t){var e=/[height|width]$/;return e.test(t)},Rt=function(t){var e="",n=Object.keys(t);return n.forEach(function(i,r){var a=t[i];i=Yo(i),qo(i)&&typeof a=="number"&&(a=a+"px"),a===!0?e+=i:a===!1?e+="not "+i:e+="("+i+": "+a+")",r<n.length-1&&(e+=" and ")}),e},Xo=function(t){var e="";return typeof t=="string"?t:t instanceof Array?(t.forEach(function(n,i){e+=Rt(n),i<t.length-1&&(e+=", ")}),e):Rt(t)},Vo=Xo,Ge,zt;function Go(){if(zt)return Ge;zt=1;function t(e){this.options=e,!e.deferSetup&&this.setup()}return t.prototype={constructor:t,setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(e){return this.options===e||this.options.match===e}},Ge=t,Ge}var Ue,Dt;function Tr(){if(Dt)return Ue;Dt=1;function t(i,r){var a=0,o=i.length,s;for(a;a<o&&(s=r(i[a],a),s!==!1);a++);}function e(i){return Object.prototype.toString.apply(i)==="[object Array]"}function n(i){return typeof i=="function"}return Ue={isFunction:n,isArray:e,each:t},Ue}var Ke,It;function Uo(){if(It)return Ke;It=1;var t=Go(),e=Tr().each;function n(i,r){this.query=i,this.isUnconditional=r,this.handlers=[],this.mql=window.matchMedia(i);var a=this;this.listener=function(o){a.mql=o.currentTarget||o,a.assess()},this.mql.addListener(this.listener)}return n.prototype={constuctor:n,addHandler:function(i){var r=new t(i);this.handlers.push(r),this.matches()&&r.on()},removeHandler:function(i){var r=this.handlers;e(r,function(a,o){if(a.equals(i))return a.destroy(),!r.splice(o,1)})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){e(this.handlers,function(i){i.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var i=this.matches()?"on":"off";e(this.handlers,function(r){r[i]()})}},Ke=n,Ke}var Qe,$t;function Ko(){if($t)return Qe;$t=1;var t=Uo(),e=Tr(),n=e.each,i=e.isFunction,r=e.isArray;function a(){if(!window.matchMedia)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!window.matchMedia("only all").matches}return a.prototype={constructor:a,register:function(o,s,l){var c=this.queries,u=l&&this.browserIsIncapable;return c[o]||(c[o]=new t(o,u)),i(s)&&(s={match:s}),r(s)||(s=[s]),n(s,function(f){i(f)&&(f={match:f}),c[o].addHandler(f)}),this},unregister:function(o,s){var l=this.queries[o];return l&&(s?l.removeHandler(s):(l.clear(),delete this.queries[o])),this}},Qe=a,Qe}var Ze,Nt;function Qo(){if(Nt)return Ze;Nt=1;var t=Ko();return Ze=new t,Ze}(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=o(D),n=De,i=o(Vo),r=o(pt),a=m;function o(y){return y&&y.__esModule?y:{default:y}}function s(y){"@babel/helpers - typeof";return s=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(v){return typeof v}:function(v){return v&&typeof Symbol=="function"&&v.constructor===Symbol&&v!==Symbol.prototype?"symbol":typeof v},s(y)}function l(){return l=Object.assign?Object.assign.bind():function(y){for(var v=1;v<arguments.length;v++){var L=arguments[v];for(var T in L)Object.prototype.hasOwnProperty.call(L,T)&&(y[T]=L[T])}return y},l.apply(this,arguments)}function c(y,v){var L=Object.keys(y);if(Object.getOwnPropertySymbols){var T=Object.getOwnPropertySymbols(y);v&&(T=T.filter(function(E){return Object.getOwnPropertyDescriptor(y,E).enumerable})),L.push.apply(L,T)}return L}function u(y){for(var v=1;v<arguments.length;v++){var L=arguments[v]!=null?arguments[v]:{};v%2?c(Object(L),!0).forEach(function(T){j(y,T,L[T])}):Object.getOwnPropertyDescriptors?Object.defineProperties(y,Object.getOwnPropertyDescriptors(L)):c(Object(L)).forEach(function(T){Object.defineProperty(y,T,Object.getOwnPropertyDescriptor(L,T))})}return y}function f(y,v){if(!(y instanceof v))throw new TypeError("Cannot call a class as a function")}function g(y,v){for(var L=0;L<v.length;L++){var T=v[L];T.enumerable=T.enumerable||!1,T.configurable=!0,"value"in T&&(T.writable=!0),Object.defineProperty(y,C(T.key),T)}}function x(y,v,L){return v&&g(y.prototype,v),Object.defineProperty(y,"prototype",{writable:!1}),y}function w(y,v){if(typeof v!="function"&&v!==null)throw new TypeError("Super expression must either be null or a function");y.prototype=Object.create(v&&v.prototype,{constructor:{value:y,writable:!0,configurable:!0}}),Object.defineProperty(y,"prototype",{writable:!1}),v&&h(y,v)}function h(y,v){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(T,E){return T.__proto__=E,T},h(y,v)}function S(y){var v=O();return function(){var T=P(y),E;if(v){var M=P(this).constructor;E=Reflect.construct(T,arguments,M)}else E=T.apply(this,arguments);return _(this,E)}}function _(y,v){if(v&&(s(v)==="object"||typeof v=="function"))return v;if(v!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return p(y)}function p(y){if(y===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return y}function O(){try{var y=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(O=function(){return!!y})()}function P(y){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(L){return L.__proto__||Object.getPrototypeOf(L)},P(y)}function j(y,v,L){return v=C(v),v in y?Object.defineProperty(y,v,{value:L,enumerable:!0,configurable:!0,writable:!0}):y[v]=L,y}function C(y){var v=I(y,"string");return s(v)=="symbol"?v:String(v)}function I(y,v){if(s(y)!="object"||!y)return y;var L=y[Symbol.toPrimitive];if(L!==void 0){var T=L.call(y,v||"default");if(s(T)!="object")return T;throw new TypeError("@@toPrimitive must return a primitive value.")}return(v==="string"?String:Number)(y)}var H=(0,a.canUseDOM)()&&Qo();t.default=function(y){w(L,y);var v=S(L);function L(T){var E;return f(this,L),E=v.call(this,T),j(p(E),"innerSliderRefHandler",function(M){return E.innerSlider=M}),j(p(E),"slickPrev",function(){return E.innerSlider.slickPrev()}),j(p(E),"slickNext",function(){return E.innerSlider.slickNext()}),j(p(E),"slickGoTo",function(M){var U=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return E.innerSlider.slickGoTo(M,U)}),j(p(E),"slickPause",function(){return E.innerSlider.pause("paused")}),j(p(E),"slickPlay",function(){return E.innerSlider.autoPlay("play")}),E.state={breakpoint:null},E._responsiveMediaHandlers=[],E}return x(L,[{key:"media",value:function(E,M){H.register(E,M),this._responsiveMediaHandlers.push({query:E,handler:M})}},{key:"componentDidMount",value:function(){var E=this;if(this.props.responsive){var M=this.props.responsive.map(function(B){return B.breakpoint});M.sort(function(B,q){return B-q}),M.forEach(function(B,q){var J;q===0?J=(0,i.default)({minWidth:0,maxWidth:B}):J=(0,i.default)({minWidth:M[q-1]+1,maxWidth:B}),(0,a.canUseDOM)()&&E.media(J,function(){E.setState({breakpoint:B})})});var U=(0,i.default)({minWidth:M.slice(-1)[0]});(0,a.canUseDOM)()&&this.media(U,function(){E.setState({breakpoint:null})})}}},{key:"componentWillUnmount",value:function(){this._responsiveMediaHandlers.forEach(function(E){H.unregister(E.query,E.handler)})}},{key:"render",value:function(){var E=this,M,U;this.state.breakpoint?(U=this.props.responsive.filter(function(ue){return ue.breakpoint===E.state.breakpoint}),M=U[0].settings==="unslick"?"unslick":u(u(u({},r.default),this.props),U[0].settings)):M=u(u({},r.default),this.props),M.centerMode&&(M.slidesToScroll>1,M.slidesToScroll=1),M.fade&&(M.slidesToShow>1,M.slidesToScroll>1,M.slidesToShow=1,M.slidesToScroll=1);var B=e.default.Children.toArray(this.props.children);B=B.filter(function(ue){return typeof ue=="string"?!!ue.trim():!!ue}),M.variableWidth&&(M.rows>1||M.slidesPerRow>1)&&(console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1"),M.variableWidth=!1);for(var q=[],J=null,V=0;V<B.length;V+=M.rows*M.slidesPerRow){for(var Ae=[],ee=V;ee<V+M.rows*M.slidesPerRow;ee+=M.slidesPerRow){for(var mt=[],K=ee;K<ee+M.slidesPerRow&&(M.variableWidth&&B[K].props.style&&(J=B[K].props.style.width),!(K>=B.length));K+=1)mt.push(e.default.cloneElement(B[K],{key:100*V+10*ee+K,tabIndex:-1,style:{width:"".concat(100/M.slidesPerRow,"%"),display:"inline-block"}}));Ae.push(e.default.createElement("div",{key:10*V+ee},mt))}M.variableWidth?q.push(e.default.createElement("div",{key:V,style:{width:J}},Ae)):q.push(e.default.createElement("div",{key:V},Ae))}if(M==="unslick"){var jr="regular slider "+(this.props.className||"");return e.default.createElement("div",{className:jr},B)}else q.length<=M.slidesToShow&&!M.infinite&&(M.unslick=!0);return e.default.createElement(n.InnerSlider,l({style:this.props.style,ref:this.innerSliderRefHandler},(0,a.filterSettings)(M)),q)}}]),L}(e.default.Component)})(Gt);(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=n(Gt);function n(i){return i&&i.__esModule?i:{default:i}}t.default=e.default})(Vt);const Zo=Gr(Vt),Jo=Kr(b.jsx("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11z"}),"Security"),oa=()=>{const t=At();en(t.breakpoints.down("md"));const[e,n]=D.useState(0),i={primary:"#1A73E8",secondary:"#FF9800",accent:"#4CAF50",background:"#F0F4C3"},r={dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:3e3,beforeChange:(o,s)=>n(s),responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1}}]},a=[{src:"assets/images/seam-concept.jpg",title:"Seam Concept"},{src:"assets/images/Brainstroming sessions.jpeg",title:"Brainstorming Sessions"},{src:"assets/images/Industrial Mentoring.jpeg",title:"Industrial Mentoring"},{src:"assets/images/Deepak is Kanguva.jpeg",title:"Planning"},{src:"assets/images/seam-prototype.jpg",title:"Prototype Development"},{src:"assets/images/seam-testing.jpg",title:"Security Testing"},{src:"assets/images/seam-final.jpg",title:"Final Product"}];return b.jsxs(te,{sx:{width:"100%",minHeight:"100vh",background:`linear-gradient(135deg, 
          ${i.background} 40%, 
          ${i.background}CC 50%, 
          ${i.background}99 100%)`,position:"relative",overflow:"hidden",fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif"},children:[b.jsx(te,{sx:{py:8,textAlign:"center",background:"linear-gradient(180deg, white 18%, rgba(255, 190, 50, 0.8) 65%, rgba(10, 190, 40, 0.7) 100%) ",borderRadius:"12px"},children:b.jsxs(de,{cascade:!0,children:[b.jsx(W,{variant:"h3",sx:{fontWeight:"bold",color:"#2234a8",textShadow:"1px 1px 4px rgba(0, 0, 0, 0.3)"},children:"Welcome to SEAM"}),b.jsx(W,{variant:"h6",sx:{mt:2,color:"#000",fontWeight:"bold"},children:"Secure Encryption and Authentication Model"}),b.jsx(gt,{variant:"contained",size:"large",component:vt,to:"/authenticate",startIcon:b.jsx(Jo,{}),sx:{mt:4,px:4,py:2,backgroundColor:"#2962FF",color:"white",fontWeight:"bold",borderRadius:"25px",":hover":{backgroundColor:"#FFA500"}},children:"Get Started"})]})}),b.jsxs(Be,{sx:{my:8},children:[b.jsx(W,{variant:"h4",sx:{textAlign:"center",fontWeight:"bold",mb:4,color:"linear-gradient(135deg, white 12%, rgba(10, 190, 40, 0.9) 100%)",borderRadius:"12px"},children:"Why Choose SEAM?"}),b.jsxs(X,{container:!0,spacing:4,children:[b.jsx(X,{item:!0,xs:12,md:4,children:b.jsx(de,{children:b.jsxs(Q,{elevation:3,sx:{p:4,borderRadius:"12px",backgroundColor:"#e3f2fd",height:"100%"},children:[b.jsx(W,{variant:"h6",sx:{fontWeight:"bold",color:"#1976d2",mb:2},children:"Secure Authentication"}),b.jsx(W,{variant:"body1",sx:{color:"#555"},children:"Liveness detection ensures only authorized users access services."})]})})}),b.jsx(X,{item:!0,xs:12,md:4,children:b.jsx(de,{children:b.jsxs(Q,{elevation:3,sx:{p:4,borderRadius:"12px",backgroundColor:"#e8f5e9",height:"100%"},children:[b.jsx(W,{variant:"h6",sx:{fontWeight:"bold",color:"#2e7d32",mb:2},children:"Tamper-Proof Models"}),b.jsx(W,{variant:"body1",sx:{color:"#555"},children:"Encryption and obfuscation protect models from reverse engineering."})]})})}),b.jsx(X,{item:!0,xs:12,md:4,children:b.jsx(de,{children:b.jsxs(Q,{elevation:3,sx:{p:4,borderRadius:"12px",backgroundColor:"#fff3e0",height:"100%"},children:[b.jsx(W,{variant:"h6",sx:{fontWeight:"bold",color:"#ef6c00",mb:2},children:"Optimized for Networks"}),b.jsx(W,{variant:"body1",sx:{color:"#555"},children:"Lightweight models ensure smooth transactions even on 3G networks."})]})})})]})]}),b.jsx(te,{sx:{py:8,backgroundColor:"#BBDEFB",textAlign:"center",borderRadius:"12px"},children:b.jsxs(de,{children:[b.jsx(W,{variant:"h4",sx:{fontWeight:"bold",color:"#2234a8",mb:4},children:"How SEAM Works"}),b.jsxs(Be,{children:[b.jsx(W,{variant:"body1",sx:{mb:6,color:"#555",lineHeight:"1.6",fontweight:"bold"},children:"SEAM integrates advanced face authentication and AI-driven liveness checks directly into your browser. Here’s how it works:"}),b.jsxs(X,{container:!0,spacing:4,children:[b.jsx(X,{item:!0,xs:12,md:3,children:b.jsxs(Q,{elevation:3,sx:{p:3,borderRadius:"12px"},children:[b.jsx(W,{variant:"h6",sx:{fontWeight:"bold",color:"#4caf50",mb:2},children:"Step 1"}),b.jsx(W,{variant:"body1",sx:{color:"#555"},children:"Access SEAM via a secure desktop browser."})]})}),b.jsx(X,{item:!0,xs:12,md:3,children:b.jsxs(Q,{elevation:3,sx:{p:3,borderRadius:"12px"},children:[b.jsx(W,{variant:"h6",sx:{fontWeight:"bold",color:"#4caf50",mb:2},children:"Step 2"}),b.jsx(W,{variant:"body1",sx:{color:"#555"},children:"Capture your face via webcam with real-time liveness detection."})]})}),b.jsx(X,{item:!0,xs:12,md:3,children:b.jsxs(Q,{elevation:3,sx:{p:3,borderRadius:"12px"},children:[b.jsx(W,{variant:"h6",sx:{fontWeight:"bold",color:"#4caf50",mb:2},children:"Step 3"}),b.jsx(W,{variant:"body1",sx:{color:"#555"},children:"Authenticate using secure AI models."})]})}),b.jsx(X,{item:!0,xs:12,md:3,children:b.jsxs(Q,{elevation:3,sx:{p:3,borderRadius:"12px"},children:[b.jsx(W,{variant:"h6",sx:{fontWeight:"bold",color:"#4caf50",mb:2},children:"Step 4"}),b.jsx(W,{variant:"body1",sx:{color:"#555"},children:"Access your services securely."})]})})]})]})]})}),b.jsxs(Be,{sx:{my:6,position:"relative",zIndex:2},children:[b.jsx(W,{variant:"h4",sx:{textAlign:"center",fontWeight:"bold",mb:1,color:i.primary,borderRadius:"12px"},children:"Development Journey"}),b.jsx(te,{sx:{position:"relative",width:"100%",maxWidth:800,margin:"auto",borderRadius:"12px"},children:b.jsx(Zo,{...r,children:a.map((o,s)=>b.jsx(te,{sx:{display:"flex",justifyContent:"center",alignItems:"center",p:6},children:b.jsxs(Qr.div,{initial:{opacity:0,scale:.9},animate:{opacity:s===e?1:.7,scale:s===e?1:.9},transition:{duration:.7},children:[b.jsx("img",{src:o.src,alt:o.title,style:{maxWidth:"150%",maxHeight:400,borderRadius:"15px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)"}}),b.jsx(W,{variant:"subtitle1",sx:{textAlign:"start",mt:0,color:i.primary,fontWeight:"bold"},children:o.title})]})},s))})})]}),b.jsxs(te,{sx:{py:4,backgroundColor:"#2234a8",textAlign:"center",color:"white",borderRadius:"12px"},children:[b.jsx(W,{variant:"body2",sx:{mb:2},children:"© 2024 SEAM. All Rights Reserved."}),b.jsx(gt,{variant:"contained",component:vt,to:"/TeamPage",sx:{backgroundColor:"#4caf50",":hover":{backgroundColor:"#66bb6a"}},children:"Contact Us"})]})]})};export{oa as default};
