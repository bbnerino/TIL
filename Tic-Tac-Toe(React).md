# Tic Tac Toe



# 프로젝트 시작하기

```
$ yarn create react-app tic-tac-toe
```

### 순서 상관 없이 코드 하나씩 까보도록 하자!

# Square

- 기능: 값을 보여준다 (O,X,null)

```jsx
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

- 원래는 class 형으로 선언됐으나  함수형으로 바꿔주었다.
- state 없이 render 함수만을 가진다.
- class 지정하는 법은 `className`으로 한다.
- props로 value를 받아와서 값을 보여줄 수 있다.
- props로 Board에서 onClick 이라는 함수를 받아와서 사용한다.

# Board

- 기능: 값을 보여준다 (O,X,null)
  - Square을 사용해 하나하나 값을 줄 수 있다.

```jsx
class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

- Board는 아래를 render하는데
  - `this.renderSquare(0)` 이면 i가 0이고
  - 이 값을 value로 담아서 보내준다.
  - 또한 onClick에도 i번 버튼을 누른다는 것의 함수를 넘겨준다.
  - props로 square를 받아오는데 어디서 받아왔을까

# Game

- 최상위 단계

```jsx
class Game extends Component {
  constructor(props) {...}

  handleClick(i) {...}

  jumpTo(step) {...}

  render() {
    ...
    return (
      ...
    );
  }
}
```

### state 만들기

```jsx
constructor(props) {
    super(props);
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      stepNumber: 0,
      xIsNext: true
    };
  }
```

- history 사용법 : array 안에 Object 내용으로 넣어준다.

### 클릭시 내용 바꾸기

```jsx
handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
```

- history = state의 history를 stempNumber 까지 다 들고 오겠다
- current = 이 들고온 history 의 마지막 것을 가져오겠다.
- squares = `suares.slice()`  → 지정하지 않을 경우 전부 가져오기
- 우승자가 결정되거나 or square가 이미 채워져있다면 클릭을 무시한다.
- xIsNext를 통해 X가 채워질지 O가 채워질지 정한다.
- history 에 저장하는 법 concat을 이용해 새로운 배열을 만들고 그 값을 setState로 원래 history 에 넣어준다. (기본값에 영향 안주기 위해)
- stepNumber은 히스토리에 기록된 길이다.
- xIsNext = 이전의 값 반대로! O→X→O

### jumpTo

- 버튼을 누르면 이동하게 된다.

```jsx
 jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }
```

state에 있는 stepNumber 를  받아온 값으로 변경해준다 .

xIsNext는 가져온 값의 홀짝으로 찾아주게 된다.

### Render 내용

```jsx
render() {
	const history = this.state.history;
	const current = history[this.state.stepNumber];
	const winner = calculateWinner(current.squares);
	
	const moves = history.map((step, move) => {
	  const desc = move ?
	    'Go to move #' + move :
	    'Go to game start';
	  return (
	    <li key={move}>
	      <button onClick={() => this.jumpTo(move)}>{desc}</button>
	    </li>
	  );
	});
	
	let status;
	if (winner) {
	  status = "Winner: " + winner;
	} else {
	  status = "Next player: " + (this.state.xIsNext ? "X" : "O");
	}
```

- winner는 함수를 통해 누가 이겼는지 저장해준다
- history로 이동하기 버튼 (moves)
  - map을 이용해 history의 move(index) step은 squares 내용 전체
- status 상태 → winner가 정해졌으면 위너가 정해졌다고 출력

### Render 내 return 값 ( 보여주는부분)

```jsx
return (
  <div className="game">
    <div className="game-board">
      <Board
        squares={current.squares}
        onClick={i => this.handleClick(i)}
      />
    </div>
    <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
    </div>
  </div>
);
```

### 우승자 계산

```jsx
ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

- i를 하나씩 확인하면서
- squres a,b,c 의 값이 다 같다면 winner가 정해진다.
