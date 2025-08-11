// prettier-ignore
export const parseTags = v => v.split(',').map(s => s.trim()).filter(Boolean);
export const isUrl = (s) => /^https?:\/\//.test(s);
