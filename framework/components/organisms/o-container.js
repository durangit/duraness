import wComponent from '../../core/w-component.js';

export default class oContainer extends wComponent {
    constructor() {
        super(component => {
			const name = component.getAttribute('name');

            component.setStyle(`
                .container {
                    padding: var(--padding);
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
            `);

            component.setClass('container');
            name && component.setAttribute('id', name);

            component.append(component.getContent());
        });
    }
}