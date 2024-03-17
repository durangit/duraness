import ElementMap from "./js/core/map.js";
import NamedElement from "./js/core/dom.js";
import DarkModeController from "./js/controllers/darkmode.js";

window.onload = function () {
	const elementList = new ElementMap([
		new NamedElement(`logo-img`, `img.logo`),
		new NamedElement(`dark-mode-control`, `input#dark-mode-control`),
		new NamedElement(`dark-mode-button`, `div.dark-mode-button`)
	]);
	
	const test = () => {
		const darkMode = new DarkModeController(elementList);
		darkMode.enable();
	};

	setTimeout(test, 1000);
	
	// console.warn(`no implementation yet`);
};