![post-thumbnail](https://velog.velcdn.com/images/bbnerino/post/11131763-eaa5-490b-9d6c-f31105918af8/image.png)

`https://google.com` , `http://google.com`
매일 주소창에서 보는 http 란 무엇일까?

# HTTP 란?

------

- HTTP 는 Hypertext Transfer Protocol 의 줄임말로 www 상에서 사용하는 프로토콜입니다.
- 1990년 대 WWW를 만들어서 Hypertext 문서들을 주고 받기 위한 규약으로 만들었던 것이 http 입니다. 현재는 문서 뿐 아니라 이미지 , 비디오 , 음성 등 모든 데티어를 전송하는데 사용하고 있습니다.
- http는 서버와 클라이언트 사이에 요청과 응답을 주고 받는 '프로토콜'로 흔히 웹 주소창에 입력하는 주소인 URL을 통해 요청과 응답이 이루어 집니다.

`하이퍼텍스트` : 참조를 통해 한 문서에서 다른 문서로 즉시 접근할 수 있는 텍스트(하이퍼링크)

`프로토콜` : 사람끼리도 서로 언어가 같아야 대화가 가능하듯 컴퓨터도 서로 이해 할 수 있는 언어, 공용된 언어를 사용 해야 하는데 그 (언어 = 약속)이 프로토콜입니다.

`WWW` : 인터넷에 연결된 컴퓨터를 통해 사람들이 정보를 공유할 수 있는 가상의 공간, 하이퍼텍스트들을 인터넷 상에서 웹주소인 URL을 통해 연결 시키려고 만든 것

## HTTP 메시지 구조

------

- HTTP 메시지는 기본적으로 클라이언트가 요청하고 서버가 응답하는 구조입니다.
- 요청 / 응답에 따라 각 메시지의 구성 내용이 달라집니다.
  ![img](https://velog.velcdn.com/images/bbnerino/post/698f9e97-a03b-4e00-be76-62db3ed8d0cc/image.png)
  ![img](https://velog.velcdn.com/images/bbnerino/post/d5d2196d-bbba-4ddc-8e15-b42962d73a6e/image.png)
  `실제 HTTP 메시지 구성 예시(출처:https://developer.mozilla.org)`

## 메서드

------

- HTTP 메서드는 클라이언트가 서버에 요청의 목적을 알리는 수단입니다.

1. GET : 리소스 요청
2. POST : 서버에 내용(파일) 전송
3. PUT : 리소스 전체 수정 요청
4. DELETE : 리소스 제거 요청
5. PATCH : 리소스 부분 수정 요청
   ...

## HTTP 헤더

------

- 메시지 구조를 보면 시작줄 다음으로 HTTP 헤더가 들어갑니다.
- 요청/ 응답 헤더 , general , entity 헤더로 구분됩니다.

### 요청 헤더

![img](https://velog.velcdn.com/images/bbnerino/post/58d6c5b4-bcb3-4d7b-b7d8-310b7964a66c/image.png)

### 응답 헤더

![img](https://velog.velcdn.com/images/bbnerino/post/3ee4065f-f178-47df-bbf4-6000d5474daf/image.png)

### general 헤더

![img](https://velog.velcdn.com/images/bbnerino/post/c0e06d8f-b3d2-4544-b524-d0920c6bd65a/image.png)

### entity 헤더

![img](https://velog.velcdn.com/images/bbnerino/post/21a7dd1b-5872-4840-b6af-674fe93829e8/image.png)

## 상태코드

HTTP 상태코드는 메시지의 시작줄에 표기됩니다
요청에 대한 처리결과를 3자리 숫자로 표현합니다

```null
- 1XX : 정보성
- 2XX : 성공
- 3XX : 리다이렉션 : 클라이언트는 요청을 마치기 위해 추가 동작이 필요하다는 것
- 4XX : 클라이언트 오류 
- 5XX : 서버 오류 
```

그 중 자주 보이는 상태 코드는

`200` (성공) : 서버가 요청을 제대로 처리했다는 뜻으로 서버가 요청한 페이지를 제공했다는 의미입니다.
`201` (작성됨) : 성공적으로 요청되었으며 서버가 새 리소스를 작성했다는 뜻입니다.
`400` (잘못된 요청) : 서버가 요청의 구문을 인식하지 못했습니다.
`401` (권한없음) : 인증이 필요 => 로그인이 안되었을 경우 (authorized)
`403` (금지됨 ) : 서버에서 요청을 거부 => 인가 거부 (authentication)
`404` (찾을수 없음) : 서버에 존재하지 않는 페이지에 대한 요청이 있을 경우
`405` (메소드 문제) : 잘못된 요청 방식으로 보내는 경우 (ex.POST인데 GET으로 보내기)
`500` (내부 서버 오류) : 서버에 오류가 발생
`501` (구현되지 않음 ) : 서버에 요청을 수행할 수 있는 기능이 없을 때
`502` (게이트웨이) : 서버가 게이트웨이나 프록시 역할을 하고 있거나 잘못된 응답을 받을 경우
`503` (서비스를 사용할 수 없음) : 서버를 다운시켰을 경우나 오버로드되었을 때

## HTTPS

------

- HTTP 통신은 클라이언트와 서버간의 통신에 있어 보안조치가 없기 때문에 누군가 네트워크 신호를 가로챈다면 HTTP의 내용은 그대로 외부에 노출되게 됩니다.
- 보안상의 문제를 해결하기 위한 것이 HTTPS 입니다.

### 어떤식으로 보안 이슈를 해결하나요?

- 기존의 http 는 전송계층의 TCP 위에서 동작합니다.
- 거기에 SSL (Secure Sockets Layer)이라는 보안계층이 전송계층 위에 올립니다.
- 이렇게 보안이 보장된 통신이 HTTPS 이라고 부르며 `SSL 암호화 통신`이라고 부르기도 합니다.
- SSL 암호화 통신은 공개키 암호화 알고리즘을 통해 구현됩니다.



### 공개키 암호화 방식이란?

![img](https://velog.velcdn.com/images/bbnerino/post/0cfde458-2da3-43dc-a6ab-1ea7ae5842eb/image.png)
공개키 암호화 방식에는 공개키와 개인키 두 종류의 키가 존재합니다.
한쪽 키로 데이터를 암호화 했다면 다른쪽 키를 이용해야만 복호화를 할 수 있습니다.