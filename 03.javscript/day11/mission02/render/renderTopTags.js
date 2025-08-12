import { statsEl } from '../utils/dom.js';

export function rednerTopTags(items) {
  const tagCountMap = new Map();

  items.forEach(({ tags = [] }) => {
    tags.forEach((tag) => {
      const count = (tagCountMap.get(tag) || 0) + 1;
      tagCountMap.set(tag, count);
    });
  });

  const sortedTags = [...tagCountMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  const result = sortedTags.length ? sortedTags.map(([tag, count]) => `#${tag}(${count})`).join(' ') : '태그 없음';
  statsEl.textContent += result;
}
