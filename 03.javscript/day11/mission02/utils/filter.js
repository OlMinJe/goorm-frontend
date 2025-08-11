import { INITIAL_STATE } from '../constants.js';
import { store } from '../store.js';
import { clearFiltersEl, qInputEl, sortEl } from './dom.js';

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 검색
export function inputSearchFilter() {
  const run = debounce((q) => {
    store.set((prev) => ({ ...prev, filter: { ...prev.filter, q: String(q || '').toLowerCase() } }));
  }, 300);

  if (!qInputEl) return;
  qInputEl.addEventListener('input', (e) => run(e.target?.value ?? ''));
}

// 정렬
export function inputSortFilter() {
  if (!sortEl) return;

  sortEl.value = store.get()?.filter?.sort || INITIAL_STATE.filter?.sort;
  sortEl.addEventListener('change', (e) => {
    store.set((s) => ({ ...s, filter: { ...s.filter, sort: e.target.value } }));
  });
}

// TODO: 태그

// 검색 및 정렬 초기화
export function clearFilter() {
  if (!clearFiltersEl || !qInputEl) return;

  clearFiltersEl.addEventListener('click', () => {
    if (qInputEl) qInputEl.value = '';
    if (sortEl) sortEl.value = INITIAL_STATE.filter?.sort;

    store.set((prev) => ({ ...prev, filter: { ...INITIAL_STATE.filter } }));
  });
}
