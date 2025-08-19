# Responsive design

## 들어가기 전 필수 개념

1. `head` 태그 내에 `viewport`를 추가해야 한다.

   ```jsx
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

2. 모바일 우선으로 작업

   접두사가 없는 유틸리티는 모든 화면에 적용되며, `md` 같은 접두사를 붙이면 그 이상(`min-width`) 화면에서만 적용되는 특징을 가지고 있다

   ```html
   <img class="w-16 md:w-32 lg:w-48" src="..." />
   ```

## 기본 브레이크 포인트

`min-width`를 예시로 하면,

| **중단점 접두사** | 최소 너비            |
| ----------------- | -------------------- |
| `sm`              | ≥ **40rem** (640px)  |
| `md`              | ≥ **48rem** (768px)  |
| `lg`              | ≥ **64rem** (1024px) |
| `xl`              | ≥ **80rem** (1280px) |
| `2xl`             | ≥ **96rem** (1536px) |

이때. 모바일을 우선으로 작업하기 때문에 `md`는 768px 이상에서만 덮어씌운다.

## 범위 지정하는 방법

1. 구간 한정
   1. `md:max-xl:flex` 처럼 **`max-*` 변형**을 합쳐 “`md` 이상이면서 `xl` 미만” 같은 구간만 타깃 가능하다.
   2. 이때, 사용 가능한 변형은 `max-sm`, `max-md`, `max-lg`, `max-xl`, `max-2xl`
2. 단일 브리에크 포인트
   1. `md:max-lg:...`(오직 `md` 구간을 의미한다.)

## 사용자 지정 테마

테마 변수(`@theme`)를 사용하여 중단점을 지정할 수 있다.

```css
@import 'tailwindcss';
@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

- `xs:`나 수정된 `2xl:` 접두사를 그대로 사용 가능. 이때 **단위는 일관되게**(기본은 `rem`) 쓰는 게 중요하다.
- 필요 없다면 `--breakpoint-2xl: initial;`로 기본값 제거 후, 전체 초기화 후 전부 재정의도 할 수 있다.
- 또한 임의의 값 사용을 지원한다.
  ```html
  <div class="max-[600px]:bg-sky-300 min-[320px]:text-center">
    <!-- ... -->
  </div>
  ```
  일회성으로 중단점을 수정해야 하는 경우에 사용한다.

## 컨테이너 쿼리

전체 뷰포트 크기가 아닌 부모 요소의 크기를 기준으로 스타일을 지정할 수 있다.

1. 부모에 `@container` 클래스를 주고, 자식에 `@sm`, `@md` 같은 변형을 사용한다.

   ```html
   <div class="@container"><div class="flex flex-col @md:flex-row">…</div></div>
   ```

2. 최대 너비 컨테이너 쿼리와 컨테이너 쿼리 범위

   `@max-sm`, `@sm:@max-md` 처럼 구간/최대치도 가능하다! 컴포넌트 단위별 반응형에 유용할지도!

   ```html
   <div class="@container">
     <div class="flex flex-row @max-md:flex-col">
       <!-- ... -->
     </div>
   </div>
   ```

3. 명명된 컨테이너

   복잡한 디자인의 경우, 컨터이너 이름을 지정하고 특정 컨테이너를 대상으로 스타일을 지정할 수 있다.

   ```html
   <div class="@container/main">
     <!-- ... -->
     <div class="flex flex-row @sm/main:flex-col">
       <!-- ... -->
     </div>
   </div>
   ```

   `@container/{name}`을 사용하여 `@sm/{name}`, `@md/{name}`을 지정한다.

   이를 통해 부모가 아니어도 조상을 기준으로도 스타일을 지정할 수 있다는 사실!

4. 사용자 정의 컨테이너 크기 사용

   테마 변수를 사용하여  `--container-*`컨테이너 크기를 정의할 수 있다.

   ```css
   @import 'tailwindcss';
   @theme {
     --container-8xl: 96rem;
   }
   ```

   `8xl` 로 마크업에서 사용할 수 있는 새로운 컨테이너 쿼리 변형이 추가된다!

   ```html
   <div class="@container">
     <div class="flex flex-col @8xl:flex-row">
       <!-- ... -->
     </div>
   </div>
   ```

5. 컨테이너 쿼리에서 **임의의 값** 사용

   테마에 새 사이즈를 추가하지 않고 **일회성 컨테이너 쿼리 크기**를 쓰고 싶을 때는 `@min-[…]`, `@max-[…]` 변형을 사용한다.

   ```html
   <div class="@container">
     <!-- 컨테이너 너비가 475px 이상이면 flex-row로 전환 -->
     <div class="flex flex-col @min-[475px]:flex-row">
       <!-- ... -->
     </div>
   </div>
   ```

6. 컨테이너 쿼리 단위 사용

   컨테이너 기준 길이 단위를 임의 값에서 쓸 수 있다. 자주 사용하는 건 `cqw`container query width, 컨테이너 너비의 1%)

   ```html
   <div class="@container">
     <!-- 자식의 너비를 "컨테이너 너비의 50%"로 지정 -->
     <div class="w-[50cqw]">
       <!-- ... -->
     </div>
   </div>
   ```
