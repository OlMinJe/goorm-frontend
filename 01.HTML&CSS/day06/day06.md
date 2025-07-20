# 📘 오늘의 학습일지

오늘은 CSS에서 폼 구성, 스크롤 동작, 인터랙션 애니메이션, 반응형 네비게이션까지 다양하게 공부했다!

### 📌 1. Form 만들기

- `from`, `fidleset`, `legend` 같은 태그를 활용해서 실제 동작 가능한 문의 폼을 만들어봤다!
- Formspree를 통해 전송되는 구조도 이해했고, `autocomplete`, `placeholder`, `name`, `id`, `label for` 관계를 정확히 잡는 것도 연습했다!

→ 특히 `textarea`, `select` 태그 쓰는 게 재밌었고,
폼이 사용자 친화적으로 보여야 한다는 것도 느꼈다!

### 📌 2. Scroll Snap & 스크롤 페이지

- `scroll-snap-type`, `scroll-snap-align` 속성으로 한 섹션씩 딱딱 정렬되는 스크롤 페이지를 구현함!
- `overflow-y: scroll`, `height: 100vh` 조합으로 세로 페이지 완성했고, `scroll-behavior: smooth` 덕분에 부드럽게 움직이도록 했다.

→ 확실히 `scroll-snap` 쓰니까 단일 페이지 구성할 때 깔끔하다!

### 📌 3. 반응형 네이게이션(행버기 메뉴)

- `checkbox`와 `label`을 연결해서 햄버거 메뉴를 토글하는 방식 학습!
- 평소에 자주 보던 그 "3줄 아이콘"이 어떻게 동작하는지 원리를 알게 됨!
- `media query`로 화면이 작을 때는 메뉴가 드롭다운으로 변하게 만들었다.

→ 반응형 네이게이션이 생각보다 쉽고 신기해서 많이 써먹을 수 있을 것 같았다!

### 4. 인터랙션 / 마우스 이벤트

- `hover` 시 텍스트가 나타나는 퀴즈 카드 만들기
- `checkbox` 상태에 따라 숨겨진 이미지를 보여주는 방식도 배움
- 섹션마다 배경 이미지와 텍스트 위치, 효과를 다르게 줘서 재미있게 구성!

→ `:hover`, `:checked ~`, `animation`, `@keyframes`, `position:sticky` 등 다양한 요소들이 한데 모여 하나의 완성도 있는 페이지가 되는 게 인상 깊었따..!
