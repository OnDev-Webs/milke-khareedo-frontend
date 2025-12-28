"use client";

import { useState } from "react";

export default function MyPreferencePage() {
  const [localities, setLocalities] = useState<string[]>([
    "Hitech City",
    "Hitech City",
  ]);

  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([
    "1 Cr - 3 Cr",
  ]);

  const [selectedFloors, setSelectedFloors] = useState<string[]>([
    "6 - 10 Floor",
  ]);

  const budgets = [
    "50 L - 1 Cr",
    "1 Cr - 3 Cr",
    "3 Cr - 5 Cr",
    "5 Cr - 10 Cr",
    "10 Cr - 15 Cr",
    "15 Cr - 20 Cr",
    "20 Cr - 25 Cr",
    "25 Cr - 30 Cr",
    "30 Cr +",
  ];

  const floors = [
    "0 - 5 Floor",
    "6 - 10 Floor",
    "11 - 15 Floor",
    "16 - 20 Floor",
    "21 - 30 Floor",
    "31 - 40 Floor",
    "41 - 50 Floor",
    "51 - 60+ Floor",
  ];

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  return (
    <>
      <div className="block sm:hidden rounded-[14px] bg-white px-4 py-4 shadow">
        <h2 className="mb-2 text-sm font-semibold text-gray-900">
          My Preferences
        </h2>
        <PreferenceCard />
      </div>

      <div className="hidden sm:block rounded-[24px] bg-white px-4 py-4 shadow">
        <h2 className="mb-2 text-lg font-bold text-gray-900">My Preferences</h2>
        <PreferenceCard />
      </div>
    </>
  );

  function PreferenceCard() {
    return (
      <div className="rounded-[14px] sm:rounded-[24px]  bg-[#F7FAFF] p-4 sm:p-8">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Localities
            </label>

            <input
              placeholder="Search Localities"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:border-[#ff7a59] focus:outline-none"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {localities.map((city, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 rounded-sm bg-white px-3 py-1 text-xs shadow"
                >
                  {city}
                  <button
                    onClick={() =>
                      setLocalities(localities.filter((_, idx) => idx !== i))
                    }
                    className="text-gray-600 hover:text-gray-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="my-6 h-px w-full bg-gray-200 sm:hidden" />

          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">Budget</p>

            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => {
                const active = selectedBudgets.includes(b);
                return (
                  <button
                    key={b}
                    onClick={() =>
                      toggle(b, selectedBudgets, setSelectedBudgets)
                    }
                    className={`rounded-full px-4 py-2 text-xs font-medium transition
                                                ${
                                                  active
                                                    ? "bg-[#1C4692] hover:bg-[#1c4692e6] text-white"
                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                                }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="my-6 h-px w-full bg-gray-200 sm:hidden" />

          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Floor Preference
            </p>

            <div className="flex flex-wrap gap-2">
              {floors.map((f) => {
                const active = selectedFloors.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggle(f, selectedFloors, setSelectedFloors)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition
                      ${
                        active
                          ? "bg-[#1C4692] hover:bg-[#1c4692e6] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
