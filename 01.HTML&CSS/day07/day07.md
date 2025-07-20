# 반응형 폼 UI 만들기

## ✅ 오늘의 학습 내용 요약

### 1️⃣ 폼 스타일링

- `input`, `select`, `textarea`에 공통 스타일 적용
  → 높이, 패딩, 테두리, 폰트 정리해서 사용자 친화적인 입력창 완성!
- `label`을 위해 배치하고 `display: block` 설정해서 깔끔한 정렬 구현

💡 특히 `placeholder`와 `autocomplete` 속성도 챙겨서 UX가 업그레이드 됨!

### 2️⃣ Layout 잡기(Flex)

- `.wrap`에 `display: flex`로 기본 2단 레이아웃 완성!
- `.row`에 `gap: 20px`, `.column`에 `flex: 1` 적용해서 왼쪽엔 이미지, 오른쪽엔 폼이 들어간 구조 만들었음

### 3️⃣ 모바일 반응형 대응

- `@media only screen and (max-width: 640px)` 조건으로 모바일 화면에서는 column이 위아래로 쌓이도록 바꿈
- `.row`의 방향을 `flex-direction: column`으로 바꾸고 `.bg_img`는 높이만 주고 100% 너비로 설정해서 자연스럽게 정렬됨

> 게다가 `header`는 `absolue + transform` 조합으로 모바일에서도 중앙 정렬 + 배경 반투명 박스처럼 잘 보이게 처리함!

### 4️⃣ 접근성 고려

- `legend`에는 `.screen-out` 클래스를 넣어 시각으로 숨기고, 스크린리더에선 읽히도록 처리함 → 접근성(A11y)도 생각한 폼 구성!

## ✨ 오늘의 포인트

- 마진/패딩, 레이아웃, 반응형, 접근성까지 하나의 폼을 만들면서 웹페이지 구조의 핵심들을 자연스럽게 복습한 느낌!
- 특히 반응형 레이아웃을 `flex + media query`로 처리하면서, "디자인이 무너지지 않도록 조절하는 게 얼마나 중요한지" 체감했음!
