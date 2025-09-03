// 퀵 정렬
// 아이디어:
// 시간복잡도:
// - 평균: O(n log n) → 굉장히 빠름.
// - 최악: O(n²) → 피벗을 계속 나쁘게 고르면 (예: 이미 정렬된 배열에서 항상 끝값 선택).
// 공간복잡도: O(log n) (재귀 호출 스택 사용).

function quickSort(arr) {
  const a = arr.slice();

  // 내부 재귀 함수 - 구간 [lo ~ hi]를 정렬한다.
  // 분할(Divide): partition을 통해 피벗을 기준으로 왼쪽은 피벗보다 작은 값, 오른쪽은 큰 값으로 나눔
  // 정복(Conquer): 피벗을 제외한 두 구간을 각각 재귀 호출
  (function qs(lo, hi) {
    // 구간 크기가 1 이하일 때 종료 조건
    if (lo >= hi) return;
    const p = partition(a, lo, hi);
    qs(lo, p - 1);
    qs(p + 1, hi);
  })(0, a.length - 1);

  return a;
}

// 분할 함수
function partition(a, lo, hi) {
  // 여기서는 구간의 마지막 값
  const pivot = a[hi];
  // 피벗보다 작은 값들이 쌓이는 위치를 가리킴
  let i = lo;

  // 반복문(j)을 돌면서 피벗보다 작은 원소를 발견하면 i 위치와 교환하고 i++
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }

  // 마지막에 피벗을 i 위치에 배치하면
  // 왼쪽에는 피벗보다 작은 값들, 오른쪽에는 피벗보다 큰 값들이 놓이게 됨.
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}

const numbers = [64, 25, 12, 22, 11];

console.log('원본 배열: ', numbers);
const sorted = quickSort(numbers);
console.log('정렬된 배열: ', sorted);
console.log('원본 유지 확인: ', numbers);
