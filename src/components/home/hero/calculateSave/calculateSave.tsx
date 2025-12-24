"use client";

export default function CalculateSave() {
  return (
    <section className="w-full bg-[#383331] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-[32px] bg-white p-6 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">

          <div className="grid gap-8 md:grid-cols-2">
            {/* ================= LEFT SIDE ================= */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div
                  className="relative flex flex-shrink-0 h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full"
                  style={{
                    background: "conic-gradient(#38BA50 0% 75%, #FFA322 75% 100%)",
                  }}>
                  <div className="flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full bg-white text-center shadow-sm">
                    <p className="text-base sm:text-lg font-bold text-gray-700">₹ 10,500</p>
                    <p className="text-xs text-gray-500">Your Monthly EMI</p>
                  </div>
                </div>

                <div className="flex-1 w-full md:w-auto">
                  <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-gray-700">
                    Calculated EMI Result
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-4 sm:gap-6">
                      <p className="flex items-center gap-2 font-medium text-[#38BA50]">
                        <span>●</span> Principal Amount
                      </p>
                      <span className="font-semibold text-gray-700 text-sm sm:text-base">₹ 10,500.00</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:gap-6">
                      <p className="flex items-center gap-2 font-medium text-[#FFA322]">
                        <span>●</span> Total Interest
                      </p>
                      <span className="font-semibold text-gray-700 text-sm sm:text-base">+ ₹ 850.00</span>
                    </div>
                  </div>
                  <div className="my-3 sm:my-4 h-px w-full bg-gray-200" />
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-700">
                      ₹ 10,850.00
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-12 sm:gap-20">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400">
                    ←
                  </button>
                  <p className="text-base sm:text-lg font-semibold text-gray-700">9.5%</p>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-400">
                    →
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="inline-block h-4 w-4 rounded-full border border-gray-300" />
                  <p>Credit Union</p>
                  <span className="inline-block h-4 w-4 rounded-full border border-gray-300" />
                </div>
              </div>

            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6">
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">
                    Loan Amount
                  </h4>
                  <div className="relative inline-block w-full sm:w-40">
                    <select
                      className="w-full appearance-none rounded border border-gray-300 bg-[#F2F6FF] py-1 px-2 text-sm text-gray-500 focus:outline-none focus:border-[#FF765E]"
                      defaultValue="INR">
                      <option value="CRORE">₹ 10.2 Crore | GBP</option>
                      <option value="INR">₹ 10,00,000 | GBP</option>
                      <option value="GBP">£ 850,000 | GBP</option>
                      <option value="USD">$ 1,200,000 | GBP</option>
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative h-4 sm:h-6 w-full rounded-full bg-gray-200 mt-2">
                  <div className="h-4 sm:h-6 w-1/2 rounded-full bg-[#FF765E]" />
                </div>

                <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm text-gray-400">
                  <span>1K</span>
                  <span>10K</span>
                  <span>50K</span>
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6">
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">
                    Rate of Interest <span className="text-[10px]">(%P.A)</span>
                  </h4>
                  <button className="bg-[#F2F6FF] font-semibold px-2 py-1 text-[#FF765E] text-sm sm:text-base">8.7%</button>
                </div>

                <div className="relative h-4 sm:h-6 w-full rounded-full bg-gray-200 mt-2">
                  <div className="h-4 sm:h-6 w-1/3 rounded-full bg-[#FF765E]" />
                </div>

                <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm text-gray-400">
                  <span>7%</span>
                  <span>8%</span>
                  <span>9%</span>
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6">
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Loan Tenure</h4>
                  <button className="bg-[#F2F6FF] px-2 py-1 text-[#FF765E] font-semibold text-sm sm:text-base"><span>30</span> Months</button>
                </div>

                <div className="relative h-4 sm:h-6 w-full rounded-full bg-gray-200 mt-2">
                  <div className="h-4 sm:h-6 w-2/3 rounded-full bg-[#FF765E]" />
                </div>

                <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm text-gray-400">
                  <span>12m</span>
                  <span>24m</span>
                  <span>36m</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-400">
                <span>💡</span>
                <p>
                  Calculated EMI result is indicative only.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="rounded-full border px-6 py-3 text-sm font-semibold text-gray-600 w-full sm:w-auto">
                  Reset
                </button>
                <button className="rounded-full bg-[#FF765E] px-6 py-3 text-sm font-semibold text-white w-full sm:w-auto">
                  Get a Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
