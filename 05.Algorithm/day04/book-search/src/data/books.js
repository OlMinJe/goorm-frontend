// 재현 가능한 시드 난수 (LCG)
function makeRng(seed = 123456789) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}

const ADJ = [
  'Hidden',
  'Quiet',
  'Brave',
  'Silent',
  'Crystal',
  'Golden',
  'Silver',
  'Ancient',
  'Modern',
  'Digital',
  'Smart',
  'Happy',
  'Blue',
  'Green',
  'Red',
  'Infinite',
  'Misty',
  'Neon',
  'Cosmic',
  'Urban',
];
const NOUN = [
  'Forest',
  'River',
  'City',
  'Dream',
  'Code',
  'Pattern',
  'Algorithm',
  'Journey',
  'Light',
  'Shadow',
  'Memory',
  'Future',
  'Galaxy',
  'Garden',
  'Story',
  'Canvas',
  'Signal',
  'Bridge',
  'Vision',
  'Method',
];
const AUTH = ['A. Kim', 'B. Lee', 'C. Park', 'D. Choi', 'E. Jung', 'F. Han', 'G. Lim', 'H. Kwon', 'I. Ryu', 'J. Seo'];

export function makeBooks(n = 5000, seed = 42) {
  const r = makeRng(seed);
  const books = Array.from({ length: n }, (_, i) => {
    const title = `${ADJ[Math.floor(r() * ADJ.length)]} ${NOUN[Math.floor(r() * NOUN.length)]} ${String(i + 1).padStart(4, '0')}`;
    const author = AUTH[Math.floor(r() * AUTH.length)];
    const year = 1990 + Math.floor(r() * 35); // 1990~2024
    return { id: i + 1, title, author, year };
  });
  // 제목 기준 정렬 (사전식)
  books.sort((a, b) => a.title.localeCompare(b.title));
  return books;
}

// 기본 데이터 세트
export const BOOKS = makeBooks(5000, 99);
