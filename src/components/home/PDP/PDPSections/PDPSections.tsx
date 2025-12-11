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
      <div className=" w-300 mx-auto border-b border-primary flex gap-4">
        {sections.map((row, index) => (
          <div
            key={row?.id}
            className={`p-4 ${
              row?.isHighlighted
                ? "font-semibold text-lg border-b bg-linear-to-t from-[#9D9D9D]/50 via-transparent via-40% to-transparent"
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
