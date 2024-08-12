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

// middleware를 특정 페이지에서만 실행되도록 하는 법
// 즉, 특정 request에서 실행되지 않도록
// 함수 이름은 반드시 middleware
export async function middleware(request: NextRequest) {
  console.log("hello")

  //   const pathname = request.nextUrl.pathname
  //   if (pathname === "/") {
  //     // user에게 실제로 제공할 response를 가져옴
  //     const response = NextResponse.next()
  //     response.cookies.set("middleware-cookie", "hello!")
  //     return response
  //   }
  //   if (pathname === "/profile") {
  //     return NextResponse.redirect(new URL("/", request.url))
  //   }
}

// cookie 설정하는 법
// user가 특정 행동을 하거나, 특정 페이지로 이동할 때를 위해 cookie 설정하고 싶을 때 有
// 이름은 반드시 config
export const config = {
  // user로 시작하는 모든 단일 url === "/user/:path*"
  //   matcher: ["/", "/profile", "/create-account", "/user/:path*"],
  //  api로 시작 or _next/static로 시작 or _next/image로 시작 or favicon.ico
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  //   쉽게 말해 miising안 header들이 없을 때 middleware 실행
  //   프레임워크가 prefetching을 수행할 때 프레임워크에 의해 설정되는 header
  //   missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
}
