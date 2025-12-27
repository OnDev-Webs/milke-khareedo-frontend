"use client";

import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import {
  IoHeartOutline,
  IoHeart,
  IoShareSocialOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import { type Property } from "@/lib/api/services/home.service";

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  isLoading: boolean;
  images: string[];
  currentIndex: number;
  hasMultipleImages: boolean;
  currentImage: string | null;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFavoriteClick: (property: Property) => void;
  onCompareClick: (property: Property) => void;
  onShareClick: (property: Property) => void;
  onGoToImage: (index: number, totalImages: number) => void;
  onGoToNextImage: (totalImages: number) => void;
  onGoToPreviousImage: (totalImages: number) => void;
  formatDate: (dateString: string) => string;
}

export default function PropertyCard({
  property,
  isFavorite,
  isLoading,
  images,
  currentIndex,
  hasMultipleImages,
  currentImage,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onFavoriteClick,
  onCompareClick,
  onShareClick,
  onGoToImage,
  onGoToNextImage,
  onGoToPreviousImage,
  formatDate,
}: PropertyCardProps) {
  return (
    <div
      className="flex flex-col rounded-3xl bg-white shadow-lg overflow-hidden group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image Section with Slider */}
      <div className="relative h-52 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {currentImage ? (
          <Image
            key={`${property.id}-${currentIndex}`}
            src={currentImage}
            alt={`${property.projectName} - Image ${currentIndex + 1}`}
            className="object-cover transition-opacity duration-300"
            fill
          />
        ) : (
          <div className="text-gray-400 text-sm">No Image</div>
        )}

        {/* Last Day to join Banner */}
        {property.lastDayToJoin && (
          <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-md z-10">
            <span className="text-xs font-medium text-black">
              Last Day to join: {formatDate(property.lastDayToJoin)}
            </span>
          </div>
        )}

        {/* Action Icons - Right Side (Stacked) - Only visible on hover */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 z-20 transition-all duration-300 ${
            isHovered
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
        >
          {/* Heart Icon (Favorite) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick(property);
            }}
            disabled={isLoading}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
              isFavorite
                ? "border-[#f15a29] bg-[#f15a29] text-white"
                : "border-white bg-white/90 text-gray-700 hover:bg-white"
            } disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? (
              <IoHeart className="h-5 w-5" />
            ) : (
              <IoHeartOutline className="h-5 w-5" />
            )}
          </button>

          {/* Compare Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompareClick(property);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white/90 text-gray-700 hover:bg-white shadow-md transition-colors"
            aria-label="Add to compare"
          >
            <MdCompareArrows className="h-5 w-5" />
          </button>

          {/* Share Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShareClick(property);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white/90 text-gray-700 hover:bg-white shadow-md transition-colors"
            aria-label="Share property"
          >
            <IoShareSocialOutline className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Arrows - Only show if multiple images, hidden on hover */}
        {hasMultipleImages && (
          <>
            {/* Previous Arrow - Left side, middle height */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onGoToPreviousImage(images.length);
              }}
              className={`absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 hover:bg-white shadow-lg transition-all duration-300 z-10 border border-gray-200 backdrop-blur-sm ${
                isHovered
                  ? "opacity-0 invisible scale-90 pointer-events-none"
                  : "opacity-100 visible scale-100"
              }`}
              aria-label="Previous image"
            >
              <IoChevronBack className="h-5 w-5" />
            </button>

            {/* Next Arrow - Right side, middle height (centered when not hovering) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onGoToNextImage(images.length);
              }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 hover:bg-white shadow-lg transition-all duration-300 z-10 border border-gray-200 backdrop-blur-sm ${
                isHovered
                  ? "opacity-0 invisible scale-90 pointer-events-none"
                  : "opacity-100 visible scale-100"
              }`}
              aria-label="Next image"
            >
              <IoChevronForward className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Navigation Dots - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onGoToImage(index, images.length)}
                className={`transition-all ${
                  index === currentIndex
                    ? "h-1.5 w-6 rounded-full bg-[#f15a29]"
                    : "h-1.5 w-1.5 rounded-full bg-white hover:bg-white/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title + Location + Call button */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] font-semibold text-black truncate">
              {property.projectName}
            </h3>
            <p className="text-[15px] text-[#828282] mt-1 truncate">
              {property.location}
            </p>
          </div>
          <button className="bg-[#66AE39] text-white px-3 py-2 rounded-full flex items-center gap-1 text-xs shrink-0 ml-2 hover:bg-[#5a9a32] transition-colors">
            <FaPhoneAlt /> Call
          </button>
        </div>

        {/* Group Size + Opening */}
        <div className="flex justify-between mt-2 mb-2 gap-2">
          <div className="flex flex-col items-center bg-[#F2F6FF] px-4 py-2 rounded-lg text-center flex-1">
            <span className="text-[14px] text-black font-semibold">
              Group Size
            </span>
            <span className="text-base font-bold text-[#f15a29] mt-1">
              {property.groupSizeFormatted}
            </span>
            <span className="text-xs text-black mt-0.5">Members</span>
          </div>
          <div className="flex flex-col items-center bg-[#F2F6FF] px-4 py-2 rounded-lg text-center flex-1">
            <span className="text-[14px] text-black font-semibold">
              Opening
            </span>
            <span className="text-base font-bold text-[#f15a29] mt-1">
              {property.openingFormatted}
            </span>
            <span className="text-xs text-black mt-0.5">Left</span>
          </div>
        </div>

        {/* Target Price + Developer Price */}
        <div className="flex justify-between items-start mt-3">
          {/* Target Price */}
          <div>
            <span className="text-xs text-gray-500">Target Price</span>
            <div className="text-base font-bold text-gray-800">
              {property.targetPrice.formatted}
            </div>
            {property.discount && (
              <span className="mt-1 inline-block bg-[#FFFFFF] border border-[#F6F6F6] rounded-xl pe-10 ps-1 py-0.5 text-xs font-semibold text-[#66AE39]">
                {property.discount.displayText}
              </span>
            )}
          </div>

          {/* Developer Price */}
          <div className="text-right">
            <span className="text-xs text-gray-500">Developer price</span>
            <div className="text-sm font-semibold text-gray-400 line-through">
              {property.developerPrice.formatted}
            </div>
            <span className="mt-1 inline-block rounded-full bg-white border border-[#F6F6F6] px-2 py-0.5 text-xs font-semibold text-[#FF3232]">
              {property.discountPercentage}
            </span>
          </div>
        </div>

        {/* Join Group Button */}
        <button className="mt-4 w-full bg-[#FF765E] text-white py-3 rounded-3xl font-semibold hover:bg-[#e86b50] transition-colors">
          Join Group
        </button>
      </div>
    </div>
  );
}
