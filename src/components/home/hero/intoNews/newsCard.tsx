"use client";
import Image from "next/image";
import { useState } from "react";

export default function NewsCard() {
  const cards = [
    {
      id: 1,
      title: "How Buying Together Actually Helps You Save",
      desc: "What changes when buyers come together — and why pricing becomes more flexible.",
      image: "/images/tp2.jpg",
    },
    {
      id: 2,
      title: "Documents You Should Check Before Saying...",
      desc: "A simple checklist to help you feel confident before committing.",
      image: "/images/tp2.jpg",
    },
    {
      id: 3,
      title: "Things to Check Before Buying",
      desc: "Legal checks, pricing insights and locality analysis simplified for you.",
      image: "/images/tp2.jpg",
    },
    {
      id: 4,
      title: "Things to Check Before Buying",
      desc: "Legal checks, pricing insights and locality analysis simplified for you.",
      image: "/images/tp2.jpg",
    },
    {
      id: 5,
      title: "Things to Check Before Buying",
      desc: "Legal checks, pricing insights and locality analysis simplified for you.",
      image: "/images/tp2.jpg",
    },
    {
      id: 6,
      title: "Things to Check Before Buying",
      desc: "Legal checks, pricing insights and locality analysis simplified for you.",
      image: "/images/tp2.jpg",
    },
    {
      id: 7,
      title: "Things to Check Before Buying",
      desc: "Legal checks, pricing insights and locality analysis simplified for you.",
      image: "/images/tp2.jpg",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(2);

  return (
    <div className="w-full">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="shadow-[0_0_10px_rgba(0,0,0,0.08)] p-6 rounded-4xl w-full"
          >
            <div className="bg-white flex flex-col rounded-4xl overflow-hidden gap-4">
              {/* Image */}
              <div className="w-full h-56 bg-[#F9F9FF] rounded-4xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt="news image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-start text-left space-y-4 p-4">
                <h2 className="text-[#000000] font-bold text-[30px] leading-snug text-left">
                  {item.title}
                </h2>

                <p className="text-[#373737] font-medium text-[16px] leading-relaxed text-left">
                  {item.desc}
                </p>

                <button className="mt-2 rounded-full bg-[#FF765E] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < cards.length && (
        <div className="md:col-span-3 col-span-1 flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount(cards.length)}
            className="px-8 py-3 rounded-full border border-[#F5F5F5] text-[#2D2D2D] bg-white font-semibold"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
