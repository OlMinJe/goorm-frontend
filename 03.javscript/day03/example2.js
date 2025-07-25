console.log('1. 커피 주문');
// blockFor5Seconds(); //  커피 만드는 동안 멈춰있음
console.log('2. 커피 받음');
console.log('3. 커피 결제');

// 비동기
console.log('1. 커피 주문');
setTimeout(() => console.log('2. 커피 다 했어요!(진동벨 울림)'), 5000);
console.log('3. 커피 결제');

// 콜백 함수
function makeCoffee(callback) {
  console.log('1. 커피 주문 완료(제조 중...)');

  setTimeout(() => {
    console.log('2. 커피 완료!');
    callback();
  }, 3000);
}

makeCoffee(() => console.log('3. 커피 받으러 갑니다!ㄴ'));

// promise
function makeCoffeePromise() {
  return new Promise((resolve) => {
    console.log('1. 커피 주문 완료(제조 중...');
    setTimeout(() => {
      console.log('2. 커피 완료!');
      resolve();
    }, 3000);
  });
}

makeCoffeePromise().then(() => console.log('3. 커피 받으러 갑니다!'));

// async, await
function makeCoffeeNew() {
  return new Promise((resolve) => {
    console.log('1. 커피 주문 완료(제조 중...)');
    setTimeout(() => {
      console.log('2. 커피 완료!');
      resolve();
    }, 3000);
  });
}

async function receiveCoffee() {
  await makeCoffee();
  console.log('3. 커피 받으러 갑니다!');
}
