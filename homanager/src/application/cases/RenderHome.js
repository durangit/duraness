import RenderPage from "./RenderPage.js";
import Home from "../../interfaces/ui/pages/home/Home.js";
import CardService from "../../domain/services/CardService.js";

export default class RenderHome extends RenderPage {
	#elPlanWrapper;
	#elDoWrapper;
	#elDoingWrapper;
	#elDoneWrapper;

	constructor(dependencies) {
		super(dependencies);
	}

	async render() {
		super.afterReady = this.#afterReady;
		await super.render(new Home());
	}

	#afterReady(dom) {
		const elWrappers = dom.querySelectorAll("wc-wrapper");

		this.#elPlanWrapper = elWrappers[1];
		this.#elDoWrapper = elWrappers[2];
		this.#elDoingWrapper = elWrappers[3];
		this.#elDoneWrapper = elWrappers[4];
	}

	#build(elWrapper, n) {
		for (let i = 0; i < n; i++) {
			const cardService = new CardService();
			const props = cardService.generateRandomProps();
			const card = cardService.create("wc-card", props);
			elWrapper.appendChild(card);
		}
	}

	buildPlan(n) {
		this.#build(this.#elPlanWrapper, n);
	}

	buildDo(n) {
		this.#build(this.#elDoWrapper, n);
	}

	buildDoing(n) {
		this.#build(this.#elDoingWrapper, n);
	}

	buildDone(n) {
		this.#build(this.#elDoneWrapper, n);
	}

	getPlan() {
		return this.#elPlanWrapper;
	}

	getDo() {
		return this.#elDoWrapper;
	}

	getDoing() {
		return this.#elDoingWrapper;
	}

	getDone() {
		return this.#elDoneWrapper;
	}
}