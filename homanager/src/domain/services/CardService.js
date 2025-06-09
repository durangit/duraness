import CardEntity from "../models/CardEntity.js";

export default class CardService {
	createElement(tagName, props) {
		const element = document.createElement(tagName);
		const entity = new CardEntity(props);

		element.setAttribute("title", entity.getTitle());
		element.setAttribute("creation", entity.getCreation());
		element.setAttribute("target", entity.getTarget());
		element.setAttribute("tag", entity.getTag());
		element.setAttribute("priority", entity.getPriority());
		element.setAttribute("user", entity.getUser());
		element.setAttribute("size", entity.getSize());

		return element;
	}

	generateRandomProps() {
		const now = new Date().getTime();
		const beforeNow = new Date(2025, 0, 1).getTime();
		const afterNow = new Date(2025, 11, 1).getTime();
		const randomCreation = new Date(Math.floor(Math.random() * (beforeNow - now + 1)) + now);
		const randomTarget = new Date(Math.floor(Math.random() * (now - afterNow + 1)) + afterNow);

		return {
			title: `Card ${Math.floor(Math.random() * 1000)}`,
			creation: randomCreation.toISOString().split("T")[0],
			target: randomTarget.toISOString().split("T")[0],
			tag: `Tag ${Math.floor(Math.random() * 10)}`,
			priority: Math.floor(Math.random() * 5) + 1,
			user: Math.floor(Math.random() * 10) % 2 === 0 ? "Duran" : "Bia",
			size: Math.floor(Math.random() * 10),
		};
	}
}