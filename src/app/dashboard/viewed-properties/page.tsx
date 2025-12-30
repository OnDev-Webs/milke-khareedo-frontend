"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";
import { useApi } from "@/lib/api/hooks/useApi";
import { userDashboardService } from "@/lib/api/services/userDashboard.service";

type ViewedPropertyApi = {
    _id: string;
    lastViewedAt: string;
    propertyId: {
        _id: string;
        projectName: string;
        location: string;

        minGroupMembers?: number;
        openingLeft?: number;

        developerPrice?: number;
        discountPercentage?: string;
        possessionDate?: string;
        images?: { url: string; isCover: boolean }[];
    };
};


export default function ViewedPropertiesPage() {
    const { data, loading } = useApi<ViewedPropertyApi[]>(() =>
        userDashboardService.getViewedProperties()
    );


    const properties = data ?? [];

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!properties.length) {
        return (
            <div className="rounded-[24px] bg-white px-6 py-10 shadow sm:px-10">
                <EmptyState
                    imageSrc="/images/empty_property.png"
                    title="No viewed properties"
                    description="Properties you view will appear here."
                />
            </div>
        );
    }

    const mappedProperties = properties.map((item) => {
        const p = item.propertyId;

        const coverImage =
            p.images?.find((img) => img.isCover)?.url ??
            "/images/placeholder.jpg";

        const groupSize = p.minGroupMembers ?? 0;
        const openingLeft = p.openingLeft ?? 0;

        const discount = Number(
            p.discountPercentage?.replace("%", "") ?? 0
        );

        const targetPrice =
            p.developerPrice && discount > 0
                ? p.developerPrice - (p.developerPrice * discount) / 100
                : undefined;

        const lastDayToJoin = p.possessionDate
            ? new Date(p.possessionDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            : null;

        return {
            id: p._id,

            image: coverImage,
            title: p.projectName,
            location: p.location,

            groupSize,
            openingLeft,

            targetPrice: targetPrice
                ? `₹ ${Math.round(targetPrice).toLocaleString()}`
                : "—",

            developerPrice: p.developerPrice
                ? `₹ ${p.developerPrice.toLocaleString()}`
                : "—",

            discountPercentage: p.discountPercentage ?? "0%",
            showDiscount: discount > 0,

            lastDayToJoin, 
            lastViewedAt: undefined,
        };
    });



    return (
        <>
            <div className="block sm:hidden">
                <PropertyGrid properties={mappedProperties} />
            </div>

            <div className="hidden sm:block rounded-[24px] bg-[#f8fbff] px-10 py-10 shadow">
                <PropertyGrid properties={mappedProperties} />
            </div>
        </>
    );
}
