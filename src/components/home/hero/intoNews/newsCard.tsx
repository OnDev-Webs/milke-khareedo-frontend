"use client";

import Image from "next/image";
import { useState } from "react";
import type { Blog } from "@/lib/api/services/home.service";
import Link from "next/link";

export default function NewsCard({ blogs }: { blogs: Blog[] }) {
  const [visibleCount, setVisibleCount] = useState(2);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.slice(0, visibleCount).map((item) => (
          <Link
            key={item._id}
            href={`/blogs/${item.slug}`}
            className="block h-full"
          >
            <div className="shadow-[0_0_10px_rgba(0,0,0,0.08)] p-6 rounded-4xl h-full cursor-pointer hover:shadow-md transition">
              <div className="flex flex-col h-full gap-4">
                <div className="relative w-[140px] h-[80px] md:w-full md:h-[320px] rounded-4xl overflow-hidden">
                  <Image
                    src={item.bannerImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col flex-1 text-left">
                  <h2 className="font-bold text-[22px] text-[#000000] line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-[#373737] text-[16px] mt-2 line-clamp-3">
                    {(item.content || item.subtitle || "").replace(/<[^>]*>/g, "")}
                  </p>

                  <div className="mt-auto pt-4">
                    <span className="inline-block rounded-full bg-[#1C4692] px-8 py-3 text-[14px] font-semibold text-white">
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

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
  );
}
