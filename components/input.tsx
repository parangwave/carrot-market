import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react"

// type의 기능이 필요하기 전까지는 interface 사용을 권장함
interface IInputProps {
  // form data의 name이 안 나오는 이유 = name 적는 걸 까먹음
  name: string
  errors?: string[]
}

const _Input = (
  {
    name,
    errors = [],
    ...rest
  }: IInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
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

export default forwardRef(_Input)
