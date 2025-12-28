"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";

export default function SiteVisitsPage() {
  const siteVisitedProperties = [
    {
      id: 1,
      image: "/images/tp1.jpg",
      title: "Godrej South Estate",
      location: "Okla Phase I, New Delhi",
      groupSize: 5,
      openingLeft: 2,
      targetPrice: "₹ 4.68 Crore",
      developerPrice: "₹ 5.31 Crore",
      lastVisited: "12 Jan, 2025 · 12:33 AM",
    },
  ];

  if (siteVisitedProperties.length === 0) {
    return (
      <div className="rounded-[24px] bg-white px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:px-10">
        <EmptyState
          imageSrc="/images/empty_site_visit.png"
          title="No site visits yet"
          description="Once you visit a property site, it will appear here for quick reference."
        />
      </div>
    );
  }

  return (
    <>
      <div className="block sm:hidden">
        <PropertyGrid
          properties={siteVisitedProperties.map((p) => ({
            ...p,
            lastViewedAt: p.lastVisited,
            showDiscount: false,
          }))}
        />
      </div>

      <div className="hidden sm:block rounded-[24px] bg-[#f8fbff] px-10 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
        <PropertyGrid
          properties={siteVisitedProperties.map((p) => ({
            ...p,
            lastViewedAt: p.lastVisited,
            showDiscount: false,
          }))}
        />
      </div>
    </>
  );
}
