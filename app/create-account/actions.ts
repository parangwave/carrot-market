"use server"

import { z } from "zod"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants"

import db from "@/lib/db"
import getSession from "@/lib/session"

const checkUsername = (username: string) => !username.includes("potato")
const checkPasswordSame = ({
  password,
  confirm_password,
}: {
  password: string
  confirm_password: string
}) => password === confirm_password

// zod에게 data type, limit을 설명하는 schema 제공
// len == min 5 ~ max 10
// schema에서 데이터 유효성 검사를 하고 에러를 발생 시킴
// 에러 메세지에는 form item들의 개별적인 에러가 들어가 있음
const formatSchema = z
  .object({
    // z.string() == username is required
    // z.string().optional() == username is optional
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .trim()
      .toLowerCase()
      // 1st arg = validate / refine / transform할 항목
      // 2nd arg = return하는 최종 결과
      // refine 함수는 실행 결과로 true / false가 필요함
      .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  // superRefine
  // obj를 refine 할 때는 그 obj의 data를 여기로 {} 가져옴
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    })
    if (user) {
      // zod doesn't know what field occurs an error
      // so mv error to formErrors
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        // no run other refinements
        fatal: true,
      })
      // cease refinement right away
      return z.NEVER
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    })
    if (user) {
      // zod doesn't know what field occurs an error
      // so mv error to formErrors
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        // no run other refinements
        fatal: true,
      })
      // cease refinement right away
      return z.NEVER
    }
  })
  .refine(checkPasswordSame, {
    message: "Both poasswords must be same!",
    path: ["confirm_password"],
  })

export async function createAccount(prevState: any, formData: FormData) {
  // 검증하기 위해 생성한 obj, never touch it again
  // b/c 검증되지 않음 && 방금 추가된 transformer에 의해 변환되지 않음
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  }
  // parse() throws error -> try-catch
  // safeParse() X throws error
  // zod가 모든 refine 함수에 대해 await하도록 하고 싶다면, safeParseSync 쓰기
  const result = await formatSchema.spa(data)
  if (!result.success) {
    // flatten()은 축소된 error obj
    // unless flatten(), big error obj
    console.log(result.error.flatten())
    return result.error.flatten() // to form state -> ui
  } else {
    // hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12)

    // save the user to db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    })
    // log the user in
    // iron-session은 delicious-karrot이라는 쿠키를 가져오거나 쿠키를 가지고 있지 않다면 생성함
    // cookie안 data를 저장하고 cookie 저장 후, iron-session도 이 데이터를 암호화함
    // 즉, 사용자가 쿠키의 정보를 수정할 수 없도록 함
    const session = await getSession()
    //@ts-ignore
    // save data in session
    // 사용자가 로그인 상태인지 알고 싶다면, getSession으로 session에 id가 있는 지 검사
    session.id = user.id
    await session.save()
    // redirect "/home"
    redirect("/profile")
  }
}
