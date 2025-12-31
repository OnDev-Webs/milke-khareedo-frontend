import logo from "@/assets/Image icon.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PropertyDetailResponseType } from "@/lib/api";

export default function PDPGallery({ property }: { property?: PropertyDetailResponseType | null }) {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto container max-md:px-4">

        <Breadcrumb className="mb-[30px]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-[18px]">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#1C4692] text-[18px]">Properties</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative">
          <div className="grid gap-4 grid-cols-2 rounded-3xl">
              <img src={(property?.imageDetails?.main ?? property?.image) || logo.src} alt={property?.projectName || "image"} className="rounded-4xl" />

            <div className="h-80 grid grid-cols-2 gap-4">
                <img src={property?.imageDetails?.thumbnails?.[0] ?? property?.images?.[0] ?? logo.src} alt={property?.projectName || "thumb"} className="rounded-4xl" />

                <img src={property?.imageDetails?.thumbnails?.[1] ?? property?.images?.[1] ?? logo.src} alt={property?.projectName || "thumb"} className="rounded-4xl" />

                <img src={property?.images?.[2] ?? logo.src} alt={property?.projectName || "thumb"} className="rounded-4xl" />
              <div className="relative rounded-xl p-4 bg-secondary flex items-center justify-center">
                <img src={logo.src} alt="dummy" />
                <button className="absolute bottom-2 rounded-full border border-gray-300 bg-white px-10 py-1 text-sm font-medium shadow-sm">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
