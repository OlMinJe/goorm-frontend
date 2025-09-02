# React Query

React 애플리케이션에서 서버 상태(Server State)를 관리하기 위한 데이터 동기화 라이브러리이다.
이전 이름은 React Query였지만, v4부터 Vue, Svelte 등 다양한 프레임워크에서도 사용 가능해지며 TanStack Query로 확장되었다.

## Cach

> 자주 사용하는 데이터를 미리 저장해두었다가 다시 필요할 때 빠르게 꺼내 쓰는 기술

웹 브라우저는 한 번 다운로드한 HTML, CSS, JS, 이미지 파일 등을 캐시에 저장하고, 다음에 같은 사이트를 방문할 때는 서버에 다시 요청하지 않고 캐시에서 바로 꺼내서 사용한다.

### ✅ 왜 필요할까?

- 속도 향상: 서버까지 가지 않고 캐시에서 읽으니 빠르다.
- 서버 부담 완화: 같은 요청 반복돼도 서버는 매번 새로 계산 안해도 된다.
- 비용 절감 : 네트워크 요청, 연산을 줄여 리소스를 절약한다.

### ✅ 어디에서 동작하나?

- 브라우저 캐시: 정적 파일 저장
- 메모리 캐시: 앱 실해 중 메모리에 저장(React Query 캐시)
- 서버 캐시: DB에서 가져온 결과를 서버에 저장(ex. Redis)
- CDN 캐시: 전 세계 서버에 파일을 미리 복사해두고, 가장 가까운 서버에 전달하여 꺼내 사용한다.

### ✅ 캐시 제어 (HTTP 헤더)

- `Cache-Control`: `max-age=3600`, public → 1시간 동안 캐시 사용.
- `no-cache`: 캐시를 쓰기 전에 반드시 서버 확인.
- `no-store`: 아예 캐시 금지 (민감 데이터).
- `public` / `private`: 공용 캐시 허용 / 개인만 허용.
- `must-revalidate`: 만료된 캐시는 꼭 서버에서 확인 후 사용.

👉 캐시는 빠르고 효율적인 웹을 위해 필수!

## React Query 구조

React Query는 서버 데이터를 캐싱하고 관리하는 라이브러리

### ✅ QueryClient

- 앱 전체 쿼리와 뮤테이션을 관리하는 엔진이다
- 내부적으로 `queryCache`(쿼리 저장소)와 `mutationCache`(뮤테이션 저장소)를 소유한다.
- `QueryClientProvider`를 통해 전역 등록하여 사용이 가능하다.

```jsx
const queryClient = new QueryClient()

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>

```

### ✅ QueryCache

- 모든 쿼리의 데이터/상태를 저장하는 실제 캐시 저장소
- 보통 직접 다루지는 않고 `QueryClient`를 통해 접근한다.

```jsx
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => console.error('❌ 실패:', query.queryKey, err),
    onSuccess: (data, query) => console.log('✅ 성공:', query.queryKey, data),
  }),
});
```

### ✅ MutationCache

- 데이터의 생성/수정/삭제 같은 변경 기록을 관리한다.
- `onMutate`, `onSuccess`, `onError`, `onSettled` 같은 전역 콜백 함수를 실행할 수 있다.

```jsx
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err, variables, _, mutation) => console.error('❌ Mutation 실패:', mutation.options.mutationKey, err),
    onSuccess: (data, variables, _, mutation) => console.log('✅ Mutation 성공:', mutation.options.mutationKey, data),
  }),
});
```

👉 전역 에러 처리/토스트 알림 같은 데 주로 쓴다.

## QueryClient Util(`useQueryClient`)

`useQueryClient` 훅으로 캐시에 직접 접근한다.

### 주요 메서드

- `queryClient.getQueryData(queryKey)`: 캐시 데이터 즉시 읽기(네트워크 호출 X)
- `queryClient.setQueryData(queryKey, updater)`: 캐시 데이터 직접 수정(낙관적 업데이트)
- `queryClient.invalidateQueries({ queryKey })`: 특정 캐시를 무효화하고, 다음 렌더에서 자동으로 새로운 fetch
- `queryClient.prefetchQuery({ queryKey, queryFn })`: 화면 전환 전에 미리 데이터 불러오기
- `queryClient.removeQueries({ queryKey })`: 캐시에서 제거
- `queryClient.clear()`: 전체 캐시 초기화로 보통 로그아웃 시 사용한다.

## useQuery

> 읽기 전용(GET) 훅

- 내부적으로 캐싱, 로딩/에러/상공 상태 관리 자동화를 담당한다
- 같은 `queryKey`로 요청하면 네트워크 호출 없이 캐시를 사용할 수 있다.

```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ['me'],
  queryFn: () => api.get('/me').then((res) => res.data),
});
```

### 주로 사용하는 옵션

- `queryKey`: 캐시 식별자(배열 권장)
- `queryFn`: 데이터를 가져오는 비동기 함수
- `enabled`: 조건부 실행이 가능하도록 해줌(ex. 토큰 여부)
- `staleTime`: fresh에서 stale로 변하는 시간 지정
- `gcTime`: 캐시가 메모리에서 제거되기 전 유지 시간 지정
- `retry`: 실패 시 재시도의 횟수/조건 지정
- `select`: 서버 응답에서 필요한 데이터만 뽑아서 사용

## `useMutation`

> 쓰기 전용(POST, PUT, DELETE) 훅

- 자동으로 캐시 반영을 하지 않는다.
- 성공 후 직접 `invalidateQueries` 혹은 `setQueryData` 호출이 필요하다

```jsx
const login = useMutation({
  mutationFn: (payload) => auth.login(payload),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['me'] });
    navigate('/mypage');
  },
  onError: (err) => alert('로그인 실패: ' + err.message),
});
```

### 반환값

- `mutate`, `mutateAsync` : 실행 함수.
- 상태 값은 `isPending`, `isSuccess`, `isError`, `data`, `error`

### 옵션

- `mutationFn`: 실제 API 요청 함수
- `onMutate`: 요청 직전 실행(낙관적 업데이트)
- `onSuccess`: 성공 시 실행
- `onError`: 실패 시 실행
- `onsettled`: 성공/실패 상관없이 실행한다.
