# Recoil

- Global state 관리 툴

### 상태관리 ?

- 상태 : 애플리케이션의 동작 방식을 설명하는 모든 데이터
- 상태관리가 되려면 아래의 기능이 필수다
    - 최초값(initial value)를 저장
    - 현재값(cureent value)를 읽기
    - 값을 업데이트
- context Api는 확정되지 않은 수의 값을 저장하는데 적합하지 않으며, 최적화 관점에서 한계
    
    → 위의 세가지가 안되기에 상태관리라고 할 수 없다.
    

### 리코일은 왜 필요한가

- React의 내장 상태 관리 ‘기능’의 한계점 극복 → redux...
- **그 중 최대한 React스러운 Api를 유지한다.**
- reudx saga.. toolkit 등 사용하기 위한 부속 라이브러리 최소화
    - redux 는 react 외부에 존재해 라이브러리를 가져와 사용해야 하지만
    - recoil 은 직교되는 형태로 존재하기 때문에 상태 데이터를 단독으로 변경할 수 있다.

# state 선언하기

state/QuizDifficulty.ts

```jsx
import {atom } from 'recoil'

export default atom<string|undefined>({
	key :'QuizDifficulty',
	default:undefined,
})
```

### atom

- 객체를 파라미터로 받는 함수
- { key, default } 객체를 파라미터로 받는 함수
    
    key : unique 한 값
    

# state 불러오기

```jsx
const [quizDifficulty,setQuizDefficulty] = useRecoilState(
	QuizDifficultyState,
);
```

- `useRecoilState` 라는 hook을 이용해서 만들어놓은 state를 불러올 수 있다. == useState
    
    ⇒  `{key : QuizDifficulty’, default : undefined’}` 라는 파라미터를 불러온다
    

# 비동기적 요청 ⇒ state 관리

### ⇒ Selector

- 이미 선언된 atom을 구독하는 기능
    - 그 state 가 변동됨을 감지하고 selector 실행되게한다.
- 서버와 통신해서 response 데이터를 가질수 있게 한다. )

### useResetRecoilState

```jsx
const resetInitialProps = useResetRecoilState(InitialPropsState)

const handleClick = ()=>{
	resetInitialProps()
	history.push('/quiz');
}
```

state/InitialProps.ts

```jsx
export type TResponseData = {
	response_code:number;
	results:TQuiz[];
};

export defualt selector<TResponseData>({
	key:'**initialOrderState**',
	get : async({get})=>{
		const queryData = get(QueryDataState); // QueryDataState를 get을 통해서 구독을 했다.
																					//=> 이 state가 변경될 때마다 selector 재실행
// querydata가 변경될때마다 서버로부터 퀴즈데이터를 받아오는 것을 재실행 한다. 
	if (
	    queryData == undefined || // 쿼리데이터가 없으면 실행X
	    window.location.pathname != `/${QUIZ_PAGENAME}` // 퀴즈페이지가 아니여도 실행X
	  )
	      return undefined;
	const { amount, difficulty } = queryData;

	const axios = customAxios(); // 아래의 페이지에서 기본세팅
  const response = await axios({
    method: 'GET',
    params: {
      amount,
      difficulty,
      type: 'multiple',
    },
  });
const decodedResponseData = {
	~~~~~~~~~~~~~~~ 받아온 response로  새로운 데이터 만들기
}
return decodedResponseData; // 이렇게 decoding한 데이터를 다시 return 하는게 get함수
```

```jsx
set: ({ get, set }) => { 
// selector는 setstate가 기본적으로 제공되어 있지 않음
// 여기서 어떠한 값들을 지정해줘야 setState를 사용 가능
// 어떻게 setstate하라는지 명시하는 곳 => setstate를 하면 이 함수가 실행된다.

    const amount = get(QuizNumbersState);
    const difficulty = get(QuizDifficultyState);

    set(QueryDataState, { amount, difficulty });
    set(QuizNumbersState, DEFAULT_NUMBERS);
    set(QuizDifficultyState, undefined);
  },
```

### customAxios

```jsx
import axios, { AxiosRequestConfig } from 'axios';

const customAxios = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_SERVER,
  };
  return axios.create(axiosConfig);
};

export default customAxios;
```

### 

### 순서

1. state를 바꾸는 버튼을 누른다

```jsx
const resetIntialProps = useResetRecoilState(InitialPropsState);

const handleClick = () => { 
  resetIntialProps();
  history.push('/quiz');
};
```

1. InitialProps.ts 
    
    → setstate와 관련있기 때문에 initilaOrderState의 set 호출 
    
    ⇒ 퀴즈 번호, 퀴즈 난이도를 불러오고 (get) 
    
    ⇒ **QueryDataState**를 수정한다. 
    

```jsx
export default selector<TResponseData>({
  key: 'initilaOrderState',
  get: async ({ get }) => {
    ...
  },
  set: ({ get, set }) => {
    const amount = get(QuizNumbersState);
    const difficulty = get(QuizDifficultyState);

    set(QueryDataState, { amount, difficulty }); //QueryDataState 수정 =>
    set(QuizNumbersState, DEFAULT_NUMBERS); // 기본값 설정해주기
    set(QuizDifficultyState, undefined); // 기본값 설정해주기
  },
});
```

1. **QueryDataState**가 수정되었기에 

```jsx
export default selector<TResponseData>({
  key: 'initilaOrderState',
  get: async ({ get }) => { // querydatastate를 구독해놨는데 이 값이 바뀌면 실행
    const queryData = get(QueryDataState);
    if (
      queryData == undefined ||
      window.location.pathname != `/${QUIZ_PAGENAME}`
    )
      return undefined;

    const { amount, difficulty } = queryData;

    const axios = customAxios();
    const response = await axios({
      method: 'GET',
      params: {
        amount,
        difficulty,
        type: 'multiple',
      },
    });
    const decodedResponseData = {
      ...response.data,
      results: response.data.results.map((quiz: TQuiz) => {
        const decoded_correct_answer = decodeHtml(quiz.correct_answer);
        const decoded_incorrect_answers = quiz.incorrect_answers.map((answer) =>
          decodeHtml(answer),
        );
        return {
          ...quiz,
          question: decodeHtml(quiz.question),
          correct_answer: decoded_correct_answer,
          incorrect_answers: decoded_incorrect_answers,
          examples: addCorrectAnswerRandomly(
            decoded_incorrect_answers,
            decoded_correct_answer,
          ),
        };
      }),
    };
    return decodedResponseData;
  },
```

# SELECTOR 를 각 컴포넌트에서 사용하기

### Router.tsx

- Suspense라는 컴포넌트를 불러오는데 , suspense안에서 호출한 컴포넌트 중에서 비동기 데이터를 읽어오고 있으면 사용
- 로딩중일떄는 fallback안의 페이지를 보여준다.

```jsx
<BrowserRouter>
  <ErrorBoundary>
    <Suspense fallback={<ShimmerPage />}> 
      <Switch>
        <Route path={`/${QUIZ_PAGENAME}`}>
          <Helmet title="Quiz page" />
          <QuizPage />
        </Route>
        <Route path={`/${RESULT_PAGENAME}`}>
          <Helmet title="Result page" />
          <ResultsPage />
        </Route>
        <Route exact path="/">
          <Helmet title="Landing page" />
          <LandingPage />
        </Route>
      </Switch>
    </Suspense>
  </ErrorBoundary>
</BrowserRouter>
```

QuizPage.tsx

```jsx
const initialProps = **useRecoilValue**(InitialPropsState);
// 여기서 비동기로 선언한 글로벌 state를 useRecoilValue로 사용하고 있다.
```