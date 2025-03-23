import wcLabel from "./framework/components/atoms/a-label.js";
import wcCode from "./framework/components/atoms/a-code.js";
import wcButton from "./framework/components/molecules/m-button.js";
import wcWrapper from "./framework/components/organisms/o-wrapper.js";
import wcContainer from "./framework/components/organisms/o-container.js";
import wcThread from "./framework/components/organisms/o-thread.js";
import wcScreen from "./framework/components/organisms/o-screen.js";

document.addEventListener("DOMContentLoaded", () => {
	customElements.define("wc-label", wcLabel);
	customElements.define("wc-code", wcCode);
	customElements.define("wc-button", wcButton);
	customElements.define("wc-wrapper", wcWrapper);
	customElements.define("wc-container", wcContainer);
	customElements.define("wc-thread", wcThread);
	customElements.define("wc-screen", wcScreen);
});