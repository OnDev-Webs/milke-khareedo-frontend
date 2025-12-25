import CompanyOverview from "./CompanyOverview";
import Founders from "./Founders";
import MissionVision from "./MissionVission";
import TopDevelopers from "./TopDevelopers";
import ValuesAchievements from "./ValuesAchievements";
import HeroSection from "@/components/sections/HeroSection";
import AboutHeroBg from "@/assets/about-us/about-hero-bg.png";

export default function About() {
  return (
    <>
      <HeroSection
        backgroundImage={AboutHeroBg}
        badgeText="About Us"
        title="Lorem Ipsum is"
        highlightText="Simply Dummy"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        headingVariant="h3"
      />
      <CompanyOverview />
      <MissionVision />
      <ValuesAchievements />
      <TopDevelopers />
      <Founders />
    </>
  );
}
