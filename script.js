import HandlerMap from "./js/core/handlerMap.js";
import HandlerIdentified from "./js/core/handlerIdentified.js";
import Handler from "./js/core/handler.js";
import CheckboxHandler from "./js/handlers/checkboxHandler.js";
import ButtonHandler from "./js/handlers/buttonHandler.js";
import ImageHandler from "./js/handlers/imageHandler.js";
import LogoHandler from "./js/handlers/logoHandler.js";
import DarkModeController from "./js/controllers/darkModeController.js";

window.onload = function () {
	const test = async () => {
		const elementList = new HandlerMap([
			new HandlerIdentified(`logo-img`, new LogoHandler(new ImageHandler(new Handler(`img.logo`)))),
			new HandlerIdentified(`dark-mode-control`, new CheckboxHandler(new Handler(`input#dark-mode-control`))),
			new HandlerIdentified(`dark-mode-button`, new ButtonHandler(new Handler(`div.dark-mode-button`)))
		]);
	
		const darkMode = new DarkModeController(elementList);
	
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

		await createPromise(() => { darkMode.enable() }); // Enable Dark Mode on Controller
		await createPromise(() => { elementList.get(`dark-mode-button`).click() }); // Enable Dark Mode on Button
		await createPromise(() => { elementList.get(`dark-mode-control`).toggle() }); // Enable Dark Mode on Checkbox
	};

	setTimeout(test, 1000);
	
	// console.warn(`no implementation yet`);
};