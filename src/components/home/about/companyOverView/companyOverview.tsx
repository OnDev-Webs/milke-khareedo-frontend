"use client";

export default function CompanyOverview() {
  const features = [
    { title: "Title", desc: "Description" },
    { title: "Title", desc: "Description" },
    { title: "Title", desc: "Description" },
    { title: "Title", desc: "Description" },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-2xl font-semibold text-[#5b567a]">
          Company Overview
        </h2>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-[#5b567a]">Heading</h3>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
              hic, beatae placeat eveniet quisquam similique dolores explicabo
              sit velit nam vitae cum eum minus veritatis reiciendis voluptates
              quas commodi saepe!
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-2xl bg-[#f7f5ff] p-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebe7ff]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#c6bdf5]"
                      fill="currentColor"
                    >
                      <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                      <circle cx="9" cy="8" r="2" />
                    </svg>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#5b567a]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex h-[340px] w-full max-w-[360px] items-center justify-center rounded-4xl bg-[#f7f5ff] shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
              <svg
                viewBox="0 0 24 24"
                className="h-16 w-16 text-[#d4cfee]"
                fill="currentColor"
              >
                <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                <circle cx="9" cy="8" r="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}