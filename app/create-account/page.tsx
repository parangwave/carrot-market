"use client"

// components
// w/ import alias "@/"
import Input from "@/components/input"
import Button from "@/components/button"
import SocialLogin from "@/components/social-login"

import { createAccount } from "./actions"
import { useFormState } from "react-dom"

export default function CreateAccount() {
  // ts auto knows [ createAccout action's return value === zod's flattenError type ]
  const [state, dispatch] = useFormState(createAccount, null)

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-semibold">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          // errors = string arr || null
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          minLength={4}
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={4}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          minLength={4}
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  )
}
