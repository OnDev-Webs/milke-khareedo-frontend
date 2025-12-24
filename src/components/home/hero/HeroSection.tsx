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

      {/* HERO CONTAINER */}
      <div className="relative mx-auto w-[1200px] h-[500px]  overflow-visible rounded-3xl bg-gradient-to-br from-[#C1DDEB] to-[#E3F2F5] p-10 shadow-md">

        {/* CONTENT */}
        <div className="relative z-10 w-[60%] pt-16 ps-6">
          <h1 className="text-4xl font-bold text-gray-700 pe-68">
            Lorem Ipsum is <span style={{ 'color': '#FF765E' }}>Simply Dummy</span>
          </h1>

          <p className="mt-3 text-gray-600 pe-70">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="rounded-full bg-[#FF765E] px-8 py-3 text-sm font-medium text-white shadow">
              Button
            </button>

            <button className="rounded-full border border-white bg-white px-8 py-3 text-sm font-medium text-gray-700">
              Button
            </button>
          </div>

          {/* Explore */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3">
            <div className="flex -space-x-2">
              {group_deals.map((img, index) => (
                <div
                  key={index}
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                  <Image
                    src={img}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <span className="text-sm font-medium text-gray-700">
              Explore 100+ Group Deals
            </span>
          </div>
        </div>

        {/* IMAGE (OVERLAPPED & BLENDED) */}
        <div className="absolute top-[30px] left-[500px]">
          <div className="relative w-[635px] h-[434px] overflow-hidden">
            <Image
              src="/images/banner.jpg"
              alt="Hero Image"
              fill
              priority
              className="object-cover object-[50%_80%]"
              style={{ transform: "scale(1.4)" }}
            />
          </div>
        </div>

      </div>

      {/* SEARCH BAR (OVERLAP FULL WIDTH) */}
      <div className="absolute bottom-[-14px] left-1/2 w-[1150px] max-w-6xl -translate-x-1/2 px-6 z-20">
        <div className="flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-lg">

          {/* CITY DROPDOWN */}
          <div className="relative h-14 w-56">
            <select
              defaultValue="Delhi"
              className="h-full w-full appearance-none rounded-xl bg-white px-4 pr-10 text-sm text-gray-700 shadow-sm outline-none cursor-pointer"
            >
              <option value="Delhi">City | Delhi</option>
              <option value="Mumbai">City | Mumbai</option>
              <option value="Bangalore">City | Bangalore</option>
              <option value="Pune">City | Pune</option>
            </select>
            {/* DROPDOWN ICON */}
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          {/* INPUT */}
          <div className="relative flex-1">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Find Your Dream Home"
              className="h-14 w-full rounded-xl bg-white pl-12 pr-4 text-sm text-gray-600 outline-none shadow-sm"
            />
          </div>

          {/* SEARCH BUTTON */}
          <button className="h-12 w-28 rounded-xl bg-[#FF765E] text-white flex items-center justify-center shadow-md">
            <FaSearch /> <span className="ps-2 text-center">Search</span>
          </button>
        </div>
      </div>

    </section >
  );
}
