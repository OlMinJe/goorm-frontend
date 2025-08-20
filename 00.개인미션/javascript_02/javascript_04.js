// 5에서 멈추기
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    console.log('멈춰!');
    break;
  }
  console.log(i);
}

// 짝수 출력
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  console.log(i);
}

// 짝수 출력, 단 12에서 멈춤
for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  if (i === 12) {
    console.log('12에서 반복 종료!');
    break;
  }
  console.log(i);
}
