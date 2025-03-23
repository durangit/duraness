export default class wComponent extends HTMLElement {
	#style;
	#dom;
	#slot;

	constructor(build) {
		super();
		this.attachShadow({ mode: 'open' });
		this.#style = document.createElement('style');
		this.#dom = document.createElement('div');
		this.#slot = document.createElement('slot');

		build(this);

		this.shadowRoot.append(this.#style, this.#dom);
	}

	setStyle(style) {
		this.#style.textContent = style;
	}

	append(element) {
		this.#dom.appendChild(element);
	}

	setClass(className) {
		this.#dom.classList.add(className);
	}

	getContent() {
		return this.#slot;
	}

	getDom() {
		return this.#dom;
	}
}