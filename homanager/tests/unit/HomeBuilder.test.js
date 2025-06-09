import HomeBuilder from "../../src/application/cases/HomeBuilder.js";
import sourceLoader from "../mocks/SourceLoader.mock.js";
import templateParser from "../mocks/TemplateParser.mock.js";
import webRenderer from "../mocks/WebRenderer.mock.js";
import DOMHandler from "../mocks/DOMHandler.mock.js";
import HomeData from "../mocks/HomeData.mock.js";

export default function HomeBuilderTests({ register, compare }) {
	register("build and afterLoad", async () => {
		const builder = new HomeBuilder({
			sourceLoader,
			data: HomeData,
			DOMHandler,
		});
		const template = await builder.build();
		const dom = webRenderer.render(templateParser.toDOM(template), document.body);
		builder.afterRender(dom);

		const content = dom.querySelector("p").textContent;
		compare(content, "Hello World!");
	});
};