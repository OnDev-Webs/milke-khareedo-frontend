"use client";

import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";

export default function MyFavoritePage() {
    const favoriteProperties = [
        {
            id: 1,
            image: "/images/tp1.jpg",
            title: "Godrej South Estate",
            location: "Okla Phase I, New Delhi",
            groupSize: "05",
            openingLeft: "02",
            targetPrice: "₹ 4.68 Crore",
            developerPrice: "₹ 5.31 Crore",
        },
        {
            id: 2,
            image: "/images/tp2.jpg",
            title: "Villa Estate",
            location: "Okla Phase I, New Delhi",
            groupSize: "05",
            openingLeft: "02",
            targetPrice: "₹ 4.68 Crore",
            developerPrice: "₹ 5.31 Crore",
        },
    ];

    if (favoriteProperties.length === 0) {
        return (
            <div className="rounded-[24px] bg-white px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:px-10">
                <EmptyState
                    imageSrc="/images/empty_favorite.png"
                    title="No favorites yet"
                    description="Save properties you like and they’ll appear here for quick access."
                />
            </div>
        );
    }

    return (
        <>
            <div className="block sm:hidden">
                <PropertyGrid
                    properties={favoriteProperties.map(p => ({
                        ...p,
                        showDiscount: true,
                    }))}
                />
            </div>

            <div className="hidden sm:block rounded-[24px] bg-[#f8fbff] px-10 py-10 shadow">
                <PropertyGrid
                    properties={favoriteProperties.map(p => ({
                        ...p,
                        showDiscount: true,
                    }))}
                />
            </div>
        </>
    );
}
