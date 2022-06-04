# URL 의 흐름

### 웹 브라우저에 주소를 입력하면?

`https://naver.com/search?q=hihi`

1. 먼저 [`naver.com`](http://naver.com) 에 해당하는 DNS서버를 조회하여 IP 정보를 얻어옵니다. 
2. 또한 생략된 포트 번호 여기선 https 이기 떄문에 443을 찾아내 http 요청 메시지를 생성합니다.
3. 요청을 보내기 전에 먼저 **소켓 라이브러리**를 통해 IP와 포트정보를 사용해 연결을 합니다.

### http 요청 메시지

요청 메시지가 전송 꼐층에 전달되어 TCP 헤더가 붙게 되고

네트워크 계층에 전달되어 IP 헤더가 붙게 된다 

```jsx
GET/search?q=hi HTTP/1.1
Host:www.naver.com
```

 

브라우저는 만들어진 **패킷**을 서버에 전달하고 , 

서버는 받은 패킷으로 해석을 하고 요청을 처리합니다.

처리된 결과를 통해 HTTP 응답 메시지를 생성하고 브라우저와 같이 헤더를 붙여 패킷을 만듭니다.

### http 응답 메시지

```jsx
HTTP/1.1 200 OK
Content-Type :text/html;charset =UTF-8
<html>
	<body>....</body>
</html>
```

이렇게 만들어진 응답 메시지를 다시 브라우저에 전송하게 되고 브라우저는 해당 패킷을 해석해 HTML을 화면에 렌더링 해줍니다.