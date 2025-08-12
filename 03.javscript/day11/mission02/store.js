import { loadItem, saveItem } from './utils/storage.js';

// Pub/Sub store
class Store {
  #state; // 현재 상태 저장
  #listeners = new Set(); // 상태 변경을 구독한 함수 저장

  constructor(initialState) {
    this.#state = initialState; // loadItem()로 생성하여 해당 값을 초기값으로 사용
  }

  get() {
    return this.#state;
  }

  set(updater) {
    // updater가 함수면 현재 상태를 기반으로 새 상태 갱신
    const next = typeof updater === 'function' ? updater(this.#state) : updater;
    if (next === this.#state) return;
    // 변경되면 현재 상태 할당 및 구독자에게 새로운 상태 전달
    this.#state = next;
    this.#listeners.forEach((fn) => fn(this.#state));
  }

  // 상태 구독 메서드
  subscribe(fn) {
    this.#listeners.add(fn);
    // 구독 해제
    return () => this.#listeners.delete(fn);
  }
}

export const store = new Store(loadItem());

store.subscribe(saveItem);
