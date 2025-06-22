import BrowserRenderer from "./src/infrastructure/ui/BrowserRenderer.js";
import { templateParser, sourceLoader, dataPersistence } from "./src/composition/defaultDependencies.js";
import { HomeBuilder } from "./src/composition/homeDependencies.js";

document.addEventListener("DOMContentLoaded", async () => {
	const controller = new BrowserRenderer({
		templateParser,
		pageBuilder: HomeBuilder({ sourceLoader, dataPersistence }),
	});

	await controller.render(document.body);

	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/service-worker.js');
		});
	}
});