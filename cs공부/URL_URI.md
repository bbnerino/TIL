# URI

Uniform Resource Identifier : 통합 자원 식별자라는 뜻을 갖는다

식별자 = 주민번호와 비슷한 의미

URL = Locator (로케이터 ) Name(이름) 으로 분류할 수 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1cc48064-4996-4dc5-81fb-88beaf3f6fda/Untitled.png)

# URL

Uniform Resource Locator, 리소스가 잇는 구체적인 위치

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a0ea3d4f-3ca7-46a9-8bca-dce8d79ac76c/Untitled.png)

- scheme :
    - 프로토콜 ( 어떤 방식으로 자원에 접근할 것인지 ) http , https  등
- authority :
    - host
        - 호스트명 , 도메인명이나 IP 주소를 직접 사용가능
    - port
        - 접속 포트 , 일반적으로는 생략 // http = 80 , https = 443
- path
    - 리소스의 경로, 계층적 구조를 갖고  있다.
- qeury
    - key=value 형태를 갖고 있다
    - ? 로 시작해 & 로 추가가 가능하다 ?name=hi & goal=hihi
    - 웹서버에 제공하는 파라미터이다.

# URN

Uniform Resource Name 리소스에 이름을 부여한 것

위의 URL은 변할 수 있지만 URN은 변하지 않는다. ⇒ 잘 사용안한다.