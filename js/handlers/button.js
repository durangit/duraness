import Handler from "../core/handler.js";

export default class ButtonHandler extends Handler {
	constructor(_DOMElement) {
		super(_DOMElement, [`click`]);

		this.getElement().addEventListener(`click`, () => this.click());
	}

	click() {
		this.notify(`click`);
	}
}