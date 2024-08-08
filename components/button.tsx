// client comp is interactive
"use client"

import { useFormStatus } from "react-dom"

interface IButtonProps {
  text: string
}

export default function Button({ text }: IButtonProps) {
  // form action을 알려주는 react hook
  // form이 pending인지 & 어떤 데이터가 전송되었는지 알려줌
  // action을 실행하는 form과 같은 곳에서 사용할 수 X, 자동적으로 부모 form 찾음
  // ⭐ form의 자식에서만 사용 가능 = form의 상태에 따라 변경하고자 하는 comp 내부
  // use client b/c made btn interactive
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-200"
    >
      {pending ? "로딩 중 ..." : text}
    </button>
  )
}
