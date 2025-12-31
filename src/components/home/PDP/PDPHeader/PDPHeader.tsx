"use client";

import upPrice from "@/assets/upPrice.svg"
import Image from "next/image"
import { type PropertyPrice } from "@/lib/api/services/home.service";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { useCompare } from "@/contexts/CompareContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { homeService } from "@/lib/api/services/home.service";
import AuthModal from "@/components/auth/AuthModal";

interface PDPHeaderProps {
  projectName: string;
  location: string;
  startingPrice: PropertyPrice;
  developerPrice: string;
  bookingDeadlinePrice?: {
    value: number;
    formatted: string;
    note?: string;
  };
  discountPercentage: string;
  isFavorite: boolean;
  propertyId: string;
  onFavoriteChange: (isFavorite: boolean) => void;
}

export default function PDPHeader({
  projectName,
  location,
  startingPrice,
  developerPrice,
  bookingDeadlinePrice,
  discountPercentage,
  isFavorite,
  propertyId,
  onFavoriteChange,
}: PDPHeaderProps) {
  const { clearAndAddToCompare } = useCompare();
  const { isAuthenticated } = useAuthContext();
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setFavoriteLoading(true);
    try {
      const response = await homeService.toggleFavorite(propertyId);
      if (response.success && response.data) {
        onFavoriteChange(response.data.isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleCompareClick = () => {
    clearAndAddToCompare({
      id: propertyId,
      title: projectName,
      price: startingPrice.formatted,
      location: location,
      image: undefined,
      developer: "",
    });
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: projectName,
        text: `Check out ${projectName} at ${location}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const discountAmount = bookingDeadlinePrice 
    ? bookingDeadlinePrice.value - startingPrice.value 
    : 0;
  const discountFormatted = discountAmount >= 10000000
    ? `₹ ${(discountAmount / 10000000).toFixed(2)} Crore`
    : discountAmount >= 100000
    ? `₹ ${(discountAmount / 100000).toFixed(2)} Lakh`
    : `₹ ${(discountAmount / 1000).toFixed(0)} K`;

  return (
    <>
      <section className="py-8">
        <div className="container mx-auto p-7 bg-white rounded-[30px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.05)] outline -outline-offset-1 outline-zinc-100 flex flex-col justify-center items-center gap-2.5">
          <div className="self-stretch flex flex-col justify-center items-start gap-3.5">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="w-full max-w-[570px] inline-flex flex-col justify-start items-start gap-5">
                <div className="self-stretch justify-start text-blue-900 text-5xl font-bold font-['Figtree']">{projectName}</div>
                <div className="self-stretch justify-start text-black text-xl font-normal font-['Figtree']">{location}</div>
              </div>
              <div className="flex-1 p-5 bg-indigo-50 rounded-4xl inline-flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
                  <div className="self-stretch inline-flex justify-between items-end">
                    <div className="size- inline-flex flex-col justify-start items-start gap-2.5">
                      <div className="justify-start text-black text-base font-medium font-['Figtree']">Starting Price</div>
                      <div className="justify-start text-black text-4xl font-bold font-['Figtree']">{startingPrice.formatted}</div>
                    </div>
                    <div className="self-stretch inline-flex flex-col justify-between items-end">
                      <div className="justify-start text-black text-base font-medium font-['Figtree']">Starting Developer price</div>
                      <div className="justify-start text-neutral-600 text-2xl font-semibold font-['Figtree'] line-through">{developerPrice}</div>
                    </div>
                  </div>
                  <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="flex-1 px-2.5 py-1.5 bg-white rounded-[60px] inline-flex flex-col justify-center items-start gap-2.5">
                      <div className="size- inline-flex justify-center items-center gap-[5px]">
                        <Image src={upPrice} alt="Up Price" width={21} height={21} />
                        <div className="text-center justify-start text-lime-600 text-sm font-medium font-['Figtree']">
                          {bookingDeadlinePrice?.note || `Up to ${discountFormatted} off`}
                        </div>
                      </div>
                    </div>
                    <div className="text-center justify-start text-red-500 text-sm font-normal font-['Figtree']">
                      Get upto {discountPercentage} discount on this property
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex justify-end items-center gap-3 mt-4">
              <button
                onClick={handleFavoriteClick}
                disabled={favoriteLoading}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  isFavorite
                    ? "border-[#1C4692] bg-[#1C4692] text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <IoHeart className="h-5 w-5" />
                ) : (
                  <IoHeartOutline className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={handleCompareClick}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Add to compare"
              >
                <MdCompareArrows className="h-5 w-5" />
              </button>
              <button
                onClick={handleShareClick}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Share property"
              >
                <IoShareSocialOutline className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            handleFavoriteClick();
          }}
        />
      )}
    </>
  );
}
