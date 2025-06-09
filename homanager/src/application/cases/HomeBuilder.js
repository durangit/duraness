import PageBuilder from "../../application/ports/inputs/PageBuilder.js";
import CardService from "../../domain/services/CardService.js";

const cardService = new CardService();

export default class HomeBuilder extends PageBuilder {
	#templateUrl = new URL("../../interface/pages/home.html", import.meta.url);
	#sourceLoader;
	#data;
	#DOMHandler;
	
	constructor({ sourceLoader, data, DOMHandler }) {
		super();
		this.#sourceLoader = sourceLoader;
		this.#data = data;
		this.#DOMHandler = DOMHandler;
	}

	async build() {
		return await this.#sourceLoader.load(this.#templateUrl);
	}

	afterRender(dom) {
		this.#DOMHandler.build(dom);

		const data = this.#data?.getData();
		const convertTo = {
			"cardsToPlan" : "plan",
			"cardsToDo" : "do",
			"cardsToDoing" : "doing",
			"cardsToDone" : "done",
		};
		
		for (const type in data) {
			data[type].forEach(cardProps => {
				this.#DOMHandler.addCard(convertTo[type], cardService.createElement("wc-card", cardProps));
			});
		}
	}
}