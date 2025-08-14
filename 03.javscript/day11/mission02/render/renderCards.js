import { SORT } from '../constants.js';
import { listEl, statsEl } from '../utils/dom.js';
import { sortFn } from '../utils/filter/helperFilter.js';
import { escape, isUrl } from '../utils/utils.js';
import { renderTopTags } from './renderTopTags.js';

export function createCardsRender() {
  return function render({ items: _items, filter: _filter = {} }) {
    const selectedTags = [..._filter.selected];
    const hasSelected = selectedTags.length > 0;

    // OR
    let result = _filter.q ? _items.filter(({ title }) => title.includes(_filter.q)) : _items;
    // AND
    if (hasSelected) {
      result = _items.filter(({ tags }) => {
        const set = new Set(tags);
        return selectedTags.every((t) => set.has(t));
      });
    }

    // SORT
    const sortType = hasSelected ? SORT.TAGS : _filter.sort ?? SORT.RECENT;
    const sorted = [...result].sort(sortFn[sortType]);

    const html = sorted
      .map(({ id, title, url, tags }) => {
        const urlMarkup = url
          ? isUrl(url)
            ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(url)}</a>`
            : `<span>${escape(url)}</span>`
          : '';

        const tagsMarkup = tags
          ? `<div class="tags">${tags.map((t) => `<span class="tag" data-tag="${escape(t)}">#${escape(t)}</span>`).join('')}</div>`
          : '';

        return `
        <article class="card" data-id="${escape(id)}">
          <h3>${escape(title)}</h3>
          ${urlMarkup}
          ${tagsMarkup}
          <div class="actions">
            <button class="btn-delete" type="button">삭제</button>
          </div>
        </article>
      `;
      })
      .join('');

    listEl.innerHTML = html;
    statsEl.textContent = `총 ${result.length}개 `;
    renderTopTags(result);
  };
}
