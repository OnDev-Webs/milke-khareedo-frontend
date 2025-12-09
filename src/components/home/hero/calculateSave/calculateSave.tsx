"use client";

export default function CalculateSave() {
  return (
    <section className="w-full bg-[#e0e0e0] py-16">
      <div className="mx-auto max-w-6xl px-4">
        
        <h2 className="mb-12 text-center text-2xl font-semibold text-[#5b567a]">
          Calculate how Much Can You Save?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          
          <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
            <h3 className="text-lg font-semibold text-gray-700">
              Body Text
            </h3>
            <p className="mt-1 text-sm text-gray-400">Sub Text</p>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-lg font-semibold text-gray-700">
                  Body Text
                </h4>
                <div className="h-6 w-full rounded bg-[#eee]" />
              </div>

              <div>
                <h4 className="mb-2 text-lg font-semibold text-gray-700">
                  Body Text
                </h4>
                <div className="h-6 w-full rounded bg-[#eee]" />
              </div>

              <button className="mt-4 rounded-full border border-gray-400 px-8 py-3 text-sm font-semibold text-gray-600">
                Button
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-[28px] bg-white px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
          
          <h3 className="text-lg font-semibold text-gray-600">
            Location
          </h3>

          <div className="flex gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-md bg-[#ededf0] shadow"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-gray-400"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}