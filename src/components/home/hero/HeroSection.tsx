import Image from "next/image";
import { FaChevronDown, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

export default function Hero() {
  const group_deals = [
    "/images/gd.jpg",
    "/images/gd1.jpg",
    "/images/gd2.jpg",
    "/images/gd3.jpg",
  ];

  return (
    <section className="relative w-full py-10">
      <div className="relative mx-auto w-full max-w-[1200px] h-auto md:h-[450px] overflow-visible rounded-3xl bg-gradient-to-br from-[#C1DDEB] to-[#E3F2F5] p-6 shadow-md">
        <div className="relative z-10 w-full md:w-[60%] pt-10 md:pt-10 ps-4 md:ps-6">
          <p className="font-medium text-[#585981] mb-2">
            Buying a home is a big decision.
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#151516] md:pe-68">
            <span className="text-[#FF765E]"> Milke Khereedo </span>
            Makes it easier.
          </h1>

          <p className="mt-3 text-[#585981] font-medium">
            Buy together. Save more than buying alone.
          </p>

          <div className="mt-6">
            <button className="rounded-full bg-[#FF765E] px-8 py-3 text-sm font-medium text-white shadow">
              Want to see how it works?
            </button>
          </div>

          <div className="my-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3">
            <div className="flex -space-x-2">
              {group_deals.map((img, index) => (
                <div
                  key={index}
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                >
                  <Image src={img} alt="User" fill className="object-cover" />
                </div>
              ))}
            </div>

            <span className="text-sm font-medium text-gray-700">
              Explore 100+ Group Deals
            </span>
          </div>
        </div>

        <div className="hidden md:block absolute top-[-32px] left-[530px]">
          <div className="relative w-[600px] h-[480px] overflow-hidden">
            <Image
              src="/images/banner1.png"
              alt="Hero Image"
              fill
              priority
              className="object-cover object-[50%_80%]"
              style={{ transform: "scale(1.4)" }}
            />
          </div>
        </div>

        <div className="block md:hidden mt-10 relative w-[400px] top-[-100px] left-[-40px] h-[260px]">
          <Image
            src="/images/banner1.png"
            alt="Hero Image"
            fill
            priority
            className="object-cover object-[50%_80%]"
          />
        </div>
      </div>

      <div className="absolute bottom-[-20px] left-1/2 w-[95%] md:w-[1150px] -translate-x-1/2 px-4 md:px-6 z-20">
        <div className="flex flex-col md:flex-row items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-[5px] p-4 shadow-lg ring-1 ring-white/30">
          {/* CITY SELECT */}
          <div className="relative h-14 w-full md:w-56">
            <select
              defaultValue="Delhi"
              className="h-full w-full appearance-none rounded-xl bg-transparent px-4 pr-10 text-sm text-gray-800 outline-none border-none focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="Delhi">City | Delhi</option>
              <option value="Mumbai">City | Mumbai</option>
              <option value="Bangalore">City | Bangalore</option>
              <option value="Pune">City | Pune</option>
            </select>
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs" />
          </div>

          {/* INPUT */}
          <div className="relative flex-1 w-full">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Find Your Dream Home"
              className="h-14 w-full rounded-xl bg-transparent pl-12 pr-4 text-sm text-gray-800 outline-none border-none focus:outline-none focus:ring-0"
            />
          </div>

          {/* BUTTON */}
          <button className="h-12 w-full md:w-28 rounded-full bg-[#FF765E] text-white flex items-center justify-center shadow-md">
            <FaSearch />
            <span className="ps-2">Search</span>
          </button>
        </div>
      </div>
    </section>
  );
}
