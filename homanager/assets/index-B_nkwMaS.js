(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();class f{async render(t,e){throw new Error("Not implemented")}}class x extends f{#t;#e;constructor({templateParser:t,pageBuilder:e}){super(),this.#t=t,this.#e=e}async render(t){const e=await this.#e.build(),r=this.#t.toDOM(e);return t.appendChild(r),await this.#e.afterRender(t),t}}class y{async get(t){throw new Error("Not implemented")}async set(t,e){throw new Error("Not implemented")}async has(t){throw new Error("Not implemented")}async delete(t){throw new Error("Not implemented")}async clear(){throw new Error("Not implemented")}}class b extends y{#t=new Map;get(t){return this.#t.get(t)}set(t,e){this.#t.set(t,e)}has(t){return this.#t.has(t)}delete(t){return this.#t.delete(t)}clear(){this.#t.clear()}}class v{async load(t,e){throw new Error("Not implemented")}}class T extends v{#t=new Map;#e;constructor({cacheControl:t}){super(),t||console.error("FetchSourceLoader requires a cacheControl instance"),this.#e=t}async load(t,e){if(this.#e.has(t)){const r=this.#e.get(t);return e(r),r}return this.#n(t,e),await this.#s(t)}#r(t){return t.ok?t.text():null}#n(t,e){this.#t.has(t)||this.#t.set(t,{promise:fetch(t).then(this.#r),callbacks:[]}),e&&this.#t.get(t).callbacks.push(e)}async#s(t){const e=this.#t.get(t),r=await e.promise;if(!this.#e.has(t)){this.#e.set(t,r);for(const n of e.callbacks)n(r);this.#t.delete(t)}return r}}class E{async toDOM(t){throw new Error("Not implemented")}}class C extends E{toDOM(t){const e=document.createElement("template");return e.innerHTML=t,e.content.cloneNode(!0)}}class k{async create(t,e){throw new Error("Not implemented")}async read(t,e){throw new Error("Not implemented")}async update(t,e){throw new Error("Not implemented")}async delete(t,e){throw new Error("Not implemented")}async all(t){throw new Error("Not implemented")}}class m extends k{#t=new Map;create(t,e){this.#t.has(t)||this.#t.set(t,new Map),this.#t.get(t).set(e.id,e)}read(t,e){return this.#t.get(t).get(e)}update(t,e){this.#t.get(t).set(e.id,e)}delete(t,e){this.#t.get(t).delete(e)}all(t){return this.#t.get(t)}}const M=new b,D=new T({cacheControl:M}),P=new C,S=new m;class L{async build(){throw new Error("Not implemented")}async afterRender(){throw new Error("Not implemented")}}class A{#t;#e;#r;#n;#s;#a;#o;constructor(t){this.#t=t.title,this.#e=t.creation,this.#r=t.target,this.#n=t.tag,this.#s=t.priority,this.#a=t.user,this.#o=t.size}getTitle(){return this.#t}getCreation(){return this.#e}getTarget(){return this.#r}getTag(){return this.#n}getPriority(){return this.#s}getUser(){return this.#a}getSize(){return this.#o}}class R{#t;constructor({dataPersistence:t}){this.#t=t}async save(t,e){(await this.#t.all(t))?.has(e.id)?this.#t.update(t,e):this.#t.create(t,e)}async getAll(){return Object.fromEntries(["cardsToPlan","cardsToDo","cardsToDoing","cardsToDone"].map(t=>[t,this.#t.all(t)]))}}class g{#t;constructor({dataPersistence:t}){this.#t=new R({dataPersistence:t})}createElement(t,e){const r=document.createElement(t),n=new A(e);return r.setAttribute("title",n.getTitle()),r.setAttribute("creation",n.getCreation()),r.setAttribute("target",n.getTarget()),r.setAttribute("tag",n.getTag()),r.setAttribute("priority",n.getPriority()),r.setAttribute("user",n.getUser()),r.setAttribute("size",n.getSize()),r}generateRandomProps(){const t=new Date().getTime(),e=new Date(2025,0,1).getTime(),r=new Date(2025,11,1).getTime(),n=new Date(Math.floor(Math.random()*(e-t+1))+t),a=new Date(Math.floor(Math.random()*(t-r+1))+r);return{title:`Card ${Math.floor(Math.random()*1e3)}`,creation:n.toISOString().split("T")[0],target:a.toISOString().split("T")[0],tag:`Tag ${Math.floor(Math.random()*10)}`,priority:Math.floor(Math.random()*5)+1,user:Math.floor(Math.random()*10)%2===0?"Duran":"Bia",size:Math.floor(Math.random()*10)}}persist(t,e){this.#t.save(t,e)}async getStorage(){return await this.#t.getAll()}}let N=class extends L{#t=new URL("/homanager/assets/home-CMe6XGZC.html",import.meta.url);#e;#r;#n;#s;#a;constructor({sourceLoader:t,data:e,DOMHandler:r,dataPersistence:n}){super(),this.#e=t,this.#r=e,this.#n=r,this.#a=new g({dataPersistence:n})}async build(){return await this.#e.load(this.#t)}async afterRender(t){this.#n.build(t),this.#s=this.#n.export();const e=this.#r?.getData();await this.#o(e),await this.#i(e)}async#o(t){for(const e in t)t[e].forEach(async r=>{r.id=r.title,await this.#a.persist(e,r)})}async#i(){const t={cardsToPlan:"plan",cardsToDo:"do",cardsToDoing:"doing",cardsToDone:"done"},e=await this.#a.getStorage();console.log(e);for(const r in e)(await e[r]).forEach(a=>{this.#s?.addCard&&this.#s.addCard(t[r],this.#a.createElement("wc-card",a))})}};class H{async build(t){throw new Error("Not implemented")}async export(){throw new Error("Not implemented")}}class c{static#t=new Map;static get(t){return this.#t.get(t)}static set(t,e){this.#t.set(t,e)}static has(t){return this.#t.has(t)}static delete(t){return this.#t.delete(t)}static clear(){this.#t.clear()}}class u{static#t=new Map;static async file(t,e){if(c.has(t)){e(c.get(t));return}this.addCallbackQueue(t,e),await this.#r(t)}static#e(t){return t.ok?t.text():null}static addCallbackQueue(t,e){this.#t.has(t)||this.#t.set(t,{promise:fetch(t).then(this.#e),callbacks:[]}),this.#t.get(t).callbacks.push(e)}static async#r(t){const e=this.#t.get(t),r=await e.promise;if(!c.has(t)){c.set(t,r);for(const n of e.callbacks)n(r);this.#t.delete(t)}}}let d=class extends HTMLElement{#t;#e;#r;#n;#s;#a;#o;constructor(t,e){if(!t||typeof t!="function")throw new Error("A build function must be provided to the component constructor.");super(),this.attachShadow({mode:"open"}),this.#t=document.createElement("style"),this.#r=document.createElement("div"),this.#n=document.createElement("slot"),this.#o=t,this.#a=e}connectedCallback(){this.#a&&this.#i(),this.#o(this),this.shadowRoot.append(this.#t,this.#r)}#i(){const t=e=>{this.setStyle(e)};u.file(new URL("./style.css",this.#a),t)}async#l(){const t=e=>{this.#e=e};await u.file(new URL("./template.html",this.#a),t)}setStyle(t){this.#t.textContent=t}append(t){this.#r.appendChild(t)}setClass(t){this.#r.classList.add(t)}getContent(){return this.#n}getDOM(){return this.#r}setProps(t){if(typeof t!="object")throw new Error("Props must be an object.");this.#s=t}async useTemplate(t={}){this.#e||await this.#l(),this.setProps(t);const e=document.createElement("template");return e.innerHTML=this.#s?this.#e.replace(/{{(.*?)}}/g,(r,n)=>this.#s[n.trim()]||"").trim():this.#e,this.append(e.content.cloneNode(!0)),this.#r}};class O extends d{constructor(){super(t=>{const e=document.createElement("div");t.setStyle(`
                #viewport {
                    --padding: var(--xl-number);

                    width: 100vw;
                    height: 100vh;
                    box-sizing: border-box;
                    overflow: hidden;
                    touch-action: none;
                    scroll-behavior: smooth;
                    background-color: var(--white);

                    & .track {
                        width: calc((100vw * var(--thread-number)));
                        height: 100%;
                        display: flex;
                    }
                }
            `),e.classList.add("track"),e.appendChild(t.getContent()),t.getDOM().setAttribute("id","viewport"),t.append(e)})}}class q extends d{constructor(){super(t=>{const e=t.getDOM();let r=0;const n=i=>{e.style.scrollBehavior="unset",e.scrollTo({top:Math.max(0,e.scrollTop+i.deltaY)}),e.style.scrollBehavior="smooth"},a=i=>{r=i.touches[0].clientY},l=i=>{r=0},w=i=>{const p=i.touches[0].clientY;e.style.scrollBehavior="unset",e.scrollTo({top:Math.max(0,e.scrollTop+(r-p))}),e.style.scrollBehavior="smooth",r=p};t.setStyle(`
                .thread {
                    width: 100vw;
                    height: 100%;
                    overflow: hidden;
                    scroll-behavior: smooth;
                }
            `),t.setClass("thread"),t.append(t.getContent()),e.addEventListener("wheel",n),e.addEventListener("touchstart",a),e.addEventListener("touchend",l),e.addEventListener("touchmove",w)})}}class z extends d{constructor(){super(t=>{const e=t.getAttribute("name");t.setStyle(`
                .container {
                    padding: var(--padding);
                    margin-bottom: var(--footer-size);
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
            `),e&&t.setAttribute("id",e),t.setClass("container"),t.append(t.getContent())})}}class B extends d{constructor(){super(t=>{const e=t.getAttribute("title"),r=document.createElement("header"),n=document.createElement("h1");t.setStyle(`
                .wrapper {
					width: 100%;
					margin: var(--padding) 0;

                    & h1 {
                        margin: 0;
                        text-transform: capitalize;
                    }
				}
            `),e&&(n.textContent=e,r.appendChild(n),t.append(r)),t.setClass("wrapper"),t.append(t.getContent())})}}class h extends HTMLElement{#t;#e;#r;#n;#s;constructor({template:t,style:e,props:r,init:n,name:a}){super(),this.attachShadow({mode:"open"}),this.#t=t,this.#e=e,this.#r=r||[],this.#n=a,this.#s=n}async connectedCallback(){await this.#a(),this.dispatchEvent(new CustomEvent("ready"))}async#a(){const t=document.createElement("style");t.textContent=this.#e;const e=document.createElement("template");e.innerHTML=this.#r?this.#t.replace(/{{(.*?)}}/g,(n,a)=>this.#r[a.trim()]||"").trim():this.#t;const r=document.createElement("div");r.classList.add(this.#n),r.appendChild(e.content.cloneNode(!0)),await this.#s(r),this.shadowRoot.append(t,r),this.onReady(r)}onReady(){}}const $=`<nav>\r
	<ul>\r
		<li link="add">\r
			<span>&#x2b;</span> New\r
		</li>\r
		<li link="plan">\r
			<span>&#xf5ae;</span> Planning\r
		</li>\r
		<li link="do">\r
			<span>&#xf5fd;</span> Backlog\r
		</li>\r
		<li link="doing">\r
			<span>&#xf807;</span> Working\r
		</li>\r
		<li link="done">\r
			<span>&#xf00c;</span> Finished\r
		</li>\r
		<li link="home">\r
			<span>&#xf015;</span> Home\r
		</li>\r
	</ul>\r
</nav>`,I=`.icon-bar {\r
	width: 100%;\r
	height: var(--footer-size);\r
	box-sizing: border-box;\r
	padding: 10px;\r
	position: fixed;\r
	bottom: 0;\r
	background-color: var(--white);\r
	box-shadow: inset 0 1px 0 var(--white-shadow),\r
				inset 0 2px 2px var(--white-grow);\r
\r
	& ul {\r
		list-style: none;\r
		width: 100%;\r
		height: 100%;\r
		margin: 0;\r
		padding: 0;\r
		display: flex;\r
		flex-direction: row;\r
		align-items: center;\r
		justify-content: space-between;\r
\r
		& li {\r
			width: 50px;\r
			height: 50px;\r
			border-radius: var(--radius);\r
			background-color: var(--white);\r
			box-shadow: -1px -1px 3px var(--white-grow),\r
						1px 1px 3px var(--white-shadow);\r
			box-sizing: border-box;\r
			display: flex;\r
			justify-content: center;\r
			align-items: center;\r
			color: var(--grey);\r
			font-size: 0;\r
			cursor: pointer;\r
\r
			& span {\r
				font-family: 'Icon';\r
				font-size: 1.5rem;\r
			}\r
		}\r
	}\r
}`;let j=class extends h{constructor(){super({name:"icon-bar",template:$,style:I,init:t=>{t.querySelectorAll("li[link]").forEach(e=>{e.addEventListener("click",r=>{F(r,e.getAttribute("link"))})})}})}};function F(s,t){s.preventDefault();const e=document.getElementById(t);e&&e.scrollIntoView({behavior:"smooth",inline:"start",block:"nearest"})}const W=`<form novalidate>\r
	<div class="select">\r
		<select name="tag" aria-required="true" required>\r
			<option value="" disabled selected>Selecione uma tag</option>\r
			<option value="spike">Aprender</option>\r
			<option value="propose">Propor</option>\r
			<option value="decide">Decidir</option>\r
			<option value="buy">Comprar</option>\r
			<option value="build">Montar</option>\r
			<option value="fix">Consertar</option>\r
			<option value="change">Mudar</option>\r
			<option value="chore">Tarefa</option>\r
			<option value="clean">Limpar</option>\r
		</select>\r
	</div>\r
    <input type="text" name="title" placeholder="Título" aria-required="true" required />\r
    <fieldset class="radio-group" aria-required="true">\r
        <legend>Responsavel</legend>\r
\r
        <input type="radio" name="user" id="bia" value="bia" required />\r
        <label for="bia">Bia</label>\r
\r
        <input type="radio" name="user" id="duran" value="duran" />\r
        <label for="duran">Duran</label>\r
    </fieldset>\r
    <input type="datetime" name="target" placeholder="Data" />\r
    <input type="number" name="priority" placeholder="Prioridade (1-5)" min="1" max="5" />\r
    <button type="submit">Adicionar</button>\r
</form>`,U=`form {\r
	display: flex;\r
	flex-direction: column;\r
	gap: 1rem;\r
	margin-top: var(--padding);\r
\r
	& input,\r
	& select {\r
		font-size: inherit;\r
		appearance: none;\r
		padding: 15px;\r
		border: none;\r
		border-radius: var(--radius);\r
		background-color: var(--white);\r
		box-shadow: inset 2px 2px 5px var(--white-shadow),\r
					inset -2px -2px 5px var(--white-grow);\r
\r
		&.invalid {\r
			outline: 1px solid red;\r
		}\r
	}\r
\r
	& .select {\r
		width: 100%;\r
		position: relative;\r
\r
		& select {\r
			width: 100%;\r
		}\r
\r
		&:after {\r
			content: "▼";\r
			position: absolute;\r
			right: 15px;\r
			top: 50%;\r
			transform: translateY(-50%);\r
			pointer-events: none;\r
		}\r
	}\r
\r
	& .radio-group {\r
		display: flex;\r
		flex-direction: column;\r
		gap: 10px;\r
		border: none;\r
		padding: 15px;\r
		margin: 0;\r
\r
		& input {\r
			display: none;\r
\r
			&:checked + label:before {\r
				box-shadow: inset 2px 2px 5px var(--white-shadow),\r
							inset -2px -2px 5px var(--white-grow);\r
			}\r
		}\r
\r
		& label {\r
			display: flex;\r
			align-items: center;\r
\r
			&:before {\r
				content: '';\r
				position: relative;\r
				width: 25px;\r
				height: 25px;\r
				margin-right: 10px;\r
				display: flex;\r
				border-radius: 50%;\r
				cursor: pointer;\r
				box-shadow:	-2px -2px 5px var(--white-grow),\r
							2px 2px 5px var(--white-shadow);\r
			}\r
		}\r
\r
		&.invalid {\r
			& label:before {\r
				outline: 1px solid red;\r
			}\r
		}\r
	}\r
\r
	& button {\r
		height: 50px;\r
		border: none;\r
		border-radius: var(--radius);\r
		background-color: var(--white);\r
		box-shadow: -2px -2px 5px var(--white-grow),\r
					2px 2px 5px var(--white-shadow);\r
		font-size: inherit;\r
	}\r
}`;class Q extends h{constructor(){super({template:W,style:U,init:t=>{const e=t.querySelector("form");e.addEventListener("submit",r=>{const n=e.querySelectorAll("[aria-required=true]");for(const a of n)a.classList.toggle("invalid",a.matches(":invalid"));e.querySelectorAll(".invalid").length&&r.preventDefault()})}})}}const Y=`<div class="props">\r
    <p><span>&#xf133;</span> {{creation}}</p>\r
    <p>{{target}} <span>&#xf140;</span></p>\r
    <p><span>&#xf02b;</span> {{tag}}</p>\r
    <p>{{priority}} <span>&#xf7e4;</span></p>\r
    <p><span>&#xf007;</span> {{user}}</p>\r
    <p>{{size}} <span>&#xf548;</span></p>\r
</div>\r
<h1>{{title}}</h1>\r
<div class="action-bar">\r
    <div class="button">&#xf06e;</div>\r
    <div class="button">&#xf807;</div>\r
</div>`,_=`.card {\r
    width: 100%;\r
    margin-top: var(--padding);\r
    display: flex;\r
    flex-direction: column;\r
    padding: var(--padding);\r
    box-sizing: border-box;\r
    border-radius: var(--radius);\r
    box-shadow: -4px -4px 8px -2px var(--white-grow),\r
                4px 4px 8px -2px var(--white-shadow);\r
\r
    & .props {\r
        display: flex;\r
        flex-wrap: wrap;\r
\r
        & p {\r
            width: 50%;\r
\r
            &:nth-child(even) {\r
                text-align: right;\r
            }\r
\r
            & span {\r
                font-family: 'Icon';\r
            }\r
        }\r
    }\r
\r
    & .action-bar {\r
        width: 100%;\r
        margin-top: var(--padding);\r
        display: flex;\r
        flex-direction: row;\r
        justify-content: space-between;\r
\r
        & .button {\r
            width: 50px;\r
            height: 50px;\r
            border-radius: var(--radius);\r
            background-color: var(--white);\r
            box-shadow: -1px -1px 3px var(--white-grow),\r
                        1px 1px 3px var(--white-shadow);\r
            box-sizing: border-box;\r
            display: flex;\r
            justify-content: center;\r
            align-items: center;\r
            color: var(--grey);\r
            font-family: 'Icon';\r
            font-size: 1.5rem;\r
            cursor: pointer;\r
        }\r
    }\r
}`;class V extends h{constructor(){super({name:"card",template:Y,style:_,init:t=>{const e=t.querySelectorAll("p")[0],r=t.querySelectorAll(".button")[0],n=t.querySelectorAll(".button")[1];r.addEventListener("click",()=>{console.log(`Open ${e.textContent} clicked`)}),n.addEventListener("click",()=>{console.log(`Play ${e.textContent} clicked`)})}})}}let G=class extends H{#t={};build(t){const e={"wc-screen":O,"wc-thread":q,"wc-container":z,"wc-wrapper":B,"wc-icon-bar":j,"wc-add-form":Q,"wc-card":V};for(const n in e){const a=e[n];customElements.get(n)||customElements.define(n,a)}const r=t.querySelectorAll("wc-wrapper");this.#t.wrapper={plan:r[1],do:r[2],doing:r[3],done:r[4]}}export(){return{addCard:this.#e.bind(this),getCards:this.#r.bind(this)}}#e(t,e){this.#t.wrapper[t].appendChild(e)}#r(t){return this.#t.wrapper[t].querySelectorAll("wc-card")}};class K{#t;#e;#r;#n;constructor({cardsToPlan:t,cardsToDo:e,cardsToDoing:r,cardsToDone:n}={}){this.#t=t||[],this.#e=e||[],this.#r=r||[],this.#n=n||[]}getData(){return{cardsToPlan:this.#t,cardsToDo:this.#e,cardsToDoing:this.#r,cardsToDone:this.#n}}}const o=new g({dataPersistence:new m}),X=new K({cardsToPlan:[o.generateRandomProps(),o.generateRandomProps()],cardsToDo:[o.generateRandomProps(),o.generateRandomProps(),o.generateRandomProps(),o.generateRandomProps(),o.generateRandomProps()],cardsToDoing:[o.generateRandomProps()],cardsToDone:[o.generateRandomProps(),o.generateRandomProps(),o.generateRandomProps()]}),Z=new G,J=X,tt=s=>{const t={data:J,DOMHandler:Z};return new N({...t,...s})},et=Object.keys({});document.addEventListener("DOMContentLoaded",async()=>{await new x({templateParser:P,pageBuilder:tt({sourceLoader:D,dataPersistence:S})}).render(document.body),"serviceWorker"in navigator&&navigator.serviceWorker.register("/homanager/service-worker.js").then(t=>{console.log("Service worker registered.",t),navigator.serviceWorker.ready.then(()=>{t.active?.postMessage({type:"ASSET_LIST",payload:et})})})});
