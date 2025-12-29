"use client";
import Image from "next/image";

export default function AboutSection() {
  const points = [
    {
      title: "Explore & Shortlist",
      desc: "Explore and shortlist properties easily using our search, map view, and virtual site visits.",
    },
    {
      title: "Show interest. No commitment yet.",
      desc: "Once you shortlist a few projects, simply show interest. We add you to a buyer group — nothing is final at this stage.",
    },
    {
      title: "Buyers come together",
      desc: "You join a private buyer group on our platform to stay informed, share views, and move forward together.",
    },
    {
      title: "Unlock better pricing options",
      desc: "When buyers come together, better pricing becomes possible — helping you save much more than individual buying.",
    },
    {
      title: "You decide. No pressure.",
      desc: "Once the group deal is ready, you complete your purchase with confidence — knowing you’re getting the best value available.",
    },
  ];

  return (
    <section
      className="w-full py-16"
      style={{
        backgroundColor: "#F2F5F9",
        backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* LEFT SIDE */}
          <div className="ps-0 md:ps-10">
            <h3 className="text-[24px] md:text-[30px] font-semibold text-[#000] mb-6 md:mb-8 pe-0 md:pe-0">
              How <span className="text-[#1C4692]"> Milke Khareedo</span> Makes
              <span className="relative inline-block pe-2">
                Buying
                <svg
                  className="absolute left-0 -bottom-2"
                  width="128"
                  height="11"
                  viewBox="0 0 228 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8.5C60 1.5 170 5.5 226 8.5"
                    stroke="#1C4692"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              Easier
            </h3>

            <div className="space-y-3 md:space-y-2">
              {points.map((item, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  {/* Number */}
                  <div className="flex h-8 w-8 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-[#1C4692] text-white font-bold text-sm md:text-base leading-none">
                    {i + 1}
                  </div>

                  {/* Text */}
                  <div>
                    <h5 className="text-[14px] md:text-[18px] font-semibold text-black">
                      {item.title}
                    </h5>
                    <p className="text-[11px] md:text-[12.5px] text-[#373737] mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center h-[350px] md:h-[500px]">
            <div className="relative w-full max-w-[220px] md:max-w-[300px] h-full rounded-3xl overflow-hidden shadow-lg">
              {/* Image */}
              <Image
                src="/images/about.jpg"
                alt="About"
                fill
                priority
                className="object-cover scale-[1.25] md:scale-[1.25] translate-x-[20px] md:translate-x-[38px]"
              />

              {/* Top Left */}
              <div className="absolute top-2 md:top-2 left-2 md:left-2 z-20 flex items-center gap-2 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white">
                <svg
                  className="h-7 w-7 md:h-9 md:w-9 bg-white/90 rounded-full p-[3px]"
                  viewBox="0 0 24 24"
                  fill="#000"
                >
                  <circle cx="8" cy="8" r="2" />
                  <circle cx="16" cy="8" r="2" />
                  <circle cx="8" cy="16" r="2" />
                  <circle cx="16" cy="16" r="2" />
                </svg>
                Milke Khareedo
              </div>

              {/* Top Right */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4 flex gap-2">
                <div className="h-7 md:h-9 w-7 md:w-9 bg-white rounded-full flex items-center justify-center shadow">
                  <svg
                    className="h-3 md:h-4 w-3 md:w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11 5L6 9H2v6h4l5 4z" />
                  </svg>
                </div>

                <div className="h-7 md:h-9 w-7 md:w-9 bg-white rounded-full flex items-center justify-center shadow">
                  <svg
                    className="h-3 md:h-4 w-3 md:w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zm6 10v6h-6v-2h4v-4zM4 14h2v4h4v2H4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
