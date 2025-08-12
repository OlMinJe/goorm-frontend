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

// 정렬
export function sortFilter() {
  if (!sortEl) return;
  sortEl.value = store.get()?.filter?.sort || INITIAL_STATE.filter?.sort;
  sortEl.addEventListener('change', (e) => {
    store.set((prev) => ({ ...prev, filter: { ...prev.filter, sort: e.target.value } }));
  });
}

// 태그
export function tagFilter() {
  listEl.addEventListener('click', (e) => {
    const tag = e.target;
    if (!tag || !tag.matches('.tag')) return;

    const tagValue = tag.dataset.tag;
    if (!tagValue) return;

    store.set((prev) => {
      const selected = new Set([...prev.filter?.selected].filter(Boolean));

      if (selected.has(tagValue)) {
        // 여러 개 넣으면,,, 당연히,, ,삭제가 에바겠지...
        selected.delete(tagValue);
      } else {
        selected.add(tagValue);
        // TODO: ,넣으면 검색이 안되지......허허허
        // qInputEl.value = [...selected].join(', ');
      }

      return { ...prev, filter: { ...prev.filter, selected } };
    });
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
