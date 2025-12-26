import NewsCard from "./newsCard";
import NewsCardBanner from "./newsCardBanner";

export default function IntoNews() {
  return (
    <section className="py-16 px-4 md:px-16 lg:px-30">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-[24px] md:text-[30px] font-semibold text-[#000000] mb-2">
          Understand Before You{" "}
          <span className="relative inline-block text-[#FF765E] ps-2">
            Buy
            <svg
              className="absolute left-0 -bottom-2"
              width="74"
              height="11"
              viewBox="0 0 228 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5C60 1.5 170 5.5 226 8.5"
                stroke="#FF765E"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#110229] text-[14px] md:text-[16px] font-medium mb-10">
          Simple reads to help you make smarter property{" "}
          <span className="text-[#FF765E]">decisions.</span>
        </p>

        {/* Banner */}
        <div className="mb-6">
          <NewsCardBanner />
        </div>

        {/* Cards */}
        <div className="gap-5 md:gap-6 ">
          <NewsCard />
        </div>
      </div>
    </section>
  );
}
