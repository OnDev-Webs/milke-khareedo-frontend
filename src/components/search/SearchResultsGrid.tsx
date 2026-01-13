"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyMap from "@/components/map/PropertyMap";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import CitySelector from "../home/hero/CitySelector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  homeService,
  PaginationInfo,
  type Property,
} from "@/lib/api/services/home.service";
import { useSearchParams } from "next/navigation";
import SearchPropertyCard from "./SearchPropertyCard";
import { getPropertyImages } from "@/lib/utils/getPropertyImages";

export default function SearchResultsGrid() {
  const [selectedCity, setSelectedCity] = useState("India, Delhi");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState("New Added");
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  const [selectedBhk, setSelectedBhk] = useState("2.5 BHK");
  const [selectedPossession, setSelectedPossession] = useState("Ready to Move");
  const [results, setResults] = useState<Property[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationInfo | null>(
    null,
  );

  const searchParams = useSearchParams();

  const fetchProperties = async (params: {
    city?: string;
    searchText?: string;
    bhk?: string;
    projectStatus?: string;
    sortBy?: string;
  }) => {
    try {
      const resp = await homeService.searchProperties({
        ...params,
        page: 1,
        limit: 10,
      });

      if (resp.success && Array.isArray(resp.data)) {
        setResults(resp.data);
        setPaginationData(resp.pagination ?? null);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  useEffect(() => {
    const city = searchParams.get("city") ?? undefined;
    const q = searchParams.get("search") ?? undefined;

    if (!city && !q) {
      setResults([]);
      return;
    }

    fetchProperties({
      city,
      searchText: q,
      sortBy,
    });
  }, [searchParams, sortBy]);


  const getImageIndex = (propertyId: string) =>
    currentImageIndex[propertyId] || 0;

  const handleCityChange = (cityValue: string) => {
    setSelectedCity(cityValue);
    console.log("Selected city:", cityValue);
  };

  const handleImageNavigation = (
    propertyId: string,
    direction: "next" | "prev",
  ) => {
    const currentIndex = getImageIndex(propertyId);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: Math.max(0, Math.min(newIndex, 2)), // Assuming 3 images
    }));
  };

  const handleSearch = () => {
    fetchProperties({
      city: selectedCity.split(",").pop()?.trim(),
      searchText: searchQuery.trim(),
      bhk: selectedBhk,
      projectStatus: selectedPossession,
      sortBy,
    });
  };


  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#F3F3F3] mb-5 px-4">
        {/* CITY + SEARCH */}
        <div className="inline-flex w-full md:max-w-md">
          <div className="relative flex flex-col justify-center pe-4 py-4 min-w-[130px]">
            <label className="text-sm font-bold text-gray-800 mb-2.5">
              City
            </label>
            <div className="relative z-[1000]">
              <CitySelector
                value={selectedCity}
                onChange={handleCityChange}
                className="h-auto"
                showLabel={false}
              />
            </div>
            <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-0.5 bg-[#DCDCEB]" />
          </div>
          <div className="relative flex-1 flex flex-col justify-start ps-4 pe-6 py-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Find your Dream Home"
                className="w-full bg-transparent text-base font-bold text-gray-800 outline-none border-none focus:ring-0 placeholder:text-base placeholder:font-bold placeholder:text-gray-800"
              />
              <div className={`absolute left-0 top-full mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 pointer-events-none transition-opacity ${searchQuery || isSearchFocused ? "opacity-0" : "opacity-100"}`}>
                <FaMapMarkerAlt className="text-xs" />
                <span>Search for Developers, Location, Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible whitespace-nowrap pb-2 md:pb-0">
          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              50L-100 CR
            </PopoverTrigger>
            <PopoverContent className="w-80" />
          </Popover>

          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              {selectedBhk}
            </PopoverTrigger>
            <PopoverContent className="w-96" />
          </Popover>

          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              Super Area sq.ft
            </PopoverTrigger>
            <PopoverContent className="w-80" />
          </Popover>

          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              Possession Status
            </PopoverTrigger>
            <PopoverContent className="w-80" />
          </Popover>

          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-2 bg-[#1C4692] text-white px-6 py-3 rounded-[16px] font-semibold"
          >
            <FaSearch /> Search
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/3 order-1 md:order-2">
          <div className="h-[300px] md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-hidden">
            <PropertyMap properties={results} />
          </div>
        </div>

        {/* PROPERTY LIST */}
        <div className="flex-1 px-4 order-2 md:order-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black">
              Projects in Mumbai Central, Mumbai
            </h2>

            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#EEF4FF] rounded-[10px] py-2.5 px-[15px]">
                Sort by: {sortBy}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("New Added")}>
                  New Added
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Price: Low to High")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("Price: High to Low")}>
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="mb-6 text-sm text-[#141414]">
            Showing {results.length} of {paginationData?.total ?? results.length} Projects
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {results.length > 0 ? (
              results.map((property) => (
                <SearchPropertyCard
                  key={property.id}
                  property={property}
                  images={getPropertyImages(property)}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-gray-500">
                No properties found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}