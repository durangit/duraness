export default class Handler {
	#element;
	#events = [];

	constructor(_selector, _eventNames = []) {
		this.#element = document.querySelector(`${_selector}`);

		_eventNames.forEach(eventName => {
			this.#events[eventName] = [];
		});
	}

	getElement() {
		return this.#element;
	}

	createEvent(_eventName) {
		if (this.#events[_eventName]) {
			console.error(`Event already exist`);
		} else {
			this.#events[_eventName] = [];
		}
	}

	subscribe(_eventName, _function) {
		if (!this.#events[_eventName]) {
			console.error(`Event doesn't exist`);
		} else {
			this.#events[_eventName].push(_function);
		}
	}

	notify(_eventName) {
		if (!this.#events[_eventName]) {
			console.error(`Event doesn't exist`);
		} else {
			this.#events[_eventName].forEach(func => {
				func();
			});
		}
	}
}