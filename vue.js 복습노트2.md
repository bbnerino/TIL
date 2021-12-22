# Vue.js 복습노트 2



# SFL [Single File Component]

- vue의 컴포넌트 기반 개발의 핵심 특징
- 하나의 컴포넌트는 `.vue 확장자`를 가진 하나의 파일 안에서 작성되는 코드의 결과물
- 화면의 특정 영역에 대한 HTML CSS JavaScript 코드를 하나의 파일(.vue)에서 관리

## Component

- 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화 하는데 도움을 준다
- CS에서는 다시 사용할 수 있는  구성 요소를 의미
- 유지보수 , 재사용성에서 강력한 기능을 제공
- vue 인스턴스 === vue 컴포넌트 === .vue 파일
  - const app = new Vue → 인스턴스 만들기

1. **각 기능별로 파일을 나눠서 개발이 가능하다**
2. **vue는 컴포넌트 기반의 개발 환경을 제공한다.**

# Node.js

- js를 브라우저가 아닌 환경에서도 구동시킬수 있는 환경

```
$ npm install -g @vue/cli
```

# Babel

- 코드를 이전 버전으로 번역해주는 도구

# Webpack

- 모듈 간의 의존성 문제 해결하기 위한 도구

- 의존성 문제를 해결해주는 작업이 

  Bundling

  - Webpakck은 이 번들러 중 하나

------

# 프로젝트 생성

```
$ vue create 앱이름
$ cd 앱이름
$ npm run server
```

## props는 아래로 events는 위로

부모는 props를 통해 자식에게 ‘데이터’를 전달하고

자식은 events를 통해 부모에게 ‘메세지’를 보낸다

## 컴포넌트 등록 3단계

1. 불러오기
2. 등록하기
3. 보여주기

# props

- 데이터를 내려 줄수 있다

- /App.vue

  `<HelloWorld msg="전달하자"/>` 이 값을 자식 컴포넌트에서

- /HelloWorld.vue `<p>{{msg}}</p>` 이렇게 사용이 가능한데 바로 사용하는게 아니라 `props :{msg: String}` **type 형태**로 불러와야 사용 가능하다.

- 내려줄때는 CamelCase 가 아닌 camel-case 이런식으로 - 를 이용해 적어야한다.

- 대신 받을 때는 `props: {camelCase}`로 받으면 된다.

# data

함수의 **return 값**으로 선언되어야 한다!!

```jsx
data : function(){
	return{ messageData :'this is message' }}
```

- 이 값을  v-binding  해주기

  `<About :message-data = “messageData”/>`

- 그냥 props로 넘기기

  `<About just-data="그냥값주기" />`

- 숫자를 넘기기 위해서는 v-bind로 넘겨줘야한다.

# Emit event

### $emit(eventName)

- 현재 인스턴스에서 이벤트를 트리거

- 추가 인자는 리스너의 콜백 함수로 전달

- 부모 컴포넌트는 자식 컴포넌트가 사용되는 템플릿에서 v-on을 사용하여

  자식 컴포넌트가 보낸 이벤트를 청취

```jsx
/About.vue
<input type="text"
	@keyup.enter ='인풋바꾸기'
	v-model = '인풋데이터'>

data : function(){ return { 인풋데이터:''}}
methods : { 인풋바꾸기 : fucntion(){
	this.$emit('인풋-바꾸기', this.인풋데이터)}}
```

1. input이 v-model로 양방향 바인딩이 되고
2. 엔터를 누르면 인풋바꾸기 함수가 실행된다
3. 인풋바꾸기 함수는 ‘input-change’ 형태로 데이터를 들고 emit 된다

```jsx
/App.vue
<About @인풋-바꾸기= '진짜바꾸기' />
<p>확인용 {{인풋데이터}}</p>

data : ... 인풋데이터 :''
methods : {
	진짜바꾸기 : function(전달온값){
		this.인풋데이터 : 전달온값}}
```

1. @input-change 가 실행되면 부모에서 바꿀수 있다 (진짜바꾸기)
2. 인풋데이터를 전달되온 값으로 바꿔준다.

### History mode

- HTML History API를 사용해서 router를 구현한 것
- 페이지를 다시 로드하지 않고 URL을 탐색할 수 있다.

# 라우터

라우터 : 위치에 대한 최적 경로를 지정, 이경로로 데이터를 다음 장치로 전향하는 장치

- 어떤 주소에서 렌더링할 지 알려준다.
- SPA 상에서 라우팅을 쉽게 개발할 수 있는 기능을 제공한다.
- CSR → 라우팅에 대한 결정권을 클라이언트가 가진다.

```
vue add router
```

## **`<router-link>`**

// App.vue

```
<router-lintk to=”/home”> Home </r>
<router-lintk to=”/about”> about </r>
```

a태그처럼 생겼지만 실제로 이동하진 않는다.

```
<router-link :to= "{name:'Home'}"> Home </router-link>
```

이미 path를 지정해놨기 때문에 이름으로 router-link 사용도 가능하다

// index.js

```jsx
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
```

### `this.$router.push('/')`

를 이용해서 함수안에서도 사용 가능

## 동적인자 전달

```
path : '/user/:userId',
```

`{{ $route.params}}` 를 이용하면

{userId : 5} 이런 결과를 가져올 수 있다.

```
<router-lintk :to ="{name:user,params:{userId:5} }”> user 5번 </r>
```