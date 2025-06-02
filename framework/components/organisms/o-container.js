import wComponent from '../../core/w-component.js';

export default class oContainer extends wComponent {
    constructor() {
        super(component => {
			const name = component.getAttribute('name');

            component.setStyle(`
                .container {
                    padding: var(--padding);
                    margin-bottom: var(--footer-size);
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
            `);

            name && component.setAttribute('id', name);
            component.setClass('container');
            component.append(component.getContent());
        });
    }
}