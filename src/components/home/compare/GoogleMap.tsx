"use client";

import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { API_CONFIG } from "@/lib/api/config";

// Default center (Mumbai, India)
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
    center = defaultCenter,
    zoom = 12,
    markers = [],
    className = "",
}: GoogleMapProps) {
    const apiKey = API_CONFIG.GOOGLE_MAPS_API_KEY;

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
            center={center}
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

