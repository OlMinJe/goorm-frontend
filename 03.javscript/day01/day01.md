# 📘 Web APIs와 DOM 이해

## 1️⃣ Web APIs란?

오늘은 자바스크립트가 웹 브라우저와 어떻게 상호작용하는지를 담당하는 **Web APIs**에 대해 공부했다.
**Web APIs**는 브라우저가 자바스크립트에게 제공하는 기능 모음으로, 단순히 HTML과 CSS를 보여주는 것을 넘어서, 페이지를 동적으로 조작할 수 있게 해준다.

### 대표적인 **Web APIs** 예시

- **DOM API**: 문서 구조를 읽고 수정할 수 있다.
- **Events API**: 사용자 입력 감지 및 반응
- **Fetch API**: 서버와 데이터 주고받기

이러한 API 덕분에 자바스크립트는 정적인 페이지를 동적으로 바꿀 수 있다.

## 2️⃣ DOM과 인터페이스

**DOM(Document Object Model)**은 HTML 문서를 객체로 표현한 구조다.
여기서 중요한 점은 **DOM이 브라우저가 제공하는 인터페이스**라는 것이다.

### ✅ DOM 인터페이스란?

- DOM 인터페이스는 자바스크립트가 HTML 요소를 객체로 다루기 위한 일종의 "청사진"이다.
- 예를 들어, `Document`, `Element`, `HTMLElement` 등은 모두 DOM 인터페이스이다.
- 이 인터페이스들은 자바스크립트 객체처럼 사용할 수 있도록 메서드와 속성을 제공한다.

### 📌 JS에서 인터페이스란?

자바스크립트는 타입스크립트처럼 명시적인 `interface` 키워드는 없지만, 브라우저나 표준 라이브러리에서 제공하는 객체들은 공식적으로 정의된 속성과 메서드를 따르는 일종의 인터페이스로 볼 수 있다.
즉, DOM 객체들은 특정한 메서드 체계를 따르고 있으며, 이. 구조가 바로 "인터페이스"이다

## 3️⃣ DOM 객체 정리

| 객체       | 의미                |
| ---------- | ------------------- |
| `Document` | 전체 HTML 문서      |
| `Element`  | HTML 요소 개별 객체 |

DOM에서 요소에 접근하려면 여러 메서드를 활용한다.

**주요 DOM 접근 메서드**

- `getElementById(id)`
- `getElementsByClassName(class)`
- `querySelector(selector)`
- `querySelectorAll(selector)`

이 외에도 태그 이름, name 속성, 네임스페이스 등을 기준으로 접근하는 다양한 메서드가 있다.

## 4️⃣ Events & addEventListener

브라우저는 사용자와의 상호작용을 위해 **이벤트(Event)**의 개념을 제공한다.

- `click`, `scroll`, `submit` 등 다양한 이벤트가 있따.
- 이벤트는 `addEventListener()` 메서드로 연결한다

```javascript
const btn = document.getElementById('myBtn');
btn.addEventListener('click', () => {
  alert('버튼 클릭!');
});
```

## 5️⃣ 클래스 조작: Element.classList

DOM 요소의 클래스(class)를 조작할 때는 `classList` 속성을 사용하면 편리하다.

```javascript
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('selected');
element.classList.contains('highlighted');
element.classList.replace('old', 'new');
```

`classList`는 내부적으로 DOMTokenList 인터페이스를 따른다.

## 6️⃣ 스타일 조작: HTMLElement.style

HTML 요소의 인라인 스타일을 자바스크립트에서 설정할 수 있다.

```javascript
element.style.backgroundColor = 'blue';
element.style.opacity = '0.8';
button.style.display = 'none';
```

CSS 속성명은 camelCase로 변환해서 사용해야 한다.
예: `margin-top -> marginTop`, `font-size -> fontSize`

## 7️⃣ console 객체 활용

디버깅과 테스트를 위해 자바스크립트에서는 `console` 객체를 자주 활용한다.

### 주요 메서드

| 메서드            | 설명                           |
| ----------------- | ------------------------------ |
| `console.log()`   | 일반 로그 출력                 |
| `console.error()` | 에러 메시지 출력               |
| `console.warn()`  | 경고 메시지 출력               |
| `console.info()`  | 정보 메시지 출력               |
| `console.table()` | 객체나 배열을 표 형식으로 출력 |

```javascript
console.log('버튼이 클릭됨');
console.error('오류 발생!');
console.table([
  { name: '홍길동', age: 20 },
  { name: '김철수', age: 25 },
]);
```

## ✍️ 느낀 점

- 지금까지 자바스크립트를 단순히 코드로만 생각했었는데, 브라우저가 제공하는 **Web API**와 **DOM 인터페이스**를 통해 자바스크립트가 웹과 사화작용하는 방법을 더 잘 이해하게 되었다.
- DOM은 문서를 객체처럼 다루기 위한 기반 구조이며, 각 HTML 요소는 다 **객체(인터페이스)**로 표현된다는 개념이 인상 깊었다.
- `console` 객체를 활용하면 디버깅과 데이터 확인이 훨씬 수월하다는 점도 확인했다.
- 앞으로는 인터페이스의 개념과 객체 구조 이해를 바탕으로 코드를 더 체계적으로 바라볼 수 있을 것 같다.

# 📘 미션 후기

> 이번 미션에서 가장 인상 깊었던 부분은 **탭 클릭 시 중앙 정렬** 기능을 구현하면서, DOM의 위치 계산 방식과 다양한 스크롤 메서드에 대해 실제로 체감해볼 수 있다는 점이다.

### ✅ getBoundingClientRect vs offsetLeft

탭 위치를 중앙에 오도록 스크롤하려면 탭 요소가 어디에 위치해 있는지를 정확히 파악해야 한다.

| 메서드                    | 기준 좌표계          | 특징                                             |
| ------------------------- | -------------------- | ------------------------------------------------ |
| `getBoundingClientRect()` | 브라우저 뷰포트 기준 | 스크롤과 상관없이 현재 화면에서 보이는 위치 반환 |
| `offsetLeft`              | 부모 요소 기준       | 레이아웃이 고정적일 때 간단하고 효율적           |

`offsetLeft`을 사용해보니 지금 코드에서는 문제 없었지만, 추후에 실제로 동적으로 변하는 요소에서는 문제가 발생할거 같았다.

### 📌 결론

정적 레이아웃에서는 `offsetLef`로도 충분하지만,
스크롤되거나 반응형 레이아웃 등 동적 상황에서는 `getBoundingClientRect()`가 정확하게 위치 계산이 가능하다.

### ✅ scrollTo vs scrollBy vs scrollIntoView

각 메서드를 직접 적용해보면서 차이를 확실히 느낄 수 있었다.

| 메서드             | 기준           | 설명                                                      |
| ------------------ | -------------- | --------------------------------------------------------- |
| `scrollTo(x, y)`   | 전체 문서 기준 | 절대 좌표로 이동(0,0부터 시작)                            |
| `scrollBy(x, y)`   | 현재 위치 기준 | 상대 좌표로 이동                                          |
| `scrollIntoView()` | 요소 기준      | 해당 요소가 보이도록 자동 스크롤, 위치 조정은 한계가 있음 |

### 📌 결론:

탭을 "정확히 중앙에 정렬"하려면 → `scrollTo`와 직접 계산된 위치(`offset`)를 함께 사용하는 방식이 가장 명확하다.
`scrollIntoView`는 편하긴 하지만 원하는 위치(가운데)에 맞추는 정밀함은 부족하다.

## 🧠 느낀 점

단순한 스크롤도 결국 좌표 계산, 요소 위치 파악 등 다양한 개념이 필요하다는 것을 체감했다.

DOM 인터페이스에서 제공하는 메서드들의 차이점과 쓰임새를 실제로 비교해보니 기억에도 오래 남았다.

UI에서 위치나 정렬을 다룰 때는, **좌표 기준(뷰포트 vs 부모 vs 문서 기준)**을 꼭 명확히 이해하고 사용해야 한다는 교훈도 얻었다.

이번 미션을 통해 화면 요소 제어의 본질은 수학적 계산과 정확한 기준 선택임을 다시 느꼈다.
작지만 의미 있는 경험이었다. 💡
