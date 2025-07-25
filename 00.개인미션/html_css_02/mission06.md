# 웹 애플리케이션 동작 방식

## 1. 웹 애플리케이션의 동작 흐름

### 1-1. 사용자 요청 (Request)

- 사용자가 브라우저에서 URL 입력 또는 버튼 클릭
- 브라우저가 서버에 HTTP 요청을 전송

### 1-2. 서버 처리 (Backend)

- 서버(백엔드)는 요청을 받아 로직 처리 (데이터베이스 조회, 연산 등)
- 처리 결과를 HTML, JSON 등 응답 형태로 준비

### 1-3. 응답 (Response)

- 서버가 브라우저로 응답(HTML/CSS/JS/JSON 등)을 보냄

### 1-4.브라우저 렌더링 (Frontend)

- 브라우저는 받은 HTML/CSS/JS를 해석하여 화면에 표시
- JavaScript로 동적 기능 실행

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

<html> ... </html>
```

### 4) 브라우저 화면 렌더링

## 5. 요약

- 웹 애플리케이션은 요청 → 처리 → 응답 → 렌더링 순서로 동작
- HTTP는 이 과정에서 데이터를 주고받는 약속
- 프론트엔드는 UI, 백엔드는 데이터와 로직을 담당
