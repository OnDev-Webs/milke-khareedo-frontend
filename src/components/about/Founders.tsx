import FounderBG from "@/assets/about-us/founders_bg.png";
import Title from "@/components/typography/title";
import FacebookIcon from "@/components/icons/FacebookIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import RestOfTeam from "@/components/about/RestOfTheTeam";
import FounderCard from "@/components/about/FounderCard";

const founders = [
  {
    name: "User Name",
    role: "Co-Founder",
    desc: "description description description description description description description",
    social: [
      {
        icon: FacebookIcon,
        link: "#",
      },
      {
        icon: TwitterIcon,
        link: "#",
      },
      {
        icon: InstagramIcon,
        link: "#",
      },
      {
        icon: LinkedinIcon,
        link: "#",
      },
    ],
  },
  {
    name: "User Name",
    role: "Co-Founder",
    desc: "description description description description description description description",
    social: [
      {
        icon: FacebookIcon,
        link: "#",
      },
      {
        icon: TwitterIcon,
        link: "#",
      },
      {
        icon: InstagramIcon,
        link: "#",
      },
      {
        icon: LinkedinIcon,
        link: "#",
      },
    ],
  },
];

export default function Founders() {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${FounderBG.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full bg-[#F8F8F8] py-16"
      >
        <div className="mx-auto container px-4">
          <Title
            text={"Team"}
            drawLineText={"Founders"}
            isDrawLine
            className="text-center mb-12 md:mb-20"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {founders.map((founder, i) => (
              <FounderCard key={i} founder={founder} />
            ))}
          </div>

          <RestOfTeam />
        </div>
      </section>
    </>
  );
}
