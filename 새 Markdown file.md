# Class 속성주기

패스워드를 입력해서 맞으면 success class를,  틀리면 failure를 부여하고 싶다.

### component 만들기

### state 만들어주기 (password , 클릭여부, 확인)

```jsx
class ValidationSample extend Component{
	state ={
		password:'',
		clicked:false,
		validated:false
	}
```

### 패스워드 바꿔주기 함수 (onChange)

```jsx
handleChange = (e) => {
	this.setState({
		password:e.target.value
	});
}
```

### 클릭이나 엔터로 진입해서 확인하는 함수

```jsx
handleButtonClick = ()=>{
	this.setState({
		clicked:true,
		validated:this.state.password ==='0000'
	})
}
```

### input에 함수 부여해주기

```jsx
render(){
	return (
		<div>
			<input
				type="password"
				value={this.state.password}
				onChange = {this.handleChange}
				className ={this.state.clicked ? 
					(this.state.validated ? 'success' : 'failure') : ''}/>
			<button onClick={this.handleButtonClick}>검증하기</button>
		</div>
	)}
```

### 클래스 부여하기

```
className ={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
```

1. 클릭이 되어 있지 않다면 클래스 이름 `''`
2. 클릭이 되어있다면? → `validated` 검사 → `true`면 `success`, `false`면 `failure`