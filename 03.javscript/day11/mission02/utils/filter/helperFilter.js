import { SORT } from '../../constants.js';
import { asNumber, asString, isArray } from '../utils.js';

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 정렬 기준별 정렬 함수 모음 ======================
export const sortFn = (() => {
  const tagCount = ({ tags }) => (isArray(tags) ? tags.length : 0);

  return {
    [SORT.TITLE]: (a, b) => asString(a.title).localeCompare(asString(b.title), 'ko'),
    [SORT.TAGS]: (a, b) => tagCount(b) - tagCount(a) || asNumber(b?.createdAt) - asNumber(a?.createdAt),
    [SORT.RECENT]: (a, b) => asNumber(b?.createdAt) - asNumber(a?.createdAt),
  };
})();

// 검색어가 제목 및 태그에 포함되는지 확인하는 함수(OR 조건) ======================
export const getMatchesWords = ({ title, tags }, words) => {
  if (!words.length) return true;
  return words.some((w) => title.includes(w) || tags.some((t) => t.includes(w)));
};
