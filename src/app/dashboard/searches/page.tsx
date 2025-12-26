"use client";

import {  MapPin } from "lucide-react";

type SearchItem = {
  id: number;
  text: string;
  location: string;
};

type SearchGroup = {
  label: string;
  items: SearchItem[];
};

export default function MySearchesPage() {
  const searchGroups: SearchGroup[] = [
    {
      label: "Today",
      items: [
        {
          id: 1,
          text: "2.5 BHK Duplex Ready to move between budget 50Lakhs to 100Crores in Pune",
          location: "Mumbai",
        },
        {
          id: 2,
          text: "Projects in Mumbai Central, Mumbai",
          location: "Mumbai",
        },
        {
          id: 3,
          text: "1.5 BHK Projects in Bandra East, Mumbai",
          location: "Mumbai",
        },
      ],
    },
    {
      label: "Yesterday",
      items: [
        {
          id: 4,
          text: "1.5 BHK Projects in Bandra East, Mumbai",
          location: "Mumbai",
        },
      ],
    },
  ];

  return (
    <div className="rounded-[24px] bg-[#f8fbff] px-4 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:px-8 sm:py-8">
      {searchGroups.map((group) => (
        <div key={group.label} className="mb-6 last:mb-0">
          <h3 className="mb-3 text-sm font-semibold text-[#2b2b2b]">
            {group.label}
          </h3>

          <div className="flex flex-col gap-3">
            {group.items.map((item) => (
              <SearchRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


function SearchRow({ item }: { item: SearchItem }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
      <p className="line-clamp-2 text-sm text-[#2b2b2b]">
        {item.text}
      </p>

      <span className="flex items-center gap-1 shrink-0 rounded-full bg-[#f1f4fa] px-3 py-1 text-xs font-medium text-[#555]">
        <MapPin/> {item.location}
      </span>
    </div>
  );
}
