import TemplateRenderer from '../../application/ports/outputs/TemplateRenderer.js';

export default class HTMLRenderer extends TemplateRenderer {
	render(html, parent) {
		const clone = document.createElement('template');
		clone.innerHTML = html;

		const dom = clone.content.cloneNode(true);
		parent.appendChild(dom);
		return parent;
	}
}