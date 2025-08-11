import { SORT } from '../constants.js';
import { createEl, listEl, statsEl } from '../utils/dom.js';
import { isUrl } from '../utils/urlWithTag.js';

const sortFn = {
  [SORT.TITLE]: (a, b) => String(a.title || '').localeCompare(String(b.title || ''), 'ko'),
  [SORT.TAGS]: (a, b) => (b.tags?.length ?? 0) - (a.tags?.length ?? 0) || (b.createdAt ?? 0) - (a.createdAt ?? 0),
  [SORT.RECENT]: (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
};

const match = (text, q) => String(text).toLowerCase().includes(q);

export function createCardsRenderer() {
  return function render({ items, filter: filters }) {
    const q = String(filters?.q || '').trim().toLowerCase(); // prettier-ignore
    const sort = filters?.sort || SORT.RECENT;

    let result = items;

    // 검색
    const filtered = q ? items.filter(({ title, tags }) => match(title, q) || (tags || []).some((t) => match(t, q))) : items;
    // 정렬
    result = [...filtered].sort(sortFn[sort] || sortFn[SORT.RECENT]);

    // 요소 생성
    const frag = document.createDocumentFragment();
    for (const { id, title, url, tags } of result) {
      const card = createEl('article', { className: 'card', attrs: { 'data-id': String(id) } });
      card.append(createEl('h3', { text: title }));

      if (url) {
        card.append(
          isUrl(url)
            ? createEl('a', { text: '열기', attrs: { href: url, target: '_blank', rel: 'noopener' } })
            : createEl('div', { className: 'muted', text: url })
        );
      }

      if (tags?.length) {
        const tagEls = tags.map((t) => createEl('span', { className: 'tag', text: `#${t}` }));
        card.append(createEl('div', { className: 'tags', children: tagEls }));
      }

      card.append(
        createEl('div', {
          className: 'actions',
          children: [createEl('button', { className: 'btn-delete', text: '삭제', attrs: { type: 'button' } })],
        })
      );
      frag.append(card);
    }

    listEl.replaceChildren(frag);
    statsEl.textContent = `총 ${result.length}개`;
  };
}
