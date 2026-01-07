import Title from "@/components/typography/title";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import AboutHeroBg from "@/assets/about-us/about-hero-bg.png";
import HeroSection from "@/components/sections/HeroSection";
import ContactForm from "@/components/home/contact-us/ContactForm";

const contactMethods = [
  {
    type: "normal",
    icon: "/images/Frame1.png",
    title: "What We Help With",
    desc: "Help with apartments, villas, and plots — from shortlisting to better group pricing.",
  },

  {
    type: "contact",
    icon: "/images/Frame2.png",
    title: "How to Reach Us",
    details: [
      {
        icon: <Phone size={18} />,
        value: "+91 XXXXXXXXXX",
      },
      {
        icon: <Mail size={18} />,
        value: "support@milkekhereedo.com",
      },
    ],
  },

  {
    type: "normal",
    icon: "/images/Frame3.png",
    title: "Where We Are",
    desc: "Tk Residency , Friends Colony Rd, Friends Colony, Indira Nagar Colony, Miyapur, Hyderabad, Telangana 500049",
  },
];

export default function ConnectWithUs() {
  return (
    <>
      <HeroSection
        backgroundImage={AboutHeroBg}
        badgeText="Contact Us"
        title="Talk to us. Buy smarter."
        highlightText="Save more."
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        headingVariant="h3"
      />
      <section className="w-full bg-white py-16">
        <div className="mx-auto container sm:px-0 px-4">
          {/* Title */}
          <div className="flex justify-center mb-6 md:mb-20">
            <Title text="Company" isDrawLine drawLineText="Overview" />
          </div>

          {/* Top cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            {contactMethods.map((item, index) => (
              <div
                key={index}
                className="bg-[#EEF4FF] p-6 rounded-2xl md:w-[32%]"
              >
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden">
                  <Image
                    src="/images/LightGradient.svg"
                    alt="LightGradient"
                    width={80}
                    height={48}
                    className="absolute inset-0 object-contain"
                  />
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    className="relative z-10 object-contain"
                  />
                </div>

                <p className="font-bold text-black text-xl mt-2">
                  {item.title}
                </p>

                {item.type === "normal" && (
                  <p className="text-[#514F6F] mt-2 text-[14.5px]">
                    {item.desc}
                  </p>
                )}

                {item.type === "contact" && (
                  <div className="mt-2">
                    {item.details?.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-[#514F6F]"
                      >
                        <div className="h-8 w-8 rounded-full flex items-center justify-center">
                          {d.icon}
                        </div>
                        <span className="text-sm font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form + Image */}
          <div className="flex flex-col-reverse md:flex-row gap-8 items-stretch">
            {/* LEFT – FORM */}
            <div className="md:w-1/2 flex">
              <div className="w-full bg-white p-6 rounded-[28px] border border-[#DDDDDD] flex flex-col justify-center">
                <h3 className="font-bold text-black text-[28px] mb-2 text-left">
                  Let’s find the right deal for you
                </h3>
                <p className="text-[#373737] font-medium text-[16px] mb-6 text-left">
                  Fill out the form, and we’ll reach out within 24 hours.
                </p>

                <ContactForm />
              </div>
            </div>
            {/* RIGHT – IMAGE */}
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="relative w-full h-[260px] sm:h-80 md:h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/contact.jpg"
                  alt="Contact"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
