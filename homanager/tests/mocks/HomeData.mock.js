import HomeData from "../../src/application/ports/inputs/HomeData.js";
import CardService from "../../src/domain/services/CardService.js";

const cardService = new CardService();

export default new HomeData({
	cardsToPlan: [
		cardService.generateRandomProps(),
		cardService.generateRandomProps(),
	],
	cardsToDo: [
		cardService.generateRandomProps(),
		cardService.generateRandomProps(),
		cardService.generateRandomProps(),
		cardService.generateRandomProps(),
		cardService.generateRandomProps(),
	],
	cardsToDoing: [
		cardService.generateRandomProps(),
	],
	cardsToDone: [
		cardService.generateRandomProps(),
		cardService.generateRandomProps(),
		cardService.generateRandomProps(),
	],
});