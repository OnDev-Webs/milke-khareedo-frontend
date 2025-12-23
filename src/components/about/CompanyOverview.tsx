import CompanyOverviewImg from "@/assets/about-us/company-overview.png";
import Image from "next/image";
import Heading from "@/components/typography/heading";
import Title from "@/components/typography/title";

export default function CompanyOverview() {
  const features = [
    { title: "Title", desc: "Description" },
    { title: "Title", desc: "Description" },
    { title: "Title", desc: "Description" },
    { title: "Title", desc: "Description" },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto container px-4">
        <div className="flex items-center justify-center gap-12 mb-12 md:mb-20 w-fit mx-auto">
          <Title text={"Company"} drawLineText={"Overview"} isDrawLine />
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <Heading variant={"h3"} className="leading-12 text-black">
              Heading
            </Heading>

            <p className="mt-3 max-w-xl text-[18px] font-normal text-[#373737] leading-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
              hic, beatae placeat eveniet quisquam similique dolores explicabo
              sit velit nam vitae cum eum minus veritatis reiciendis voluptates
              quas commodi saepe!
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-2xl bg-[#f7f5ff] p-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebe7ff]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#c6bdf5]"
                      fill="currentColor"
                    >
                      <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                      <circle cx="9" cy="8" r="2" />
                    </svg>
                  </div>

                  <div>
                    <Heading variant={"h5"} className="text-black">
                      {item.title}
                    </Heading>
                    <p className="text-xl font-normal text-[#c6bdf5]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end rounded-[40px]">
            <Image
              src={CompanyOverviewImg}
              alt={"Company Overview Image"}
              width={585}
              height={553}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
