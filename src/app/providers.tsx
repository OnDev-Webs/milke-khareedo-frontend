"use client";

import { LoadScript } from "@react-google-maps/api";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CompareProvider } from "@/contexts/CompareContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <AuthProvider>
        <CompareProvider>{children}</CompareProvider>
      </AuthProvider>
    </LoadScript>
  );
}
