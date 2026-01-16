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
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center mb-12 md:mb-20 w-fit mx-auto">
          <Title text="Company" drawLineText="Overview" isDrawLine />
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:min-h-[520px] xl:min-h-[560px]">
          {/* LEFT */}
          <div className="flex flex-col justify-between w-full md:w-1/2">
            <div className="flex flex-col gap-4">
              <h3 className="text-[32px] md:text-[36px] xl:text-[40px] font-bold text-black leading-tight max-w-xl">
                Built to help buyers save more — together.
              </h3>

              <p className="text-[16px] md:text-[18px] text-[#373737] leading-relaxed max-w-2xl">
                Buying property together gives buyers more power. At
                <span className="text-[#1C4692] font-medium">
                  {" "}
                  Milke Khareedo,
                </span>{" "}
                we bring buyers together so better pricing and clearer decisions
                become possible. We guide the process transparently — helping you
                buy with confidence and better value. Smarter buying. Together.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-[620px]">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-4 rounded-2xl bg-[#EEF4FF] px-5 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)] min-h-auto md:min-h-[120px] items-start">
                  {/* ICON */}
                  <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-xl overflow-hidden shrink-0">
                    <Image
                      src="/images/LightGradient.svg"
                      alt="LightGradient"
                      width={80}
                      height={80}
                      className="absolute inset-0"
                    />
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={30}
                      height={30}
                      className="relative z-10 object-contain"
                    />
                  </div>
                  {/* TEXT */}
                  <div>
                    <h5 className="font-bold text-[18px] text-black leading-tight">
                      {item.title}
                    </h5>
                    <p className="text-[15px] pt-1 text-[#9795B5] leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE – SAME HEIGHT */}
          <div className="relative w-full md:w-1/2 min-h-[320px] md:h-auto">
            <div className="absolute inset-0">
              <Image
                src={CompanyOverviewImg}
                alt="Company Overview Image"
                fill
                className="object-cover rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
