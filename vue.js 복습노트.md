# vue.js 복습노트



# 반응형 DOM

### DOM(View)과 Data가 연결만 되어있다면 Data만 변경해도 DOM이 변경된다.

### 코드 작성순서

Data가 변경되면 DOM이변경된다

1. Data 로직 작성
2. DOM 작성

## extenstions

`Vetur` (vscode)

`Vue.js devtools` (chrome)

------

# **MVVM Pattern**

**View**

```jsx
<div id=app>
	{{ message }}
</div>
```

### **ViewModel** → 이게 vue의 역할

```jsx
const app = new Vue({
	el : '#app',
	data: {
		message: 'hi'
	}
})
```

**Model** = `data: {message: 'hi'}`

------

# Vue Instance === Vue Component

- python 에서 클래스 선언 하듯이 const app으로 여러 인스턴스를 선언해서 사용한다.

## data

- Vue 인스턴스의 데이터 객체
- Vue 인스턴스의 상태 데이터를 정의하는 곳
- Vue template 에서 {{ }} 로 접근 가능
- 객체 내 다른 함수에서 this 키워드를 통해서 접근 가능
- 화살표 함수 사용하지 말것

## methods

- Vue 인스턴스에 추가할 메서드
- {{ }} 로 접근가능
- Vue 객체 안 다른 함수에서 this 키워드로 접근가능
- 화살표 함수 사용하지 말것 (this가 상위 객체를 못 가르킨다→ window)
  - 이벤트 리스너의 콜백함수도 function 키워드를 사용하자!

# Axios

Promise 기반으로 비동기적 요청이 가능하다.

```jsx
const URL = '<http://asdflkajsdf>'
axios.get(URL)
	.then(response =>{
		console.log(response.data)
})
```

------

------

# Template Syntax

- `{{콧수염}}`
- Directive = `v-뭐시기`

------

# Directive

- 표현식의 값이 변경될 때 반응적으로 DOM에 적용하는 역할
- [디렉티브](https://kr.vuejs.org/v2/guide/syntax.html#디렉티브) 뷰 공식 문서
- `:` 을 통해서 전달인자를 받기도 하고
- `.` 을 통해서 수식어를 사용하기도 한다.

## v-text

- 엘리먼트의 textContent를 업데이트 ( innerText )
- `{{ message}}` 와 `<p v-text=”message”></p>` 와 똑같다 (쓰려나?)

## v-html

- 엘리먼트의 innerHTML을 업데이트
- 임의로 사용자로부터 입력받은 내용은 v-html에 사용금지
- message : `‘<a>hello</a>'` , `<div v-html=”message”>`

## v-show

- 조건부 렌더링 중 하나

- 엘리먼트는 항상 렌더링 되고 DOM에 남아있음 (자리 차지x)

- 그냥 `style = "display:none"`값을 주는 것

- 처음에 필요없는 값도 가져오기 때문에 렌더링 비용이 높지만

  자주 렌더링 되면 여부만 판단해서 토글 비용이 적다

## v-if

- 조건부 렌더링

- 조건에 따라 블록을 렌더링

- 삭제가 되었다가 생겼다가 반복한다

- 렌더링 자체가 되지 않기 때문에 렌더링 비용은 낮지만

  자주 렌더링 되면 비용이 높을 수 있다.

## v-for

- (item,key) in tiems 로 사용
- key 값을 꼭 지정해주기 `:key="key"`
- v-if 와 함께 사용하지 말것!
  - v-for 가 더 우선순위가 높아서 원하는 결과가 안나온다
  - 애초에 상위 컴포넌트에서 v-if 로 사용하면 된다.

## v-bind

- HTML 요소의 속성에 Vue의 상태 데이터를 값으로 할당

  여러개는 [ ] 로 묶어 사용

- 즉 바뀌는 요소 같은 경우에 binding 해서 값을 바꿔주면 된다.

- Object 형태로 사용하면 value가 ture인 key가 class 바인딩 값으로 할당

  - <div :class="{active: true}”>

- 짧게 이렇게 쓰기도 한다 `:v-bind:href` ⇒ `:href`

- <img src="imageSrc"> 라고 써봤자 그저 ‘imageSrc’ 라는 문자가 들어간 것이다

## v-model

- HTML form 요소의 값과  data를 양방향 바인딩

- input, form 등에서 많이 사용

  ```jsx
  <input v-model="myMessage">
  <h1>{{myMessage}}</h1>
  data:{ myMessage:''} 
  ```

- 한글은 바로바로 적용이 안되고, 다음 과정을 거쳐야 한다. ( 양방향 바인딩 만들기)

  ```jsx
  <input v-on:input="onInputChange" v-model="myMessage">
  <h1>{{myMessage}}</h1>
  data:{ myMessage:''} 
  methods:{ onInputChange:function(event){
  	this.myMessage = event.target.value
  }}
  ```

- 체크박스

  ```jsx
  <input type="checkbox" v-model = "isChecked">
  data : {isChecked:true}
  ```

------

------

## Computed

- 계산된 속성 ( 함수 형태로 작성되어 있다) → 미리 계산된 값만 쓰겠다
  - 값이 저장되어 있어서 다시 사용하기 용이
  - methods 와 동일하지만 methods 호출할 때마다 렌더링하여 함수를 실행하는 차이
- **종속된 데이터가 변경될 때만 함수를 실행한다.**
- 어떤 데이터에도 의존하지 않는다면 업데이트되지 않는다.
- 반드시 반환 값이 있어야 한다.

## watch

- 데이터에 변화가 일어났을 때 실행
- 콜백 함수를 실행시키기 위한 트리거

```jsx
watch : {
	a: function ( newValue,oldValue){
		console.log('watch')
		this.increase = newValue - olValue}}
```

### watch

- 특정 데이터에 맞춰 다른 data 등이 바뀌어야 할때 사용

### computed

- 특정 데이터를 직접적으로 사용, 가공해 다른 값으로 만들 때 사용

## filter

```
{{ 함수 | 함수 | 함수}}
```

# Lifecycle Hooks

1. beforeCreate

2. **created : 생성된 직후에 함수 실행**

   ```jsx
   created: function(){
   	this.getImg()}
   ```

3. beforeMount

4. mounted

5. updated

6. beforeUpdate

7. destroyed

# lodash

- 메서드를 제공하는 라이브러리
- reverse, sortBy, range, random ...
- cdn 추가 해서 사용하기