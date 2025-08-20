# 내장 리액트 API `use()`

`use()`는 React 18.3에서 새롭게 소개된 API로, `Promise`, `context`, 또는 서버 전용 객체를 컴포넌트에서 동기적으로 사용할 수 있게 해준다.<br/>
기존에는 `Suspense`와 조합하거나 커스텀 훅을 사용해야 했지만, 이제 `use()`를 통해 보다 단순하게 비동기 데이터를 다룰 수 있다.

## 특징

- `Promise`를 직접 전달하면 React가 알아서 자동으로 `Suspense` 처리를 해준다.
- 서버 컴포넌트에서만 사용이 가능하다.
- `contexxt`를 읽을 때도 활용이 가능하다. (ex. `use(ThemeContext)`)
- 다른 Hook과 달리 `if`문 같은 조건문 혹은 반복문 내부에서 호출이 가능하다.

## 정리

**미쳤다 이거**

- 비동기 로직과 `Suspense`의 연결이 직관적으로 변하면서, 서버 컴포넌트 기반 개발에서 너무 편리해졌다.
- 클라이언트 컴포넌트에서는 아직 사용할 수 없어서 구분이 필요하다! `use client` 등

# Context

`Context`는 전역적으로 필요한 데이터를 `prop drilling` 없이 여러 컴포넌트에 전달할 수 있는 방법이다.<br/>
예를 들어 다국어 지원, 테마, 사용자 인증 정보 공유 등에 자주 활용된다.

## 동작 방식

1. `createContexxt()`로 컨텍스트 생성
2. `Context`로 하위 트리에 데이터 전달
3. 하위 컴포넌트에서 `useContext()` 또는 `use(Context)`로 값을 사용한다.

### 예시 코드

```jsx
// ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

// 1. Context 생성
const ThemeContext = (createContext < 'light') | ('dark' > 'light');

// 2. Provider 컴포넌트 정의
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = (useState < 'light') | ('dark' > 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. 하위 컴포넌트에서 Context 사용
export const ThemedText = () => {
  // useContext 훅
  const theme = useContext(ThemeContext);

  // use()로도 가능 (서버 컴포넌트 한정)
  // const theme = use(ThemeContext);

  return (
    <p style={{ color: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? 'white' : 'black' }}>현재 테마는 {theme} 모드입니다.</p>
  );
};
```

👉 실행하면 처음에는 light 테마이고, 버튼을 클릭하면 dark 테마로 전환된다. 이때 `ThemedText` 컴포넌트의 스타일이 자동으로 바뀐다.

### 사용 예시

```jsx
// App.tsx
import React from 'react';
import { ThemeProvider, ThemedText } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ThemedText />
    </ThemeProvider>
  );
}

export default App;
```

## 장점/단점

### 장점

- 상태 공유가 간단해진다.
- `prop drilling`을 피할 수 있다.

### 단점

- 너무 많이 사용하면 렌더링 최적화가 어렵다.(난리남)
- 컴포넌트 재사용성이 떨어질 수 있다.
  > WHY?
  >
  > 1.  `Context`는 전역 의존성을 만든다.
  >
  > - `Context`를 사용한 컴포넌트는 해당 `Context Provider`가 반드시 상위 트리에 있어야만 정상적으로 동작한다.
  > - 즉, 해당 `Context`를 쓰는 컴포넌트는 언제나 해당 `Context Provider` 안에서만 쓸 수 있어서, 다른 프로젝트나 다른 부분에서 단독으로 재사용하기 어렵다.
  >
  > 2. 상태와 로직 분리가 어려워진다.
  >
  > - `Context`로 API 데이터, 로그인 상태 등의 로직을 바로 주입하면, 해당 UI가 `Context`에 묶인다.
  >
  > 3. 렌더링 최적화 문제
  >
  > - `Context`의 값이 바뀌면, 해당 `Context`를 구독하는 모든 컴포넌트가 강제로 리렌더링된다.
  > - 이로 인해, 작은 컴포넌트도 불필요하게 영향을 받아 성능과 재사용성이 떨어질 수 있다.

## 정리

`Context`는 작은 범위?에서만 사용하는게 가장 효율적인거 같다.<br />
복잡한 상태 관리가 필요할 때는 `react-query`나 `zustand` 같은 전용 라이브러리를 사용하는게 좋지 않을까?

# react-query

서버 상태 관리 라이브러리로, API 호출과 캐싱, 동기화, 에러 핸들링을 쉽게 다룰 수 있게 해준다

## 주요 기능

### `useQuery`

- 데이터 fetching
- 캐싱
- 로딩/에러 상태 관리

```jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const { data } = await axios.get('');
  return data;
};

export default function UserList() {
  // useQuery: key는 ["users"], fetch 함수는 fetchUsers
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60, // 1분 동안 캐시 유지
  });

  if (isLoading) return <p>⏳ 로딩 중...</p>;
  if (isError) return <p>❌ 에러가 발생했습니다.</p>;

  return (
    <div>
      <h2>사용자 목록</h2>
      <button onClick={() => refetch()}>다시 불러오기</button>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### `useMutaion`

- 데이터 변경(`post`/`put`/`delete`) 처리

```jsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addUser = async (newUser: { name: string }) => {
  const { data } = await axios.post('', newUser);
  return data;
};

export default function AddUser() {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // "users" 쿼리 무효화 → 최신 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      mutation.mutate({ name });
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="새 사용자 이름" />
      <button type="submit">추가</button>
      {mutation.isPending && <p>추가 중...</p>}
      {mutation.isError && <p>에러 발생</p>}
      {mutation.isSuccess && <p>추가 완료!</p>}
    </form>
  );
}
```

### 기타

- 자동 리패칭(refetch)
- 캐시 무효화(invalidation)
- state time 설정 가능

## 장점

- 서버 상태와 클라이언트 상태를 명확히 구분할 수 있다.
- 캐싱 전략이 쩔어서 불필요한 네트워크 요청을 줄인다.
- `Suspense` 및 `Error Boundary`와의 동작 로직이 자연스럽다
