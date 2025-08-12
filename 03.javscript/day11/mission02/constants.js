export const TAG_REGULAR = /#([^\s#]+)/g;
export const STORAGE_KEY = 'bookmark';
export const THEME_KEY = 'light';
export const SORT = {
  RECENT: 'recent',
  TITLE: 'title',
  TAGS: 'tags',
};
export const INITIAL_STATE = {
  themeMode: THEME_KEY,
  items: [],
  filter: { q: '', selected: new Set(), sort: SORT.RECENT },
};
