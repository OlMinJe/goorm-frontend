# 📘 JavaScript

## 1. 조건문(Control Flow)

### 1-1. if

조건이 `true`일 때만 실행

```javascript
if (score > 90) {
  console.log('A등급');
}
```

### 1-2. if - else

조건이 `true`이면 첫 번째 블록, 아니면 `else` 블록 실행

```javascript
if (score >= 60) {
  console.log('합격');
} else {
  console.log('불합격');
}
```

### 1-3. if - elseif - else

여러 조건을 순서대로 검사

```javascript
if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B');
} else {
  console.log('C 이하');
}
```

### 1-4. switch

값에 따라 분기 처리(많은 `else if`를 간결하게)

```javascript
switch (grade) {
  case 'A':
    console.log('우수');
    break;
  case 'B':
    console.log('보통');
    break;
  default:
    console.log('다음에 더 열심히!');
}
```

### 1-5. 삼항 연산자

짧게 쓸 수 있는 `if - else`

```javascript
const result = score >= 60 ? '합격' : '불합격';
console.log(result);
```

## 2. 함수

### 2-1. 함수 선언문(Function Declaration)

- `function` 키워드 사용
- 호이스팅(hoisting): 선언부가 코드 상단으로 끌어올려져서, 선언 전에 호출 가능

```javascript
function great(name) {
  return `안녕, ${name}!`;
}

console.log(great('인수'));
```

### 2-2. 함수 표현식(Function Expression)

- 함수를 변수에 할당
- 호이스팅X: 선언 전에 호출 불가

```javascript
const greet = function (name) {
  return `안녕, ${name}!`;
};

console.log(greet('민수'));
```

### 2-3. 화살표 함수 (Arrow Function)

- 함수 표현식을 간결한 문법
- `this`를 바인딩하지 않고 상위 스코프의 `this`를 사용

```javascript
const greet = (name) => `안녕, ${name}!`;
console.log(greet('민수'));
```

# 추가 학습

## Infinity의 length는?

`Infinity.length`가 `undefined`인 이유는 **`Infinity`가 객체가 아니라 원시 값(primitive value)**이고, **`.length`라는 속성을 갖고 있지 않기 때문임.**

> **원시 값(primitive value)이란?**
>
> - 자바스크립트에서 가장 기본적인 데이터 타입을 말하며, 더 이상 쪼갤 수 없는 값으로 객체가 아닌 값

### 📌 `Infinity`는 무엇인가?

자바스크립트에서 `Infinity`는 숫자(Number) 타입의 **특수한 값(= 원시값)**으로, 무한대를 나타냄

```javascript
typeof Infinity; // "number"
```

즉, 단순 숫자 값으로`length` 개념이 적용되지 않음.

### 📌 `Infinity`의 `length` 정보가 미친듯이 필요할 때는?

필요하다면 `String(Infinity).length`처럼 문자열로 바꾼 후 길이를 확인할 수 있다!

### 📌 실습 결과

```javascript
console.log('Infinity의 length ==> ', Infinity.length);
// Infinity의 length ==>  undefined
console.log('length 확인 가보자고 ==>', String(Infinity).length);
// length 확인 가보자고 ==> 8
```
