// components
// w/ import alias "@/"
import FormInput from "@/components/form-input"
import FormButton from "@/components/form-btn"
import SocialLogin from "@/components/social-login"

export default function Login() {
  const handleForm = async (formData: FormData) => {
    // nextjs create route-handler for POST method automatically
    // auto sending data for BE
    // need name in input to get data from form (network>payload)
    "use server"
    // 사용자가 계속 클릭해서 race condition에 들어가는 것을 방지함
    // 1. 사용자에게 이 server action이 시간이 좀 걸린다는 것을 알려줌
    // 2. 버튼을 비활성화
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log("logged in!")
  }

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-semibold">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with email & password</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
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
          errors={[]}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  )
}
