import Handler from "../core/handler.js";

export default class ImageHandler extends Handler {
	constructor(_DOMElement) {
		super(_DOMElement, [`change`]);
	}

	setPath(_path) {
		this.getElement().src = _path;
		this.notify(`change`);
	}
}