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

class Handler {
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


class CheckboxHandler extends Handler {
	constructor(_DOMElement) {
		super(_DOMElement, [`change`]);
	}

	check() {
		this.getElement().setAttribute('checked', null);
		this.getElement().checked = true;
		this.notify(`change`);
		
	}

	uncheck() {
		this.getElement().removeAttribute('checked');
		this.getElement().checked = false;
		this.notify(`change`);
	}

	isChecked() {
		return this.getElement().hasAttribute(`checked`);
	}

	toggle() {
		if (this.isChecked()) {
			this.uncheck();
		} else {
			this.check();
		}
	}
}

class ImageHandler extends Handler {
	constructor(_DOMElement) {
		super(_DOMElement, [`change`, `click`]);
	}

	setPath(_path) {
		this.getElement().src = _path;
		this.notify(`change`);
	}
}

class DarkModeController {
	#checkboxHadler;
	#logo;

	constructor(_elementsList) {
		this.#checkboxHadler = new CheckboxHandler(_elementsList.get(`dark-mode-enabled`));
		this.#logo = new ImageHandler(_elementsList.get(`logo-img`));

		this.#checkboxHadler.subscribe(`change`, () => this.#onChange());

		_elementsList.get(`dark-mode-control`).addEventListener(`click`, () => this.#checkboxHadler.toggle());
	}

	#onChange() {
		if (this.#checkboxHadler.isChecked()) {
			this.#logo.setPath(`img/logomarca-dark.png`);
		} else {
			this.#logo.setPath(`img/logomarca.png`);
		}
	}

	enable() {
		this.#checkboxHadler.check();
	}

	disable() {
		this.#checkboxHadler.uncheck();
	}
}

window.onload = function () {
	const elementsList = new ElementsList([
		new DOMElement(`logo-img`, `img.logo`),
		new DOMElement(`dark-mode-enabled`, `input#dark-mode-enabled`),
		new DOMElement(`dark-mode-control`, `div.dark-mode-control`)
	]);
	
	const test = () => {
		const darkMode = new DarkModeController(elementsList);
		darkMode.enable();
	};

	setTimeout(test, 1000);
	
	// console.warn(`no implementation yet`);
};