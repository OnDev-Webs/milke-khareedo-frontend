"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyMap from "@/components/map/PropertyMap";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";
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

  const [priceValue, setPriceValue] = useState(70);
  const [selectedBhk, setSelectedBhk] = useState("2.5 BHK");
  const [areaValue, setAreaValue] = useState(40);
  const [selectedPossession, setSelectedPossession] = useState("Ready to Move");
  const [results, setResults] = useState<Property[] | null>(null);
  const [paginationData, setPaginationData] = useState<PaginationInfo | null>(
    null,
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    // try sessionStorage first
    const cached = sessionStorage.getItem("searchResults");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // parsed.results should match what HeroSection stored
        setResults(parsed.results?.data ?? parsed.results ?? []);
        setPaginationData(parsed.pagination ?? null);
        return;
      } catch (e) {
        console.warn("Invalid cached searchResults", e);
      }
    }

    // fallback: fetch based on query params
    const city = searchParams.get("city") ?? undefined;
    const q = searchParams.get("search") ?? undefined;
    if (city || q) {
      (async () => {
        const resp = await homeService.searchProperties({
          city,
          searchText: q,
          page: Number(searchParams.get("page") || 1),
          limit: Number(searchParams.get("limit") || 10),
        });
        if (resp.success && resp.data)
          setResults(resp.data.results || resp.data.data || []);
        else setResults([]);
      })();
    } else {
      setResults([]);
    }
  }, [searchParams]);

  const getImageIndex = (propertyId: string) =>
    currentImageIndex[propertyId] || 0;

  const handleCityChange = (cityValue: string) => {
    setSelectedCity(cityValue);
    // You can add additional logic here, such as filtering properties based on city
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

  const handleSearch = async () => {
    const query = String(searchQuery).trim();

    try {
      const response = await homeService.searchProperties({
        city: selectedCity.split(",").pop()?.trim() || selectedCity,
        searchText: query,
        sortBy: sortBy.toLowerCase().replace(/ /g, ""),
        page: 1,
        limit: 10,
        // priceMin,
        // priceMax,
        bhk: selectedBhk,
        // propertyType: ,
        projectStatus: selectedPossession,
        // sortBy,
      })

      if (response.success && response.data) {
        setResults(response.data.results || response.data.data || []);
        setPaginationData(response.pagination || null);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#F3F3F3] mb-5 px-4">
        <div className="inline-flex w-full max-w-md">
          <div className="relative flex flex-col justify-center pe-4 py-4 min-w-[130px]">
            <label className="text-sm font-bold text-gray-800 mb-2.5">
              City
            </label>
            <div className="relative" style={{ zIndex: 1000 }}>
              <CitySelector
                value={selectedCity}
                onChange={handleCityChange}
                className="h-auto"
                showLabel={false}
              />
            </div>
            <span
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2
                           h-10 w-0.5 bg-[#DCDCEB]"
            />
          </div>
          <div className="relative flex-1 flex flex-col justify-start ps-4 pe-6 py-4">
            <div className="relative">
              <p className="text-base font-semibold text-gray-900">
                Find your Dream Home
              </p>
              <div className="flex items-center gap-1.5 mt-[5px]">
                <FaMapMarkerAlt className="text-gray-500 text-xs shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(!isSearchFocused)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search for Developers, Location, Projects"
                  className="w-full bg-transparent outline-none border-none focus:ring-0 transition-all duration-300 text-xs text-gray-500"
                />
              </div>
              {/* <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Find your Dream Home"
                className="w-full bg-transparent text-base font-bold text-gray-800 outline-none border-none focus:outline-none focus:ring-0 placeholder:text-base placeholder:font-bold placeholder:text-gray-800 transition-all duration-300 min-h-[24px]"
              />
              <div
                className={`absolute left-0 top-full mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 pointer-events-none transition-opacity duration-300 ${searchQuery || isSearchFocused ? "opacity-0" : "opacity-100"}`}
              >
                <FaMapMarkerAlt className="text-gray-500 text-xs flex-shrink-0" />
                <span>Search for Developers, Location, Projects</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Price Range Popover */}
          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              50L-100 CR
            </PopoverTrigger>
            <PopoverContent className="w-80">
              {/* inside PopoverContent for Price */}
              <div className="px-4 py-4">
                {/* <Progress className="w-full" value={priceValue} max={100} /> */}

                <div className="flex items-center flex-col gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={priceValue}
                    onChange={(e) => setPriceValue(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="min-w-[90px] text-sm text-[#1C4692] font-semibold text-center">
                    {priceValue}%
                    {/* or format to currency if you map percent -> amount */}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* BHK Popover */}
          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              {selectedBhk}
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 max-h-56 overflow-y-auto pr-2">
                  {[
                    "1 BHK",
                    "1.5 BHK",
                    "2 BHK",
                    "2.5 BHK",
                    "3 BHK",
                    "3.5 BHK",
                    "4 BHK",
                    "4.5 BHK",
                    "5 BHK",
                    "5.5 BHK",
                    "6 BHK",
                    "6.5 BHK",
                    "7 BHK",
                    "7.5 BHK",
                    "8 BHK",
                  ].map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => setSelectedBhk(bhk)}
                      className={cn(
                        "py-3 px-6 rounded-full text-sm font-medium",
                        selectedBhk === bhk
                          ? "bg-[#1C4692] text-white"
                          : "bg-[#F7F9FB] text-black",
                      )}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Super Area Popover */}
          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              Super Area sq.ft
            </PopoverTrigger>
            <PopoverContent className="w-80">
              {/* inside PopoverContent for Super Area */}
              <div className="px-4 py-4">
                {/* <Progress className="w-full" value={areaValue} max={100} /> */}

                <div className="flex flex-col items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={areaValue}
                    onChange={(e) => setAreaValue(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="min-w-[90px] text-sm text-[#1C4692] font-semibold text-center">
                    {areaValue}%
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Possession Status Popover */}
          <Popover>
            <PopoverTrigger className="bg-[#EEF4FF] rounded-[16px] px-5 py-[17px] text-sm font-medium">
              Possession Status
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="p-6">
                <div className="flex flex-wrap gap-4">
                  {[
                    "Available",
                    "Under Construction",
                    "Ready to Move",
                    "Sold",
                    "Occupied",
                    "Pending",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedPossession(status)}
                      className={cn(
                        "py-2 px-4 rounded-full text-sm font-medium",
                        selectedPossession === status
                          ? "bg-[#1C4692] text-white"
                          : "bg-[#F7F9FB] text-black",
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <button onClick={handleSearch} className="ml-2 inline-flex items-center gap-2 bg-[#1C4692] text-white px-6 py-3 rounded-[16px] font-semibold  transition-colors">
            <FaSearch /> Search
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {/* Properties Grid */}
        <div className="flex-1 px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black">
              Projects in Mumbai Central, Mumbai
            </h2>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-[#EEF4FF] rounded-[10px] py-2.5 px-[15px]">
                  Short by: {sortBy}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("New Added")}>
                    New Added
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("Price: Low to High")}
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("Price: High to Low")}
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel onClick={() => setSortBy("More Options")}>
                    More Options
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSortBy("Most Popular")}>
                    Most Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("Highest Rated")}>
                    Highest Rated
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="mb-6 text-sm text-[#141414]">Showing 4 of 4 Projects</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Property Cards */}
            {results && results.length > 0 ? (
              results.map((property) => {
                const images = getPropertyImages(property);
                return (
                  <SearchPropertyCard
                    key={property.id}
                    property={property}
                    images={images}
                  />
                );
              })
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-500">No properties found</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Sidebar */}
        <div className="w-1/3 h-screen">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden">
            <PropertyMap properties={results} />
          </div>
        </div>
      </div>
    </>
  );
}
