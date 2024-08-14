import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"

async function getUser() {
  const session = await getSession()
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    })
    if (user) {
      return user
    }
  }
  // trigger notFound response
  notFound()
}

export default async function Profile() {
  // get user data
  const user = await getUser()
  // server action for form
  const logOut = async () => {
    "use server"
    const session = await getSession()
    await session.destroy()
    redirect("/")
  }

  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logOut}>
        <button>Log out</button>
        {/* <input type="submit" value="Log out" /> */}
      </form>
    </div>
  )
}
