export default class ElementMap {
	#elements;

	constructor(_elements = []) {
		this.#elements = [];

		_elements.forEach(element => {
			this.#elements[element.id] = element.dom;
		})
	}

	get(_elementId) {
		return this.#elements[_elementId];
	}

	set(_element) {
		this.#elements[_element.id] = _element.dom;
	}
}