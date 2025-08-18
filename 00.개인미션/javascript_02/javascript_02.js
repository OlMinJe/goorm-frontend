console.clear();
console.log('=== (JS) 조건문·반복문 데모 시작 ===');

// 1) if–else: 점수 → 등급
function toGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

// 2) switch: 등급 → 메시지
function gradeBadge(grade) {
  switch (grade) {
    case 'A':
      return '매우 우수';
    case 'B':
      return '우수';
    case 'C':
      return '보통';
    case 'D':
      return '노력 필요';
    default:
      return '재도전';
  }
}

// 3) for: 성적 배열 처리 + 평균
const scores = [92, 81, 68, 45, 100];
let sum = 0;
const report = [];
for (let i = 0; i < scores.length; i++) {
  const s = scores[i];
  const g = toGrade(s);
  report.push({ idx: i + 1, score: s, grade: g, badge: gradeBadge(g) });
  sum += s;
}
const avg = sum / scores.length;
console.table(report);
console.log('평균 점수:', avg.toFixed(1));

// 4) while: 평균이 70 미만이면 5점씩 보강*가 있다고 가정하고 반복
let bonus = 0;
let tempAvg = avg;
while (tempAvg < 70) {
  bonus += 5; // 보강으로 총합이 올라간다고 가정
  tempAvg = Math.min(100, avg + bonus);
}
console.log(`보강 합계 +${bonus}점 → 새로운 평균:`, tempAvg.toFixed(1));

// (옵션) break/continue 예시: 1~30 중 3의 배수만, 21에서 중단
for (let n = 1; n <= 30; n++) {
  if (n % 3 !== 0) continue;
  console.log('3의 배수:', n);
  if (n === 21) break;
}

// (옵션) do..while: 최소 1회 실행
let count = 3;
do {
  console.log('카운트다운:', count--);
} while (count > 0);

console.log('✅ 데모 끝');
