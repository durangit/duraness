import Page from "../../src/interfaces/ui/pages/Page.js";

class PageMock extends Page {
	constructor() {
		super(new URL('../../src/interfaces/ui/pages/example/.', import.meta.url));
	}

	setAfterRender(fn) {
		this.afterRender = fn; 
	}
}

export default new PageMock();