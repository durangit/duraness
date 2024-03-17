export default class DarkModeController {
	#control;
	#button;
	#logo;

	constructor(_handlerMap) {
		this.#control = _handlerMap.get(`dark-mode-control`);
		this.#button = _handlerMap.get(`dark-mode-button`);
		this.#logo = _handlerMap.get(`logo-img`);

		this.#control.subscribe(`change`, () => this.#checkboxChange());
		this.#button.subscribe(`click`, () => this.#buttonClick());
		this.#logo.subscribe(`change`, () => this.#imageChange());
	}

	#checkboxChange() {
		if (this.#control.isChecked()) {
			this.#logo.setPath(`img/logomarca-dark.png`);
		} else {
			this.#logo.setPath(`img/logomarca.png`);
		}
	}

	#buttonClick() {
		this.#control.toggle();
	}

	#imageChange() {
		console.log('success');
	}

	enable() {
		this.#control.check();
	}

	disable() {
		this.#control.uncheck();
	}
}