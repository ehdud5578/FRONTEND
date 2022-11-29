# JavaScript

JavaScript는 인터프리터언어 이고, 일급 함수를 지원한다. 또한 JavaScript는 프로토타입 기반, 다중 패러다임, 단일 스레드, 동적 언어로, 객체지향형, 명령형, 선언형(함수형 프로그래밍 등) 스타일을 지원합니다.

- 인터프리터 언어란 ? 소스코드를 한 줄 한 줄 읽어가며 명령을 바로 처리하는 프로그램 언어이다.
- 일급함수란? 함수를 다른 변수와 동일하게 다루는 언어는 일급 함수를 가졌다고 표현합니다.

```Javascript
(function(){}).constructor === Function // true
// 자바스크립트의 함수는 객체이다.
```

- [Call By Value vs Call By Reference](./CallByValue.md)
- [Closure](./Closure.md)
- [Data Type And Data Structure](./DataTypeAndDataStructures.md)
- [Execution Context](./ExecutionContext.md)
- [Hoisting (작성중)](./Hoisting.md)
- [prototype](./prototype.md)
  <!-- - [this](./this.md) -->

## lint 오류

### no-prototype-builtins

Object.prototype 의 builtin으로 제공되는 메서드를 객체에서 직접 호출하지 않도록 하는 규칙

```javascript
const obj = {
  name: "john",
};
// 직접 호출하는방식
obj.hasOwnProperty("name"); // true
// Object.prototype 을 이용해서 호출
Object.prototype.hasOwnProperty.call(obj, "name");
```

#### 직접호출하는것이 위험한 이유

1. `Object.create(null)`
   만약 `Object.create()`을 호출할때 null 인자를 사용하면 Object.prototype 을 상속받지 않는다.

2. 속성이 빌트인 메서드를 가리는 경우

```javascript
const obj = {
  name: "john",
  hasOwnProperty: true,
};
```

위와 같은 경우 Object.prototype 의 상속받은 메서드가 호출되는것이 아닌 속성이 호출된다.

이런 이유로 no-prototype-builtins 규칙은 builtin 메서드 사용시 Object.prototype을 활용하도록 권장한다.
