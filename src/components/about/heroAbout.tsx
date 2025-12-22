export default function AboutHero() {
  return (
      <>
        <section className="w-full py-16 bg-[../assets/about-hero-bg.png]">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 md:flex-row">
            <div className="flex w-full justify-center md:w-1/2">
              <div className="flex h-96 w-full max-w-92 items-center justify-center rounded-4xl bg-[#f7f7fb] shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12 text-[#d4cfee]"
                  fill="currentColor"
                >
                  <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
                  <circle cx="9" cy="8" r="2" />
                </svg>
              </div>
            </div>

            <div className="w-full text-center md:w-1/2 md:text-left">
              <h2 className="text-[55px] font-semibold text-heading-primary-text">
                Body Text
              </h2>
              <p className="mt-2 text-gray-500">
                Sub Text
              </p>

              <button className="mt-6 rounded-full border border-primary-border bg-white px-10 py-3 font-semibold text-heading-primary-text shadow-sm">
                Button
              </button>
            </div>
          </div>
        </section>
      </>
  );
}