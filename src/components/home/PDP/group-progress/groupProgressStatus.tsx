import { PropertyDetailResponseType } from "@/lib/api";
import Image from "next/image";

export default function PDPGroupProgressStatus({
  property,
}: {
  property?: PropertyDetailResponseType | null;
}) {
  const joined = property?.groupBuy?.currentGroupMembersCount ?? 0;
  const required = property?.groupBuy?.minGroupMembers ?? 0;
  const pct = required > 0 ? Math.min(100, Math.round((joined / required) * 100)) : 0;
  const radius = 48;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <section>
      <div className="mx-auto container rounded-2xl bg-white p-6 border border-[#F3F3F3]">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <svg height={radius * 2} width={radius * 2} className="block">
              <circle
                stroke="#F1F1F4"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="#1C4692"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${radius} ${radius})`}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-semibold text-gray-900">
                {joined}/{required}
              </div>
            </div>
          </div>

          <p className="mt-1 text-center text-sm text-gray-500">
            Enjoy the ultimate deal after at least {required} people join!
          </p>
        </div>

        <div className="mt-5">
          <h4 className="text-sm font-semibold text-gray-700">
            Joined the Group
          </h4>

          <div className="mt-3 overflow-hidden pb-2">
            <div className="flex -space-x-12">
              {property?.groupBuy?.members?.map((m: any, index) => (
                <div
                  key={index}
                  className="shrink-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100" /> */}
                    <Image src={m.profilePhoto} alt={m.name} width={40} height={40} />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">
                        {m.name}
                      </span>
                      <span className="text-xs text-gray-400">{m.propertyTypeInterest}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[#1C4692]"
              style={{ width: `${pct}%` }}
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            className="w-full rounded-full border border-gray-300 bg-[#1C4692] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1c4692e6]"
            aria-label="Join Group Buy"
          >
            Join Group Buy
          </button>
        </div>
      </div>
    </section>
  );
}
