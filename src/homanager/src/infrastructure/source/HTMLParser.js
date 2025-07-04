import TemplateParser from '../../application/ports/outputs/TemplateParser.js';

export default class HTMLParser extends TemplateParser {
	toDOM(html) {
		const clone = document.createElement('template');
		clone.innerHTML = html;
		return clone.content.cloneNode(true);
	}
}