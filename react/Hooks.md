# Hooks

## useState

- 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.
- `const [value,setValue] = useState(0)`형태로 만든다

## useEffect

- 리액트 컴포넌트가 **렌더링 될 때마다** 특정 작업을 수행하도록 설정할 수 있는 Hook

- componentDidMount + componentDidUpdate 를 합친 형태

- 기본형

  `useEffect(()⇒{ ... })`

- 맨처음만 실행되고 , 업데이트 될 때는 실행하지 않게 하기

  `useEffect(()⇒{...},[ ])`

- 특정 value 값이 바뀔 때만 특정 작업을 수행하기

  `useEffect(()⇒{...},[name])`

## useReducer

- useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 업데이트 할 떄 사용

```jsx
function reducer(state,action){
	switch(action.type){
		case 'INCREMENT':
			return { value: state.value+1}
		case 'DECREMENT':
			return { value: state.value+1}
		default:
			return state
	}
}

const Counter = () => {
	const [state,dipatch] = use Reducer(reducer,{value:0})
	return (
	... 
	<button onClick={()=>dispatch({type:'INCREMENT'})}>+1</btn>
	<button onClick={()=>dispatch({type:'DECREMENT'})}>+1</btn>
```

## useMemo

- 연산의 최적화를 위해 사용

## useCallback

- 만들어 놨던 함수를 재사용

- 첫번째 파라미터에는 생성하고 싶은 함수를 넣고 두번째에는 배열을 넣는다

  이 배열은 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시한다.

- 비어있는 함수는 컴포넌트가 렌더링 될대 만들었던 함수만 재사용하며

  내용이 있으면 새로운 항목이 추가 될 때마다 새로 만들어진 함수를 사용

- 내용이 의존적인 내용이라면 반드시 넣어줘야한다.

## useRef

- ref를 쉽게 사용할 수 있도록 하는 함수

  ```jsx
  const inputEl = useRef(null);
  const onInsert = useCallback(()=>{
  	...
  	inputEl.current.focus()},[number,list])
  return (
  	<input ref ={inputEl}/>
  	<button onClick={onInsert}></btn>)
  ```