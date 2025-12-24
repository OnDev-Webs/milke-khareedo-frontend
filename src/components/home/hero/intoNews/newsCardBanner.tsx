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
        <div className="w-full md:w-2/3 flex flex-col justify-between space-y-4 md:space-y-5 p-4 md:p-0">
          <h2 className="text-[#5D5A88] font-bold text-xl md:text-2xl lg:text-4xl leading-6 md:leading-7 lg:leading-8">
            Is This the Right Price for This Home?
          </h2>
          <p className="text-[#9795B5] text-sm md:text-base lg:text-lg">
            A simple way to understand pricing — and know if you’re overpaying or not.
          </p>
          <button className="mt-4 md:mt-6 rounded-full border border-gray-400 px-8 md:px-10 py-2 md:py-3 text-sm md:text-base font-semibold text-gray-600 self-start">
           Read More
          </button>
        </div>
        
      </div>
    </div>
  );
}
