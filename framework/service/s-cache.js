export default class sCache {
    static #cache = new Map();

    static get(key) {
        return this.#cache.get(key);
    }

    static set(key, value) {
        this.#cache.set(key, value);
    }

    static has(key) {
        return this.#cache.has(key);
    }

    static delete(key) {
        return this.#cache.delete(key);
    }

    static clear() {
        this.#cache.clear();
    }
}