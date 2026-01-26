"use client";

import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PropertyMap from "@/components/map/PropertyMap";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import CitySelector from "../home/hero/CitySelector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { homeService, PaginationInfo, type Property } from "@/lib/api/services/home.service";
import { useRouter, useSearchParams } from "next/navigation";
import SearchPropertyCard from "./SearchPropertyCard";
import { getPropertyImages } from "@/lib/utils/getPropertyImages";
import { useCompare } from "@/contexts/CompareContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Slider } from "../ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SearchResultsGrid() {
  const [selectedCity, setSelectedCity] = useState("India, Delhi");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState("newAdded");
  const [selectedBhk, setSelectedBhk] = useState("2.5 BHK");
  const [selectedPossession, setSelectedPossession] = useState("Ready to Move");
  const [results, setResults] = useState<Property[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationInfo | null>(null);
  const searchParams = useSearchParams();
  const { clearAndAddToCompare } = useCompare();
  const { checkAuth } = useAuthContext();
  const router = useRouter();
  const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>({});
  const [favoriteLoading, setFavoriteLoading] = useState<Record<string, boolean>>({});
  const [joinGroupStates, setJoinGroupStates] = useState<Record<string, boolean>>({});
  const [joinGroupLoading, setJoinGroupLoading] = useState<Record<string, boolean>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: "favorite" | "compare" | "join";
    propertyId: string;
  } | null>(null);

  const [priceOpen, setPriceOpen] = useState(false);
  const [bhkOpen, setBhkOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [possessionOpen, setPossessionOpen] = useState(false);
  const cityParam = searchParams.get("city");
  const searchParam = searchParams.get("search");

  const [priceRange, setPriceRange] = useState<[number, number]>([30, 100]);
  const [areaRange, setAreaRange] = useState<[number, number]>([400, 5000]);
  const bhkOptions = [
    "1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK",
    "3.5 BHK", "4 BHK", "4.5 BHK", "5 BHK",
    "5.5 BHK", "6 BHK", "6.5 BHK", "7 BHK",
  ];

  const detectBhkFromQuery = (query: string) => {
    const match = query.match(/(\d+(\.\d+)?)\s*bhk/i);
    return match ? `${match[1]} BHK` : null;
  };


  const possessionOptions = [
    "Ready to Move",
    "Under Construction",
    "Upcoming",
  ];

  const fetchProperties = async (params: {
    city?: string;
    searchText?: string;
    priceMin?: string;
    priceMax?: string;
    areaMin?: string;
    areaMax?: string;
    bhk?: string;
    projectStatus?: string;
    sortBy?: string;
  }) => {
    try {
      const resp = await homeService.searchProperties({
        ...params,
        page: 1,
        limit: 1000,
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

  const normalizeCityValue = (city: string) => {
    if (!city) return "India, Delhi";
    if (city.includes(",")) return city;
    return `India, ${city}`;
  };

  useEffect(() => {
    if (cityParam) {
      setSelectedCity(normalizeCityValue(cityParam));
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [cityParam, searchParam]);


  const bhkParam = searchParams.get("bhk");

  useEffect(() => {
    fetchProperties({
      city: cityParam ?? undefined,
      searchText: searchParam ?? undefined,
      bhk: bhkParam ?? undefined,
      sortBy,
    });
  }, [searchParams, sortBy]);


  const getDisplayCity = (city: string) => {
    if (!city) return "";
    return city.includes(",")
      ? city.split(",").pop()?.trim()
      : city;
  };


  const handleCityChange = (cityValue: string) => {
    setSelectedCity(cityValue);
  };

  const handleSearch = () => {
    const detectedBhk = detectBhkFromQuery(searchQuery);

    const bhkToUse = detectedBhk ?? selectedBhk;

    fetchProperties({
      city: selectedCity.split(",").pop()?.trim(),
      searchText: detectedBhk ? "" : searchQuery.trim(),
      bhk: bhkToUse,
      priceMin: String(priceRange[0] * 100000),
      priceMax: String(priceRange[1] * 10000000),
      areaMin: String(areaRange[0]),
      areaMax: String(areaRange[1]),
      projectStatus: selectedPossession,
      sortBy,
    });
  };

  useEffect(() => {
    const favs: Record<string, boolean> = {};
    const joins: Record<string, boolean> = {};

    results.forEach((p) => {
      favs[p.id] = p.isFavorite ?? false;
      joins[p.id] = p.isJoinGroup ?? false;
    });

    setFavoriteStates((prev) => ({ ...favs, ...prev }));
    setJoinGroupStates((prev) => ({ ...joins, ...prev }));
  }, [results]);

  const handleFavoriteClick = async (property: Property) => {
    if (!checkAuth()) {
      setPendingAction({ type: "favorite", propertyId: property.id });
      setShowAuthModal(true);
      return;
    }

    setFavoriteStates((prev) => ({
      ...prev,
      [property.id]: !prev[property.id],
    }));

    try {
      const res = await homeService.toggleFavorite(String(property.id));
      const { success, data } = res;

      if (success && data && typeof data.isFavorite === "boolean") {
        setFavoriteStates((prev) => ({
          ...prev,
          [property.id]: data.isFavorite,
        }));
      }
    } catch (e) {
      setFavoriteStates((prev) => ({
        ...prev,
        [property.id]: !prev[property.id],
      }));
    }
  };

  const handleCompareClick = (property: Property) => {
    if (!checkAuth()) {
      setPendingAction({ type: "compare", propertyId: property.id });
      setShowAuthModal(true);
      return;
    }

    clearAndAddToCompare({
      id: property.id,
      title: property.projectName,
      price: property.targetPrice?.formatted ?? "Price on request",
      location: property.location,
      image: property.image ?? property.images?.[0],
      developer: property.developer,
    });

    router.push("/compare");
  };

  const handleShareClick = async (property: Property) => {
    const url = `${window.location.origin}/property-details/${property.id}`;
    if (navigator.share) {
      await navigator.share({ title: property.projectName, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handleJoinGroupClick = async (property: Property) => {
    if (!checkAuth()) {
      setPendingAction({ type: "join", propertyId: property.id });
      setShowAuthModal(true);
      return;
    }

    setJoinGroupLoading((p) => ({ ...p, [property.id]: true }));
    try {
      const res = await homeService.joinGroup(property.id);
      if (res.success) {
        setJoinGroupStates((p) => ({ ...p, [property.id]: true }));
      }
    } finally {
      setJoinGroupLoading((p) => ({ ...p, [property.id]: false }));
    }
  };

  const filterBtnClass = `flex items-center justify-between gap-2 bg-[#EEF4FF] text-[#7B7B7B] rounded-[15px] px-3 py-[17px] text-[14px] font-medium`;

  const sortLabelMap: Record<string, string> = {
    newAdded: "New Added",
    oldest: "Oldest",
    priceLow: "Price: Low to High",
    priceHigh: "Price: High to Low",
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-[#F3F3F3] mb-5 px-4">
        {/* CITY + SEARCH */}
        <div className="flex flex-col sm:flex-row w-full lg:max-w-md">
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
            <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-0.5 bg-[#DCDCEB]" />
          </div>
          <div className="relative flex-1 flex flex-col justify-start py-4 sm:ps-4 sm:pe-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Find your Dream Home"
                className="w-full bg-transparent text-[26px] font-semibold text-gray-900 text-left mt-1 outline-none border-none focus:ring-0 placeholder:text-base placeholder:font-bold placeholder:text-gray-800"
              />
              <div className={`absolute left-0 top-full mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 pointer-events-none transition-opacity ${searchQuery || isSearchFocused ? "opacity-0" : "opacity-100"}`}>
                <FaMapMarkerAlt className="text-xs" />
                <span>Search for Developers, Location, Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-2 gap-2 w-full md:flex md:flex-wrap md:items-center md:w-full lg:flex lg:flex-nowrap lg:w-auto">
          <Popover open={priceOpen} onOpenChange={setPriceOpen}>
            <PopoverTrigger asChild>
              <button className={filterBtnClass}>
                <span>{priceRange[0]}L – {priceRange[1]}CR</span>
                {priceOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-6">
              <Slider
                value={priceRange}
                onValueChange={(val) =>
                  setPriceRange(val as [number, number])
                }
                min={30}
                max={100}
                step={1}
              />
              <div className="text-center bg-[#EEF4FF] py-2 text-[#1C4692] text-[16px] font-semibold rounded-[10px]">
                <span>₹ {priceRange[0]} Lakh - ₹ {priceRange[1]} Crore</span>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={bhkOpen} onOpenChange={setBhkOpen}>
            <PopoverTrigger asChild>
              <button className={filterBtnClass}>
                <span>{selectedBhk}</span>
                {bhkOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-48 p-2">
              <div className="max-h-[158px] overflow-y-auto no-scrollbar">
                {bhkOptions.map((bhk) => (
                  <button
                    key={bhk}
                    onClick={() => {
                      setSelectedBhk(bhk);
                      setBhkOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm
                    ${selectedBhk === bhk ? "bg-[#1C4692] text-white" : "hover:bg-gray-100"}`}>
                    {bhk}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={areaOpen} onOpenChange={setAreaOpen}>
            <PopoverTrigger asChild>
              <button className={filterBtnClass}>
                <span>Super Area sq.ft</span>
                {areaOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4">
              <Slider
                value={areaRange}
                onValueChange={(v) => setAreaRange(v as [number, number])}
                min={400}
                max={5000}
                step={50}
              />
              <div className="text-center bg-[#EEF4FF] py-2 text-[#1C4692] text-[16px] font-semibold rounded-[10px]">
                <span>{areaRange[0]} sq.ft - {areaRange[1]} sq.ft</span>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={possessionOpen} onOpenChange={setPossessionOpen}>
            <PopoverTrigger asChild>
              <button className={filterBtnClass}>
                <span>{selectedPossession}</span>
                {possessionOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-2">
              {possessionOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedPossession(status)
                    setPossessionOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm
                 ${selectedPossession === status ? "bg-[#1C4692] text-white" : "hover:bg-gray-100"}`}>
                  {status}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          <button
            onClick={handleSearch}
            className="col-span-2 inline-flex items-center justify-center gap-2 bg-[#1C4692] text-white px-6 py-3 rounded-[16px] font-semibold sm:w-auto w-full">
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
              {searchQuery
                ? `Results for "${searchQuery}" in ${getDisplayCity(selectedCity)}`
                : `Projects in ${getDisplayCity(selectedCity)}`}
            </h2>

            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#F2F6FF] rounded-[10px] py-2.5 px-[15px]">
                <span className="text-[#000000] text-[16px] font-medium">Sort by:</span> <span className="text-[#555555] text-[16px] font-medium"> {sortLabelMap[sortBy]}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("newAdded")}>
                  New Added
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  Oldest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("priceLow")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("priceHigh")}>
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
                  isFavorite={favoriteStates[property.id]}
                  isFavoriteLoading={favoriteLoading[property.id]}
                  isJoinGroup={joinGroupStates[property.id]}
                  isJoinGroupLoading={joinGroupLoading[property.id]}
                  onFavoriteClick={handleFavoriteClick}
                  onCompareClick={handleCompareClick}
                  onShareClick={handleShareClick}
                  onJoinGroupClick={handleJoinGroupClick}
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