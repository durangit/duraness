export default class ColorPickerHandler {
	#handler;
	#input;

	constructor(_handler) {
		this.#handler = _handler;
		this.#input = this.#handler.getElement().querySelector(`input`);
		this.#handler.createEvent(`click`);
		this.#handler.createEvent(`change`);

		this.#handler.getElement().addEventListener(`click`, () => this.click());
		this.#input.addEventListener(`change`, () => this.#change());
	}

	subscribe(_eventName, _function) {
		this.#handler.subscribe(_eventName, _function);
	}

	#change() {
		this.#handler.getElement().style.backgroundColor = this.getColor();
		this.#handler.notify(`change`);
	}

	click() {
		this.#input.click();
		this.#handler.notify(`click`);
	}

	getColor() {
		return this.#input.value;
	}

	setColor(_color) {
		this.#input.value = _color;
		this.#change();
	}
}