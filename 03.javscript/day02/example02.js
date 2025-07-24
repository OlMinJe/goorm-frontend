// // 1️⃣ 실습 1번
const person = { name: '민제' };

// person = { name: '수정됨' }; // x 상수에 전체 객제 재할당으로 에러 발생
person.name = '수정됨'; // o 속성 수정 가능
person.age = 20; // o 속성 추가 가능
delete person.name; // o 속성 삭제도 가능

// // 2️⃣ let, const 변수로 자기소개 출력
const name = '민제';
let age = 26;
let job = '프론트엔드 개발자';
const selfIntroductionText = `안녕하세요. 제 이름은 ${name}이고, 나이는 ${age}살이며, 직업은 ${job}입니다.`;
// console.log(selfIntroductionText);

// // 3️⃣ typeof 사용하기
console.log(typeof 'Hello'); // string
console.log(typeof 123); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object(버그))
console.log(typeof Symbol()); // symbol
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof function () {}); // function

// 4️⃣ 자기소개 화면에 출력하기
const selfIntroduction = document.getElementById('self-introduce');
selfIntroduction.innerHTML = selfIntroductionText;
