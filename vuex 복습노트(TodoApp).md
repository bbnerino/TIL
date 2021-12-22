# Vuex

- state

  를 전역 저장소로 관리할 수 있도록 지원하는 라이브러리

  - state는 data 이며 해당 application의 핵심이 되는 요소(중앙에서 관리하는 모든 상태 정보)

- 중앙 집중식 저장소(store)에 state를 모아놓고 관리

- 규모가 큰 프로젝트에서 매우 효율적

### 상태관리 패턴

1. 컴포넌트의 공유된 상태를 추출하고 이를 전역에서 관리 하도록 한다.

2. 컴포넌트는 커다란 view가 되며 모든 컴포넌트는 

   트리에 상관없이

    상태에 엑세스 하거나 동작을 트리거 할 수 있다.

   - 트리거 : 특정한 동작에 반응해 자동으로 필요한 동작을 실행하는 것

# Vuex 핵심 컨셉

1. state
2. Mutations
3. Actions
4. Getters

# State

**“중앙에서 관리하는 모든 상태 정보(data)”**

- vuex는 single state tree를 사용

- 여러 컴포넌트 내부에 있는 특정 

  state를 중앙에서 관리

  하게 된다.

  - 한눈에 state들을 파악가능하다.

- state가 변화하면 해당 state를 공유하는 여러 컴포넌트의 DOM이 알아서 렌더링된다.

- 각 컴포넌트는 이제 **Vuex Store**에서 state 정보를 가져와 사용한다.

# Mutations

**“실제로 state를 변경하는 유일한 방법”**

- mutation의 handler(핸들러 함수)는 반드시 **동기적**이어야 한다.

- 첫번 째 인자로 항상 **state**를 받는다.

- Actions에서 

  ```
  commit()
  ```

   메서드로 호출된다.

  - Acitons → Commit → Mutation → State

# Actions

**“Actions를 통해 state를 조작할수 있지만 오로지 Mutations를 통해서만 하겟다.”**

- Mutations와 유사하지만 state를 변경하는 대신 mutations를 `commit()` 메서드로 호출해서 실행
- 동기 + **비동기 작업**이 포함될 수 있음( API 요청.. 등)
- context 객체 인자를 받음
  - context를 받으면 vuex의 모든 속성에 접근 가능하다→ 가능은 하지만 하면 안된다.
- Components에서 `dispatch()` 메서드로 호출된다.

# Getters

- state를 **변경하지 않고** 활용하여 계산을 수행(computed 속성과 유사)

  - getter의 결과는 state 종속성에 따라 종속성이 변경된 경우에만 다시 재계산된다.

- ex) 완료된 목록만 필터링 할때

  이때 getters에 completed의 값이 true인 요소를 필터링 해서 계산된 값을 담아 놓을 수 있다.

------

------

# Todo App 만들기

```
$ vue create todo-vuex-app
$ vue add vuex
```

- src 안에 store가 생겼다

```
$ yarn run serve
```

### components

- TodoForm.vue

- TodoList.vue

  ```jsx
  <todo-list-item/>
  
  components:{TodoListItem}
  ```

- TodoListItem.vue

### App.vue

```jsx
<div id="app">
  <h1>Todo List</h1>
  <todo-form></todo-form>
  <todo-list></todo-list>
</div>

components: {TodoList,TodoForm}
```

# Create Todo

store/index.js 에서 state 값 만들어주기

```jsx
state: {
    todos:[
      {
        title:'할일1',
        isCompleted:true,
        data:new Date().getTime(),
      },
      {
        title:'할일2',
        isCompleted:false,
        data:new Date().getTime(),
      }
    ]
  },
```

## Store의 데이터 가져오기

- 컴포넌트에서 Vuex Store의 state에 접근

  `$store.state`

  - $ 는 속성값 , 즉 store의 state값을 가져오겠다.
  - `$store.state.todos` → store의 state의 todos를 가져오겠다.

**TodoList.vue**

```jsx
<div>
    <todo-list-item 
      v-for="todo in **$store.state.todos**"
      :key="todo.date"
    />
</div>
```

매 렌더링마다 가져와야 하지 않게끔 computed에 작성하는게 좋다

```jsx
computed:{
    todos : function(){
      return this.$store.state.todos
  }
}
```

### TodoList → TodoListItem (props로 내려주기)

```
<todo-list-item v-for="todo in todos" :key="todo.date" **:todo = "todo"**/>
```

**TodoListItem** 에서 props로 받아주기

```jsx
props:{todo:Object} 이렇게도 가능하고 
props:{
	todo : {
		type: Object 도 가능하다
}}
```

## TodoForm 에서 input 작성하기

```jsx
<template>
  <div>
    <input type="text"
    v-model="todoTitle"
    @keyup.enter="createTodo"
    >
  </div>
</template>

data:function(){
    return {
      todoTitle : '',
  }
},
methods:{
    createTodo: function(){
      // console.log(this.todoTitle)
      this.$store.commit('CREATE_TODO')
  }
}
```

- input 에 v-model로 data의 todoTitle과 binding하고 ,

- enter를 누르게 되면 `createTodo()` 가 실행되는데 그 함수는

- ```
  this.$store.commit('CREATE_TODO’)
  ```

  - `this.$store.commit()` 을 하게 되면 mutations이 불러와진다 .

  - mutations 에 그 함수를 선언하면 된다 .

    ```jsx
    mutations: {
        CREATE_TODO: function(state){
          console.log(state)
      }
    },
    ```

    - mutations는 무조건 첫 인자로 state를 사용해야 된다 .

    여기서 state를 console 찍어보면 state의 todos 가 출력된다 →

    state를 수정해도 된다라는 뜻

### TodoForm 에서 값 보내주기

- `Commit ('호출 메서드',payload)`

  - `payload`는 보내주는 값 을 뜻한다.

  ```jsx
  methods:{
      createTodo: function(){
        const todoItem ={
          title : this.todoTitle,
          isCompleted : false,
          data : new Date().getTime(),
        }
        // console.log(this.todoTitle)
        this.$store.commit('CREATE_TODO',todoItem)
  			this.todoTitle = ''
      }
    }
  ```

  - todoItem 을 새로 만들어서 형태를 갖춘 뒤 , 보내준다.

- mutations에서도 인자를 두개를 사용해야한다.

  ```jsx
  mutations: {
      CREATE_TODO: function(state,todoItem){
        // console.log(todoItem)
        state.todos.push(todoItem)
    }
  },
  ```

  - `**state.todos.push(todoItem)`**

### 완료는 됐지만, 구조가 틀리다

### 컴포넌트에서 사용하려면 actions를 호출해서 사용해야한다.

```
this.$store.dispatch('createTodo',todoItem)
```

- **dispatch** = actions 호출하는 메서드

- actions 만들어주기

  ```jsx
  actions: {
      createTodo : function(**context**,todoItem){
        console.log(**context**)
        console.log(todoItem)
      }
    },
  ```

  - actions에서는 첫 인자를 context로 받아야 한다.
    - context 내용을 보면 commit(mutations) , dispatch(actions), getters, state 모든 값이 다 들어있다. → **모든 곳에 접근 가능하다** (state 변경은 안하는 것을 권유)

```
createTodo : function(context,todoItem){ context.commit('CREATE_TODO',todoItem)
```

- 대문자로 적힌 commit 을 보면 state를 바꾸는 mutations 구나 라고 생각할 수 있음

## 정리

1. 컴포넌트에서 dispatch()를 통해 actions를 호출
2. actions에 정의된 함수(핸들러)는 commit()를 통해 mutation을 호출
3. mutation 에 정의된 함수가 최종적으로 state 변경

### Actions

- createTodo 함수
- `CREATE_TODO` mutation 함수 호출

### Mutations

- `CRAETE_TODO` 함수
- State의 todo 데이터 조작

# DELETE

1. 컴포넌트에서 `this.$store.dispatch()` 를 통해 actions 로 이동

   ```jsx
   <button @click="deleteTodo">DELETE</button>
   
   methods:{
       deleteTodo : function(){
         this.$store.dispatch('deleteTodo',this.todo)}}
   ```

2. **actions**에서 `commit()` 메서드를 통해 mutations 으로 이동

   ```jsx
   deleteTodo : function({commit},todoItem){
         commit('DELETE_TODO',todoItem)}
   ```

3. mutations에서 state 관리

   ```jsx
   DELETE_TODO:function(state,todoItem){
   //		state.todos =state.todos.filter((todo=>(todo!==todoItem)))
         const index = state.todos.indexOf(todoItem)
         state.todos.splice(index,1)}
   ```

   `state.todos =state.todos.filter((todo=>(todo!==todoItem)))` filter 사용법

   아니면 splice, indexOf 로 삭제 해주기

# Update

```jsx
<span @click="updateTodo" style="cursor:grab">{{todo.title}}</span>
updateTodo : function(){
  this.$store.dispatch('updateTodo',this.todo)
}
//actions
updateTodo : function({commit},todoItem){
  commit('UPDATE_TODO',todoItem)
}
//mutations
UPDATE_TODO: function(state,todoItem){
      state.todos = state.todos.map(todo=>{
        if (todo===todoItem){
          return {
            ...todo,
            isCompleted:!todo.isCompleted }
				else{return todo}})
```

`{ ... todo, isCompleted:!todo.isCompleted}` : 같은내용 복사 하기

### 줄긋기

```jsx
<span @click="updateTodo" 
      style="cursor:grab"
      :class="{'is-completed':todo.isCompleted}"
    >{{todo.title}}</span>
<style>.is-complted{text-decoration:line-through}</style>
```

class 를 ‘is-complted’라는 class가 todo의 isCompleted가 참일때만 부여하고 class에 스타일을 준다.

# Getters

```jsx
getters:{
    completedTodosCount: function(state){
      return state.todos.filter(todo=>{
        return todo.isCompleted === true
      }).length
    }
  },
```

- getters 는 첫 인자로 state를 받는다 → state값을 이용해서 새로운 값을 만들지만 state값을 수정하지는 않는다.

App.vue

```jsx
computed:{
    completedTodosCount : function(){
      return this.$store.getters.completedTodosCount
  }
}
```

- computed 에서 가져와서 사용한다.

  굳이... ? 그래서 아래가 나온다.

# Component Binding Helper

배열 조작을 쉽게 하도록 만들어 졌다.

### 1. mapState

- computed 와 State를 매핑한다.

- computed에서 state를 사용시

  ```jsx
  원래 형태 
  computed : {
  	todos : function(){
  		return this.$store.state.todos}} 형태였는데 
  
  import {mapState} from 'vuex'
  computed : mapState(['todos'])
  ```

  `computed : mapState(['todos'])` ??? 이렇게 줄일 수 있다.

  - 그럼  computed 의 원래 내용들은 어떻게 보내나요?

    ```jsx
    computed :{
    	내용1,
    	내용2,
    	...mapState(['todos'])}
    ```

    이런 식으로 보내면 된다.

    내용이 없다면 생략해서 적는것이 최종형태

    `computed : { ...mapState(['todos'])}`

### 2. mapGetters

- getters 도 computed에서 쓸때 이름이 같으면 그대로 사용가능

  ```jsx
  computed:{
      ...mapGetters([
        'completedTodosCount',
        'uncompletedTodosCount',
        'allCount',
  ])}
  ```

### 3. mapActions

- computed 와 매핑이 아닌 methods에서의 매핑이다

  ```jsx
  methods:{
      ...mapActions([
        'deleteTodo',
        'updateTodo',
      ])}
  ```

  이걸로 끝이 아니다. 왜냐 ? 같이 보내주는 값(payload) 아래의 경우 this.todo를 처리해야한다.

  `this.$store.dispatch('deleteTodo',this.todo)`

  이거는 template 상에서 보내줘야한다.

  - `<span @click="updateTodo(todo)”`
  - `<button @click="deleteTodo(todo)">DELETE</button>`

### 4. mapMutations



# LocalStorage 저장

## vuex-persistedstate

- vuex state를 자동으로 브라우저의 LocalStorage에 저장해주는 라이브러리 중 하나
- 페이지가 새로고침되어도 Vuex state를 유지시킴

설치 : `$ npm i vuex-persistedstate`

```jsx
import createPersistedState from "vuex-persistedstate"
store({ ...
plugins:[createPersistedState()],
}
```

