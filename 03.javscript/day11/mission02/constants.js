export const TAG_REGULAR = /#([^\s#]+)/g;
export const STORAGE_KEY = 'bookmark';
export const THEME_KEY = 'light';
export const SORT = {
  RECENT: 'recent',
  TITLE: 'title',
  TAGS: 'tags',
};
export const INITIAL_STATE = {
  items: [],
  filter: { q: '', selected: new Set(), sort: SORT.RECENT },
};
