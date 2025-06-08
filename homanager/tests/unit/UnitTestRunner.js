import engine from "./UnitTestEngine.js";

const testFiles = [
	'./RenderPage.test.js',
	'./RenderHome.test.js',
];

const loadTests = async files => {
	for (const filePath of files) {
		const module = await import(filePath);
      	const filename = filePath.split('/').pop();

		if (typeof module.default === 'function') {
			const testRegister = (testName, fn) => {
				engine.register(filename, testName, fn);
			};

			module.default({
				register: testRegister,
				compare: engine.assert.bind(engine),
			});
		}
	}
};

const runTests = async files => {
	document.getElementById('test-results').textContent = 'Executando testes...';

	await loadTests(files);

	const resultsEl = document.getElementById('test-results');
	resultsEl.innerHTML = '';

	let passed = 0;
	const registeredTests = engine.getRegistered();
	const total = registeredTests.length;

	for (const { testName, fn, fileName } of registeredTests) {
		const p = document.createElement('p');
		const label = `[${fileName}] ${testName}`;

		try {
			await fn({
				assert: engine.assert.bind(engine)
			});
			p.textContent = `✅ ${label}`;
			p.className = 'pass';
			passed++;
		} catch (error) {
			p.textContent = `❌ ${label}: ${error.message}`;
			p.className = 'fail';
		}
		
		resultsEl.appendChild(p);
	}

	const summary = document.createElement('p');
	summary.className = 'summary';
	summary.textContent = `Resultado: ${passed}/${total} teste(s) passaram.`;
	resultsEl.appendChild(summary);
};

runTests(testFiles);