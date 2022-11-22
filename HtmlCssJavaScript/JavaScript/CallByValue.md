# JavaScript Call by value VS Call by reference

함수를 호출할 때 호출된 함수에 인자(argument)를 전달하는 방식에는 몇가지 방식이 있지만 다음과 같이 대표적인 두가지방식을 소개한다. 또한 JavaScript 에서 Call by value 방식이지만, 왜 call by reference 처럼 동작하는지에 대해 알아본다.

# 함수를 호출하는 방법

- Call by value (값에 의한 호출)

  값에 의한 호출(Call by value)은 함수가 호출될 때 메모리 공간 안에 임시의 공간이 만들어지고 함수를 호출시 전달되는 변수가 메모리 공간에 값이 복사되어 전달된다.

- call bt reference(참조에 의한 호출)

  참조에 의한 호출은 함수가 호출 될 때 함수를 호출시 전달되는 변수의 주소값을 참조한다.

Java 와 JavaScript 둘다 Call by value 로 동작하지만 객체(Object)에 대해서 Call by reference 처럼 동작하게 되는데 왜 이렇게 동작하는지는 JavaScript 의 원시 자료형(Primitive Type)과 참조 자료형(Reference Type)의 동작 방식이 어떤 차이가 있고, 어떻게 다르게 동작되는지를 알아야 한다.

## Primitive Type vs Reference Type

## 원시 자료형(Primitive Type)

원시 자료형은 Boolean, Null, Undefinde, Number, Bigint, String, Symbol이 해당한다. 이들을 원시 값이라고하고, immutable 하다고 표현한다. 이 특성의 차이로 인해 같은호출 방식이지만 다른 결과를 가지게 된다.

[Immutable - 용어 사전 | MDN](https://developer.mozilla.org/ko/docs/Glossary/Immutable)

원시 자료형은 한번 선언된 값은 변경할 수 없다. 우리가 값을 변경할 때에는 다음과 같은 과정을 거치게 된다.

```jsx
var car = "벤츠";
car = "아반떼";
```

car는 메모리 블록에 ‘벤츠’값을 가진 메모리 주소 값을 가진다.

car에 ‘아반떼’를 선언하면 메모리 블록에 ‘아반떼’라는 값을 가진 메모리 블록이 새로 생성되고

car는 방금 새로 생긴 메모리 블록 값을 참조하고, GC에 의해 ‘벤츠’를 가지는 메모리는 해제된다.

```jsx
var carObj = function (name) {
  this.name = name;
};

var car2 = new carObj("k5");
console.log(car2.name); // k5

car2.name = "sm5";
console.log(car2.name); // sm5
```

참조 자료형은 mutable 하기때문에 name 의 값이 바뀔 때 같은 메모리의 주소에서 값만 변경된다.

[Mutable - 용어 사전 | MDN](https://developer.mozilla.org/ko/docs/Glossary/Mutable)

그럼 primitive type 과 reference type 이 call by value 에서 어떻게 동작하는지 알아본다.

```jsx
function changeCar(new_name) {
  var new_name = "아반떼";
  return;
}

var car = "벤츠";
console.log(car); // 벤츠
changeCar(car);
console.log(car); // 벤츠
```

`changeCar` 를 호출하게 되면 함수 영역내에 `new_name` 변수는 `car` 를 인자 값으로 전달 받았는데 원시값이기 때문에 ‘벤츠’ 메모리를 참조하게 된다.(car변수의 주소값을 복사해왔다.) 그러나 여기서 `new_name` 에 (`car` 주소값이 가리키던 ‘벤츠’) ‘아반떼’ 를 재할당하게 되면 `car`의 값이 변경되는 것이 아니라 단순하게 `new_name`이 ‘아반떼’ 라는 메모리 상의 가리키게 된다.

이제 객체를 호출하면 어떤일이 벌어지는지 확인해 봅니다.

```jsx
function changeCarName(car) {
  car.name = "아반떼";
  return;
}
var carObj = function (name) {
  this.name = name;
};
var car2 = new carObj("k5");
console.log(car2.name); // k5
changeCarName(car2);
console.log(car2.name); // 아반떼
```

changeCarName을 호출하게 되면 값에 의한 전달에 의해 매개변수 car 에 car2의 값이 복사된다.(정확히는 car2 객체의 주소값을 복사해 간다.) 객체는 mutable 하기 때문에 [car.name](http://car.name)에 새로운 값을 넣을때 mutable한 특성에 의해 car2의 name 을 ‘아반떼’ 로 변경가능한것이다.

여기서 주의해야 할 점이 한가지 존재한다.

```jsx
var carObj = function (name) {
  this.name = name;
};

function newCar(incar) {
  incar = new carObj("벤츠");
}

var car = new carObj("k5");
console.log(car.name); // k5
newCar(car);
console.log(car.name); // k5
```

다음과 같이 인자를 통한 재할당은 불가능하다. newCar 의 incar는 현재 car 의 주소값을 가지고 있지만 값을 재할당하게 되는경우 car 과 incar 의 연결관계는 깨지기 때문에 함수를 통한 값의 재할당이 불가능하다.

call by value 에서 primitive type 과 reference type 에 따른 동작이 차이가 나는 이유를 알아보았다. 매개변수로 들어온 값은 항상 인자의 주소 값인데, 그 인자가 primitive type 의 경우에는 값의 재할당이 이루어지기 때문에 연결관계가 없어진다. reference type 에서는 주소값이 가리키는 객체가 mutable 하기 때문에 연결관계가 깨지지 않고, call by reference 처럼 동작하게 된다.
