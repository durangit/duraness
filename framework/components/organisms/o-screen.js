import wComponent from '../../core/w-component.js';

export default class oScreen extends wComponent {
    constructor() {
        super(component => {
			const elTrack = document.createElement('div');

            component.setStyle(`
                #viewport {
                    --padding: var(--xl-number);

                    width: 100vw;
                    height: 100vh;
                    box-sizing: border-box;
                    overflow: hidden;
                    touch-action: none;
                    scroll-behavior: smooth;
                    background-color: var(--white);

                    & .track {
                        width: calc((100vw * var(--thread-number)));
                        height: 100%;
                        display: flex;
                    }
                }
            `);

            elTrack.classList.add('track');
            elTrack.appendChild(component.getContent());

            component.getDOM().setAttribute('id', 'viewport');
            component.append(elTrack);
        });
    }
}