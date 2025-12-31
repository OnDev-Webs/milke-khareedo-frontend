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
import { PropertyDetailResponseType } from "@/lib/api";
import React, { useEffect, useState } from "react";

const MOCK = {
  data: {
    property: {
      id: "694290138f9bae80f686af99",
      projectId: "#AvResidency-96610",
      projectName: "AvResidency",
      location: "Sector 45, Surat, Gujarat",
      latitude: 21.890387,
      longitude: 72.200533,
      isFavorite: true,
      isAuthenticated: true,
      locationDetails: {
        full: "Sector 45, Surat, Gujarat",
        area: "Sector 45",
        city: "Surat",
        state: "Gujarat",
      },
      startingPrice: {
        value: 10000000,
        formatted: "₹ 1.00 Crore",
      },
      bookingDeadlinePrice: {
        value: 20000000,
        formatted: "₹ 2.00 Crore",
        note: "Up to ₹ 2.00 Crore on properties",
      },
      developerPrice: "₹ 2.2 Crore",
      offerPrice: "₹ 1.0 Crore",
      discountPercentage: "54.55%",
      reraId: "RERA/2024/005678",
      reraQrImage:
        "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/rera/1765969939478_qr-code-7819653_1280.jpg",
      reraDetailsLink:
        "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/rera/1765969939478_qr-code-7819653_1280.jpg",
      overview: {
        units: 3,
        configurations: ["2 BHK", "3 BHK", "4 BHK"],
        configurationsFormatted: "2 BHK, 3 BHK, 4 BHK",
        possessionStatus: "Under Construction",
        areaRange: { min: 1200, max: 2000, formatted: "1200-2000 SQFT." },
        reraNumber: "RERA/2024/005678",
        possessionDate: "2026-06-30T00:00:00.000Z",
        possessionDateFormatted: "June 2026",
        plotSize: "100000 sqft",
        propertyType: "Residential",
      },
      description:
        "Luxury residential project with world-class amenities, located in prime location with excellent connectivity to metro, schools, and hospitals.",
      rating: 5,
      highlights: [
        "Swimming Pool",
        "Gymnasium",
        "Clubhouse",
        "Rooftop Garden",
        "Indoor Games",
        "Party Hall",
        "Parking",
        "24/7 Security",
      ],
      amenities: [
        "24/7 Security",
        "Power Backup",
        "Lift",
        "Parking",
        "Garden",
        "Playground",
        "Gym",
        "Swimming Pool",
        "Clubhouse",
        "WiFi",
      ],
      images: [
        "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/1765969923182_amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers.jpg",
        "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/1765969927041_pexels-curtis-adams-1694007-3288100.jpg",
        "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/1765969929924_pexels-ivan-s-4458205.jpg",
      ],
      image:
        "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/1765969923182_amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers.jpg",
      imageDetails: {
        main:
          "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/1765969923182_amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers.jpg",
        thumbnails: [
          "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/1765969927041_pexels-curtis-adams-1694007-3288100.jpg",
          "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/1765969929924_pexels-ivan-s-4458205.jpg",
        ],
      },
      layoutPlans: [
        {
          image: "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/layouts/1765969931556_pexels-ivan-s-4458195.jpg",
          unitType: "2 BHK",
          area: "1200 sqft",
          price: "₹ 1.0 Crore",
        },
        {
          image: "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/layouts/1765969933497_pexels-ivan-s-4458205.jpg",
          unitType: "3 BHK",
          area: "1600 sqft",
          price: "₹ 1.5 Crore",
        },
        {
          image: "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/layouts/1765969934976_pexels-thirdman-8482829.jpg",
          unitType: "4 BHK",
          area: "2000 sqft",
          price: "₹ 2.0 Crore",
        },
      ],
      neighborhood: {
        connectivity: {
          schools: [
            { name: "DPS Gurgaon", latitude: 28.4089, longitude: 77.0418, _id: "694290138f9bae80f686afa3" },
            { name: "GD Goenka", latitude: 28.409, longitude: 77.0419, _id: "694290138f9bae80f686afa4" },
          ],
          hospitals: [
            { name: "Apollo Hospital", latitude: 28.4089, longitude: 77.0418, _id: "694290138f9bae80f686afa5" },
            { name: "Fortis Hospital", latitude: 28.409, longitude: 77.0419, _id: "694290138f9bae80f686afa6" },
          ],
          transportation: [
            { name: "Huda City Metro", latitude: 28.4089, longitude: 77.0418, _id: "694290138f9bae80f686afa7" },
            { name: "Bus Stand", latitude: 28.409, longitude: 77.0419, _id: "694290138f9bae80f686afa8" },
          ],
          restaurants: [{ name: "Food Court", latitude: 28.4089, longitude: 77.0418, _id: "694290138f9bae80f686afa9" }],
        },
        mapCoordinates: { name: "DPS Gurgaon", latitude: 28.4089, longitude: 77.0418, _id: "694290138f9bae80f686afa3" },
      },
      developer: {
        id: "693a5e5fa4876dfd668dc3b7",
        name: "Nayan Chanchad",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        logo: "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/rera/1765969939478_qr-code-7819653_1280.jpg",
        city: "Mumbai",
        establishedYear: 2010,
        yearsOfExperience: 15,
        totalProjects: 10,
        website: "https://abc.com",
        sourcingManager: { name: "Khushi Patel", mobile: "1234567890", email: "khushi@example.com" },
      },
      relationshipManager: { id: "694284a99090d3c24e09793b", name: "Vijay Patel", email: "vijay@pokkifuns.com", phone: "9876543210" },
      configurations: [
        { unitType: "2 BHK", subConfigurations: [{ carpetArea: "1200 sqft", price: 10000000, availabilityStatus: "Available", layoutPlanImages: [] }] },
        { unitType: "3 BHK", subConfigurations: [{ carpetArea: "1600 sqft", price: 15000000, availabilityStatus: "Available", layoutPlanImages: [] }] },
        { unitType: "4 BHK", subConfigurations: [{ carpetArea: "2000 sqft", price: 20000000, availabilityStatus: "Available", layoutPlanImages: [] }] },
      ],
      projectSize: "10 Acres",
      landParcel: "100000 sqft",
      minGroupMembers: 10,
      createdAt: "2025-12-17T11:12:19.941Z",
      updatedAt: "2025-12-17T11:12:19.941Z",
      groupBuy: {
        minGroupMembers: 10,
        currentGroupMembersCount: 1,
        progressPercentage: 10,
        isMinimumMet: false,
        progressText: "1/10",
        message: "Enjoy the ultimate deal after at least 10 people join!",
        members: [
          { userId: "6948e0f7292cd2c8b01c43f3", name: "Tulsi Diyora", profilePhoto: "https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/users/profile/1766471207977_How To Use Turmeric For Acne_.jpg", contactNumber: "N/A", email: "tulsidiyora@yopmail.com", propertyTypeInterest: "2 BHK", joinedAt: "2025-12-22T06:44:53.037Z" },
        ],
      },
    },
    similarProjects: [
      {
        "id": "694bd8bcd6e11fc72da79bf0",
        "projectId": "#DiamondasddasdPremium-47680",
        "projectName": "Diamond asddasd Premium",
        "images": [],
        "imageUrl": null,
        "status": "Opening December 2026",
        "groupSize": 15,
        "configuration": "1 BHK",
        "targetPrice": {
          "value": 6531000,
          "formatted": "₹ 65.31 Lakh"
        },
        "disclaimerPrice": {
          "value": 25000000,
          "formatted": "₹ 2.50 Crore"
        },
        "location": "Sector 45, Surat, Gujarat",
        "latitude": 21.22890387,
        "longitude": 72.898200533,
        "offerPrice": 18000000,
        "discountPercentage": "28.00%",
        "similarityScore": 100
      },
      {
        "id": "694bd9ef495e8c2a946fd89a",
        "projectId": "#DiamondPremium-77061",
        "projectName": "Diamond Premium",
        "images": [],
        "imageUrl": null,
        "status": "Opening December 2026",
        "groupSize": 15,
        "configuration": "1 BHK",
        "targetPrice": {
          "value": 6531000,
          "formatted": "₹ 65.31 Lakh"
        },
        "disclaimerPrice": {
          "value": 25000000,
          "formatted": "₹ 2.50 Crore"
        },
        "location": "Sector 45, Surat, Gujarat",
        "latitude": 21.22890387,
        "longitude": 72.898200533,
        "offerPrice": 18000000,
        "discountPercentage": "28.00%",
        "similarityScore": 100
      },
      {
        "id": "694bdb6598e767fc5d78726a",
        "projectId": "#DiamondPremium-42734",
        "projectName": "Diamond Premium",
        "images": [],
        "imageUrl": null,
        "status": "Opening December 2026",
        "groupSize": 15,
        "configuration": "1 BHK",
        "targetPrice": {
          "value": 6531000,
          "formatted": "₹ 65.31 Lakh"
        },
        "disclaimerPrice": {
          "value": 25000000,
          "formatted": "₹ 2.50 Crore"
        },
        "location": "Sector 45, Surat, Gujarat",
        "latitude": 21.22890387,
        "longitude": 72.898200533,
        "offerPrice": 18000000,
        "discountPercentage": "28.00%",
        "similarityScore": 100
      }
    ],
  },
};

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const propertyId = unwrappedParams.id;

  const [property, setProperty] = useState<PropertyDetailResponseType | null>(null);
  const [similarProjects, setSimilarProjects] = useState<any[]>([]);

  useEffect(() => {
    // Using mock data for now — will replace with API later
    setProperty(MOCK.data.property);
    setSimilarProjects(MOCK.data.similarProjects);
  }, [propertyId]);

  return (
    <>
      <PDPGallery property={property} />
      <PDPHeader property={property} />
      <PDPSections />

      <div className="flex container mx-auto py-6 gap-5">
        <div className="flex flex-col gap-4">
          <PDPPropertyDetails property={property} />
          <PDPHighLights property={property} />
        </div>
        <div className="flex flex-col gap-[30px]">
          <PDPGroupProgressStatus property={property} />
          <PDPSupport property={property} />
        </div>
      </div>

      <PDPAmenities property={property} />
      <PDPLayoutPlan property={property} />
      <PDPNeighborhood property={property} />
      <PDPAboutDeveloper property={property} />
      {/* <PDPSimilarProjects property={property} similarProjectsData={similarProjects} /> */}
    </>
  );
}
