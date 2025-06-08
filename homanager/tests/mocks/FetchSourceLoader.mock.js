import FetchSourceLoader from "../../src/infrastructure/source/FetchSourceLoader.js";
import RuntimeCacheControl from "../../src/infrastructure/cache/RuntimeCacheControl.js";

export default new FetchSourceLoader({
	cacheControl: new RuntimeCacheControl(),
});