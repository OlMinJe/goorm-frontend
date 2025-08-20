# React Router

> 단순히 화면 전환을 “되는대로” 만드는 게 아니라, URL ↔ UI 상태를 안전하게 동기화하고, 중첩 라우팅과 레이아웃 패턴까지 깔끔하게 적용하는 것

## 왜 React Router인가

SPA에서 URL은 단순한 주소가 아니라 앱의 상태를 직렬화한 스냅샷이다.<br/>
뒤로가기/앞으로 가기, 새로고침 등과 같은 브라우저 내장 기능을 표준 방식으로 활용하기 위해 `react-router`를 사용한다.<br/>
선언형으로 "이 URL에는 이 컴포넌트!"라고 선언해주면, 나머지 매칭 및 렌더링은 `react-router`가 알아서 해준다.

- `Route`: 경로 규칙
- `Router`: URL 변화를 감지해 갈 길을 정해주는 안내

## 라우팅 흐름

### 1) 루트에 `<BrowserRouter>` 두기

웹 전용 라우터를 앱 루트에서 한 번 감싼다.

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### 2) 라우트 트리를 컴포넌트로 분리

앱 구조가 커질수록 `App.jsx` 안에 라우트를 다 몰아넣으면 가독성이 떨어진다.<br/>
그래서 `src/router.jsx`로 라우트 선언을 분리했다.

```jsx
// src/router.jsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router';

import RootLayout from '@/layouts/RootLayout';
import AuthLayout from '@/routes/auth/AuthLayout';
import Home from '@/routes/Home';
import Login from '@/routes/auth/Login';
import Register from '@/routes/auth/Register';
import NotFound from '@/routes/NotFound';

const Profile = lazy(() => import('@/routes/member/Profile'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />

        {/* 중첩 라우팅(부모/자식) */}
        <Route path="/member">
          <Route path="/member/profile" element={<Profile />} />
        </Route>

        {/* 인증 영역 레이아웃 */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
```

자식 경로는 **상대 경로(`profile`)**로 두면 재사용성이 좋아진다.<br/>
다만 이번엔 자료 흐름을 따라 절대 경로(`/member/profile`)로 두고 동작을 확인했다.

### 3) 레이아웃 + 중첩 라우팅의 핵심 = `<Outlet />`

부모 레이아웃 안에서 자식 라우트가 렌더링될 자리 표시자가 `<Outlet />`이다.<br/>
`<Outlet />`이 없으면 자식이 보이지 않으니 필수 체크.

```jsx
// src/layouts/RootLayout.jsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <main>
      <ErrorBoundary fallback={<p>⚠️ 오류가 발생했습니다</p>}>
        <Suspense fallback={<div className="p-6">로딩중…</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
```

### 4) `<Link>` / `<NavLink>`로 전환

- `<Link>`는 HTML `<a>`의 대체로, 전체 리로드 없이 URL만 바꾸고, 라우터가 컴포넌트를 교체한다.
- `<NavLink>`는 활성 경로를 감지해 메뉴/탭 UI에 유리하다.

**실수 기록**

- `<a href="/path">`를 쓰면 페이지가 통째로 새로고침돼서 상태가 날아간다. 반드시 `<Link to="/path">`로 사용!!

## Suspense & ErrorBoundary로 부분 실패/지연에 대한 UI 처리

라우트 레벨에서 `lazy()`로 코드 스플리팅을 적용하면 초기 번들이 가벼워진다.<br/>
이때 로딩 상태는 `Suspense`, 렌더링/라이플사이클 에러는 `ErrorBoundary`로 처리하면 앱 일부가 늦거나 깨져도 전체는 유지된다.

```bash
npm i react-error-boundary
```

## 회고

### `<Outlet>` 누락

- 자식 라우트가 렌더링되지 않음 → 부모 레이아웃에 반드시 추가.

### 404(`path="*"` )ㅇㄹㅇ

- 라우트 트리의 맨 끝으로 보내 충돌 방지.

### 절대/상대 경로 혼용

- 중첩 라우팅에선 상대 경로가 유지보수에 유리
- 상수 관리(ROUTES)로 오타를 줄였다.

### 네비게이션

- `<a>` 대신 `<Link>`/`<NavLink>` 사용
- 페이지 전체 리로드 방지.
