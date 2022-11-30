# this

대부분의 `this`는 함수를 호출한 방법에 의해 결정됩니다.

실행 컨텍스트(global, function 또는 eval)의 프로퍼티는 비엄격 모드에서 항상 객체를 참조하며, 엄격 모드에서는 어떠한 값이든 될 수 있습니다.

## 전역 문맥

전역 실행 맥락에서 `this`는 엄격 모드 여부에 관계없이 전역 객체를 참조합니다.

```javascript
consoloe.log(this === window); // true

this.b = "text";
console.log(window.b); // "text"
console.log(b); // "text"
```

## 함수 문맥

함수 내부에서 `this`의 값은 함수를 호출한 방법에 의해 좌우됩니다.

```javascript
var obj = {
  method: function () {
    console.log(`this is ${this === obj}`);
  },
};

obj.method(); // this is true
```

## `call`, `apply`

`call()`, `apply()` 메소드는 주어진 this 값 및 각각 전달된 인수와 함께 함수를 호출합니다.

### 구문

> func.call(thisObj, arg1, arg2, ...)
> func.apply(thisObj, [arg1, arg2, ...])
> 둘의 차이점은 apply 에서는 arguments 를 리스트로 넣어주느것을 제외하고는 동일하다.

## `bind`

`function.bind(Object)`를 호출하면 새 함수의 `this`는 호출 방식과 상관없이 영구적으로 `bind()`의 첫 번째 매개변수로 고정됩니다.

```javascript
function f() {
  return this.a;
}

var g = f.bind({ a: "azerty" });
console.log(g()); // azerty

var h = g.bind({ a: "yoo" }); // bind는 한 번만 동작함!
console.log(h()); // azerty

var o = { a: 37, f: f, g: g, h: h };
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
```

## arrow function

화살표 함수에서 `this`는 자신을 감싼 정적 범위입니다. 전역 코드에서는 전역객체를 가리킵니다.

## 객체의 메소드

함수를 어떤 객체의 메소드로 호출하면 `this`의 값은 그 객체를 사용합니다.

```javascript
const obj = {
  name: "DoYoung",
  method: function () {
    console.log(`my name is ${this.name}`);
  },
};
obj.method(); // my name is DoYoung
// 함수의 메서드로 사용되어 this 는 obj 객체를 가리킨다.
```

## 객체의 프로토타입 체인에서의 `this`

객체의 프로토타입 체인 어딘가에 정의한 메서드도 `this`의 값은 그 객체가 메서드를 가진 것 처럼 설정됩니다.

```javascript
// 위의 예제에서 이어짐.
obj.toString(); // [object Object]
```

## 생성자

함수를 `new`키워드를 통해 생성자로 사용하면 `this`는 새로 생긴 객체에 묶입니다.

```javascript
function Pet(name, type) {
  this.name = name;
  this.type = type;
}
```
