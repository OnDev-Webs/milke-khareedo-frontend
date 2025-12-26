"use client";

import {
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import PropertyMap from "@/components/map/PropertyMap";

export default function SearchResultsGrid() {
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  const getImageIndex = (propertyId: string) =>
    currentImageIndex[propertyId] || 0;

  const handleImageNavigation = (
    propertyId: string,
    direction: "next" | "prev",
  ) => {
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
          {/* Property Card */}
        </div>
      </div>

      {/* Map Sidebar */}
      <div className="hidden w-96 lg:block">
        <div className="sticky top-20 overflow-hidden rounded-2xl bg-gray-200">
          {/*<PropertyMap />*/}
        </div>
      </div>
    </div>
  );
}
