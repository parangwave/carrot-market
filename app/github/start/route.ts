// route 파일로 url의 특정 http method handler를 만들 수 잇다는 것을 기억하자
// === API route를 만드는 것. react나 html를 return하고 싶지 않을 때 route.ts를 사용함
export function GET() {
  // github에 신원 요청
  const baseURL = "https://github.com/login/oauth/authorize"
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    // scope** === github에게 우리가 user로부터 원하는 데이터가 무엇인지 알려줌
    // 다른 서비스에선 scope이라고 부르지 않은 ex. permission in facebook
    scope: "read:user,user:email",
    // 가입하지 않은 user도 가입과 동시에 허용
    allow_signup: "true",
  }
  const formattedParams = new URLSearchParams(params).toString()
  const finalUrl = `${baseURL}?${formattedParams}`
  return Response.redirect(finalUrl)
}
