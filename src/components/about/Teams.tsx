"use client";

import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";
import Title from "../typography/title";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

const teams = [
  {
    name: "Rohan Mehta",
    role: "Buyer Relations",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f1.jpg",
  },
  {
    name: "Mishra",
    role: "Customer Support",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f2.jpg",
  },
  {
    name: "Azeez",
    role: "Project Research",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f1.jpg",
  },
  {
    name: "Pranidher ",
    role: "Developer Coordination",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f2.jpg",
  },
];

export default function Teams() {
  const renderIcon = (name: string) => {
    switch (name) {
      case "twitter":
        return <FaTwitter size={20} className="text-[#1C4692]" />;
      case "facebook":
        return <FaFacebookF size={20} className="text-[#1C4692]" />;
      case "linkedin":
        return <FaLinkedinIn size={20} className="text-[#1C4692]" />;
      case "instagram":
        return <FaInstagram size={20} className="text-[#1C4692]" />;
      default:
        return null;
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? teams.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === teams.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full bg-white py-16 relative overflow-visible mb-[100px]">
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern
            id="rhombusPattern"
            width="2"
            height="2"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect x="0" y="0" width="1.8" height="1.8" fill="#e6e3e3ff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rhombusPattern)" />
      </svg>

      <div className="mx-auto container sm:px-0 px-4 relative z-10">
        <Title
          text={"Rest of the"}
          isDrawLine
          drawLineText={"Team"}
          className="text-center mb-12 md:mb-20"
        />

        <div className="hidden md:grid gap-6 md:grid-cols-2 relative">
          {teams.map((team, i) => {
            const isLast = i === teams.length - 1;
            return (
              <div
                key={i}
                className="relative flex flex-col md:flex-row items-center md:items-stretch rounded-2xl bg-white p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                {/* Image */}
                <div className="mb-4 md:mb-0 md:mr-4 relative h-74 md:h-50 w-full md:w-44 shrink-0 rounded-xl overflow-hidden bg-[#f5f3ff]">
                  <Image
                    src={team.avatar}
                    alt={team.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col justify-between md:text-left">
                  <div>
                    <p className="font-bold text-[20px] md:text-[22px] text-[#000] leading-8">
                      {team.name}
                    </p>
                    <p className="text-[14px] font-medium text-[#373737] leading-7">
                      {team.role}
                    </p>
                    <p className="text-[16px] md:text-[18px] text-[#9795B5] leading-7 md:leading-8 md:pe-4">
                      {team.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-4">
                    {team.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8FBFF]">
                        {renderIcon(item)}
                      </div>
                    ))}
                  </div>
                </div>
                {isLast && showVideo && (
                  <div className="absolute top-40 right-6 w-[230px] h-[330px] rounded-3xl overflow-hidden shadow-lg z-30 bg-black hidden md:block">
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
                        className="absolute bottom-2 left-2 z-30 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow">
                        <PlayCircle size={20} className="text-black" />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        videoRef.current?.pause();
                        videoRef.current!.currentTime = 0;
                        setIsPlaying(false);
                        setShowVideo(false);
                      }}
                      className="absolute top-2 right-2 z-30 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow">
                      <IoCloseCircle size={20} className="text-black" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE SLIDER */}
        <div className="md:hidden relative">
          <div className="flex justify-center">
            <div className="w-full">
              <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
                {/* Image */}
                <div className="mb-4 md:mb-0 md:mr-4 relative h-74 md:h-50 w-full md:w-44 shrink-0 rounded-xl overflow-hidden bg-[#f5f3ff]">
                  <Image
                    src={teams[currentIndex].avatar}
                    alt={teams[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <p className="font-bold text-[20px] text-black">
                  {teams[currentIndex].name}
                </p>
                <p className="text-[14px] font-medium text-[#373737]">
                  {teams[currentIndex].role}
                </p>
                <p className="text-[16px] text-[#9795B5] text-center mt-2">
                  {teams[currentIndex].desc}
                </p>
                {/* Social Icons */}
                <div className="mt-4 flex gap-4">
                  {teams[currentIndex].items.map((item, i) => (
                    <div
                      key={i}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8FBFF]">
                      {renderIcon(item)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* NAVIGATION – BELOW CARD */}
          <div className="mt-4 flex items-center justify-between gap-6">
            <button
              onClick={prevSlide}
              className="flex h-[40px] w-[54px] items-center justify-center rounded-[110px] bg-white text-[#292D32]">
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-[40px] w-[54px] items-center justify-center rounded-[110px] bg-white text-[#292D32]">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
