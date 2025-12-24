"use client";
import Image from "next/image";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

const tabs = [
  "All Properties",
  "Gachibowli",
  "Kondapur",
  "Manikonda",
  "Nallagandla",
  "Tellapur",
  "Bachupally",
  "Sangareddy",
  "Yadagirigutta",
  "Medchal",
  "Nanakramguda",
];

const properties = [
  {
    id: 1,
    title: "Godrej South Estare",
    subtitle: "Okla Pahse , I New Deljhi",
    image: "/images/tp1.jpg",
    groupSize: "8 Members",
    opening: "01 Left",
    targetPrice: "$200,000",
    targetOffer: "Save $20,000",
    developerPrice: "$250,000",
    offer: "10% Off",
  },
  {
    id: 2,
    title: "Luxury Apartment",
    subtitle: "City Center",
    image: "/images/tp2.jpg",
    groupSize: "12 Members",
    opening: "03 Left",
    targetPrice: "$150,000",
    targetOffer: "Save $20,000",
    developerPrice: "$180,000",
    offer: "15% Off",
  },
  {
    id: 3,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp3.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
  {
    id: 4,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp4.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
  {
    id: 5,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp5.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
  {
    id: 6,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp6.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
  {
    id: 7,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp6.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
  {
    id: 8,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp6.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
  {
    id: 9,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp6.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
  {
    id: 10,
    title: "Modern House",
    subtitle: "Suburban Area",
    image: "/images/tp6.jpg",
    groupSize: "10 Members",
    opening: "02 Left",
    targetPrice: "$180,000",
    targetOffer: "Save $20,000",
    developerPrice: "$210,000",
    offer: "12% Off",
  },
];

export default function TopProperties() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <section className="w-full py-16 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Top
          <span className="relative inline-block text-[#FF765E] font-bold px-4">
            Properties
            <svg
              className="absolute left-4 -bottom-3.5"
              width="160"
              height="11"
              viewBox="0 0 228 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6 C40 10, 80 2, 120 5 C160 8, 190 3, 226 6"
                stroke="#FF765E"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 mb-8 border-b border-gray-200 py-2">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 text-sm font-medium transition-colors ${activeTab === tab
                ? "text-[#f15a29]"
                : "text-[#818181] hover:text-black"
                }`}>
              {tab}
              {activeTab === tab && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#f15a29] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {properties.slice(0, visibleCount).map((prop) => (
            <div key={prop.id} className="flex flex-col rounded-3xl bg-white shadow-lg p-4" >
              {/* Image */}
              <div className="relative h-52 w-full mb-4 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  className="object-cover"
                  fill
                  style={{ borderRadius: '12px' }}
                />
              </div>

              {/* Title + Subtitle + Call button */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-[20px] font-semibold text-black">{prop.title}</h3>
                  <p className="text-[15px] text-[#828282] mt-1">{prop.subtitle}</p>
                </div>
                <button className="bg-[#66AE39] text-white px-3 py-2 rounded-full flex items-center gap-1 text-xs">
                  <FaPhoneAlt /> Call
                </button>
              </div>

              {/* Group Size + Opening */}
              <div className="flex justify-between mt-2 mb-2 gap-2">
                <button className="flex flex-col items-center bg-[#F2F6FF] px-4 py-2 rounded-lg text-center">
                  <span className="text-[14px] text-black font-semibold">Group Size</span>
                  <span className="text-xs font-semibold text-[#525252]">{prop.groupSize}</span>
                </button>
                <button className="flex flex-col items-center bg-[#F2F6FF] px-4 py-2 rounded-lg text-center">
                  <span className="text-[14px] text-black font-semibold">Opening</span>
                  <span className="text-xs font-semibold text-[#525252]">{prop.opening}</span>
                </button>
              </div>

              {/* Target Price + Developer Price */}
              <div className="flex justify-between items-start mt-3">

                {/* Target Price */}
                <div>
                  <span className="text-xs text-gray-500">Target Price</span>
                  <div className="text-base font-bold text-gray-800">
                    {prop.targetPrice}
                  </div>
                  <span className="mt-1 inline-block bg-[#FFFFFF] border border-[#F6F6F6] rounded-xl pe-10 ps-1 py-0.5 text-xs font-semibold text-[#66AE39]">
                    {prop.targetOffer}
                  </span>
                </div>

                {/* Developer Price */}
                <div className="text-right">
                  <span className="text-xs text-gray-500">Developer Price</span>
                  <div className="text-sm font-semibold text-gray-400 line-through">
                    {prop.developerPrice}
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-white border border-[#F6F6F6] px-2 py-0.5 text-xs font-semibold text-[#FF3232]">
                    {prop.offer}
                  </span>
                </div>

              </div>


              {/* Join Group Button */}
              <button className="mt-4 w-full bg-[#FF765E] text-white py-3 rounded-3xl font-semibold hover:bg-[#e86b50]">
                Join Group
              </button>
            </div>
          ))}
          {/* Load More Button */}
          {visibleCount < properties.length && (
            <div className="md:col-span-3 col-span-1 flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(properties.length)}
                className="px-8 py-3 rounded-full border border-[#F5F5F5] text-[#2D2D2D] bg-white font-semibold"
              >
                Load More
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
