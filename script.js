class DOMElement {
	constructor(_name, _selector) {
		this.id = _name;
		this.dom = document.querySelector(`${_selector}`);
	}
}

class ElementsList {
	constructor(_elements = []) {
		this.elements = [];

		_elements.forEach(element => {
			this.elements[element.id] = element.dom;
		})
	}

	get(_elementId) {
		return this.elements[_elementId];
	}

	set(_element) {
		this.elements[_element.id] = _element.dom;
	}
}

class Event {
	#name;
	#function;

	constructor(_name, _function = () => {}) {
		this.#name = _name;
		this.#function = _function;
	}

	getName() {
		return this.#name;
	}

	fireEvent() {
		this.#function();
	}
}

class Handler {
	#events = [];

	constructor(_events = []) {
		_events.forEach(event => {
			this.#events[event.getName()] = event;
		})
	}

	get(name) {
		return this.#events[name];
	}
}

class DarkModeHandler extends Handler {
	#enabled = false;
	#enabler;
	#logo;

	constructor(_elementsList) {
		super();

		this.#enabler = _elementsList.get(`is-dark-mode`);
		this.#logo = _elementsList.get(`logo-img`);
		
		this.#create();
	}

	#create() {
		this.#enabler.addEventListener(`change`, this.onChange);
	}

	setEnabled(isEnabled) {
		this.#enabled = isEnabled;
		this.onChange();
	}

	onChange() {
		this.#enabler.checked = this.#enabled;
		this.#logo.src = this.#enabled ? `img/logomarca-dark.png` : `img/logomarca.png`;
	}
}

class DarkModeController {
	#handler;

	constructor(_elementsList, _isDarkMode = false) {
		this.#handler = new DarkModeHandler(_elementsList);
	}

	set(isDarkMode) {
		this.#handler.setEnabled(isDarkMode);
	}

}

window.onload = function () {
	const elementsList = new ElementsList([
		new DOMElement(`logo-img`, `img.logo`),
		new DOMElement(`is-dark-mode`, `input[class="dark-mode"]`)
	]);

	const darkMode = new DarkModeController(elementsList);
	darkMode.set(true);
	//const darkModeControl = new DarkModeController(DarkModeHandler, elementsList);
	//darkModeControl.setDarkMode(true);
};