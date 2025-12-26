import EmptyState from "@/components/dashboard/EmptyState";
import PropertyGrid from "@/components/dashboard/PropertyGrid";

export default function ViewedPropertiesPage() {
    const viewedProperties = [
        {
            id: 1,
            image: "/images/tp1.jpg",
            title: "Godrej South Estate",
            location: "Okla Phase I, New Delhi",
            groupSize: 5,
            openingLeft: 2,
            targetPrice: "₹ 4.68 Crore",
            developerPrice: "₹ 5.31 Crore",
        },
        {
            id: 2,
            image: "/images/tp2.jpg",
            title: "Villa Estate",
            location: "Okla Phase I, New Delhi",
            groupSize: 5,
            openingLeft: 2,
            targetPrice: "₹ 4.68 Crore",
            developerPrice: "₹ 5.31 Crore",
        },
        {
            id: 3,
            image: "/images/tp3.jpg",
            title: " South Estate",
            location: "Okla Phase I, New Delhi",
            groupSize: 5,
            openingLeft: 2,
            targetPrice: "₹ 4.68 Crore",
            developerPrice: "₹ 5.31 Crore",
        },
    ];

    if (viewedProperties.length === 0) {
        return (
            <div className="rounded-[24px] bg-white px-6 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:px-10">
                <EmptyState
                    imageSrc="/images/empty_property.png"
                    title="Find a place you like and save it!"
                    description="Start by searching and viewing properties you like. You can always come back here to see what you explored."
                />
            </div>
        );
    }

    return (
        <div className="rounded-[24px] bg-white px-6 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:px-10 sm:py-10">
            <PropertyGrid properties={viewedProperties} />
        </div>
    );
}
