import upSvg from "@/assests/upPrice.svg"

export default function PDPHeader() {
  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];
  const selected = "2 BHK";

  return (
    <section className="w-full p-4">
      <div className="mx-auto max-w-300 rounded-2xl bg-white p-6 border border-gray-100">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900">
              Swastik Heights
            </h1>
            <p className="mt-1 text-gray-600">
              Keshvas park, New Delhi, Delhi
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {bhkOptions.map((opt) => (
                <button
                  key={opt}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    opt === selected
                      ? "bg-gray-900 text-white shadow"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div className=" text-gray-500">Target Price</div>
              <div className=" text-gray-500 text-right">
                Developer price
              </div>
            </div>

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <div className="">
                <div className="text-2xl font-bold text-gray-900">
                  ₹ 4.68 Crore
                </div>
              </div>

              <div className="text-right">
                <div className="line-through text-gray-400">
                  ₹ 5.31 Crore
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 border-t border-gray-300 pt-2">
              <div className="flex gap-2 text-gray-500 mt-1">
                <img src={upSvg.src} alt="up" />
                Up to 63.28 L off
              </div>
              <div className="mt-1 text-gray-500">
                Get upto 12% discount
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-4 flex justify-between items-center pt-4">
          <div className="">
            <span className="text-gray-600">Super area: </span>
            <span className="font-semibold text-gray-900">2260.00 sq.ft.</span>
          </div>
          <div className=" flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button className="rounded-full border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 shadow-sm">
                Button
              </button>

              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 shadow-sm"
                    title={`avatar ${i}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}