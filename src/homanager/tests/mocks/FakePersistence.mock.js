import DataPersistence from "../../src/application/ports/outputs/DataPersistence.js";

class DataPersistenceMock extends DataPersistence {
	async create(entity, data) {}
	async read(entity, id) {}
	async update(entity, data) {}
	async delete(entity, id) {}
	async all(entity) {
		return new Map();
	}
}

export default new DataPersistenceMock();