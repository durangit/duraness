export default class Handler {
	#element;
	#events = [];

	constructor(_DOMElement, _eventsName = []) {
		this.#element = _DOMElement;

		_eventsName.forEach(eventName => {
			this.#events[eventName] = [];
		});
	}

	getElement() {
		return this.#element;
	}

	subscribe(_eventName, _function) {
		if (this.#events[_eventName]) {
			this.#events[_eventName].push(_function);
		} else {
			console.error(`Event doesn't exist`);
		}
	}

	notify(_eventName) {
		if (this.#events[_eventName]) {
			this.#events[_eventName].forEach(func => {
				func();
			});
		} else {
			console.error(`Event doesn't exist`);
		}
	}
}