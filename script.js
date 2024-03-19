import HandlerMap from "./js/core/handlerMap.js";
import HandlerIdentified from "./js/core/handlerIdentified.js";
import Handler from "./js/core/handler.js";
import CheckboxHandler from "./js/handlers/checkboxHandler.js";
import ButtonHandler from "./js/handlers/buttonHandler.js";
import LogoHandler from "./js/handlers/logoHandler.js";
import ColorPickerHandler from "./js/handlers/colorPickerHandler.js";
import DarkModeController from "./js/controllers/darkModeController.js";
import ColorController from "./js/controllers/colorController.js";

window.onload = function () {
	const test = async () => {
		const elementList = new HandlerMap([
			new HandlerIdentified(`logo`, new LogoHandler(new Handler(`svg.logo`))),
			new HandlerIdentified(`logo`, new LogoHandler(new Handler(`svg.logo`))),
			new HandlerIdentified(`dark-mode-control`, new CheckboxHandler(new Handler(`input#dark-mode-control`))),
			new HandlerIdentified(`dark-mode-button`, new ButtonHandler(new Handler(`div.dark-mode-button`))),
			new HandlerIdentified(`color-picker-duran`, new ColorPickerHandler(new Handler(`div#color-picker-duran`))),
			new HandlerIdentified(`color-picker-ness`, new ColorPickerHandler(new Handler(`div#color-picker-ness`))),
			new HandlerIdentified(`color-picker-leaf`, new ColorPickerHandler(new Handler(`div#color-picker-leaf`))),
			new HandlerIdentified(`color-picker-fruit`, new ColorPickerHandler(new Handler(`div#color-picker-fruit`))),
		]);
	
		const darkMode = new DarkModeController(elementList);
		const color = new ColorController(elementList);
	
		const createPromise = action => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					try {
						action();
					} catch {
						return reject('failed');
					}

					return resolve('tested');
				}, 1000);
			}).then(data => {
				console.log(data);
			});
		};

		await createPromise(() => {
			elementList.get(`color-picker-duran`).setColor(`#111111`);
			elementList.get(`color-picker-ness`).setColor(`#b43528`);
			elementList.get(`color-picker-leaf`).setColor(`#00906a`);
			elementList.get(`color-picker-fruit`).setColor(`#b43528`);
		 }); // Set Colors
	};

	setTimeout(test, 1000);
	
	// console.warn(`no implementation yet`);
};