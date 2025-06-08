// To compose
import bootstrap from "./src/composition/bootstrap.js";
import dependencies from "./src/composition/defaultDependencies.js";
import UseCase from "./src/application/cases/RenderHome.js";

const controller = bootstrap(UseCase, dependencies);

document.addEventListener("DOMContentLoaded", async () => {
	await controller.render();
	controller.buildPlan(2);
	controller.buildDo(5);
	controller.buildDoing(1);
	controller.buildDone(3);
});