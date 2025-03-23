export default class DarkModeController {
	#control;
	#button;
	#logo;
	#duranColorPicker;
	#nessColorPicker;

	constructor(_handlerMap) {
		this.#control = _handlerMap.get(`dark-mode-control`);
		this.#button = _handlerMap.get(`dark-mode-button`);
		this.#logo = _handlerMap.get(`logo`);
		this.#duranColorPicker = _handlerMap.get(`color-picker-duran`);
		this.#nessColorPicker = _handlerMap.get(`color-picker-ness`);

		this.#button.subscribe(`click`, () => this.#buttonClick());
		this.#logo.subscribe(`change`, () => this.#imageChange());
	}

	#buttonClick() {
		this.#control.toggle();

		const duranColor = this.#control.isChecked() ? `#eeeeee` : `#111111`;
		const nessColor = this.#control.isChecked() ? `#eeeeee` : `#3b1d14`;
		this.#duranColorPicker.setColor(duranColor);
		this.#nessColorPicker.setColor(nessColor);
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