import wComponent from '../../core/w-component.js';

const editCode = (language, code) => {
	const tabsToRemove = code.match(/^\n*(\t+)/)[1].length;
	const identedCode = code.replace(new RegExp(`\t{${tabsToRemove}}`, 'g'), '');

	if (language === 'css') {
		const codeWithProperties = identedCode.replace(new RegExp(`(:)([\\s\\S]*?)(;)`, 'g'), `$1<span style="color: orange">$2</span>$3`);
		const codeWithSelectors = codeWithProperties.replace(new RegExp(`(\n|\t)([a-zA-Z0-9-]+)(:)`, 'g'), `$1<span style="color: yellow">$2</span>$3`);
		const codeWithVariables = codeWithSelectors.replace(new RegExp(`(--[a-zA-Z0-9-]+)(<)|(--[a-zA-Z0-9-]+)(\\))`, 'g'), `<span style="color: lightblue">$1$3</span>$2$4`);
		const codeWithParentesis = codeWithVariables.replace(new RegExp(`(\\(|\\[|\\{|\\}|\\]|\\))`, 'g'), `<span style="color: pink">$1</span>`);
		const codeWithReservedWords = codeWithParentesis.replace(new RegExp(`\\b(var|calc)\\b`, 'g'), `<span style="color: gold">$1</span>`);
		const codeWithComments = codeWithReservedWords.replace(new RegExp(`(/\\*[\\s\\S]*?\\*/)`, 'g'), `<span style="color: lightgreen">$1</span>`);
		return codeWithComments;
	}

	return identedCode;
};

export default class aCode extends wComponent {
	constructor() {
		super(component => {
			const language = component.getAttribute('language');
			const elPre = document.createElement('pre');
			const elCode = document.createElement('code');

			component.setStyle(`
				.code {
					& pre {
						background-color: var(--black);
						color: var(--white);
						padding: 1rem;
						white-space: pre-wrap;
					}

					& code {
						display: block;
					}
				}
			`);

			component.innerHTML = editCode(language, component.innerHTML);
			elCode.appendChild(component.getContent());

			elPre.appendChild(elCode);

			component.setClass('code');
			component.append(elPre);
		});
	}
}