import { store } from '../store.js';
import { formEl, tagsEl, titleEl, urlEl } from '../utils/dom.js';
import { Toast } from '../utils/toast.js';

export function addItem() {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Date.now() + Math.random() * 1000;
    const title = (titleEl.value || '').trim();
    const url = (urlEl.value || '').trim();
    const tags = Array.from(
      new Set(
        (tagsEl.value ?? '')
          .split(',')
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean)
      )
    );
    const createdAt = Date.now();

    const item = { id, title, url, tags, createdAt };

    if (!item.title) return;
    store.set((prev) => ({ ...prev, items: [item, ...prev.items] }));

    const toast = new Toast();
    toast.show('추가했어요. (동기화 중)');
    formEl.reset();
  });
}
