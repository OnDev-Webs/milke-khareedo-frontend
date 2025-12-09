"use client";

const cards = [
    { id: 1, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 2, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 3, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 4, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 5, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 6, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 7, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 8, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
    { id: 9, title: "Body Text", subtitle: "Sub Text", cta: "Button" },
];

export default function CardsSection() {
  return (
    <section className="w-full bg-[#f7f7f9] py-25">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-4 w-16 rounded bg-[#d7d7db]" />
            ))}
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e4e8]">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white"
              fill="currentColor"
            >
              <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
              <circle cx="9" cy="8" r="2" />
            </svg>
          </div>
        </div>

        <div className="mt-2 h-px w-full bg-[#dedee2]" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center rounded-3xl bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="mb-6 flex h-52 w-full items-center justify-center rounded-xl bg-[#f5f2ff]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10 text-[#d4cdee]"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>

              <h3 className="text-base font-semibold text-gray-700">
                {card.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{card.subtitle}</p>

              <button className="mt-6 rounded-full border border-gray-400 px-12 py-3 text-sm font-semibold text-gray-600">
                {card.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="w-full text-center">

        <button className="mt-6 rounded-full border border-gray-400 px-12 py-3 text-sm font-semibold text-gray-600">
                View all
              </button>
        </div>
      </div>
    </section>
  );
}