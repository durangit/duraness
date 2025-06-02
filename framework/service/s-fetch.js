import sCache from "./s-cache.js";

export default class sFetch {
	static #callbackQueues = new Map();

	static async file(url, afterLoad) {
		if (sCache.has(url)) {
			afterLoad(sCache.get(url));
			return;
		}

		this.addCallbackQueue(url, afterLoad);
		await this.#promise(url);
	}

	static #safeFetch(response) {
		if (response.ok) {
			return response.text();
		} else {
			return null;
		}
	}

	static addCallbackQueue(url, callback) {
		if (!this.#callbackQueues.has(url)) {
			this.#callbackQueues.set(url, {
				promise: fetch(url).then(this.#safeFetch),
				callbacks: [],
			});
		}

		this.#callbackQueues.get(url).callbacks.push(callback);
	}

	static async #promise(path) {
		const queue = this.#callbackQueues.get(path);
		const content = await queue.promise;
		if (!sCache.has(path)) {
			sCache.set(path, content);

			for (const callback of queue.callbacks) {
				callback(content);
			}

			this.#callbackQueues.delete(path);
		}
	}
}