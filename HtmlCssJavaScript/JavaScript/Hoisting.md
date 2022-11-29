# JavaScript Hoisting

Hoisting 이란? 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미한다.

1. `var` 로 선언시 `undefined` 로 변수를 초기화
2. `let` 과 `const` 호이스팅하되, 변수를 초기화하지 않는다.

[호이스팅 - 용어 사전 | MDN](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)

## 호이스팅이 발생하는 이유

`JavaScript` 엔진에서 변수를 생성할때 어떤일이 일어지는지를 알면 이해하기 쉽다.

먼저 `JavaScript` 에서 변수는 1.선언 2.초기화 3.할당 순서로 이루어진다.

- 선언 : 변수를 실행 컨텍스트(실행 코드에 제공할 정보 객체)의 변수 객체에 등록한다.
- 초기화 : 변수 객체에 등록된 변수를 위한 메모리 공간을 확보한다.(이 때, `undefined` 로 변수를 초기화)
- 할당 : 사용자가 정의한 값을 변수에 할당한다.

자바 스크립트 엔진은 코드를 실행하기 전에 실행 컨텍스트에 등록된 변수 객체에 접근 할 수 있다.

## 선언만 호이스팅의 대상

JavaScript 는 초기화를 제외한 선언만 호이스팅을 합니다. (`var`만 선언시 `undefined`)

```javascript
console.log(num); // 호이스팅한 var 선언으로 인해 undefined 출력
var num; // 선언
num = 6; // 초기화
```

다음의 예시 처럼 선언하지 않고 초기화만 할때는, 호이스팅을 하지 않음.

```javascript
console.log(num); // ReferenceError
num = 6; // 초기화
```

### Let 과 Const

let과 const는 undefined 로 초기화하지 않습니다.
변수 스코프의 맨 위에서 변수의 초기화 완료 시점까지의 변수는 "시간상 사각지대"(Temporal Dead Zone, TDZ)에 들어간 변수라고 표현합니다.

```javascript
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2;
}
```
