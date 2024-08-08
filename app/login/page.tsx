"use client"

// components
import Input from "@/components/input"
import Button from "@/components/button"
import SocialLogin from "@/components/social-login"

import { logIn } from "./actions"
import { PASSWORD_MIN_LENGTH } from "@/lib/constants"

import { useFormState } from "react-dom"

export default function Login() {
  // useActionState: [action의 결과, action을 실행하는 트리거]를 제공함
  // action을 호출 -> formData & 이전에 반환한 state (or 초기에 설정한 state)와 같이 실행
  // =>  handleForm을 실행 & action의 return값을 state로
  // 원래 error:string을 return
  // const [state, action] = useFormState(handleForm, {
  //   potato: 1,
  // } as any)
  const [state, dispatch] = useFormState(logIn, null)

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-semibold">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with email & password</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>
      <SocialLogin />
    </div>
  )
}
