# 📘 HTML/CSS 학습 일지 - 트랜지션, 애니메이션, 선택자 마스터

## 🎯 학습 목표

- CSS `transition`과 `animation` 속성의 차이를 이해하고 활용하기
- 다양한 CSS 선택자(기본/결합자/가상 클래스/가상 요소/함수형) 완벽히 익히기
- 실전 UI 구성: 로딩 스피너, 눈 애니메이션, 사이드 슬라이드 메뉴 구현
- 시각 효과를 위한 세밀한 인터렉션과 애니메이션 제어 연습

## 📌 오늘의 학습 요약

### 1️⃣ CSS 트랜지션(`transition`)

- `transition`은 상태 변화 시 부드러운 전환을 적용하는 속성
- `hover` 상태에서 `width`, `background-color`, `opacity`에 트랜지션 적용
- `transition: all 2s linear 1s;` vs 속성별 지정 방식 비교 학습

✅ 핵심 키워드: `transition-duration`, `transition-delay`, `transition-timing-function`, `hover`

### 2️⃣ CSS 애니메이션(`@keyframes`)

- `animation-name`, `duration`, `delay`, `iteration-count`, `direction`, `fill-mode` 등 속성 실습
- `alternate`를 활용한 왕복 애니메이션 + `fill-mode: forwards`로 마지막 상태 유지
- 복잡한 이동/색상/투명도 변화 단계 지정

✅ `@keyframes` 5단계 변화로 자연스럽고 리듬 있는 동작 구현

### 3️⃣ 로딩 UI 애니메이션 실습

(1) 바 형태 로딩기(`.loader .bar`)

- `stretch` 애니메이션으로 막대기 늘어나는 효과
- `.dot`과 `::before`, `::after`를 조합해 하트 모양이 튀어나오는 시각 효과

(2) 눈 캐릭터 로딩기(`.eye .pupil`)

- `moverPupil`로 시선 이동, `blink`로 깜빡임 구현
- 단순한 요소에도 생명감을 붙어넣는 기법 습득

(3) 회전 로딩기(`.spinner`)

- `@keyframes spinner`로 360도 회전 효과 구현
- `dashed`, `solid`, `dotted` 테두리 혼합으로 시각적으로 재미있는 스타일 적용

### 4️⃣ 슬라이드 메뉴 실습

- `hover` 시 슬라이드 방식 메뉴(`transfrom: translateY()` 이용)
- `transition`을 활용하여 부드러운 메뉴 등장 효과 구성
- `position: fixed` 활용해 화면 고정 위치 지정

✅ 마우스 인터렉션을 활용한 실전 메뉴 패턴 구현 경험

### 5️⃣ CSS 선택자 실습

| 유형          | 예시                                                           | 학습                  | 내용 |
| ------------- | -------------------------------------------------------------- | --------------------- | ---- |
| 기본 선택자   | `*`, `p`, `.class`, `#id`, `[type='text']`                     | 스타일 지정의 기본    |
| 결합자        | `div p`, `div > p`, `h1 + p, h1 ~ p`                           | 구조에 따른 선택      |
| 가상 클래스   | `:hover`, `:focus`, `:checked`, `:disabled`, `:nth-of-type(n)` | 상태 변화에 반응      |
| 가상 요소     | `::before`, `::after`, `::first-letter`, `::first-line`        | 꾸밈 요소 생성        |
| 함수형 선택자 | `:is()`, `:not()`, `:where()`, `:has()`                        | 조건 기반 선택 고급화 |

✅ 선택자 우선순위 및 사용 케이스를 직접 적용하며 감각적으로 익힘
✅ `:has(img)`나 `:not(.hidden)` 등은 특히 실무에서도 유용

## 🔍 깨달을 점

- `transition`은 "변화가 일어날 때"만, `animation`은 "자동으로 반복 동작"할 때 사용
- CSS만으로도 매우 풍부한 인터랙션과 동적인 표현이 가능하며, JS 없이도 강력한 UI를 만들 수 있음
- 선택자 공부는 머리로 외우는 것보다 직접 스타일 적용하고 결과를 눈으로 확인하는 것이 가장 효과적..!

## 🛠 개선/보완할 점

- 일부 애니메이션의 `delay`와 `timing-function`이 복잡해지며 흐름이 꼬임 → 구조적으로 정리 필요
- `hover` 트리거로만 애니메이션을 시작하면 접근성이나 모바일 대응이 제한적 → JS 연계 고려 필요
