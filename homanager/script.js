
import wcScreen from "../framework/components/organisms/o-screen.js";
import wcThread from "../framework/components/organisms/o-thread.js";
import wcContainer from "../framework/components/organisms/o-container.js";
import wcWrapper from "../framework/components/organisms/o-wrapper.js";
import wcIconBar from "./components/icon-bar/export.js";
import wcCard from "./components/card/export.js";

document.addEventListener("DOMContentLoaded", () => {
	customElements.define("wc-screen", wcScreen);
	customElements.define("wc-thread", wcThread);
	customElements.define("wc-container", wcContainer);
	customElements.define("wc-wrapper", wcWrapper);
	customElements.define("wc-icon-bar", wcIconBar);
	customElements.define("wc-card", wcCard);
});