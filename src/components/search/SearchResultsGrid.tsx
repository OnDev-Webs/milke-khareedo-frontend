"use client";

import Image from "next/image";
import { Heart, Share2, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type PropertyCardProps = {
    id: string;
    image: string;
    title: string;
    location: string;
    groupSize: number;
    openingLeft: number;
    targetPrice: string;
    developerPrice: string;
    discount: string;
    lastDayToJoin: string;
};

const mockProperties: PropertyCardProps[] = [
    {
        id: "1",
        image: "/images/contact.jpg",
        title: "Godrej South Estate",
        location: "Sector 1, New Delhi",
        groupSize: 5,
        openingLeft: 2,
        targetPrice: "₹ 4.68 Crore",
        developerPrice: "₹ 5.31 Crore",
        discount: "Up to 63.28% off",
        lastDayToJoin: "31st Jun, 2028",
    },
    {
        id: "2",
        image: "/images/contact.jpg",
        title: "Godrej South Estate",
        location: "Sector 1, New Delhi",
        groupSize: 5,
        openingLeft: 2,
        targetPrice: "₹ 4.68 Crore",
        developerPrice: "₹ 5.31 Crore",
        discount: "Up to 63.28% off",
        lastDayToJoin: "31st Jun, 2028",
    },
    {
        id: "3",
        image: "/images/contact.jpg",
        title: "Godrej South Estate",
        location: "Sector 1, New Delhi",
        groupSize: 5,
        openingLeft: 2,
        targetPrice: "₹ 4.68 Crore",
        developerPrice: "₹ 5.31 Crore",
        discount: "Up to 63.28% off",
        lastDayToJoin: "31st Jun, 2028",
    },
    {
        id: "4",
        image: "/images/contact.jpg",
        title: "Godrej South Estate",
        location: "Sector 1, New Delhi",
        groupSize: 5,
        openingLeft: 2,
        targetPrice: "₹ 4.68 Crore",
        developerPrice: "₹ 5.31 Crore",
        discount: "Up to 63.28% off",
        lastDayToJoin: "31st Jun, 2028",
    },
];

export default function SearchResultsGrid() {
    const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

    const getImageIndex = (propertyId: string) => currentImageIndex[propertyId] || 0;

    const handleImageNavigation = (propertyId: string, direction: "next" | "prev") => {
        const currentIndex = getImageIndex(propertyId);
        const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        setCurrentImageIndex((prev) => ({
            ...prev,
            [propertyId]: Math.max(0, Math.min(newIndex, 2)), // Assuming 3 images
        }));
    };

    return (
        <div className="flex gap-6">
            {/* Properties Grid */}
            <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Projects in Mumbai Central, Mumbai
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Short by:</span>
                        <button className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
                            New Added
                            <ChevronLeft size={14} />
                        </button>
                    </div>
                </div>

                <p className="mb-6 text-sm text-gray-600">Showing 4 of 4 Projects</p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {mockProperties.map((property) => (
                        <PropertyCard key={property.id} property={property}
                            onImageNext={() => handleImageNavigation(property.id, "next")}
                            onImagePrev={() => handleImageNavigation(property.id, "prev")}
                            currentImageIndex={getImageIndex(property.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Map Sidebar */}
            <div className="hidden w-96 lg:block">
                <div className="sticky top-20 overflow-hidden rounded-2xl bg-gray-200">
                    <iframe
                        width="100%"
                        height="600"
                        frameBorder="0"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5698104931564!2d77.22743512346906!3d28.598137375671657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce640c1ffffff%3A0x4c39f76ab1bedf0!2sMumbai%20Central%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703082638289"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

function PropertyCard({
    property,
    onImageNext,
    onImagePrev,
    currentImageIndex,
}: {
    property: PropertyCardProps;
    onImageNext: () => void;
    onImagePrev: () => void;
    currentImageIndex: number;
}) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-lg">
            {/* Image Section */}
            <div className="relative overflow-hidden bg-gray-300">
                <Image
                    src={property.image}
                    alt={property.title}
                    width={400}
                    height={260}
                    className="h-[260px] w-full object-cover"
                />

                {/* Last Day Badge */}
                <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 shadow-sm">
                    <p className="text-xs font-medium text-gray-800">
                        Last Day to join: {property.lastDayToJoin}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100"
                    >
                        <Heart
                            size={18}
                            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
                        />
                    </button>
                    <button className="rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100">
                        <Share2 size={18} className="text-gray-600" />
                    </button>
                </div>

                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full transition ${index === currentImageIndex ? "bg-white" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={onImagePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 transition hover:bg-white"
                >
                    <ChevronLeft size={18} className="text-gray-800" />
                </button>
                <button
                    onClick={onImageNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 transition hover:bg-white"
                >
                    <ChevronRight size={18} className="text-gray-800" />
                </button>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-4 p-4">
                {/* Title & Location */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                            <MapPin size={14} />
                            {property.location}
                        </div>
                    </div>
                    <button className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700">
                        <Phone size={14} /> Call
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-gray-100 px-3 py-3 text-center">
                        <p className="text-xs text-gray-600">Group Size</p>
                        <p className="mt-1 font-semibold text-gray-900">{property.groupSize} Members</p>
                    </div>
                    <div className="rounded-2xl bg-gray-100 px-3 py-3 text-center">
                        <p className="text-xs text-gray-600">Opening</p>
                        <p className="mt-1 font-semibold text-red-600">{property.openingLeft} Left</p>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="bg-[#F8FBFF] rounded-[15px] py-3 px-[15px]">
                    <div className="flex justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-600">Target Price</p>
                            <p className="mt-1 text-xl font-bold text-gray-900">{property.targetPrice}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-600">Developer Price</p>
                            <del className="mt-1 text-xs text-gray-400 line-through">
                                {property.developerPrice}
                            </del>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-col gap-1">
                        <p className="text-xs font-medium text-green-600">✓ {property.discount}</p>
                        <p className="text-xs text-orange-600">12% OFF</p>
                    </div>
                </div>

                {/* CTA Button */}
                <button className="w-full rounded-full bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
                    Join Group
                </button>
            </div>
        </div>
    );
}
