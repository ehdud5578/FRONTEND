# JavaScript data types and data structures

### 동적 타입

- JavaScript는 느슨한 타입(loosely typed)의 동적(dynamic) 언어.
- JavaScript의 변수는 어떤 특정 타입과 연결되지 않으며, 모든 타입의 값으로 할당 (및 재할당)이 가능

## javaScript의 Type

자바스크립트의 타입은 원시값(primitive) 과 객체(object)로 나뉜다.

### 원시 값(primitive values)

- Boolean type : `true` or `false`
- Null type : `null`
- Undefined type : `undefined`
- Number type : -(2^53 − 1)부터 2^53 − 1, `+Infinity`, `-Infinity`, `NaN`("Not a Number")
- BigInt type
  - 임의 정밀도로 정수를 나타낼 수 있는 JavaScript.
  - 숫자 원시 값 BigInt는 정수 끝에 n을 추가하거나 생성자를 호출해 생성
- String type: `string`
- Symbol type

#### Number 조심해야할것

> 0.1 + 0.2 == 0.3 // 0.5 false

- 소숫점 계산이 필요할 경우 유의해야함.

#### isNaN 사용시 주의 사항

```javascript
isNaN("foo"); // true
isNaN(undefined); // true
isNaN({}); // true
isNaN({ valueOf: "foo" }); // true
isNaN(new Date()); // 거짓
isNaN(new Date().toString()); // 참
```

ECMAScript 2015(ES6)에서 추가된 `Number.isNaN()` 을 사용할것.

```javascript
// all false
Number.isNaN("foo");
Number.isNaN(undefined);
Number.isNaN({});
Number.isNaN({ valueOf: "foo" });
Number.isNaN(new Date());
Number.isNaN(new Date().toString());
```

### 객체()

- 위에 나온 것들을 제외한 모든것.

### Left-Associative

좌측 결합성, 왼쪽의 항목부터 연산이 이루어짐

# Primitive values 형변환

- Javascript 에서는 `String`, `Number`, `Boolean` 세 가지의 타입으로 변환함.

### 명시적 형변환(Explicit Coercion)

- 타입의 변환을 명시적으로 적어준 것
- `String()` `Number()`, `Boolean()`

## 암시적 형변환(Implicit Coercion)

### String conversion

- `+`연산자를 사용할 때, 앞뒤에 string 이 있을 경우

```javascript
2 + "2" + 2; // 222
2 + 2 + "2"; // 42
```

### Boolean conversion

- 논리 연산자 : `&&`, `||`, `!`

### Number conversion

- 비교 연산자 : `>`, `<`, `<=`, `>=`, `!=` , `==`
- 비트 연산자 : `|` , `&` , `^` , `~`
- 산술 연산자 : `-` , `+` , `*` , `/` , `%`
- 단항 연산자 : `+`

### 기타 예외

```javascript
Number(" "); // 0
Number(null); // 0
Number(undefined); // NaN
NaN == NaN; // false
Infinity > 1 == -Infinity < 1; // Infinity, -Infinity, NaN 은 비트연산에서 0
// null 과  undefined 는 == 연산에서 Number Conversion 이 일어나지 않음.
null == undefined; // false
null > 0; // false
null < 0; // false
null == 0; // false
null >= 0; // true
```

# 오브젝트의 형변환

1. primitive type 의 경우 바로 리턴
2. Object.prototype.toString()이 primitive type 이면 리턴
3. Object.prototype.valueOf()이 primitive type 이면 리턴
4. 둘다 아니면 타입에러

### example

```javascript
(true + false[(2, 3, 5)] == [2, 3, 5][(2, 3, 5)]) == "2,3,5";
"hello" > 3;
"hello" < 3;
"-1" > "+1";
"-1" > +1;
"foo" + +"bar";
new Date(0) + 0;
new Date(0) - 0;
!!"false" == !!"true";
```

### 참고 자료

- [참고 페이지](https://www.secmem.org/blog/2020/03/19/javascript-type-coercion/)
- [JavaScript Equality Table](https://dorey.github.io/JavaScript-Equality-Table/)
