"use client";

import type { Property } from "@/lib/api/services/home.service";

type Project = {
  id: string;
  title: string;
  location: string;
  targetPrice: string;
  developerPrice: string;
  groupSize: string;
  opening: string;
  deadline: string;
};

const sample: Project[] = [
  {
    id: "1",
    title: "Godrej South Estare",
    location: "Okla Phase, I New Delhi",
    targetPrice: "₹ 4.68 Crore",
    developerPrice: "₹ 5.31 Crore",
    groupSize: "05 Members",
    opening: "02 Left",
    deadline: "Last Day to join: 31st Jun, 2026",
  },
  {
    id: "2",
    title: "Godrej South Estare",
    location: "Okla Phase, I New Delhi",
    targetPrice: "₹ 4.68 Crore",
    developerPrice: "₹ 5.31 Crore",
    groupSize: "05 Members",
    opening: "02 Left",
    deadline: "Last Day to join: 31st Jun, 2026",
  },
  {
    id: "3",
    title: "Godrej South Estare",
    location: "Okla Phase, I New Delhi",
    targetPrice: "₹ 4.68 Crore",
    developerPrice: "₹ 5.31 Crore",
    groupSize: "05 Members",
    opening: "02 Left",
    deadline: "Last Day to join: 31st Jun, 2026",
  },
];

export default function PDPSimilarProjects({ property, similarProjectsData }: { property?: Property | null, similarProjectsData?: any[] }) {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto container">
        <h3 className="mb-6 font-semibold text-3xl">Similar Projects</h3>

        <div className="overflow-x-auto pb-4 md:overflow-visible">
          <div className="flex gap-6 px-2 md:grid md:grid-cols-3 md:gap-6 md:px-0">
            {(similarProjectsData && similarProjectsData.length ? similarProjectsData : sample).map((p: any) => (
              <article
                key={p.id}
                className="min-w-[320px] rounded-2xl bg-white p-4 shadow-[0_12px_12px_rgba(0,0,0,0.08)] md:min-w-0"
              >
                <div className="relative mb-4 rounded-xl bg-[#f6f5fb] ">
                  <div className="h-52 w-full rounded-md flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-24 w-24 text-[#d7d3eb]"
                      fill="currentColor"
                    >
                      <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                    </svg>
                  </div>

                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs text-gray-600">
                    {p.deadline}
                  </div>

                  <div className="absolute right-3 top-3 flex flex-col gap-2">
                    {[1, 2, 3].map((a) => (
                      <div
                        key={a}
                        className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-400"
                        title={`avatar ${a}`}
                      ></div>
                    ))}
                  </div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    <span className="h-1.5 w-8 rounded-full bg-gray-300" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
                  </div>
                </div>

                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">{p.location}</p>
                  </div>

                  <button className="ml-auto whitespace-nowrap rounded-full border border-gray-200 bg-white px-8 py-3 text-gray-700">
                    Call Now
                  </button>
                </div>

                <div className="mb-3 flex gap-3 w-full">
                  <div className="rounded-xl bg-[#f3f3f6] p-4 text-gray-600 w-full text-center font-semibold">
                    Group Size <div className="font-medium">{p.groupSize}</div>
                  </div>
                  <div className="rounded-xl bg-[#f3f3f6] p-4 text-gray-600 w-full text-center font-semibold">
                    Opening <div className="font-medium">{p.opening}</div>
                  </div>
                </div>

                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Target Price</p>
                    <div className="mt-1 text-xl font-semibold text-gray-900">
                      {p.targetPrice}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Up to 63.28 L off
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Developer price</p>
                    <div className="mt-1 text-base line-through text-gray-400">
                      {p.developerPrice}
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button className="mb-2 w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700">
                    Join Group
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    5 users downloaded this coupon
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
