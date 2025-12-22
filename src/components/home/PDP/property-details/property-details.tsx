export default function PDPPropertyDetails() {
  return (
    <section className="">
      <div className="mx-auto max-w-198 rounded-2xl bg-white shadow-sm">
        <div className="rounded-t-2xl bg-gray-200/80 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Property Details
          </h3>
        </div>

        <div className="px-6 py-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Units</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  720 Units
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Carpet Area</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  1740–2645 Sq.Ft.
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Possession Date</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  October–2028
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l md:border-r md:border-gray-100 md:px-6">
              <div>
                <p className="text-xs text-gray-500">Configuration</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  2 BHK, 3 BHK, 4 BHK
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">RERA ID</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  GYUG2365/165/2024/26
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Developer</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  Khusi Corporation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Possession Status</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  Under Construction
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Project Area (in acre)</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  10 Acre
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <p className="text-sm leading-relaxed text-gray-700">
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections of more detailed
              descriptive information about the property, amenities, legal
              status and other buyer-facing notes would go here. Replace this
              with the real property description.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
