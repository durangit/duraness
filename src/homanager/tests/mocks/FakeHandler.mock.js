import DOMHandler from "../../src/application/ports/outputs/DOMHandler.js";

class DOMHandlerMock extends DOMHandler {
	build() {}
	export() {}
}

export default new DOMHandlerMock();