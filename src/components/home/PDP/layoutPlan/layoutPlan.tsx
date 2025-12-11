"use client";

import { useState } from "react";

const data = ["1 BHK", "2 BHK", "3 BHK"];
const size = ["3062 Sq.Ft", "2520 Sq.Ft"];

export default function PDPLayoutPlan() {
  const [selectedBhk, setSelectedBhk] = useState("2 BHK");
  const [selectedSize, setSelectedSize] = useState(size[0]);

  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto max-w-300 rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between rounded-t-2xl bg-gray-200/80 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">Layout Plan</h3>

          <div className="flex items-center gap-3">
            {data.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedBhk(opt)}
                className={
                  "rounded-full px-3 py-1 text-sm font-medium transition " +
                  (selectedBhk === opt
                    ? "bg-gray-900 text-white shadow"
                    : "bg-gray-100 text-gray-700")
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {size.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={
                  "rounded-full px-3 py-1 text-sm font-medium transition " +
                  (selectedSize === s
                    ? "bg-gray-900 text-white shadow"
                    : "bg-gray-100 text-gray-700")
                }
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative flex items-center justify-center rounded-lg bg-[#f1eff8] h-64">
            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#5b567a] shadow">
              ₹ 48 Lakhs
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
                {selectedBhk} • {selectedSize}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}