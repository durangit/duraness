import wComponent from "../../../../../../framework/core/w-component.js";

export default class wcAddForm extends wComponent {
    constructor() {
        super(async component => {
            component.setClass('add-form');
            await component.useTemplate();
        }, import.meta.url);
    }
}