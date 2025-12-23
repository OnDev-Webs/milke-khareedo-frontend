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
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="flex px-[42px] py-[84px] shrink-0 items-center justify-center rounded-3xl bg-[#f7f5ff] shadow-[0_10px_22px_rgba(0,0,0,0.04)]"
            >
              <Image src={Logo} alt={"logo"} width={216} height={52} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
