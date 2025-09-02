// 인풋에 타이핑하면 대소문자 무시하고 부분 포함되는 제목 추천
// 최대 8개까지 표시 + 선형 탐색
import { useMemo, useState } from 'react';
import { BOOKS } from './data/books';

export default function SearchAutoComplete() {
  const [query, setQuery] = useState('');
  // const [results, setResults] = useState([]);

  // const onChange = (e) => {
  //   const value = e.target.value;
  //   setQuery(value);

  //   // 최대 8개까지 표시 + 선형 탐색
  //   const search = value.trim().toLowerCase(); // 공백 제거 + 소문자 변환
  //   if (!search) {
  //     setResults([]);
  //     return;
  //   }

  //   const out = [];
  //   for (const item of BOOKS) {
  //     if (item.toLowerCase().includes(search)) { // 대소문자 무시 후 부분 포함 검사
  //       out.push(item);
  //       if (out.length === 8) break;
  //     }
  //   }

  //   setResults(out);
  // };

  const norm = (s) => s.normalize('NFC').toLowerCase().trim();

  const results = useMemo(() => {
    const search = norm(query);
    if (!search) return [];

    return BOOKS.filter((item) => norm(item).includes(search)).slice(0, 8);
  }, [query]);

  const onChange = (e) => setQuery(e.target.value);

  return (
    <div>
      <label htmlFor="title">제목 검색</label>
      <input id="title" type="text" value={query} onChange={onChange} />
      <ul>
        {query && results.length > 0 && results.map((item, idx) => <li key={`${item}-${idx}`}>{item}</li>)}
        {query && results.length === 0 && <li>검색 결과가 없음.</li>}
      </ul>
    </div>
  );
}
