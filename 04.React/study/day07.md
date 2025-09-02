# 📘 학습 일지: React + MongoDB + React Query

## 프로젝트 구조화

### 1. 환경 변수(.env) 사용

API 서버 주소를 .env 파일에 저장해서 코드에 직접 안 적어도 되도록 함.

```bash
VITE_API_URL=http://localhost:4000
```

### 2. Vite 개발 서버 프록시 설정

- 프론트가 `/api`로 요청을 보내면, Vite가 알아서 백엔드 서버(`http://localhost:4000`) 로 대신 전달해줌.
- 덕분에 개발할 때 서버 주소를 일일이 안 바꿔도 됨.

```js
// vite.config.js
// ...
 server: {
  proxy: {
   '/api': {
     target: 'http://localhost:4000/', // goorm-server
     changeOrigin: true,
     rewrite: (p) => p.replace(/^\/api/, ''),
    },
   },
  },
})
```

### 3. 폴더 단위로 파일 나누기

- `http.js`: Axios 설정 모아두는 파일
- `queryClient.js`: React Query 설정 모아두는 파일

👉 이렇게 나누면 코드가 깔끔하고, 필요할 때 재사용하기 쉬움!

## HTTP 통신 정리 (Axios + React Query)

### 1. Axios 기본 세팅(`http.js`)

- 기본 주소, 헤더, 타임아웃 같은 공통 설정을 한 번만 지정.
- 요청/응답 인터셉터를 활용해 토큰 자동 주입, 에러 시 로그인 페이지 이동 등을 처리.

```jsx
import axios from 'axios';
import { token } from '@/api/token';

const BASE_API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : '/api';

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 로그인 시도 실패, 토큰 정보 삭제
    console.error(error);
    token.clear();
    window.location.href = '/login';
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const t = token.get() || localStorage.getItem('accessToken') || '';

  if (config.auth !== false && t) {
    config.headers.Authorization = `Bearer ${t}`;
  }

  return config;
});
```

👉 이렇게 하면, 매번 토큰 붙이는 번거로움이 사라지고, 인증 로직이 중앙화됨.

### 2. React Query 세팅(`queryClient.js`)

- 캐싱, 새로고침, 재시도 같은 정책을 전역에서 통일.
- `QueryClientProvider`로 감싸 앱 전체에서 사용 가능.

```jsx
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 1분 동안은 데이터 새로 안 가져옴
      gcTime: 5 * 60_000, // 5분 지나면 캐시 삭제
      retry: (failCount, err) => (err?.status === 401 ? 0 : failCount < 2),
      refetchOnWindowFocus: true, // 창 다시 클릭하면 데이터 새로고침
      refetchOnReconnect: true, // 인터넷 끊겼다 다시 켜지면 새로고침
    },
    mutations: { retry: 0 },
  },
});
```

## API 호출 예시

Axios 인스턴스를 이용한 API 함수 만들기

```jsx
import { api } from '@/api/http';
import { token } from '@/api/token';

export const auth = {
  // 받아올 거 없어서 비동기 처리 x
  register: (payload) => {
    const response = api.post('/auth/register', payload, { auth: false });
    return response;
  },
  login: async (payload) => {
    const response = await api.post('/auth/login', payload, { auth: false });
    token.set(response.data.token);
    return response;
  },
  logout: async () => {
    try {
      await api.post('/auth/logout', {}, { auth: true });
    } finally {
      token.clear();
    }
  },
};
```

👉 이렇게 모아두면 컴포넌트 단에서는 auth.login() 같은 함수만 호출하면 됨.

## React Query 사용 패턴

### 쿼리 (데이터 가져오기)

```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ['me'],
  queryFn: getMe,
});
```

👉 useQuery로 조회,

### 뮤테이션 (데이터 변경)

```jsx
const mutation = useMutation({
  mutationFn: updateNickname,
  onSuccess: () => {
    // 성공하면 캐시 무효화 → 새로 패치
    queryClient.invalidateQueries(['me']);
  },
});
```

👉 useMutation으로 변경을 처리하고, 성공 시 캐시를 무효화해 데이터가 자동으로 최신화됨.

# 💡 느낀 점

- 환경 변수, 프록시, Axios, React Query가 돌아가는 구조를 직접 이해할 수 있었다.
- Axios 인터셉터를 써서 토큰을 자동으로 관리하여, 로그인 여부에 따른 흐름을 중앙에서 제어할 수 있어 편리했다.
- React Query의 캐싱 정책(staleTime, gcTime)과 자동 새로고침 옵션을 조정하면서, 단순한 데이터 패칭이 아니라 사용자 경험(UX)을 고려한 데이터 관리라는 점을 깨달았다.
- API 함수를 모듈로 나눠 관리하니 코드가 한눈에 정리돼서, 확장성과 유지보수성이 좋다는 걸 꺠달았다.
