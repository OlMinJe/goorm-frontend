// ===================== Date() =====================
const now = new Date();
console.log(now.toString());

const birthday = new Date('2025-10-15');
console.log(birthday.getFullYear());

// ===================== Error =====================
// function divide(a, b) {
//   if (b === 0) throw new Error('0으로 나눌 수 없습니다!');
//   return a / b;
// }

// try {
//   const result = divide(10, 0);
//   console.log('결과', result); // 0으로 나누기 시도 실패
// } catch (err) {
//   console.error('에러 타입', err.name); // Error
//   console.error('에러 메시지', err.message); // 0으로 나눌 수 없습니다.
// }

// ===================== 함수나 연산에 잘 =====================
function shout(text) {
  if (typeof text !== 'string') throw new TypeError('shout 함수에는 문자열만 전달해야 합니다.');
  return text.toUpperCase();
}

// 사용 예시
console.log(shout('hello'));
// console.log(shout(123));

function great(name) {
  if (typeof name !== 'string') throw new TypeError('이름은 문자열이어야 합니다');
  return '안녕, ' + name;
}

console.log(great('민제'));

// ===================== Map - 키-값 쌍을 저장하는 자료구조 =====================
const sessionMap = new Map();

const user1 = { id: 1, name: '민제' }; // 객체 키
const user2 = { id: 2, name: '밍젱' }; // 또 다른 객체 키
const loginTime = new Date(); // Date 키
const sessionId = Symbol('session'); // Symbol 키
// const userAgent = navigator.userAgent; // 문자열 키
// navigator is not defined 오류가 뜨는데 왜일까용

// 세션 저장
sessionMap.set(user1, '10:00 로그인');
sessionMap.set(user2, '10:05 로그인');
sessionMap.set(loginTime, '전체 세션 시작');
sessionMap.set(sessionId, { browser: 'Chrome', os: 'mac' });
// sessionMap.set(userAgent, '모바일 접속');

for (let [key, value] of sessionMap.entries()) {
  console.log('키 == ', key, ' : 값 == ', value);
}

// ===================== Set() =====================
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(1);

console.log(mySet);

const rawTags = ['html', 'css', 'javascript', 'css', 'html'];
const uniqueTags = [...new Set(rawTags)];
console.log(uniqueTags); // ['html', 'css', 'javascript']

const arr = [1, 2, 2, 3, 3];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3]
