import PageBuilder from "../../application/ports/inputs/PageBuilder.js";
import CardService from "../../domain/services/CardService.js";

export default class HomeBuilder extends PageBuilder {
	#templateUrl = new URL("../../interface/pages/home.html", import.meta.url);
	#sourceLoader;
	#data;
	#DOMHandler;
	#handlers;
	#cardService;
	
	constructor({ sourceLoader, data, DOMHandler, dataPersistence }) {
		super();
		this.#sourceLoader = sourceLoader;
		this.#data = data;
		this.#DOMHandler = DOMHandler;
		this.#cardService = new CardService({ dataPersistence });
	}

	async build() {
		return await this.#sourceLoader.load(this.#templateUrl);
	}

	async afterRender(dom) {
		this.#DOMHandler.build(dom);
		this.#handlers = this.#DOMHandler.export();
		
		const data = this.#data?.getData();
		await this.#populate(data);
		await this.#renderCards(data);
	}

	async #populate(data) {
		for (const type in data) {
			data[type].forEach(async card => {
				card.id = card.title;
				await this.#cardService.persist(type, card);
			});
		}
	}

	async #renderCards() {
		const convertTo = {
			"cardsToPlan" : "plan",
			"cardsToDo" : "do",
			"cardsToDoing" : "doing",
			"cardsToDone" : "done",
		};

		const storage = await this.#cardService.getStorage();
		console.log(storage);
		for (const type in storage) {
			const cards = await storage[type]; // Why when remove await throw error?
			cards.forEach(cardProps => {
				//this.#handlers?.addCard && this.#handlers.addCard(convertTo[type], this.#cardService.createElement("wc-card", cardProps));
			});
		}
	}
}