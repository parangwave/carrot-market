import Image from "next/image"
import Link from "next/link"
import CarrotIcon from "./carrot.svg"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="my-auto flex flex-col items-center gap-3 *:font-semibold">
        <span className="flex w-full items-center justify-center">
          <Image src={CarrotIcon} alt="carrot icon" />
        </span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 오신 걸 환영합니다!</h2>
      </div>
      <div className="my-auto flex flex-col items-center gap-3">
        <Link
          href="/create-account"
          className="w-full rounded-md bg-orange-500 py-2.5 text-center text-lg font-semibold text-white transition-colors hover:bg-orange-400"
        >
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있으신가요?</span>
          <Link href="/login" className="underline-offset-2 hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}
