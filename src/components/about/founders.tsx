const founders = [
  {
    name: "User Name",
    role: "Co-Founder",
    desc: "description description description description description description description",
    items: [1, 2, 3],
  },
  {
    name: "User Name",
    role: "Co-Founder",
    desc: "description description description description description description description",
    items: [1, 2, 3],
  },
];

export default function Founders() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center leading-12 font-bold text-4xl text-heading-secondary-text">
          Founders
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {founders.map((founder, i) => (
            <div
              key={i}
              className="flex items-stretch rounded-2xl bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="mr-4 flex h-44 w-44 shrink-0 items-center justify-center rounded-xl bg-[#f5f3ff]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-[#cec8ea]"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className=" font-semibold text-[22px] text-heading-primary-text leading-8">
                    {founder.name}
                  </p>
                  <p className=" text-xl font-normal text-heading-secondary-muted-text leading-8">
                    {founder.role}
                  </p>
                  <p className="text-xl font-normal text-heading-secondary-muted-text leading-8">
                    {founder.desc}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  {founder?.items?.map((a) => (
                    <div
                      key={a}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0eff7]"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
