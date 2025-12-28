"use client";

import PDP from "@/components/home/PDP/PDP";
import { homeService, Property } from "@/lib/api";
import React, { useEffect, useState } from "react";

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    
  const unwrappedParams = React.use(params);
    const propertyId = unwrappedParams.id;

    const [property, setProperty] = useState<Property | null>(null)
console.log("property", property)

const fetchPropertyDetails = async (id: string) => {
    try {
      const response = await homeService.getPropertyById(id);
      if (response.success && response.data) {
        setProperty(response.data.data.property);
      } else {
        console.error("Failed to fetch property details");
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails(propertyId);
  }, [propertyId]);

  return (
    <>
      <PDP />
    </>
  );
}
