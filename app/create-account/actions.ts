"use server"

import { z } from "zod"

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
      .min(3, "Way to short!!!")
      .max(10, "Too looooong")
      .refine(checkUsername, "NO potatoes allowed"), // refine은 check func를 넣을 수 있음
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswordSame, {
    message: "Both poasswords must be same!",
    path: ["confirm_password"],
  })
// all fields validation

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    // usernameeeeeee: 1, // to cause invalid_type_error
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
  }
}
