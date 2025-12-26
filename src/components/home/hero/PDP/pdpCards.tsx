"use client";
import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import {
  IoHeartOutline,
  IoHeart,
  IoExpandOutline,
  IoShareSocialOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
import { useApi } from "@/lib/api/hooks/useApi";
import { homeService, type Property } from "@/lib/api/services/home.service";
import { useCompare } from "@/contexts/CompareContext";
import { useAuthContext } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { useRouter } from "next/navigation";

export default function TopProperties() {
  const LIMIT = 6;
  const router = useRouter();
  const { clearAndAddToCompare } = useCompare();
  const { isAuthenticated, checkAuth } = useAuthContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: "favorite" | "compare";
    propertyId: string;
  } | null>(null);
  const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>(
    {},
  );
  const [favoriteLoading, setFavoriteLoading] = useState<
    Record<string, boolean>
  >({});
  // Track current image index for each property
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});
  // Track hover state for each property card
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);

  // Fetch locations from API
  const { data: locationsData } = useApi(() => homeService.getLocations());

  // Build tabs array: "All Properties" first, then locations from API
  const tabs = useMemo(() => {
    const allTabs = ["All Properties"];
    if (locationsData?.locations) {
      allTabs.push(...locationsData.locations);
    }
    return allTabs;
  }, [locationsData]);

  const [activeTab, setActiveTab] = useState("All Properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get location filter based on active tab
  const locationFilter = useMemo(() => {
    return activeTab === "All Properties" ? undefined : activeTab;
  }, [activeTab]);

  // Initialize favorite states from API response
  useEffect(() => {
    const states: Record<string, boolean> = {};
    properties.forEach((prop) => {
      if (prop.isFavorite !== undefined) {
        states[prop.id] = prop.isFavorite;
      }
    });
    setFavoriteStates((prev) => ({ ...prev, ...states }));
  }, [properties]);

  // Fetch initial properties when component mounts or tab changes
  const fetchInitialProperties = useCallback(async () => {
    setProperties([]);
    setCurrentPage(1);
    setHasMore(false);
    setIsLoadingMore(true);

    try {
      const response: any = await homeService.getTopProperty({
        page: 1,
        limit: LIMIT,
        location: locationFilter,
      });

      if (response.success && response.data) {
        setProperties(response.data);
        setHasMore(response.pagination.hasMore);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [locationFilter]);

  useEffect(() => {
    fetchInitialProperties();
  }, [fetchInitialProperties]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Handle load more
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const response: any = await homeService.getTopProperty({
        page: nextPage,
        limit: LIMIT,
        location: locationFilter,
      });
      if (response.success && response.data) {
        const responseData = response.data;
        setProperties((prev) => [...prev, ...responseData]);
        setHasMore(response.pagination.hasMore);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more properties:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Handle favorite click
  const handleFavoriteClick = async (property: Property) => {
    if (!checkAuth()) {
      setPendingAction({ type: "favorite", propertyId: property.id });
      setShowAuthModal(true);
      return;
    }

    setFavoriteLoading((prev) => ({ ...prev, [property.id]: true }));
    try {
      const response = await homeService.toggleFavorite(String(property.id));
      if (response.success && response.data?.isFavorite !== undefined) {
        // Update local state immediately
        setFavoriteStates((prev) => ({
          ...prev,
          [property.id]: response.data!.isFavorite,
        }));
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setFavoriteLoading((prev) => ({ ...prev, [property.id]: false }));
    }
  };

  // Handle compare click
  const handleCompareClick = (property: Property) => {
    if (!checkAuth()) {
      setPendingAction({ type: "compare", propertyId: property.id });
      setShowAuthModal(true);
      return;
    }

    // Clear old data and add new property
    clearAndAddToCompare({
      id: property.id,
      title: property.projectName,
      price:
        property.targetPrice?.formatted ||
        property.offerPrice?.formatted ||
        "Price on request",
      location: property.location,
      developer: property.developer,
      image: property.image || property.images?.[0] || undefined,
    });

    // Navigate to compare page
    router.push("/compare");
  };

  // Handle share click
  const handleShareClick = async (property: Property) => {
    const shareUrl = `${window.location.origin}/property-details?id=${property.id}`;
    const shareText = `Check out ${property.projectName} at ${property.location}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: property.projectName,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy link:", error);
        // Fallback: Show URL in prompt
        prompt("Copy this link:", shareUrl);
      }
    }
  };

  // Handle auth success
  const handleAuthSuccess = () => {
    if (pendingAction) {
      const property = properties.find(
        (p) => p.id === pendingAction.propertyId,
      );
      if (property) {
        if (pendingAction.type === "favorite") {
          handleFavoriteClick(property);
        } else if (pendingAction.type === "compare") {
          handleCompareClick(property);
        }
      }
      setPendingAction(null);
    }
  };

  // Format date for "Last Day to join"
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getFullYear();
      const suffix =
        day === 1 || day === 21 || day === 31
          ? "st"
          : day === 2 || day === 22
            ? "nd"
            : day === 3 || day === 23
              ? "rd"
              : "th";
      return `${day}${suffix} ${month}, ${year}`;
    } catch {
      return dateString;
    }
  };

  // Get images array for a property (use images array if available, otherwise use single image)
  const getPropertyImages = (property: Property): string[] => {
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    if (property.image) {
      return [property.image];
    }
    return [];
  };

  // Navigate to specific image
  const goToImage = (
    propertyId: string,
    index: number,
    totalImages: number,
  ) => {
    if (index >= 0 && index < totalImages) {
      setCurrentImageIndex((prev) => ({ ...prev, [propertyId]: index }));
    }
  };

  // Navigate to next image
  const goToNextImage = (propertyId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => {
      const current = prev[propertyId] ?? 0;
      const next = (current + 1) % totalImages;
      return { ...prev, [propertyId]: next };
    });
  };

  // Navigate to previous image
  const goToPreviousImage = (propertyId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => {
      const current = prev[propertyId] ?? 0;
      const previous = current === 0 ? totalImages - 1 : current - 1;
      return { ...prev, [propertyId]: previous };
    });
  };

  return (
    <section className="w-full py-16 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-black mb-6">
          Top{" "}
          <span className="relative inline-block text-[#FF765E] font-bold">
            Properties
            <svg
              className="absolute left-0 -bottom-2"
              width="228"
              height="11"
              viewBox="0 0 228 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5C60 1.5 170 5.5 226 8.5"
                stroke="#FF765E"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 mb-8 py-2 border-b border-[#E0E0E0]">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={idx}
                onClick={() => handleTabChange(tab)}
                className={`relative px-1 pb-1 text-sm font-medium transition-colors
          ${isActive ? "text-[#FF765E]" : "text-[#818181]"}
        `}
              >
                {tab}

                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-[#FF765E]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoadingMore && properties.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Loading properties...</div>
          </div>
        )}

        {/* Cards Grid */}
        {!isLoadingMore || properties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {properties.map((prop) => {
              const isFavorite =
                favoriteStates[prop.id] ?? prop.isFavorite ?? false;
              const isLoading = favoriteLoading[prop.id] ?? false;
              const images = getPropertyImages(prop);
              const currentIndex = currentImageIndex[prop.id] ?? 0;
              const hasMultipleImages = images.length > 1;
              const currentImage = images[currentIndex] || null;

              return (
                <div
                  key={prop.id}
                  className="flex flex-col rounded-3xl bg-white shadow-lg overflow-hidden group"
                  onMouseEnter={() => setHoveredProperty(prop.id)}
                  onMouseLeave={() => setHoveredProperty(null)}
                >
                  {/* Image Section with Slider */}
                  <div className="relative h-52 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {currentImage ? (
                      <Image
                        key={`${prop.id}-${currentIndex}`}
                        src={currentImage}
                        alt={`${prop.projectName} - Image ${currentIndex + 1}`}
                        className="object-cover transition-opacity duration-300"
                        fill
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No Image</div>
                    )}

                    {/* Last Day to join Banner */}
                    {prop.lastDayToJoin && (
                      <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-md z-10">
                        <span className="text-xs font-medium text-black">
                          Last Day to join: {formatDate(prop.lastDayToJoin)}
                        </span>
                      </div>
                    )}

                    {/* Action Icons - Right Side (Stacked) - Only visible on hover */}
                    <div
                      className={`absolute top-3 right-3 flex flex-col gap-2 z-20 transition-all duration-300 ${
                        hoveredProperty === prop.id
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {/* Heart Icon (Favorite) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteClick(prop);
                        }}
                        disabled={isLoading}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                          isFavorite
                            ? "border-[#f15a29] bg-[#f15a29] text-white"
                            : "border-white bg-white/90 text-gray-700 hover:bg-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
                        aria-label={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
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
                          handleCompareClick(prop);
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
                          handleShareClick(prop);
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
                            goToPreviousImage(prop.id, images.length);
                          }}
                          className={`absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 hover:bg-white shadow-lg transition-all duration-300 z-10 border border-gray-200 backdrop-blur-sm ${
                            hoveredProperty === prop.id
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
                            goToNextImage(prop.id, images.length);
                          }}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 hover:bg-white shadow-lg transition-all duration-300 z-10 border border-gray-200 backdrop-blur-sm ${
                            hoveredProperty === prop.id
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
                            onClick={() =>
                              goToImage(prop.id, index, images.length)
                            }
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
                          {prop.projectName}
                        </h3>
                        <p className="text-[15px] text-[#828282] mt-1 truncate">
                          {prop.location}
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
                          {prop.groupSizeFormatted}
                        </span>
                        <span className="text-xs text-black mt-0.5">
                          Members
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-[#F2F6FF] px-4 py-2 rounded-lg text-center flex-1">
                        <span className="text-[14px] text-black font-semibold">
                          Opening
                        </span>
                        <span className="text-base font-bold text-[#f15a29] mt-1">
                          {prop.openingFormatted}
                        </span>
                        <span className="text-xs text-black mt-0.5">Left</span>
                      </div>
                    </div>

                    {/* Target Price + Developer Price */}
                    <div className="flex justify-between items-start mt-3">
                      {/* Target Price */}
                      <div>
                        <span className="text-xs text-gray-500">
                          Target Price
                        </span>
                        <div className="text-base font-bold text-gray-800">
                          {prop.targetPrice.formatted}
                        </div>
                        {prop.discount && (
                          <span className="mt-1 inline-block bg-[#FFFFFF] border border-[#F6F6F6] rounded-xl pe-10 ps-1 py-0.5 text-xs font-semibold text-[#66AE39]">
                            {prop.discount.displayText}
                          </span>
                        )}
                      </div>

                      {/* Developer Price */}
                      <div className="text-right">
                        <span className="text-xs text-gray-500">
                          Developer price
                        </span>
                        <div className="text-sm font-semibold text-gray-400 line-through">
                          {prop.developerPrice.formatted}
                        </div>
                        <span className="mt-1 inline-block rounded-full bg-white border border-[#F6F6F6] px-2 py-0.5 text-xs font-semibold text-[#FF3232]">
                          {prop.discountPercentage}
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
            })}

            {/* Load More Button */}
            {hasMore && (
              <div className="md:col-span-3 col-span-1 flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="px-8 py-3 rounded-full border border-[#F5F5F5] text-[#2D2D2D] bg-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}

            {/* No Properties Message */}
            {!isLoadingMore && properties.length === 0 && (
              <div className="md:col-span-3 col-span-1 flex justify-center py-20">
                <div className="text-gray-500">No properties found.</div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingAction(null);
        }}
        onSuccess={handleAuthSuccess}
      />
    </section>
  );
}
