# CRD(map을 사용한)

```
<IterationSample/>
```

### 간단하게 만들기

```jsx
const IterationSample = ()=>{
	const names = ['눈사람','얼음','사람','바람']
	const name = names.map((name,index)=> <li key={index}>{name}</li>)
	return <ul>{name}</ul>
}
```

### index를 사용하는 건 효율적이지 않다 → id 값 만들어 주기(State)

```jsx
const IterationSample = ()=>{
	const [names,setNames] = useState([
		{ id: 1, text:'눈사람'},
		{ id: 2, text:'얼음'},
		{ id: 3, text:'사람'},
		{ id: 4, text:'바람'},
	])
	const name = names.map(name => <li key={name.id}>{name.text}</li>)
	return <ul>{name}</ul>
}
```

### 데이터 추가하기

```jsx
const IterationSample = ()=>{
	const [names,setNames] = useState([
		{ id: 1, text:'눈사람'},
		{ id: 2, text:'얼음'},
		{ id: 3, text:'사람'},
		{ id: 4, text:'바람'},
	])

	**const [inputText,setInputText] = useState('')
	const [nextId,setNextId] = useState(5)

	const onChange = e => setInputText(e.target.value)
	
	const onClick = () => {
		const nextNames = names.concat({
			id : nextId,
			text: inputText
		});
		setNextId(nextId+1)
		setNames(nextNames)
		setInputText('')
	}**

	const name = names.map(name => <li key={name.id}>{name.text}</li>)
	return (
		<>
			<input value={inputText} onChange={onChange}/>
			<button onClick={onClick}>추가</button>
			<ul>{name}</ul>
		</>
	)	
}
```

- useState 사용법

  - `[데이터명,set데이터명] = useState( 초기값)`
  - `set데이터명(바꿀 내용)` 으로 바꾸기

- ```
  **input
  ```

  이 

  ```
  onChange
  ```

   되면**

  - `setInputText`로 내용물을 `e.target.value` (이타벨) 로 바꾼다

- ```
  **button
  ```

   을 

  ```
  onClick
  ```

   한다면**

  - `concat`을 이용해서 `names`에 추가를 한 값을 `nextNames` 라는 곳에 저장을 해둔다
  - `Names`를 만들어 놓은 `nextNames`로 바꿔주기
  - `id` 하나 늘려놓기
  - `input`창 비우기

### 데이터 삭제하기

```jsx
const onRemove = id =>{
	const nextNames = names.filter(name=>name.id !== id)
	setNames(nextNames)
}
const name = names.map(name=>(
	<li key={name.id} onDoubleClick={()=> onRemove(name.id)}>
		{name.text}
	</li>
))
```

- 더블 클릭하면 `onRemove` 함수를 `id`를 가지고 실행한다

- `onRemove` 함수는 names에서 id를 제외한 값들로 nextNames를 만든다

  그리고 그값을 setNames로 바꿔준다.