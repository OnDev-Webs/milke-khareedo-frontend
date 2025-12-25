import AboutHeroBg from "@/assets/about-us/about-hero-bg.png";
import Heading from "@/components/typography/heading";

export default function AboutHero() {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${AboutHeroBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full py-[128px]"
      >
        <div className="container mx-auto">
          <div className="self-stretch flex flex-col justify-center items-center gap-2.5">
            <div className="size- px-5 py-2.5 rounded-[70px] outline outline-1 outline-offset-[-1px] outline-[#FF765E] inline-flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-base font-medium">
                About US
              </div>
            </div>
            <Heading
              variant={"h3"}
              className="self-stretch text-center justify-start"
            >
              <span className="text-white font-bold">We make property  </span>
              <span className="text-[#FF765E] font-bold">Buying Easier.</span>
            </Heading>
            <p className="justify-start text-white text-xl font-medium leading-9">
              We bring buyers together to help you save more, negotiate better, and buy with confidence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
