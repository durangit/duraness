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
		const components = {
			"wc-screen": wcScreen,
			"wc-thread": wcThread,
			"wc-container": wcContainer,
			"wc-wrapper": wcWrapper,
			"wc-icon-bar": wcIconBar,
			"wc-add-form": wcAddForm,
			"wc-card": wcCard,
		};

		for (const tagName in components) {
			const component = components[tagName];
			this.defineComponent({ component, tagName });
		}

		this.#dom = dom;
	}

	getDOM() {
		return this.#dom;
	}
}