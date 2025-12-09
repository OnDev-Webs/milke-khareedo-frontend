

export default function Hero() {
  return (
    <section className="relative w-full bg-[#e2e2e2] py-20 ">
      <div className="mx-auto max-w-6xl px-4 text-center flex flex-col items-center">
        <div className="mb-6 flex h-72 w-72 items-center justify-center rounded-3xl bg-[#f7f7fb] shadow-md">
          <svg
            viewBox="0 0 24 24"
            className="h-12 w-12 text-gray-300"
            fill="currentColor"
          >
            <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19h18z" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
          Body Text
        </h1>
        <p className="mt-2 text-gray-500 text-base">Sub Text</p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button className="rounded-full border border-gray-400 bg-white px-8 py-3 text-sm font-medium">
            Button
          </button>
          <button className="rounded-full border border-gray-400 bg-white px-8 py-3 text-sm font-medium">
            Button
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border border-white bg-gray-300"
              />
            ))}
          </div>

          <span className="text-sm font-medium text-gray-700">
            Explore 100+ Group Deals
          </span>
        </div>
      </div>

      <div className="absolute -bottom-10 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 rounded-3xl bg-white p-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex w-full items-center gap-3 rounded-xl bg-gray-200 p-4">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <path d="M21 20l-5.5-5.5a7 7 0 10-1.5 1.5L20 21zM10 15a5 5 0 110-10 5 5 0 010 10z" />
            </svg>

            <input
              placeholder="Search here"
              className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-500"
            />
          </div>

          <div className="flex w-full items-center gap-3 rounded-xl bg-gray-200 p-4">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 112.5-2.5 2.5 2.5 0 01-2.5 2.5z" />
            </svg>

            <input
              placeholder="Location"
              className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-500"
            />
          </div>

          <button className="flex h-12 w-28 items-center justify-center rounded-xl bg-gray-200">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="h-6 w-6 text-gray-500"
            >
              <path d="M21 20l-5.5-5.5a7 7 0 10-1.5 1.5L20 21z" />
            </svg>
          </button>
        </div>
      </div>
      
    </section>
  );
}
