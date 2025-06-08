import RenderPage from "../../src/application/cases/RenderPage.js";
import sourceLoader from "../mocks/FetchSourceLoader.mock.js";
import templateRenderer from "../mocks/TemplateRenderer.mock.js";
import page from "../mocks/Page.mock.js"

export default function RenderPageTests({ register, compare }) {
	register("load file", async () => {
		const controller = new RenderPage({ sourceLoader, templateRenderer });
		await controller.render(page);
	});

	register("with afterRender", async () => {
		const controller = new RenderPage({ sourceLoader, templateRenderer });

		page.setAfterRender(dom => {
			const content = dom.querySelector("p").textContent;
			compare(content, "Hello World!");
		});

		await controller.render(page);
	});
};