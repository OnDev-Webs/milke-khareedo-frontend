import CompanyOverviewImg from "@/assets/about-us/company-overview.png";
import Image from "next/image";
import Title from "@/components/typography/title";

export default function CompanyOverview() {
  const features = [
    { title: "Who We Are", desc: "We bring buyers together for better value." },
    { title: "What We Do", desc: "We bring buyers together for better prices" },
    {
      title: "How We Do IT",
      desc: "Clear steps, honest guidance, no pressure.",
    },
    { title: "Why With Us", desc: "Buying together unlocks you more savings." },
  ];

  return (
    <section className="w-full bg-white py-16 px-10 md:px-12">
      <div className="mx-auto container">
        {/* Title */}
        <div className="flex items-center justify-center mb-12 md:mb-20 w-fit mx-auto">
          <Title text={"Company"} drawLineText={"Overview"} isDrawLine />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-12">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-8 w-full md:w-1/2 h-full">
            <h3 className="text-[30px] font-bold text-black">
              Built to help buyers save more — together.
            </h3>

            <p className="text-[18px] font-normal text-[#373737]">
              Buying property together gives buyers more power. At
              <span className="text-[#FF765E]"> Milke Khareedo,</span> we bring
              buyers together so better pricing and clearer decisions become
              possible.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-md">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-2xl bg-[#F2F6FF] p-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebe7ff]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-10 w-10 text-[#c6bdf5]"
                      fill="currentColor"
                    >
                      <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                      <circle cx="9" cy="8" r="2" />
                    </svg>
                  </div>

                  <div>
                    <h5 className="font-bold text-black">{item.title}</h5>
                    <p className="text-[14px] text-[#9795B5]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative w-full md:w-1/2 h-[400px] md:h-auto">
            <Image
              src={CompanyOverviewImg}
              alt="Company Overview Image"
              fill
              className="object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
