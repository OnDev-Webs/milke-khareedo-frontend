import Heading from "@/components/typography/heading";

export default function MissionVision() {
  return (
    <section>
      <div className="container mx-auto flex justify-center items-center gap-7">
        <div className="flex-1 p-10 bg-white rounded-4xl shadow-[0px_0px_50px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-center items-start gap-7">
          <div className="mr-4 flex h-24 w-24 shrink-0 items-center justify-center rounded-[18px] bg-[#f2f2f8]">
            <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[#c9c4e0]"
                fill="currentColor"
            >
              <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
              <circle cx="9" cy="8" r="2" />
            </svg>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <Heading variant={"h3"} className="self-stretch justify-start text-black">
              Mission
            </Heading>
            <p className="self-stretch justify-start text-neutral-700 text-lg font-medium leading-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it ....
            </p>
          </div>
        </div>
        <div className="flex-1 p-10 bg-white rounded-4xl shadow-[0px_0px_50px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-center items-start gap-7">
          <div className="mr-4 flex h-24 w-24 shrink-0 items-center justify-center rounded-[18px] bg-[#f2f2f8]">
            <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[#c9c4e0]"
                fill="currentColor"
            >
              <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
              <circle cx="9" cy="8" r="2" />
            </svg>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <Heading variant={"h3"} className="self-stretch justify-start text-black">
              Vision
            </Heading>
            <p className="self-stretch justify-start text-neutral-700 text-lg font-medium leading-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it ....
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
