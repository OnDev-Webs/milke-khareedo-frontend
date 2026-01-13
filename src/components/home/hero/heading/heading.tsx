"use client";

import { useRef, useState } from "react";

export default function Heading() {

  const [showVideo, setShowVideo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="py-24 px-6 md:px-10 relative">
      <div className="shadow-[0_0_10px_rgba(0,0,0,0.08)] py-10 px-6 md:px-12 rounded-4xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 relative z-10">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-[24px] md:text-[26px] font-bold text-[#000000] mb-3">
            Stay informed. Buy
            <span className="text-[#1C4692] ps-2">Smarter.</span>
          </h2>
          <p className="text-[#373737] text-[14px] md:text-[16px] font-medium pe-20">
            Get updates on group-buying deals and pricing insights that help you
            save more.
          </p>
        </div>
        {/* Right Side: Email Input + Image */}
        <div className="flex-1 flex justify-end relative">
          <div className="relative z-10 w-full md:w-72 md:-left-[260px]">
            <input
              type="text"
              placeholder="Enter Email Address"
              className="w-full h-12 md:h-12 text-[14px] md:text-[16px] px-4 py-8 rounded-[8px] focus:outline-none bg-[#F8FCFF]"
            />

            <button className="md:hidden mt-4 w-full h-12 bg-[#1C4692] hover:bg-[#1c4692e6] text-white rounded-full font-semibold">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
