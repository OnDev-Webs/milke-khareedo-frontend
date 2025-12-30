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
          <h3 className="text-[25px] font-semibold text-gray-800">Layout Plan</h3>

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
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 " +
                    (selectedBhk === opt
                      ? "bg-[#1C4692] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50")
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
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border " +
                    (selectedSize === s
                      ? "bg-[#1C4692] text-white shadow-md border-[#1C4692]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Floor Plan Image Card with Orange Border - Exact Dimensions: 1160x400px */}
          <div 
            className="relative mx-auto rounded-lg overflow-hidden border border-orange-400 shadow-lg bg-white"
            style={{ 
              width: '1160px', 
              maxWidth: '100%', 
              height: '400px',
              opacity: 1
            }}
          >
            {currentPlan?.image ? (
              <>
                {/* Background Image Container - Full size inside border */}
                <div className="relative w-full h-full bg-white">
                  <Image
                    src={currentPlan.image}
                    alt={`${currentPlan.unitType} - ${currentPlan.area}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1200px) 100vw, 1160px"
                    style={{ opacity: 1 }}
                  />
                  
                  {/* Price Overlay - Bottom Left */}
                  <div className="absolute left-4 bottom-4 bg-gray-800/95 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-xl z-10">
                    <span className="text-base font-semibold text-white">
                      {currentPlan.price}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {/* Price Overlay - Bottom Left */}
                {currentPlan?.price && (
                  <div className="absolute left-4 bottom-4 bg-gray-800/95 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-xl z-10">
                    <span className="text-base font-semibold text-white">
                      {currentPlan.price}
                    </span>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center text-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="mb-3 h-16 w-16 text-gray-400"
                    fill="currentColor"
                  >
                    <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  </svg>
                  <div className="text-lg font-semibold text-gray-600">
                    3D Top View
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {selectedBhk} • {selectedSize}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
