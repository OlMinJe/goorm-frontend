import { SORT } from '../constants.js';
import { listEl, statsEl } from '../utils/dom.js';
import { escape } from '../utils/escape.js';
import { getHasTags, getMatchesWords, getSelectedSet, parseQuery, sortFn, toLower } from '../utils/filter/helperFilter.js';
import { rednerTopTags } from './renderTopTags.js';

// render ================================================
export function createCardsRenderer() {
  return function render({ items, filter: f = {} }) {
    const sortKey = f.sort ?? SORT.RECENT;
    const selected = getSelectedSet(f.selected);

    const { tags: qTags, words } = parseQuery(f.q);
    const requiredTags = [...new Set([...[...selected].map(toLower), ...qTags])];

    // 검색, 태그 선택, 정렬
    let result = items.filter((it) => getMatchesWords(it, words));
    result = result.filter(({ tags }) => getHasTags(tags, requiredTags));
    result = [...result].sort(requiredTags.length ? sortFn[SORT.TAGS] : sortFn[sortKey] || sortFn[SORT.RECENT]);

    const html = result
      .map(
        ({ id, title, url, tags = [] }) => `
            <article class="card" data-id="${id}">
              <h3>${escape(title)}</h3>
              ${
                url
                  ? /^https?:\/\//.test(url)
                    ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">열기</a>`
                    : `<div class="muted">${escape(url)}</div>`
                  : ''
              }
              ${
                tags.length
                  ? `<div class="tags">${tags.map((t) => `<span class="tag" data-tag="${escape(t)}">#${escape(t)}</span>`).join('')}</div>`
                  : ''
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
