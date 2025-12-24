import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties }: { properties: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p) => (
        <PropertyCard key={p.id} {...p} />
      ))}
    </div>
  );
}
