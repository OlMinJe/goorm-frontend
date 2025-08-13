import { SORT } from '../../constants.js';
import { asNumber, asStringNull, isArray } from '../utils.js';

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

  // NOTE 수업 도중에 나온 질문 - 제목이 같으면 어케 정렬됨.
  return {
    [SORT.TITLE]: (a, b) => asStringNull(a.title).localeCompare(asStringNull(b.title), 'ko'),
    [SORT.TAGS]: (a, b) => tagCount(b) - tagCount(a) || asNumber(b?.createdAt) - asNumber(a?.createdAt),
    [SORT.RECENT]: (a, b) => asNumber(b?.createdAt) - asNumber(a?.createdAt),
  };
})();

// 검색어가 제목 및 태그에 포함되는지 확인하는 함수(OR 조건) ======================
export const getMatchesWords = (items, tokens) => {
  if (!tokens.length || !items.length) return items;

  const hasTokenInTitle = (title, tokens) => tokens.some((t) => title.includes(t));
  const hasTokenInTags = (tags, tokens) => tokens.some((t) => tags.some((tag) => tag.includes(t)));

  return items.filter(({ title, tags }) => hasTokenInTitle(title, tokens) || hasTokenInTags(tags, tokens));
};
