type Member = { id: string; name: string; meta?: string };

const members: Member[] = [
  { id: "1", name: "Ayush Jos", meta: "2 Bhk" },
  { id: "2", name: "Ayush Jos", meta: "2 Bhk" },
  { id: "3", name: "Ayush Jos", meta: "2 Bhk" },
  { id: "4", name: "Ayush Jos", meta: "2 Bhk" },
];

export default function PDPGroupProgressStatus({
  joined = 5,
  required = 10,
}: {
  joined?: number;
  required?: number;
}) {
  const pct = Math.min(100, Math.round((joined / required) * 100));
  const radius = 48;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <section className="">
      <div className="mx-auto max-w-95 rounded-2xl bg-white p-6 border border-primary">
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
                stroke="#111827"
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
              {members.map((m) => (
                <div
                  key={m.id}
                  className="shrink-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">
                        {m.name}
                      </span>
                      <span className="text-xs text-gray-400">{m.meta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-gray-800"
              style={{ width: `${pct}%` }}
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            className="w-full rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            aria-label="Join Group Buy"
          >
            Join Group Buy
          </button>
        </div>
      </div>
    </section>
  );
}
