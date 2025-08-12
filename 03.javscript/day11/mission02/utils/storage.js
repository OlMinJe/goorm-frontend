import { INITIAL_STATE, STORAGE_KEY } from '../constants.js';
import { isArray, reviveSelected, serializeSelected } from './utils.js';

const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

export function loadItem() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = parseJSON(raw);
  if (!parsed) return { ...INITIAL_STATE, selected: reviveSelected(INITIAL_STATE.filter?.selected) };

  const items = isArray(parsed.items) ? parsed.items : INITIAL_STATE.items ?? [];

  const filter = {
    ...INITIAL_STATE.filter,
    ...parsed.filter,
    selected: reviveSelected(parsed.filter?.selected ?? INITIAL_STATE.filter?.selected),
  };

  return { ...INITIAL_STATE, ...parsed, items, filter };
}

// 로컬 스토리지 저장하기
export function saveItem(state) {
  const items = isArray(state.items) ? state.items : [];
  const filter = {
    ...state.filter,
    selected: serializeSelected(state.filter?.selected),
  };

  const serializable = { ...state, items, filter };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}
