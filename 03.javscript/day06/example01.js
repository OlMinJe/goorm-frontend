function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log('안녕! 나는 ', this.name, '이고 ', this.age + '살이야.');
};

const person1 = new Person('좀비', 18);
const person2 = new Person('딸', 20);

person1.sayHello();
person2.sayHello();

// 객체 인스턴스와 프로토타입 간에 연결이 구성되며 이 연결을 따라 프로토타입 체인을 타고 올라가며 속성과 메소드를 탐색한다.
console.log(person1.__proto__ == Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ == null); // true

// 실습 2
const animal = {
  meow: function () {
    console.log('야옹~');
  },
};

const cat = {
  name: '야옹이',
};

// 프로토타입 연결
cat.__proto__ = animal;
cat.meow();

// ECMAScript 2015 이후 프로퍼티를 브라우저와의 호환성 때문에 표준회됨
// - 읽기 및 디버깅 용도로 사용은 가능하지만 직접 조작은 비권장
// - 프로토타입을 다룰 때는 Object.getPrototypeOf(), Object.setPrototypeOf() 메소드를 쓰는 것이 현재 표준이자 권좐되는 방식
