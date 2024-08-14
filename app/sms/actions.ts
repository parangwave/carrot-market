"use server"

import twilio from "twilio"
import crypto from "crypto"
import { z } from "zod"
import validator from "validator" // string 유효성 검사 라이브러리
import { redirect } from "next/navigation"
import db from "@/lib/db"
import getSession from "@/lib/session"

// const phoneSchema = z.string().trim().refine(validator.isMobilePhone)
const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  )

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  })

  return Boolean(exists)
}

// transform() = 값 변환
// coerce() = 타입 강제 변환
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, "This token does not exist.")

interface ActionState {
  token: boolean
}

10 * 10 * 10 * 10 * 10 * 10

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString()
  // token 중복 ? 다시 생성 or 생성했던 token
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  })

  if (exists) {
    return getToken()
  } else {
    return token
  }
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone")
  const token = formData.get("token")

  // when user send phone number to us
  // (prevState.token === false) == when user put only phone number
  if (!prevState.token) {
    // result = zod가 phone값을 parse할 때 전달하는 값
    // error나 data를 가지고 있을 수 있는 obj
    const result = await phoneSchema.spa(phone)

    if (!result.success) {
      // whatever we return, it becomes state in useFormState
      return {
        token: false,
        error: result.error.flatten(),
      }
    } else {
      // delete prev token
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      })

      // create token
      const token = await getToken()

      await db.sMSToken.create({
        data: {
          token,
          user: {
            // token을 이미 존재하는 user에게 연결
            // user 존재 x, new user
            // connectOrCreate -> phone이 user가 입력란에 적어 보낸 전화번호와 같은 user 찾음
            // 없으면 new user 생성
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
      })

      // send the token using twilio
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      )

      await client.messages.create({
        body: `Your Karrot verification code is: ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: process.env.MY_PHONE_NUMBER!,
      })

      return {
        token: true,
      }
    }
    // when user send phone number to us
  } else {
    const result = await tokenSchema.spa(token)

    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      }
    } else {
      // get the userId of token
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      })

      // log the user in
      const session = await getSession()
      session.id = token!.userId
      await session.save()
      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      })
      redirect("/profile")
    }
  }
}
