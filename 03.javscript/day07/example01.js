// const animal = {
//   eats: true,
//   walk() {
//     console.log('걷는다');
//   },
// };

// const rabbit = Object.create(animal);
// rabbit.jumps = true;

// console.log(rabbit.eats); // true(animal로 부터 상속)
// rabbit.walk(); // 걷는다
// console.log(rabbit.jumps); // true

class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log("Hi, I'm ", this.name);
  }
}

const user = new User();
user.name = 'minje';
user.sayHi();

console.log('==========');

class Animal {
  constructor(eats) {
    this.eats = eats;
  }

  walk() {
    console.log('걷는다');
  }
}

class Rabbit extends Animal {
  constructor() {
    super();
    this.jumps = true;
  }
}

const rabbit = new Rabbit();
rabbit.eats = false;

console.log(rabbit.eats); // true(animal로 부터 상속)
rabbit.walk(); // 걷는다
console.log(rabbit.jumps); // true

console.log('==================================================');

class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name.toUpperCase();
  }

  set name(value) {
    if (value.length < 2) throw new Error('이름은 두 글자 이상이어야 합니다.');
    this._name = value;
  }
}

const person1 = new Person('minje');
console.log(person1.name);
person1.name = 'leeminje';
console.log(person1.name);

console.log('==================================================');

class Product {
  static count = 0;
  #secretCode = 'xyz'; // private 필드(외부 접근 불가)

  constructor(name, price) {
    this.name = name; // 인스턴스 프로퍼티
    this.price = price;
    Product.count++; // 클래스 변수 증가
  }

  get priceWithTax() {
    return this.price * 1.1;
  }

  set priceWithTax(value) {
    this.price = value / 1.1;
  }

  show() {
    console.log(`${this.name}: ${this.price}`);
    // console.log('시크릿쥬쥬', this.#secretCode);
  }

  static total() {
    return Product.count;
  }
}

const p1 = new Product('노트북', 1000000);
const p2 = new Product('모니터', 200000);

p1.show();
p2.show();

console.log(p1.priceWithTax);
console.log(p2.priceWithTax);

p2.priceWithTax = 550000;
console.log(p2.price);

console.log(p1.secretCode);

console.log(Product.total());
console.log(Product.count);

p1.show();
p2.show();
