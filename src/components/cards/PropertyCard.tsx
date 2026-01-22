// "use client";

// import Image from "next/image";
// import { FaPhoneAlt } from "react-icons/fa";
// import {
//   IoHeartOutline,
//   IoHeart,
//   IoShareSocialOutline,
//   IoChevronBack,
//   IoChevronForward,
// } from "react-icons/io5";
// import { MdCompareArrows } from "react-icons/md";
// import { type Property } from "@/lib/api/services/home.service";
// import Link from "next/link";
// import upPrice from "@/assets/upPrice.svg";

// interface PropertyCardProps {
//   property: Property;
//   isFavorite: boolean;
//   isLoading: boolean;
//   isJoinGroup: boolean;
//   isJoinGroupLoading?: boolean;
//   images: string[];
//   currentIndex: number;
//   hasMultipleImages: boolean;
//   currentImage: string | null;
//   isHovered: boolean;
//   onMouseEnter: () => void;
//   onMouseLeave: () => void;
//   onFavoriteClick: (property: Property) => void;
//   onCompareClick: (property: Property) => void;
//   onShareClick: (property: Property) => void;
//   onJoinGroupClick: (property: Property) => void;
//   onGoToImage: (index: number, totalImages: number) => void;
//   onGoToNextImage: (totalImages: number) => void;
//   onGoToPreviousImage: (totalImages: number) => void;
//   formatDate: (dateString: string) => string;
// }

// export default function PropertyCard({
//   property,
//   isFavorite,
//   isLoading,
//   isJoinGroup,
//   isJoinGroupLoading = false,
//   images,
//   currentIndex,
//   hasMultipleImages,
//   currentImage,
//   isHovered,
//   onMouseEnter,
//   onMouseLeave,
//   onFavoriteClick,
//   onCompareClick,
//   onShareClick,
//   onJoinGroupClick,
//   onGoToImage,
//   formatDate,
// }: PropertyCardProps) {

//   const formatTwoDigits = (value: number) => {
//     return value.toString().padStart(2, "0");
//   };

//   const formatPercentage = (value: string) => {
//     return value.replace(/\.00%$/, "%");
//   };

//   return (
//     <div
//       className="flex flex-col rounded-3xl p-4 bg-white shadow-lg overflow-hidden group relative cursor-pointer"
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       <Link
//         href={`/property-details/${property.id}`}
//         className="absolute inset-0 z-10"
//       />
//       {/* Image Section with Slider */}
//       <div className="relative h-52 w-full bg-gray-100 rounded-3xl flex items-center justify-center overflow-hidden">
//         {currentImage ? (
//           <Image
//             key={`${property.id}-${currentIndex}`}
//             src={currentImage}
//             alt={`${property.projectName} - Image ${currentIndex + 1}`}
//             className="object-cover transition-opacity rounded-3xl duration-300"
//             fill
//           />
//         ) : (
//           <div className="text-gray-400 text-sm">No Image</div>
//         )}

//         {/* Last Day to join Banner */}
//         {property.lastDayToJoin && (
//           <div className="absolute top-3 left-3 bg-white/82 backdrop-blur-md rounded-[6px] px-3 py-1.5 shadow-md z-10 text-[12px] text-[#000000] font-normal">
//             Last Day to join: {formatDate(property.lastDayToJoin)}
//           </div>
//         )}

//         {/* Action Icons - Right Side (Stacked) - Only visible on hover */}
//         <div
//           className={`absolute top-3 right-3 flex flex-col gap-2 z-20 transition-all duration-300 ${isHovered
//             ? "opacity-100 visible translate-y-0"
//             : "opacity-0 invisible -translate-y-2 pointer-events-none"
//             }`}
//         >
//           {/* Heart Icon (Favorite) */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onFavoriteClick(property);
//             }}
//             disabled={isLoading}
//             className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${isFavorite
//               ? "border-[#1C4692] bg-[#1C4692] text-white"
//               : "border-white bg-white/90 text-gray-700 hover:bg-white"
//               } disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
//             aria-label={
//               isFavorite ? "Remove from favorites" : "Add to favorites"
//             }
//           >
//             {isFavorite ? (
//               <IoHeart className="h-5 w-5 " />
//             ) : (
//               <IoHeartOutline className="h-5 w-5" />
//             )}
//           </button>

//           {/* Compare Icon */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onCompareClick(property);
//             }}
//             className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white/90 text-gray-700 hover:bg-white shadow-md transition-colors"
//             aria-label="Add to compare"
//           >
//             <Image
//               src="/images/convert.svg"
//               alt="Compare"
//               width={20}
//               height={20}
//               className="h-5 w-5"
//             />          </button>

//           {/* Share Icon */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onShareClick(property);
//             }}
//             className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white/90 text-gray-700 hover:bg-white shadow-md transition-colors"
//             aria-label="Share property"
//           >
//             <IoShareSocialOutline className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Image Navigation Dots - Only show if multiple images */}
//         {hasMultipleImages && (
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => onGoToImage(index, images.length)}
//                 className={`transition-all ${index === currentIndex
//                   ? "h-1.5 w-6 rounded-full bg-[#1C4692]"
//                   : "h-1.5 w-1.5 rounded-full bg-white hover:bg-white/80"
//                   }`}
//                 aria-label={`Go to image ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="pt-4">
//         {/* Title + Location + Call button */}
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-1 min-w-0">
//             <h3 className="text-[20px] font-semibold text-black truncate">
//               {property.projectName}
//             </h3>
//             <p className="text-[15px] text-[#828282] truncate">
//               {property.location}
//             </p>
//           </div>
//           <button className="relative z-20 bg-[#66AE39] text-white px-3 py-2 rounded-full flex items-center gap-1 text-xs shrink-0 ml-2 hover:bg-[#5a9a32] transition-colors">
//             <FaPhoneAlt /> Call
//           </button>
//         </div>

//         {/* Group Size + Opening */}
//         <div className="flex justify-between mt-2 mb-2 gap-2">
//           {/* GROUP SIZE */}
//           <div className="flex flex-col items-center bg-[#EEF4FF] px-4 py-2 rounded-[15px] text-center flex-1">
//             <span className="text-[16px] text-[#000000] font-semibold">
//               Group Size
//             </span>
//             <span className="text-[20px] font-bold text-[#1C4692]">
//               {formatTwoDigits(property.groupSize)}{" "}
//               <span className="text-[14px] text-[#525252] font-normal">
//                 Members
//               </span>
//             </span>
//           </div>
//           {/* OPENING */}
//           <div className="flex flex-col items-center bg-[#EEF4FF] px-4 py-2 rounded-[15px] text-center flex-1">
//             <span className="text-[16px] text-[#000000] font-semibold">
//               Opening
//             </span>
//             <span className="text-[20px] font-bold text-[#1C4692]">
//               {formatTwoDigits(property.openingLeft)}{" "}
//               <span className="text-[14px] text-[#525252] font-normal">
//                 Left
//               </span>
//             </span>
//           </div>
//         </div>

//         {/* Target Price + Developer Price */}
//         <div className="flex justify-between items-start mt-3 bg-[#EEF4FF] px-3 py-2 rounded-[15px]">
//           {/* Target Price */}
//           <div>
//             <span className="text-[14px] text-[#000000] font-normal">Target Price</span>
//             <div className="text-[19px] font-bold text-[#000000]">
//               {property.targetPrice.formatted}
//             </div>
//             {property.discount && (
//               <span className="mt-2 inline-flex items-center w-[256px] h-[26px] gap-1.5 bg-white border border-[#F6F6F6] rounded-xl px-2 py-0.5 text-xs font-semibold text-[#66AE39]">
//                 <Image
//                   src={upPrice}
//                   alt="Offer"
//                   width={14}
//                   height={14}
//                   className="object-contain"
//                 />
//                 {property.discount.displayText}
//               </span>
//             )}
//           </div>

//           {/* Developer Price */}
//           <div className="text-right">
//             <span className="text-[14px] text-[#000000] font-normal">Developer price</span>
//             <div className="text-[16px] font-semibold text-[#4B4B4B] line-through">
//               {property.developerPrice.formatted}
//             </div>
//             <span className="mt-3 inline-block rounded-full w-[84px] h-[26px] bg-white border border-[#F6F6F6] px-2 py-1 text-xs font-semibold text-[#FF3232]">
//               {formatPercentage(property.discountPercentage)} Off*
//             </span>
//           </div>
//         </div>

//         {/* Join Group Button */}
//         <button
//           onClick={(e) => {
//             if (isJoinGroup) {
//               e.stopPropagation();
//               return;
//             }
//             e.stopPropagation();
//             onJoinGroupClick(property);
//           }}
//           disabled={isJoinGroup || isJoinGroupLoading}
//           className={`relative z-20 mt-4 w-full py-3 rounded-3xl font-semibold transition-all duration-300 ${isJoinGroup
//             ? "bg-white border-2 border-[#1C4692] text-[#1C4692] cursor-default pointer-events-none"
//             : "bg-[#1C4692] hover:bg-[#1c4692e6] text-white disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent"
//             }`}
//         >
//           {isJoinGroupLoading
//             ? "Joining..."
//             : isJoinGroup
//               ? "Joined"
//               : "Join Group"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoHeartOutline, IoHeart, IoShareSocialOutline } from "react-icons/io5";
import upPrice from "@/assets/upPrice.svg";
import { type Property } from "@/lib/api/services/home.service";

interface PropertyCardProps {
  property: Property;
  images: string[];
  currentIndex: number;
  currentImage: string | null;
  hasMultipleImages: boolean;
  isHovered: boolean;
  isFavorite: boolean;
  isLoading: boolean;
  isJoinGroup: boolean;
  isJoinGroupLoading?: boolean;
  onGoToNextImage: (totalImages: number) => void;
  onGoToPreviousImage: (totalImages: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFavoriteClick: (property: Property) => void;
  onCompareClick: (property: Property) => void;
  onShareClick: (property: Property) => void;
  onJoinGroupClick: (property: Property) => void;
  onGoToImage: (index: number, totalImages: number) => void;
  formatDate: (dateString: string) => string;
}

export default function PropertyCard({
  property,
  images,
  currentIndex,
  currentImage,
  hasMultipleImages,
  isHovered,
  isFavorite,
  isLoading,
  isJoinGroup,
  isJoinGroupLoading = false,
  onMouseEnter,
  onMouseLeave,
  onFavoriteClick,
  onCompareClick,
  onShareClick,
  onJoinGroupClick,
  onGoToImage,
  formatDate,
}: PropertyCardProps) {
  const formatTwoDigits = (value: number) => value.toString().padStart(2, "0");

  const formatPercentage = (value: string) => value.replace(/\.00%$/, "%");

  const hasValidDiscount = (value?: string) => {
    if (!value) return false;
    const num = Number(value.replace("%", ""));
    return num > 0;
  };

 const formatLocationForUI = (fullLocation?: string) => {
  if (!fullLocation) return "";
  const parts = fullLocation
    .split(",")
    .map(p => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return parts[0] || "";
  const ignore = ["india", "telangana", "maharashtra", "gujarat", "karnataka"];
  const filtered = parts.filter(p => !ignore.includes(p.toLowerCase()));
  if (filtered.length < 2) return filtered[0];
  const city = filtered[filtered.length - 1];
  const area = filtered[filtered.length - 2];
  return `${area} , | ${city}`;
};

  return (
    <div
      className="relative flex flex-col bg-white rounded-3xl p-4 shadow-lg overflow-hidden group cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Click Overlay */}
      <Link
        href={`/property-details/${property.id}`}
        className="absolute inset-0 z-10"
      />

      {/* IMAGE */}
      <div className="relative h-52 w-full rounded-3xl overflow-hidden bg-gray-100">
        {currentImage ? (
          <Image
            key={`${property.id}-${currentIndex}`}
            src={currentImage}
            alt={property.projectName}
            fill
            className="object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}

        {/* Last Day Badge */}
        {property.lastDayToJoin && (
          <div className="absolute top-3 left-3 z-20 bg-white/80 backdrop-blur px-3 py-1.5 rounded-md text-xs shadow">
            Last Day to join: {formatDate(property.lastDayToJoin)}
          </div>
        )}

        {/* Hover Icons */}
        <div
          className={`absolute top-3 right-3 z-20 flex flex-col gap-2 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* Favorite */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick(property);
            }}
            disabled={isLoading}
            className={`h-9 w-9 rounded-full flex items-center justify-center border-2 shadow ${
              isFavorite
                ? "bg-[#1C4692] border-[#1C4692] text-white"
                : "bg-white border-white text-gray-700"
            }`}
          >
            {isFavorite ? <IoHeart size={18} /> : <IoHeartOutline size={18} />}
          </button>

          {/* Compare */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompareClick(property);
            }}
            className="h-9 w-9 rounded-full bg-white border-2 border-white shadow flex items-center justify-center"
          >
            <Image
              src="/images/convert.svg"
              alt="Compare"
              width={18}
              height={18}
            />
          </button>

          {/* Share */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShareClick(property);
            }}
            className="h-9 w-9 rounded-full bg-white border-2 border-white shadow flex items-center justify-center"
          >
            <IoShareSocialOutline size={18} />
          </button>
        </div>

        {/* Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onGoToImage(index, images.length)}
                className={`transition-all ${
                  index === currentIndex
                    ? "h-1.5 w-6 bg-[#1C4692] rounded-full"
                    : "h-1.5 w-1.5 bg-white rounded-full"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="pt-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] font-semibold text-black truncate">
              {property.projectName}
            </h3>

            <p className="text-[15px] text-[#828282] truncate">
              {formatLocationForUI(property.location)}
            </p>
          </div>

          <button className="relative z-20 bg-[#66AE39] text-white px-3 py-2 rounded-full flex items-center gap-1 text-xs shrink-0 ml-2 hover:bg-[#5a9a32] transition-colors">
            <FaPhoneAlt /> Call
          </button>
        </div>

        {/* Group / Opening */}
        <div className="flex gap-2 mb-2">
          <div className="flex-1 bg-[#EEF4FF] rounded-xl p-3 text-center">
            <div className="text-sm font-medium">Group Size</div>
            <div className="text-lg font-bold text-[#1C4692]">
              {formatTwoDigits(property.groupSize)}{" "}
              <span className="text-sm font-normal text-gray-600">Members</span>
            </div>
          </div>

          <div className="flex-1 bg-[#EEF4FF] rounded-xl p-3 text-center">
            <div className="text-sm font-medium">Opening</div>
            <div className="text-lg font-bold text-[#1C4692]">
              {formatTwoDigits(property.openingLeft)}{" "}
              <span className="text-sm font-normal text-gray-600">Left</span>
            </div>
          </div>
        </div>
        {/* Pricing */}
        <div className="flex justify-between bg-[#EEF4FF] rounded-xl p-3 mt-3">
          <div>
            <div className="text-sm">Target Price</div>
            <div className="text-lg font-bold">
              {property.targetPrice.formatted}
            </div>

            {property.discount && (
              <span className="inline-flex items-center gap-1 mt-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-[#66AE39] border">
                <Image src={upPrice} alt="Up" width={14} height={14} />
                {property.discount.displayText}
              </span>
            )}
          </div>

          <div className="text-right">
            <div className="text-sm">Developer price</div>
            <div className="text-sm line-through text-gray-500">
              {property.developerPrice.formatted}
            </div>
            <span className="inline-block mt-2 bg-white border px-2 py-1 rounded-full text-xs font-semibold text-red-500">
              {formatPercentage(property.discountPercentage)} Off*
            </span>
          </div>
        </div>
        {/* Join Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isJoinGroup) onJoinGroupClick(property);
          }}
          disabled={isJoinGroup || isJoinGroupLoading}
          className={`relative z-20 mt-4 w-full py-3 rounded-3xl font-semibold transition ${
            isJoinGroup
              ? "bg-white border-2 border-[#1C4692] text-[#1C4692]"
              : "bg-[#1C4692] text-white hover:bg-[#173b7a]"
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