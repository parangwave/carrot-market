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
import { redirect } from "next/dist/server/api-utils"

export async function middleware(request: NextRequest) {
  //   nextUrl === request의 string을 사용하는, 즉 일반 url의 extension
  //   console.log(request.nextUrl.pathname)

  const session = await getSession()
  console.log(session)
  //   console.log(request.cookies.getAll())

  if (request.nextUrl.pathname === "/profile") {
    // return Response.json({
    //   error: "you are not allowed here!",
    // })

    // URL(url to redirect, url base)
    return NextResponse.redirect(new URL("/", request.url))
  }
}
