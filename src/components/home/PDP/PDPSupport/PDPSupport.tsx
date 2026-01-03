"use client";

import { type RelationshipManager } from "@/lib/api/services/home.service";
import { useState } from "react";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { IoStar } from "react-icons/io5";

interface PDPSupportProps {
  relationshipManager: RelationshipManager;
}

export default function PDPSupport({ relationshipManager }: PDPSupportProps) {
  const [isBooking, setIsBooking] = useState(false);

  const handleCall = () => {
    if (relationshipManager.phone) {
      window.location.href = `tel:${relationshipManager.phone}`;
    }
  };

  const handleEmail = () => {
    if (relationshipManager.email) {
      window.location.href = `mailto:${relationshipManager.email}`;
    }
  };

  const handleBookVisit = async () => {
    setIsBooking(true);
    // TODO: Implement book visit functionality
    setTimeout(() => {
      setIsBooking(false);
    }, 1000);
  };

  return (
    <div className="w-full rounded-3xl bg-neutral-200 py-6 text-center">
      <div className="relative px-8">
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
          Hi, I am here to Answer <br /> all your queries.
        </p>
        {/* Decorative swirling arrows */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 12h8M8 12l-3-3M8 12l3-3M16 12l3-3M16 12l-3-3" />
          </svg>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M16 12H8M16 12l3-3M16 12l-3-3M8 12l-3-3M8 12l3-3" />
          </svg>
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="relative h-48 w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
            {/* Relationship manager image placeholder - styled to look professional */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
              {relationshipManager.name && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Large circular avatar */}
                  <div className="w-36 h-36 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 shadow-xl">
                    <span className="text-6xl font-bold text-white">
                      {relationshipManager.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* 5 Star Rating Badge - positioned bottom left */}
            <div className="absolute left-2 bottom-2 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-white rounded-lg px-2.5 py-1.5 shadow-lg">
              <IoStar className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-gray-700">5 Star Rating</span>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold text-gray-900">{relationshipManager.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">Relationship Manager</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 mt-4">
        <div className="flex w-full items-center justify-center gap-3">
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#66AE39] text-white py-2.5 px-4 text-xs font-medium hover:bg-[#5a9a32] transition-colors shadow-sm"
          >
            <FaPhoneAlt className="h-3.5 w-3.5" />
            <span>Call</span>
          </button>
          <button
            onClick={handleEmail}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white py-2.5 px-4 text-xs font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            <HiMail className="h-3.5 w-3.5" />
            <span>Email</span>
          </button>
        </div>

        <button
          onClick={handleBookVisit}
          disabled={isBooking}
          className="w-full rounded-full bg-[#1C4692] text-white py-3 px-6 text-sm font-semibold hover:bg-[#1a3d7a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isBooking ? "Booking..." : "Book A Visit"}
        </button>
      </div>

      <button
        className="rounded-full w-full bg-[#1C4692] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1c4692e6] lg:px-7.5 lg:py-2.5 lg:text-base">
        Book A Visit
      </button>
    </div>
  );
}
