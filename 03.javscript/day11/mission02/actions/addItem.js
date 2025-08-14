import { store } from '../store.js';
import { formEl, tagsEl, titleEl, urlEl } from '../utils/dom.js';
import { Toast } from '../utils/toast.js';
import { asLower, asStringFalsy, asStringNull, getTodayDate } from '../utils/utils.js';

export function addItem() {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = getTodayDate();
    const title = asStringFalsy(titleEl.value).trim();
    const url = asStringFalsy(urlEl.value).trim();
    const tagsParse = asStringNull(tagsEl.value)
      .split(',')
      .map((s) => asLower(s).trim())
      .filter(Boolean);
    const tags = [...new Set(tagsParse)];
    const createdAt = Date.now();

    const item = { id, title, url, tags, createdAt };
    if (!item.title) return;

    store.set((prev) => ({ ...prev, items: [item, ...prev.items] }));

    const toast = new Toast();
    toast.show('추가했어요. (동기화 중)');
    formEl.reset();
  });
}
