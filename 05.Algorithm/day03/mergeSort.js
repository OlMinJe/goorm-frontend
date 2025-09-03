// 병합 정렬
// 항상 안정적 O(n log n), 하지만 메모리 사용량↑.

// 실무에서는 사용 지양
function mergeSort(arr) {
  if (arr.length <= 1) return arr; // 원소가 0~1개로 정렬 불필요

  // 배열을 중간 기준점(mid) 으로 왼쪽(left), 오른쪽(right)으로 분할함
  const mid = Math.floor(arr.length / 2); // 중간 지점
  const left = arr.slice(0, mid); // 왼쪽 절반
  const right = arr.slice(mid); // 오른쪽 절반

  // 왼족/오르쪽을 각각 재귀 정렬 -> 병합
  return merge(mergeSort(left), mergeSort(right));
}

function merge(L, R) {
  const out = [];
  let i = 0;
  let j = 0;

  while (i < L.length && j < R.length) {
    out.push(L[i] <= R[j] ? L[i++] : R[j++]);
  }

  return out.concat(L.slice(i), R.slice(j));
}

const numbers = [38, 27, 43, 3, 9, 82, 10];

console.log('원본 배열: ', numbers);
const sorted = mergeSort(numbers);
console.log('정렬된 배열: ', sorted);
console.log('원본 유지 확인: ', numbers);
