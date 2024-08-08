"use server"

import { z } from "zod"
import validator from "validator" // string 유효성 검사 라이브러리
import { redirect } from "next/navigation"

// const phoneSchema = z.string().trim().refine(validator.isMobilePhone)
const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  )

// transform() = 값 변환
// coerce() = 타입 강제 변환
const tokenSchema = z.coerce.number().min(100000).max(999999)

interface ActionState {
  token: boolean
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone")
  const token = formData.get("token")

  // (prevState.token === false) == when user put only phone number
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone)

    if (!result.success) {
      // whatever we return, it becomes state in useFormState
      return {
        token: false,
        error: result.error.flatten(),
      }
    } else {
      return {
        token: true,
      }
    }
  } else {
    const result = tokenSchema.safeParse(token)

    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      }
    } else {
      redirect("/")
    }
  }
}
