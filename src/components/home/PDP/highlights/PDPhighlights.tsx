import { BadgeCheck } from "lucide-react";

const arr = [
  {
    id: 1,
    isVerified: true,
    title:
      "Indo-Japanese collaboration between Sumitomo Corporation (Japan) and Krishna Group (India)",
  },
  {
    id: 2,
    isVerified: true,
    title:
      "35-acre township with over 5000 apartments planned across 7–8 phases",
  },
  {
    id: 3,
    isVerified: true,
    title:
      "35-acre township with over 5000 apartments planned across 7–8 phases",
  },
  {
    id: 4,
    isVerified: true,
    title:
      "35-acre township with over 5000 apartments planned across 7–8 phases",
  },
];

export default function PDPHighLights() {
  return (
    <section className="">
      <div className="mx-auto container">
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="rounded-t-2xl bg-[#EEF4FF] px-6 py-4">
            <h3 className="font-semibold text-[25px]">Highlights</h3>
          </div>

          <div className="px-6 py-8">
            <div className="space-y-4">
              {arr.map((row, idx) => (
                <div key={idx} className="flex gap-4 text-sm text-gray-700">
                  <div className="rounded-lg flex items-center  gap-2.5 space-y-2.5 bg-[#EEF4FF] px-4">
                    <BadgeCheck className="fill-[#2E6B2B] text-white size-5 mt-2 " />
                    <p className="leading-relaxed">{row?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
