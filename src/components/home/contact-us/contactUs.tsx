import AboutHero from "@/components/about/HeroAbout";

const contactMethods = [
  { label: "Address", desc: "Description" },
  { label: "Mobile No", desc: "Description" },
  { label: "Email", desc: "Description" },
];

export default function ConnectWithUs() {
  return (
    <>
      <AboutHero />
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[#5b567a]">
            Connect With Us On
          </h2>

          <div className="mb-10 flex justify-center gap-4 w-full">
            {contactMethods.map((item) => (
              <div
                key={item.label}
                className="flex min-w-[180px] h-full w-full items-center gap-3 rounded-2xl bg-[#f7f5ff] p-8"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-14 w-14 text-[#c6bdf5]"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>

                <div>
                  <p className="font-semibold text-[#5b567a] text-2xl">
                    {item.label}
                  </p>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] bg-white p-7 border border-[#d9d9d9]">
              <h3 className="font-semibold text-[#5b567a] text-2xl">Title</h3>
              <p className="mt-1 text-gray-500 ">Description</p>

              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 flex-1 rounded-full bg-[#dedde3]" />
                  <div className="h-10 flex-1 rounded-full bg-[#dedde3]" />
                </div>
                <div className="flex gap-4">
                  <div className="h-10 flex-1 rounded-full bg-[#dedde3]" />
                  <div className="h-10 flex-1 rounded-full bg-[#dedde3]" />
                </div>
                <div className="h-44 w-full rounded-2xl bg-[#dedde3]" />
              </div>

              <button className="mt-6 rounded-full border border-gray-400 px-14 py-3 text-xl font-semibold text-gray-600">
                Button
              </button>
            </div>

            <div className="flex rounded-[28px] bg-[#f7f5ff] p-7 border border-[#d9d9d9]">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="h-24 w-24 text-[#c6bdf5]"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
                <p className="font-semibold text-[#5b567a] text-4xl">Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
