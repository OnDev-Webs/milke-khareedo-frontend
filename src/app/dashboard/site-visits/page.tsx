"use client";

import { useMemo } from "react";
import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { useApi } from "@/lib/api/hooks/useApi";
import {
  userDashboardService,
  PropertyApi,
} from "@/lib/api/services/userDashboard.service";
import Loader from "@/components/ui/loader";


type VisitedApiItem = {
  property: PropertyApi;
  lead?: {
    updatedAt?: string;
  };
};

export default function SiteVisitsPage() {
  const { data, loading } = useApi<any>(() =>
    userDashboardService.getVisitedProperties()
  );

  const visits = useMemo<VisitedApiItem[]>(() => {
    return [
      ...(data?.upcoming ?? []),
      ...(data?.completed ?? []),
    ];
  }, [data]);

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
        image: p.images?.[0] ?? "/images/empty_property.png",
        title: p.projectName,
        location: p.location,
        openingLeft: p.openingLeft ?? 0,
        groupSize: p.minGroupMembers ?? 0,
        targetPrice: p.offerPrice?.formatted ?? "—",
        developerPrice: p.developerPrice?.formatted ?? "—",
        showDiscount: false,
        discountPercentage: undefined,
        lastViewedAt: item.lead?.updatedAt,
      };
    });
  }, [visits]);

  if (loading) {
    return (
      <div className="rounded-[24px] bg-white px-6 py-10 shadow sm:px-10">
        <Loader size={38}/>
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
    <div className="rounded-[24px] bg-[#f8fbff] px-6 py-6 sm:px-10 sm:py-10 shadow">
      <PropertyGrid
        properties={mappedProperties}
        onFavoriteClick={handleFavoriteClick}
        onShareClick={handleShareClick}
        favoriteStates={favoriteStates}
        favoriteLoading={favoriteLoading}
      />
    </div>
  );
}
