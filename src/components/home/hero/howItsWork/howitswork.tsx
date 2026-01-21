"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !swiperRef.current) return;
      if (window.innerWidth < 1024) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const swiper = swiperRef.current;

      const sectionInView =
        rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5;

      if (!sectionInView) return;

      const isAtEnd = swiper.isEnd;
      const isAtStart = swiper.isBeginning;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && !isAtEnd) || (scrollingUp && !isAtStart)) {
        e.preventDefault();
        setIsLocked(true);

        swiper.setTranslate(swiper.getTranslate() - e.deltaY * 0.8);
        swiper.updateProgress();
        swiper.updateActiveIndex();
      } else {
        setIsLocked(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="w-full bg-white py-14 px-4 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold text-black mb-2">
          How People Like You Bought
          <span className="relative inline-block text-[#1C4692] ps-2">
            Smarter
            <svg
              className="absolute left-0 -bottom-2 w-[120px] md:w-[150px]"
              viewBox="0 0 228 11"
              fill="none"
            >
              <path
                d="M2 8.5C60 1.5 170 5.5 226 8.5"
                stroke="#1C4692"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        <p className="pt-2 pb-8 text-sm sm:text-base font-medium text-[#110229]">
          Real buying <span className="text-[#1C4692]">journeys</span>,
          explained simply.
        </p>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1.1}
            spaceBetween={14}
            breakpoints={{
              640: { slidesPerView: 1.8, spaceBetween: 16 },
              768: { slidesPerView: 2.4, spaceBetween: 18 },
              1024: { slidesPerView: 3.5, spaceBetween: 20 },
            }}
            freeMode
            scrollbar={{
              draggable: true,
              el: ".custom-swiper-scrollbar",
            }}
            modules={[FreeMode, Scrollbar]}
            className="pb-6"
          >
            {steps.map((step, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col bg-white rounded-2xl p-5 mb-2 shadow-md min-h-[240px] max-w-[340px]">
                  <div className="relative mb-4 h-12 w-12 flex items-center justify-center">
                    <img
                      src="/images/LightGradient.svg"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <span className="relative z-10 text-white font-bold text-[22px]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-black font-bold text-[16px] sm:text-[17px] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[#373737] text-[14px] leading-relaxed line-clamp-3">
                    {step.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-swiper-scrollbar mt-4"></div>
        </div>
      </div>
    </section>
  );
}
