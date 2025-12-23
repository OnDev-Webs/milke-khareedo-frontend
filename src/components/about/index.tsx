import CompanyOverview from "./CompanyOverview";
import Founders from "./Founders";
import AboutHero from "./HeroAbout";
import MissionVision from "./MissionVission";
import TopDevelopers from "./TopDevelopers";
import ValuesAchievements from "./ValuesAchievements";

export default function About() {
  return (
    <>
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <ValuesAchievements />
      <TopDevelopers />
      <Founders />
    </>
  );
}
