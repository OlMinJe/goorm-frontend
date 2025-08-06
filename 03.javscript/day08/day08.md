# 📘 자바스크립트 표준 내장 객체 `Object`

## ✅ `Object` 생성 방식 정리

| 생성 방식           | 문법                           | 특징                           |
| ------------------- | ------------------------------ | ------------------------------ |
| 객체 리터럴         | `{ key: value }`               | 가장 간결하고 많이 쓰임        |
| 생성자 함수         | `new Object()`                 | 명시적인 생성이지만 잘 안 씀   |
| `Object.create()`   | `Object.create(proto)`         | 프로토타입을 명시적으로 지정   |
| 클래스(`Class`)     | `class A {}`                   | JS에서 권장되는 객체 생성 방식 |
| 생성자 함수 + `new` | `function A() {}` -> `new A()` | 클래스 이전 방식               |

```javascript
const a = {}; // 리터럴
const b = new Object(); // 생성자
const c = Object.create(Object.prototype); // 프로토타입 명시
```

<br/>
<br/>

## ✅ `Object.create()`

> `Object.create(proto)`는 원하는 객체를 프로토타입으로 지정한 객체를 생성할 수 있다.

### ▶️ 예시 1번 - 상속형 객체

```javascript
const animal = {
  eat() {
    console.log('먹는다');
  },
};

const dog = Object.create(animal);
dog.dark = () => console.log('멍멍');

dog.eat(); // animal로부터 상속
dog.dark(); // 자체 메서드
```

### ▶️ 예시 2번 - 해시맵

```javascript
const safeMap = Object.create(null);
safeMap['toString'] = 'not inherited';

console.log(safeMap.toString); // undefined
```

`Object.prototype`의 위험한 속성들을 상속하지 않음

<br/>
<br/>

## ✅ `Object.defineProperty()` / `Object.freeze()` 등 객체 보호

### ▶️ `Object.defineProperty()`

> 객체의 속성을 세밀하게 제어할 수 있다.
>
> - 속성의 쓰기/읽기/열거/삭제 가능 여부 제어
> - 민감한 설정값을 보호하는 구조 설계 가능

```javascript
const config = {};
Object.defineProperty(config, 'appName', {
  value: 'MyApp',
  writable: false, // 수정 불가
  enumerable: false, // for..in 등에서 안보임
  configurable: false, // 삭제 불가
});

config.appName = 'HackApp';
console.log(config.appName); // 'MyApp'

// ❌ 수정 부가
console.log(config.apiKey); // 'SECRET_KEY_123'
config.apiKey = 'HACKED';
console.log(config.apiKey); //  변경 안 됨 - 'SECRET_KEY_123'로 출력

// ❌ 출력 안됨
for (let key in config) {
  console.log(key);
}

// ❌ 삭제 안 됨
delete config.apiKey; //
```

| 옵션           | 설명                          |
| -------------- | ----------------------------- |
| `value`        | 값                            |
| `writable`     | 수정 가능 여부                |
| `enumerable`   | 반복문에 포함될지 여부        |
| `configurable` | 삭제 및 속성 재정의 가능 여부 |

### ▶️ `Object.freeze()`/`Object.seal()`/`Object.preventExtensions()`

| 메서드                       | 속성 수정 | 속성 추가 | 속성 삭제 |
| ---------------------------- | --------- | --------- | --------- |
| `Object.freeze()`            | ❌        | ❌        | ❌        |
| `Object.seal()`              | ✅        | ❌        | ❌        |
| `Object.preventExtensions()` | ✅        | ❌        | ✅        |

```javascript
const user = Object.freeze({ name: 'minje' });
user.name = 'MING'; // 변경 안 됨
```

<br/>
<br/>

## ✅ `Object.create()`와 Class 비교

| 구분      | `Object.create()`          | `class` 문법              |
| --------- | -------------------------- | ------------------------- |
| 목적      | 명시적 프로토타입 설정     | 객체 인스턴스 생성        |
| 상속 방식 | 수동으로 프로토타입 설정   | `extends`키워드 사용      |
| 가독성    | 복잡함                     | 명확함                    |
| 실무 사용 | 라이브러리 내부, 특수 목적 | 실무 전반에서 일번적 사용 |

```javascript
// Object.create()
const Base = {
  great() {
    return 'Hi';
  },
};

const user = Object.create(Base);
user.name = 'ming';

// class
class User {
  constructor(name) {
    this.name = name;
  }
  great() {
    return 'Hi';
  }
}

const newUser = new User('ming');
```

### ➡️ 두 개를 혼합해보자!

```javascript
class Component {
  constructor(name) {
    this.name = name;
  }

  render() {
    return `${this.name} 랜더링됨`;
  }
}

// 공통 로직을 상속받는 커스텀 인스턴스 생성
const custom = Object.create(Component.prototype);
Component.call(custom, 'MyBox');

custom.show = () => console.log('사용자 정의 기능');
console.log(custom.render()); // MyBox 렌더링됨
custom.show(); // 사용자 정의 기능
```

- `Object.create()`는 `prototype` 상속만 제공 -> `constructor`는 수동 호출 필요

## 💡 `Object`와 `JSON` 구조의 관계

- `JSON.stringify(obj)` -> JS 객체 -> 문자열
- `JSON.parse(str)` -> 문자열 -> JS 객체

```javascript
const user = { name: 'ming', age: 26 };
const str = JSON.stringify(user); // '{"name":"ming","age":26}'
const obj = JSON.parse(str); // { name: "ming", age: 26 }
```

<br/>
<br/>

# 실습 내용 요약

## ✅ `Object.create()`의 활용

- `Object.create()`를 통해 원하는 프로토타입을 지정하거나 `null` 기반 객체를 생성하여 안전한 해시맵 구현 가능
- 실습 예제는 세 가지로 구분
  1. 상속형 컴포넌트 생성
     ➡️ `Object.create(BaseComponent)`로 부모 메서드를 상속받은 객체 구성
  2. 안전한 해시맵 구현
     ➡️ `Object.create(null)`을 통해 `__proto__` 속성 무시하여 구현
  3. 읽기 전용 속성 객체 생성
     ➡️ `Object.defineProperty`로 `writable: false` 설정해 불변 속성 구성

## ✅ MBTI 검사 예제를 통해 학습한 Object 메서드

| 메서드                 | 사용 맥락                         | 예제                                               |
| ---------------------- | --------------------------------- | -------------------------------------------------- |
| `Object.entries()`     | 객체를 `[key, value]` 쌍으로 변환 | `Object.entries(score)`                            |
| `Object.fromEntries()` | 배열 쌍을 다시 객체로 재구성      | `Object.fromEntries([...])`                        |
| `Object.create(proto)` | 특정 프로토타입을 가진 객체 생성  | `Object.create(null)`                              |
| `Object.assign()`      | DOM 요소 속성 동시 지정           | `Object.assign(el, { id: 'x', textContent: 'y' })` |
| `Object.keys()`        | 객체의 key 배열 반환              | `Object.keys(answers)`                             |
| `Object.values()`      | 객체의 value 배열 반환            | `Object.values(answers)`                           |

### ▶️ `Object.assign()`으로 객체 병합 & 불변성 유지

> 여러 객체를 하나로 병합하여 원본 객체를 손상시키지 않도록 새로운 객체를 생성한다.

```javascript
const defaultOptions = { theme: 'light', debug: false };
const userOptions = { debug: true };

// 불변 병합
const finalOptions = Object.assign({}, defaultOptions, userOptions);
console.log(finalOptions); // { theme: 'light', debug: true }
```

### 💡 느낀점

- `Object`는 단순한 데이터 저장소를 넘어서, 상속, 보호, 확장성을 위한 핵심 도구임을 실감
- `Object.create()`는 실무에서 자주 쓰이지 않을 수 있지만, JS의 객체 기반 프로토타입 구조 이해에 매우 핵심적인 부분임을 알았다.
- 다양한 `Object` 유틸 메서드를 활용하면 코드가 더욱 간결하고 명확해진다
- 브라우저 렌더링과 로직 동작을 함께 고민하며 자바스크립트의 객체 개념을 적용해보니 어려웠음
