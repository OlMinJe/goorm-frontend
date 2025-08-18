console.clear();
console.log('=== (JS) 변수·타입·연산자 데모 ===');

// 1) 변수 선언
let count = 10; // 재할당 O
const PI = 3.14; // 재할당 X (값 고정)
var legacy = 'var'; // 함수 스코프 예시용(권장X)

// 2) 타입 확인
const samples = [count, PI, legacy, true, null, undefined, { x: 1 }, [1, 2, 3], () => {}, 123n, Symbol('id'), new Date()];
samples.forEach((v) => {
  console.log(v, '→ typeof:', typeof v, ', Array?', Array.isArray(v));
});
console.log('typeof null ==', typeof null, '(주의: 역사적 이유로 "object")');

// 3) 산술/대입 연산자
console.log('산술: + - * / % ** →', count + 3, count - 3, count * 2, count / 4, count % 3, 2 ** 3);
count += 5; // 복합 대입
console.log('count += 5 →', count);

// 4) 비교/동등
console.log('"5" == 5 →', '5' == 5, ' / "5" === 5 →', '5' === 5);

// 5) 논리 연산자 (||, &&, ??)
console.log('0 || "fallback" →', 0 || 'fallback'); // falsy면 오른쪽
console.log('"hi" && 123 →', 'hi' && 123); // 앞이 truthy면 오른쪽
console.log('0 ?? "N/A" →', 0 ?? 'N/A'); // null/undefined만 대체

// 6) 삼항/템플릿 문자열
const score = 85;
console.log(`템플릿: 점수 ${score} → ${score >= 60 ? '합격' : '불합격'}`);

// 7) 선택적 체이닝
const user = { profile: { email: 'me@test.com' } };
console.log('user.profile?.email →', user.profile?.email);
console.log('user.address?.city ?? "없음" →', user.address?.city ?? '없음');

// 8) 증감/우선순위
let i = 0;
console.log('i++ →', i++, '(after:', i, ')');
console.log('++i →', ++i);

// 9) 비트 연산자
console.log('5 & 3, 5 | 3, 5 ^ 3, ~5 →', 5 & 3, 5 | 3, 5 ^ 3, ~5);

// 10) 타입 변환/NaN
console.log('Number("12.3") →', Number('12.3'));
console.log('parseInt("12px",10) →', parseInt('12px', 10));
console.log('Boolean("") →', Boolean(''));
console.log('Number("abc") →', Number('abc'), ' / isNaN(Number("abc")) →', isNaN(Number('abc')));

// 11) truthy/falsy 빠르게 보기
['', 0, NaN, null, undefined, false, 'text', 1].forEach((v) => console.log(String(v).padEnd(9), '→', !!v));

console.log('✅ 데모 끝');
