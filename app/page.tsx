export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-100 md:bg-orange-100 lg:bg-green-100 xl:bg-cyan-100 2xl:bg-purple-100 dark:bg-gray-700">
      <div className="flex w-full max-w-screen-sm flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg dark:bg-gray-600">
        {["nico", "me", "you", "other", ""].map((person, index) => (
          // // odd:, even:
          // <div
          //   key={index}
          //   className="flex items-center gap-5 rounded-xl p-2.5 odd:bg-gray-100 even:bg-cyan-100"
          // >

          // // first:, last:
          // <div
          //   key={index}
          //   className="flex items-center gap-5 border-b-2 p-2.5 pb-5 last:border-0 last:pb-0"
          // >

          // <div key={index} className="flex items-center gap-5 *:animate-pulse">
          <div key={index} className="flex items-center gap-5">
            {/* skeleton ui */}
            {/* <div className="size-10 rounded-full bg-blue-400" />
            <div className="h-4 w-40 rounded-full bg-gray-400" />
            <div className="h-4 w-20 rounded-full bg-gray-400" /> */}
            <div className="size-10 rounded-full bg-blue-400" />
            <span className="text-lg font-medium empty:h-5 empty:w-24 empty:animate-pulse empty:rounded-full empty:bg-gray-300">
              {person}
            </span>
            <div className="relative flex size-5 items-center justify-center rounded-full bg-red-500 text-white">
              <span className="z-10">{index}</span>
              <div className="absolute size-6 animate-ping rounded-full bg-red-500" />
            </div>
            {/* <span className="animate-spin">⌛</span> */}
          </div>
        ))}
      </div>
    </main>
  )
}
