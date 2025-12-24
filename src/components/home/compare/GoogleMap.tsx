"use client";

import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { API_CONFIG } from "@/lib/api/config";

// Default center (Mumbai, India) - fallback if geolocation is not available
const defaultCenter = {
    lat: 19.0760,
    lng: 72.8777,
};

interface GoogleMapProps {
    center?: { lat: number; lng: number };
    zoom?: number;
    markers?: Array<{ lat: number; lng: number; title?: string }>;
    className?: string;
}

export default function GoogleMapComponent({
    center,
    zoom = 12,
    markers = [],
    className = "",
}: GoogleMapProps) {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const apiKey = API_CONFIG.GOOGLE_MAPS_API_KEY;

    // Get user's current location
    useEffect(() => {
        if (typeof window !== "undefined" && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    console.log("User location:", {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    // Use default center if geolocation fails
                    setUserLocation(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }
    }, []);

    // Determine the map center: use provided center, or user location, or default
    const mapCenter = useMemo(() => {
        if (center) return center;
        if (userLocation) return userLocation;
        return defaultCenter;
    }, [center, userLocation]);

    if (!apiKey) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
                <div className="text-center">
                    <p className="text-red-600">Google Maps API key is not configured.</p>
                    <p className="mt-2 text-sm text-gray-600">
                        Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file
                    </p>
                </div>
            </div>
        );
    }

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    const mapOptions = useMemo(
        () => ({
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
        }),
        []
    );

    if (!isLoaded) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
                <div className="text-center">
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#f15a29] border-r-transparent"></div>
                    <p className="text-gray-600">Loading map...</p>
                </div>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={mapCenter}
            zoom={zoom}
            options={mapOptions}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.title}
                />
            ))}
        </GoogleMap>
    );
}

