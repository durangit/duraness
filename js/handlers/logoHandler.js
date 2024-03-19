export default class LogoHandler {
	#handler;

	constructor(_handler) {
		this.#handler = _handler;
		this.#handler.createEvent(`change`);
	}

	subscribe(_eventName, _function) {
		this.#handler.subscribe(_eventName, _function);
	}

	setDarkMode(_isDarkMode) {
		if (_isDarkMode) {
			this.#handler.getElement().classList.add(`dark`);
		} else {
			this.#handler.getElement().classList.remove(`dark`);
		}
	}

	setDuran(_color) {
		this.#handler.getElement().querySelector('g.duran').style.fill = _color;
		this.#handler.notify(`change`);
	}

	setNess(_color) {
		this.#handler.getElement().querySelector('g.ness').style.fill = _color;
		this.#handler.notify(`change`);
	}

	setLeaf(_color) {
		this.#handler.getElement().querySelector('g.leaf').style.color = _color;
		this.#handler.notify(`change`);
	}

	setFruit(_color) {
		this.#handler.getElement().querySelector('g.fruit').style.color = _color;
		this.#handler.notify(`change`);
	}
}