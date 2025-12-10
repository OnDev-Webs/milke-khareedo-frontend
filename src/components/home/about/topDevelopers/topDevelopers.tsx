
export default function TopDeveloperLogos() {
  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        
        <h2 className="mb-10 text-center text-2xl font-semibold text-[#5b567a]">
          Top Developer Logos
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-2 md:flex-wrap md:justify-center">
          {[1,2,3,4,5,6].map((_, i) => (
            <div
              key={i}
              className="flex h-[110px] w-40 shrink-0 items-center justify-center rounded-3xl bg-[#f7f5ff] shadow-[0_10px_22px_rgba(0,0,0,0.04)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-[#d4cfee]"
                fill="currentColor"
              >
                <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                <circle cx="9" cy="8" r="2" />
              </svg>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}