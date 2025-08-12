import { loadItem, saveItem } from './utils/storage.js';

// Pub/Sub store
class Store {
  #state;
  #listeners = new Set();

  constructor(initialState) {
    this.#state = initialState;
  }

  get() {
    return this.#state;
  }

  set(updater) {
    const next = typeof updater === 'function' ? updater(this.#state) : updater;
    if (next === this.#state) return;
    this.#state = next;
    this.#listeners.forEach((fn) => fn(this.#state));
  }

  subscribe(fn) {
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn);
  }
}

export const store = new Store(loadItem());
store.subscribe(saveItem);
