export default class RenderPage {
	#sourceLoader;
	#templateRenderer;
	#afterRender;
	#dom;

	constructor({ sourceLoader, templateRenderer }) {
		this.#sourceLoader = sourceLoader;
		this.#templateRenderer = templateRenderer;
	}

	async render(page) {
		if (page.afterRender) {
			this.#afterRender = page.afterRender;
		}

		await this.#sourceLoader.load(page.getTemplateUrl(), this.#afterLoad.bind(this));
	}

	#afterLoad(template) {
		const dom = this.#templateRenderer.render(template, document.body);
		this.#dom = dom;
		this.#afterRender && this.#afterRender(dom);
	}

	getDOM() {
		return this.#dom;
	}
}