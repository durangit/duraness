import BrowserRenderer from "../../src/infrastructure/ui/BrowserRenderer.js";
import { templateParser, sourceLoader } from "../../src/composition/defaultDependencies.js";
import { HomeBuilder, HomeHandler } from "../../src/composition/homeDependencies.js";

export default function BrowserRendererTests({ register, compare }) {
	register("build and afterLoad", async () => {
		const renderer = new BrowserRenderer({
			templateParser,
			pageBuilder: HomeBuilder({ sourceLoader }),
		});

		const hidden = document.createElement("div");
		hidden.style = "display: none";
		const container = await renderer.render(hidden);
		document.body.appendChild(container);
		
		compare(HomeHandler.getCards("plan").length, 2);
		compare(HomeHandler.getCards("do").length, 5);
		compare(HomeHandler.getCards("doing").length, 1);
		compare(HomeHandler.getCards("done").length, 3);
	});
};