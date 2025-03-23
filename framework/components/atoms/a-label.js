import wComponent from '../../core/w-component.js';

export default class aLabel extends wComponent {
	constructor() {
		super(component => {
			const size = component.getAttribute('size');
			const elSpan = document.createElement('span');

			component.setStyle(`
				.label {
					display: inline;
					font-size: 1rem;

					&.xsmall {
						font-size: .5rem;
					}

					&.small {
						font-size: .75rem;
					}

					&.medium {
						font-size: 1rem;
					}

					&.large {
						font-size: 1.25rem;
					}

					&.xlarge {
						font-size: 1.5rem;
					}
				}
			`);
		
			elSpan.appendChild(component.getContent());

			component.setClass('label');
			size && component.setClass(size);

			component.append(elSpan);
		});
	}
}