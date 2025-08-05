# day06 프로토타입(Prototype) 설명 보완

자바스크립트는 클래스 기반 언어가 아닌 프로토타입 기반 언어 <br/>
이는 객체 간 상속이 클래스 구조가 아닌 프로토타입 체인을 통해 이루어진다는 것을 의미함.

## 📌 객체 생성 구조

```javascript
function Person() {} // 함수

let personObject = new Person(); // 함수로 객체를 생성
```

일반 객체 생성도 똑같다.

```javascript
let obj = {};
```

## 📌 프로토타입이 뭔데

> 자바스크립트는 클래스 기반이 아니라 프로토타입 기반의 언어이다.
> 이 말은 객체 간에 상속이나 공통 기능 공유가 프로토타입 체인이라는 방식으로 이루어진다는 의미!

- `prototype`은 객체가 상속받는 부모 역할을 하는 객체이다.
- 모든 객체는 내부에 `[[Prototype]]`이라는 숨겨진 속성을 가지고 있고, 이걸 개발자는 `__proto__`로 접근하여 수 있다.
- 생성자 함수에는 `prototype`이라는 속성이 있고, 이 생성자로 만들어진 객체들이 공유할 공통 속성이나 메서드를 넣을 수 있는 공간이다.
- 이 구조 덕분에 메서드를 각 인스턴스에 중복 저장하지 않고 공유할 수 있다.

### ✅ 프로토타입 객체(`Prototype Object`)

생성자 함수(`Function`)는 자동으로 `prototype`이라는 객체를 가지고 있어서, <br/>
이 객체에 메서드를 정의하면, **그 생성자로 만들어진 인스턴스들이 공유해서 사용할 수 있다**

```javascript
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function () {
  console.log(`${this.name}가 멍멍 짖어요`);
};

const d1 = new Dog('설이');
d1.bark(); // 설이가 멍멍 짖어요
```

- `bark()`는 `d1`에 직접 있는게 아니라, `Dog.prototype`에 있으므로, 공통 메서드 공유가 가능하다.

### ✅ 프로토타입 링크(`Prototype Link`)

객체는 내부에 `[[Prototype]]`이라는 숨김 속성을 가지고 있고, 이를 자바스크립트에서 `__proto__`로 접근할 수 있다.<br/>
이 속성은 객체가 생성될 때 참조하는 생성자의 `prototype` 객체와 연결되어 있다.

### ✅ 프로토타입 체인(`Prototype Chain`)

객체에서 어떤 속성이나 메서드를 찾을 때

1.  자기 자신에서 먼저 찾고
2.  없으면 `__proto__`가 가리키는 부모 객체에서 찾고
3.  계속 위로 올라가다 끝까지 가면 `null`에서 멈춘다.

이렇게 연결된 구조를 프로토타입 체인이라고 한다.

### ✅ 왜 필요한가?

1. 메서드 중복 방지
   - 생성자 함수로 객체를 여러 개 만들면, 같은 기능이 반복 정의될 필요 없이 `prototype`으로 한 번만 정의하여 모두 사용할 수 있다.
2. 동적 확장 가능
   - 실행 중에도 `Prototype`에 메서드를 추가하면, 이미 생성된 인스턴스들에 접근이 가능하다.

## 📌 예제 코드

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.hello = function () {
  console.log(`안녕, 나는 ${this.name}이고 ${this.age}살이야!`);
};
```

- 프로토타입 체인으로 상위 객체의 속성과 메서드를 참조할 수 있다.
- `Object.getPrototypeOf()` 및 `Object.setPrototypeOf()`를 통해 명시적으로 프로토타입 조작이 가능하다.(직접 조작[`__proto__`]은 비권장)

### ❓ 화살표 함수는 왜 생성자 함수로 사용할 수 없을까?

1. 화살표 함수는 `this` 바인딩 방식이 다르기 때문이다

   - 일반 함수는 호출 방식에 때라 `this`가 바뀌지만,
   - 화살표 함수는 자신이 선언된 위치의 `this`를 렉시컬(정적)하게 고정한다.

2. 생성자 함수는 내부적으로 `this = {}` 바인딩 필요

   - 생성자 함수는 `new` 키워드를 통해 새로운 객체를 생성하고 `this`를 그 객체로 바인딩하는 형식

반면에, 화삺표 함수는 `this`를 직접 바인딩하지 않는다.

> ## 🔍 왜 화살표 함수는 `this`를 바인딩하지 않을까?
>
> ### ✅ 일반 함수의 this 바인딩
>
> 일반 함수는 함수 호출 방식에 따라 this가 결정된다.
>
> ```javascript
> function regular() {
>   console.log(this); // 호출 방식에 따라 this가 달라짐
> }
> ```
>
> - 메서드로 호출되면 해당 객체가 `this`, 그냥 호출하면 전역(`window` / `undefined in strict mode`)
> - `new`를 쓰면 새 객체가 `this`
>
> ### ❌ 화살표 함수는 this를 고정한다
>
> - 화살표 함수는 자신이 선언된 시점의 외부 스코프의 `this`를 그대로 사용한다.
>   즉, `this`를 바인딩할 수 없으며 `call`, `apply`, `bind`, `new` 같은 메서드로도 `this`를 변경할 수 없다.
>
> ```javascript
> const obj = {
>   name: '이설이',
>   regularFunc: function () {
>     console.log('regular:', this); // this → obj
>   },
>   arrowFunc: () => {
>     console.log('arrow:', this); // this → 외부 스코프(여기선 전역)
>   },
> };
> obj.regularFunc(); // obj
> obj.arrowFunc(); // window (또는 undefined)
> ```
>
> ### 그래서 new와 함께 쓸 수 없다
>
> 생성자 함수는 호출 시 내부적으로 `this = {}`를 만들고 바인딩한다.
> 하지만 화살표 함수는 그 바인딩 과정을 전혀 수행하지 않기 때문에, `new`를 사용할 수 없다.
>
> ```javascript
> const Foo = () => {
>   this.value = 10;
> };
>
> new Foo(); // TypeError: Foo is not a constructor
> ```

## ✅ DOM 객체의 프로토타입 구조

브라우저 환경에서 DOM 객체들도 게층적인 프로토타입 구조를 가지고 있다.

```javascript
console.log(Object.gerPrototypeOf(document.body)); // HTMLBodyElement
```

`window` 객체의 경우

- `Window.prototype` > `EventTarget.prototype` > `Object.prototype` > `null`

# Class

## ✅ 기본 문법

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```

- `constructor`: 인스턴스 생성 시 호출되는 생성자
- `sayHi`: 인스턴스 메서드 -> 자동으로 prototype에 등록
- `new User("minje")`처럼 반드시 `new` 연산자로 생성

## ✅ 클래스 선언 방식

| 방식             | 예시                              |
| ---------------- | --------------------------------- |
| 선언식           | `class MyClass {}`                |
| 표현식           | `const myClass = class {}`        |
| 익명 클래스      | `return class {}`                 |
| 이름 있는 표현식 | `const myClass = class Person {}` |

## ✅ 클래스 특징 요약

| 특징                | 설명                               |
| ------------------- | ---------------------------------- |
| new 필요            | `new`로만 인스턴스 생성 가능       |
| prototype 설정 자동 | 메서드는 자동으로 prototype에 등록 |
| static mode 적용    | 클래스 내부는 자동 `use strict`    |
| 호이스팅 없음       | 선언 전 사용 불가                  |
| 함수처럼 동작       | `typeof User === "function"`       |

## ✅ 클래스 구성 요소

| 구성 요소       | 예시                        | 설명                   |
| --------------- | --------------------------- | ---------------------- |
| 생성자          | `constructor(...)`          | 초기화                 |
| 인스턴스 메서드 | `show()✅`                  | prototype에 등록됨     |
| 정적 메서드     | `static total()`            | 클래스에서 직접 호출   |
| 정적 속성       | `static count = 0`          | 클래스에 직접 부여     |
| private 필드    | `#password`                 | 외부 접근 불가         |
| Getter/Setter   | `get name()`, `set name(v)` | 속성처럼 보이지만 함수 |

## ✅ 실습 기반 개념 정리

### 📌 Getter / Setter

```javascript
get name() {
  return this._name.toUpperCase();
}

set name(value) {
  if (value.length < 2) throw new Error('두 글자 이상 필요')
  this._name = value;
}
```

- `this.name = value` -> `set` 호출
- `console.log(obj.name)` -> `get` 호출
- 실제 데이터는 `_name`에 저장하여 내부에서 관리함.

> ⚠️ 주의사항
> `setter` 안에서 `this.name = value`라고 쓰면 `setter`가 자기 자신을 계속 호출해서 무한 루프가 발생할 수 있다.
> -> 반드시 내부 저장용으로 `_name` 같은 별도 필드를 사용

### 📌 private 필드(`#password`)

```javascript
#password = '';
checkPassword(input) {
  return this.#password === input;
}
```

- `#` 붙은 필드는 완전한 `private`로 외부에서 접근이 불가능하다.
- `this.#password = '1234'`는 클래스 내부에서만 가능
- `p.#password`는 SyntaxError

### 📌 static 정리해보자

| 종류                          | 예시                                            | 설명                               |
| ----------------------------- | ----------------------------------------------- | ---------------------------------- |
| 정적 속성                     | `static count = 0`                              | 클래스에서 직접 접근(`User.count`) |
| 정적 메서드                   | `static getCount()`                             | `User.getCount()`로 호출           |
| 정적 필드에서 인스턴스 접근 x | static 메서드 안에서 `this.#password` 접근 불가 |

정적 메서드는 **공통 기능 처리**를 한다.

## ✅ 상속 예시 및 사용

```javascript
class Animal {
  speak() {
    console.log('소리냄');
  }
}

class Dog extends Animal {
  speak() {
    super.speak(); // 부모 메서드 호출
    console.log('멍멍');
  }
}
```

- `extends` 키워드로 상속
- `super`는 부모 메서드 호출
- 자식 클래스도 `constructor`를 갖고 싶다면 반드시 `super()`를 호출해야 함

## 정리해보자

- 클래스는 사실상 `함수 + prototype` 구조를 감싼 문법이다.
- `getter/setter`를 활용하면 읽기/쓰기를 제어하여 출력을 가공하고, 유효성 검사까지 가능하다.
- `private` 필드(`#`)는 완전 은닉성을 제공한다.
- `static`은 클래스 자체에서만 접근이 가능하다.
- `User.currentUser = new User(...)` 방식으로 전역 인스턴스 관리도 가능하다.
- `this.name = value`로 저장하면서 내부적으로 `set name()` 호출되는 걸 이해함.

---

### ❓ `this.name = name`은 어떻게 동작하는가?

`set name()`이 자동으로 호출된다.<br/>
클래스 내부에서 `this.name = name`처럼 할당하면 일반 속성처럼 보이지만, 해당 클래스에 `set name(value)` 메서드가 정의되어 있는 경우에는 해당 `setter` 함수가 호출된다.<br/>
따라서 단순히 `_name`에 직접 저장하는 것이 아니라, 유효성 검사를 거쳐 저장한다.

### ❓ `User.currentUser.name`과 `_name`의 차이점은?

`User.currentUser.name`은 `getter`를 통해 반환되는 값이고, `_name`은 클래스 내부에서 실제로 값이 저장되는 변수이다.<br/>
즉, `get name()`에서 `_name.toUpperCase()` 같은 로직을 넣을 경우, `User.currentUser.name`은 항상 **가공된 값(대문자)**이 반환된다.

### ❓ `this._name = name`을 선언해야 하는 이유는?

자바스크립트에서는 클래스 내부에 별도로 `let`, `const`가 없어도 속성을 정의할 수 있지만, 명시적으로 선언해주면<br/>

- 가독성이 좋아지고,
- 협업 시 명확하게 어떤 필드가 있는지 알 수 있으며
- 코드 상의 실수를 줄일 수 있다.

### ❓ `static` 메서드는 왜 `User.getCount()`처럼 클래스 이름으로 호출하나?

`static` 메서드는 인스턴스가 아닌 클래스 자체에 속한 메서드이기 때문에, 인스턴스(ex: `user1`)에서는 호출할 수 없고 반드시 클래스 이름(`User`)으로 접근해야 한다.

### ❓ `this.count++`와 `User.count++`의 차이점은?

`count`가 `static`으로 선언되었기 때문에, 인스턴스 내부의 `this.count`는 존재하지 않음.<br/>
즉, `this.count++`는 의도한 static 값 증가가 되지 않으며, 새로운 인스턴스 속성 `count`를 만들게 된다
