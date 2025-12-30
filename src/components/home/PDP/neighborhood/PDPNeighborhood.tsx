"use client";

import { useState, useMemo, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { type NeighborhoodData, type ConnectivityPoint } from "@/lib/api/services/home.service";

// Category configuration with icons and colors
const CATEGORY_CONFIG: Record<string, { label: string; icon: string; color: string; pinColor: string }> = {
  schools: { label: "School", icon: "🎒", color: "#1C4692", pinColor: "#1C4692" },
  hospitals: { label: "Hospital", icon: "🏥", color: "#4ECDC4", pinColor: "#4ECDC4" },
  transportation: { label: "Transport", icon: "🚇", color: "#45B7D1", pinColor: "#45B7D1" },
  restaurants: { label: "Restaurant", icon: "👨‍🍳", color: "#FFA07A", pinColor: "#FFA07A" },
  malls: { label: "Mall", icon: "🛍️", color: "#9B59B6", pinColor: "#9B59B6" },
  cafes: { label: "Cafe", icon: "☕", color: "#F39C12", pinColor: "#F39C12" },
  hotels: { label: "Hotels", icon: "🛏️", color: "#8E44AD", pinColor: "#8E44AD" },
};

interface PDPNeighborhoodProps {
  neighborhood: NeighborhoodData;
  propertyLocation: { lat: number; lng: number };
}

export default function PDPNeighborhood({
  neighborhood,
  propertyLocation,
}: PDPNeighborhoodProps) {
  // ALL HOOKS MUST BE CALLED FIRST - BEFORE ANY CONDITIONAL RETURNS
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [markerAnimationState, setMarkerAnimationState] = useState<Record<string, boolean>>({});
  const [animationTrigger, setAnimationTrigger] = useState(0);
  
  // Get all connectivity categories in specific order
  const categories = useMemo(() => {
    const order = ["schools", "restaurants", "hospitals", "hotels", "cafes", "transportation", "malls"];
    const cats: Array<{ key: string; label: string; count: number; icon: string; color: string }> = [];
    
    if (neighborhood?.connectivity) {
      order.forEach((key) => {
        const points = neighborhood.connectivity[key as keyof typeof neighborhood.connectivity];
        if (Array.isArray(points) && points.length > 0) {
          const config = CATEGORY_CONFIG[key] || { label: key, icon: "📍", color: "#666", pinColor: "#666" };
          cats.push({ 
            key, 
            label: config.label, 
            count: points.length,
            icon: config.icon,
            color: config.color
          });
        }
      });
    }
    return cats;
  }, [neighborhood]);

  // Update selected category when categories change (set first as default)
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].key);
    }
  }, [categories, selectedCategory]);

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

  // Get all markers (property + connectivity points) with animations
  const allMarkers = useMemo(() => {
    const markers: Array<{
      lat: number;
      lng: number;
      type: "property" | string;
      title: string;
      color: string;
      icon?: string;
      category?: string;
    }> = [];

    // Add property marker (always visible)
    markers.push({
      lat: propertyLocation.lat,
      lng: propertyLocation.lng,
      type: "property",
      title: "Property Location",
      color: "#1C4692", // Theme blue
    });

    // Add connectivity markers (only for selected category or all if none selected)
    if (neighborhood?.connectivity) {
      Object.entries(neighborhood.connectivity).forEach(([key, points]) => {
        if (Array.isArray(points) && (!selectedCategory || selectedCategory === key)) {
          const config = CATEGORY_CONFIG[key] || { pinColor: "#666", icon: "📍" };
          points.forEach((point: ConnectivityPoint) => {
            markers.push({
              lat: point.latitude,
              lng: point.longitude,
              type: key,
              title: point.name,
              color: config.pinColor,
              icon: config.icon,
              category: key,
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

  // Fit bounds to show all markers with smooth animation
  useEffect(() => {
    if (map && allMarkers.length > 0 && typeof window !== "undefined" && (window as any).google?.maps) {
      const googleMaps = (window as any).google.maps;
      const bounds = new googleMaps.LatLngBounds();
      let hasValidMarkers = false;

      allMarkers.forEach((marker) => {
        if (marker.lat && marker.lng && !isNaN(marker.lat) && !isNaN(marker.lng)) {
          bounds.extend(new googleMaps.LatLng(marker.lat, marker.lng));
          hasValidMarkers = true;
        }
      });

      if (hasValidMarkers && !bounds.isEmpty()) {
        // Smooth transition when category changes - wait for markers to animate
        const timeoutId = setTimeout(() => {
          // Add padding to account for left panel
          const padding = {
            top: 80,
            right: 80,
            bottom: 80,
            left: window.innerWidth > 768 ? 380 : 80, // Account for left panel on desktop
          };
          
          map.fitBounds(bounds, padding);
          
          // Ensure minimum zoom level for better visibility
          const listener = googleMaps.event.addListener(map, 'bounds_changed', () => {
            if (map.getZoom() && map.getZoom() > 18) {
              map.setZoom(18);
            }
            googleMaps.event.removeListener(listener);
          });
        }, 400); // Delay to allow marker animations to start

        return () => clearTimeout(timeoutId);
      } else if (allMarkers.length === 1) {
        // Single marker - center on it with appropriate zoom
        const marker = allMarkers[0];
        if (marker.lat && marker.lng) {
          map.setCenter(new googleMaps.LatLng(marker.lat, marker.lng));
          map.setZoom(15);
        }
      }
    }
  }, [map, allMarkers, selectedCategory]);

  const createMarkerIcon = (color: string, type: string, icon?: string, isProperty: boolean = false): google.maps.Icon | undefined => {
    if (typeof window === "undefined" || !(window as any).google?.maps) {
      return undefined;
    }

    // Property marker - premium, slightly smaller
    if (isProperty) {
      const svg = `
        <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow-property-${type}" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="grad-property" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${color}dd;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z" 
                fill="url(#grad-property)" 
                stroke="#ffffff" 
                stroke-width="2.5"
                filter="url(#shadow-property-${type})"/>
          <circle cx="20" cy="20" r="7" fill="#ffffff" opacity="0.95"/>
          <circle cx="20" cy="20" r="4" fill="${color}"/>
        </svg>
      `;
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(40, 50),
        anchor: new google.maps.Point(20, 50),
      };
    }

    // Category markers - smaller, premium circular design
    const svg = `
      <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-${type}" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
            <feOffset dx="0" dy="1.5" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="18" cy="18" r="15" 
                fill="white" 
                stroke="${color}" 
                stroke-width="2.5"
                filter="url(#shadow-${type})"/>
        <circle cx="18" cy="18" r="12" 
                fill="${color}" 
                opacity="0.1"/>
        ${icon ? `<text x="18" y="22" font-size="16" text-anchor="middle" dominant-baseline="middle" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));">${icon}</text>` : ""}
      </svg>
    `;

    try {
      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 36),
      };
    } catch (error) {
      console.error("Error creating marker icon:", error);
      return undefined;
    }
  };

  // Trigger animations when category changes
  useEffect(() => {
    if (allMarkers.length > 0) {
      // Reset all markers
      const newState: Record<string, boolean> = {};
      allMarkers.forEach((marker, index) => {
        const key = `${marker.type}-${marker.lat}-${marker.lng}-${index}`;
        newState[key] = false;
      });
      setMarkerAnimationState(newState);

      // Trigger staggered animations
      setTimeout(() => {
        allMarkers.forEach((marker, index) => {
          const key = `${marker.type}-${marker.lat}-${marker.lng}-${index}`;
          setTimeout(() => {
            setMarkerAnimationState((prev) => ({ ...prev, [key]: true }));
          }, index * 60); // Stagger by 60ms for smooth cascade
        });
      }, 150);
      
      // Increment trigger to force re-render
      setAnimationTrigger((prev) => prev + 1);
    }
  }, [selectedCategory, allMarkers.length]);

  // Handle category selection with smooth transition
  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(selectedCategory === categoryKey ? null : categoryKey);
  };

  // Early return AFTER all hooks - this is now safe
  if (!isLoaded) {
    return (
      <section className="relative w-full min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="relative z-10 mx-auto container py-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="w-full md:w-1/3 bg-white/90 backdrop-blur-md rounded-2xl p-6">
              <h2 className="mb-6 font-semibold text-3xl text-gray-900">The Neighborhood</h2>
              <div className="text-center text-gray-600">Loading map...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[600px] overflow-hidden bg-gray-100">
      {/* Full-width Map Background - Fully Interactive */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={propertyLocation}
            zoom={13}
            options={{
              disableDefaultUI: false,
              clickableIcons: true,
              scrollwheel: true,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              draggable: true,
              gestureHandling: "greedy", // Allows all gestures
              keyboardShortcuts: true,
              clickableIcons: true,
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

              const isProperty = marker.type === "property";
              const baseKey = `${marker.type}-${marker.lat}-${marker.lng}-${index}`;
              const markerKey = `${baseKey}-${selectedCategory || 'all'}-${animationTrigger}`;
              const shouldAnimate = markerAnimationState[baseKey] !== false;
              
              const markerIcon = createMarkerIcon(
                marker.color,
                marker.type,
                marker.type === "property" ? undefined : marker.icon,
                isProperty
              );
              
              // Determine animation type
              let animationType: google.maps.Animation | undefined = undefined;
              if (typeof window !== "undefined" && (window as any).google?.maps) {
                if (shouldAnimate) {
                  // Use DROP animation for entry
                  animationType = google.maps.Animation.DROP;
                }
              }
              
              return (
                <Marker
                  key={markerKey}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  title={marker.title}
                  icon={markerIcon}
                  animation={animationType}
                  optimized={false}
                  zIndex={isProperty ? 1000 : 100}
                  clickable={true}
                  cursor="pointer"
                />
              );
            })}
          </GoogleMap>
        )}
      </div>

      {/* Blur Overlay and Content - Non-blocking for map interactions */}
      <div className="relative z-10 mx-auto container py-12 pointer-events-none">
        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          {/* Left Panel - Category Selection with Blur Effect */}
          <div className="w-full md:w-1/3 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 pointer-events-auto">
            <h2 className="mb-6 font-semibold text-3xl text-gray-900">The Neighborhood</h2>

            <div className="space-y-3">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.key;
                return (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className={`flex w-full items-center gap-4 rounded-2xl border-2 p-5 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] ${
                      isSelected
                        ? "border-[#1C4692] bg-[#EEF4FF] shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`flex items-center justify-center rounded-full size-10 transition-all duration-300 ${
                      isSelected ? "bg-[#1C4692]/10" : "bg-gray-100"
                    }`}>
                      <span className={`text-xl transition-transform duration-300 ${isSelected ? "scale-110" : ""}`}>
                        {category.icon}
                      </span>
                    </div>
                    <span className={`text-lg font-medium flex-1 text-left transition-colors duration-300 ${
                      isSelected ? "text-[#1C4692]" : "text-gray-900"
                    }`}>
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
