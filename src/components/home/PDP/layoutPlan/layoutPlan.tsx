"use client";

import { useState } from "react";
import type { PropertyDetailResponseType } from "@/lib/api/services/home.service";

export default function PDPLayoutPlan({ property }: { property?: PropertyDetailResponseType | null }) {
  const defaultPlans = property?.layoutPlans ?? [];
  const bhkOptions = defaultPlans.map((p) => p.unitType).filter(Boolean) as string[];
  const sizeOptions = defaultPlans.map((p) => p.area).filter(Boolean) as string[];

  const [selectedBhk, setSelectedBhk] = useState(bhkOptions[0] ?? "2 BHK");
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] ?? "");

  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto container rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between rounded-t-2xl bg-[#EEF4FF] px-6 py-4">
          <h3 className="text-[25px] font-semibold">Layout Plan</h3>

          <div className="flex items-center gap-3">
            {bhkOptions.length
              ? bhkOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedBhk(opt)}
                    className={
                      "rounded-full px-3 py-1 text-sm font-medium transition " +
                      (selectedBhk === opt
                        ? "bg-[#1C4692] text-white shadow"
                        : "bg-white text-black")
                    }
                  >
                    {opt}
                  </button>
                ))
              : (
                <div className="text-sm text-gray-500">No layouts available</div>
              )}
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {sizeOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={
                  "rounded-full px-3 py-1 text-sm font-medium transition border " +
                  (selectedSize === s
                    ? "bg-[#1C4692] text-white shadow border-[#1C4692]"
                    : "bg-white text-black border-[#F3F3F3]")
                }
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center rounded-lg bg-[#f1eff8] h-64">
            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#5b567a] shadow">
              {property?.startingPrice?.formatted ?? property?.offerPrice ?? "—"}
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <svg
                viewBox="0 0 24 24"
                className="mb-3 h-12 w-12 text-[#d7d3eb]"
                fill="currentColor"
              >
                <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
              </svg>
              <div className="text-lg font-semibold text-[#5b567a]">
                3D Top View
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {selectedBhk} {selectedSize ? `• ${selectedSize}` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
