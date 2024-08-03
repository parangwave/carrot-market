"use server"

import { z } from "zod"

// zod에게 data type, limit을 설명하는 schema 제공
// len == min 5 ~ max 10
const usernameSchema = z.string().min(5).max(10)

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  }
  usernameSchema.parse(data.username)
}
