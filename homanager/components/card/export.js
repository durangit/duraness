import wComponent from "../../../framework/core/w-component.js";

export default class wcCard extends wComponent {
	constructor() {
		super(async component => {
			component.setClass('card');
			const dom = await component.useTemplate({
				title: component.getAttribute('title'),
				creation: component.getAttribute('creation'),
				target: component.getAttribute('target'),
				tag: component.getAttribute('tag'),
				priority: component.getAttribute('priority'),
				user: component.getAttribute('user'),
			});

			const elTitle = dom.querySelectorAll('p')[0];
			const elOpenButton = dom.querySelectorAll('.button')[0];
			const elPlayButton = dom.querySelectorAll('.button')[1];

			elOpenButton.addEventListener('click', () => {
				console.log(`Open ${elTitle.textContent} clicked`);
			});
			elPlayButton.addEventListener('click', () => {
				console.log(`Play ${elTitle.textContent} clicked`);
			});
		}, import.meta.url);
	}
}