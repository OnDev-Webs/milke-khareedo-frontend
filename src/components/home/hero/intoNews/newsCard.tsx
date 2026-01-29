"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Blog } from "@/lib/api/services/home.service";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function NewsCard({ blogs }: { blogs: Blog[] }) {
  const [visibleCount, setVisibleCount] = useState(2);
  const swiperRef = useRef<any>(null);

  /* ================= CARD UI (COMMON) ================= */
  const Card = ({ item }: { item: Blog }) => (
    <Link href={`/blogs/${item.slug}`} className="block h-full">
      <div className="shadow-[0_0_10px_rgba(0,0,0,0.08)] p-6 rounded-4xl h-full cursor-pointer hover:shadow-md transition">
        <div className="flex flex-col h-full gap-4">
          {/* Image */}
          <div className="relative w-full h-[220px] md:h-[320px] rounded-4xl overflow-hidden">
            <Image
              src={item.bannerImage}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 text-left">
            <h2 className="font-bold text-[22px] text-[#000000] line-clamp-2">
              {item.title}
            </h2>

            <p className="text-[#373737] text-[16px] mt-2 line-clamp-3">
              {(item.content || item.subtitle || "").replace(/<[^>]*>/g, "")}
            </p>

            {/* Read More – desktop & tablet only */}
            <div className="mt-auto pt-4 hidden md:block">
              <span className="inline-block rounded-full bg-[#1C4692] px-8 py-3 text-[14px] font-semibold text-white">
                Read More
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full">

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {blogs.map((item) => (
            <SwiperSlide key={item._id}>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left / Right arrows only */}
        <div className="flex items-center justify-between px-4 mt-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>

      {/* ============ TABLET + DESKTOP VIEW ============= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.slice(0, visibleCount).map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>

        {/* Load More – tablet & desktop only */}
        {visibleCount < blogs.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(blogs.length)}
              className="px-8 py-3 rounded-full border border-[#F5F5F5] font-semibold"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
