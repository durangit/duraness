// To compose
import bootstrap from "./src/composition/bootstrap.js";
import dependencies from "./src/composition/defaultDependencies.js";
import UseCase from "./src/application/cases/RenderHome.js";

// Script
import Page from "./src/interfaces/ui/pages/home/Home.js";

const controller = bootstrap(UseCase, dependencies);

await controller.render(new Page());
controller.renderMock();