"use client";

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto w-300">
        <h2 className="mb-10 text-center text-2xl font-semibold text-[#5b567a]">
          About
        </h2>

        <div className="grid items-center gap-10 grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="relative h-[360px] w-full max-w-[260px] rounded-4xl bg-[#f7f5ff] ">
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#e3ddff] shadow">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>

              <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ebe7ff]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-[#c6bdf5]"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-[#6b6491]">
                  Intro Video
                </p>
              </div>

              <div className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#e3ddff] shadow">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#5b567a]">
              Your Home Buying Journey
            </h3>
            <p className="mt-3 max-w-md text-sm text-gray-500 md:mt-4">
              description description description description description
              description description description
            </p>

            <button className="mt-6 rounded-full border border-gray-400 px-10 py-3 text-sm font-semibold text-gray-600">
              Button
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
