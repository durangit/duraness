import wComponent from "../../../framework/core/w-component.js";

export default class wcIconBar extends wComponent {
    constructor() {
        super(async component => {
            component.setClass('icon-bar');
            await component.useTemplate();
        }, import.meta.url);
    }
}