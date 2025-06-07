import Page from "../Page.js";
import wcScreen from "../../../../../../framework/components/organisms/o-screen.js";
import wcThread from "../../../../../../framework/components/organisms/o-thread.js";
import wcContainer from "../../../../../../framework/components/organisms/o-container.js";
import wcWrapper from "../../../../../../framework/components/organisms/o-wrapper.js";
import wcIconBar from "../../components/icon-bar/export.js";
import wcAddForm from "../../components/add-form/export.js";
import wcCard from "../../components/card/export.js";

export default class Home extends Page {
	#dom;

	constructor() {
		super(import.meta.url);
		this.afterRender = this.#afterRender.bind(this);
	}

	#afterRender(dom) {
		customElements.define("wc-screen", wcScreen);
		customElements.define("wc-thread", wcThread);
		customElements.define("wc-container", wcContainer);
		customElements.define("wc-wrapper", wcWrapper);
		customElements.define("wc-icon-bar", wcIconBar);
		customElements.define("wc-add-form", wcAddForm);
		customElements.define("wc-card", wcCard);

		this.#dom = dom;
	}

	getDOM() {
		return this.#dom;
	}
}