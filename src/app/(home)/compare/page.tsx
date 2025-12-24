"use client";

import { useCompare } from "@/contexts/CompareContext";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import Image from "next/image";
import GoogleMapComponent from "@/components/home/compare/GoogleMap";
import ComparePropertyCard from "@/components/home/compare/ComparePropertyCard";
import { useState, useMemo } from "react";

// Sample properties data - replace with API call
const availableProperties = [
  {
    id: 1,
    title: "Godrej South Estate",
    developer: "Mahindra Lifespaces",
    price: "₹4.68 Cr - 4.85 Cr",
    location: "Kandhivali East",
    image: "/images/tp1.jpg",
    area: "652 - 1254 sqft",
    config: "2 BHK, 3 BHK, 4 BHK",
    propertyType: "Residential",
    possessionDate: "Jan 2027",
    possessionStatus: "Under Construction",
    floorPlanImage: "/images/tp1.jpg",
    lat: 28.5355,
    lng: 77.3910,
  },
  {
    id: 2,
    title: "Shree Gopaldham",
    developer: "Ruparel Group",
    price: "₹3.68 Cr - 3.85 Cr",
    location: "Byculla East",
    image: "/images/tp2.jpg",
    area: "752 - 6354 sqft",
    config: "2 BHK, 3 BHK, 4 BHK",
    propertyType: "Residential",
    possessionDate: "Jan 2027",
    possessionStatus: "Under Construction",
    floorPlanImage: "/images/tp2.jpg",
    lat: 19.2056,
    lng: 72.8637,
  },
  {
    id: 3,
    title: "Nirban Bismillah Cast.",
    developer: "Star Group",
    price: "₹2.68 Cr - 2.85 Cr",
    location: "Borivalli",
    image: "/images/tp3.jpg",
    area: "452 - 3254 sqft",
    config: "2 BHK, 3 BHK, 4 BHK",
    propertyType: "Residential",
    possessionDate: "Jan 2027",
    possessionStatus: "Under Construction",
    floorPlanImage: "/images/tp3.jpg",
    lat: 19.1364,
    lng: 72.8297,
  },
];

export default function ComparePage() {
  const { compareItems, removeFromCompare, addToCompare, isInCompare } = useCompare();
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  // Calculate map center based on compared properties
  const mapCenter = useMemo(() => {
    if (compareItems.length > 0) {
      // Use first property's location or average of all
      const firstProperty = availableProperties.find(
        (p) => p.id === compareItems[0].id
      );
      if (firstProperty) {
        return { lat: firstProperty.lat, lng: firstProperty.lng };
      }
    }
    // Default to Mumbai
    return { lat: 19.0760, lng: 72.8777 };
  }, [compareItems]);

  // Get markers for compared properties
  const mapMarkers = useMemo(() => {
    return compareItems
      .map((item) => {
        const prop = availableProperties.find((p) => p.id === item.id);
        return prop
          ? {
              lat: prop.lat,
              lng: prop.lng,
              title: prop.title,
            }
          : null;
      })
      .filter((marker) => marker !== null) as Array<{
      lat: number;
      lng: number;
      title: string;
    }>;
  }, [compareItems]);

  const handleAddProperty = (property: typeof availableProperties[0]) => {
    addToCompare({
      id: property.id,
      title: property.title,
      price: property.price,
      location: property.location,
      developer: property.developer,
      image: property.image,
    });
    setShowAddPropertyModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Map Section */}
      <div className="h-[500px] w-full">
        <GoogleMapComponent center={mapCenter} markers={mapMarkers} />
      </div>

      {/* Properties Section */}
      <div className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Compare Properties
              {compareItems.length > 0 && (
                <span className="ml-2 text-lg font-normal text-gray-600">
                  ({compareItems.length} selected)
                </span>
              )}
            </h2>
            {compareItems.length > 0 && (
              <button
                onClick={() => {
                  compareItems.forEach((item) => removeFromCompare(item.id));
                }}
                className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Properties Grid */}
          {compareItems.length === 0 ? (
            // Empty State - Add Property Card
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-2xl bg-white p-12 text-center shadow-sm">
                <div className="mb-6 flex justify-center">
                  <button
                    onClick={() => setShowAddPropertyModal(true)}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f15a29] text-white shadow-lg hover:bg-[#e14f20] transition-colors"
                  >
                    <IoAdd className="h-10 w-10" />
                  </button>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  Add Properties to Compare
                </h3>
                <p className="mb-6 text-gray-600">
                  Click the + button to add properties and start comparing
                </p>
                <button
                  onClick={() => setShowAddPropertyModal(true)}
                  className="rounded-full bg-[#f15a29] px-8 py-3 font-semibold text-white hover:bg-[#e14f20] transition-colors"
                >
                  Add Property
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {/* Render compared properties */}
              {compareItems.map((item, index) => {
                const property = availableProperties.find((p) => p.id === item.id);
                if (!property) return null;

                // Generate label (A, B, C, D)
                const label = String.fromCharCode(65 + index);

                return (
                  <ComparePropertyCard
                    key={item.id}
                    property={{
                      id: property.id,
                      title: property.title,
                      developer: property.developer,
                      price: property.price,
                      location: property.location,
                      image: property.image,
                      area: property.area,
                      config: property.config,
                      propertyType: property.propertyType,
                      possessionDate: property.possessionDate,
                      possessionStatus: property.possessionStatus,
                      floorPlanImage: property.floorPlanImage,
                    }}
                    label={label}
                    onRemove={() => removeFromCompare(item.id)}
                  />
                );
              })}

              {/* Add More Property Card */}
              {compareItems.length < 4 && (
                <div
                  onClick={() => setShowAddPropertyModal(true)}
                  className="flex min-h-[600px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 transition-colors hover:border-[#f15a29] hover:bg-gray-50"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <IoAdd className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Add Property
                  </h3>
                  <p className="text-center text-sm text-gray-600">
                    Click to add another property for comparison
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddPropertyModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowAddPropertyModal(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-50 max-h-[80vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Select Properties to Compare
              </h2>
              <button
                onClick={() => setShowAddPropertyModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableProperties
                .filter((prop) => !isInCompare(prop.id))
                .map((property) => (
                  <div
                    key={property.id}
                    className="group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-4 transition-all hover:border-[#f15a29] hover:shadow-lg"
                    onClick={() => handleAddProperty(property)}
                  >
                    {property.image && (
                      <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h4 className="mb-1 font-semibold text-gray-800">
                      {property.title}
                    </h4>
                    <p className="mb-2 text-sm text-gray-600">
                      {property.developer}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {property.price}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {property.location}
                    </p>
                  </div>
                ))}
            </div>

            {availableProperties.filter((prop) => !isInCompare(prop.id))
              .length === 0 && (
              <p className="py-8 text-center text-gray-500">
                All available properties have been added to comparison
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
