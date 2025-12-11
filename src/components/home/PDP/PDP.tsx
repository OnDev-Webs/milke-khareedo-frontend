import PDPAboutDeveloper from "./about-developer/aboutDeveloper";
import PDPAmenities from "./aminities/PDPAmenities";
import PDPGallery from "./gallery/PDPGallery";
import PDPGroupProgressStatus from "./group-progress/groupProgressStatus";
import PDPHighLights from "./highlights/PDPhighlights";
import PDPLayoutPlan from "./layoutPlan/layoutPlan";
import PDPNeighborhood from "./neighborhood/PDPNeighborhood";
import PDPHeader from "./PDPHeader/PDPHeader";
import PDPSections from "./PDPSections/PDPSections";
import PDPSupport from "./PDPSupport/PDPSupport";
import PDPPropertyDetails from "./property-details/property-details";
import PDPSimilarProjects from "./similar-projects/similarProjects";

export default function PDP() {
  return (
    <>
      <PDPGallery />
      <PDPHeader />
      <PDPSections />

      <div className="flex w-300 mx-auto py-6 gap-5">
        <div className="flex flex-col gap-4">
          <PDPPropertyDetails />
          <PDPHighLights />
        </div>
        <div className="flex flex-col justify-between gap-4 ">
          <PDPGroupProgressStatus />
          <PDPSupport />
        </div>
      </div>

      <PDPAmenities />
      <PDPLayoutPlan />
      <PDPNeighborhood />
      <PDPAboutDeveloper />
      <PDPSimilarProjects />
    </>
  );
}
