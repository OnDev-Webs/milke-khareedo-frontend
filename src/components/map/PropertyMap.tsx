"use client";

import {
  GoogleMap,
  OverlayView,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useMemo, Fragment, useState } from "react";
import { Property } from "@/lib/api/services/home.service";
import { FaHome } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹ ${(price / 10000000).toFixed(1)} Cr`;
  }
  if (price >= 100000) {
    return `₹ ${(price / 100000).toFixed(0)} Lakh`;
  }
  return `₹ ${price}`;
};

const getMarkerColor = (price: number, active?: boolean) => {
  if (active) return "bg-[#1C4692]"; 

  if (price >= 100000000) return "bg-red-600";     
  if (price >= 70000000) return "bg-pink-500";     
  if (price >= 50000000) return "bg-orange-500";   
  if (price >= 30000000) return "bg-yellow-500";   
  if (price >= 15000000) return "bg-green-500";    

  return "bg-teal-500"; 
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
  const validProperties = useMemo(() => {
    if (!properties || !Array.isArray(properties)) return [];
    return properties.filter(
      (p) => typeof p.latitude === "number" && typeof p.longitude === "number",
    );
  }, [properties]);

  const center = useMemo(
    () => ({
      lat: validProperties?.[0]?.latitude ?? 28.6139,
      lng: validProperties?.[0]?.longitude ?? 77.209,
    }),
    [validProperties],
  );

  if (validProperties.length === 0) {
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
        {() => (
          <Fragment>
            {validProperties.map((p) => {
              const price = p.targetPrice?.value ?? 0;
              const isActive = activeId === p.id;

              return (
                <OverlayView
                  key={p.id}
                  position={{ lat: p.latitude!, lng: p.longitude! }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <HomeMarker
                    price={price}
                    active={isActive}
                    onClick={() => onMarkerClick?.(p.id)}
                  />
                </OverlayView>
              );
            })}
          </Fragment>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
}

function HomeMarker({
  price,
  active,
  onClick,
}: {
  price: number;
  active?: boolean;
  onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div
        className={`h-10 w-10 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 ${getMarkerColor(
          price,
          active,
        )}`}
      >
        <FaHome className="text-white text-lg" />
      </div>

      {hover && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-3 py-1 text-xs text-white shadow">
          {formatPrice(price)}
        </div>
      )}
    </div>
  );
}
