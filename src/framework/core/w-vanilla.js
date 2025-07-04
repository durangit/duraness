export default class wComponent extends HTMLElement {
	#html;
	#css;
	#attr;
	#class;
	#beforeAppend;

	constructor({ template, style, props, init, name }) {
		super();
		this.attachShadow({ mode: "open" });
		this.#html = template;
		this.#css = style;
		this.#attr = props || [];
		this.#class = name;
		this.#beforeAppend = init;
	}

	async connectedCallback() {
		await this.#init();
		this.dispatchEvent(new CustomEvent("ready"));
	}

	async #init() {
		const styleEl = document.createElement('style');
		styleEl.textContent = this.#css;

		const templateEl = document.createElement('template');
		templateEl.innerHTML = this.#attr
			? this.#html.replace(/{{(.*?)}}/g, (_, key) => this.#attr[key.trim()] || '').trim()
			: this.#html;

		const domEl = document.createElement('div');
		domEl.classList.add(this.#class);
		domEl.appendChild(templateEl.content.cloneNode(true));
		await this.#beforeAppend(domEl);
		this.shadowRoot.append(styleEl, domEl);
		this.onReady(domEl);
	}

	onReady() {}
}