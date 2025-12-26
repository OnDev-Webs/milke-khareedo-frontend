"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import CitySelector from "./CitySelector";

export default function Hero() {
  const [selectedCity, setSelectedCity] = useState("India, Delhi");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleCityChange = (cityValue: string) => {
    setSelectedCity(cityValue);
    // You can add additional logic here, such as filtering properties based on city
    console.log("Selected city:", cityValue);
  };

  const group_deals = [
    "/images/gd.jpg",
    "/images/gd1.jpg",
    "/images/gd2.jpg",
    "/images/gd3.jpg",
  ];

  return (
    <section className="relative w-full py-10">
      <div className="relative mx-auto w-full max-w-[1200px] h-auto md:h-[450px] overflow-visible rounded-3xl bg-gradient-to-br from-[#C1DDEB] to-[#E3F2F5] p-6 shadow-md">
        <div className="relative z-10 w-full md:w-[60%] pt-10 md:pt-10 ps-4 md:ps-6">
          <p className="font-medium text-[#585981] mb-2">
            Buying a home is a big decision.
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#151516] md:pe-68">
            <span className="text-[#FF765E]"> Milke Khereedo </span>
            Makes it easier.
          </h1>

          <p className="mt-3 text-[#585981] font-medium">
            Buy together. Save more than buying alone.
          </p>

          <div className="mt-6">
            <button className="rounded-full bg-[#FF765E] px-8 py-3 text-sm font-medium text-white shadow">
              Want to see how it works?
            </button>
          </div>

          <div className="my-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3">
            <div className="flex -space-x-2">
              {group_deals.map((img, index) => (
                <div
                  key={index}
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                >
                  <Image src={img} alt="User" fill className="object-cover" />
                </div>
              ))}
            </div>

            <span className="text-sm font-medium text-gray-700">
              Explore 100+ Group Deals
            </span>
          </div>
        </div>

        <div className="hidden md:block absolute top-[-32px] left-[530px]">
          <div className="relative w-[600px] h-[480px] overflow-hidden">
            <Image
              src="/images/banner1.png"
              alt="Hero Image"
              fill
              priority
              className="object-cover object-[50%_80%]"
              style={{ transform: "scale(1.4)" }}
            />
          </div>
        </div>

        <div className="block md:hidden mt-10 relative w-[400px] top-[-100px] left-[-40px] h-[260px]">
          <Image
            src="/images/banner1.png"
            alt="Hero Image"
            fill
            priority
            className="object-cover object-[50%_80%]"
          />
        </div>
      </div>

      <div className="absolute bottom-[-20px] left-1/2 w-[95%] md:w-[1150px] -translate-x-1/2 px-4 md:px-6 z-20">
        <div className="flex flex-col md:flex-row items-stretch rounded-2xl bg-white/70 backdrop-blur-md p-0 shadow-lg overflow-visible">
          {/* CITY SELECT SECTION */}
          <div className="relative flex flex-col justify-center ps-6 pe-4 py-4 min-w-[130px]">
            <label className="text-sm font-bold text-gray-800 mb-2.5">City</label>
            <div className="relative" style={{ zIndex: 1000 }}>
              <CitySelector
                value={selectedCity}
                onChange={handleCityChange}
                className="h-auto"
                showLabel={false}
              />
            </div>
            <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2
                   h-10 w-[2px] bg-[#DCDCEB]" />
          </div>

          {/* SEARCH INPUT SECTION */}
          <div className="relative flex-1 flex flex-col justify-start ps-4 pe-6 py-4">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Find your Dream Home"
                className="w-full bg-transparent text-base font-bold text-gray-800 outline-none border-none focus:outline-none focus:ring-0 placeholder:text-base placeholder:font-bold placeholder:text-gray-800 transition-all duration-300 min-h-[24px]"
              />
              <div className={`absolute left-0 top-full mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 pointer-events-none transition-opacity duration-300 ${searchQuery || isSearchFocused ? 'opacity-0' : 'opacity-100'}`}>
                <FaMapMarkerAlt className="text-gray-500 text-xs flex-shrink-0" />
                <span>Search for Developers, Location, Projects</span>
              </div>
            </div>
          </div>

          {/* SEARCH BUTTON SECTION */}
          <div className="flex items-center px-6 py-4">
            <button className="h-12 w-full md:w-auto md:min-w-[140px] rounded-full bg-[#FF765E] text-white flex items-center justify-center gap-2 font-medium shadow-md hover:bg-[#e66a4f] transition-colors">
              <FaSearch className="text-white text-sm" />
              <span className="text-sm">Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
