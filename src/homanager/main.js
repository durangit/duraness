import BrowserRenderer from "./src/infrastructure/ui/BrowserRenderer.js";
import { templateParser, sourceLoader, dataPersistence } from "./src/composition/defaultDependencies.js";
import { HomeBuilder } from "./src/composition/homeDependencies.js";
import { assetsToCache } from './swFiles.js';

document.addEventListener("DOMContentLoaded", async () => {
	const controller = new BrowserRenderer({
		templateParser,
		pageBuilder: HomeBuilder({ sourceLoader, dataPersistence }),
	});

	await controller.render(document.body);

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/homanager/service-worker.js').then(reg => {
			console.log('Service worker registered.', reg);

			navigator.serviceWorker.ready.then(() => {
				reg.active?.postMessage({ type: 'ASSET_LIST', payload: assetsToCache });
			});
		});;
	}
});