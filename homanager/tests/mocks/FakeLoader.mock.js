import SourceLoader from "../../src/application/ports/outputs/SourceLoader.js";

class SourceLoaderMock extends SourceLoader {
	load() {
		return `<p>Hello World!</p>`;
	}
}

export default new SourceLoaderMock();