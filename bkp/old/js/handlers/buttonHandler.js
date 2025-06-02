export default class ButtonHandler {
	#handler;

	constructor(_handler) {
		this.#handler = _handler;
		this.#handler.createEvent(`click`);

		this.#handler.getElement().addEventListener(`click`, () => this.click());
	}

	subscribe(_eventName, _function) {
		this.#handler.subscribe(_eventName, _function);
	}

	click() {
		this.#handler.notify(`click`);
	}
}