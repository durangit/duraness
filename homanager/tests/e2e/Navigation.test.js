export default function NavigationTests({ register, compare }) {
	register("navigation", async () => {
		const iframe = document.createElement("iframe");
		iframe.src = new URL('../../index.html', import.meta.url).href;
		iframe.style = "display: none";
		iframe.onload = () => {
			const doc = iframe.contentDocument || iframe.contentWindow.document;

			setTimeout(() => {
				const form = doc.querySelector("wc-add-form").shadowRoot;
				const radios = form.querySelectorAll("[type=radio]");
				const labels = form.querySelectorAll("[type=radio] + label");
				labels[1].click();
				compare(radios[0].checked, false);
				compare(radios[1].checked, true);
			}, 1000);
		};

		document.body.appendChild(iframe);
	});
};