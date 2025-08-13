import { SORT, TAG_REGULAR } from '../constants.js';
import { listEl, statsEl } from '../utils/dom.js';
import { getMatchesWords, sortFn } from '../utils/filter/helperFilter.js';
import { parseInputValue, escape, isUrl, serializeSelected } from '../utils/utils.js';
import { rednerTopTags } from './renderTopTags.js';

export function createCardsRenderer() {
  return function render({ items: _items, filter: _filter = {} }) {
    const words = parseInputValue(_filter.q);
    const hasWords = words.length > 0;

    const selectedTags = serializeSelected(_filter.selected);
    const hasSelected = selectedTags.length > 0;

    // OR
    let result = hasWords ? getMatchesWords(_items, words) : _items;

    // AND
    if (hasSelected) {
      result = result.filter(({ tags }) => {
        if (tags.length < selectedTags.length) return false;
        const set = new Set(tags);
        return selectedTags.every((t) => set.has(t));
      });
    }

    // SORT
    const sortType = _filter.selected.size ? SORT.TAGS : _filter.sort ?? SORT.RECENT;
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
    rednerTopTags(result);
  };
}
