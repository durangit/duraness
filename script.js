import HandlerMap from "./js/core/handlerMap.js";
import HandlerIdentified from "./js/core/handlerIdentified.js";
import Handler from "./js/core/handler.js";
import CheckboxHandler from "./js/handlers/checkboxHandler.js";
import ButtonHandler from "./js/handlers/buttonHandler.js";
import ImageHandler from "./js/handlers/imageHandler.js";
import LogoHandler from "./js/handlers/logoHandler.js";
import DarkModeController from "./js/controllers/darkModeController.js";

window.onload = function () {
	const elementList = new HandlerMap([
		new HandlerIdentified(`logo-img`, new LogoHandler(new ImageHandler(new Handler(`img.logo`)))),
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