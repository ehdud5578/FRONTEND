# SOLID

SOLID란? 로버트 마틴이 명명한 객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙을 마이클 페더스가 두문자어 기억술로 소개한 것이다.

1.  단일 책임 원칙 (Single responsibility principle)
2.  개방-폐쇄 원칙 (Open/closed principle)
3.  리스코프 치환 원칙 (Liskov substitution principle)
4.  인터페이스 분리 원칙 (Interface segregation principle)
5.  의존관계 역전 원칙 (Dependency inversion principle)

위의 5가지 원칙의 앞글자를 따서 만든 것이 SOLID 이다.

## 단일 책임 원칙

### 책임의 의미

소프트웨어 설계 첫 번째 원칙으로 단일 책임 원칙이 있다. 말 그대로 객체는 단 하나의 책임만을 가져야 한다는 의미이다.

책임이란? 책임은 여러 관점으로 해설할 수 있지만 보통 '해야 하는 것' 이나 '할 수 있는 것' 으로 간주할 수 있다.

### 변경

단일 책임워칙을 따라는 실효성있는 설계가 되려면 책임을 좀 더 현실적인 개념으로 파악할 필요가 있다. 설계 원칙을 학습하는 이유는 예측하지 못한 변경사항이 발생하더라도 유연하고 확장성이 있도록 시스템 구조를 설계하기 위해서이다. 좋은 설계란 기본적으로 시스템에 새로운 요구사항이나 변경이 있을 때 **가능한 한 영향 받는 부분을 줄여야 한다.** 또한 책임을 많이 질수록 내부에서 서로 다른 역할을 수행하는 코드끼리 강하게 결합될 가능성이 높아진다.

```javascript
const student = () => ({
  getCourses: () => {}, // 수강 신청 가져오기
  setCourses: (course) => {}, // 수강 신청하기
  save: () => {}, // db 저장
  load: () => {}, // db에서 불러오기
  printOnReportCard: () => {}, // 보고서 출력
  printxOnAttendanceBook: () => {}, // 출석부 프린트
});
```

위의 예에서는 수강 과목을 가져오는`getCourses` 와 DB에서 데이터를 가져오는 `load`중 어딘가가 연결 될 수도 있다.

```javascript
const attendanceBook = () => ({
  proint: () => {
    console.log("출석부 출력!");
  },
});
const studentDAO = () => ({
  save: () => {
    console.log("saved!");
  }, // db 저장
  load: () => {
    console.log("loaded!");
  }, // db에서 불러오기
});

const improvementStudent = (studentDAO, attendanceBook) => ({
  getCourses: () => {}, // 수강 신청 가져오기
  setCourses: (course) => {}, // 수강 신청하기
  studentDAO,
  attendanceBook,
});
const student1 = improvementStudent(studentDAO, attendanceBook);
student1.studentDAO().save(); // saved!
```

#### 책임 분리

위의 학생 객체는 여러 책임을 수행하기 때문에 책임을 분리하는것이 바람직하다.

## 개방 폐쇄 원칙

개방(open)-폐쇄(closed) 원칙은 기존의 코드를 변경하지 않으면서 기능을 추가할 수 있도록 설계가 되어야 한다는 뜻이다.
또한 클래스를 변경하지 않고(closed) 대상 클래스의 환경을 변경할 수 있는(open) 설계가 되어야 한다는 뜻이다.
개방 폐쇄의 원칙은 변경사항이 생겼을 때 유연한 대처를 하기 위해서 생긴 원칙이다.

```javascript
const Pet = function (type) {
  this.type = type;

  this.bark = function () {
    if (this.type == "dog") {
      console.log("멍멍");
    } else if (this.type == "cat") {
      console.log("야옹");
    }
  };
};

const myDog = new Pet("dog");
myDog.bark(); // 멍멍
const myCat = new Pet("cat");
myCat.bark(); // 야옹
```

해당 코드는 의도된 대로 정상작동하지만 새로운 동물을 추가할 때마다 Pet 함수를 다음과 같이 수정하면

```javascript
const Pet = function (type, sound) {
  this.type = type;
  this.sound = sound;
  this.bark = function () {
    console.log(this.sound);
  };
};

const myDog = new Pet("dog", "멍멍!!");
myDog.bark(); // 멍멍!!
const myCat = new Pet("cat", "야옹~~");
myCat.bark(); // 야옹~~
```

위와같이 수정하면 새로운 동물이 추가되더라도 `Pet` 함수가 수정되지 않는다.
~~하지만 아직 멀었다. 아직도 잘 작성된 코드는 아니다.~~

## 리스코프 치환 원칙

리스코프 치원 원칙은 일반화 관계에 대한 이야기이며 자식 클래스는 최소한 자신의 부모 클래스에서 가능한 행위는 수행할 수 있어야 한다는 뜻이다.

```javascript
class Car {
  constructor() {}

  go = () => {
    console.log("자동차가 주행한다.");
  };
}

class Benz extends Car {
  go = () => {
    console.log("벤츠가 주행한다.");
  };
}

const myCar = new Car();
myCar.go();

const myBenz = new Benz();
myBenz.go();
```

위의 예시에서 `Car` 라는 Class 상속받은 `Benz` 클래스는 `go` 라는 함수를 가지고있는데 그 역할이 달라져서는 안된다.

## 인터페이스 분리 원칙

인터페이스는 **_책임_** 이다. 책임들 사이에 서로 영향을 줘서는 안된다는 이야기 이다. 위에서 이야기 했던 단일 책임 원칙을 지키기만 한다면 크게 문제 없을것 처럼 보이지만, 그렇지 않다.  
다음의 예를 보자. A 게시판은 읽기, 쓰기 , 수정, 삭제 의 기능을 가지고 있는데 B 게시판은 관리자만 삭제가 가능하다. 이런 경우 CRUD 를 하나의 인터페이스에 묶게 된다면 인터페이스 분리 원칙을 지키지 않은 것이다.

```javascript
class board {
  constructor() {}
}

function implementCRUD(objects) {
  objects.__proto__.create = () => {
    console.log("created");
  };
  objects.__proto__.read = () => {
    console.log("read");
  };
  objects.__proto__.update = () => {
    console.log("updated");
  };
  objects.__proto__.delete = () => {
    console.log("deleted");
  };
}

const boardA = new board();
implementCRUD(boardA);

const boardB = new board();
implementCRUD(boardB);
boardB.delete();
// 사용하지 않는 delete 메소드까지 생겨남

function implementCreate() {
  objects.__proto__.create = () => {
    console.log("created");
  };
}
function implementRead() {
  objects.__proto__.read = () => {
    console.log("read");
  };
}
function implementUpdate() {
  objects.__proto__.update = () => {
    console.log("updated");
  };
}
function implementDelete() {
  objects.__proto__.delete = () => {
    console.log("deleted");
  };
}
// 위와 같이 책임의 분리가 필요
```

## 의존관계 역전 원칙

객체 사이에 서로 도움을 주고받으면 의존관계가 발생한다. 의존관계 역전 원칙은 그러한 의존 관계를 맺을 떄의 가이드라인에 해당한다. 누군가의 도움을 받을 때는 무조건 도움을 받으려고 여기저기 손을 내밀 게 아니라 손을 내밀 때 나름대로의 원칙을 가지고 도움을 청해야 효과적인 도움을 받을 수 있다.

> DIP는 의존관계를 맺을 때 변화하기 쉬운 것 또는 자누 변화하는 것보다는 변화하기 어려운 것. 거의 변화가 없는 것에 의존하라는 원칙이다.

- 변하기 쉬운 것 : 정책 전략과 같은 어떤 큰 흐름이나 개념 같은 추상적인 것
- 변하기 귀운 것 : 구체적인 방식, 사물 등과 같은 것은 변하기 쉬운 것으로 구분

```javascript
class myCar {
  constructor(name) {
    this.name = name;
  }

  drive = () => {
    console.log();
  };
}
function implementDrive(objects) {}

class Car {
  constructor(name) {
    this.name = name;
  }

  go = () => {
    console.log(`${this.name}가 주행한다.`);
  };
}

class Benz extends Car {
  constructor(name) {
    super(name);
  }
  go = () => {
    console.log(`${this.name}가 빠르게 주행한다.`);
  };
}

class Kia extends Car {
  constructor(name) {
    super(name);
  }
  go = () => {
    console.log(`${this.name}는 느리게 주행한다.`);
  };
}
```
