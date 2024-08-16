"use client"

import { InitialProducts } from "@/app/(tabs)/products/page"
import ListProduct from "./list-product"
import { useEffect, useRef, useState } from "react"
import { getMoreProducts } from "@/app/(tabs)/products/actions"

interface ProductListProps {
  initialProducts: InitialProducts
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  // useRef -> data를 넣고 수정할 수 있는 obj 제공
  // data를 mutate -> rerender trigger X
  const trigger = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        // entries = observe하는 모든 items[]
        entries: IntersectionObserverEntry[],
        // observer = entries를 observe
        observer: IntersectionObserver
      ) => {
        // console.log(entries)
        const element = entries[0]

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current)
          setIsLoading(true)

          const newProducts = await getMoreProducts(page + 1)

          // product 있으면, page 늘림 && 이전 product를 새 product와 합칠 것
          if (newProducts.length !== 0) {
            // page 수정 -> useEffect -> observe trigger -> if trigger visible, stop to observe -> page++ -> ...
            setPage((prev) => prev + 1)
            setProducts((prev) => [...prev, ...newProducts])
          } else {
            setIsLastPage(true)
          }

          setIsLoading(false)
        }
      },
      {
        // 1.0 === trigger가 100% 표시될 때 까지 기다리고 싶다는 뜻
        // item 50% 표시된다면, IntersectionObserver는 intersecting으로 표시하지 않음
        threshold: 1.0,
        // rootMargin = IntersectionObserver가 보고 있는 container에 margin 설정
        // 최소한 버튼을 볼 수 있게 만듦
        // rootMargin: "0px 0px -100px 0px",
      }
    )
    if (trigger.current) {
      observer.observe(trigger.current)
    }
    // cleanup (when components get unmount)
    return () => {
      observer.disconnect()
    }
  }, [page])

  return (
    <div className="flex flex-col gap-5 p-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          style={{
            marginTop: `${page + 1 * 900}vh`,
          }}
          className="mx-auto mb-96 w-fit rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </div>
  )
}
