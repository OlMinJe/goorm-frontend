import { useCallback, useMemo, useState } from 'react';
import { BOOKS } from './data/books';
import { binarySearchExact, lowerBound, norm } from './utils/binary';

export default function BookSearch() {
  const [q, setQ] = useState('');
  const [exact, setExact] = useState(null);
  const [meta, setMeta] = useState({ time: '0.00', steps: 0, found: false });

  // 정렬
  const titles = useMemo(() => BOOKS.map((b) => b.title), []);
  const titlesNorm = useMemo(() => titles.map(norm), [titles]);

  // 자동완성
  const key = useMemo(() => norm(q), [q]);

  const { lo, hi } = useMemo(() => {
    const lo = lowerBound(titlesNorm, key);
    const hi = lowerBound(titlesNorm, key + '\uffff');
    return { lo, hi };
  }, [key, titlesNorm]);

  const suggestions = useMemo(() => {
    if (!key) return [];
    return BOOKS.slice(lo, Math.min(hi, lo + 20));
  }, [key, lo, hi]);

  // 이벤트
  const onChange = useCallback((e) => setQ(e.target.value), []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const key = norm(q);

      if (!key) {
        setExact(null);
        setMeta({ time: '0.00', steps: 0, found: false });
        return;
      }

      const t0 = performance.now();
      const { index, visited } = binarySearchExact(titlesNorm, key);
      const t1 = performance.now();

      setMeta({
        time: (t1 - t0).toFixed(2),
        steps: visited.length,
        found: index !== -1,
      });
      setExact(index !== -1 ? BOOKS[index] : null);
    },
    [q, titlesNorm]
  );

  const highlight = (title) => {
    const key = norm(q);
    if (!key) return title;

    const i = norm(title).indexOf(key);
    if (i < 0) return title;

    return (
      <>
        {title.slice(0, i)}
        <mark className="bg-yellow-200">{title.slice(i, i + q.length)}</mark>
        {title.slice(i + q.length)}
      </>
    );
  };

  return (
    <section className="mx-auto my-6 w-full max-w-[900px]">
      <h2 className="text-2xl font-semibold tracking-tight">📚 도서 검색 앱 (Binary Search)</h2>
      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <input
          value={q}
          onChange={onChange}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="도서 제목 입력 (접두사 자동완성 + 정확 일치 검색)"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          title="정확 일치 이진 탐색"
        >
          검색
        </button>
      </form>

      {/* 메타 정보: 시간/스텝 */}
      {meta && (
        <p className="mt-2 text-sm text-gray-600">
          정확 일치 검색: {meta.found ? '성공' : '실패'} 시간 <strong>{meta.time}ms</strong> · 방문 인덱스 <strong>{meta.steps}</strong>회
        </p>
      )}

      {/* 정확 일치 결과 */}
      {exact && (
        <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-500">정확 일치 결과</div>
          <div className="mt-1 text-lg font-semibold">{exact.title}</div>
          <div className="text-gray-700">
            {exact.author} · {exact.year}
          </div>
        </div>
      )}

      {/* 자동완성 리스트 */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-2 text-sm text-gray-500">자동완성(상위 20)</div>
        {q ? (
          suggestions.length ? (
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {suggestions.map((b) => (
                <li key={b.id} className="rounded-md border border-gray-100 px-3 py-2 text-sm">
                  <div className="font-medium">{highlight(b.title)}</div>
                  <div className="text-gray-600">
                    {b.author} · {b.year}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">결과가 없습니다.</p>
          )
        ) : (
          <p className="text-sm text-gray-500">검색어를 입력하면 자동완성이 나옵니다.</p>
        )}
      </div>
    </section>
  );
}
