import HomeBuilder from "../../src/application/cases/HomeBuilder.js";
import sourceLoader from "../mocks/FetchSourceLoader.mock.js";
import templateParser from "../mocks/TemplateParser.mock.js";
import webRenderer from "../mocks/WebRenderer.mock.js";
import HomeHandler from "../mocks/HomeHandler.mock.js";
import HomeData from "../mocks/HomeData.mock.js";

export default function HomeBuilderTests({ register, compare }) {
	register("build and afterLoad", async () => {
		const builder = new HomeBuilder({ 
			sourceLoader,
			data: HomeData,
			DOMHandler: HomeHandler,
		});
		const template = await builder.build();
		const dom = webRenderer.render(templateParser.toDOM(template), document.body);
		builder.afterRender(dom);

		compare(HomeHandler.getCards("plan").length, 2);
		compare(HomeHandler.getCards("do").length, 5);
		compare(HomeHandler.getCards("doing").length, 1);
		compare(HomeHandler.getCards("done").length, 3);
	});
};