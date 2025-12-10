const team = [
  { name: "User Name", role: "Sub Text", items: [1, 2, 3, 4, 5, 6] },
  { name: "User Name", role: "Sub Text", items: [1, 2, 3, 4, 5, 6] },
  { name: "User Name", role: "Sub Text", items: [1, 2, 3, 4, 5, 6] },
  { name: "User Name", role: "Sub Text", items: [1, 2, 3, 4, 5, 6] },
  { name: "User Name", role: "Sub Text", items: [1, 2, 3, 4, 5, 6] },
  { name: "User Name", role: "Sub Text", items: [1, 2, 3, 4, 5, 6] },
];

export default function RestOfTeam() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-2xl font-semibold text-[#5b567a]">
          Rest of the Team
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-6 flex h-56 w-full items-center justify-center rounded-xl bg-[#f7f5ff]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10 text-[#d4cfee]"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>

              <p className="font-semibold text-[#5b567a]">{member.name}</p>
              <p className="mt-1 text-gray-400">{member.role}</p>

              <div className="mt-5 flex gap-2">
                {member?.items?.map((a) => (
                  <div
                    key={a}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eff7]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-white"
                      fill="currentColor"
                    >
                      <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                      <circle cx="9" cy="8" r="2" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
