import SourceLoader from '../../application/ports/outputs/SourceLoader.js';

export default class FetchSourceLoader extends SourceLoader {
	#callbackQueues = new Map();
	#cacheControl;

	constructor({ cacheControl }) {
		super();

		if (!cacheControl) {
			console.error('FetchSourceLoader requires a cacheControl instance');
		}
		
		this.#cacheControl = cacheControl;
	}
	
	async load(url, afterLoad) {
		if (this.#cacheControl.has(url)) {
			const content = this.#cacheControl.get(url);
			afterLoad(content);
			return content;
		}

		this.#addCallbackQueue(url, afterLoad);
		return await this.#promise(url);
	}

	#safeFetch(response) {
		if (response.ok) {
			return response.text();
		} else {
			return null;
		}
	}

	#addCallbackQueue(url, callback) {
		if (!this.#callbackQueues.has(url)) {
			this.#callbackQueues.set(url, {
				promise: fetch(url).then(this.#safeFetch),
				callbacks: [],
			});
		}

		if (callback) {
			this.#callbackQueues.get(url).callbacks.push(callback);
		}
	}

	async #promise(path) {
		const queue = this.#callbackQueues.get(path);
		const content = await queue.promise;

		if (!this.#cacheControl.has(path)) {
			this.#cacheControl.set(path, content);

			for (const callback of queue.callbacks) {
				callback(content);
			}

			this.#callbackQueues.delete(path);
		}

		return content;
	}
}