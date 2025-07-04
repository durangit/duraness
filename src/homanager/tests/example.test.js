export default function RenderPageTests({ register, compare }) {
	register('Addition should work', () => {
		const result = 2 + 2;
		compare(result, 4);
	});

	register('Subtraction should fail', () => {
		const result = 10 - 3;
		compare(result, 8, 'Expected 10 - 3 to be 7');
	});

	register('Async test example', async () => {
		const result = await Promise.resolve(42);
		compare(result, 42);
	});
};