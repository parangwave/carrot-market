export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-100 md:bg-orange-100 lg:bg-green-100 xl:bg-cyan-100 2xl:bg-purple-100 dark:bg-gray-700">
      <div className="flex w-full max-w-screen-sm flex-col gap-2 rounded-3xl bg-white p-5 shadow-lg ring ring-transparent transition-shadow *:outline-none has-[.peer]:bg-green-100 has-[:invalid]:ring has-[:invalid]:ring-red-100 md:flex-row dark:bg-gray-600">
        <input
          type="email"
          placeholder="Email Address"
          required
          className="peer h-12 w-full rounded-full bg-gray-200 py-3 pl-5 ring ring-transparent transition-shadow placeholder:font-medium placeholder:drop-shadow invalid:bg-red-100 focus:ring-green-500 focus:ring-offset-2 invalid:focus:ring-red-500"
        />
        <span className="hidden font-medium text-red-500 peer-invalid:block">
          Email is required
        </span>
        <button className="rounded-full bg-black py-2 font-medium text-white outline-none transition-transform active:scale-90 md:px-10">
          Login
        </button>
      </div>
    </main>
  )
}
