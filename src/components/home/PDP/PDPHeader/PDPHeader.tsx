"use client";

import upPrice from "@/assets/upPrice.svg"
import Image from "next/image"
import { type PropertyPrice } from "@/lib/api/services/home.service";
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

  const discountAmount = bookingDeadlinePrice
    ? bookingDeadlinePrice.value - startingPrice.value
    : 0;
  const discountFormatted = discountAmount >= 10000000
    ? `₹ ${(discountAmount / 10000000).toFixed(2)} Crore`
    : discountAmount >= 100000
      ? `₹ ${(discountAmount / 100000).toFixed(2)} Lakh`
      : `₹ ${(discountAmount / 1000).toFixed(0)} K`;

  const formatPrice = (value: number) => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Crore`;
    }
    if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(2)} Lakh`;
    }
    return `₹ ${(value / 1000).toFixed(0)} K`;
  };

  const developerPriceNumber =
    typeof developerPrice === "string"
      ? Number(developerPrice.replace(/[₹,\sA-Za-z]/g, ""))
      : developerPrice;

  return (
    <>
      <section className="py-8">
        <div className="container mx-auto p-7 bg-white rounded-[30px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.05)] outline -outline-offset-1 outline-zinc-100 flex flex-col justify-center items-center gap-2.5">
          <div className="self-stretch flex flex-col justify-center items-start gap-3.5">
            {/* <div className="self-stretch inline-flex justify-between items-center"> */}
            <div className="self-stretch flex flex-col gap-6 md:flex-row md:justify-between md:items-center">

              <div className="w-full max-w-[700px] inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-[#1C4692] text-[45px] font-bold font-['Figtree']">{projectName}</div>
                <div className="self-stretch justify-start text-[#000000] text-[22px] font-normal font-['Figtree']">{location}</div>
              </div>

              <div className="w-full md:flex-1 p-4 md:p-5 bg-[#EEF4FF] rounded-[20px] flex flex-col">
                <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
                  <div className="self-stretch flex flex-col gap-4 md:flex-row md:justify-between md:items-end">

                    <div className="size- inline-flex flex-col justify-start items-start gap-2.5">
                      <div className="justify-start text-[#000000] text-[16px] font-medium font-['Figtree']">Starting Price</div>
                      <div className="justify-start text-[#000000] text-[35px] font-bold">
                        {formatPrice(startingPrice.value)}
                      </div>

                    </div>
                    <div className="self-stretch inline-flex flex-col justify-between items-start md:items-end">
                      <div className="justify-start text-[#000000] text-[16px] font-medium font-['Figtree']">Starting Developer price</div>
                      <div className="justify-start text-[#4B4B4B] text-[24px] font-semibold line-through">
                        {formatPrice(developerPriceNumber)}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
                  <div className="self-stretch flex flex-col gap-3 md:flex-row md:items-center md:gap-2.5">
                    <div className="flex-1 px-2.5 py-1.5 bg-white rounded-[60px] inline-flex flex-col justify-center items-start gap-2.5">
                      <div className="size- inline-flex justify-center items-center text-[#66AE39]  gap-[5px]">
                        <Image src={upPrice} alt="Up Price" width={21} height={21} />
                        <div className="text-center justify-start text-lime-600 text-[14px] font-medium font-['Figtree']">
                          {bookingDeadlinePrice?.note || `Up to ${discountFormatted} off`}
                        </div>
                      </div>
                    </div>
                    <div className="text-center justify-start text-[#FF3232] text-[14px] font-normal font-['Figtree']">
                      Get upto {discountPercentage} discount on this property
                    </div>
                  </div>
                </div>
              </div>
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
