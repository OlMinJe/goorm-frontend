import { INITIAL_STATE } from '../constants.js';
import { store } from '../store.js';
import { clearFiltersEl, listEl, qInputEl, sortEl } from './dom.js';

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 검색
export function sarchFilter() {
  const run = debounce((q) => {
    store.set((prev) => ({ ...prev, filter: { ...prev.filter, q: String(q || '').toLowerCase() } }));
  }, 300);

  if (!qInputEl) return;
  qInputEl.addEventListener('input', (e) => run(e.target?.value ?? ''));
}

// 태그
export function tagFilter() {
  listEl.addEventListener('click', (e) => {
    const tagEl = e.target;
    if (!tagEl) return;

    const tagValue = (tagEl.dataset.tag || '').trim();
    if (!tagValue) return;

    store.set((prev) => {
      const prevSel = prev.filter?.selected ?? [];
      const selected = new Set([...prevSel].filter(Boolean));

      selected.has(tagValue) ? selected.delete(tagValue) : selected.add(tagValue);

      const q = [...selected].map((t) => `#${t}`);

      if (qInputEl) qInputEl.value = q.join('');
      return { ...prev, filter: { ...prev.filter, selected, q } };
    });
  });
}

// 정렬
export function sortFilter() {
  if (!sortEl) return;
  sortEl.value = store.get()?.filter?.sort || INITIAL_STATE.filter?.sort;
  sortEl.addEventListener('change', (e) => {
    store.set((prev) => ({ ...prev, filter: { ...prev.filter, sort: e.target.value } }));
  });
}

// 검색 및 정렬 초기화
export function clearFilter() {
  if (!clearFiltersEl || !qInputEl) return;

  clearFiltersEl.addEventListener('click', () => {
    if (qInputEl) qInputEl.value = '';
    if (sortEl) sortEl.value = INITIAL_STATE.filter?.sort;

    store.set((prev) => ({ ...prev, filter: { ...INITIAL_STATE.filter } }));
  });
}
