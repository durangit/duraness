import RuntimeCacheControl from '../infrastructure/cache/RuntimeCacheControl.js';
import FetchSourceLoader from '../infrastructure/source/FetchSourceLoader.js';
import HTMLRenderer from '../infrastructure/source/HTMLRenderer.js';

const cacheControl = new RuntimeCacheControl();
const sourceLoader = new FetchSourceLoader({ cacheControl });
const templateRenderer = new HTMLRenderer();

export default {
	cacheControl,
	sourceLoader,
	templateRenderer,
};