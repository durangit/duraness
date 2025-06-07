export default function bootstrap(useCase, dependencies) {
	return new useCase(dependencies);
};