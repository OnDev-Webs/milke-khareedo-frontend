"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface RERAStickyWidgetProps {
  reraId?: string;
  reraQrImage?: string;
  reraDetailsLink?: string;
}

export default function RERAStickyWidget({
  reraId,
  reraQrImage,
  reraDetailsLink,
}: RERAStickyWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle expand/collapse with smooth animation
  const handleToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsExpanded((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    if (isExpanded) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.rera-widget-container')) {
          setIsExpanded(false);
        }
      };
      
      // Add slight delay to prevent immediate close on open
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isExpanded]);

  // Default RERA URL
  const defaultReraUrl = "https://maharera.maharashtra.gov.in/";
  
  // Use provided link or default URL (check if it's an image link)
  const getReraLink = () => {
    if (!reraDetailsLink) {
      return defaultReraUrl;
    }
    // Check if the link is an image (common image extensions)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const isImageLink = imageExtensions.some(ext => 
      reraDetailsLink.toLowerCase().includes(ext)
    );
    // If it's an image link, use default URL, otherwise use provided link
    return isImageLink ? defaultReraUrl : reraDetailsLink;
  };

  const reraLink = getReraLink();

  // Don't render if no RERA data at all
  if (!reraQrImage && !reraId) {
    return null;
  }

  return (
    <div className="rera-widget-container fixed bottom-6 right-6 z-50">
      {/* Collapsed State - Vertical Grey Button (Matching First Image Exactly) */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded 
            ? "opacity-0 scale-0 pointer-events-none absolute" 
            : "opacity-100 scale-100 pointer-events-auto relative"
        }`}
        style={{ 
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom right"
        }}
      >
        <button
          onClick={handleToggle}
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 px-5 py-4 flex flex-col items-center justify-center gap-0.5 min-w-[140px] border border-gray-500"
          aria-label="View RERA Details"
        >
          <span className="text-xs leading-tight text-center font-normal">
            Click here For
          </span>
          <span className="text-sm font-semibold text-center mt-0.5">
            RERA Details
          </span>
        </button>
      </div>

      {/* Expanded State - Full Card (Matching Second Image) */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded
            ? "opacity-100 scale-100 pointer-events-auto relative"
            : "opacity-0 scale-95 pointer-events-none absolute"
        }`}
        style={{ 
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom right"
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden min-w-[360px] max-w-[400px]">
          {/* Header with Blue Background and Close Button (Matching Second Image) */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
            {/* Red Close Button - Top Left Corner */}
            <button
              onClick={handleToggle}
              className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg z-10"
              aria-label="Close RERA Details"
            >
              <IoClose className="w-5 h-5" />
            </button>
            
            {/* Title - Matching reference exactly */}
            <h3 className="text-white font-bold text-base ml-11 pr-4 leading-snug">
              MehaRERA Registration numbers
            </h3>
          </div>

          {/* Content Section - Matching reference layout */}
          <div className="p-5">
            <div className="flex gap-4 items-start">
              {/* Left side - Text Content */}
              <div className="flex-1 min-w-0">
                {/* RERA Registration Number */}
                {reraId && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 break-words leading-relaxed">
                      {reraId}
                    </p>
                  </div>
                )}

                {/* RERA Link - Always show the link */}
                <div>
                  <a
                    href={reraLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium underline break-all transition-colors"
                  >
                    {reraLink}
                  </a>
                </div>
              </div>

              {/* Right side - QR Code */}
              {reraQrImage && (
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 bg-white rounded border border-gray-300 p-2">
                    <Image
                      src={reraQrImage}
                      alt="RERA QR Code"
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

