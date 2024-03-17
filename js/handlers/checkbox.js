export default class CheckboxHandler {
	#handler;

	constructor(_handler) {
		this.#handler = _handler;
		this.#handler.createEvent(`change`);
	}

	subscribe(_eventName, _function) {
		this.#handler.subscribe(_eventName, _function);
	}

	check() {
		this.#handler.getElement().setAttribute('checked', null);
		this.#handler.getElement().checked = true;
		this.#handler.notify(`change`);
		
	}

	uncheck() {
		this.#handler.getElement().removeAttribute('checked');
		this.#handler.getElement().checked = false;
		this.#handler.notify(`change`);
	}

	isChecked() {
		return this.#handler.getElement().hasAttribute(`checked`);
	}

	toggle() {
		if (this.isChecked()) {
			this.uncheck();
		} else {
			this.check();
		}
	}
}