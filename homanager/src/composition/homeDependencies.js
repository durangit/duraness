import Builder from '../application/cases/HomeBuilder.js';
import Handler from '../infrastructure/ui/HomeHandler.js';
import DataMock from '../../tests/mocks/HomeData.mock.js';

const HomeHandler = new Handler();
const HomeDataMock = DataMock;
const HomeBuilder = (dependencies) => {
	const defaultDependencies = {
		data: HomeDataMock,
		DOMHandler: HomeHandler
	};

	return new Builder({
		...defaultDependencies,
		...dependencies,
	});
}

export {
	HomeBuilder,
	HomeHandler,
	HomeDataMock,
};