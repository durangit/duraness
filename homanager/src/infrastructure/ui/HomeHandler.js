import DOMHandler from "../../application/ports/outputs/DOMHandler.js";
import wcScreen from "../../../../../../framework/components/organisms/o-screen.js";
import wcThread from "../../../../../../framework/components/organisms/o-thread.js";
import wcContainer from "../../../../../../framework/components/organisms/o-container.js";
import wcWrapper from "../../../../../../framework/components/organisms/o-wrapper.js";
import wcIconBar from "../../interface/components/icon-bar/export.js";
import wcAddForm from "../../interface/components/add-form/export.js";
import wcCard from "../../interface/components/card/export.js";

export default class HomeHandler extends DOMHandler {
	#elements = {};	

	build(dom, data) {
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
			customElements.get(tagName) || customElements.define(tagName, component);
		}

		const elWrappers = dom.querySelectorAll("wc-wrapper");
		this.#elements.wrapper = {
			"plan": elWrappers[1],
			"do": elWrappers[2],
			"doing": elWrappers[3],
			"done": elWrappers[4],
		};
	}

	addCard(type, card) {
		this.#elements.wrapper[type].appendChild(card);
	}

	getCards(type) {
		return this.#elements.wrapper[type].querySelectorAll("wc-card");
	}
}