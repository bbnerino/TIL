# state

- state는 컴포넌트 내부에서 바뀔 수 있는 값
- props는 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값,
- 컴포넌트 자신은 해당 props를 읽기 전용으로만 사용할 수 있다.
- props를 바꾸려면 부모 컴포넌트에서 바꿔야한다.

### state 선언하는법

```jsx
import React,{Component} from 'react';

class Counter extends Component{
	state = {
		number :0,
		fixedNumber:0
	};
```

### state 변경하는 법

```jsx
render(){
	const { number,fixedNumber} = this.state;
	return (
		<div>
			<h1>{number}</>
			<h2>바뀌지않는 {fixedNumber}
			<button
				onClick={()=>{
					**this.setState({number:number+1});**
				}}>
			****</button>
		</div>);
```

### useState

```jsx
import React,{useState} from 'react';
const Say =()=>{
	const [message,setMessage] =useState('')
	const onClickEnter = () =>setMessage('안녕하세요!');
	return (
		<>
			<button onClick ={onclickEnter}>입장</button>
		</>
)}
```

### state 사용할 때 주의 사항

- 사본을 만들어서 업데이트를 해야한다.

- spread 연산자 사용 `{...object}`

  ```jsx
  const object ={a:1,b:2,c:3}
  const nextObject = {...object,b:2}; 사본을 만들어서 b값만 덮어 쓰기
  ```

- concat

  ```jsx
  const array =[
  	{id:1,value:true},
  	{id:2,value:true},
  	{id:3,value:false}]
  let nextArray = array.concat({id:4})
  ```

- 제거 , 수정하기

  ```jsx
  nextArray.filter(item => item.id !== 2)
  nextArray.map(item=>(item.id===1 ? {...item,value:false} : item)); 
  ```