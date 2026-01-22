// import CompanyOverviewImg from "@/assets/about-us/company-overview.png";
// import Image from "next/image";
// import Title from "@/components/typography/title";

// export default function CompanyOverview() {
//   const features = [
//     {
//       title: "Who We Are",
//       desc: "We bring buyers together for better value.",
//       icon: "/images/co1.png",
//     },
//     {
//       title: "What We Do",
//       desc: "We bring buyers together for better prices",
//       icon: "/images/co2.png",
//     },
//     {
//       title: "How We Do IT",
//       desc: "Clear steps, honest guidance, no pressure.",
//       icon: "/images/co3.png",
//     },
//     {
//       title: "Why With Us",
//       desc: "Buying together unlocks you more savings.",
//       icon: "/images/co4.png",
//     },
//   ];

//   return (
//     <section className="w-full bg-white py-16 px-4 md:px-12">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <div className="flex items-center justify-center mb-12 md:mb-20 w-fit mx-auto">
//           <Title text="Company" drawLineText="Overview" isDrawLine />
//         </div>

//         {/* Content */}
//         <div className="flex flex-col md:flex-row md:items-stretch gap-12">
//           {/* LEFT SIDE */}
//           <div className="flex flex-col gap-4 w-full md:w-1/2 h-full">
//             <h3 className="text-[24px] md:text-[40px] font-bold text-[#000000]">
//               Built to help buyers save more — together.
//             </h3>

//             <p className="text-[18px] font-normal text-[#373737]">
//               Buying property together gives buyers more power. At
//               <span className="text-[#1C4692]"> Milke Khareedo,</span> we bring
//               buyers together so better pricing and clearer decisions become
//               possible. We guide the process transparently — helping you buy
//               with confidence and better value. Smarter buying. Together.
//             </p>

//             {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 place-items-start"> */}
//             <div className="grid grid-cols-1 gap-5 place-items-center md:grid-cols-2 md:place-items-start">
//               {/* FEATURES */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-[620px]">
//                 {features.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-4 rounded-2xl bg-[#EEF4FF] px-5 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)] h-[144px] min-h-[144px] max-h-[144px] box-border"
//                   >
//                     {/* ICON BOX – SAME AS MISSION / VISION */}
//                     <div className="relative flex h-[80px] w-[80px] items-center justify-center rounded-xl overflow-hidden shrink-0">
//                       <Image
//                         src="/images/LightGradient.svg"
//                         alt="LightGradient"
//                         width={80}
//                         height={80}
//                         className="absolute inset-0"
//                       />
//                       <Image
//                         src={item.icon}
//                         alt={item.title}
//                         width={30}
//                         height={30}
//                         className="relative z-10 object-contain"
//                       />
//                     </div>
//                     {/* TEXT */}
//                     <div>
//                       <h5 className="font-bold text-[18px] text-black leading-tight">
//                         {item.title}
//                       </h5>
//                       <p className="text-[15px] pt-1 text-[#9795B5] leading-snug">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative w-full md:w-1/2 h-[400px] md:h-auto">
//               <Image
//                 src={CompanyOverviewImg}
//                 alt="Company Overview Image"
//                 fill
//                 className="object-cover rounded-3xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <div className="flex justify-center mb-14 md:mb-20">
          <Title text="Company" drawLineText="Overview" isDrawLine />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-14">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h3 className="text-[26px] md:text-[40px] font-bold text-black leading-tight">
              Built to help buyers save more — together.
            </h3>

            <p className="mt-4 text-[16px] md:text-[18px] text-[#373737] leading-relaxed">
              Buying property together gives buyers more power. At
              <span className="text-[#1C4692] font-medium">
                {" "}
                Milke Khareedo
              </span>
              , we bring buyers together so better pricing and clearer decisions
              become possible. We guide the process transparently — helping you
              buy with confidence and better value. Smarter buying. Together.
            </p>

            {/* FEATURE CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-2xl bg-[#EEF4FF] px-5 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
                >
                  {/* ICON */}
                  <div className="relative h-[72px] w-[72px] shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src="/images/LightGradient.svg"
                      alt="Gradient"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>

                  {/* TEXT */}
                  <div>
                    <h5 className="text-[17px] font-bold text-black">
                      {item.title}
                    </h5>
                    <p className="mt-1 text-[14px] text-[#9795B5] leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[380px] lg:h-auto">
            <Image
              src={CompanyOverviewImg}
              alt="Company Overview"
              fill
              priority
              className="object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
