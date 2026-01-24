"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    rating: 5,
    title: "Buying felt less stressful",
    text1:
      "The entire experience was smooth and transparent from start to finish.",
    text2:
      "I finally felt confident making such a big decision without pressure.",
    user: "Amit Sharma",
    avatar: "/images/user.jpg",
  },
  {
    rating: 5,
    title: "Clear process from start to end.",
    text1: "We always knew what was happening next.",
    text2: "Buying together made pricing feel more transparent.",
    user: "Rahul Mehta",
    avatar: "/images/user1.jpg",
  },
  {
    rating: 4,
    title: "Didn’t feel like I was negotiating alone.",
    text1: "Normally, pricing conversations are uncomfortable",
    text2: " Here, it felt calmer and more balanced.",
    user: "Ankit Jain",
    avatar: "/images/user3.jpg",
  },
  {
    rating: 5,
    title: "No sales pressure, which I really appreciated.",
    text1:
      "We were given time to understand and decide.That made all the difference.",
    text2: "Saved me a lot of time and confusion.",
    user: "Rohit Agarwal",
    avatar: "/images/user4.jpg",
  },
  {
    rating: 5,
    title: "Trustworthy & easy",
    text1: "Everything was explained clearly and professionally.",
    text2: "Saved me a lot of time and confusion.",
    user: "Suresh Iyer",
    avatar: "/images/user.jpg",
  },
  {
    rating: 5,
    title: "Trustworthy & easy",
    text1: "Everything was explained clearly and professionally.",
    text2: "Saved me a lot of time and confusion.",
    user: "Nehal Gupta",
    avatar: "/images/user1.jpg",
  },
  {
    rating: 5,
    title: "Trustworthy & easy",
    text1: "Everything was explained clearly and professionally.",
    text2: "Saved me a lot of time and confusion.",
    user: "Kaviya Nair",
    avatar: "/images/user3.jpg",
  },
  {
    rating: 5,
    title: "Trustworthy & easy",
    text1: "Everything was explained clearly and professionally.",
    text2: "Saved me a lot of time and confusion.",
    user: "Sneh Patil",
    avatar: "/images/user4.jpg",
  },
  {
    rating: 5,
    title: "Trustworthy & easy",
    text1: "Everything was explained clearly and professionally.",
    text2: "Saved me a lot of time and confusion.",
    user: "Priyam Verma",
    avatar: "/images/user.jpg",
  },
  {
    rating: 5,
    title: "Trustworthy & easy",
    text1: "Everything was explained clearly and professionally.",
    text2: "Saved me a lot of time and confusion.",
    user: "Vishal Singh",
    avatar: "/images/user1.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white pb-16 px-6 md:px-10">
      <div className="mx-auto max-w-[1300px]">
        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-700">
            Trusted by
            <span className="relative inline-block text-[#1C4692] font-bold px-2">
              Buyers
              <svg
                className="absolute left-0 -bottom-2"
                width="130"
                height="11"
                viewBox="0 0 228 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C60 1.5 170 5.5 226 8.5"
                  stroke="#1C4692"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            Like You
          </h2>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <button className="testimonial-prev h-10 w-10 rounded-full border border-[#1C4692] text-[#1C4692] flex items-center justify-center hover:bg-[#1C4692] hover:text-white transition">
              <ChevronLeft size={18} />
            </button>
            <button className="testimonial-next h-10 w-10 rounded-full border border-[#1C4692] text-[#1C4692] flex items-center justify-center hover:bg-[#1C4692] hover:text-white transition">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          spaceBetween={24}
          slidesPerView={3.5}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="!h-auto mb-10">
              <div className="h-full min-h-[310px] rounded-2xl bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)] flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-[#FFB703] text-[#FFB703]"
                    />
                  ))}
                </div>

                {/* Title */}
                <h4 className="text-[22px] font-semibold text-[#000000] mb-3">
                  {review.title}
                </h4>

                {/* Text */}
                <p className="text-[14px] font-medium text-[#373737] leading-relaxed">
                  {review.text1}
                </p>
                <p className="text-[14px] font-medium text-[#373737] leading-relaxed mt-2">
                  {review.text2}
                </p>

                {/* User */}
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar}
                      alt={review.user}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[14px] font-semibold text-[#373737]">
                    {review.user}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
