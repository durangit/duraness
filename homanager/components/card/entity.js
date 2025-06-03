export default class eCard {
    #title;
    #creation;
    #target;
    #tag;
    #priority;
    #user;

    constructor(props) {
        this.#title = props.title;
        this.#creation = props.creation;
        this.#target = props.target;
        this.#tag = props.tag;
        this.#priority = props.priority;
        this.#user = props.user;
    }

    getTitle() {
        return this.#title;
    }

    getCreation() {
        return this.#creation;
    }

    getTarget() {
        return this.#target;
    }

    getTag() {
        return this.#tag;
    }

    getPriority() {
        return this.#priority;
    }

    getUser() {
        return this.#user;
    }
}