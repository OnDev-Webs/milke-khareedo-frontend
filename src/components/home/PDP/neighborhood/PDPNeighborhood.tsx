"use client";

import svg from "@/assets/Image icon.svg";
import type { PropertyDetailResponseType } from "@/lib/api/services/home.service";

export default function PDPNeighborhood({ property }: { property?: PropertyDetailResponseType | null }) {
  return (
    <section className="w-full bg-secondary py-12">
      <div className="mx-auto flex container flex-col gap-10 max-md:px-4 md:flex-row md:items-start md:justify-between">
        <div className="w-full md:w-1/3">
          <h2 className="mb-6 font-semibold text-3xl">The Neighborhood</h2>

          <div className="space-y-3">
            {(property?.neighborhood?.connectivity
              ? Object.keys(property.neighborhood.connectivity)
              : ["schools", "hospitals", "transportation", "restaurants"]
            ).map((key) => (
              <div
                key={key}
                className="flex w-full items-center gap-4 rounded-2xl border border-primary p-5  "
              >
                <div className="flex  items-center justify-center rounded-full bg-[#f1f1f6] size-10 ">
                  <img src={svg.src} alt="" className="size-4 " />
                </div>
                <span className="text-lg text-heading-primary-text font-medium ">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className=" flex w-full items-center justify-center md:w-1/2">
          <div className="flex  h-96 w-full max-w-lg flex-col items-center justify-center rounded-[28px] bg-[#f2f3fb] ">
            <svg
              viewBox="0 0 24 24"
              className="mb-3 h-24 w-24 text-[#cdcbe6]"
              fill="currentColor"
            >
              <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
            </svg>
            <span className="text-2xl font-semibold text-[#5b567a]">Map</span>
          </div>
        </div>
      </div>
    </section>
  );
}
