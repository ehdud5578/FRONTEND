# Closure

---

###### 본 문서는 MDN문서를 기반으로 작성되었습니다([링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures))

---

### 어휘적 범위 지정(Lexical scoping)

클로저를 이해하기 위해 Lexical Scoping 에 대해 먼저 알아야 한다.
어휘적 범위 지정이란? 변수의 유효범위를 나타내는 용어이다. `JavaScript` 에서는 Lexical scope 를 따르는데 <U>**함수를 어디서 선언**</U>하였는지에 따라
상위스코프를 결정하는것을 말한다. 함수가 호출된곳이 아닌 선언된곳에서 변수의 범위가 지정되는것에 유의해야한다.

```javascript
function init() {
  var name = "Mozilla"; // name은 init에 의해 생성된 지역 변수이다.
  function displayName() {
    // displayName() 은 내부 함수이며, 클로저다.
    alert(name); // 부모 함수에서 선언된 변수를 사용한다.
  }
  displayName();
}
init();
```

위의 예시에서 `displayName()` 은 `name` 변수 바로 다음에 선언되었다. 따라서 `displaName이` 어디서 호출되는지와 상관없이 선언된곳에서 가꾸운 `name` 을 출력하게 된다.

### Closure?

- 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다. (MDN 설명)
- 클로저(Closure)는 일급 객체 함수(first-class functions)의 개념을 이용하여 유효범위(scope)에 묶인 변수를 바인딩 하기 위한 일종의 기술이다.([블로그](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwim3sb-j6_4AhUTglYBHUVAAN4QFnoECBAQAQ&url=https%3A%2F%2Fheropy.blog%2F2017%2F11%2F10%2Fclosure%2F&usg=AOvVaw01kCdrjUgjxqlKeeYKQMBi))
- 클로저란 이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수를 클로저라고 합니다.([블로그](https://victorydntmd.tistory.com/44))

```javascript
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
//myFunc변수에 displayName을 리턴함
//유효범위의 어휘적 환경을 유지
myFunc();
//리턴된 displayName 함수를 실행(name 변수에 접근)
```

`var myFunc = makeFunc();` 에서 `makeFunc()` 에 대한 어휘적 환경(Lexical scpoe)를 myFunc 에 저장한다.
myFunc에는 `makeFunc()`가 실행될때의 어휘적 환경에 대한 참조를 유지하고 있기 때문에 함수가 종료되어 더 이상 참조할 수 없는 name 에 참조 가능하다.

```javascript
function makeAdder(x) {
  var y = 1;
  return function (z) {
    y = 100;
    return x + y + z;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);
//클로저에 x와 y의 환경이 저장됨

console.log(add5(2)); // 107 (x:5 + y:100 + z:2)
console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산
```

위의 예시는 클로저를 사용하여 private 변수를 구현한 것을 볼 수 있다.
add5 와 add10은 각각의 클로저를 형성하고 add5에서의 x 는 5를, add10에서는 x 가 10을 가지고 있기 때문에 함수가 종료된 이후에도
결과 값을 가져 올 수 있다.

### 루프에서 클로저 생성하기: 일반적인 실수

```HTML
<p id="help">Helpful notes will appear here</p>
    <p>E-mail: <input type="text" id="email" name="email"></p>
    <p>Name: <input type="text" id="name" name="name"></p>
    <p>Age: <input type="text" id="age" name="age"></p>
```

```javascript
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help);
    };
  }
}

setupHelp();
```

이 코드를 사용하면 제대로 동작하지 않는 것을 알게 된다. 어떤 필드에 포커스를 주더라도 나이에 관한 도움말이 표시된다.
onfocus 이벤트에 연결된 함수가 클로저이기 때문이다. 이 클로저는 함수 정의와 setupHelp 함수 범위에서 캡처된 환경으로 구성된다. 루프에서 세 개의 클로저가
만들어졌지만 각 클로저는 값이 변하는 변수가 (item.help) 있는 같은 단일 환경을 공유한다. onfocus 콜백이 실행될 때 콜백의 환경에서 item 변수는 (세개의 클로저가 공유한다) helpText 리스트의 마지막 요소를 가리키고 있을 것이다.
var(함수 범위) 로 선언한 i 는 호이스팅되어 function 이 실행되는 최상단에 변수가 선언되고, `document.getElementById(item.id).onfocus` 은
하나의 i 값을 참조하기 때문에 원하는대로 동작하지 않는 것을 알 수 있다.
MDN 에 나온 해설처럼 한번 더 클로저를 사용하거나 , let(블록 범위) 변수 선언을 통해 i 값을 블록범위를 통해 onfocus의 콜백함수가 각각의 i 값을 가지게 할 수 있다.
