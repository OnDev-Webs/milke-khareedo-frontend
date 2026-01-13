"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { useApi } from "@/lib/api/hooks/useApi";
import {
  PropertyApi,
  userDashboardService,
} from "@/lib/api/services/userDashboard.service";
import { useMemo } from "react";

type ViewedPropertyApi = PropertyApi;

export default function ViewedPropertiesPage() {
  const { data, loading } = useApi<ViewedPropertyApi[]>(() =>
    userDashboardService.getViewedProperties()
  );

  const properties = data ?? [];

  const {
    handleFavoriteClick,
    handleShareClick,
    favoriteStates,
    favoriteLoading,
  } = usePropertyActions();

  const mappedProperties = useMemo(() => {
    return properties.map((p) => {
      const coverImage = p.images?.[0] ?? "/images/empty_property.png";

      return {
        id: p.id,
        image: coverImage,
        title: p.projectName,
        location: p.location,
        openingLeft: p.openingLeft ?? 0,
        groupSize: p.minGroupMembers ?? 0,
        targetPrice: p.offerPrice?.formatted ?? "—",
        developerPrice: p.developerPrice?.formatted ?? "—",
        discountPercentage: p.discount?.percentageFormatted,
        showDiscount: !!p.discount,
        lastDayToJoin: p.lastDayToJoin,
        lastViewedAt: undefined,
      };
    });
  }, [properties]);

  if (loading) {
    return (
      <div className="rounded-[24px] bg-white px-6 py-10 shadow sm:px-10">
        Loading viewed properties...
      </div>
    );
  }

  if (!mappedProperties.length) {
    return (
      <div className="rounded-[24px] bg-white px-6 py-10 shadow sm:px-10">
        <EmptyState
          imageSrc="/images/Empty_property.png"
          title="No viewed properties"
          description="Properties you view will appear here."
        />
      </div>
    );
  }

  return (
    <>
      <div className="block sm:hidden">
        <PropertyGrid
          properties={mappedProperties}
          onFavoriteClick={handleFavoriteClick}
          onShareClick={handleShareClick}
          favoriteStates={favoriteStates}
          favoriteLoading={favoriteLoading}
        />
      </div>

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
