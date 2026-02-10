import Title from "@/components/typography/title";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

export default function TopDevelopers() {
  return (
    <section className="w-full bg-white py-14">
      <div className="px-4">
        <Title
          text={"Top"}
          isDrawLine
          drawLineText={"Developer Logos"}
          className="text-center mb-12 md:mb-20"
        />

        <Marquee>
          {[
            { src: "/images/auro-logo.png", alt: "Auro Logo" },
            { src: "/images/brigade-logo_horizontal-2048px.png", alt: "Brigade Logo" },
            { src: "/images/Candeur-logo-new.png", alt: "Candeur Logo" },
            { src: "/images/Godrej.png", alt: "Godrej Logo" },
          ].map((logo, index) => (
            <div
              key={index}
              className="flex px-[42px] py-[84px] shrink-0 items-center justify-center rounded-3xl bg-[#F9F9FF]"
            >
              <Image src={logo.src} alt={logo.alt} width={216} height={52} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
