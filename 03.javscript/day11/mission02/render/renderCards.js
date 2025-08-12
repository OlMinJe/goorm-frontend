import { SORT } from '../constants.js';
import { listEl, statsEl } from '../utils/dom.js';
import { escape } from '../utils/escape.js';
import { isUrl } from '../utils/urlWithTag.js';
import { rednerTopTags } from './renderTopTags.js';

const sortFn = {
  [SORT.TITLE]: (a, b) => String(a.title || '').localeCompare(String(b.title || ''), 'ko'),
  [SORT.TAGS]: (a, b) => (b.tags?.length ?? 0) - (a.tags?.length ?? 0) || (b.createdAt ?? 0) - (a.createdAt ?? 0),
  [SORT.RECENT]: (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
};

export function createCardsRenderer() {
  const toLower = (v) => String(v || '').toLowerCase();

  // 검색어를 포함하는지
  const matchesQuery = (item, q) => {
    const keyword = toLower(q);
    if (!keyword) return true;
    const inTitle = toLower(item.title).includes(keyword);
    const inTags = (item.tags || []).some((t) => toLower(t).includes(keyword));
    return inTitle || inTags;
  };

  // selected를 항상 Set으로 정규화
  const toSelectedSet = (selected) => {
    if (selected instanceof Set) return selected;
    if (Array.isArray(selected)) return new Set(selected.filter(Boolean));
    return new Set();
  };

  // 검색 필터
  const filterByQuery = (items, q) => (!q ? items : items.filter((it) => matchesQuery(it, q)));

  // 선택 태그 필터
  const filterBySelected = (items, selected) => {
    const set = toSelectedSet(selected);
    if (set.size === 0) return items;
    return items.filter((it) => (it.tags || []).some((t) => set.has(t)));
  };

  // ============ redner ============
  return function render({ items, filter: f = {} }) {
    const q = toLower(f.q);
    const sortKey = f.sort ?? SORT.RECENT;
    const selected = toSelectedSet(f.selected);

    // 검색, 태그 선택, 정렬
    let result = filterByQuery(items, q);
    result = filterBySelected(result, selected);
    if (selected.size) result = [...result].sort(sortFn[SORT.TAGS]);
    else result = [...result].sort(sortFn[sortKey] || sortFn[SORT.RECENT]);

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
