// 문자열 정규화 -> 일관성 유지
export const norm = (s) => s.normalize('NFC').toLowerCase().trim();

/**
 * 정확 검색(이진탐색)
 * @param arr: 이미 정렬된 문자열(정규화된 제목) 배열,
 * @param key: 정규화된 검색어
 * @returns { index: number, visited: number[] }
 */
export function binarySearchExact(arr, key) {
  let left = 0;
  let right = arr.length;
  const visited = [];

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    visited.push(mid);

    if (arr[mid] === key) return { index: mid, visited }; // 정답입니당!

    if (arr[mid] < key) left = mid + 1; // 오른쪽으로 움직여잉~
    else right = mid; // 왼쪽에 있넹~ 유지해!
  }
  return { index: -1, visited };
}

/**
 * 접두사 자동완성(경계 탐색)
 * - 첫 번째 arr[i] > key 의 인덱스(= key 이상인 값이 처음 나오는 위치)
 * @param arr
 * @param key
 * @returns left
 */
export function lowerBound(arr, key) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < key) left = mid + 1; // 정답 없다! 오른쪽으로 움직여잉!
    else right = mid; // 파워 왼쪽 모드 유지해!
  }
  return left;
}

/**
 * 접미사 자동완성(경계 탐색)
 * - 첫 번째 arr[i] > key 의 인덱스(= key 초과인 값이 처음 나오는 위치)
 * @param arr
 * @param key
 * @returns left
 */
export function upperBound(arr, key) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= key) left = mid + 1; // 같으면 찐 큰 값이 아니니 파워 오른쪽으로 이동해.
    else right = mid;
  }
  return left;
}
