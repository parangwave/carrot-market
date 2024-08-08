import { InputHTMLAttributes } from "react"

// type의 기능이 필요하기 전까지는 interface 사용을 권장함
interface IInputProps {
  // form data의 name이 안 나오는 이유 = name 적는 걸 까먹음
  name: string
  errors?: string[]
}

export default function Input({
  name,
  errors = [],
  ...rest
  // FormInput이 props 뿐만 아니라 input이 받을 수 있는 모든 attrs도 props로 받을 수 있다고 ts에게 알려주기
  // ex. max, min, maxLength, minLength ...
}: IInputProps & InputHTMLAttributes<HTMLInputElement>) {
  // console.log(rest)

  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="h-10 w-full rounded-md border-none bg-transparent ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-400">
          {error}
        </span>
      ))}
    </div>
  )
}
