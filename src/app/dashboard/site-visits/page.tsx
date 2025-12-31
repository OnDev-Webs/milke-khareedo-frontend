"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { useApi } from "@/lib/api/hooks/useApi";
import { userDashboardService, PropertyApi } from "@/lib/api/services/userDashboard.service";

type SiteVisitApi = PropertyApi;


export default function SiteVisitsPage() {
    const { data, loading } = useApi<SiteVisitApi[]>(() =>
        userDashboardService.getVisitedProperties()
    );

    const {
        handleShareClick,
        handleFavoriteClick,
        favoriteStates,
        favoriteLoading,
    } = usePropertyActions();
    
    const visits = data ?? [];

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!visits.length) {
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

    const mappedProperties = visits.map((p) => {
        const coverImage =
            p.images?.[0] ?? "/images/empty_property.png";

        return {
            id: p.id,

            image: coverImage,
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


    return (
        <>
            <div className="block sm:hidden">
                <PropertyGrid
                    properties={mappedProperties}
                    onFavoriteClick={handleFavoriteClick}
                    onShareClick={handleShareClick}
                    favoriteStates={favoriteStates}
                    favoriteLoading={favoriteLoading}
                />      </div>

            <div className="hidden sm:block rounded-[24px] bg-[#f8fbff] px-10 py-10 shadow">
                <PropertyGrid
                    properties={mappedProperties}
                    onFavoriteClick={handleFavoriteClick}
                    onShareClick={handleShareClick}
                    favoriteStates={favoriteStates}
                    favoriteLoading={favoriteLoading}
                />      </div>
        </>
    );
}
