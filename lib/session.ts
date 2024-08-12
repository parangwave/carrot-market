import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

interface SessionContent {
  // in case no id in cookie
  id?: number
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  })
}
