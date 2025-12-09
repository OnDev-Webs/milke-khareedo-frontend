import FAQSCard from "./faqsCard";

export default function FAQS() {
  const arr = [
    {
      id: 1,
      title: "Body Text",
      desciption: "Sub Text",
      img: "img link",
    },
    {
      id: 2,
      title: "Body Text",
      desciption: "Sub Text",
      img: "img link",
    },
    {
      id: 3,
      title: "Body Text",
      desciption: "Sub Text",
      img: "img link",
    },
    {
      id: 4,
      title: "Body Text",
      desciption: "Sub Text",
      img: "img link",
    },
    {
      id: 5,
      title: "Body Text",
      desciption: "Sub Text",
      img: "img link",
    },
  ];

  return (
    <section id="FAQS" className="py-25 px-30 bg-[#D9D9D9]">
      <div className="gap-12.5 flex flex-col items-center justify-center">
        <h2 className="text-[#5D5A88] font-bold text-4xl leading-12">FAQS</h2>

        <div className="flex gap-5 flex-col items-center">
          {arr?.map((i, index) => (
            <FAQSCard data={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
