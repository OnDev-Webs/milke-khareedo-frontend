import { BadgeCheck } from "lucide-react";
import type { PropertyDetailResponseType } from "@/lib/api/services/home.service";

export default function PDPHighLights({ property }: { property?: PropertyDetailResponseType | null }) {
  return (
    <section>
      <div className="mx-auto container">
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="rounded-t-2xl bg-[#EEF4FF] px-6 py-4">
            <h3 className="font-semibold text-[25px]">Highlights</h3>
          </div>

          <div className="px-6 py-8">
            <div className="space-y-4">
              {property?.highlights?.map(
                (title, idx) => (
                  <div key={idx} className="flex gap-4 text-sm text-gray-700">
                    <div className="rounded-lg flex items-center  gap-2.5 space-y-2.5 bg-[#EEF4FF] w-full px-4">
                      <BadgeCheck className="fill-[#2E6B2B] text-white size-5 mt-2 " />
                      <p className="leading-relaxed">{title}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
