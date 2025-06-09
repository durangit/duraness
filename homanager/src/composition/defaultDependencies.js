import RuntimeCacheControl from '../infrastructure/cache/RuntimeCacheControl.js';
import FetchSourceLoader from '../infrastructure/source/FetchSourceLoader.js';
import HTMLParser from '../infrastructure/source/HTMLParser.js';

const cacheControl = new RuntimeCacheControl();
const sourceLoader = new FetchSourceLoader({ cacheControl });
const templateParser = new HTMLParser();

export {
	cacheControl,
	sourceLoader,
	templateParser,
};