"use client";

import {
  GoogleMap,
  MarkerF,
  OverlayView,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useMemo, Fragment } from "react";
import PriceMarker from "./PriceMarker";
import { propertyMapStyle } from "@/components/map/mapStyles";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type Property = {
  id: string;
  lat: number;
  lng: number;
  price: number;
};

export default function PropertyMap({
  properties,
  activeId,
  onMarkerClick,
}: {
  properties: Property[];
  activeId?: string;
  onMarkerClick: (id: string) => void;
}) {
  const center = useMemo(
    () => ({
      lat: properties[0]?.lat ?? 28.6139,
      lng: properties[0]?.lng ?? 77.209,
    }),
    [properties],
  );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={11}
      center={center}
      options={{
        styles: propertyMapStyle,
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <MarkerClusterer>
        {(clusterer) => (
          <Fragment>
            {properties.map((p) => (
              <OverlayView
                key={p.id}
                position={{ lat: p.lat, lng: p.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <PriceMarker
                  price={p.price}
                  active={activeId === p.id}
                  onClick={() => onMarkerClick(p.id)}
                />
              </OverlayView>
            ))}
          </Fragment>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
}
