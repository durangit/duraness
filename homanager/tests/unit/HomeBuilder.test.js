import HomeBuilder from "../../src/application/cases/HomeBuilder.js";
import sourceLoader from "../mocks/FakeLoader.mock.js";
import templateParser from "../mocks/FakeParser.mock.js";
import webRenderer from "../mocks/FakeRenderer.mock.js";
import DOMHandler from "../mocks/FakeHandler.mock.js";
import dataPersistence from "../mocks/FakePersistence.mock.js";
import HomeData from "../mocks/FakeHomeData.mock.js";

export default function HomeBuilderTests({ register, compare }) {
	register("build and afterLoad", async () => {
		const builder = new HomeBuilder({
			sourceLoader,
			data: HomeData,
			DOMHandler,
			dataPersistence,
		});
		const template = await builder.build();
		const dom = webRenderer.render(templateParser.toDOM(template), document.body);
		builder.afterRender(dom);

		const content = dom.querySelector("p").textContent;
		compare(content, "Hello World!");
	});
};