import { SORT } from '../constants.js';
import { listEl, statsEl } from '../utils/dom.js';
import { escape } from '../utils/escape.js';
import { parseQuery } from '../utils/parseQuery.js';
import { toLower } from '../utils/toLower.js';
import { isUrl } from '../utils/urlWithTag.js';
import { rednerTopTags } from './renderTopTags.js';

// 유틸 ================================================
const sortFn = {
  [SORT.TITLE]: (a, b) => String(a.title || '').localeCompare(String(b.title || ''), 'ko'),
  [SORT.TAGS]: (a, b) => (b.tags?.length ?? 0) - (a.tags?.length ?? 0) || (b.createdAt ?? 0) - (a.createdAt ?? 0),
  [SORT.RECENT]: (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
};

const toSelectedSet = (sel) => (sel instanceof Set ? sel : new Set(Array.isArray(sel) ? sel.filter(Boolean) : []));

const matchesWords = (item, words) => {
  if (!words.length) return true;
  const title = toLower(item.title);
  const tags = (item.tags || []).map(toLower);
  return words.some((w) => title.includes(w) || tags.some((t) => t.includes(w)));
};

const hasAllTags = (itemTags = [], requiredTags = []) => {
  if (!requiredTags.length) return true;
  const set = new Set(itemTags.map(toLower));
  console.log(requiredTags);
  return requiredTags.every((t) => {
    console.log(t);
    return set.has(t);
  });
};

// redner ================================================
export function createCardsRenderer() {
  return function render({ items, filter: f = {} }) {
    const sortKey = f.sort ?? SORT.RECENT;
    const selected = toSelectedSet(f.selected);

    const { tags: qTags, words } = parseQuery(f.q);
    const requiredTags = [...new Set([...[...selected].map(toLower), ...qTags])];

    // 검색, 태그 선택, 정렬
    let result = items.filter((it) => matchesWords(it, words));
    result = result.filter(({ tags }) => hasAllTags(tags, requiredTags));
    result = [...result].sort(requiredTags.length ? sortFn[SORT.TAGS] : sortFn[sortKey] || sortFn[SORT.RECENT]);

    const html = result
      .map(
        ({ id, title, url, tags = [] }) => `
            <article class="card" data-id="${id}">
              <h3>${escape(title)}</h3>
              ${
                url
                  ? isUrl(url)
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

// 요소 생성
// const frag = document.createDocumentFragment();

// for (const { id, title, url, tags } of result) {
//   const card = createEl('article', { className: 'card', attrs: { 'data-id': String(id) } });
//   card.append(createEl('h3', { text: title }));

//   if (url) {
//     card.append(
//       isUrl(url)
//         ? createEl('a', { text: '열기', attrs: { href: url, target: '_blank', rel: 'noopener noreferrer' } })
//         : createEl('div', { className: 'muted', text: url })
//     );
//   }

//   if (tags?.length) {
//     const tagEls = tags.map((t) => createEl('span', { className: 'tag', text: `#${t}`, attrs: { 'data-tag': t } }));
//     card.append(createEl('div', { className: 'tags', children: tagEls }));
//   }

//   card.append(
//     createEl('div', {
//       className: 'actions',
//       children: [createEl('button', { className: 'btn-delete', text: '삭제', attrs: { type: 'button' } })],
//     })
//   );
//   frag.append(card);
// }

// listEl.replaceChildren(frag);
