import { INITIAL_STATE, STORAGE_KEY } from '../constants.js';
1;
// TODO: 직렬화용 보조 객체 생성. 로컬 스토리지 가져오기
export function loadItem() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...INITIAL_STATE, ...JSON.parse(raw) } : INITIAL_STATE;
  } catch {
    return INITIAL_STATE;
  }
}

// 로컬 스토리지 저장하기
export function saveItem(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, items: state.items }));
}
