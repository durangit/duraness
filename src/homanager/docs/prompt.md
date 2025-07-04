Dado que existe uma arquitetura hexagonal com a estrutura:

root
├── src
│   ├── application
│   │   ├── cases
│   │   │   ├── RenderHome.js
│   │   │   └── RenderPage.js
│   │   └── ports
│   │       └── outputs
│   │           ├── CacheControl.js
│   │           ├── SourceLoader.js
│   │           └── TemplateRenderer.js
│   ├── composition
│   │   ├── bootstrap.js
│   │   └── defaultDependencies.js
│   ├── domain
│   ├── infrastructure
│   │   ├── cache
│   │   │   └── RuntimeCacheControl.js
│   │   └── source
│   │       ├── FetchSourceLoader.js
│   │       └── HTMLRenderer.js
│   └── interfaces
│       └── ui
│           ├── components
│           └── pages
│               ├── home
│               │   ├── Home.js
│               │   ├── mock.js
│               │   └── template.html
│               └── Page.js
├── tests
│   └── mocks
│       └── home.mock.js
├── index.html
└── main.js

Considere:

- "ports/outputs" são contratos implementados pelos arquivos em "infrastruture"
- "FetchSourceLoader" depende de uma instancia de "CacheControl" que é instanciada nas dependencias como "RuntimeCacheControl"
- "dependencies.js" instancia as dependencias de infraestruturas
- O fluxo de renderização é main->bootstrap->FetchSourceLoader->HTMLRenderer->Page->Home

main.js:

import bootstrap from "./src/composition/bootstrap.js";
import dependencies from "./src/composition/defaultDependencies.js";
import UseCase from "./src/application/cases/RenderHome.js";
import Page from "./src/interfaces/ui/pages/home/Home.js";
const controller = bootstrap(UseCase, dependencies);
await controller.render(new Page());
controller.renderMock();

bootstrap.js:

export default function bootstrap(useCase, dependencies) {
	return new useCase(dependencies);
};

defaultDependencies.js:

import RuntimeCacheControl from '../infrastructure/cache/RuntimeCacheControl.js';
import FetchSourceLoader from '../infrastructure/source/FetchSourceLoader.js';
import HTMLRenderer from '../infrastructure/source/HTMLRenderer.js';

const cacheControl = new RuntimeCacheControl();
const sourceLoader = new FetchSourceLoader({ cacheControl });
const templateRenderer = new HTMLRenderer();

export default {
	cacheControl,
	sourceLoader,
	templateRenderer,
};

HTMLRenderer.js:

export default class HTMLRenderer extends TemplateRenderer {
	render(html, parent) {
		const clone = document.createElement('template');
		clone.innerHTML = html;

		const dom = clone.content.cloneNode(true);
		parent.appendChild(dom);
		return parent;
	}
}

RenderPage.js:

export default class RenderPage {
	#sourceLoader;
	#templateRenderer;
	#afterRender;
	#dom;

	constructor({ sourceLoader, templateRenderer }) {
		this.#sourceLoader = sourceLoader;
		this.#templateRenderer = templateRenderer;
	}

	async render(page) {
		if (page.afterRender) {
			this.#afterRender = page.afterRender;
		}

		await this.#sourceLoader.load(page.getTemplateUrl(), this.#afterLoad.bind(this));
	}

	#afterLoad(template) {
		const dom = this.#templateRenderer.render(template, document.body);
		this.#dom = dom;
		this.#afterRender && this.#afterRender(dom);
	}

	getDOM() {
		return this.#dom;
	}
}

RenderHome.js:

import mock from "../../../tests/mocks/home.mock.js";
export default class RenderHome extends RenderPage {
	constructor(dependencies) {
		super(dependencies);
	}

	renderMock() {
		mock(this.getDOM());
	}
}

Home.js:

export default class Home extends Page {
	constructor() {
		super(import.meta.url);
		this.afterRender = this.#afterRender.bind(this);
	}

	#afterRender(dom) {
		// define components
	}
}

Page.js:

export default class Page {
	#templateUrl;

	constructor(metaUrl) {
		this.#templateUrl = new URL('./template.html', metaUrl);
	}

	getTemplateUrl() {
		return this.#templateUrl;
	}
}

Então questione caso não tenha entendido a responsabilidade de algum arquivo e aguarde a proxima instrução



Identifique possiveis melhorias e assuma um papel de instrutor listando os pontos no formato:

- Problema
- Sugestão
- Exemplo