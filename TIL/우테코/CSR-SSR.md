# CSR 과 SSR

| CSR 과 SSR 에 대한 기본 개념에 대해 알아보겠습니다.
| CSR과 SSR에 대해서 알아보기에 앞서서는 SPA와 MPA 의 개념부터 알아야 합니다.

# SPA

- react,vue

하나의 페이지로 구성된 웹 어플리케이션

# MPA

- php, jsp

Multi Page Application의 약자로 탭을 이동할 때마다, 서버로부터 새로운 html을 새로 받아와서 페이지를 새로 렌더링 하는 어플리케이션

AJAX 의 등장 이후 부터는 SPA가 대세가 되었습니다.

# CSR SSR

SPA 에서는 대부분 렌더링 방식으로 CSR을 사용합니다.

- 웹 어플리케이션에 필요한 정적 리소스를 한번에 다운로드 합니다.
- 새로운 페이지 요청에는 클라이언트에서 페이지를 갱신합니다.

MPA 에서는 렌더링 방식으로 SSR을 사용합니다.

- 새로운 요청이 있을 때마다 정적 리소스를 받습니다.

위에서 대부분 이라고 한 이유는 SPA와 CSR, MPA 와 SSR 은 다른 개념이기 때문입니다.
왜 그럴까요? 계속 확인해보겠습니다.

# SSG 과 SSR

Static Site Generation (static rendering)
서버에서 정적 HTML을 보내준다는 측면에서는 SSR과 비슷하지만,
**언제 만들어 주느냐**의 차이가 있습니다.

- SSR
  요청 시 서버에서 즉시 만들어서 제공합니다.
  미리 만들어두기 어려운 페이지에 적합합니다.

- SSG
  페이지를 전부 먼저 만들어둔 뒤 요청 시에 해당 페이지를 응답합니다.
  바뀔 일이 없기 때문에 캐싱해두면 좋습니다.

# CSR 과정과 특징

1. 웹사이트를 방문합니다.
2. 콘텐츠를 요청합니다.
3. 빈 뼈대 HTML과 연결된 JS 링크를 받습니다.
4. JS를 다운로드 후 동적 DOM을 생성합니다.

- JS 전체를 다운로드 받아야 하기 때문에 초기 로딩 속도가 느립니다
- 이후 구동 속도는 빠릅니다.

- 서버는 빈 페이지만 주면 되기 때문에 서버 부하가 적습니다.
- 반응속도가 빠르고 화면 깜빡임이 없어 UX가 우수하다는 장점이 있습니다.

- 하지만 빈 페이지만을 가지고 있기 때문에, SEO에 불리하다는 큰 단점이 있습니다.

# SSR 과정과 특징

1. 웹사이트를 방문합니다.
2. 콘텐츠를 요청합니다.
3. 렌더링 준비를 마친 HTML를 CSS 까지 모두 적용해서 JS 코드와 함께 응답으로 전달합니다.
4. HTML를 렌더하고, JS 로직을 연결합니다.

- 모든 내용이 담겨있는 HTML 을 반환하기 때문에, 검색엔진 최적화에 유리합니다.
- 사용자가 JS 코드를 다운로드 받고 실행하기 전에, 사용자가 화면을 볼 수 있습니다.
  - 초기 구동 속도가 빠르지만,그 사이 구동은 하지 않기 때문에 장단점이 존재합니다.
  - TTV (Time To View) 와 TTI (Time To Interactive ) 사이의 시간이 존재합니다.
- 서버에서 html을 그려서 보내기 때문에 서버 부하가 생길 수 있습니다.

# CSR 단점 보완

### 초기 로딩 속도를 보완

- code splitting
- tree shaking
- chunk 분리
  등으로 초기 DOM 생성 속도를 줄이면, 초기 로딩 속도를 보완할 수 있습니다.

### SEO 개선

- pre-rendering

라이브러리나 웹팩 플러그인을 이용해서 웹 페이지에 따른 HTML을 미리 생성해둔 뒤 서버에서 요청하는 자가 크롤러일 경우 제공하는 방법이 있습니다.

# SSG, SSR 도입

- node.js 를 이용해 별도의 서버를 직접 운영하는 방법이 있습니다.
- Next.js 프레임 워크를 이용해 SSR, SSG, CSR 을 사용 가능합니다.

초기 렌더링은 SSR을 사용하고, 그 이후에는 CSR을 사용할 수도 있습니다.

# 정리

어떤 것이 좋다라고 할 수 없고, 서비스의 성격에 따라 방법을 맞춰 써야 합니다.
사용자와의 상호작용이 많고, 고객의 개인정보 데이터 위주의 서비스라면, SEO는 중요하지 않기 때문에 CSR이 더 좋은 방식이라고 할 수 있습니다.

회사 홈페이지가 상위에 노출되어야 하고, 업데이트가 필요할 시 SSR
업데이트 없이 누구에게나 같은 내용을 보여준다면, SSG 를 이용하는 것이 좋습니다.

빠른 인터랙션과 화면 깜빡임이 없고, 검색엔진 최적화도 해야한다면, CSR + SSR을 이용하는 것이 좋습니다.

참고 : https://www.youtube.com/watch?v=YuqB8D6eCKE&list=PLgXGHBqgT2TvpJ_p9L_yZKPifgdBOzdVH&index=200
