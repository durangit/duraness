export default class Page {
	#templateUrl;

	constructor(metaUrl) {
		this.#templateUrl = new URL('./template.html', metaUrl);
	}

	getTemplateUrl() {
		return this.#templateUrl;
	}
}