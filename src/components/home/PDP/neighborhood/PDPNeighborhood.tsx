"use client";

import { useState, useMemo, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { type NeighborhoodData, type ConnectivityPoint } from "@/lib/api/services/home.service";

// Pin colors for different connectivity types
const CONNECTIVITY_COLORS: Record<string, string> = {
  schools: "#FF6B6B", // Red
  hospitals: "#4ECDC4", // Teal
  transportation: "#45B7D1", // Blue
  restaurants: "#FFA07A", // Light Salmon
  malls: "#9B59B6", // Purple
  cafes: "#F39C12", // Orange
};

const CONNECTIVITY_ICONS: Record<string, string> = {
  schools: "🏫",
  hospitals: "🏥",
  transportation: "🚇",
  restaurants: "🍽️",
  malls: "🛍️",
  cafes: "☕",
};

interface PDPNeighborhoodProps {
  neighborhood: NeighborhoodData;
  propertyLocation: { lat: number; lng: number };
}

export default function PDPNeighborhood({
  neighborhood,
  propertyLocation,
}: PDPNeighborhoodProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if Google Maps is already loaded (from GoogleMapsProvider)
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (typeof window !== "undefined" && (window as any).google?.maps) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkGoogleMaps()) {
      return;
    }

    // If not loaded, check periodically with timeout
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait time

    const interval = setInterval(() => {
      attempts++;
      if (checkGoogleMaps() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  // Get all connectivity categories
  const categories = useMemo(() => {
    const cats: Array<{ key: string; label: string; count: number }> = [];
    if (neighborhood?.connectivity) {
      if (neighborhood.connectivity.schools?.length) {
        cats.push({ key: "schools", label: "School", count: neighborhood.connectivity.schools.length });
      }
      if (neighborhood.connectivity.hospitals?.length) {
        cats.push({ key: "hospitals", label: "Hospital", count: neighborhood.connectivity.hospitals.length });
      }
      if (neighborhood.connectivity.transportation?.length) {
        cats.push({ key: "transportation", label: "Transport", count: neighborhood.connectivity.transportation.length });
      }
      if (neighborhood.connectivity.restaurants?.length) {
        cats.push({ key: "restaurants", label: "Restaurant", count: neighborhood.connectivity.restaurants.length });
      }
      if (neighborhood.connectivity.malls?.length) {
        cats.push({ key: "malls", label: "Mall", count: neighborhood.connectivity.malls.length });
      }
      if (neighborhood.connectivity.cafes?.length) {
        cats.push({ key: "cafes", label: "Cafe", count: neighborhood.connectivity.cafes.length });
      }
    }
    return cats;
  }, [neighborhood]);

  // Get all markers (property + connectivity points)
  const allMarkers = useMemo(() => {
    const markers: Array<{
      lat: number;
      lng: number;
      type: "property" | string;
      title: string;
      color: string;
      icon?: string;
    }> = [];

    // Add property marker
    markers.push({
      lat: propertyLocation.lat,
      lng: propertyLocation.lng,
      type: "property",
      title: "Property Location",
      color: "#1C4692", // Theme blue
    });

    // Add connectivity markers
    if (neighborhood?.connectivity) {
      Object.entries(neighborhood.connectivity).forEach(([key, points]) => {
        if (Array.isArray(points) && (!selectedCategory || selectedCategory === key)) {
          points.forEach((point: ConnectivityPoint) => {
            markers.push({
              lat: point.latitude,
              lng: point.longitude,
              type: key,
              title: point.name,
              color: CONNECTIVITY_COLORS[key] || "#666",
              icon: CONNECTIVITY_ICONS[key] || "📍",
            });
          });
        }
      });
    }

    return markers;
  }, [neighborhood, propertyLocation, selectedCategory]);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  // Fit bounds to show all markers
  useMemo(() => {
    if (map && allMarkers.length > 0 && typeof window !== "undefined" && (window as any).google?.maps) {
      const googleMaps = (window as any).google.maps;
      const bounds = new googleMaps.LatLngBounds();

      allMarkers.forEach((marker) => {
        if (marker.lat && marker.lng && !isNaN(marker.lat) && !isNaN(marker.lng)) {
          bounds.extend(new googleMaps.LatLng(marker.lat, marker.lng));
        }
      });

      if (!bounds.isEmpty()) {
        setTimeout(() => {
          map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
        }, 100);
      }
    }
  }, [map, allMarkers]);

  const createMarkerIcon = (color: string, type: string, icon?: string): google.maps.Icon | undefined => {
    if (typeof window === "undefined" || !(window as any).google?.maps) {
      return undefined;
    }

    const svg = `
      <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-${type}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z" 
              fill="${color}" 
              stroke="#ffffff" 
              stroke-width="2"
              filter="url(#shadow-${type})"/>
        ${icon ? `<text x="20" y="28" font-size="20" text-anchor="middle" dominant-baseline="middle">${icon}</text>` : ""}
      </svg>
    `;

    try {
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(40, 50),
        anchor: new google.maps.Point(20, 50),
      };
    } catch (error) {
      console.error("Error creating marker icon:", error);
      return undefined;
    }
  };

  if (!isLoaded) {
    return (
      <section className="w-full bg-secondary py-12">
        <div className="mx-auto flex container flex-col gap-10 max-md:px-4 md:flex-row md:items-start md:justify-between">
          <div className="w-full md:w-1/3">
            <h2 className="mb-6 font-semibold text-3xl">The Neighborhood</h2>
            <div className="text-center text-gray-600">Loading map...</div>
          </div>
          <div className="flex w-full items-center justify-center md:w-1/2">
            <div className="flex h-96 w-full max-w-lg flex-col items-center justify-center rounded-[28px] bg-[#f2f3fb]">
              <div className="text-gray-600">Loading map...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-secondary py-12">
      <div className="mx-auto flex container flex-col gap-10 max-md:px-4 md:flex-row md:items-start md:justify-between">
        <div className="w-full md:w-1/3">
          <h2 className="mb-6 font-semibold text-3xl">The Neighborhood</h2>

          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(selectedCategory === category.key ? null : category.key)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-5 transition-all ${
                  selectedCategory === category.key
                    ? "border-[#1C4692] bg-[#EEF4FF]"
                    : "border-primary"
                }`}
              >
                <div className="flex items-center justify-center rounded-full bg-[#f1f1f6] size-10">
                  <span className="text-2xl">{CONNECTIVITY_ICONS[category.key] || "📍"}</span>
                </div>
                <span className="text-lg text-heading-primary-text font-medium flex-1 text-left">
                  {category.label}
                </span>
                <span className="text-sm text-gray-500">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-center md:w-1/2">
          <div className="h-96 w-full max-w-lg rounded-[28px] overflow-hidden shadow-lg">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={propertyLocation}
                zoom={13}
                options={{
                  disableDefaultUI: false,
                  clickableIcons: true,
                  scrollwheel: true,
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }],
                    },
                  ],
                }}
                onLoad={onLoad}
              >
                {allMarkers.map((marker, index) => {
                  if (!marker.lat || !marker.lng || isNaN(marker.lat) || isNaN(marker.lng)) {
                    return null;
                  }

                  const markerIcon = createMarkerIcon(
                    marker.color,
                    marker.type,
                    marker.type === "property" ? undefined : marker.icon
                  );

                  return (
                    <Marker
                      key={`${marker.type}-${marker.lat}-${marker.lng}-${index}`}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      title={marker.title}
                      icon={markerIcon}
                    />
                  );
                })}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
