"use server"

import { z } from "zod"

// zod에게 data type, limit을 설명하는 schema 제공
// len == min 5 ~ max 10
// schema에서 데이터 유효성 검사를 하고 에러를 발생 시킴
// 에러 메세지에는 form item들의 개별적인 에러가 들어가 있음
const formatSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
})

export async function createAccount(prevState: any, formData: FormData) {
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
    return result.error.flatten() // to form state -> ui
  }
}
