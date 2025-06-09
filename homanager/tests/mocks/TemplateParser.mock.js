import TemplateParser from "../../src/application/ports/outputs/TemplateParser.js";

class TemplateParserMock extends TemplateParser {
	toDOM(template) {
		const clone = document.createElement("template");
		clone.innerHTML = template;
		return clone.content.cloneNode(true);
	}
}

export default new TemplateParserMock();