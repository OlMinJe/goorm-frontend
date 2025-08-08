// push() - 배열 끝에 요소 추가
const fruits = ['사과', '바나나'];
fruits.push('포도');
console.log('push == ', fruits); // ['사과', '바나나', '포도']

// pop() - 배열 끝에서 요소 제거
const removed = fruits.pop();
console.log('pop으로 꺼낸 과일 == ', removed); // 포도
console.log('pop == ', fruits); // ['사과', '바나나']

// unshift() - 배열 앞에 요소 추가
const nums = [2, 3];
nums.unshift(1);
console.log('unshift == ', nums); // [1, 2, 3]

// shift() - 배열 앞에서 요소 제거
const frist = nums.shift();
console.log('shift로 꺼낸 숫자 == ', frist); // 1
console.log('shift 최종 == ', nums); // [1, 2]

// forEach() - 배열 순회
const colors = ['빨강', '파랑', '노랑'];
colors.forEach((color, index) => {
  console.log(`forEach == ${index + 1}번째 색: ${color}`);
});

// map() - 모든 요소를 변형해 새 배열 만들기
const doubled = nums.map((n) => n * 2);
console.log('map == ', doubled); // [4, 6]

// filter() - 조건에 맞는 요소만 남기긱
const numbers = [1, 2, 3, 4, 5, 6];
const even = numbers.filter((n) => n % 2 === 0);
console.log('filter == ', even); // [2, 4, 6]

// reduce() - 누적 계산하여 하나의 값 만들기
const total = numbers.reduce((acc, cur) => acc + cur, 0);
console.log('total == ', total); // 21

// includes() - 특정 값 포함 여부 확인
const pets = ['고양이', '강아지'];
console.log('includes == ', pets.includes('고양이')); // true
console.log('includes == ', pets.includes('강아지')); // true

// find() - 조건을 만족하는 첫 요소 찾기
const users = [
  { name: '민제 1호', age: 26 },
  { name: '민제 2호', age: 16 },
  { name: '민제 3호', age: 6 },
];

const teen = users.find((u) => u.age < 20);
console.log('find == ', teen); // {name: '민제 2호', age: 16}

// some() - 하나라도 조건 만족하면 true
const socres = [60, 80, 45];
const hasFail = socres.some((score) => score < 50);
console.log('some == ', hasFail); // true

// every() = 모두 조건 만족해야 true
const scores = [85, 90, 88];
const allPass = scores.every((score) => score >= 80);
console.log('every == ', allPass); // true

// sort() - 정렬
const numOne = [3, 1, 4, 2, 10];
numOne.sort();
console.log('sort == ', numOne); // [1, 10, 2, 3, 4]

const numTwo = [3, 1, 4, 2, 10];
numTwo.sort((a, b) => a - b); // 오름차순
console.log('sort == ', numTwo); // [1, 2, 3, 4, 10]

// reverse() - 역순 정렬
console.log('역순 정렬 이전 확인: ', numbers); // [1, 2, 3, 4, 5, 6]
numbers.reverse();
console.log('reverse == ', numbers); // [6, 5, 4, 3, 2, 1]

// slice() - 잘라서 새 배열 만들기
const animals = ['고양이', '.강아지', '햄스터', '토끼'];
const some = animals.slice(1, 3);
console.log(some); // ['.강아지', '햄스터']
console.log(animals); // ['고양이', '.강아지', '햄스터', '토끼']

// splice() - 중간 삽입/삭제
const numThree = [1, 2, 3, 4];
numThree.splice(1, 2, 99);
console.log('splice', numThree); // [1, 99, 4]

// join() - 문자열로 합치기
const words = ['나는', '자바스크립트를', '배운다'];
const sentence = words.join(' ');
console.log('join == ', sentence); // 나는 자바스크립트를 배운다

// flat() - 중첩 배열 펼치기
const nested = [1, [2, [3, 4]]];
console.log('flat == ', nested.flat(2)); // [1, 2, 3, 4]

// at() - 인덱스 접근 (음수 가능)
// const numFour = [10, 20, 30, 40];
// console.log('at == ', numFour.at(-1));

// reduce()
