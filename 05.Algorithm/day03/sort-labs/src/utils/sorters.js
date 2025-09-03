/**
 * 선택자와 방향으로 비교 함수를 만들어 줍니다.
 */
export const by = (select, dir = 'asc') => {
  const sign = dir === 'asc' ? 1 : -1;

  return (a, b) => {
    const x = select(a);
    const y = select(b);

    if (x === y) return 0;

    // 문자열 정렬은 로케일 친화적으로
    if (typeof x === 'string' && typeof y === 'string') {
      return sign * x.localeCompare(y);
    }

    // 숫자/기타 비교 (동일 타입 가정)
    return sign * (x < y ? -1 : 1);
  };
};

/**
 * 안정 정렬(Stable)인 삽입 정렬.
 * 원본 배열은 보존하고, 복사본을 정렬하여 반환합니다.
 */
export function insertionSortBy(arr, cmp) {
  const out = arr.slice(); // 비파괴
  for (let i = 1; i < out.length; i++) {
    const value = out[i];
    let j = i - 1;

    // 왼쪽 정렬 구간에서 value보다 큰 원소들을 한 칸씩 밀기
    while (j >= 0 && cmp(out[j], value) > 0) {
      out[j + 1] = out[j];
      j--;
    }
    // 빈 자리에 value 삽입
    out[j + 1] = value;
  }
  return out;
}
