import DataPersistence from "../../application/ports/outputs/DataPersistence.js";

export default class RuntimePersistence extends DataPersistence {
	#db = new Map();

	create(entity, data) {
		if (!this.#db.has(entity)) {
			this.#db.set(entity, new Map());
		}

		this.#db.get(entity).set(data.id, data);
	}

	read(entity, id) {
		return this.#db.get(entity).get(id);
	}

	update(entity, data) {
		this.#db.get(entity).set(data.id, data);
	}

	delete(entity, id) {
		this.#db.get(entity).delete(id);
	}

	all(entity) {
		return this.#db.get(entity);
	}
}