# 📘 HTML 학습 일지 - 구조, 태그, Form 구성 요소 실습

## 🔍 학습 목표

- HTML 문서의 구조와 의미 있는 태그 사용법을 이해하고,
- 다양한 `<input>`, `<div>`, `<p>`, `<table>` 등의 태그를 활용해 구조화된 콘텐츠와 사용자 입력 폼을 직접 구성해보는 것

## 📌 오늘 배운 내용 요약

### 1️⃣ HTML 문서 기본 구조

- `<!DOCTYPE html>`, `<html lang="ko">`, `<head>`, `<meta>`, `<body>` 등의 구성 방식 이해
- `<main>`, `<header>`, `<footer>`, `<article>` 등을 통해 시맨틱(semantic) HTML의 중요성과 역할 확인

### 2️⃣ div와 p 태그 차이

- `div`: 블록 레벨 요소, 레이아웃이나 구조 분리에 사용됨(상자 역할)
- `p`: 문단 표현에 적합한 태그, 주로 텍스트 콘텐츠에 사용

✅ 실습 결과

```html
<div style="background-color: red">div는 상자잖아.</div>
<p style="background-color: blue">p는 상자라고 하기에는 쫌...</p>
```

❗잘못된 예시도 경험

```html
<!-- p 안에 div를 넣는 구조는 비권장 -->
 <p><div>이게 뭐꼬</div></p>
```

### 3️⃣ 강조 관련 태그 학습

- `strong`: 시맨틱하게 중요한 텍스트
- `em`: 강조할 때 사용, 기울임 효과
- `b`, `l`: 탄순 스타일 강조(시맨틱 의미 없음)
- `span`: 인라인 요소로 일부 텍스트에 스타일 적용 가능

✅ 예시

```html
<strong>스트롱걸~</strong>
<em>em입니다</em>
<b>볼드랍니다/</b>
<span>스팬?스팸</span>
```

### 4️⃣ 테이블 구성법

- `table`, `thead`, `tbody`, `tr`, `td`, `th` 구조 학습

✅ 실습

```html
<thead>
  <tr>
    <th>월</th>
    <th>화</th>
    <th>수</th>
    <th>목</th>
    <th>금</th>
    <th>토</th>
    <th>일</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>국어</td>
    <td>수학</td>
  </tr>
</tbody>
```

### 5️⃣ Form 태그 심화 실습: 회원가입 예제

- `form`을 사용해 실제 가입 폼 작성 연습
- 다양한 입력 필드에 대한 사용법 이해

✅ 사용된 입력 타입

- `<input type="text">`, `<input type="password">`, `<input type="email">`, `<input type="number">`, `<input type="radio">`, `<input type="tel">`
- `select`: 통신사 선택
- `<button type="submit">`: 폼 제출

✅ 라디오 버튼은 name 속성으로 그룹화

```html
<input type="radio" name="gender" value="0" />남자 <input type="radio" name="gender" value="1" />여자
```

✅ 셀 병합과 배경색 스타일링도 적용

```html
<td colspan="2">회원가입</td>
<td rowspan="2">구분</td>
```

### 🔧 실습 중 발견한 오류 & 개선 포인트

- `<label for="">`에 연결된 `id` 속성이 빠져있음 → 접근성 측면에서 개선 필요
- `p` 태그 내부에 `div`를 넣는 구조는 HTML 문법상 잘못된 사용

### ✨ 느낀 점 & 다음 목표

- 실제 웹페이지를 만드는 데 필요한 기본 HTML 요소들에 대해 많이 배웠고, 직접 예제를 만들어보니 구조와 흐름이 훨씬 잘 이해되었다.
- 앞으로는 CSS와 자바스크립트 연동, 그리고 form의 서버 제출 방식(method, action) 까지 연계해보는 게 목표이다.
