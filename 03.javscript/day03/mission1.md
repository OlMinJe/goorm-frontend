# `string.length`는 왜 가능한가?

> <b>문자열(string)</b>은 <b>객체(Object)</b>처럼 내부에 속성(`length`)과 메서드(`toUpperCase`, `slice` 등)를 갖는 <b>내장 객체(primitive wrapper object)</b>로 처리되기 때문이다.
> 그 이유는 자바스크립트가 문자열을 내부적으로 객체로 변환하는 과정을 자동으로 처리하기 때문!
>
> <aside>
> 💬 <b>내장 객체(primitive wrapper object)란?</b>
>
> 자바스크립트에서 `string`, `number`. `boolean`과 같은 기본형(primitive)은 값 자체가 객체는 아니지만, 마치 객체처럼 동작할 수 있도록 <b>자동으로 감싸주는 특수</b> 객체이다.<br/>
> 예를 들어 문자열 `hello`는 실제로 `new String("hello")` 형태의 <b>String 객체</b>로 일시적으로 변환되어 `length`, `.toUpperCase()` 등 같은 메서드와 속성에 접근이 가능하다.
>
> </aside>

## 1. 문자열은 기본형(primitive)이지만

<aside>
💬 <b>기본형(primitive)이란?</b>

객체가 아닌 단순한 값을 말하며, `string`, `number`,`boolean`, `null`, `undefined`, `symbol`, `bigint` 이 이에 해당된다.<br/>
이들을 불변(immutable)하며, 일반 객체와는 달리 메서드나 속성이 본래 없다.

</aside>

```javascript
let str = 'hello';
```

`str`은 기본 자료형(primitive type)인 <b>문자열</b>이지만, 자바스크립트에서는 아래와 같이 사용된다.

```javascript
console.log(str.length); // 5
console.log(str.toUpperCase()); // "HELLO"
```

> ❓ 왜 기본형인데 `length` 같은 속성을 사용할 수 있는걸까?

### 2. 자바스크립트의 내부 처리 방식: Boxing

자바스크립트는 문자열, 숫자, 불리언 등 기본 타입을 사용할 때, 필요 시 자동으로 <b>래퍼 객체(wrapper object)</b>로 변환해준다.

즉, 속성이나 메서드에 접근이 일어나면 <b>자동으로 래퍼 객체</b>로 변환해주는 의미!

> <b>래퍼 객체(wrapper object)란?</b>
>
> - 기본형을 객체처럼 다루기 위해 자바스크립트가 자동으로 생성하는 임시 객체
> - 이 객체는 해당 기본형에 맞는 내장 객체(`String`, `Number`, `Boolean`)

- 문자열 → `String` 객체
- 숫자 → `Numbrt` 객체
- 불리언 → `Boolean` 객체

```javascript
let str = 'hello';

// 위의 코드를 자바스크립트에서 아래와 같이 처리함
let example = new String('hello');
example.length = 5;
```

> 이 과정을 <b>자동 박싱(auto-boxing)</b> 또는 <b>임시 객체 변환</b>이라고 한다.
>
> <aside>
> 💬 <b>Boxing은 뭐고 자동 박싱(auto-boxing)은 뭘까?</b>
>
> ### Boxing이란?
>
> 기본형(Primitive)을 객체(wrapper object)로 감싸는 것을 의미한다.
>
> ### Auto-boxing이란?
>
> 자바스크립트가 이 과정을 자동으로 수행한다는 뜻으로, 개발자가 `new String()`을 명시하지 않아도 내부적으로 잠깐 객체화한 뒤 제거된다.
>
> > ❓ “내부적으로 잠깐 객체화한 뒤 제거된다.”는 무슨 의미죠?
> >
> > 자바스크립트에서 문자열, 숫자, 불리언 같은 기본형은 원래 객체가 아닌데, 객체처럼 사용하는 코드를 처리할 때 자동으로 수행하는 과정을 의미한다.
> >
> > ```javascript
> > let str = 'hello';
> > console.log(str.length); // 객체처럼 사용하기
> > ```
> >
> > 1. `"hello"`는 원래 그냥 문자열(primitive)
> > 2. 잠깐 `new String("hello")`라는 <b>객체로 변환함.</b> → 이게 "잠깐 객체화"입니다.
> > 3. 이 객체에는 `.length`, `.toUpperCase()` 등의 속성이 있기 때문에 접근이 가능!
> > 4. 값(예: `5`)을 읽고 나면, <b>그 임시 객체는 바로 사라짐</b> → 이게 "제거됩니다"라는 의미.
> >
> > 즉, <b>우리가 명시적으로 객체를 만든 적이 없지만</b>, 자바스크립트가 알아서 "그때 잠깐 만들어주고, 바로 없애는" 방식으로 동작함!
>
> </aside>

### 3. `lenght`는 `String` 객체의 내장 속성

```javascript
let str = 'apple';
console.log(str.length); // 5
```

## 📁 최종적으로

문자열(string)이 `.length` 로 체크할 수 있는 이유는, 자바스크립트가 문자열을 사용할 때 자동으로 `String` 객체로 감싸는 <b>임시 객체 변환(Boxing)</b>을 수행하기 때문이다.

이 `String` 객체에서는 `.length` 속성이 정의되어 있어서, 문자열의 길이를 확인할 수 있다.

👉 <b>자바스크립트가 임시로 문자열을 래핑(wrap)</b> 해서 `String 객체`로 만들어 주기 때문!
