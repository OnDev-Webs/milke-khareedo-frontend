export default function PDPSections() {
  const sections = [
    {
      id: 1,
      isHighlighted: true,
      title: "Property Details",
    },
    {
      id: 2,
      isHighlighted: false,
      title: "Highlights",
    },
    {
      id: 3,
      isHighlighted: false,
      title: "Amenities",
    },
    {
      id: 4,
      isHighlighted: false,
      title: "Layout Plan",
    },
    {
      id: 5,
      isHighlighted: false,
      title: "Connectivity",
    },
    {
      id: 6,
      isHighlighted: false,
      title: "About developer",
    },
  ];
  return (
    <section id="highlighted-sections">
      <div className="container mx-auto border-b border-[#F8F8F8] flex gap-4">
        {sections.map((row, index) => (
          <div
            key={row?.id}
            className={`p-4 ${
              row?.isHighlighted
                ? "size- px-3.5 py-4 text-blue-900 text-lg font-semibold bg-gradient-to-b from-white via-indigo-50/50 to-indigo-50/80 border-b-2 border-blue-900 inline-flex justify-center items-center gap-2.5"
                : ""
            }`}
          >
            {row.title}
          </div>
        ))}
      </div>
    </section>
  );
}
