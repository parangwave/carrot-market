"use client"

// components
// w/ import alias "@/"
import FormInput from "@/components/form-input"
import FormButton from "@/components/form-btn"
import SocialLogin from "@/components/social-login"
import { handleForm } from "./actions"
import { useFormState } from "react-dom"

export default function Login() {
  // useActionState: [action의 결과, action을 실행하는 트리거]를 제공함
  // action을 호출 -> formData & 이전에 반환한 state (or 초기에 설정한 state)와 같이 실행
  // =>  handleForm을 실행 & action의 return값을 state로
  // 원래 error:string을 return
  // const [state, action] = useFormState(handleForm, {
  //   potato: 1,
  // } as any)
  const [state, action] = useFormState(handleForm, null)

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-semibold">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with email & password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  )
}
