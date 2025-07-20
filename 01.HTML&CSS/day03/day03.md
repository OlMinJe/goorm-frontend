# 📘 HTML/CSS 학습 일지 - Flex/Grid/우선순위 완전 정복

## 🔍 학습 목표

- Flex와 Grid 레이아웃 속성을 실전 구조에 적용해보고,
- CSS의 `position`, `transform`, `background`, `box-model` 등 다양한 속성을 연습
- CSS 우선순위와 선택자 적용 방식에 대해 심화 학습

## 📌 학습한 핵심 내용 요약

### 1️⃣ Flex 레이아웃 이해

- `display: flex`의 구조와 개념 정리
- `float`, `inline-block`의 한계를 극복하는 1차원 배치 방식
- 실제 Flex의 간단한 선언과 구조 확인

✅ 느낀점:
`flex-direction`, `justify-content`, `align-items`까지 연습하면 다음 단계로 넘어갈 수 있을 듯

### 2️⃣ Grid 레이아웃 실습(기본 + 고급)

- `display: grid`와 함께 `grid-template-rows`, `grid-template-columns`, `grid-area` 연습!
- `fr`, `%`, `px` 단위의 혼합 활용으로 다양한 레이아웃 구성
- `grid-row`, `grid-column`, `grid-area`를 이용해 요소를 정교하게 배치

📎 1차원은 Flex, 2차원은 Grid! 셀 병합, 격자 구조 UI엔 Grid가 압도적으로 편함

### 3️⃣ Grid 응용 케이스 다수 제작

- `.grid-wrap` 클래스를 활용한 여러 section 별 Grid 컨테이너 실습
- `repeat()`, `gap`, `position`, `nth-child` 선택자 등 혼합 사용
- 이미지 배경 삽입 및 텍스트 중앙 정렬을 위한 `flex` + `background-position` 사용

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-area: 2 / 1 / 3 /3;
```

### 4️⃣ CSS `position: absolute` + 정중앙 배치 실습

- 절대 위치 요소를 `top: 50%; left: 50%`로 배치하고 `margin-top`, `margin-left`로 정중앙 정렬
- `transform: translate()` 없이 고전적인 방식으로 정렬 구현

✅ 인라인 스타일로 직접 구성해보며 `absolute` 좌표 지정 이해도 상승

### 5️⃣ CSS 우선순위 정리

| 순위 | 우선순위 기준              | 예시                            |
| ---- | -------------------------- | ------------------------------- |
| 1    | `!important`               | `color: red !important;`        |
| 2    | 인라인 스타일              | `<h1 style="...">`              |
| 3    | ID 선택자                  | `#idName`                       |
| 4    | 클래스 / 속성 / 가상클래스 | `.box`, `[type=text]`, `:hover` |
| 5    | 요소 선택자                | `div`, `p`, `span` 등           |
| 6    | 상속, 브라우저 기본 스타일 | 기본 HTML 스타일                |

📎 메모: 우선순위 충돌 시, 가장 구체적이고 강력한 선택자가 적용됨

## ✨ 느낀 점

- Flex는 유연함(Flexible)의 미덕, Grid는 정밀함의 끝판왕
- CSS가 마냥 어렵기만 했는데, 규칙을 알게 되니 "왜 이렇게 동작하는가"가 보이기 시작함
- 오늘은 레이아웃만 다뤘지만, 스타일과 애니메이션, 반응형으로 확장할 수 있다는 생각이 들었다.
