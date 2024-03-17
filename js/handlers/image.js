export default class ImageHandler {
	#handler;

	constructor(_handler) {
		this.#handler = _handler;
		this.#handler.createEvent(`change`);
	}

	subscribe(_eventName, _function) {
		this.#handler.subscribe(_eventName, _function);
	}

	setPath(_path) {
		this.#handler.getElement().src = _path;
		this.#handler.notify(`change`);
	}
}