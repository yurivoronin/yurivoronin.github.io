!function(){"use strict";const t=(t,e)=>{t&&Object.keys(t).forEach(i=>e.setAttribute(i,`${t[i]}`))},e=(t,e)=>{e&&e.appendChild(t)},i=document,s=(s,l=null,n=null)=>{const a=i.createElement(s);return t(n,a),e(a,l),a},l=(s,l=null,n=null)=>{const a=i.createElementNS("http://www.w3.org/2000/svg",s);return t(n,a),e(a,l),a};class n{constructor(){this.load=(({url:t,artist:e,song:i,alt:s})=>fetch(t).then(t=>t.json()).then(t=>{if(!t)return null;let l=this.get(t,e),n=this.get(t,i);if(!l||!n){const e=this.get(t,s),i=(e||"").split(" - ");[l,n]=2===i.length?i:[e,null]}return{title:l,subtitle:n}}).catch(t=>null))}get(t,e){let i=t;for(const t of e.split("."))if(!(i=i[t]))return null;return i}}const a=320,r=52,o=4,c=128,h=(r/2-Math.ceil(1.5))/256,u="svg",d="defs",p="feGaussianBlur",m="femerge",f="femergenode",$="path";class g{constructor(t){this.$audio=t,this.createSVG()}play(){this.analyser||this.init(),this.render()}stop(){cancelAnimationFrame(this.frame)}init(){const t=new AudioContext,e=t.createMediaElementSource(this.$audio),i=t.createAnalyser();this.analyser=i,e.connect(i),i.connect(t.destination),i.fftSize=c,this.count=i.frequencyBinCount,this.data=new Uint8Array(this.count),this.step=a/this.count,this.middle=o+r/2}createSVG(){const t=l(u,null,{class:"visualization",viewBox:"0 0 320 60"}),e=l(d,t),i=l("filter",e,{id:"glow"});l(p,i,{class:"blur",result:"coloredBlur",stdDeviation:"4"});const s=l(m,i);for(let t=0;t<3;t++)l(f,s,{in:"coloredBlur"});l(f,s,{in:"SourceGraphic"});const n={fill:"transparent","stroke-width":"1.5","stroke-linecap":"square","stroke-linejoin":"arcs"};this.pathGlow=l($,t,Object.assign({filter:"url(#glow)",class:"path-glow"},n)),this.path=l($,t,Object.assign({class:"path"},n)),this.container=t}render(){this.frame=requestAnimationFrame(this.render.bind(this)),this.analyser.getByteFrequencyData(this.data);const t=[`M0,${this.middle}`];let e=1;for(let i=0;i<this.count;i++)e*=-1,t.push(`L${(i+.5)*this.step},${this.middle+e*this.data[i]*h}`);const i=t.join(" ");this.path.setAttribute("d",i),this.pathGlow.setAttribute("d",i)}}const w="list",b="active",y="station",T="titles",v="title",k="subtitle",C="audio",j="ul",A="li",z="a",B="span";class E{constructor(t,e){this.$current=null,this.url=null,this.titleLoader=new n,this.titles=new Map,this.$audio=s(C,t);const i=s(j,t,{class:w});e.forEach(t=>i.appendChild(this.createItem(t))),this.visualizer=new g(this.$audio),this.$background=this.visualizer.container}createItem(t){const e=s(A),i=s(z,e),l=s(B,i,{class:y}),n=s(B,i,{class:T}),a=s(B,n,{class:v}),r=s(B,n,{class:k});return l.textContent=t.name,this.titles.set(t.url,{$title:a,$subtitle:r}),i.addEventListener("click",()=>this.onClick(e,t)),e}onClick(t,{url:e,title:i}){if(!e)return;const s=e!==this.url;this.stop(),s&&this.play(t,e,i)}stop(){this.$current&&(this.visualizer.stop(),this.$current.classList.remove(b),this.$current=null,this.url=null,this.$audio.pause(),this.unloadTitle())}play(t,e,i){t.prepend(this.$background),this.visualizer.play();const s=this.$audio;t.classList.add(b),this.$current=t,this.url=e,s.src=this.url,s.load(),s.play(),i&&this.loadTitle(e,i)}unloadTitle(){this.titleTimer&&(clearTimeout(this.titleTimer),this.titleTimer=null)}loadTitle(t,e){let i=this.titleTimer;this.titleLoader.load(e).then(s=>{if(i&&i!==this.titleTimer)return;const{$title:l,$subtitle:n}=this.titles.get(t);s=s||{title:null,subtitle:null},l.textContent=s.title,n.textContent=s.subtitle,this.titleTimer=i=setTimeout(()=>this.loadTitle(t,e),5e3)})}}(async()=>{const t=await fetch("data.json"),e=await t.json();new E(i.body,e.stations)})()}();