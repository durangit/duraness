import wComponent from "../../../../../../framework/core/w-component.js";

export default class wcAddForm extends wComponent {
    constructor() {
        super(async component => {
            component.setClass("add-form");
            const dom = await component.useTemplate();

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
        }, import.meta.url);
    }
}