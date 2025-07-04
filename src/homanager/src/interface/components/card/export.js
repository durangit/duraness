import wComponent from "@framework/core/w-vanilla.js";
import html from "./template.html?raw";
import css  from "./style.css?raw";

export default class wcCard extends wComponent {
	constructor() {
		super({
			"name": "card",
			"template": html,
			"style": css,
			"init": dom => {
				// const dom = await component.useTemplate({
				// 	title: component.getAttribute('title'),
				// 	creation: component.getAttribute('creation'),
				// 	target: component.getAttribute('target'),
				// 	tag: component.getAttribute('tag'),
				// 	priority: component.getAttribute('priority'),
				// 	user: component.getAttribute('user'),
				// 	size: component.getAttribute('size'),
				// });

				const elTitle = dom.querySelectorAll('p')[0];
				const elOpenButton = dom.querySelectorAll('.button')[0];
				const elPlayButton = dom.querySelectorAll('.button')[1];

				elOpenButton.addEventListener('click', () => {
					console.log(`Open ${elTitle.textContent} clicked`);
				});
				elPlayButton.addEventListener('click', () => {
					console.log(`Play ${elTitle.textContent} clicked`);
				});
			}
		});
	}
}