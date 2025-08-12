import { INITIAL_STATE, STORAGE_KEY } from '../constants.js';
1;
// TODO: 직렬화용 보조 객체 생성. 로컬 스토리지 가져오기
export function loadItem() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = JSON.parse(raw);
  const selectedRaw = parsed?.filter?.selected;
  const selectedArr = Array.isArray(selectedRaw) ? selectedRaw : [];

  return parsed
    ? {
        ...INITIAL_STATE,
        ...parsed,
        filter: {
          ...INITIAL_STATE.filter,
          ...parsed.filter,
          selected: new Set(selectedArr),
        },
      }
    : INITIAL_STATE;
}

// 로컬 스토리지 저장하기
export function saveItem(state) {
  // localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, items: state.items }));

  const { filter, ...rest } = state;
  const serializable = {
    ...rest,
    items: Array.isArray(state?.items) ? state.items : [],
    filter: {
      ...filter,
      selected: Array.isArray(filter?.selected) ? filter.selected : [...(filter?.selected ?? [])],
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}
