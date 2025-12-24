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
    <div className="relative flex flex-col rounded-lg bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sm:rounded-xl sm:shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:p-3 md:rounded-2xl md:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:p-4">
      {/* Remove Component Button */}
      <button
        onClick={onRemove}
        className="mb-1.5 self-start rounded-full bg-[#5DADE2] px-2.5 py-0.5 text-[10px] font-medium text-white hover:bg-[#4A9BC8] transition-colors sm:mb-2 sm:px-3 sm:py-1 sm:text-xs md:mb-3 md:px-4 md:py-1.5"
      >
        Remove Component
      </button>

      {/* Property Image with Label */}
      <div className="relative mb-2.5 h-40 w-full overflow-hidden rounded-lg bg-gray-100 sm:mb-3 sm:h-48 md:mb-4 md:h-56 lg:h-64 sm:rounded-xl">
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
        <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-[11px] font-bold text-gray-800 shadow-md sm:left-3 sm:top-3 sm:h-7 sm:w-7 sm:text-xs md:h-8 md:w-8 md:text-sm">
          {label}
        </div>
      </div>

      {/* Property Name with Call and Heart */}
      <div className="mb-2 flex items-center justify-between gap-2 sm:mb-2.5 md:mb-3 lg:mb-4">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 sm:text-base md:text-lg">{property.title}</h3>
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
          <button className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors sm:h-7 sm:w-7 md:h-8 md:w-8">
            <IoHeartOutline className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4" />
          </button>
          <button className="flex items-center gap-0.5 rounded-full bg-[#66AE39] px-2 py-0.5 text-[10px] font-medium text-white hover:bg-[#5a9a32] transition-colors sm:gap-1 sm:px-2.5 sm:py-1 sm:text-xs md:gap-1.5 md:px-3 md:py-1.5">
            <FaPhoneAlt className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3 md:w-3" />
            <span className="hidden sm:inline">Call</span>
          </button>
        </div>
      </div>

      {/* Book A Visit Button */}
      <button className="mb-2.5 w-full rounded-full bg-[#FF765E] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#e86b50] transition-colors sm:mb-3 sm:px-4 sm:py-2 md:mb-4 md:py-2.5 lg:mb-6 lg:py-3">
        Book A Visit
      </button>

      {/* Dotted Separator */}
      <div className="mb-2.5 border-t-2 border-dotted border-gray-300 sm:mb-3 md:mb-4 lg:mb-6"></div>

      {/* Property Details - Key Value Pairs */}
      <div className="mb-2.5 space-y-2 sm:mb-3 sm:space-y-2.5 md:mb-4 md:space-y-3 lg:mb-6 lg:space-y-4">
        <div className="flex justify-between gap-2">
          <span className="text-xs text-gray-600 sm:text-xs md:text-sm">Developer:</span>
          <span className="text-xs font-semibold text-gray-800 text-right break-words sm:text-xs md:text-sm">{property.developer}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-gray-600 sm:text-xs md:text-sm">Budget:</span>
          <span className="text-xs font-semibold text-gray-800 text-right break-words sm:text-xs md:text-sm">{property.price}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-gray-600 sm:text-xs md:text-sm">Area/Size:</span>
          <span className="text-xs font-semibold text-gray-800 text-right break-words sm:text-xs md:text-sm">{property.area}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-gray-600 sm:text-xs md:text-sm">Property Config:</span>
          <span className="text-xs font-semibold text-gray-800 text-right break-words sm:text-xs md:text-sm">{property.config}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-gray-600 sm:text-xs md:text-sm">Location:</span>
          <span className="text-xs font-semibold text-gray-800 text-right break-words sm:text-xs md:text-sm">{property.location}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-xs text-gray-600 sm:text-xs md:text-sm">Property Type:</span>
          <span className="text-xs font-semibold text-gray-800 text-right break-words sm:text-xs md:text-sm">{property.propertyType}</span>
        </div>
      </div>

      {/* Dotted Separator */}
      <div className="mb-2.5 border-t-2 border-dotted border-gray-300 sm:mb-3 md:mb-4 lg:mb-6"></div>

      {/* Floor Plan Section */}
      <div className="mb-2.5 sm:mb-3 md:mb-4 lg:mb-6">
        <h4 className="mb-1.5 text-xs font-semibold text-gray-800 sm:mb-2 sm:text-sm md:mb-3 md:text-base">Floor Plan</h4>
        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100 sm:h-36 md:h-40 lg:h-44">
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
        <div className="mt-1.5 flex items-center justify-center gap-1.5 sm:mt-2 sm:gap-2 md:mt-3">
          <span className="h-1 w-6 rounded-full bg-gray-400 sm:h-1.5 sm:w-8"></span>
          <span className="h-1 w-1 rounded-full bg-gray-300 sm:h-1.5 sm:w-1.5"></span>
          <span className="h-1 w-1 rounded-full bg-gray-300 sm:h-1.5 sm:w-1.5"></span>
        </div>
      </div>

      {/* Dotted Separator */}
      <div className="mb-2.5 border-t-2 border-dotted border-gray-300 sm:mb-3 md:mb-4 lg:mb-6"></div>

      {/* Possession Status */}
      <div>
        <h4 className="mb-1.5 text-xs font-semibold text-gray-800 sm:mb-2 sm:text-sm md:mb-3 md:text-base">Possession Status</h4>
        <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
          <p className="text-xs font-semibold text-gray-800 sm:text-sm">
            {property.possessionDate || "Jan 2027"}
          </p>
          <p className="text-xs text-gray-600 sm:text-sm">
            {property.possessionStatus || "Under Construction"}
          </p>
        </div>
      </div>
    </div>
  );
}

