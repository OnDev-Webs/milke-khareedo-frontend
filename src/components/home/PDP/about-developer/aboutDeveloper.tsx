export default function PDPAboutDeveloper() {
  return (
    <section className="w-full px-4 py-6">
      <div className="mx-auto container rounded-2xl bg-white shadow-sm">
        <div className="rounded-t-2xl bg-gray-200/80 px-6 py-3">
          <h3 className="font-semibold text-3xl">About Developer</h3>
        </div>

        <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-start">
          <div className="md:flex-1">
            <div className="mb-3">
              <div className="text-3xl font-bold text-heading-primary-text">
                Logo
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type ...
            </p>
          </div>

          <div className=" flex w-full flex-col items-start gap-4 md:w-1/3 md:items-end">
            <div className="flex gap-12">
              <div className="flex flex-col gap-2.5 items-center justify-center w-30">
                <div className=" w-22 p-6.5 flex justify-center items-center gap-2 rounded-full bg-[#f3f2f7]  shadow-sm ">
                  <span className="text-3xl text-center font-bold text-gray-800">
                    6+
                  </span>
                </div>
                <span className="text-xl font-bold text-center">
                  Years of Experience
                </span>
              </div>

              <div className="flex flex-col gap-2.5 items-center justify-center  w-30">
                <div className=" w-22 p-6.5 flex justify-center items-center gap-2 rounded-full bg-[#f3f2f7]  shadow-sm ">
                  <span className="text-3xl text-center font-bold text-gray-800">
                    2+
                  </span>
                </div>
                <span className="text-xl font-bold text-center">
                  Total projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
