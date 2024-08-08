"use client"

import Input from "@/components/input"
import Button from "@/components/button"

import { useFormState } from "react-dom"
import { smsLogIn } from "./actions"

// 1. 유저에게 전화번호 input만 보여주고 token 보냄
// 2. 인증번호 input을 보여줌, token 인증
export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogIn, null)

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="phone" type="number" placeholder="Phone number" required />
        <Input
          name="token"
          type="number"
          placeholder="Verification code"
          required
          min={100000}
          max={999999}
        />
        <Button text="Verify" />
      </form>
    </div>
  )
}
