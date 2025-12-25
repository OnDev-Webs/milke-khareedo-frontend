import Heading from "@/components/typography/heading";

export default function MissionVision() {
  return (
    <section className="px-4 md:px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-stretch gap-7">
        {/* Mission Card */}
        <div className="flex-1 p-10 bg-white rounded-4xl shadow-[0px_0px_50px_0px_rgba(0,0,0,0.10)] flex flex-col gap-7 min-h-[320px]">
          <div className="flex h-24 w-24 items-center justify-center rounded-[18px] bg-[#f2f2f8]">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-[#c9c4e0]"
              fill="currentColor"
            >
              <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
              <circle cx="9" cy="8" r="2" />
            </svg>
          </div>
          <div className="flex flex-col justify-start items-start gap-3.5">
            <Heading variant={"h3"} className="text-black">
              Mission
            </Heading>
            <p className="text-[#373737] text-[18px] font-medium leading-8">
              To simplify property buying by bringing buyers together so they pay less, save more money, and get better pricing than buying alone — without confusion or pressure.
            </p>
          </div>
        </div>

        {/* Vision Card */}
        <div className="flex-1 p-10 bg-white rounded-4xl shadow-[0px_0px_50px_0px_rgba(0,0,0,0.10)] flex flex-col gap-7 min-h-[320px]">
          <div className="flex h-24 w-24 items-center justify-center rounded-[18px] bg-[#f2f2f8]">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-[#c9c4e0]"
              fill="currentColor"
            >
              <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
              <circle cx="9" cy="8" r="2" />
            </svg>
          </div>
          <div className="flex flex-col justify-start items-start gap-3.5">
            <Heading variant={"h3"} className="text-black">
              Vision
            </Heading>
            <p className="text-[#373737] text-[18px] font-medium leading-8">
              To help millions of Indians buy property at better prices by bringing buyers together and shifting power back to them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
