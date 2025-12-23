import Title from "@/components/typography/title";
import FacebookIcon from "@/components/icons/FacebookIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import FounderCard from "@/components/about/FounderCard";

const teams = [
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

export default function RestOfTeam() {
  return (
    <div className="py-[50px]">
      <Title
        text="Rest Of The"
        isDrawLine
        drawLineText={"Team"}
        className="text-center mb-12 md:mb-20"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {teams.map((member, i) => (
          <FounderCard key={i} founder={member} />
        ))}
      </div>
    </div>
  );
}
