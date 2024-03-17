import HandlerMap from "./js/core/handlerMap.js";
import HandlerIdentified from "./js/core/handlerIdentified.js";
import Handler from "./js/core/handler.js";
import CheckboxHandler from "./js/handlers/checkbox.js";
import ButtonHandler from "./js/handlers/button.js";
import ImageHandler from "./js/handlers/image.js";
import DarkModeController from "./js/controllers/darkmode.js";

window.onload = function () {
	const elementList = new HandlerMap([
		new HandlerIdentified(`logo-img`, new ImageHandler(new Handler(`img.logo`))),
		new HandlerIdentified(`dark-mode-control`, new CheckboxHandler(new Handler(`input#dark-mode-control`))),
		new HandlerIdentified(`dark-mode-button`, new ButtonHandler(new Handler(`div.dark-mode-button`)))
	]);

	const darkMode = new DarkModeController(elementList);
	
	const test = () => {
		darkMode.enable();
		setInterval(() => {
			elementList;
		}, 1000);
	};

	setTimeout(test, 1000);
	
	// console.warn(`no implementation yet`);
};