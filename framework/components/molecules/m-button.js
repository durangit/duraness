import wComponent from '../../core/w-component.js';

export default class mButton extends wComponent {
	constructor() {
		super(component => {		
			const type = component.getAttribute('type');
			const size = component.getAttribute('size');
			const density = component.getAttribute('density');
			const rounding = component.getAttribute('rounding');

			const elLabel = document.createElement('wc-label');

			component.setStyle(`
				.button {
					--gray-color: #bcbcbc;
					
					--small-size: 3rem;
					--medium-size: calc(var(--small-size) * 2);
					--large-size: calc(var(--small-size) * 3);
					--compact-density: calc(1rem * .33);
					--comfortable-density: calc(1rem * .5);
					--spacious-density: calc(1rem * .75);
					--straight-radius: 0;
					--rounded-radius: calc(1rem * .5);
					--round-radius: 50%;

					--button-width: var(--medium-size);
					--button-padding: var(--comfortable-density);
					--button-color: var(--gray-color);
					--button-radius: var(--rounded-radius);

					min-width: var(--button-width);
					background-color: var(--button-color);
					padding: var(--button-padding);
					border-radius: var(--button-radius);
					box-sizing: border-box;
					display: inline-block;
					text-align: center;

					&.auto {
						--button-width: auto;
					}

					&.full {
						--button-width: 100%;
					}

					&.equilateral,
					&.square,
					&.circular {
						min-height: var(--button-width);
						line-height: calc(var(--button-width) - (var(--button-padding) * 2));
					}

					&.small {
						--button-width: var(--small-size);
					}

					&.medium {
						--button-width: var(--medium-size);
					}

					&.large {
						--button-width: var(--large-size);
					}

					&.compact {
						--button-padding: var(--compact-density);
					}

					&.comfortable {
						--button-padding: var(--comfortable-density);
					}

					&.spacious {
						--button-padding: var(--spacious-density);
					}

					&.straight,
					&.square {
						--button-radius: var(--straight-radius);
					}

					&.rounded {
						--button-radius: var(--rounded-radius);
					}

					&.round,
					&.circular {
						--button-radius: var(--round-radius);
					}
				}
			`);

			elLabel.appendChild(component.getContent());

			type && component.setClass(type);
			size && component.setClass(size);
			density && component.setClass(density);
			rounding && component.setClass(rounding);
			component.setClass('button');
			component.append(elLabel);
		});
	}
}