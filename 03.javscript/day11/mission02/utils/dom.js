export function createEl(tag, { className, text, html, attrs, children } = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  if (html) el.innerHTML = html;
  if (attrs) for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  if (children) el.append(...children);
  return el;
}

export const themeBtnEl = document.getElementById('theme-btn');

export const formEl = document.getElementById('add-form');
export const titleEl = document.getElementById('title');
export const urlEl = document.getElementById('url');
export const tagsEl = document.getElementById('tags');

export const qInputEl = document.getElementById('q');
export const sortEl = document.getElementById('sort');
export const clearFiltersEl = document.getElementById('clear-filters');

export const listEl = document.getElementById('list');
export const statsEl = document.getElementById('stats');
