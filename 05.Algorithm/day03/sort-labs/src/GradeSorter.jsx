import { useMemo, useState } from 'react';
import { STUDENTS } from './data/students';
import { by, insertionSortBy } from './utils/sorters';

export default function GradeSorter() {
  // 여기에 실습 코드 삽입 ===========
  const comparators = useMemo(
    () => ({
      byScoreAsc: by((s) => s.score, 'asc'),
      byScoreDesc: by((s) => s.score, 'desc'),
      byNameAsc: by((s) => s.name, 'asc'),
    }),
    []
  );

  const makerOrder = (arr) => arr.map((s, i) => ({ ...s, order: i + 1 }));
  const [rows, setRows] = useState(() => makerOrder(insertionSortBy(STUDENTS, comparators.byScoreAsc)));

  const scoreAsc = () => setRows((prev) => insertionSortBy(prev, comparators.byScoreAsc));
  const scoreDesc = () => setRows((prev) => insertionSortBy(prev, comparators.byScoreDesc));
  const nameAsc = () => setRows((prev) => insertionSortBy(prev, comparators.byNameAsc));
  // 여기에 실습 코드 삽입 ===========
  return (
    <section className="mx-auto max-w-[560px]">
      <h2 className="mb-3 text-xl font-semibold">🎓 성적 정렬기 (안정 정렬: 삽입)</h2>

      <div className="mb-3 flex gap-2">
        <button
          onClick={scoreAsc}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          점수 ↑
        </button>
        <button
          onClick={scoreDesc}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          점수 ↓
        </button>
        <button
          onClick={nameAsc}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          이름 A→Z
        </button>
      </div>

      <ul className="list-none divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white">
        {rows.map((s) => (
          <li key={s.id} className="px-3 py-1.5">
            #{s.id} {s.name} — {s.score}점 <span className="text-gray-500">(화면순서 {s.order})</span>
          </li>
        ))}
      </ul>

      <p className="mt-2 text-sm text-gray-600">
        동점(90, 75) 학생의 <strong>상대 순서</strong>가 유지되는지 확인해보자 → 삽입 정렬은 안정 정렬이라 보존됨.
      </p>
    </section>
  );
}
