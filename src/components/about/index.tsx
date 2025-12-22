import CompanyOverview from "./companyOverview";
import Founders from "./founders";
import AboutHero from "./heroAbout";
import MissionVision from "./missionVission";
import RestOfTeam from "./restOfTheTeam";
import TopDeveloperLogos from "./topDevelopers";
import ValuesAchievements from "./valuesAchievements";

export default function About() {
  return (
    <>
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <ValuesAchievements />
      <TopDeveloperLogos />
      <Founders />
      <RestOfTeam />
    </>
  );
}
