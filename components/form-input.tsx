// type의 기능이 필요하기 전까지는 interface 사용을 권장함
interface IFormProps {
  type: string
  placeholder: string
  required: boolean
  errors: string[]
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: IFormProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="h-10 w-full rounded-md border-none bg-transparent ring-1 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-400">
          {error}
        </span>
      ))}
    </div>
  )
}
