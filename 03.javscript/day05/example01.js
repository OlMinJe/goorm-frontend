let globalVar = '전역';

function example() {
  let localVar = '지역';
  console.log(globalVar); // 접근 가능
  console.log(localVar); // 접근 가능
}

console.log(globalVar); // 접근 가능
// console.log(localVar); // 접근 불가 - 오류(스코프 밖)

// ========== this로 prototype 정의하여 상속하기 ==========
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`안녕, 나는 ${this.name}`);
};

const p1 = new Person('민제');
p1.sayHi(); // 안녕, 나는 민제
console.log(p1.name); // 민제

// ========== 클로저 ==========
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
// counter().count; // Uncaught TypeError TypeError: Cannot read property 'count' of undefined
