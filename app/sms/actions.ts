"use server"

import { z } from "zod"
import validator from "validator" // string 유효성 검사 라이브러리

const phoneSchema = z.string().trim().refine(validator.isMobilePhone)
// transform() = 값 변환
// coerce() = 타입 강제 변환
const tokenSchema = z.coerce.number().min(100000).max(999999)

export async function smsLogIn(prevState: any, formData: FormData) {
  console.log(formData.get("token")) // string
  console.log(tokenSchema.parse(formData.get("token"))) // number
}
