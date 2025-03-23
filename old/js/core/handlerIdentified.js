export default class HandlerIdentified {
	#id;
	#handler;

	constructor(_id, _handler) {
		this.#id = _id;
		this.#handler = _handler;
	}

	getId() {
		return this.#id;
	}

	getHandler() {
		return this.#handler;
	}
}