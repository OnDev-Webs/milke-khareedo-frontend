"use client";

import { useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Title from "../typography/title";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";

const team = [
  {
    name: "Kirath Singh",
    role: "Founder",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f1.jpg",
  },
  {
    name: "Anush",
    role: "Co-Founder",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f2.jpg",
  },
  {
    name: "Kirath Singh",
    role: "Founder",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f1.jpg",
  },
  {
    name: "Anush",
    role: "Co-Founder",
    desc: "description description description",
    items: ["twitter", "facebook", "linkedin", "instagram"],
    avatar: "/images/f2.jpg",
  },
];

export default function RestOfTeam() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? team.length - 1 : prev - 1));

  const next = () =>
    setCurrent((prev) => (prev === team.length - 1 ? 0 : prev + 1));

  const renderIcon = (name: string) => {
    switch (name) {
      case "twitter":
        return <Twitter size={20} className="text-[#FF765E]" />;
      case "facebook":
        return <Facebook size={20} className="text-[#FF765E]" />;
      case "linkedin":
        return <Linkedin size={20} className="text-[#FF765E]" />;
      case "instagram":
        return <Instagram size={20} className="text-[#FF765E]" />;
      default:
        return null;
    }
  };

  const Card = ({ data }: any) => (
    <div className="flex flex-col md:flex-row items-center md:items-stretch rounded-2xl bg-white p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
      <div className="mb-4 md:mb-0 md:mr-4 relative h-72 md:h-50 w-full md:w-44 shrink-0 rounded-xl overflow-hidden bg-[#f5f3ff]">
        <Image src={data.avatar} alt={data.name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="font-bold text-[20px] md:text-[22px] text-[#000] leading-8">
            {data.name}
          </p>
          <p className="text-[14px] font-medium text-[#373737] leading-7">
            {data.role}
          </p>
          <p className="text-[16px] md:text-[18px] text-[#9795B5] leading-7 md:leading-8 pe-0 md:pe-4">
            {data.desc}
          </p>
        </div>

        <div className="mt-4 flex gap-4">
          {data.items.map((item: string, i: number) => (
            <div
              key={i}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8FBFF]"
            >
              {renderIcon(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-white py-16 relative">

      <div className="absolute top-0 left-0 w-full h-[808px] overflow-hidden pointer-events-none">
        <svg
          className="w-[1500px] h-[1500px] opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
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
      </div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <Title
          text="Rest of the"
          isDrawLine
          drawLineText="Team"
          className="text-center mb-12 md:mb-20"
        />

        <div
          className="block md:hidden relative"
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (!touchStart) return;
            const diff = touchStart - e.changedTouches[0].clientX;
            if (diff > 50) next();
            if (diff < -50) prev();
            setTouchStart(null);
          }}
        >
          <Card data={team[current]} />

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prev}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className="h-10 w-10 flex items-center justify-center rounded-full border"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className="h-10 w-10 flex items-center justify-center rounded-full border"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* ✅ DESKTOP GRID (UNCHANGED) */}
        <div className="hidden md:grid gap-6 md:grid-cols-2 relative">
          {team.map((member, i) => (
            <div key={i} className="relative">
              <Card data={member} />

              {i === team.length - 1 && (
                <div className="absolute -bottom-56 -right-2 w-[230px] h-[330px] rounded-3xl overflow-hidden shadow-xl z-20">
                  <Image
                    src="/images/about.jpg"
                    alt="Overlay"
                    fill
                    className="object-cover scale-[1.2] translate-x-6"
                  />
                  <div className="absolute bottom-2 left-2 z-30">
                    <div className="h-8 w-8 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow">
                      <Play size="20" className="text-[#000]" />
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 z-30">
                    <div className="h-8 w-8 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center shadow">
                      <IoCloseCircle size="20" className="text-[#000]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
