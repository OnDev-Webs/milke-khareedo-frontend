import logo from "@/assets/Image icon.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function PDPGallery() {
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
            <div className="bg-secondary flex items-center justify-center h-80 rounded-[18px] p-6 shadow-[0_0_10px_rgba(0,0,0,0.08)] ">
              <img src={logo.src} alt="dummy" />
            </div>

            <div className="h-80 grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 shadow-[0_0_10px_rgba(0,0,0,0.08)] bg-secondary flex items-center justify-center">
                <img src={logo.src} alt="dummy" />
              </div>

              <div className="rounded-xl p-4 shadow-[0_0_10px_rgba(0,0,0,0.08)] bg-secondary flex items-center justify-center">
                <img src={logo.src} alt="dummy" />
              </div>

              <div className="rounded-xl p-4 shadow-[0_0_10px_rgba(0,0,0,0.08)] bg-secondary flex items-center justify-center">
                <img src={logo.src} alt="dummy" />
              </div>

              <div className="relative rounded-xl p-4 shadow-[0_0_10px_rgba(0,0,0,0.08)] bg-secondary flex items-center justify-center">
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
