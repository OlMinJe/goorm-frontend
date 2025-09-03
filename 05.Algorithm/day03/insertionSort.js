// 삽입 정렬
// 이미 정렬된 구간에 새 원소를 적절히 삽입

// 시간복잡도:
// - 최악/평균: O(n²) (역순 배열일 때 가장 오래 걸림)
// - 최선: O(n) (이미 정렬된 경우, 한 번씩만 비교)
// 공간복잡도: O(n) (여기서는 원본 보존 때문에 배열 복사 사용).

function insertionSort(arr) {
  const a = arr.slice();

  // i=1부터 시작한다. (0번째 원소는 이미 "정렬된 구간"이라 가정)
  for (let i = 1; i < a.length; i++) {
    // key는 이번에 정렬된 구간에 삽입할 값
    const key = a[i];
    // j는 key 앞쪽의 정렬된 원소들을 가리킴
    let j = i - 1;

    // a[j]가 key보다 크면 오른쪽으로 한 칸씩 밀어낸다.
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      // j-- 하면서 왼쪽으로 이동하며 적절한 위치를 찾는다.
      j--;
    }

    // 반복문이 끝난 위치(j+1)에 key를 삽입
    a[j + 1] = key;
  }
  return a;
}

const numbers = [64, 25, 12, 22, 11];

console.log('원본 배열: ', numbers);
const sorted = insertionSort(numbers);
console.log('정렬된 배열: ', sorted);
console.log('원본 유지 확인: ', numbers);
