import WebRenderer from '../../application/ports/outputs/WebRenderer.js';

export default class BrowserRenderer extends WebRenderer {
	#templateParser;
	#pageBuilder;

	constructor({ templateParser, pageBuilder }) {
		super();
		this.#templateParser = templateParser;
		this.#pageBuilder = pageBuilder;
	}

	async render(container) {
		const template = await this.#pageBuilder.build();
		const dom = this.#templateParser.toDOM(template);

		container.appendChild(dom);
		this.#pageBuilder.afterRender(container);
		return container;
	}
}