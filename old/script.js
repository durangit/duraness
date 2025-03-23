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
				}, 0);
			}).then(data => {
				console.log(data);
			});
		};

		await createPromise(() => {
			elementList.get(`color-picker-duran`).setColor(`#111111`);
			elementList.get(`color-picker-ness`).setColor(`#3b1d14`);
			elementList.get(`color-picker-leaf`).setColor(`#008f6a`);
			elementList.get(`color-picker-fruit`).setColor(`#8f1518`);
		 }); // Set Colors
	};

	setTimeout(test, 0);

	console.log(document);
	
	// console.warn(`no implementation yet`);

	const screen = document.querySelector('#screen');
	screen.addEventListener('wheel', event => {
		screen.style.scrollBehavior = 'unset';
		screen.scrollTo({
			top: Math.max(0, screen.scrollTop + event.deltaY)
		});
		screen.style.scrollBehavior = 'smooth';
		const percent = Math.min((screen.scrollTop * 100) / (screen.scrollHeight - screen.clientHeight), 100);
	});

	let lastTouch = 0;
	screen.addEventListener('touchstart', event => {
		lastTouch = event.touches[0].clientY;
	});
	screen.addEventListener('touchend', event => {
		lastTouch = 0;
	});	
	screen.addEventListener('touchmove', event => {
		const currentTouch = event.touches[0].clientY;
		screen.style.scrollBehavior = 'unset';
		screen.scrollTo({
			top: Math.max(0, screen.scrollTop + (lastTouch - currentTouch))
		});
		screen.style.scrollBehavior = 'smooth';
		lastTouch = currentTouch;
		const percent = Math.min((screen.scrollTop * 100) / (screen.scrollHeight - screen.clientHeight), 100);
	});

	let lastTouch2 = 0;
	const nav = document.querySelector('#nav');
	nav.addEventListener('touchstart', event => {
		lastTouch2 = event.touches[0].clientY;
	});
	nav.addEventListener('touchend', event => {
		lastTouch2 = 0;
	});	
	nav.addEventListener('touchmove', event => {
		const currentTouch = event.touches[0].clientX;
		nav.scrollTo({
			left: Math.max(0, nav.scrollLeft + (lastTouch2 - currentTouch))
		});
		lastTouch2 = currentTouch;
	});
};