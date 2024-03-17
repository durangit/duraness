export default class LogoHandler {
	#handler;
	#originalPath = `img/logomarca.png`
	#darkPath = `img/logomarca-dark.png`;

	constructor(_handler) {
		this.#handler = _handler;
	}

	subscribe(_eventName, _function) {
		this.#handler.subscribe(_eventName, _function);
	}

	setDarkMode(_isDarkMode) {
		if (_isDarkMode) {
			this.#handler.setPath(this.#darkPath);
		} else {
			this.#handler.setPath(this.#originalPath);
		}
	}	
}