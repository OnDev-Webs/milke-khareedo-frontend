"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api/hooks/useApi";
import { userDashboardService } from "@/lib/api/services/userDashboard.service";
import type { PreferencesApi } from "@/lib/api/services/userDashboard.service";

export default function MyPreferencePage() {

    const [localities, setLocalities] = useState<string[]>([]);
    const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
    const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
    const [localityInput, setLocalityInput] = useState("");

    const { data, loading } = useApi<PreferencesApi>(() =>
        userDashboardService.getPreferences()
    );


    const BUDGET_MAP: Record<string, { min: number | null; max: number | null }> = {
        "50 L - 1 Cr": { min: 50, max: 100 },
        "1 Cr - 3 Cr": { min: 100, max: 300 },
        "3 Cr - 5 Cr": { min: 300, max: 500 },
        "5 Cr - 10 Cr": { min: 500, max: 1000 },
        "10 Cr - 15 Cr": { min: 1000, max: 1500 },
        "15 Cr - 20 Cr": { min: 1500, max: 2000 },
        "20 Cr - 25 Cr": { min: 2000, max: 2500 },
        "25 Cr - 30 Cr": { min: 2500, max: 3000 },
        "30 Cr +": { min: 3000, max: null },
    };

    const FLOOR_MAP: Record<string, { min: number; max: number | null }> = {
        "0 - 5 Floor": { min: 0, max: 5 },
        "6 - 10 Floor": { min: 6, max: 10 },
        "11 - 15 Floor": { min: 11, max: 15 },
        "16 - 20 Floor": { min: 16, max: 20 },
        "21 - 30 Floor": { min: 21, max: 30 },
        "31 - 40 Floor": { min: 31, max: 40 },
        "41 - 50 Floor": { min: 41, max: 50 },
        "51 - 60+ Floor": { min: 51, max: null },
    };

    const deriveSelectionsFromRange = (
        map: Record<string, { min: number | null; max: number | null }>,
        min: number | null,
        max: number | null
    ): string[] => {
        if (min == null && max == null) return [];

        return Object.entries(map)
            .filter(([_, range]) => {
                if (range.min == null && range.max == null) return false;
                if (min != null && range.min != null && range.min < min) return false;
                if (max != null && range.max != null && range.max > max) return false;
                return true;
            })
            .map(([label]) => label);
    };

    const getMinMax = (
        selected: string[],
        map: Record<string, { min: number | null; max: number | null }>
    ) => {
        if (!selected.length) return { min: null, max: null };

        const mins = selected.map((v) => map[v].min).filter(Boolean) as number[];
        const maxs = selected.map((v) => map[v].max).filter(Boolean) as number[];

        return {
            min: mins.length ? Math.min(...mins) : null,
            max: maxs.length ? Math.max(...maxs) : null,
        };
    };

    useEffect(() => {
        if (!data) return;

        setLocalities(data.preferredLocations ?? []);

        setSelectedBudgets(
            deriveSelectionsFromRange(
                BUDGET_MAP,
                data.budgetMin,
                data.budgetMax
            )
        );

        setSelectedFloors(
            deriveSelectionsFromRange(
                FLOOR_MAP,
                data.floorMin,
                data.floorMax
            )
        );
    }, [data]);


    const toggle = (
        value: string,
        list: string[],
        setList: (v: string[]) => void,
    ) => {
        setList(
            list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
        );
    };

    const handleSave = async () => {
        const budget = getMinMax(selectedBudgets, BUDGET_MAP);
        const floor = getMinMax(selectedFloors, FLOOR_MAP);

        await userDashboardService.savePreferences({
            preferredLocations: localities,
            budgetMin: budget.min,
            budgetMax: budget.max,
            floorMin: floor.min,
            floorMax: floor.max,
        });
    };

    const budgets = Object.keys(BUDGET_MAP);
    const floors = Object.keys(FLOOR_MAP);


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
                            value={localityInput}
                            onChange={(e) => setLocalityInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && localityInput.trim()) {
                                    e.preventDefault();
                                    if (!localities.includes(localityInput.trim())) {
                                        setLocalities([...localities, localityInput.trim()]);
                                    }
                                    setLocalityInput("");
                                }
                            }}
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
                                                ${active
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
                      ${active
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

                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            className="rounded-full bg-[#1C4692] px-6 py-2 text-sm font-semibold text-white hover:bg-[#1c4692e6]"
                        >
                            Save Preferences
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}
