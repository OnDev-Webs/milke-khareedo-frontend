"use client";

import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoHeartOutline, IoHeart, IoShareSocialOutline } from "react-icons/io5";
import { type Property } from "@/lib/api/services/home.service";
import Link from "next/link";
import upPrice from "@/assets/upPrice.svg";

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  isLoading: boolean;
  isJoinGroup: boolean;
  isJoinGroupLoading?: boolean;
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
  onJoinGroupClick: (property: Property) => void;
  onGoToImage: (index: number, totalImages: number) => void;
  onGoToNextImage: (totalImages: number) => void;
  onGoToPreviousImage: (totalImages: number) => void;
  formatDate: (dateString: string) => string;
}

export default function PropertyCard({
  property,
  isFavorite,
  isLoading,
  isJoinGroup,
  isJoinGroupLoading = false,
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
  onJoinGroupClick,
  onGoToImage,
  formatDate,
}: PropertyCardProps) {

  const formatTwoDigits = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  const formatPercentage = (value: string) => {
    return value.replace(/\.00%$/, "%");
  };

  return (
    <div
      className="flex flex-col rounded-3xl p-4 bg-white shadow-lg overflow-hidden group relative cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={`/property-details/${property.id}`}
        className="absolute inset-0 z-10"
      />
      {/* Image Section with Slider */}
      <div className="relative h-52 w-full bg-gray-100 rounded-3xl flex items-center justify-center overflow-hidden">
        {currentImage ? (
          <Image
            key={`${property.id}-${currentIndex}`}
            src={currentImage}
            alt={`${property.projectName} - Image ${currentIndex + 1}`}
            className="object-cover transition-opacity rounded-3xl duration-300"
            fill
          />
        ) : (
          <div className="text-gray-400 text-sm">No Image</div>
        )}

        {/* Last Day to join Banner */}
        {property.lastDayToJoin && (
          <div className="absolute top-3 left-3 bg-white/82 backdrop-blur-md rounded-[6px] px-3 py-1.5 shadow-md z-10 text-[12px] text-[#000000] font-normal">
            Last Day to join: {formatDate(property.lastDayToJoin)}
          </div>
        )}

        {/* Action Icons - Right Side (Stacked) - Only visible on hover */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 z-20 transition-all duration-300 ${isHovered
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
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${isFavorite
              ? "border-[#1C4692] bg-[#1C4692] text-white"
              : "border-white bg-white/90 text-gray-700 hover:bg-white"
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? (
              <IoHeart className="h-5 w-5 " />
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
            <Image
              src="/images/convert.svg"
              alt="Compare"
              width={20}
              height={20}
              className="h-5 w-5"
            />          </button>

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

        {/* Image Navigation Dots - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onGoToImage(index, images.length)}
                className={`transition-all ${index === currentIndex
                  ? "h-1.5 w-6 rounded-full bg-[#1C4692]"
                  : "h-1.5 w-1.5 rounded-full bg-white hover:bg-white/80"
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="pt-4">
        {/* Title + Location + Call button */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] font-semibold text-black truncate">
              {property.projectName}
            </h3>
            <p className="text-[15px] text-[#828282] truncate">
              {property.location}
            </p>
          </div>
          <button className="relative z-20 bg-[#66AE39] text-white px-3 py-2 rounded-full flex items-center gap-1 text-xs shrink-0 ml-2 hover:bg-[#5a9a32] transition-colors">
            <FaPhoneAlt /> Call
          </button>
        </div>

        {/* Group Size + Opening */}
        <div className="flex justify-between mt-2 mb-2 gap-2">
          {/* GROUP SIZE */}
          <div className="flex flex-col items-center bg-[#EEF4FF] px-4 py-2 rounded-[15px] text-center flex-1">
            <span className="text-[16px] text-[#000000] font-semibold">
              Group Size
            </span>
            <span className="text-[20px] font-bold text-[#1C4692]">
              {formatTwoDigits(property.groupSize)}{" "}
              <span className="text-[14px] text-[#525252] font-normal">
                Members
              </span>
            </span>
          </div>
          {/* OPENING */}
          <div className="flex flex-col items-center bg-[#EEF4FF] px-4 py-2 rounded-[15px] text-center flex-1">
            <span className="text-[16px] text-[#000000] font-semibold">
              Opening
            </span>
            <span className="text-[20px] font-bold text-[#1C4692]">
              {formatTwoDigits(property.openingLeft)}{" "}
              <span className="text-[14px] text-[#525252] font-normal">
                Left
              </span>
            </span>
          </div>
        </div>

        {/* Target Price + Developer Price */}
        <div className="flex justify-between items-start mt-3 bg-[#EEF4FF] px-3 py-2 rounded-[15px]">
          {/* Target Price */}
          <div>
            <span className="text-[14px] text-[#000000] font-normal">Target Price</span>
            <div className="text-[19px] font-bold text-[#000000]">
              {property.targetPrice.formatted}
            </div>
            {property.discount && (
              <span className="mt-2 inline-flex items-center w-[256px] h-[26px] gap-1.5 bg-white border border-[#F6F6F6] rounded-xl px-2 py-0.5 text-xs font-semibold text-[#66AE39]">
                <Image
                  src={upPrice}
                  alt="Offer"
                  width={14}
                  height={14}
                  className="object-contain"
                />
                {property.discount.displayText}
              </span>
            )}
          </div>

          {/* Developer Price */}
          <div className="text-right">
            <span className="text-[14px] text-[#000000] font-normal">Developer price</span>
            <div className="text-[16px] font-semibold text-[#4B4B4B] line-through">
              {property.developerPrice.formatted}
            </div>
            <span className="mt-3 inline-block rounded-full w-[84px] h-[26px] bg-white border border-[#F6F6F6] px-2 py-1 text-xs font-semibold text-[#FF3232]">
              {formatPercentage(property.discountPercentage)} Off*
            </span>
          </div>
        </div>

        {/* Join Group Button */}
        <button
          onClick={(e) => {
            if (isJoinGroup) {
              e.stopPropagation();
              return; 
            }
            e.stopPropagation();
            onJoinGroupClick(property);
          }}
          disabled={isJoinGroup || isJoinGroupLoading}
          className={`relative z-20 mt-4 w-full py-3 rounded-3xl font-semibold transition-all duration-300 ${isJoinGroup
            ? "bg-white border-2 border-[#1C4692] text-[#1C4692] cursor-default pointer-events-none"
            : "bg-[#1C4692] hover:bg-[#1c4692e6] text-white disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent"
            }`}
        >
          {isJoinGroupLoading
            ? "Joining..."
            : isJoinGroup
              ? "Joined"
              : "Join Group"}
        </button>
      </div>
    </div>
  );
}
