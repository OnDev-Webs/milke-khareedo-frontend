"use client";

import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/api/services/home.service";

export default function NewsCardBanner({ blog }: { blog: Blog }) {
  if (!blog) return null;

  return (
    <div className="shadow-[0_0_10px_rgba(0,0,0,0.08)] py-7 px-4 md:py-4 md:px-8 rounded-4xl">
      <div className="flex flex-col md:flex-row gap-5 bg-white rounded-4xl overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-48 md:h-auto bg-[#F9F9FF] flex items-center justify-center rounded-4xl overflow-hidden">
          <div className="relative w-140 h-80 rounded-xl">
            <Image
              src={blog.bannerImage}
              alt={blog.title}
              className="object-cover"
              fill
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 flex flex-col justify-start items-start space-y-4 md:space-y-5 p-4 md:p-6">
          <h2 className="text-[#000000] font-bold text-[22px] text-left">
            {blog.title}
          </h2>

          <p className="text-[#373737] text-medium text-[16px] text-left">
            {(blog.content || blog.subtitle || "")
              .replace(/<[^>]*>/g, "")
              .slice(0, 350) + "..."}
          </p>

          <Link href={`/blogs/${blog.slug}`}>
            <button className="rounded-full bg-[#1C4692] px-8 md:px-10 py-2 md:py-3 text-[18px] font-semibold text-white transition">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
