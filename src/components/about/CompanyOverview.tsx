import CompanyOverviewImg from "@/assets/about-us/company-overview.png";
import Image from "next/image";
import Title from "@/components/typography/title";

export default function CompanyOverview() {
  const features = [
    {
      title: "Who We Are",
      desc: "We bring buyers together for better value.",
      icon: "/images/co1.png",
    },
    {
      title: "What We Do",
      desc: "We bring buyers together for better prices",
      icon: "/images/co2.png",
    },
    {
      title: "How We Do IT",
      desc: "Clear steps, honest guidance, no pressure.",
      icon: "/images/co3.png",
    },
    {
      title: "Why With Us",
      desc: "Buying together unlocks you more savings.",
      icon: "/images/co4.png",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 md:px-12">
      <div className="mx-auto container">
        {/* Title */}
        <div className="flex items-center justify-center mb-12 md:mb-20 w-fit mx-auto">
          <Title text={"Company"} drawLineText={"Overview"} isDrawLine />
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-12">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4 w-full md:w-1/2 h-full">
            <h3 className="text-[40px] font-bold text-[#000000]">
              Built to help buyers save more — together.
            </h3>

            <p className="text-[18px] font-normal text-[#373737]">
              Buying property together gives buyers more power. At
              <span className="text-[#1C4692]"> Milke Khareedo,</span> we bring buyers together so better pricing and clearer decisions become possible. We guide the process transparently — helping you buy with confidence and better value. Smarter buying. Together.
            </p>

            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 place-items-start"> */}
            <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2 md:place-items-start">

              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-2xl bg-[#EEF4FF] px-5 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)] w-[280px] min-w-[280px] max-w-[280px] h-[144px] min-h-[144px] max-h-[144px] box-border">
                  {/* ICON BOX – SAME AS MISSION / VISION */}
                  <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-xl overflow-hidden shrink-0">
                    {/* Background */}
                    <Image
                      src="/images/LightGradient.svg"
                      alt="LightGradient"
                      width={80}
                      height={80}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    {/* Icon */}
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={30}
                      height={30}
                      className="relative z-10 object-contain"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col justify-center">
                    <h5 className="font-bold text-[18px] text-black leading-tight">
                      {item.title}
                    </h5>
                    <p className="text-[16px] pt-1 text-[#9795B5] leading-snug">
                      {item.desc}
                    </p>
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
