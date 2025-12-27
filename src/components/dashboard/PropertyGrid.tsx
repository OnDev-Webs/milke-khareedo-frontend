import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties }: { properties: any[] }) {
  return (
    <>
      <div className="sm:hidden -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
          {properties.map((property) => (
             <div
              key={property.id}
              className="
                snap-start
                shrink-0
                w-[90vw]        
                max-w-[360px]
              "
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </>
  );
}
