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

# 📘 추가 학습

## 1. 정규식이란?

> 정규 표현식(Regular Expression, RegExp)
> 문자열에서 특정 패턴을 찾거나, 검사하거나, 치환하기 위해 사용하는 표현식

### 주요 사용 목적

- 문자열 검색
- 문자열 검증(ex. 이메일, 비밀번호 형식 검사 등)
- 문자열 치환

## 2. 정규식 객체 만들기

### 2-1. 리터럴 표현법

> 리터럴: `/패턴/플래그`

```javascript
const regex = /abc/;
```

### 2-2. RegExp 생성자

> 생성자: `new RegExp("패턴", "플래그")`

```javascript
const regex = new RegExp('abc');
```

## 3. 정규식 메서드

### 3-1. 문자열 메서드

| 메서드                       | 설명                        |
| ---------------------------- | --------------------------- |
| `str.match(regexp)`          | 패턴과 일치하는 부분 찾기   |
| `str.replace(regexp, value)` | 패턴과 일치하는 부분 치환   |
| `str.search(regexp)`         | 일치하는 부분의 인덱스 반환 |
| `str.split(regexp)`          | 패턴 기준으로 문자열 나누기 |

### 3-2. 정규식 메서드

| 메서드             | 설명                          |
| ------------------ | ----------------------------- |
| `regexp.test(str)` | 일치 여부를 true/false로 반환 |
| `regexp.exec(str)` | 첫 번쨰 일치 결과 반환        |

## 4. 플래그

- `g`: global(전체 검색)
- `i`: ignoreCase(대소문자 구분 없이)
- `m`: multiline(여러 줄 검색)

```javascript
const regex = /hello/gi;
```

### 5. 기본 패턴

- `.` : 임의의 한 문자
- `\d` : 숫자 (digit)
- `\w` : 문자 (영문자+숫자+\_)
- `\s` : 공백
- `^` : 문자열 시작
- `$` : 문자열 끝
- `[...]` : 문자 집합
- `[^...]` : 집합 제외
- `|` : OR 조건
- `()` : 그룹
- `?`, `+`, `*`, `{n,m}`: 반복

### 실습

#### 이메일 형식 검사

```javascript
const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
console.log(emailRegex.test('test@example.com')); // true
```

| 단계 | 패턴       | 의미                                                          | 예시                           |
| ---- | ---------- | ------------------------------------------------------------- | ------------------------------ |
| 1    | `^[^\s@]+` | 문자열 시작(`^`) 이후 **공백(\s)과 @를 제외한 문자 1개 이상** | `hello`, `user.name`, `abc123` |
| 2    | `@`        | 반드시 `@` 기호가 포함되어야 함                               | `@`                            |
| 3    | `[^\s@]+`  | `@` 이후, 공백과 @를 제외한 문자 1개 이상 → 도메인 이름 부분  | `gmail`, `naver`, `domain123`  |
| 4    | `\.`       | 반드시 `.` (점) 문자가 포함되어야 함, `\.`로 이스케이프 처리  | `.`                            |
| 5    | `[^\s@]+`  | 마지막으로 공백과 @를 제외한 문자 1개 이상 → 확장자 부분      | `com`, `co.kr`, `org`          |

#### 문자열에서 숫자만 추출

```javascript
const str = 'abc123xyz';
const numbers = str.match(/\d+/g);
console.log(numbers); // ["123"]
```
