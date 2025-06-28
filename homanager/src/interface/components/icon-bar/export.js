import wComponent from "@framework/core/w-component.js";

export default class wcIconBar extends wComponent {
    constructor() {
        super(async component => {
            component.setClass('icon-bar');
            const dom = await component.useTemplate();

            dom.querySelectorAll('li[link]').forEach(element => {
                element.addEventListener('click', event => {
                    scroll(event, element.getAttribute('link'));
                });
            });
        }, import.meta.url);
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