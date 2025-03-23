import wComponent from '../../core/w-component.js';

export default class oWrapper extends wComponent {
    constructor() {
        super(component => {
			const title = component.getAttribute('title');

            const elHeader = document.createElement('header');
            const elTitle = document.createElement('h1');

            component.setStyle(`
                .wrapper {
					width: 100%;
					margin: var(--padding) 0;

                    & h1 {
                        text-transform: capitalize;
                    }
				}
            `);

            if (title) {
                elTitle.textContent = title;
                elHeader.appendChild(elTitle);
                component.append(elHeader);
            }

            component.setClass('wrapper');
            component.append(component.getContent());
        });
    }
}