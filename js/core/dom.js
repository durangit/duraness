export default class NamedElement {
	constructor(_name, _selector) {
		this.id = _name;
		this.dom = document.querySelector(`${_selector}`);
	}
}