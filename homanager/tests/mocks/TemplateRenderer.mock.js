import TemplateRenderer from "../../src/application/ports/outputs/TemplateRenderer.js";

class TemplateRendererMock extends TemplateRenderer {
	render(template, parent) {
		const renderer = parent.querySelector("#renderer");

		const clone = document.createElement("template");
		clone.innerHTML = template;
		const dom = clone.content.cloneNode(true);

		if (renderer) {
			renderer.replaceChildren(dom);
			return renderer;
		} else {
			const hidden = document.createElement("div");
			hidden.setAttribute("id", "renderer");
			hidden.style = "display: none";
			hidden.appendChild(dom);
			parent.appendChild(hidden);
			return hidden;
		}
	}
}

export default new TemplateRendererMock();