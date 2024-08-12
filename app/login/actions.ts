"use server"

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants"
import { z } from "zod"
import bcrypt from "bcrypt"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { redirect } from "next/navigation"

// find a user w/ email
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  })
  // if (user) {
  //   return true
  // } else {
  //   return false
  // }
  return Boolean(user)
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exist"),
  password: z.string({
    required_error: "Password is required",
  }),
  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
})

export async function logIn(prevState: any, formData: FormData) {
  // nextjs create route-handler for POST method automatically
  // auto sending data for BE
  // need name in input to get data from form (network>payload)
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const result = await formSchema.spa(data)

  if (!result.success) {
    return result.error.flatten()
  } else {
    // find a user w/ email => checkEmailExists
    //  if the user is found, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    })
    // compare(plain txt, hash) -> check if possible to change password to hash in db
    // always return false b/c "xxxx" is not available hash val
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    )

    if (ok) {
      // log the user in
      const session = await getSession()
      session.id = user!.id
      await session.save()
      // redirect "/profile"
      redirect("/profile")
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ["Wrong password"],
        },
      }
    }
  }
}
