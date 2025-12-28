"use client";

import { useState } from "react";

const amenities = [
  // page 1
  [
    "Round-The-Clock Security with CCTV",
    "Open And Covered Parking Spaces",
    "Rainwater Harvesting System And ...",
    "100% Power Backup",
    "Children's Play Area",
    "Club House",
    "Club House",
    "Indoor Games",
    "Gymnasium",
    "Swimming Pool",
  ],
  // page 2
  [
    "Solar Panels For Common Areas",
    "Piped Gas System",
    "Concierge Services",
    "Waste Management And Recycling",
    "Community Garden",
    "Library",
    "Multi-purpose Room",
    "Senior Citizen Zone",
    "Visitor Parking",
  ],
  // page 3
  [
    "Jogging And Cycling Tracks Amidst",
    "Zen Gardens And Water Features",
    "Multipurpose Hall For Social",
    "Air-Conditioned Lobbies",
    "Banquet Hall",
    "Basketball Court",
    "CCTV in common areas",
    "Fire Fighting System",
    "Power backup for lifts",
  ],
];

export default function PDPAmenities() {
  const [page, setPage] = useState(0);
  const cols = 3;

  return (
    <section className="w-full p-4">
      <div className="mx-auto container">
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="rounded-t-2xl bg-gray-200/80 px-6 py-4">
            <h3 className="font-semibold text-3xl">Amenities</h3>
          </div>

          <div className="px-6 py-8">
            <div className="grid gap-6 md:grid-cols-3">
              {amenities[page].map((amenity, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  <p className="leading-relaxed">{amenity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center px-6 pb-6">
            <div className="flex items-center gap-2">
              {amenities.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to amenities page ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={
                    "h-2  rounded-full transition " +
                    (i === page
                      ? "bg-gray-400 w-8"
                      : "bg-gray-300/60 hover:bg-gray-300 w-2")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
