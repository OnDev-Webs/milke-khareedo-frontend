"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PDPGalleryProps {
  images: string[];
  mainImage?: string;
  imageDetails?: {
    main: string;
    thumbnails: string[];
  };
  reraQrImage?: string;
  reraDetailsLink?: string;
}

export default function PDPGallery({
  images,
  mainImage,
  imageDetails,
  reraQrImage,
  reraDetailsLink,
}: PDPGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = images && images.length > 0 ? images : (mainImage ? [mainImage] : []);
  const displayImages = allImages.length > 0 ? allImages : ["/placeholder-property.jpg"];
  const [showAllThumbs, setShowAllThumbs] = useState(false);
  const thumbnails = imageDetails?.thumbnails || allImages.slice(1);
  const totalImages = displayImages.length;
  const visibleThumbs = showAllThumbs ? thumbnails : thumbnails.slice(0, 4);


  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto container max-md:px-4">
        <Breadcrumb className="mb-[30px]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-[18px]">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#1C4692] text-[18px]">Properties</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 rounded-3xl">

            {/* Main Image */}
            <div className="relative bg-secondary flex items-center justify-center h-[260px] md:h-80 rounded-[18px] p-4 md:p-6 shadow-[0_0_10px_rgba(0,0,0,0.08)] overflow-hidden">
              {displayImages[currentImageIndex] && (
                <Image
                  src={displayImages[currentImageIndex]}
                  alt="Property main image"
                  fill
                  className="object-cover rounded-[18px]"
                />
              )}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white shadow-lg transition-all z-10"
                    aria-label="Previous image"
                  >
                    <IoChevronBack className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white shadow-lg transition-all z-10"
                    aria-label="Next image"
                  >
                    <IoChevronForward className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {displayImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`transition-all ${index === currentImageIndex
                          ? "h-1.5 w-6 rounded-full bg-white"
                          : "h-1.5 w-1.5 rounded-full bg-white/60 hover:bg-white/80"
                          }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              {reraQrImage && reraDetailsLink && (
                <a
                  href={reraDetailsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 bg-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:bg-gray-50 transition-colors z-10"
                >
                  Click here For RERA Details
                </a>
              )}
            </div>

            {/* Thumbnails */}
            <div
              className={`grid gap-4 ${showAllThumbs ? "grid-cols-4 h-auto" : "grid-cols-2 h-80"
                }`}
            >
              {visibleThumbs.map((img, index) => {
                const isLastVisible =
                  !showAllThumbs &&
                  index === 3 &&
                  totalImages > 4;

                return (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.08)] bg-secondary cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      const mainIndex = displayImages.findIndex((i) => i === img);
                      if (mainIndex !== -1) {
                        setCurrentImageIndex(mainIndex);
                      }
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Property thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* View All overlay ONLY on 4th image */}
                    {isLastVisible && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAllThumbs(true);
                        }}
                        className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center"
                      >
                        <span className="text-white text-sm font-semibold mb-2">
                          +{totalImages - 4}
                        </span>
                        <button className="rounded-full bg-[#FFFFFF] text-[#1C4692] px-5 py-1 text-[16px] font-semibold shadow hover:bg-gray-100">
                          View All
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
