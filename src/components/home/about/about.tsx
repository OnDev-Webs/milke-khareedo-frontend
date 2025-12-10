import CompanyOverview from "./companyOverView/companyOverview";
import Founders from "./founders/founders";
import AboutHero from "./heroAbout/heroAbout";
import MissionVision from "./missionVission/missionVission";
import RestOfTeam from "./restOfTheTeam/restOfTheTeam";
import TopDeveloperLogos from "./topDevelopers/topDevelopers";
import ValuesAchievements from "./valueAndAchievements/valuesAchievements";

export default function AboutPage() {
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
