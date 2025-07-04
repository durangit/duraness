import wComponent from "@framework/core/w-vanilla.js";
import html from "./template.html?raw";
import css  from "./style.css?raw";

export default class wcAddForm extends wComponent {
	constructor() {
		super({
			"template": html,
			"style": css,
			"init": dom => {
				const form = dom.querySelector("form");
				form.addEventListener("submit", event => {
					const fieldToValidate = form.querySelectorAll("[aria-required=true]");
					for (const field of fieldToValidate) {
						field.classList.toggle("invalid", field.matches(':invalid'));
					}

					if (form.querySelectorAll(".invalid").length) {
						event.preventDefault();
					}
				});
			}
		});
	}
}