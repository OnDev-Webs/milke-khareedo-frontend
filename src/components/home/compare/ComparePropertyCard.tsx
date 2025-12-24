"use client";

import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

interface Property {
  id: string | number;
  title: string;
  developer: string;
  price: string;
  location: string;
  image?: string;
  area: string;
  config: string;
  propertyType: string;
  possessionDate?: string;
  possessionStatus?: string;
  floorPlanImage?: string;
}

interface ComparePropertyCardProps {
  property: Property;
  label: string; // A, B, C, etc.
  onRemove: () => void;
}

export default function ComparePropertyCard({
  property,
  label,
  onRemove,
}: ComparePropertyCardProps) {
  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      {/* Remove Component Button */}
      <button
        onClick={onRemove}
        className="mb-3 self-start rounded-full bg-[#5DADE2] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#4A9BC8] transition-colors"
      >
        Remove Component
      </button>

      {/* Property Image with Label */}
      <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl bg-gray-100">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-24 w-24 text-gray-300"
              fill="currentColor"
            >
              <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
            </svg>
          </div>
        )}
        {/* Label (A, B, C) */}
        <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-gray-800 shadow-sm">
          {label}
        </div>
      </div>

      {/* Property Name with Call and Heart */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors">
            <IoHeartOutline className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-1.5 rounded-full bg-[#66AE39] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#5a9a32] transition-colors">
            <FaPhoneAlt className="h-3 w-3" />
            Call
          </button>
        </div>
      </div>

      {/* Book A Visit Button */}
      <button className="mb-6 w-full rounded-full bg-[#FF765E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#e86b50] transition-colors">
        Book A Visit
      </button>

      {/* Dotted Separator */}
      <div className="mb-6 border-t-2 border-dotted border-gray-300"></div>

      {/* Property Details - Key Value Pairs */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Project Name:</span>
          <span className="text-sm font-semibold text-gray-800">{property.title}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Developer:</span>
          <span className="text-sm font-semibold text-gray-800">{property.developer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Budget:</span>
          <span className="text-sm font-semibold text-gray-800">{property.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Area/Size:</span>
          <span className="text-sm font-semibold text-gray-800">{property.area}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Property Config:</span>
          <span className="text-sm font-semibold text-gray-800">{property.config}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Location:</span>
          <span className="text-sm font-semibold text-gray-800">{property.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Property Type:</span>
          <span className="text-sm font-semibold text-gray-800">{property.propertyType}</span>
        </div>
      </div>

      {/* Dotted Separator */}
      <div className="mb-6 border-t-2 border-dotted border-gray-300"></div>

      {/* Floor Plan Section */}
      <div className="mb-6">
        <h4 className="mb-3 text-base font-semibold text-gray-800">Floor Plan</h4>
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-100">
          {property.floorPlanImage ? (
            <Image
              src={property.floorPlanImage}
              alt="Floor Plan"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="h-16 w-16 text-gray-300"
                fill="currentColor"
              >
                <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
              </svg>
            </div>
          )}
        </div>
        {/* Carousel Dots */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="h-1.5 w-8 rounded-full bg-gray-400"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300"></span>
        </div>
      </div>

      {/* Dotted Separator */}
      <div className="mb-6 border-t-2 border-dotted border-gray-300"></div>

      {/* Possession Status */}
      <div>
        <h4 className="mb-3 text-base font-semibold text-gray-800">Possession Status</h4>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-800">
            {property.possessionDate || "Jan 2027"}
          </p>
          <p className="text-sm text-gray-600">
            {property.possessionStatus || "Under Construction"}
          </p>
        </div>
      </div>
    </div>
  );
}

