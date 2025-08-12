import { SORT, TAG_REGULAR } from '../constants.js';
import { listEl, statsEl } from '../utils/dom.js';
import { getMatchesWords, sortFn } from '../utils/filter/helperFilter.js';
import { asString, escape, isUrl } from '../utils/utils.js';
import { rednerTopTags } from './renderTopTags.js';

export function createCardsRenderer() {
  return function render({ items, filter: f = {} }) {
    // 해시태그 제외 후 진행
    const words = asString(f.q).replace(TAG_REGULAR, ' ').split(/\s+/).filter(Boolean);
    const selectedLower = Array.from(f.selected);

    // OR
    let result = items.filter((item) => getMatchesWords(item, words));

    // AND
    if (selectedLower.length) {
      result = result.filter(({ tags = [] }) => {
        if (tags.length < selectedLower.length) return false;
        const set = new Set(tags);
        return selectedLower.every((t) => set.has(t));
      });
    }

    const sortType = selectedLower.length ? SORT.TAGS : f.sort ?? SORT.RECENT;
    result = result.sort(sortFn[sortType]);

    const html = result
      .map(
        ({ id, title, url, tags = [] }) => `
            <article class="card" data-id="${id}">
              <h3>${escape(title)}</h3>
              ${url && isUrl(url) ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">열기</a>` : ''}
              ${
                tags.length && `<div class="tags">${tags.map((t) => `<span class="tag" data-tag="${escape(t)}">#${escape(t)}</span>`).join('')}</div>`
              }
              <div class="actions">
                <button class="btn-delete" type="button">삭제</button>
              </div>
            </article>
          `
      )
      .join('');

    listEl.innerHTML = html;

    statsEl.textContent = `총 ${result.length}개 `;
    rednerTopTags(result);
  };
}
