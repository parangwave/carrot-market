// user가 요청을 수락하면, github는 사이트로 다시 redirect w/ code parameter
// 10분 후 만료되는 code params를 access token으로 교환
import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"
import { NextRequest } from "next/server"

// github api로부터 user profile, email을 가져올 수 있음
// user profile의 정보를 얻어옴
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  if (!code) {
    return notFound()
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString()

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })

  const { error, access_token } = await accessTokenResponse.json()
  //   error가 있으면 400
  if (error) {
    return new Response(null, {
      status: 400,
    })
  }

  // nextjs에서 get request -> 기본적으로 get requests은 nextjs의 cache에 의해 저장됨
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  })

  const { id, avatar_url, login } = await userProfileResponse.json()
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  })

  if (user) {
    const session = await getSession()
    session.id = user.id
    await session.save()
    return redirect("/profile")
  }

  const newUser = await db.user.create({
    data: {
      // newUser의 username이 이미 존재할 수도 있음
      username: login,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  })

  const session = await getSession()
  session.id = newUser.id
  await session.save()
  return redirect("/profile")
}
