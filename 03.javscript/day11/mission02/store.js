import { loadItem, saveItem } from './utils/storage.js';

// Pub/Sub store
class Store {
  #state; // 현재 상태 저장
  #listeners = new Set(); // 상태 변경을 구독한 콜백 함수들의 집합

  constructor(initialState) {
    this.#state = initialState;
  }

  get() {
    return this.#state;
  }

  set(updater) {
    const next = typeof updater === 'function' ? updater(this.#state) : updater;
    if (next === this.#state) return;

    this.#state = next; // 변경되면 현재 상태 할당 및 구독자에게 새로운 상태 전달
    // 모든 구독자(listener)에게 "새 상태"를 전달하여 후속 동작(렌더링 등) 진행
    this.#listeners.forEach((fn) => fn(this.#state));
  }

  // 상태 구독 메서드- 인자로 전달한 콜백은 "set으로 상태가 바뀔 때마다" 호출됨.
  subscribe(fn) {
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn); // 콜백 함수 실행 이후, 다 사용했으니 구독 해제
  }
}

export const store = new Store(loadItem());

store.subscribe(saveItem);
