# CSS

CSS(Cascading Style Sheets)는 HTML이나 XML 과 같은 구조화 된 문서를 화면, 종이 등에 어떻게 렌더링할 것인지를 정의하기 위한 언어이다.

HTML5 이전에는 HTML에서 CSS속성을 컨트롤할 수 있는 태그가 존재하여 CSS 없이도 어느정도 스타일 표현이 가능했다.
하지만 HTML과 CSS 본연의 역할에 충실하지 못했기 때문에 HTML5와 CSS3에서는 **HTML은 정보의 구조화**, **CSS는 styling의 정의**라는 본연의 임무에 충실한 명확한 구분이 이루어졌다.

## selector

CSS는 HTML 요소의 style(design, layout etc)을 정의하는데 사용된다. 이를 위해서 선행되어야하는 것은 스타일을 적용하고자 하는 HTML 요소를 선택할 수 있어야 한다.

셀렉터는 스타일을 적용하고자 하는 HTML 요소를 선택하기 위해 CSS에서 제공하는 수단이다.

```CSS
div { color : red ; height : 300px ;}
/* selector { property : property Value} */
```

### property

선택자로 선택한 요소 내에 다양한 프로퍼티와 값을 지정하여 다양한 스타일을 만들어 낼 수 있다.
프로퍼티는 [표준 스팩](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Keyword_index)으로 이미 정해져 있으며 _사용자가 임의로 지정할 수 없다._

### 값

셀렉터로 지정한 HTML 요소에 stype 을 적용하기 위해 프로퍼티를 사용했다. 프로퍼티의 값은 해당 프로퍼티에 사용할 수 있는 값을 **_키워드_** 나 **_크기 단위_** 또는 **_색상 표현단위_** 등의 [특정 단위](https://poiemaweb.com/css3-units)로 지정해야한다.

## HTML과 CSS의 연동

HTML은 CSS를 포함할 수 있다. CSS를 가지고 있지 않은 HTML은 브라우저에서 기본으로 적용하는 CSS(user agent stylesheet)에 의해 렌더링된다.

CSS와 HTML을 연동하는 방법은 다음과 같다.

### Link style

```html
<head>
  <link rel="styplesheet" href="./css/style.css" />
</head>
<body>
  <div>Hello World!</div>
  <!-- 빨간색 배경을 가진다. -->
</body>
```

```css
/* ./css/stype.css */
div {
  color: red;
}
```

### Embedding style

HTML 내부에 CSS를 포함시키는 방법이다. 하지만 HTML 과 CSS의 역할이 다르고 서로의 관심사 분리를 위해 link 를 사용하는 것이 바람직하다.

### Inline style

HTML 요소의 style 프로퍼티에 CSS를 기술하는 방식이다. JavaScript 가 동적으로 CSS를 생성할 때 사용하는 경우가 있다. 이 방법 또한 Embedding 방식과 동일하게 관심사의 분리를 위해 사용하지 않는것이 바람직하다.

## Reset CSS

모든 웹 브라우저는 디폴트 스타일을 제공한다. 그렇기 때문에 CSS없이도 동작하지만, 모든 웹 브라우저가 동일하게 적용되어있지 않다.
Reset CSS 는 브라우저 별로 제각각인 데폴트 스타일을 하나로 통일시켜 주는 역할을 한다.

자주 사용되는 Reset CSS

- Eric Meyer’s reset
- normalize.css

## CSS 박스 모델

CSS 박스 모델은 문서 트리에 있는 요소를 위해 생성되고 시각적 서식 모델에 따라 배치된 사각형 박스를 설명한다.

가장 밖의 라인부터 `Margin`, `Border`, `Padding`, `Content` 영역을 가진다.

각 노드는 이런 상자를 각 노드에 맞게 생성한다.
모든 요소는 만들어질 박스의 유형을 결정하는 `"display"`속성을 갖는데 이 속성의 유형은 다음과 같다.

- block : 블록 상자를 만든다
- inline : 하나 또는 그 이상의 인라인 상자를 만든다.
- none : 박스를 만들지 않는다.

기본값은 인라인이지만, 각 요소마다 다른값을 가진다. (div 의 경우 기본값이 block 이다.)

### 위치 결정 방법

위치를 결정하기 방법을보기 전에 가장 중요한 두가지 속성을 알아야 한다.

#### `Position` 과 `Float`

##### `Position`

`position` 속성은 문서 상에 요소를 배치하는 방법을 지정합니다.

1. `static`(default) : 일반적인 흐름에 따라 배치합니다.
2. `relative` : 요소를 일반적인 문서 흐름에 따라 배치하고, 자기 자신을 기준으로 상하좌우의 값에 따라 오프셋을 적용합니다.
3. `absolute` : 요소를 일반적인 문서 흐름에서 제거하고, 페이지 레이아웃에 공간도 배정하지 않습니다.
   가장 가까운 위치 지정 조상 요소에 대해 상대적으로 배치합니다.
4. `fixed` : 요소를 일반적인 문서 흐름에서 제거하고, 페이지 레이아웃에 공간도 배정하지 않습니다. 뷰포트의 초기 컨테이닝 블록을 기준으로 삼아 배치합니다.
5. `sticky` : 요소를 일반적인 문서 흐름에 따라 배치하고, 테이블 관련 요소를 포함해 가장 가까운, 스크롤 되는 조상과, 표 관련 요소를 포함한 컨테이닝 블록(가장 가까운 블록 레벨 조상) 을 기준으로 상하좌우의 값에 따라 오프셋을 적용합니다.

##### `float`

`float` 은 한 요소(element)가 보통 흐름(normal flow)으로부터 빠져 텍스트 및 인라인(inline) 요소가 그 주위를 감싸는 자기 컨테이너의 좌우측을 따라 배치되어야 함을 지정합니다.

##### 배치 유형

- 위치 지정 요소 : `position`의 계산값이 `relative`, `absolute`, `fixed`, `sticky` 중 하나인 요소
- 상대 위치 지정 요소 : `position`의 계산값이 `relative` 인 요소
- 절대 위치 지정 요소 : `position`의 계산값이 `absolute` 또는 `fixed` 인 요소

1. Normal - 객체는 문서 안의 자리에 따라 위치가 결정된다. 이것은 렌더 트리에서 객체의 자리가 DOM 트리의 자리와 같고 박스 유형과 면적에 따라 배치됨을 의미한다.
2. Float - 객체는 우선 일반적인 흐름에 따라 배치된 다음 왼쪽이나 올느쪽으로 흘러 이동한다.
3. Absolute - 객체는 DOM 트리 자리와는 다른 렌더 트리에 놓인다.

위치는 `"Position"` 속성과 `"float"` 속성에 의해 결정된다.

- `static`과 `relative`로 설정하면 일반적인 흐름에 따라 위치가 결정된다.
- `absolute` 와 `fixed`로 설정하면 절대적인 위치가 된다.

| position\float | left/right        | none          |
| -------------- | ----------------- | ------------- |
| static         | 일반적인 흐름     |
| relative       | 일반적인 흐름     |
| absolute       | X(양립할 수 없음) | 절대적인 위치 |
| fixed          | X(양립할 수 없음) | 절대적인 위치 |

position 속성을 정의하지 않으면 static이 기본 값이 되며 일반적인 흐름에 따라 위치가 결정된다. static 아닌 다른 속성 값(relatice, absolute, fixed)을 사용하면 top, bottom, left, right 속성으로 위치를 결정할 수 있다.
