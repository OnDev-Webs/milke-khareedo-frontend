import CompanyOverviewImg from "@/assets/about-us/company-overview.png";
import Title from "@/components/typography/title";
import Image from "next/image";
import Heading from "@/components/typography/heading";

const items = [
  {
    id: 1,
    img: CompanyOverviewImg,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 2,
    img: CompanyOverviewImg,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 3,
    img: CompanyOverviewImg,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 4,
    img: CompanyOverviewImg,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 5,
    img: CompanyOverviewImg,
    title: "Heading",
    desc: "description description description description description description description",
  },
  {
    id: 6,
    img: CompanyOverviewImg,
    title: "Heading",
    desc: "description description description description description description description",
  },
];

export default function ValuesAchievements() {
  return (
    <section className="w-full bg-[#FFF9F6] py-16 mt-[100px]">
      <div className="mx-auto container px-4">
        <Title
          text={"Values"}
          drawLineText={"Achievements"}
          isDrawLine
          className="text-center mb-12 md:mb-20"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-stretch rounded-3xl bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)] gap-5"
            >
              <Image
                src={item.img}
                alt={"achievement image"}
                width={168}
                height={183}
              />

              <div className="flex flex-col justify-center">
                <Heading variant={"h6"} className="text-black font-bold">
                  {item.title}
                </Heading>
                <p className="mt-2 text-base font-normal text-[#373737]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
