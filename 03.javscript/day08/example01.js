const person = {
  name: '민제',
  age: 18,
};

console.log(person.toString());
console.log(person.hasOwnProperty('name'));

// Object.prototype 자체를 아예 안 가지는 객체를 만들 수도 있다.(Object.create)
Object.create(null);

const pure = Object.create(null);

console.log(pure.toString); // undefined
console.log(pure instanceof Object); // false

// lodash 같은 라이브러리를 일반 객체 생성으로 만든다면?
const _ = require('lodash'); // Lodash 사용

const userInput = {
  __proto__: {
    hacked: true,
  },
};

const innocent = {};
_.merge(innocent, userInput);

// 이제 모든 객체에 hacked가 생김
console.log({}.hacked); // true

// 객체의 부모를 동적으로 바꿒 수도 있다(Object.setPrototypeOf)
