import wComponent from '../../core/w-component.js';

export default class oThread extends wComponent {
    constructor() {
        super(component => {
            const elDom = component.getDom();

            let lastTouch = 0;
            const onWheel = event => {
                elDom.style.scrollBehavior = 'unset';
                elDom.scrollTo({
                    top: Math.max(0, elDom.scrollTop + event.deltaY)
                });
                elDom.style.scrollBehavior = 'smooth';
            };

            const onTouchStart = event => {
                lastTouch = event.touches[0].clientY;
            };

            const onTouchEnd = event => {
                lastTouch = 0;
            };

            const onTouchMove = event => {
                const currentTouch = event.touches[0].clientY;
                elDom.style.scrollBehavior = 'unset';
                elDom.scrollTo({
                    top: Math.max(0, elDom.scrollTop + (lastTouch - currentTouch))
                });
                elDom.style.scrollBehavior = 'smooth';
                lastTouch = currentTouch;
            };

            component.setStyle(`
                .thread {
                    width: 100vw;
                    height: 100%;
                    overflow: hidden;
                    scroll-behavior: smooth;
                }
            `);

            component.setClass('thread');
            component.append(component.getContent());
            elDom.addEventListener('wheel', onWheel);
            elDom.addEventListener('touchstart', onTouchStart);
            elDom.addEventListener('touchend', onTouchEnd);	
            elDom.addEventListener('touchmove', onTouchMove);
        });
    }
}