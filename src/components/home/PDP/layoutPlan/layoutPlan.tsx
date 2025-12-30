"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { type LayoutPlan, type ConfigurationDetail } from "@/lib/api/services/home.service";

interface PDPLayoutPlanProps {
  layoutPlans: LayoutPlan[];
  configurations: ConfigurationDetail[];
}

export default function PDPLayoutPlan({ layoutPlans, configurations }: PDPLayoutPlanProps) {
  const availableBHKs = useMemo(() => {
    return configurations.map((config) => config.unitType);
  }, [configurations]);

  const [selectedBhk, setSelectedBhk] = useState(availableBHKs[0] || "");
  
  const selectedLayoutPlans = useMemo(() => {
    return layoutPlans.filter((plan) => plan.unitType === selectedBhk);
  }, [layoutPlans, selectedBhk]);

  const availableSizes = useMemo(() => {
    return selectedLayoutPlans.map((plan) => plan.area);
  }, [selectedLayoutPlans]);

  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "");

  const currentPlan = useMemo(() => {
    return selectedLayoutPlans.find((plan) => plan.area === selectedSize) || selectedLayoutPlans[0];
  }, [selectedLayoutPlans, selectedSize]);

  if (!layoutPlans || layoutPlans.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto container rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between rounded-t-2xl bg-[#EEF4FF] px-6 py-4">
          <h3 className="text-[25px] font-semibold">Layout Plan</h3>

          {availableBHKs.length > 0 && (
            <div className="flex items-center gap-3">
              {availableBHKs.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedBhk(opt);
                    const plansForBhk = layoutPlans.filter((p) => p.unitType === opt);
                    if (plansForBhk.length > 0) {
                      setSelectedSize(plansForBhk[0].area);
                    }
                  }}
                  className={
                    "rounded-full px-3 py-1 text-sm font-medium transition " +
                    (selectedBhk === opt
                      ? "bg-[#1C4692] text-white shadow"
                      : "bg-white text-black")
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-6">
          {availableSizes.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {availableSizes.map((s) => (
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
          )}

          <div className="relative flex items-center justify-center rounded-lg bg-[#f1eff8] h-64 overflow-hidden">
            {currentPlan?.image ? (
              <>
                <Image
                  src={currentPlan.image}
                  alt={`${currentPlan.unitType} - ${currentPlan.area}`}
                  fill
                  className="object-contain"
                />
                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#5b567a] shadow z-10">
                  {currentPlan.price}
                </div>
              </>
            ) : (
              <>
                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#5b567a] shadow">
                  {currentPlan?.price || "N/A"}
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
