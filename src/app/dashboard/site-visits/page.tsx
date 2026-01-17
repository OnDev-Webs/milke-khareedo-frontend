"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { useApi } from "@/lib/api/hooks/useApi";
import {
    userDashboardService,
    PropertyApi,
} from "@/lib/api/services/userDashboard.service";
import { useMemo } from "react";

type SiteVisitApi = PropertyApi;

type VisitedResponse = {
    data: SiteVisitApi[];
};

export default function SiteVisitsPage() {
    const { data, loading } = useApi<VisitedResponse>(() =>
        userDashboardService.getVisitedProperties()
    );

    const visits = data?.data ?? [];

    const {
        handleShareClick,
        handleFavoriteClick,
        favoriteStates,
        favoriteLoading,
    } = usePropertyActions();

    const mappedProperties = useMemo(() => {
        return visits.map((p) => {

            return {
                id: p.id,
                images: p.images?.length ? p.images : ["/images/empty_property.png"],
                title: p.projectName,
                location: p.location,
                openingLeft: p.openingLeft ?? 0,
                groupSize: p.minGroupMembers ?? 0,
                targetPrice: p.offerPrice?.formatted ?? "—",
                developerPrice: p.developerPrice?.formatted ?? "—",
                showDiscount: false,
                discountPercentage: undefined,
                lastViewedAt: p.lastViewedAt,
            };
        });
    }, [visits]);

    if (loading) {
        return (
            <div className="rounded-[24px] bg-white px-6 py-10 shadow sm:px-10">
                Loading site visits...
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
