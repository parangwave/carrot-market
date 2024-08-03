// must-be route.ts = api route for next
// != page.tsx (rendering react component)
// http method listen to get json data / get use somewhere

import { NextRequest } from "next/server"

// no need to check request's method
// auto GET request
export async function GET(request: NextRequest) {
  console.log(request)
  return Response.json({
    ok: true,
  })
}

// read body to get data
// NextRequest(extended from Request): procide cookies and ip, geo for authentication
export async function POST(request: NextRequest) {
  // const cookies = await request.cookies.get("")
  const data = await request.json()
  return Response.json(data)
}
