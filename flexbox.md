# flexbox

`display : flex` 로   flexible 하게 만들기!

# justify-content

가로선 정렬

1. start
2. end
3. center
4. space-between: 요소들 사이에 동일한 간격 주기
5. space-around : 요소들 주의에 동일한 간격 주기

# align-items

세로선 정렬

1. start
2. end
3. center
4. baseline : 컨테이너의 시작 위치에 정렬

# flex-direction

정렬할 방향 지정하기 ( column 으로 하면 가로 세로 바뀜)

1. row (기본값)
2. row-reverse
3. column : 세로 방향
4. column-reverse

# order

순서를 지정할 수 있다.

# align-self

지정된 align-items의 속성을 무시하고 개별 속성을 갖게 할 수 있다.

1. start
2. end
3. center
4. baseline : 컨테이너의 시작 위치에 정렬

# flex-wrap

flex 요소들을 한줄 또는 여러줄에 거쳐서 배치한다.

1. nowrap (기본값) : 한줄에 배치한다.
2. wrap : 여러 줄에 걸쳐 정렬한다.
3. wrap-reverse : 여러줄에 걸쳐 반대로 정렬한다.

# flex-flow

flex-direction과 flex-wrap을 한번에 사용하기

ex) `flex-flow : column wrap`

```
flex-flow : row nowrap
```

# align-content

여러 줄 사이의 간격 지정 가능

1. start
2. end
3. center
4. space-between
5. space-around
6. space-evenly