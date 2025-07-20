# 📘 HTML/CSS 학습 일지 - 반응형 웹페이지 & 갤러리 구현

## 🎯 학습 목표

- 다양한 해상도 대응하는 반응형 웹페이지 구조 이해 및 실습
- CSS Grid, Flexbox를 이용한 이미지 갤러리 레이아웃 설계
- 미디어 쿼리를 통해 요소 크기와 배치를 동적으로 조정
- 애니메이션(`@keyframes`)과 시각 효과로 사용자 경험 향상

## 📌 오늘의 학습 요약

### 1️⃣ 반응형 웹페이지의 기본 구조 이해

- `meta viewport` 설정 (`width=device-width, inital-scale=1.0`)
- `min-width`, `max-width`, `%` 단위로 사용한 가변적인 박스 크기 조정
- 기본 뼈대 정리 및 `container` 중심 레이아웃 패턴 습득

### 2️⃣ Flex & Grid 홈합 레이아웃 구성

- Flex 사용 예시: `flex-wrap`, `gap`, `calc()`를 이용한 카드형 정렬
- Grid 사용 예시: `grid-template-columns: repeat(3, 1fr)`, `grid-row`, `grid-column`을 통한 불규칙한 배치

📎 실습 중 주요 코드

```css
@media only screen and (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }
}
@media only screen and (max-width: 640px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

✅ 다양한 해상도(PC, 태블릿, 모바일)에 따라 카드 개수 자동 조절

### 3️⃣ CSS 애니메이션 고급 응용

- `@keyframes spin`, `shake`, `waveBounce`, `movePupil`, `blink` 등 다양한 움직임 구현
- 이미지에 회전 효과, 캡션에 흔들림 효과 적용
- `.loader`와 `.eye` 클래스를 사용한 눈동자 애니메이션 반복 실행

✅ CSS만으로도 생동감 있는 UI를 구성할 수 있다는 점에 감탄!

### 4️⃣ 갤러리 구현

- `grid-row` 및 `grid-column`을 조절하여 각 이미지 박스의 크기 다양화
- `sidebar` 구성 후 `main-content`를 분리하여 레이아웃 안정성 향상
- `overflow-y: auto`로 사이드바 스크롤 대응

✅ 이미지별 캡션(`.caption`)을 절대 위치로 배치하고, `hover` 시 `shake` 애니메이션으로 포이트 제공

## 🔍 느낀 점

- `media query`만으로 복잡한 레이아웃 변화에 충분히 대응 가능하다는 걸 실감했다.
- `CSS Grid`는 복잡한 UI를 구성하는 데 특히 유용하며, 자유도가 높아졌다.
- 애니메이션을 더하면 단순한 갤러리도 훨씬 흥미롭고 감성적인 콘텐츠로 변신한다.
