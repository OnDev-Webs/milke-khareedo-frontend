"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
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
          {showVideo && (
            <div className="absolute -bottom-10 md:-bottom-[290px] right-0 w-[150px] md:w-[230px] h-[200px] md:h-[330px] rounded-3xl overflow-hidden shadow-lg z-20 hidden md:block bg-black">

              <video
                ref={videoRef}
                src="https://milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com/properties/images/185341-875417497.mp4"
                className="w-full h-full object-cover"
                controls={isPlaying}
                preload="metadata"
              />

              {!isPlaying && (
                <button
                  onClick={() => {
                    videoRef.current?.play();
                    setIsPlaying(true);
                  }}
                  className="absolute bottom-2 left-2 z-30 h-8 w-8 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow"
                  aria-label="Play video"
                >
                  <Play size={20} className="text-black" />
                </button>
              )}

              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                  }
                  setIsPlaying(false);
                  setShowVideo(false); 
                }}
                className="absolute top-2 right-2 z-30 h-8 w-8 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow"
                aria-label="Close video"
              >
                <IoCloseCircle size={20} className="text-black" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
