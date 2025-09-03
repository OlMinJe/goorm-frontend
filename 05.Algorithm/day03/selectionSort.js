// 선택 정렬
// 선택 정렬은 "남은 것 중 최소값을 골라 앞으로 보냄".
// 시간복잡도: 항상 O(n²) (최적화 불가능, 교환 횟수는 최대 n-1번).
// 공간복잡도: O(n) (여기서는 원본 보존 때문에 배열 복사 사용).

function selectionSort(arr) {
  const a = arr.slice();

  // i는 현재 정렬해야 할 위치를 가리킴
  for (let i = 0; i < a.length; i++) {
    // 현재 구간에서 최소 인덱스 기록
    let min = i;

    // i 이후 구간에서 최솟값 탐색
    for (let j = i + 1; j < a.length; j++) {
      // < 대신 >로 조건만 바꾸면 내림차순도 가능
      if (a[j] < a[min]) min = j;
    }

    // 참은 최솟값과 i 위치 교환 = 스왑
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
    }
  }
  return a;
}

const numbers = [64, 25, 12, 22, 11];

console.log('원본 배열: ', numbers);
const sorted = selectionSort(numbers);
console.log('정렬된 배열: ', sorted);
console.log('원본 유지 확인: ', numbers);
