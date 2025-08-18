import { statsEl } from '../utils/dom.js';

export function renderTopTags(items) {
  const tagCountMap = new Map();

  items.forEach(({ tags }) => {
    tags.forEach((tag) => {
      const count = (tagCountMap.get(tag) || 0) + 1;
      tagCountMap.set(tag, count);
    });
  });

  const tagCountArray = Array.from(tagCountMap, ([tag, count]) => ({ tag, count }));
  const sortedTags = tagCountArray.sort((a, b) => b.count - a.count).slice(0, 5);

  const formatTag = ({ tag, count }) => `#${tag}(${count})`;
  const topFiveText = !sortedTags.length ? '태그 없음' : sortedTags.map(formatTag).join(' ');
  statsEl.textContent += topFiveText;
}
