# 배열 (Array)

### concat

복수의 원소를 추가하는 법 (extend와 비슷?)

### unshift

배열의 첫번째 원소로 추가해주기

### splice(a,b,c)

a번위치의 값부터 b개의 값을 제거하고 c를 넣는다 .

`splice(2,0,’A’)` ⇒ li = [1,2,’A’,3,4,5]

### shift

첫번째 원소 제거

### pop

마지막 원소 제거

### sort

정렬

### reverse

역순 정렬

# 객체 (Object)

# 문자열(String)

### 뭔가를 찾고싶다

찾고 싶은 값 먼저 만들어 주기 `**/a/**`

- i를 붙이면 대소문자 구별 안한다 `/a/i`
- g를 붙이면 모든 결과를 리턴한다(여러개) `/a/g`

```
var pattern =/a/;`  ===  `new RegExp(’a’);
```

### 1. exec

`pattern.exec('abcde')` ⇒ ['a', index: 0, input: 'abcde', groups: undefined]

### 2. test

있으면 true 없으면 false 로 나오게 된다.

```
pattern.test('abcde')
```

### 3. match

문자열 먼저 사용시

```
'abcde'.match(pattern)
```

### 4. replace

패턴을 검색해서 변경한다

```
‘abcde’.replace(pattern,’A’)` → `‘Abcde’
```