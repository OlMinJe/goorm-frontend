export const STORAGE_KEY = 'bookmark';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const SORT = {
  RECENT: 'recent',
  TITLE: 'title',
  TAGS: 'tags',
};

export const INITIAL_STATE = {
  themeMode: THEME.LIGHT,
  items: [],
  filter: { q: '', selected: new Set(), sort: SORT.RECENT },
};
