import eCard from "./entity.js";

export default class fCard {
    static create(tagName, props) {
        const element = document.createElement(tagName);
        const entity = new eCard(props);

        element.setAttribute("title", entity.getTitle());
        element.setAttribute("creation", entity.getCreation());
        element.setAttribute("target", entity.getTarget());
        element.setAttribute("tag", entity.getTag());
        element.setAttribute("priority", entity.getPriority());
        element.setAttribute("user", entity.getUser());

        return element;
    }
}