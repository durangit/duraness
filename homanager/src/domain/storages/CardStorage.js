import CardRepository from "../repositories/CardRepository.js";

export default class CardPersistence extends CardRepository {
	#dataPersistence;

	constructor({ dataPersistence }) {
		super();
		this.#dataPersistence = dataPersistence;
	}

	async save(type, card) {
		const storage = await this.#dataPersistence.all(type);
		const hasItem = storage?.has(card.id);
		if (hasItem) {
			this.#dataPersistence.update(type, card);
		} else {
			this.#dataPersistence.create(type, card);
		}
	}

	async getAll() {
		return Object.fromEntries([
			"cardsToPlan",
			"cardsToDo",
			"cardsToDoing",
			"cardsToDone",
		].map(type => {
			return [type, this.#dataPersistence.all(type)];
		}));
	}
}