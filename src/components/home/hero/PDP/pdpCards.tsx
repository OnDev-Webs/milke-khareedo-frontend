"use client";
import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useApi } from "@/lib/api/hooks/useApi";
import { homeService, type Property } from "@/lib/api/services/home.service";

export default function TopProperties() {
  const LIMIT = 6;

  // Fetch locations from API
  const { data: locationsData } = useApi(
    () => homeService.getLocations()
  );

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
      console.log('response', response)

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
        <div className="flex flex-wrap gap-6 mb-8 py-2">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => handleTabChange(tab)}
              className={`relative pb-2 text-sm font-medium transition-colors ${activeTab === tab
                ? "text-[#FF765E]"
                : "text-[#818181]"
                }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FF765E]" />
              )}
            </button>
          ))}
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
            {properties.map((prop) => (
              <div key={prop.id} className="flex flex-col rounded-3xl bg-white shadow-lg p-4">
                {/* Image */}
                <div className="relative h-52 w-full mb-4 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                  {prop.image ? (
                    <Image
                      src={prop.image}
                      alt={prop.projectName}
                      className="object-cover"
                      fill
                      style={{ borderRadius: '12px' }}
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No Image</div>
                  )}
                </div>

                {/* Title + Subtitle + Call button */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-[20px] font-semibold text-black">{prop.projectName}</h3>
                    <p className="text-[15px] text-[#828282] mt-1">{prop.location}</p>
                  </div>
                  <button className="bg-[#66AE39] text-white px-3 py-2 rounded-full flex items-center gap-1 text-xs">
                    <FaPhoneAlt /> Call
                  </button>
                </div>

                {/* Group Size + Opening */}
                <div className="flex justify-between mt-2 mb-2 gap-2">
                  <button className="flex flex-col items-center bg-[#F2F6FF] px-4 py-2 rounded-lg text-center">
                    <span className="text-[14px] text-black font-semibold">Group Size</span>
                    <span className="text-xs font-semibold text-[#525252]">{prop.groupSizeFormatted}</span>
                  </button>
                  <button className="flex flex-col items-center bg-[#F2F6FF] px-4 py-2 rounded-lg text-center">
                    <span className="text-[14px] text-black font-semibold">Opening</span>
                    <span className="text-xs font-semibold text-[#525252]">{prop.openingFormatted}</span>
                  </button>
                </div>

                {/* Target Price + Developer Price */}
                <div className="flex justify-between items-start mt-3">
                  {/* Target Price */}
                  <div>
                    <span className="text-xs text-gray-500">Target Price</span>
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
                    <span className="text-xs text-gray-500">Developer Price</span>
                    <div className="text-sm font-semibold text-gray-400 line-through">
                      {prop.developerPrice.formatted}
                    </div>
                    <span className="mt-1 inline-block rounded-full bg-white border border-[#F6F6F6] px-2 py-0.5 text-xs font-semibold text-[#FF3232]">
                      {prop.discountPercentage}
                    </span>
                  </div>
                </div>

                {/* Join Group Button */}
                <button className="mt-4 w-full bg-[#FF765E] text-white py-3 rounded-3xl font-semibold hover:bg-[#e86b50]">
                  Join Group
                </button>
              </div>
            ))}

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
    </section>
  );
}
