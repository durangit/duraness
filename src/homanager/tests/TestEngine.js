export default class TestEngine {
	#tests = [];
	#results = [];

	getRegistered() {
		return this.#tests;
	}

	register(fileName, testName, fn) {
		this.#tests.push({ fileName, testName, fn });
	}

	assert(actual, expected, message = '') {
		if (actual !== expected) {
			throw new Error(`Assertion failed: ${message || `${actual} !== ${expected}`}`);
		}
	}

	async run() {
		console.log(`Running ${this.#tests.length} test(s)...`);
		let passed = 0;

		for (const { name, fn } of this.#tests) {
		try {
			await fn(this); // passa o próprio engine para acesso ao assertEqual
			this.#results.push({ name, status: 'passed' });
			console.log(`✅ ${name}`);
			passed++;
		} catch (error) {
			this.#results.push({ name, status: 'failed', error });
			console.error(`❌ ${name}`);
			console.error(`   ↳ ${error.message}`);
		}
		}

		const failed = this.#tests.length - passed;
		console.log(`\n${passed} passed, ${failed} failed.`);
	}
}