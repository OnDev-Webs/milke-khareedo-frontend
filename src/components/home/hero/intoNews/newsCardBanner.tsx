import Image from "next/image";

export default function NewsCardBanner() {
  return (
    <div className="shadow-[0_0_10px_rgba(0,0,0,0.08)] py-7 px-4 md:py-7.5 md:px-10 rounded-4xl">
      <div className="flex flex-col md:flex-row gap-5 bg-white rounded-4xl overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/3 h-48 md:h-auto bg-[#F9F9FF] flex items-center justify-center rounded-4xl overflow-hidden">
          <div className="relative w-full h-full rounded-xl">
            <Image
              src="/images/tp2.jpg"
              alt="heading"
              className="object-cover"
              fill
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 flex flex-col justify-start items-start space-y-4 md:space-y-5 p-4 md:p-6">
          <h2 className="text-[#000000] font-bold md:text-[30px] leading-6 md:leading-7 lg:leading-8 text-left">
            Is This the Right Price for This Home?
          </h2>
          <p className="text-[#373737] text-medium md:text-[16px] text-left">
            A simple way to understand pricing — and know if you’re overpaying
            or not.
          </p>
          <button className="mt-4 md:mt-6 rounded-full bg-[#1C4692] px-8 md:px-10 py-2 md:py-3 text-sm md:text-base font-semibold text-white hover:opacity-90 transition">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
