# 1. 동기(Synchronous)와 비동기(Asynchronous) 실행 차이

## 동기 방식

- `while` 루프나 `blockFor5Seconds()` 같은 동기 코드를 실행하면 UI가 멈춤.
- 다음 코드가 실행되지 않고, 앞의 작업이 끝날 때까지 브라우저가 멈춰 있는 상태를 경험.
- 예: `while` 루프 5초 돌리면 그동안 클릭이나 화면 동작이 멈춘다.

## 비동기 방식

- `setTimeout`으로 시간을 두고 작업을 지연하면 이벤트 루프에 작업을 예약해두고 다음 코드가 먼저 실행됨.
- 덕분에 UI가 멈추지 않고 다른 작업을 할 수 있음.

> 비동기 코드는 호출 스택에 바로 실행되지 않고, 콜백 큐에 예약되었다가 나중에 실행된다.

# 2. Promise를 통한 비동기 처리

- `new Promise()`를 통해 `resolve`, `reject`로 비동기 완료/실패를 제어.
- `.then()`, `.catch()` 체이닝으로 순차 실행 가능
- 예시: 커피 주문 시 `delayTask('1. 커피 주문') -> then -> delayTask('2. 원두 갈기')` 순서로 이어붙여서 실행.

# 3. async / await

- Promise 체이닝보다 가독성 좋은 비동기 처리 방법
- `await` 키워드로 마치 동기 코드처럼 순서대로 실행
- `try { await ... } catch { ... }`로 에러 처리 가능

```javascript
async function makeCoffee() {
  await delayTask('1. 커피 주문');
  try {
    await delayTask('2. 원두 갈기', true); // 실패 시 예외 발생
  } catch (err) {
    console.warn('에러 처리: ', err);
  }
  await delayTask('3. 물 끓이기');
}
```

> async/await은 Promise의 문법적 설탕(syntax sugar)으로, 더 직관적인 비동기 코드를 작성할 수 있게 해준다.

# 4. 실습: 커피 주문 시스템 만들기

- `async/await`를 이용해서 주문 순서대로 커피를 만듦.
- 비동기 호름 덕분에 첫 번째 주문을 만드는 중에도 다른 주문 버튼을 눌러 동시에 진행되는 효과를 확인
- DOM 조작: `document.createElement`, `appendChild`, `innerHTML`을 사용하여 로그 UI 업데이트

# 5. fetch를 사용한 HTTP 요청

## fetch 기본 패턴

```javascript
fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## async/await

```javascript
const res = await fetch(url);
const data = await res.json();
```

## GET 요청

`fetch('https://jsonplaceholder.typicode.com/users')` → JSON 데이터 가져와서 DOM에 `<li>` 추가.

# 6. 유저 정보 수정 미션

## 기능

1. 유저 목록 `GET` -> `<select>`에 옵션 추가
2. 유저 선택 시 `GET` -> 상세 정보 표시
3. 이름/이메일 수정 후 `PUT` 요청 -> 서버에 반영
4. 상태 메시지 출력

> 공통 `request()` 함수 작성: `fetch` + 에러 체크 + JSON 변환

```javascript
const request = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};
```

### DOM 업데이트

- `insertAdjacentHTML('beforeend', ...)`를 사용하여 `option` 요소 추가
- `innerHTML +=` 대신 `insertAdjacentHTML`을 사용한 이유
  1. DOM 전체를 다시 파싱하지 않고, 지정한 위치에만 HTML 삽입 -> 빠르고 안전
  2. 단점: XSS 위험 -> 문자열 삽입 시 반드시 데이터 검증 필요

# 7. HTTP 메서드 정리

- `GET`: 데이터 가져오기 (body 없음)
- `POST`: 새 데이터 생성
- `PUT`: 기존 리소스 전체 교체
- `PATCH`: 리소스 일부 수정
- `DELETE`: 리소스 삭제

```javascript
await request(`${API}/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email }),
});
```

### 8. GET 요청은 왜 body와 headers를 생략할까?

- `GET`은 데이터 가져오기만 하고, body는 사용하지 않는 것이 표준.
- 필요한 경우 쿼리스트링으로 추가 정보 전달.
- `fetch` 기본 `method`는 `GET`, 기본 `headers`는 브라우저가 자동으로 추가.
