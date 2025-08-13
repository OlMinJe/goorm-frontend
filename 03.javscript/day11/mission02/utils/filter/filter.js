import { INITIAL_STATE, TAG_REGULAR } from '../../constants.js';
import { store } from '../../store.js';
import { clearFiltersEl, listEl, qInputEl, sortEl } from '../dom.js';
import { asLower, reviveSelected } from '../utils.js';
import { debounce } from './helperFilter.js';

// 검색 입력 (디바운스) ============================================
export function sarchFilter() {
  const run = debounce((q) => {
    store.set((prev) => ({ ...prev, filter: { ...prev.filter, q: asLower(q) } }));
  }, 300);

  if (!qInputEl) return;
  qInputEl.addEventListener('input', (e) => run(e.target.value ?? ''));

  qInputEl.addEventListener('keydown', (e) => {
    if (e.key !== 'Backspace') return;

    const el = e.currentTarget;
    const { value, selectionStart, selectionEnd } = el;

    // 커서 맨 뒤
    const isCcursorEnd = selectionStart === selectionEnd && selectionEnd === value.length;
    if (!isCcursorEnd || !value) return;

    const tags = (value.match(TAG_REGULAR) || []).map((s) => s.slice(1));
    if (tags.length === 0) return;

    e.preventDefault(); // 중복 삭제 방지 - 해시태그에서 문자 1개 삭제의 원인
    tags.pop();

    const qStr = tags.map((t) => `#${t}`).join('');
    el.value = qStr;

    store.set((prev) => ({ ...prev, filter: { ...prev.filter, q: qStr, selected: tags } }));
  });
}

// 태그 클릭 ============================================
export function tagFilter() {
  listEl.addEventListener('click', (e) => {
    const tagEl = e.target?.closest?.('[data-tag]');
    if (!tagEl) return;

    const tag = (tagEl.dataset.tag || '').trim().toLowerCase();
    if (!tag) return;

    store.set((prev) => {
      const selected = reviveSelected(prev.filter?.selected);
      selected.has(tag) ? selected.delete(tag) : selected.add(tag); // like toggle..

      const qStr = [...selected].map((t) => `#${t}`).join('');
      if (qInputEl) qInputEl.value = qStr;
      return { ...prev, filter: { ...prev.filter, selected, q: qStr } };
    });
  });
}

// 정렬 클릭 ============================================
export function sortFilter() {
  if (!sortEl) return;
  sortEl.value = store.get().filter.sort;
  sortEl.addEventListener('change', (e) => {
    store.set((prev) => ({ ...prev, filter: { ...prev.filter, sort: e.target.value } }));
  });
}

// 필터 초기화 클릭 ============================================
export function clearFilter() {
  if (!clearFiltersEl || !qInputEl) return;
  clearFiltersEl.addEventListener('click', () => {
    if (qInputEl) qInputEl.value = INITIAL_STATE.filter.q;
    if (sortEl) sortEl.value = INITIAL_STATE.filter.sort;
    store.set((prev) => ({ ...prev, filter: { ...INITIAL_STATE.filter } }));
  });
}
