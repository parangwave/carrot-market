// user가 요청을 수락하면, github는 사이트로 다시 redirect w/ code parameter
// 10분 후 만료되는 code params를 access token으로 교환

import { notFound } from "next/navigation"
import { NextRequest } from "next/server"

// github api로부터 user profile, email을 가져올 수 있음
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

  const accessTokenData = await accessTokenResponse.json()
  //   error가 있으면 400
  if ("error" in accessTokenData) {
    return new Response(null, {
      status: 400,
    })
  }
  return Response.json({ accessTokenData })
}
