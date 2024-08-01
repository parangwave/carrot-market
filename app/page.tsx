export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-red-100 p-5 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100">
      <div className="flex w-full max-w-screen-sm flex-col gap-4 rounded-3xl bg-white p-5 shadow-lg">
        <div className="group flex flex-col">
          <input />
          <h1 className="text-bigger-hello">hello world</h1>
          <a href="#">aaaa</a>
          <button className="btn">Submit</button>
        </div>
      </div>
    </main>
  )
}
