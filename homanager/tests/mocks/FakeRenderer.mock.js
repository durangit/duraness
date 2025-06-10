import WebRenderer from "../../src/application/ports/outputs/WebRenderer.js";

class WebRendererMock extends WebRenderer {
	render(dom, container) {
		const renderer = container.querySelector("#renderer");

		if (renderer) {
			renderer.replaceChildren(dom);
			return renderer;
		} else {
			const hidden = document.createElement("div");
			hidden.setAttribute("id", "renderer");
			hidden.style = "display: none";
			hidden.appendChild(dom);
			container.appendChild(hidden);
			return hidden;
		}
	}
}

export default new WebRendererMock();