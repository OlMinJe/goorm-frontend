// 버블 정렬
// 버블 정렬은 인접한 두 원소를 비교·교환하며 큰 값을 뒤로 "밀어내는" 방식
// 시간복잡도: 최악 O(n²), 최선 O(n) (이미 정렬된 경우 swapped 최적화 덕분에 한 번만 돈다).
// 공간복잡도: O(n) (여기서는 원본 보존 때문에 배열 복사 사용).

function bubbleSort(arr) {
  // 1. 원본 배열 복사하여 새로운 배열을 만든다.
  const a = arr.slice();

  // 2. 배열을 여러 번 훑으면서 정렬 과정을 반복하며, swapped로 요소의 교환이 일어났는지 기록
  // 한 번도 교환이 안 일어나면 배열이 이미 정렬된 상태이므로 반복을 멈춤
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false; // 불필요한 반복을 줄이기 위해 사용(최적화 포인트)

    // 3. 인접 비교 - 인접한 두 원소 비교 후 앞이 크면 자리 교환
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        // j와 j+1을 비교해서 앞이 크면
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // 배열 구조 분해 할당으로 서로 교환
        swapped = true;
      }
    }
    // 4. 교환 없으면 이미 정렬 끝났으니 중단
    if (!swapped) break;
  }
  return a;
}

const numbers = [5, 1, 4, 2, 8];

console.log('원본 배열: ', numbers);
const sorted = bubbleSort(numbers);
console.log('정렬된 배열: ', sorted);
console.log('원본 유지 확인: ', numbers);
