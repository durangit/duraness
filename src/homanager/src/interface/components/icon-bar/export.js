import wComponent from "@framework/core/w-vanilla.js";
import html from "./template.html?raw";
import css  from "./style.css?raw";

export default class wcAddForm extends wComponent {
	constructor() {
		super({
			"name": "icon-bar",
			"template": html,
			"style": css,
			"init": dom => {
				dom.querySelectorAll('li[link]').forEach(element => {
					element.addEventListener('click', event => {
						scroll(event, element.getAttribute('link'));
					});
				});
			}
		});
	}
}

function scroll(event, id) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
        });
    }
}