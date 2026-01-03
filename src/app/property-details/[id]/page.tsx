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
import RERAStickyWidget from "@/components/home/PDP/rera-widget/RERAStickyWidget";
import { homeService, type PropertyDetail, type SimilarProject } from "@/lib/api/services/home.service";
import React, { useEffect, useState } from "react";

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const propertyId = unwrappedParams.id;

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [similarProjects, setSimilarProjects] = useState<SimilarProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Property Details");

  const fetchPropertyDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await homeService.getPropertyById(id);
      if (response.success && response.data) {
        setProperty(response.data.property);
        setSimilarProjects(response.data.similarProjects || []);
      } else {
        console.error("Failed to fetch property details");
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchPropertyDetails(propertyId);
    }
  }, [propertyId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Property not found</div>
      </div>
    );
  }

  return (
    <>
      <PDPGallery 
        images={property.images || []}
        mainImage={property.image}
        imageDetails={property.imageDetails}
        reraQrImage={property.reraQrImage}
        reraDetailsLink={property.reraDetailsLink}
      />
      <PDPHeader 
        projectName={property.projectName}
        location={property.location}
        startingPrice={property.startingPrice}
        developerPrice={property.developerPrice}
        bookingDeadlinePrice={property.bookingDeadlinePrice}
        discountPercentage={property.discountPercentage}
        isFavorite={property.isFavorite}
        propertyId={property.id}
        onFavoriteChange={(isFavorite) => {
          setProperty({ ...property, isFavorite });
        }}
      />
      <PDPSections 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex container mx-auto py-6 gap-5">
        <div className="flex flex-col gap-4 flex-1">
          <div id="property-details">
            <PDPPropertyDetails property={property} />
          </div>
          <div id="highlights">
            <PDPHighLights highlights={property.highlights} />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 w-80">
          <PDPGroupProgressStatus 
            groupBuy={property.groupBuy}
            propertyId={property.id}
            isJoinGroup={property.isJoinGroup}
            isAuthenticated={property.isAuthenticated}
            onJoinGroupChange={(isJoinGroup) => {
              setProperty({ ...property, isJoinGroup });
            }}
            onRefresh={() => fetchPropertyDetails(propertyId)}
          />
          <PDPSupport relationshipManager={property.relationshipManager} />
        </div>
      </div>

      <div id="amenities">
        <PDPAmenities amenities={property.amenities} />
      </div>
      <div id="layout-plan">
        <PDPLayoutPlan layoutPlans={property.layoutPlans} configurations={property.configurations} />
      </div>
      <div id="connectivity">
        <PDPNeighborhood 
          neighborhood={property.neighborhood}
          propertyLocation={{ lat: property.latitude, lng: property.longitude }}
        />
      </div>
      <div id="about-developer">
        <PDPAboutDeveloper developer={property.developer} />
      </div>
      <PDPSimilarProjects similarProjects={similarProjects} />
      
      {/* RERA Sticky Widget */}
      <RERAStickyWidget
        reraId={property.reraId}
        reraQrImage={property.reraQrImage}
        reraDetailsLink={property.reraDetailsLink}
      />
    </>
  );
}
