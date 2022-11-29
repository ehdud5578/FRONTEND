# lint 오류

## no-prototype-builtins

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

### 직접호출하는것이 위험한 이유

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
