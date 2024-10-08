// request하는 src. 즉, user와 그 대상의 request 사이에서 작동함
// 임의의 코드를 실행할 수 있지만, 이후 어떤 일이 일어날 지 수정할 수 있음
// user가 원하는 곳으로 가게 허가 or 다른 곳으로 redirect
// Header를 수정 / 추가 / 삭제, cookie 확인/ 삭제 / 설정 등 많은 작업이 가능
// ex. GET /profile -> middleware() -> <Profile />
// middleware는 쉽게 말해, 내가 원하는 모든 request를 가로챌 수 있음. 심지어 static asset까지.

// 페이지를 변경할 때 마다 middleware 실행
// 웹 사이트의 모든 request 하나마다 middleware가 실행됨
// image 가져올 때, js코드를 다운로드할 때, 브라우저가 css, js 파일 등을 다운받을 때
// google의 어떤 로봇이 웹 사이트를 볼 때, favicon을 가져와야 할 때
import { NextRequest, NextResponse } from "next/server"
import getSession from "./lib/session"

interface Routes {
  [key: string]: boolean
}

//   public으로 접근 가능한 url obj === 인증되지 않은 user가 갈 수 있는 url 저장
const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
}

// middleware를 특정 페이지에서만 실행되도록 하는 법
// 즉, 특정 request에서 실행되지 않도록
// 함수 이름은 반드시 middleware
// middleware가 edge runtime에서 실행됨 (nodejs x)
// edge runtime = middleware가 모든 npm 모듈에 액세스할 수 없다는 것
// 기본적으로 nodejs 내부에서는 실행되지 x, 매우 제한된 버전의 nodejs에서 실행됨
// request에서 특정 header가 사용 가능한 middleware를 실행하지 않도록 구성할 수 있음
// ex. prefetch header는 link가 prefetch를 수행할 때 nextjs가 사용하는 것임
// edge runtime은 일종의 제한된 버전의 nodejs, nodejs API의 경량 버전
// middleware가 모든 단일 request에 대해 실행되어야 함
// npm packages === a smaller subset, prisma를 사용할 수 없는 이유
export async function middleware(request: NextRequest) {
  const session = await getSession()
  // user가 가려는 pathname을 확인함
  // 해당 pathname이, 즉 그 page가 이 obj에 존재하는 지 확인함
  // 그 결과를 exists에 Boolean값으로 저장
  // user가 이동하려는 url이나 pathname은 이 obj에 없음
  // 즉, 여기에 없는 페이지로 이동한다는 뜻 === user가 log out 상태
  const exists = publicOnlyUrls[request.nextUrl.pathname]

  //   user가 session & cookie랑 id를 가지고 있지 않다면
  if (!session.id) {
    if (!exists) {
      // user를 redirect하는 response를 return
      return NextResponse.redirect(new URL("/", request.url))
    }
  } else {
    // user가 로그인한 상태 && publicOnlyUrls로 간다면,
    // 허용 X && /products로 보낼 것
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url))
    }
  }
}

// cookie 설정하는 법
// user가 특정 행동을 하거나, 특정 페이지로 이동할 때를 위해 cookie 설정하고 싶을 때 有
// 이름은 반드시 config
export const config = {
  // user로 시작하는 모든 단일 url === "/user/:path*"
  //   matcher: ["/", "/profile", "/create-account", "/user/:path*"],
  //  api로 시작 or _next/static로 시작 or _next/image로 시작 or favicon.ico
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  //   쉽게 말해 miising안 header들이 없을 때 middleware 실행
  //   프레임워크가 prefetching을 수행할 때 프레임워크에 의해 설정되는 header
  //   missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
}
