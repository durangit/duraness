export default class HandlerMap {
	#handlers;

	constructor(_handlers = []) {
		this.#handlers = [];

		_handlers.forEach(handler => {
			this.#handlers[handler.getId()] = handler.getHandler();
		})
	}

	get(_handlerId) {
		if (!this.#handlers[_handlerId]) {
			console.error(`Handler doesn't exist`);
			return undefined;
		} else { 
			return this.#handlers[_handlerId];
		}
	}
}