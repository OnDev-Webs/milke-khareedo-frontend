import { type PropertyDetail } from "@/lib/api/services/home.service";

interface PDPPropertyDetailsProps {
  property: PropertyDetail;
}

export default function PDPPropertyDetails({ property }: PDPPropertyDetailsProps) {
  return (
    <section className="">
      <div className="mx-auto container rounded-2xl bg-white shadow-sm">
        <div className="rounded-t-2xl bg-[#EEF4FF] px-6 py-4">
          <h3 className="text-[25px] font-semibold text-gray-800">
            Property Details
          </h3>
        </div>

        <div className="px-6 py-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Units</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.overview.units} Units
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Carpet Area</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.overview.areaRange.formatted}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Possession Date</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.overview.possessionDateFormatted}
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l md:border-r md:border-gray-100 md:px-6">
              <div>
                <p className="text-xs text-gray-500">Configuration</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.overview.configurationsFormatted}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">RERA ID</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.reraId || property.overview.reraNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Developer</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.developer.name}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Possession Status</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.overview.possessionStatus}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Project Area (in acre)</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {property.projectSize}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <p className="text-xs text-gray-500">Description</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-1">
              {property.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
