(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const y=10,p=10,c={AI:"AI",HUMAN:"HUMAN"};class S{constructor(t,i){this.row=t,this.col=i,this.next=null}}class m{constructor(){this.head=null,this.tail=null,this.length=0}append(t,i){const e=new S(t,i);this.head?(this.tail.next=e,this.tail=e):(this.head=e,this.tail=e),this.length++}remove(t,i){if(!this.head)return;let e=this.head,s=null;for(;e;){if(e.row===t&&e.col===i){s?(s.next=e.next,e.next||(this.tail=s)):(this.head=e.next,e.next||(this.tail=null)),this.length--;break}s=e,e=e.next}}contains(t,i){let e=this.head;for(;e!==null;){if(e.row===t&&e.col===i)return!0;e=e.next}return!1}}function E(o,t){return o>=0&&o<y&&t>=0&&t<p}function D(o,t,i,e){return e[o][t]===i}const w=o=>new Promise(t=>setTimeout(t,o));function A(){return Array.from({length:y},()=>Array(p).fill(!1))}function I(o,t,i,e){const s=Math.abs(i-o),n=Math.abs(e-t);return s<=1&&n<=1&&s+n!==0}function L(o,t,i,e){return!(!(o===i)&&!(t===e)||!I(o,t,i,e))}function M(o){let t=new m;function i(s,n,a,u,h){u[s][n]=!0,h.append(s,n);const r=[[-1,0],[1,0],[0,-1],[0,1]];for(const[d,l]of r){const f=s+d,g=n+l;E(f,g)&&D(f,g,a,o)&&!u[f][g]&&i(f,g,a,u,h)}if(h.length>t.length){const d=new m;let l=h.head;for(;l;)d.append(l.row,l.col),l=l.next;t=d}u[s][n]=!1,h.remove(s,n)}const e=A();for(let s=0;s<y;s++)for(let n=0;n<p;n++)if(!e[s][n]){const a=o[s][n];i(s,n,a,e,new m)}return t}class v{constructor(){this.gridElm=document.getElementById("game-grid"),this.scoreDisplayP1=document.getElementById("score-value-1"),this.scoreDisplayP2=document.getElementById("score-value-2"),this.btnHuman=document.getElementById("gm-human"),this.btnAi=document.getElementById("gm-ai"),this.startButton=document.getElementById("start-button"),this.gameModeElm=document.querySelector(".game-mode"),this.gameWrapperElm=document.querySelector(".game-wrapper"),this.grid=[],this.turn=0,this.mode=null,this.lastSelectedDot=null,this.score=[0,0],this.selectedDots=new m,this.addEventListeners()}addEventListeners(){document.addEventListener("DOMContentLoaded",this.initializeGame.bind(this)),this.startButton.addEventListener("click",this.showGameModes.bind(this)),this.btnHuman.addEventListener("click",this.startHumanMode.bind(this)),this.btnAi.addEventListener("click",this.startAIMode.bind(this)),this.gridElm.addEventListener("mousedown",this.handleDotSelection.bind(this)),this.gridElm.addEventListener("mouseover",this.handleDotHover.bind(this)),document.getElementById("reset").addEventListener("click",this.resetGame.bind(this))}initializeGame(){this.resetUI()}resetUI(){this.mode=null,this.startButton.style.display="none",this.gameModeElm.style.display="flex",this.gameWrapperElm.classList.remove("started")}showGameModes(t){this.mode||(t.target.style.display="none",this.gameModeElm.style.display="flex")}startHumanMode(){this.mode=c.HUMAN,this.gameModeElm.style.display="none",document.getElementById("p1").innerText="Player 1",document.getElementById("p2").innerText="Player 2",this.initGame()}startAIMode(){this.mode=c.AI,this.gameModeElm.style.display="none",document.getElementById("p1").innerText="Your",document.getElementById("p2").innerText="AI",this.initGame()}initGame(){this.turn=this.mode===c.HUMAN?Math.floor(Math.random()*2):0,document.querySelector(`#score${this.turn+1}`).classList.add("turn"),this.score=[0,0],this.scoreDisplayP1.textContent=0,this.scoreDisplayP2.textContent=0,this.gameWrapperElm.classList.add("started"),this.generateGrid()}generateGrid(){this.gridElm.innerHTML="";for(let t=0;t<y;t++){this.grid[t]=[];for(let i=0;i<p;i++){const e=document.createElement("div"),s=this.getRandomColor();e.classList.add("dot"),e.dataset.color=s,e.dataset.row=t,e.dataset.col=i,this.gridElm.appendChild(e),this.grid[t][i]=s}}}getRandomColor(){const t=["red","blue","green","yellow"];return t[Math.floor(Math.random()*t.length)]}handleDotSelection(t){Object.keys(t.target.dataset).length&&(this.mode===c.AI&&this.turn===0||this.mode===c.HUMAN)&&this.handleDotClick(t)}handleDotHover(t){t.buttons===1&&Object.keys(t.target.dataset).length&&(this.mode===c.AI&&this.turn===0||this.mode===c.HUMAN)&&this.handleDotClick(t)}async handleDotClick(t){const i=t.target,e=i.dataset.color,s=+i.dataset.row,n=+i.dataset.col;await this.processDotSelection(i,e,s,n)}updateUi(t,i,e){this.selectedDots.contains(i,e)?(this.selectedDots.remove(i,e),t.classList.remove("selected")):(this.selectedDots.append(i,e),t.classList.add("selected"))}updateTurn(){document.querySelector(`#score${this.turn+1}`).classList.remove("turn"),this.turn=+!this.turn,document.querySelector(`#score${this.turn+1}`).classList.add("turn")}async processDotSelection(t,i,e,s){if(isNaN(e)||isNaN(s))return;this.updateUi(t,e,s);let n=!1;if(this.lastSelectedDot&&this.lastSelectedDot.color===i&&(n=L(this.lastSelectedDot.row,this.lastSelectedDot.col,e,s,this.selectedDots)),n){const a=[[-1,0],[1,0],[0,-1],[0,1]];let u=!1;for(const[h,r]of a){const d=e+h,l=s+r;E(d,l)&&D(d,l,i,this.grid)&&!this.selectedDots.contains(d,l)&&(u=!0)}if(!u){if(await w(300),this.updateScoreAndReset(),this.mode===c.AI&&this.turn===1){let r=M(this.grid).head;for(;r;){const d=document.querySelector(`.dot[data-row="${r.row}"][data-col="${r.col}"]`);this.updateUi(d,r.row,r.col),await w(300),r=r.next}this.updateScoreAndReset()}return}}else if(this.lastSelectedDot){await w(300),this.removeSelectedDots(!1),this.selectedDots=new m;return}this.lastSelectedDot={row:e,col:s,color:i}}updateScoreAndReset(){this.updateScore(this.selectedDots.length),this.removeSelectedDots(),this.updateTurn(),this.selectedDots=new m}updateScore(t){this.turn===0?(this.score[0]+=t,this.scoreDisplayP1.textContent=this.score[0],this.score[0]>=100&&(alert(`${this.mode===c.AI?"You win!":"Player 1 wins!"}`),this.resetUI())):(this.score[1]+=t,this.scoreDisplayP2.textContent=this.score[1],this.score[1]>=100&&(alert(`${this.mode===c.AI?"AI":"Player 2"} wins!`),this.resetUI()))}removeSelectedDots(t=!0){let i=this.selectedDots.head;for(;i!==null;){const e=document.querySelector(`.dot[data-row="${i.row}"][data-col="${i.col}"]`);e.classList.remove("selected"),t&&this.replaceWithRandomColor(e,i),i=i.next}this.lastSelectedDot=null}replaceWithRandomColor(t,i){const e=this.getRandomColor();t.dataset.color=e,this.grid[i.row][i.col]=e}resetGame(){this.resetUI(),this.generateGrid()}}new v;
