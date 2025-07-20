# 📘 HTML/CSS 학습 일지 - 레이아웃 및 스타일링 심화

## 🔍 학습 목표

- HTML 폼 양식에 대한 이해를 더 깊이 하고,
- `table`, `colgroup`, `fieldset`, `form`, `layout`, `news UI`, `pseudo elements(::before, ::after)` 등을 활용하여 시각적 구조를 구성하는 방법 학습

## 📌 학습한 주요 내용 요약

### 1️⃣ `form` 심화 + `fieldset` 구조화

- `fieldset`과 `legend`를 사용하여 폼을 시각적으로 구분하고 의미를 부여
- `method="get"` 사용으로 폼 데이터 전송 방식 학습
- `label`의 `for` 속성과 `input`의 `id` 연결 필요성을 다시 인지
- 다양한 `input` 타입 사용: `text`, `password`, `email`, `tel`, `radio`, `select`, `number`, `submit`

📎 느낀 점: 구조적으로 더 명확해지고 접근성도 좋아진다.

### 2️⃣ `table` + `colgroup` 레이아웃 실습

- `colgroup`, `col` 태그를 통해 열 너비를 CSS로 제어
- `rowspan`, `colspan`을 복합적으로 사용하여 표 내 셀 병합 연습
- `thead`, `tbody`, `tr`, `td`, `th`에 대한 구체적 스타일 적용

📌 실습 예시

```html
<colgroup>
  <col style="width: 100px" />
  <col style="width: calc(!00% - 100px - 80px - 20%)" />
</colgroup>
```

✅ 평가 항목 테이블, 음식 추천 테이블, 레이아웃 테이블 등 다양한 형태의 테이블 제작 경험

### 3️⃣ 뉴스 카드 UI 제작

- `ul`, `li`를 이용한 뉴스 메뉴 및 콘텐츠 목록 구성
- 이미지와 텍스트를 좌우로 정렬하기 위해 `flex-direction: row` 적용
- `-webkit-line-clamp`와 `overflow: hidden`을 조합하여 말줄임(...) 처리 실습

📎 느낀 점: 실전적인 UI 구성 방법에 가까워졌고, 모바일 뉴스 앱처럼 구성하는데 유용했다.

### 4️⃣ `::before` & `::after` Pseudo Elements

- `.box`라는 클래스를 사용한 시각적 디자인 테스트
- `::before`는 magin과 높이를 이용한 정렬 보정, `::after`는 색상과 높이로 시각 요소 추가

📌 주요 스타일 코드

```css
.box::after {
  display: inline-block;
  width: 10px;
  height: 100%;
  background-color: yellow;
  content: '';
}
```

✅ 박스 내부 정렬, 시각적 장식 등을 `HTML` 추가 없이 구현할 수 있다는 점이 매우 강력하다고 느낌

### 5️⃣ Flex 레이아웃 실습

- `.wrap` 클래스를 사용한 `display: flex`로 column 3분할 레이아웃 구성
- `float` 없이도 유연한 배치 가능
- `%` 기반 너비 설정을 통해 반응형에 가까운 구성 연습

## 🔧 어려웠던 점 & 해결

- `rowspan + colspan` 혼합 사용 시 셀 구조 계산이 어려워 레이아웃이 틀어졌으나, colgroup과 구조적 시각화를 통해 해결
- `label`의 `for` 속성이 빠져 있어 연결이 되지 않는 폼 요소 발견 → `id` 속성과 일치하도록 수정 예정

## ✨ 느낀 점 & 내일의 목표

- 오늘은 단순한 마크업을 넘어서 스타일링과 구조화, 사용자 인터페이스 구성까지 경험할 수 있었다.
- 특히 테이블 레이아웃과 뉴스 UI 구성은 실무에 가까운 퀄리티로 발전 중이라 느꼈다.
