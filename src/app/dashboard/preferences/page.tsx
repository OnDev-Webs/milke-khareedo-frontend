"use client";

import { useEffect, useRef, useState } from "react";
import { useApi } from "@/lib/api/hooks/useApi";
import { userDashboardService } from "@/lib/api/services/userDashboard.service";
import type { PreferencesApi, SavePreferencesPayload } from "@/lib/api/services/userDashboard.service";


type PreferredLocation = {
  name: string;
  latitude: number;
  longitude: number;
};


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

const budgets = Object.keys(BUDGET_MAP);
const floors = Object.keys(FLOOR_MAP);


export default function MyPreferencePage() {
  const [localities, setLocalities] = useState<PreferredLocation[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedFloors, setSelectedFloors] = useState<string[]>([]);
  const [localityInput, setLocalityInput] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data } = useApi<PreferencesApi>(() =>
    userDashboardService.getPreferences()
  );

  useEffect(() => {
    if ((window as any).google) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!(window as any).google || !inputRef.current) return;

    const autocomplete = new (window as any).google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place?.geometry?.location) return;

      const location: PreferredLocation = {
        name: place.formatted_address || place.name,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };

      setLocalities((prev) =>
        prev.some((l) => l.name === location.name) ? prev : [...prev, location]
      );

      setLocalityInput("");
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    setLocalities(data.preferredLocations ?? []);

    setSelectedBudgets(
      deriveSelectionsFromRange(BUDGET_MAP, data.budgetMin, data.budgetMax)
    );

    setSelectedFloors(
      deriveSelectionsFromRange(FLOOR_MAP, data.floorMin, data.floorMax)
    );
  }, [data]);

  const handleSave = async () => {
    const budget = getMinMax(selectedBudgets, BUDGET_MAP);
    const floor = getMinMax(selectedFloors, FLOOR_MAP);

    const payload: SavePreferencesPayload = {
      preferredLocations: localities,
      budgetMin: budget.min,
      budgetMax: budget.max,
      floorMin: floor.min,
      floorMax: floor.max,
    };

    await userDashboardService.savePreferences(payload);
  };

  return (
    <div className="rounded-[24px] bg-white px-4 py-4 shadow">
      <h2 className="mb-4 text-lg font-bold">My Preferences</h2>

      <PreferenceCard
        localities={localities}
        setLocalities={setLocalities}
        localityInput={localityInput}
        setLocalityInput={setLocalityInput}
        inputRef={inputRef}
        budgets={budgets}
        floors={floors}
        selectedBudgets={selectedBudgets}
        selectedFloors={selectedFloors}
        setSelectedBudgets={setSelectedBudgets}
        setSelectedFloors={setSelectedFloors}
        onSave={handleSave}
      />
    </div>
  );
}


type PreferenceCardProps = {
  localities: PreferredLocation[];
  setLocalities: React.Dispatch<React.SetStateAction<PreferredLocation[]>>;
  localityInput: string;
  setLocalityInput: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  budgets: string[];
  floors: string[];
  selectedBudgets: string[];
  selectedFloors: string[];
  setSelectedBudgets: (v: string[]) => void;
  setSelectedFloors: (v: string[]) => void;
  onSave: () => void;
};

function PreferenceCard(props: PreferenceCardProps) {
  const {
    localities,
    setLocalities,
    localityInput,
    setLocalityInput,
    inputRef,
    budgets,
    floors,
    selectedBudgets,
    selectedFloors,
    setSelectedBudgets,
    setSelectedFloors,
    onSave,
  } = props;

  return (
    <div className="rounded-[24px] bg-[#F7FAFF] p-6 space-y-6">
      <div>
        <label className="block mb-2 text-sm font-semibold">Localities</label>
        <input
          ref={inputRef}
          value={localityInput}
          onChange={(e) => setLocalityInput(e.target.value)}
          placeholder="Search Localities"
          className="h-11 w-full rounded-lg border px-4 text-sm"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {localities.map((l, i) => (
            <span key={i} className="bg-white px-3 py-1 rounded shadow text-xs">
              {l.name}
              <button
                onClick={() =>
                  setLocalities(localities.filter((_, idx) => idx !== i))
                }
                className="ml-2 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <Section
        title="Budget"
        items={budgets}
        selected={selectedBudgets}
        onToggle={(v) =>
          setSelectedBudgets(
            selectedBudgets.includes(v)
              ? selectedBudgets.filter((x) => x !== v)
              : [...selectedBudgets, v]
          )
        }
      />

      <Section
        title="Floor Preference"
        items={floors}
        selected={selectedFloors}
        onToggle={(v) =>
          setSelectedFloors(
            selectedFloors.includes(v)
              ? selectedFloors.filter((x) => x !== v)
              : [...selectedFloors, v]
          )
        }
      />

      <button
        onClick={onSave}
        className="rounded-full bg-[#1C4692] px-6 py-2 text-sm font-semibold text-white"
      >
        Save Preferences
      </button>
    </div>
  );
}


function deriveSelectionsFromRange(
  map: Record<string, { min: number | null; max: number | null }>,
  min: number | null,
  max: number | null
) {
  if (min == null && max == null) return [];
  return Object.entries(map)
    .filter(([_, r]) => {
      if (min != null && r.min != null && r.min < min) return false;
      if (max != null && r.max != null && r.max > max) return false;
      return true;
    })
    .map(([k]) => k);
}

function getMinMax(
  selected: string[],
  map: Record<string, { min: number | null; max: number | null }>
) {
  if (!selected.length) return { min: null, max: null };
  return {
    min: Math.min(...selected.map((s) => map[s].min!).filter(Boolean)),
    max: Math.max(...selected.map((s) => map[s].max!).filter(Boolean)),
  };
}

function Section({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            className={`rounded-full px-4 py-2 text-xs ${
              selected.includes(i)
                ? "bg-[#1C4692] text-white"
                : "bg-white"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
