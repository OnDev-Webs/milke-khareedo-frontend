"use client";

import { useMemo } from "react";
import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { useApi } from "@/lib/api/hooks/useApi";
import {
  userDashboardService,
  VisitedPropertiesResponse,
} from "@/lib/api/services/userDashboard.service";
import Loader from "@/components/ui/loader";

export default function SiteVisitsPage() {
  const { data, loading } = useApi<VisitedPropertiesResponse>(() =>
  userDashboardService.getVisitedProperties()
);

  const visits = data?.completed ?? [];

  const {
    handleShareClick,
    handleFavoriteClick,
    favoriteStates,
    favoriteLoading,
  } = usePropertyActions();


 const mappedProperties = useMemo(() => {
  return visits.map((item) => {
    const p = item.property;

    return {
      id: p.id,
      images: p.images?.length
        ? p.images
        : ["/images/empty_property.png"],
      title: p.projectName,
      location: p.location,
      openingLeft: p.openingLeft ?? 0,
      groupSize: p.minGroupMembers ?? 0,
      targetPrice: p.offerPrice?.formatted ?? "—",
      developerPrice: p.developerPrice?.formatted ?? "—",
      showDiscount: false,
      discountPercentage: undefined,
      lastViewedAt: item.lastViewedAt,
    };
  });
}, [visits]);



  if (loading) {
    return (
      <div className="rounded-[24px] bg-white px-6 py-10 shadow sm:px-10 flex justify-center">
        <Loader size={32} />
      </div>
    );
  }

  if (!mappedProperties.length) {
    return (
      <div className="rounded-[24px] bg-white px-6 py-10 shadow sm:px-10">
        <EmptyState
          imageSrc="/images/Empty_property.png"
          title="No site visits yet"
          description="Once you visit a property site, it will appear here for quick reference."
        />
      </div>
    );
  }


  return (
    <>
      {/* Mobile */}
      <div className="block sm:hidden">
        <PropertyGrid
          properties={mappedProperties}
          onFavoriteClick={handleFavoriteClick}
          onShareClick={handleShareClick}
          favoriteStates={favoriteStates}
          favoriteLoading={favoriteLoading}
        />
      </div>

      {/* Desktop */}
      <div className="hidden sm:block rounded-[24px] bg-[#f8fbff] px-10 py-10 shadow">
        <PropertyGrid
          properties={mappedProperties}
          onFavoriteClick={handleFavoriteClick}
          onShareClick={handleShareClick}
          favoriteStates={favoriteStates}
          favoriteLoading={favoriteLoading}
        />
      </div>
    </>
  );
}
