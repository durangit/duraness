import sFetch from "../service/s-fetch.js";

export default class wComponent extends HTMLElement {
	#style;
	#template;
	#dom;
	#slot;
	#props;
	#moduleUrl;

	constructor(build, moduleUrl) {
		if (!build || typeof build !== 'function') {
			throw new Error('A build function must be provided to the component constructor.');
		}

		super();
		this.attachShadow({ mode: 'open' });
		this.#style = document.createElement('style');
		this.#dom = document.createElement('div');
		this.#slot = document.createElement('slot');

		if (moduleUrl) {
			this.#moduleUrl = moduleUrl;
			this.#importStyle();
		}

		build(this);

		this.shadowRoot.append(this.#style, this.#dom);
	}

	#importStyle() {
		const loadCss = css => {
			this.setStyle(css);
		};

		sFetch.file(new URL('./style.css', this.#moduleUrl), loadCss);
	}

	async #importTemplate() {
		const loadTemplate = html => {
			this.#template = html;
		};

		await sFetch.file(new URL('./template.html', this.#moduleUrl), loadTemplate);
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

	getDOM() {
		return this.#dom;
	}
	
	setProps(props) {
		if (typeof props !== 'object') {
			throw new Error('Props must be an object.');
		}	

		this.#props = props;
	}

	async useTemplate(props = {}) {
		if (!this.#template) {
			const x = await this.#importTemplate();
		}

		this.setProps(props);

		const clone = document.createElement('template');
		clone.innerHTML = this.#props
			? this.#template.replace(/{{(.*?)}}/g, (_, key) => this.#props[key.trim()] || '').trim()
			: this.#template;

		this.append(clone.content.cloneNode(true));
		return this.#dom;
	}
}