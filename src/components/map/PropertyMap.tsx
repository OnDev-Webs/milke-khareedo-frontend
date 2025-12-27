"use client";

import {
  GoogleMap,
  MarkerF,
  OverlayView,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useMemo, Fragment } from "react";
import PriceMarker from "./PriceMarker";
import { Property } from "@/lib/api/services/home.service";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function PropertyMap({
  properties,
  activeId,
  onMarkerClick,
}: {
  properties: Property[] | null;
  activeId?: string;
  onMarkerClick?: (id: string) => void;
}) {
  // Filter properties that have valid coordinates
  const validProperties = useMemo(() => {
    if (!properties || !Array.isArray(properties)) return [];
    return properties.filter(
      (p) => typeof p.latitude === "number" && typeof p.longitude === "number"
    );
  }, [properties]);

  const center = useMemo(
    () => ({
      lat: validProperties?.[0]?.latitude ?? 28.6139,
      lng: validProperties?.[0]?.longitude ?? 77.209,
    }),
    [validProperties],
  );

  if (!validProperties || validProperties.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No properties with location data</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={11}
      center={center}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <MarkerClusterer>
        {(clusterer) => (
          <Fragment>
            {validProperties.map((p) => (
              <OverlayView
                key={p.id}
                position={{ lat: p.latitude!, lng: p.longitude! }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <PriceMarker
                  price={p.targetPrice?.value ?? 0}
                  active={activeId === p.id}
                  onClick={() => onMarkerClick?.(p.id)}
                />
              </OverlayView>
            ))}
          </Fragment>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
}
