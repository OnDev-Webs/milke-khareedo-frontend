"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

const steps = [
  {
    number: "01",
    title: "We Didn’t Buy Alone — And It Changed Everything",
    desc: "First-time buyers who found clarity and better value by buying together instead of rushing alone.",
  },
  {
    number: "02",
    title: "Smart Planning Saves Time",
    desc: "Proper planning helped buyers avoid common pitfalls and wasted time during purchases.",
  },
  {
    number: "03",
    title: "Budgeting with Confidence",
    desc: "Understanding the numbers allowed buyers to make informed decisions.",
  },
  {
    number: "04",
    title: "Finding the Perfect Property",
    desc: "Collaboration helped uncover hidden gems in the market.",
  },
  {
    number: "05",
    title: "Negotiating Like Pros",
    desc: "Group negotiation brought better offers and saved money.",
  },
  {
    number: "06",
    title: "Smooth Transaction Process",
    desc: "Step-by-step guidance reduced stress and surprises.",
  },
  {
    number: "07",
    title: "Smooth Transaction Process",
    desc: "Step-by-step guidance reduced stress and surprises.",
  },
  {
    number: "08",
    title: "Smooth Transaction Process",
    desc: "Step-by-step guidance reduced stress and surprises.",
  },
  {
    number: "09",
    title: "Smooth Transaction Process",
    desc: "Step-by-step guidance reduced stress and surprises.",
  },
  {
    number: "10",
    title: "Smooth Transaction Process",
    desc: "Step-by-step guidance reduced stress and surprises.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-14 px-4 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-[24px] md:text-[30px] font-semibold text-[#000000] mb-2">
          How People Like You Bought
          <span className="relative inline-block text-[#FF765E] ps-2">
            Smarter
            <svg
              className="absolute left-0 -bottom-2"
              width="150"
              height="11"
              viewBox="0 0 228 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5C60 1.5 170 5.5 226 8.5"
                stroke="#FF765E"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h2>
        <p className="pt-2 pb-10 font-medium text-[#110229]">
          Real buying <span className="text-[#FF765E]">journeys</span>, explained simply.
        </p>

        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              1024: { slidesPerView: 3.5, spaceBetween: 18 },
            }}
            freeMode={true}
            scrollbar={{
              draggable: true,
              el: ".custom-swiper-scrollbar",
            }}
            modules={[FreeMode, Scrollbar]}
            className="pb-8"
          >
            {steps.map((step, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col bg-white rounded-xl mb-2 p-5 shadow-md min-h-[260px] max-w-[340px]">

                  {/* Number with BLUR gradient background */}
                  <div className="relative mb-4 h-12 w-12 flex items-center justify-center">

                    {/* Blur background */}
                    <div className="absolute inset-0 rounded-xl bg-[linear-gradient(-40deg,#0038FF,#FF765E,#FFA08F,#F84C4F)] blur-xs opacity-90">
                    </div>

                    {/* Number */}
                    <div className="relative z-10 text-white font-bold text-lg">
                      {step.number}
                    </div>

                  </div>

                  {/* Title */}
                  <h3 className="text-[#000000] font-bold text-[17px] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#373737] text-medium text-[14px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-swiper-scrollbar mt-6 mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
