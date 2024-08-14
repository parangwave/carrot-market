"use client"

import Input from "@/components/input"
import Button from "@/components/button"

import { useFormState } from "react-dom"
import { smsLogIn } from "./actions"

const initialState = {
  token: false,
  error: undefined,
}

// 1. 유저에게 전화번호 input만 보여주고 token 보냄
// 2. 인증번호 input을 보여줌, token 인증
export default function SMSLogin() {
  // useFormState(action to trigget, useFormState hook's initial state)
  const [state, dispatch] = useFormState(smsLogIn, initialState)

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  )
}
