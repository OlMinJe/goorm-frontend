import { store } from '../store.js';
import { formEl, tagsEl, titleEl, urlEl } from '../utils/dom.js';
import { Toast } from '../utils/toast.js';
import { parseTags } from '../utils/urlWithTag.js';

export function addItem() {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Date.now() + Math.random() * 1000;
    const title = String(titleEl.value || '').trim();
    const url = String(urlEl.value || '').trim();
    const tags = parseTags(tagsEl.value || '');
    const createdAt = Date.now();

    const item = { id, title, url, tags, createdAt };

    if (!item.title) return;
    store.set((prev) => ({ ...prev, items: [item, ...prev.items] }));

    const toast = new Toast();
    toast.show('추가했어요. (동기화 중)');
    formEl.reset();
  });
}
