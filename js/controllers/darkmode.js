import CheckboxHandler from "../handlers/checkbox.js";
import ButtonHandler from "../handlers/button.js";
import ImageHandler from "../handlers/image.js";

export default class DarkModeController {
	#control;
	#button;
	#logo;

	constructor(_elementList) {
		this.#control = new CheckboxHandler(_elementList.get(`dark-mode-control`));
		this.#button = new ButtonHandler(_elementList.get(`dark-mode-button`));
		this.#logo = new ImageHandler(_elementList.get(`logo-img`));

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