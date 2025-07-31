# 웹 애플리케이션 동작 방식

## 1. 웹 애플리케이션의 동작 흐름

웹 애플리케이션은 사용자 요청(Request) → 서버 처리(Backend) → 응답(Response) → 브라우저 렌더링(Frontend) 의 흐름으로 작동한다.

### 1-1. 사용자 요청 (Request)

- 사용자가 브라우저에서 URL 입력 또는 버튼 클릭
- 브라우저가 서버에 HTTP 요청을 전송
- 요청에는 다음 정보가 포함됨:
  1.  URL(자원 주소)
  2.  HTTP 메서드 (GET, POST 등)
  3.  헤더(Header): 브라우저 정보, 쿠키, 인증 토큰 등
  4.  바디(Body): POST 요청 시 전송할 데이터

### 1-2. 서버 처리 (Backend)

- 서버(백엔드)는 요청을 받아 로직 처리 (데이터베이스 조회, 연산 등)
- 처리 결과를 HTML, JSON 등 응답 형태로 준비

### 1-3. 서버 응답 (Response)

- 서버가 브라우저로 응답(HTML/CSS/JS/JSON 등)을 보냄
- 응답에는 다음 정보가 포함됨:
  1.  HTTP 상태 코드: 200(성공), 404(자원 없음), 500(서버 오류) 등
  2.  응답 헤더: 데이터 형식, 길이, 캐싱 정보
  3.  응답 본문: HTML/CSS/JS 또는 JSON 등의 실제 데이터

### 1-4.브라우저 렌더링 (Frontend)

- 브라우저는 응답 받은 데이터를 해석하여 화면에 표시
  1. HTML: 콘텐츠 구조
  2. CSS: 스타일, 색상, 레이아웃
  3. JavaScript: 동적 동작(애니메이션, 사용자 상호작용)
- 렌더링 엔진이 HTML과 CSS를 분석하고 DOM 트리를 생성하여 화면에 그린다.
- 필요 시 JavaScript가 추가로 서버에 요청(AJAX, Fetch API)을 보내어 데이터를 갱신한다.

## 2. HTTP 프로토콜

- HTTP (HyperText Transfer Protocol): 웹에서 요청/응답을 주고받는 통신 규칙

### 구성

- 요청(Request): URL, 메서드(GET, POST…), 헤더, 바디
- 응답(Response): 상태 코드(200, 404 등), 응답 데이터

### 특징

- Stateless(무상태): 요청 간 상태를 기억하지 않음
- HTTPS: 보안을 위해 암호화된 버전

## 3. 프론트엔드 vs 백엔드

### 프론트엔드 (Frontend)

- 역할: 사용자가 직접 보는 화면(UI)
- 기술: HTML, CSS, JavaScript
- 기능: 화면 표시, 이벤트 처리, API 호출

### 백엔드 (Backend)

- 역할: 서버에서 로직 처리, 데이터베이스 관리
- 기술: Node.js, Python, Java, DB (MySQL, MongoDB 등)
- 기능: 요청 처리, 데이터 가공, 인증

## 4. 웹 애플리케이션 동작 예시

### 1) 주소 입력:

```
https://example.com/products
```

### 2) 브라우저가 HTTP 요청:

```
GET /products HTTP/1.1
Host: example.com
```

### 3) 서버 응답:

```
HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <head><title>Products</title></head>
  <body>
    <h1>상품 목록</h1>
  </body>
</html>
```

### 4) 브라우저 화면 렌더링

- HTML → 구조 생성
- CSS → 스타일 적용
- JS → 동적 동작 추가

## 5. 요약

- 웹 애플리케이션은 요청 → 처리 → 응답 → 렌더링 순서로 동작
- HTTP는 이 과정에서 데이터를 주고받는 약속
- 프론트엔드는 UI, 백엔드는 데이터와 로직을 담당
