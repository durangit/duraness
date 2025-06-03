import fCard from "./components/card/factory.js";

const generateRandomCardProps = () => {
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
	};
}

const generateCard = () => {
	const props = generateRandomCardProps();
	return fCard.create("wc-card", props);
}

export default function test() {
    const elWrappers = document.querySelectorAll("wc-wrapper");
    const elDoWrapper = elWrappers[0];
    const elDoingWrapper = elWrappers[1];
    const elDoneWrapper = elWrappers[2];

    for (let i = 0; i < 5; i++) {
        elDoWrapper.appendChild(generateCard());
    }

    for (let i = 0; i < 1; i++) {
        elDoingWrapper.appendChild(generateCard());
    }

    for (let i = 0; i < 2; i++) {
        elDoneWrapper.appendChild(generateCard());
    }
}