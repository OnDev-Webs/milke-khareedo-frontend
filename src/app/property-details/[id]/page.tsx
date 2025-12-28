"use client";

import PDPAboutDeveloper from "@/components/home/PDP/about-developer/aboutDeveloper";
import PDPAmenities from "@/components/home/PDP/aminities/PDPAmenities";
import PDPGallery from "@/components/home/PDP/gallery/PDPGallery";
import PDPGroupProgressStatus from "@/components/home/PDP/group-progress/groupProgressStatus";
import PDPHighLights from "@/components/home/PDP/highlights/PDPhighlights";
import PDPLayoutPlan from "@/components/home/PDP/layoutPlan/layoutPlan";
import PDPNeighborhood from "@/components/home/PDP/neighborhood/PDPNeighborhood";
import PDPHeader from "@/components/home/PDP/PDPHeader/PDPHeader";
import PDPSections from "@/components/home/PDP/PDPSections/PDPSections";
import PDPSupport from "@/components/home/PDP/PDPSupport/PDPSupport";
import PDPPropertyDetails from "@/components/home/PDP/property-details/property-details";
import PDPSimilarProjects from "@/components/home/PDP/similar-projects/similarProjects";
import { homeService, Property } from "@/lib/api";
import React, { useEffect, useState } from "react";

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const propertyId = unwrappedParams.id;

  const [property, setProperty] = useState<Property | null>(null);
  console.log("property", property);

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
      <PDPGallery />
      <PDPHeader />
      <PDPSections />

      <div className="flex w-300 mx-auto py-6 gap-5">
        <div className="flex flex-col gap-4">
          <PDPPropertyDetails />
          <PDPHighLights />
        </div>
        <div className="flex flex-col justify-between gap-4 ">
          <PDPGroupProgressStatus />
          <PDPSupport />
        </div>
      </div>

      <PDPAmenities />
      <PDPLayoutPlan />
      <PDPNeighborhood />
      <PDPAboutDeveloper />
      <PDPSimilarProjects />
    </>
  );
}
