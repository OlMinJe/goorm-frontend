# 📘 JavaScript (슬라이더 & 사용자 입력 유효성 검사)

## 1. 슬라이더 만들기

- `slider-wrapper`를 `translateX`로 움직이며 슬라이드 전환
- `changeSlide(step)`을 사용해 이전/다음 슬라이드를 한 함수로 처리
- 자동 슬라이드 (`setInterval`) 및 키보드 이벤트 (`keydown`)도 적용

#### 배운점

> - `transform: translateX`를 이용한 슬라이딩 효과
> - 인덱스 계산에 `currentIndex = (currentIndex + step + totalSlides) % totalSlides`를 사용하면 양/음수 방향 이동을 모두 처리 가능

## 2. 기초 JavaScript 문법 실습

- `const`, `let`을 이용한 변수 선언과 객체 사용
- `typeof` 연산자를 사용하여 기본 타입 확인
- `const` 객체의 프로퍼티는 변경 가능하지만, 전체 재할당은 불가능함

| 개념    | 요약 |
| ------- | ---- |
| `const` |      |
| `let`   |      |
| `var`   |      |

### 특이사항

- `typeof null === 'object`인 이유는 JS의 역사적인 버그 때문이라는 점 확인
- `Symbol` 타입의 존재 확인 및 `function`도 별도 타입으로 분류되는 점 인지

## 3. 자기소개 출력 및 사용자 나이 검사

- 객체를 사용해 `info = {name, age, job}` 구성
- `innerHTML`을 사용해 동적으로 자기소개 문장 출력
- 나이 입력값이 `e`, `+`, `-` 등 지수 표기법으로 입력되는 것을 `keydown` 이벤트로 방지

## 4. 이름, 나이, 전화번호 유효성 검사

- 사용자로부터 이름, 나이, 전화번호를 입력받고 유효성 검사 수행
- `replace(/\s/g, '')` 사용 이유: `trim()`은 앞뒤 공백만 제거하지만, 전체 공백 제거가 필요할 경우 `replace`가 더 유용
- `telInput`에서 입력값이 11자리일 때 자동으로 `000-0000-0000` 포맷 적용
- 정규표현식으로 전화번호 형식 검사: `/^\d{3}-\d{4}-\{4}$/`
- `RESULT_MESSAGE`와 같은 메시지 상수 분리
- `validateInputs()` 함수로 유효성 검사 로직 모듈화

### 📌 상수 정의 영역

사용자에게 보여줄 결과 메시지를 RESULT_MESSAGE 객체에 모아 정의함

### 📌 정규 표현식 패턴

```jsx
const TEL_PATTERN = /^(\d{3})(\d{4})(\d{4})$/;
const TEL_FORMATTED_REGEX = /^\d{3}-\d{4}-\d{4}$/;
```

- `TEL_PATTERN`은 전화번호를 숫자만 입력받은 상태에서 `01012345678` 형태를 `010-1234-5678`로 변환할 때 사용됨.
- `TEL_FORMATTED_REGEX`는 하이픈이 포함된 전화번호가 올바른지 검사함.

### 📌 나이 입력 제어

```jsx
ageInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
});
```

- `\D`는 숫자가 아닌 모든 문자를 의미하며, 사용자가 `e`, `+`, `-` 같은 문자를 넣어도 제거됨.

### 📌 전화번호 입력 제어

```jsx
telInput.addEventListener('input', (e) => {
  const numbersOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
  telInput.value = numbersOnly.length >= 11 ? formatPhoneNumber(numbersOnly) : numbersOnly;
});
```

- 전화번호도 숫자만 입력받으며, 최대 11자리까지만 허용함.
- 숫자가 11자리에 도달하면, `formatPhoneNumber()` 함수를 호출하여 자동으로 `010-1234-5678` 형식으로 변환함.

### 📌 유효성 검사 함수

입력값들을 `.trim()`으로 앞뒤 공백을 제거한 후 검사함.

- 이름의 경우 중간 공백을 우선적으로 허용함
- `input type="number"`의 경우 중간 공백을 허용하지 않기 때문에 `trim()`을 사용

## 🤔 느낀 점

단순히 동작하는 코드보다, 사용자 관점에서 오류를 방지하고 입력 편의를 고려한 UI/UX가 얼마나 중요한지 알게 되었다.

`input type="number"`가 생각보다 허용 범위가 넓어 예상치 못한 값도 받아들일 수 있다는 점은 매우 인상 깊었다.

# 📘 추가 학습

## `addEventListener`의 `useCapture`란?

### 기본 형식

```javascript
element.addEventListener(eventType, callback, useCapture);
```

- `useCapture`의 기본값은 `false` -> 버블링 단계에서 이벤트 실행
- `true`로 설정하면 -> 캡처링 단계에서 이벤트 실행

> - 캡처링(Capturing Phase): 문서의 루트부터 이벤트가 타겟가지 내려옴
> - 버블링(Bubbling Phase): 이벤트가 타겟에서 다시 루트로 올라감

```html
<div id="parent">
  <button id="child">클릭</button>
</div>
```

```javascript
document.getElementById('parent').addEventListener('click', () => console.log('부모'), true); // 캡처링

document.getElementById('child').addEventListener('click', () => console.log('자식'));
```

출력 순서: 부모 -> 자식

## `break-before`

`break-before`는 페이지, 열(column), 영역(region)이 바뀌기 전에 강제로 줄바꿈/분할을 하도록 지시하는 css 속성

```css
h2 {
  break-before: page;
}
```

### 가능한 값

- `auto` 기본값
- `always` 항상 분할
- `page`, `column`, `region`
- `avoid` 분할하지 않도록
- `left`, `right`, `recto`, `verso` 등 인쇄물용 키워드

> 주로 페이지 인쇄, 멀티 컬럼 레이아웃에서 레이아웃을 강제 조절할 때 사용한다.

## `non-zero`, `0`, `null`, `undefined`의 차이

| 값                     | typeof 결과    | 불린값 (truthy/falsy)    | 의미               |
| ---------------------- | -------------- | ------------------------ | ------------------ |
| `non-zero` (예: 1, -5) | `number`       | ✅ truthy                | 유효한 숫자        |
| `0`                    | `number` ❌    | falsy                    | 숫자지만 거짓값    |
| `null`                 | `object` ❗️   | ❌ falsy 명시적인 '없음' |
| `undefined`            | `undefined` ❌ | falsy                    | 값이 정의되지 않음 |

### 📌 차이 요약

- `0`: 숫자이지만 조건문에서는 거짓으로 평가됨
- `null`: 프로그래머가 "값 없음"을 명시적으로 설정
- `undefined`: 변수는 선언되었지만 값이 할당되지 않음
- `non-zero`: 숫자이며 참값

## 왜 `typeof null === "object"`인가?

- 초창기 JS에서 null은 내부적으로 `0x00` 값으로 표현됨
- `typeof`는 내부 비트 구조를 보고 `object`로 판단해버림

📌 하지만 바꾸면 너무 많은 웹사이트가 깨지기 때문에 그대로 유지됨

> ✅ null 체크는 항상 `value === null`로 하자!

## `input type ="number"`에서 `e`가 들어가는 이유는?

> HTML에서 `type="number"`는 지수 표기법(exponential notation)을 허용함

```html
<input type="number" />
```

입력: `1e3` -> 실제 값은 `1000`

### ✨ 왜?

`<input type="number">`는 HTML5 명세상에서 float 기반이므로 **지수 포함**을 허용합니다.

### ✅ 해결 방법

JS에서 강제로 필터링

```javascript
input.addEventListener('keydown', (e) => {
  if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
});
```

## 코드에서 사용된 정규표현식 해석

### ✅ `/\s/g` → 모든 공백 제거

- `\s`: 공백 문자(space, tab, newline 포함)
- `g`: 전체 전역 검색

### ✅ `/\D/g` → 숫자만 남기고 나머지 제거

- `\D`: 숫자가 아닌 문자

### ✅ `/[^0-9]/g` → 숫자가 아닌 문자 전부 제거

- `[^0-9]`: 0~9 이외의 문자
- 결과적으로 `/\D/g`와 같음

### ✅ `/^\d{3}-\d{4}-\d{4}$/` → 010-1234-5678 형태의 전화번호 검사

- `^` ~ `$`: 문자열 전체 검사(시작과 끝)
- `\d{3}`: 숫자 3개
- `-`: 하이픈
- `\d{$}`: 숫자 4개

### ✅ `/(\d{3})(\d{4})(\d{4})/` → 숫자 11자리에서 000-0000-0000으로 포맷팅할 때 사용

- 캡처 그룹 3개(`$1-$2-$3`)
  > 캡처 그룹이란?
  >
  > - 정규표현식에서 괄호 ()로 감싼 부분을 **캡처 그룹(Capture Group)**이라고 부름
  > - 문자열에서 특정 부분을 기억하고 나중에 재사용하거나 꺼내서 사용할 수 있도록 만든 그룹!
  > - 즉, `$1-$2-$3` 이부분을 그룹화 하여 사용하기 위함!
- 괄호 ( ): 각각의 숫자 그룹을 캡처 그룹(capturing group) 으로 만들어서 나중에 재사용할 수 있게함.

```javascript
digits.replace(TEL_PATTERN, '$1-$2-$3');
```

- `$1`: 첫 번째 그룹 (`\d{3}`)
- `$2`: 두 번째 그룹 (`\d{4}`)
- `$3`: 세 번째 그룹 (`\d{4}`)

## 슬라이더

참고 사이트 https://blog-of-gon.tistory.com/352

### 🔹 1. 기본형 슬라이더 (Basic Slider)

#### 특징

- 이전/다음 버튼으로 슬라이드 이동
- 한 번에 한 장씩 이동
- transform: `translateX()` 방식 사용

#### 학습 정리

- 슬라이드 간의 너비는 `min-width: 100%`
- `currentIndex`로 상태 추적
- `(index + step + total) % total` 구조로 순환 처리

### 🔹 2. 무한 루프 슬라이더 (Infinite Loop Slider)

#### 특징

- 첫 슬라이드 이전에 마지막 슬라이드 복제, 마지막 뒤에도 첫 슬라이드 복제
- 슬라이드 끝 없이 자연스럽게 순환

#### 학습 정리

- `cloneNode()`로 DOM 복제 필요
- `transitionend` 이벤트 활용하여 슬라이드 재정렬 (짧은 순간 transition 제거)

### 🔹 3. 페이드 슬라이더 (Fade Slider)

#### 특징

- 슬라이드가 밀리지 않고 위치 고정
- `opacity`와 `z-index`를 이용해 전환 효과

#### 힉습정리

```css
.slide {
  opacity: 0;
  position: absolute;
  transition: opacity 0.5s;
}
.slide.active {
  opacity: 1;
  z-index: 2;
}
```

- `.active` 클래스를 활용한 상태 전환 방식
- `setInterval` 또는 버튼 클릭으로 active 슬라이드 교체

### 🔹 4. 멀티 슬라이드 (Multi View Slider)

#### 특징

- 한 번에 여러 개의 슬라이드 보여줌
- 카드형, 갤러리형에 적합

#### 학습 정리

- 슬라이드 하나의 너비: `100% / 보여줄 개수`
- `overflow: hidden` 영역 안에서 `slider-wrapper`를 좌우 이동
- 반응형으로 구현 시 `flex-basis` 또는 `calc()` 활용 필요

### 🤔 느낀 점

슬라이더 구현은 단순한 듯 하지만 종류가 바뀌면 내부 로직이 완전히 달라진다는 것을 체감
특히 무한 슬라이더는 복제/재배치 처리가 필요해서 진입 장벽이 있었음
`opacity`, `position: absolute`를 활용하는 페이드 방식은 구현은 단순하지만, 구조 설계가 더 중요함
실무에서는 라이브러리(Swiper.js 등)를 많이 쓰지만, 원리를 이해하면 커스터마이징이 자유로워짐
