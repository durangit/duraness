export default class HomeData {
	#cardsToPlan;
	#cardsToDo;
	#cardsToDoing;
	#cardsToDone;

	constructor({ cardsToPlan, cardsToDo, cardsToDoing, cardsToDone } = {}) {
		this.#cardsToPlan = cardsToPlan || [];
		this.#cardsToDo = cardsToDo || [];
		this.#cardsToDoing = cardsToDoing || [];
		this.#cardsToDone = cardsToDone || [];
	}

	getData() {
		return {
			cardsToPlan: this.#cardsToPlan,
			cardsToDo: this.#cardsToDo,
			cardsToDoing: this.#cardsToDoing,
			cardsToDone: this.#cardsToDone,
		};
	}
}