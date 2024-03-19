export default class ColorController {
	#colorPickerDuran;
	#colorPickerNess;
	#colorPickerLeaf;
	#colorPickerFruit;
	#logo;

	constructor(_handlerMap) {
		this.#colorPickerDuran = _handlerMap.get(`color-picker-duran`);
		this.#colorPickerNess = _handlerMap.get(`color-picker-ness`);
		this.#colorPickerLeaf = _handlerMap.get(`color-picker-leaf`);
		this.#colorPickerFruit = _handlerMap.get(`color-picker-fruit`);
		this.#logo = _handlerMap.get(`logo`);

		this.#colorPickerDuran.subscribe(`change`, () => this.#colorPickerDuranChange());
		this.#colorPickerNess.subscribe(`change`, () => this.#colorPickerNessChange());
		this.#colorPickerLeaf.subscribe(`change`, () => this.#colorPickerLeafChange());
		this.#colorPickerFruit.subscribe(`change`, () => this.#colorPickerFruitChange());
	}

	#colorPickerDuranChange() {
		this.#logo.setDuran(this.#colorPickerDuran.getColor());
	}

	#colorPickerNessChange() {
		this.#logo.setNess(this.#colorPickerNess.getColor());
	}

	#colorPickerLeafChange() {
		this.#logo.setLeaf(this.#colorPickerLeaf.getColor());
	}

	#colorPickerFruitChange() {
		this.#logo.setFruit(this.#colorPickerFruit.getColor());
	}
}