import RenderHome from "../../src/application/cases/RenderHome.js";
import sourceLoader from "../mocks/FetchSourceLoader.mock.js";
import templateRenderer from "../mocks/TemplateRenderer.mock.js";

export default function RenderHomeTests({ register, compare }) {
	register("load file", async () => {
		const controller = new RenderHome({ sourceLoader, templateRenderer });
		await controller.render();
	});

	register("with buildPlan", async () => {
		const controller = new RenderHome({ sourceLoader, templateRenderer });
		await controller.render();
		controller.buildPlan(2);

		const wrapper = controller.getPlan();
		const cards = wrapper.querySelectorAll("wc-card");

		compare(cards.length, 2);
	});

	register("with buildDo", async () => {
		const controller = new RenderHome({ sourceLoader, templateRenderer });
		await controller.render();
		controller.buildDo(5);

		const wrapper = controller.getDo();
		const cards = wrapper.querySelectorAll("wc-card");

		compare(cards.length, 5);
	});

	register("with buildDoing", async () => {
		const controller = new RenderHome({ sourceLoader, templateRenderer });
		await controller.render();
		controller.buildDoing(1);

		const wrapper = controller.getDoing();
		const cards = wrapper.querySelectorAll("wc-card");

		compare(cards.length, 1);
	});

	register("with buildDone", async () => {
		const controller = new RenderHome({ sourceLoader, templateRenderer });
		await controller.render();
		controller.buildDone(3);

		const wrapper = controller.getDone();
		const cards = wrapper.querySelectorAll("wc-card");

		compare(cards.length, 3);
	});
};