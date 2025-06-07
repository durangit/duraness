import RenderPage from "./RenderPage.js";
import mock from "../../../tests/mocks/home.mock.js";

export default class RenderHome extends RenderPage {
	constructor(dependencies) {
		super(dependencies);
	}

	renderMock() {
		mock(this.getDOM());
	}
}