# 📘 State Hooks

## `useState`

- 가장 단순한 로컬 state.

## `useReducer`

업데이트 로직이 복잡하거나 여러 하위 값이 얽혀 있을 때 `reducer`로 관리.
이 둘이 “컴포넌트가 정보를 기억”하도록 해 주는 기본 축!

# 📘 Context Hooks

## `useContext`

부모→자식으로 깊게 내려가도 `props` 없이 바로 값 읽기(테마, 현재 사용자 등).

# 📘 Ref Hooks

## `useRef`

DOM 노드, 타이머 ID 등 “렌더링에 안 쓰는 값”을 보관(값을 바꿔도 리렌더링 안 됨).

## `useImperativeHandle`

forwardRef 컴포넌트가 바깥에 노출하는 ref의 모양을 커스터마이즈(드물게 사용).

# 📘 Effect Hooks

## `useEffect`

“외부 시스템(네트워크, DOM, 애니메이션, 다른 UI 라이브러리 등)”과 연결·동기화.

### 1. `useLayoutEffect`

브라우저가 그리기 전에 실행(레이아웃 계산 등).

### 2. `useInsertionEffect`

React가 DOM을 바꾸기 전에 실행(CSS-in-JS가 동적 CSS 삽입할 때).
※ 애플리케이션의 데이터 흐름을 조정하려고 Effect를 남발하지 말 것(정말 ‘외부’와 맞물릴 때만).

# 📘 Performance Hooks

## `useMemo`

비싼 계산 결과 캐시.

## `useCallback`

콜백 참조를 캐시(메모이즈된 자식에게 넘길 때).

## `useTransition`

특정 state 전환을 “덜 급한” 작업으로 표시(UX 끊김 줄이기).

## `useDeferredValue`

중요하지 않은 값 업데이트를 살짝 뒤로 미룸.

# 📘 Other Hooks (상황별 유틸)

## `useId`

접근성 속성 등에 쓰는, 환경 독립적인 안정적 ID 생성.

## `useDebugValue`

커스텀 훅이 React DevTools에 보여줄 라벨 커스터마이즈.

## `useSyncExternalStore`

외부 스토어(예: 상태 관리 라이브러리)의 구독을 안전하게 연결.

## `useActionState`

“폼 액션”의 결과로 `state`를 관리하고, 대기 중 여부 `isPending`도 함께 받기.

## `useOptimistic`

네트워크 작업이 끝나기 전, “먼저 보이는” 낙관적 상태를 만들어 즉각적인 UI 반응 제공.
