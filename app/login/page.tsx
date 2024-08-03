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
    console.log(formData.get("email"), formData.get("password"))
    console.log("i run in the server!!")
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
        <FormButton loading={false} text="Login" />
      </form>
      <SocialLogin />
    </div>
  )
}
