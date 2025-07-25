// 1. 조건
let fruit = 'apple';

switch (fruit) {
  case 'apple':
    console.log('사과입니다.');
    break;
  case 'banana':
    console.log('바나나입니다.');
    break;
  default:
    console.log('알 수 없는 과일입니다.');
}
// break를 제거하면 목적을 달성했을 때도 뒤의 조건들을 계속 실행하게 된다.

const fruitMap = {
  apple: '사과입니다.',
  banana: '바나나입니다.',
};

console.log('개선 ==> ' + fruitMap[fruit] || '알 수 없는 과일입니다.');

// 2. 함수
console.log('=========================================');
console.log('< 예제 1번: 선언문 >');
sayHello();

function sayHello() {
  console.log('1번 안녕하세여~');
}

console.log('< 예제 2번: 호이스팅 >');
// sayHello2(); // 오류 발생

const sayHello2 = function () {
  console.log('2번 안녕하세여~');
};
sayHello2(); // 정상 실행

// 3. 화살표 함수
console.log('=========================================');
const great = () => console.log('화살표 함수 안녕하세여~(호이스팅 문제 없어유)');
great();

// 4. 매배견수, 인자, 반환값
console.log('=========================================');

function add(a, b) {
  return a + b;
}

const result = add(3, 4);

function great2(name = '게스트') {
  console.log('안녕하세요, ' + name + '님!');
}

great2();
great2('민제');

// 5. 함수는 값이다
console.log('=========================================');

function multiply(x) {
  return x * 2;
}

function applyFn(fn, value) {
  return fn(value);
}

console.log(applyFn(multiply, 5));

// 6. 계산기
console.log('=========================================');

function calculate(a, b, operator) {
  if (operator === '+') return a + b;
  else if (operator === '-') return a - b;
  else if (operator === '*') return a * b;
  else if (operator === '/') return a / b;
  else return '지원하지 않는 연산자입니다.';
}

console.log(calculate(10, 5, '*'));

// 7. Infinity의 Length는?
console.log('Infinity의 length ==> ', Infinity.length);
console.log('length 확인 가보자고 ==>', String(Infinity).length);
