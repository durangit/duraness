import CacheControl from "../../application/ports/outputs/CacheControl.js";

export default class RuntimeCacheControl extends CacheControl {
    #cache = new Map();

    get(key) {
        return this.#cache.get(key);
    }

    set(key, value) {
        this.#cache.set(key, value);
    }

    has(key) {
        return this.#cache.has(key);
    }

    delete(key) {
        return this.#cache.delete(key);
    }

    clear() {
        this.#cache.clear();
    }
}