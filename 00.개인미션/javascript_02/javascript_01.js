// 1) 기본 함수 + 반환
function add(a = 0, b = 0) {
  return a + b;
}
console.log('1) add(3,4) =', add(3, 4));

// 2) 화살표 함수
const greet = (name = '익명') => `안녕하세요, ${name}!`;
console.log('2) greet("총명") =', greet('총명'));

// 3) 나머지 매개변수
function sum(...nums) {
  return nums.reduce((a, n) => a + n, 0);
}
console.log('3) sum(1,2,3,4) =', sum(1, 2, 3, 4));

// 4) 배열 매개변수 + 기본값
function average(arr = []) {
  return Array.isArray(arr) && arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}
console.log('4) average([10,20,30]) =', average([10, 20, 30]));

// 5) 문자열 전처리(체이닝)
const toSlug = (s = '') => String(s).trim().toLowerCase().replace(/\s+/g, '-');
console.log('5) toSlug("  Hello JS Functions  ") =', toSlug('  Hello JS Functions  '));

// 6) 구조분해 + 기본값
function formatUser({ name, role = 'member', age } = {}) {
  return `${name ?? '누군가'} (${role}${age ? ', ' + age + '세' : ''})`;
}
console.log('6) formatUser({name:"민제", role:"admin", age:27}) =', formatUser({ name: '민제', role: 'admin', age: 27 }));
console.log('   formatUser({name:"원형"}) =', formatUser({ name: '원형' }));

// 7) 고차함수(클로저)
const makeMultiplier =
  (factor = 1) =>
  (n) =>
    n * factor;
const double = makeMultiplier(2);
console.log('7) makeMultiplier(2)(7) =', double(7));

// 8) 콜백 인자
function applyAndFormat(x, fn) {
  return `결과: ${fn(x)}`;
}
console.log(
  '8) applyAndFormat(5, n => n ** 2) =',
  applyAndFormat(5, (n) => n ** 2)
);

// 9) 재귀
function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) throw new Error('자연수만');
  return n <= 1 ? 1 : n * factorial(n - 1);
}
console.log('9) factorial(5) =', factorial(5));

// 10) Set으로 태그 병합(중복 제거)
function mergeTags(...lists) {
  const flat = lists
    .flat()
    .map((t) => String(t).trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set(flat));
}
console.log('10) mergeTags(["js","알고리즘"],["JS","알고리즘","함수"]) =', mergeTags(['js', '알고리즘'], ['JS', '알고리즘', '함수']));

// 11) 간단 URL 검사
function isUrl(url = '') {
  return /^https?:\/\//.test(url);
}
console.log('11) isUrl("https://example.com") =', isUrl('https://example.com'));
console.log('    isUrl("ftp://example.com") =', isUrl('ftp://example.com'));

// 12) 커링
const curryAdd3 = (a) => (b) => (c) => a + b + c;
console.log('12) curryAdd3(1)(2)(3) =', curryAdd3(1)(2)(3));
