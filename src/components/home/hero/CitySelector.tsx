"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { Country, City as CSCity } from "country-state-city";

export interface City {
    city: string;
    country: string;
    value: string;
}

// Cache for cities data
let citiesCache: City[] | null = null;
let citiesCachePromise: Promise<City[]> | null = null;

export const fetchAllCities = async (): Promise<City[]> => {
    // Return cached data if available
    if (citiesCache) {
        return citiesCache;
    }

    // Return existing promise if fetch is in progress
    if (citiesCachePromise) {
        return citiesCachePromise;
    }

    // Fetch cities using country-state-city package - optimized with chunked processing
    citiesCachePromise = new Promise<City[]>((resolve, reject) => {
        // Use setTimeout to defer heavy computation and prevent UI blocking
        setTimeout(() => {
            try {
                const formattedCities: City[] = [];

                // Get all countries
                const countries = Country.getAllCountries();

                // Process countries in chunks to avoid blocking
                let countryIndex = 0;
                const processChunk = () => {
                    const chunkSize = 10; // Process 10 countries at a time
                    const endIndex = Math.min(countryIndex + chunkSize, countries.length);

                    for (let i = countryIndex; i < endIndex; i++) {
                        const country = countries[i];
                        const countryCode = country.isoCode;
                        const countryName = country.name;

                        // Get cities for this country
                        const cities = CSCity.getCitiesOfCountry(countryCode);

                        if (cities && Array.isArray(cities)) {
                            cities.forEach((city) => {
                                if (city.name && typeof city.name === "string") {
                                    formattedCities.push({
                                        city: city.name.trim(),
                                        country: countryName,
                                        value: `${countryName}, ${city.name.trim()}`,
                                    });
                                }
                            });
                        }
                    }

                    countryIndex = endIndex;

                    // Continue processing if there are more countries
                    if (countryIndex < countries.length) {
                        // Use requestIdleCallback or setTimeout for next chunk
                        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
                            requestIdleCallback(processChunk, { timeout: 50 });
                        } else {
                            setTimeout(processChunk, 0);
                        }
                    } else {
                        // All countries processed, sort and cache
                        formattedCities.sort((a, b) => {
                            const aIsIndia = a.country.toLowerCase() === "india";
                            const bIsIndia = b.country.toLowerCase() === "india";

                            // Indian cities come first
                            if (aIsIndia && !bIsIndia) return -1;
                            if (!aIsIndia && bIsIndia) return 1;

                            // If both are India or both are not India, sort by country then city
                            const countryCompare = a.country.localeCompare(b.country);
                            if (countryCompare !== 0) return countryCompare;
                            return a.city.localeCompare(b.city);
                        });

                        citiesCache = formattedCities;
                        resolve(formattedCities);
                    }
                };

                // Start processing
                processChunk();
            } catch (error) {
                console.error("Error fetching cities:", error);
                citiesCachePromise = null;
                reject(error);
            }
        }, 0);
    });

    return citiesCachePromise;
};

interface CitySelectorProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export default function CitySelector({
    value,
    onChange,
    className = "",
}: CitySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch cities on component mount - use setTimeout to prevent blocking
    useEffect(() => {
        const loadCities = async () => {
            try {
                setLoading(true);

                // Use setTimeout to defer heavy computation and prevent UI blocking
                setTimeout(async () => {
                    const fetchedCities = await fetchAllCities();

                    // Use requestAnimationFrame to update state without blocking
                    requestAnimationFrame(() => {
                        setCities(fetchedCities);

                        // Set initial selected city
                        if (fetchedCities.length > 0) {
                            if (value) {
                                const found = fetchedCities.find((c) => c.value === value);
                                if (found) {
                                    setSelectedCity(found);
                                } else {
                                    // Default to Delhi if available, otherwise first city
                                    const delhi = fetchedCities.find(
                                        (c) => c.city.toLowerCase() === "delhi" && c.country.toLowerCase() === "india"
                                    );
                                    setSelectedCity(delhi || fetchedCities[0]);
                                }
                            } else {
                                // Default to Delhi if available, otherwise first city
                                const delhi = fetchedCities.find(
                                    (c) => c.city.toLowerCase() === "delhi" && c.country.toLowerCase() === "india"
                                );
                                setSelectedCity(delhi || fetchedCities[0]);
                            }
                        }
                        setLoading(false);
                    });
                }, 0);
            } catch (error) {
                console.error("Error loading cities:", error);
                setLoading(false);
            }
        };

        loadCities();
    }, [value]);

    // Update selected city when value prop changes
    useEffect(() => {
        if (value && cities.length > 0) {
            const found = cities.find((c) => c.value === value);
            if (found) {
                setSelectedCity(found);
            }
        }
    }, [value, cities]);

    // Debounced search query for better performance
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 150);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    // Memoized filtered cities for performance - optimized for instant rendering
    const filteredCities = useMemo(() => {
        if (cities.length === 0) return [];

        if (!debouncedSearchQuery.trim()) {
            // Show first 50 cities when no search (for instant dropdown opening)
            return cities.slice(0, 50);
        }

        const query = debouncedSearchQuery.toLowerCase();
        const filtered = cities.filter((city) => {
            return (
                city.city.toLowerCase().includes(query) ||
                city.country.toLowerCase().includes(query) ||
                city.value.toLowerCase().includes(query)
            );
        });

        // Limit to 100 results for smooth scrolling
        return filtered.slice(0, 100);
    }, [cities, debouncedSearchQuery]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            // Small delay to ensure dropdown is rendered
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSelectCity = useCallback((city: City) => {
        setSelectedCity(city);
        setIsOpen(false);
        setSearchQuery("");
        setDebouncedSearchQuery("");
        onChange?.(city.value);
    }, [onChange]);

    const handleKeyDown = (e: React.KeyboardEvent, city?: City) => {
        if (e.key === "Enter" && city) {
            handleSelectCity(city);
        } else if (e.key === "Escape") {
            setIsOpen(false);
            setSearchQuery("");
        }
    };

    // Show loading state only if no city is selected yet
    if (!selectedCity) {
        return (
            <div className={`relative ${className}`}>
                <div className="h-14 w-full rounded-xl bg-transparent px-4 flex items-center">
                    <span className="text-sm text-gray-500">Loading cities...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="h-14 w-full appearance-none rounded-xl bg-transparent px-4 pr-10 text-left text-sm text-gray-800 outline-none border-none focus:outline-none focus:ring-0 cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
            >
                <span className="flex-1 truncate">
                    {selectedCity.country} | {selectedCity.city}
                </span>
                <FaChevronDown
                    className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop to prevent clicks behind */}
                    <div
                        className="fixed inset-0 z-[9998] bg-transparent"
                        onClick={() => {
                            setIsOpen(false);
                            setSearchQuery("");
                        }}
                    />
                    <div
                        className="absolute left-0 top-full z-[9999] mt-2 w-full rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 max-h-[400px] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="sticky top-0 bg-white p-3 border-b border-gray-100 z-10">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search city or country..."
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-[#FF765E] focus:outline-none focus:ring-2 focus:ring-[#FF765E]/20"
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        {/* City List */}
                        <div className="max-h-[320px] overflow-y-auto">
                            {loading ? (
                                <div className="px-4 py-8 text-center text-sm text-gray-500">
                                    Loading cities...
                                </div>
                            ) : filteredCities.length === 0 ? (
                                <div className="px-4 py-8 text-center text-sm text-gray-500">
                                    {cities.length === 0
                                        ? "No cities available"
                                        : "No cities found"}
                                </div>
                            ) : (
                                filteredCities.map((city, index) => {
                                    const isSelected = selectedCity?.value === city.value;
                                    return (
                                        <button
                                            key={`${city.city}-${city.country}-${index}`}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectCity(city);
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, city)}
                                            className={`w-full px-4 py-3 text-left text-sm transition-colors ${isSelected
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-800 hover:bg-gray-100"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">
                                                    {city.country} | {city.city}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

