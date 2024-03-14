class DarkModeControl {
	constructor(_element, _isDarkMode = false) {
		const logo = document.querySelector(`img.logo`);

		const _setDarkMode = isDarkMode => {
			_element.checked = isDarkMode;
			logo.src = isDarkMode ? `img/logomarca-dark.png` : `img/logomarca.png`;
		};

		_element.onchange = event => {
			_setDarkMode(event.target.checked);
		};

		_setDarkMode(!!_isDarkMode);

		this.setDarkMode = _setDarkMode;
	}
}

window.onload = function () {
	const oDarkModeControl = new DarkModeControl(document.querySelector(`input[class="dark-mode"]`), true);
};