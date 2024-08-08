"use server"

import { z } from "zod"

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants"

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
      .transform((username) => `🔥 ${username}`)
      .refine(checkUsername, "NO potatoes allowed"), // refine은 check func를 넣을 수 있음
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
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
  const result = formatSchema.safeParse(data)
  if (!result.success) {
    // flatten()은 축소된 error obj
    // unless flatten(), big error obj
    console.log(result.error.flatten())
    return result.error.flatten() // to form state -> ui
  } else {
    console.log(result.data)
  }
}
