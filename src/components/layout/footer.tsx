"use client";

export default function FooterSection() {
  return (
    <section className="relative bg-[#d9d9dd] py-20">
      <div className="mx-auto flex w-300 flex-col gap-12 md:flex-row">
        <div className="w-full md:w-4/12">
          <h2 className="text-2xl font-semibold text-gray-700">Logo</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            doloribus iste iusto nam dolores. Maxime corporis inventore
            excepturi magnam hic?Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolorem, id!
          </p>

          <div className="mt-6 flex gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f0f0f2] shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-gray-400"
                  fill="currentColor"
                >
                  <path d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-3.33 0-6 1.34-6 3v1h12v-1c0-1.66-2.67-3-6-3z" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-8/12">
          <div className="mb-6 flex flex-wrap gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-5 flex-1 rounded bg-[#ececf0] md:max-w-50"
              />
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-4 rounded bg-[#ececf0]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
