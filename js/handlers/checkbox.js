import Handler from "../core/handler.js";

export default class CheckboxHandler extends Handler {
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