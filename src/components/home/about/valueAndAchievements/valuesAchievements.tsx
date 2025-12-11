"use client";

const items = [
  {
    id: 1,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 2,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 3,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 4,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 5,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 6,
    title: "Heading",
    desc: "description description description description description description description",
  },
];

export default function ValuesAchievements() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center leading-12 font-bold text-4xl text-heading-secondary-text">
          Values &amp; Achievements
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-stretch rounded-3xl bg-[#dcdce3] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="mr-4 flex h-24 w-24 shrink-0 items-center justify-center rounded-[18px] bg-[#f2f2f8]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-[#c9c4e0]"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>

              <div className="flex flex-col justify-center">
                <h3 className=" leading-12 font-bold text-4xl text-heading-secondary-text">{item.title}</h3>
                <p className="mt-2 text-xl font-normal text-heading-secondary-muted-text leading-8">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}