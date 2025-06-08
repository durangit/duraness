export default class Page {
	#templateUrl;

	constructor(metaUrl) {
		this.#templateUrl = new URL('./template.html', metaUrl);
	}

	getTemplateUrl() {
		return this.#templateUrl;
	}

	defineComponent({ tagName, component }) {
		customElements.get(tagName) || customElements.define(tagName, component);
	}
}