import { SORT } from '../../constants.js';

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export const toLower = (v) => String(v || '').toLowerCase();

export const sortFn = {
  [SORT.TITLE]: (a, b) => String(a.title || '').localeCompare(String(b.title || ''), 'ko'),
  [SORT.TAGS]: (a, b) => (b.tags?.length ?? 0) - (a.tags?.length ?? 0) || (b.createdAt ?? 0) - (a.createdAt ?? 0),
  [SORT.RECENT]: (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
};

export const getSelectedSet = (sel) => (sel instanceof Set ? sel : new Set(Array.isArray(sel) ? sel.filter(Boolean) : []));

export const getMatchesWords = (item, words) => {
  if (!words.length) return true;
  const title = toLower(item.title);
  const tags = (item.tags || []).map(toLower);
  return words.some((w) => title.includes(w) || tags.some((t) => t.includes(w)));
};

export const getHasTags = (itemTags = [], requiredTags = []) => {
  if (!requiredTags.length) return true;
  const set = new Set(itemTags.map(toLower));
  return requiredTags.every((t) => set.has(t));
};

export function parseQuery(raw) {
  const parse = String(raw || '')
    .split('#')
    .map((s) => s.trim())
    .filter(Boolean);

  const tags = [];
  const words = [];

  for (const t of parse) {
    if (t.startsWith('#')) tags.push(t.slice(1).toLowerCase());
    else words.push(t.toLowerCase());
  }
  return { tags, words };
}
