import { INITIAL_STATE, STORAGE_KEY } from '../constants.js';

const reviveSelected = (sel) => new Set(Array.isArray(sel) ? sel : []);
const serializeSelected = (sel) => (Array.isArray(sel) ? sel : [...(sel ?? [])]);

export function loadItem() {
  const raw = localStorage.getItem(STORAGE_KEY) ?? [];
  const parsed = JSON.parse(raw);
  if (!parsed) return { ...INITIAL_STATE };

  return parsed
    ? {
        ...INITIAL_STATE,
        ...parsed,
        filter: {
          ...INITIAL_STATE.filter,
          ...parsed.filter,
          selected: reviveSelected(parsed.filter?.selected),
        },
      }
    : INITIAL_STATE;
}

// 로컬 스토리지 저장하기
export function saveItem(state) {
  // localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, items: state.items }));

  const { filter, ...rest } = state ?? {};
  const serializable = {
    ...rest,
    items: Array.isArray(state?.items) ? state.items : [],
    filter: {
      ...filter,
      selected: serializeSelected(filter?.selected),
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}
