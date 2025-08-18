export const isArray = Array.isArray;
export const isUrl = (url) => /^https?:\/\//.test(url ?? '');

export const asStringNull = (v) => String(v ?? '');
export const asStringFalsy = (v) => String(v || '');
export const asLower = (v) => String(v || '').toLowerCase();
export const asNumber = (v) => Number(v ?? 0);

export const getTodayDate = () => Date.now() + Math.random() * 1000;

export const escape = (s = '') =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export const reviveSelected = (sel) => {
  if (sel instanceof Set) return sel;
  if (isArray(sel)) return new Set(sel);
  return new Set();
};

export const serializeSelected = (sel) => {
  if (isArray(sel)) return sel;
  if (sel instanceof Set) return [...sel];
  return [];
};
