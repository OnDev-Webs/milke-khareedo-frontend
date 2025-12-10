"use client";

const steps = [
  {
    title: "Heading",
    desc: "description description",
  },
  {
    title: "Heading",
    desc: "description description",
  },
  {
    title: "Heading",
    desc: "description description",
  },
  {
    title: "Heading",
    desc: "description description",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto w-300">
        <h2 className="mb-12 text-center text-2xl font-semibold text-[#5b567a]">
          How It Works
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-6 flex h-44 w-full max-w-[220px] items-center justify-center rounded-[28px] bg-[#f7f5ff]">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10 text-[#d4cfee]"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-[#5b567a]">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-gray-400 text-center">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}