import Image from "next/image"
import Link from "next/link"

interface ListProductProps {
  title: string
  price: number
  created_at: Date
  photo: string
  id: number
}

export default function ListProduct({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div>
        {/* image 크기 지정 필요 */}
        {/* Layout shift를 방지하는 방법으로 NextJs가 기본적으로 image에 대한 일종의 placeholder를 생성하기 때문 */}
        {/* image loading을 optimize할 것이고 placeholder 생성 */}
        {/* 그래서 component or image 주변의 content 위치는 바뀌지 않음 */}
        <Image width={200} height={200} src={photo} alt={title} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg text-white">{title}</p>
        <p className="text-sm text-neutral-400">{created_at.toString()}</p>
        <p className="text-lg font-semibold text-white">{price}</p>
      </div>
    </Link>
  )
}
