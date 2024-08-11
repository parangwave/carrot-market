"use server"

import { z } from "zod"

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants"

import db from "@/lib/db"

const checkUsername = (username: string) => !username.includes("potato")
const checkPasswordSame = ({
  password,
  confirm_password,
}: {
  password: string
  confirm_password: string
}) => password === confirm_password

// check if the email is already used
const checkUniqueUserName = async (username: string) => {
  const user = await db.user.findFirst({
    where: {
      username,
    },
    select: {
      id: true,
    },
  })
  // if userEmail exists, show an error
  return !Boolean(user)
}

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    // ask db to find these infos
    select: {
      id: true,
    },
  })
  // if user exists, show an error
  return Boolean(user) === false
}

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
      // .transform((username) => `🔥 ${username}`)
      // refine 함수는 실행 결과로 true / false가 필요함
      .refine(checkUniqueUserName, "This username is already taken"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(
        checkUniqueEmail,
        "There is an account already registered with that email."
      ),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswordSame, {
    message: "Both poasswords must be same!",
    path: ["confirm_password"],
  })
// all fields validation

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
  const result = await formatSchema.safeParseAsync(data)
  if (!result.success) {
    // flatten()은 축소된 error obj
    // unless flatten(), big error obj
    console.log(result.error.flatten())
    return result.error.flatten() // to form state -> ui
  } else {
    // hash password
    // save the user to db
    // log the user in
    // redirect "/home"
  }
}
