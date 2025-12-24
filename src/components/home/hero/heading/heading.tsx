export default function Heading() {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="shadow-[0_0_10px_rgba(0,0,0,0.08)] py-10 px-6 md:px-12 rounded-4xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-[24px] md:text-[26px] font-bold text-[#000000] mb-3">
            Stay informed. Buy
            <span className="text-[#FF765E] ps-2">Smarter.</span>
          </h2>
          <p className="text-[#373737] text-[14px] md:text-[16px] font-medium">
            Get updates on group-buying deals and pricing insights that help you save more.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end">
          <div className="w-full md:w-72 h-12 bg-[#F8FCFF] rounded-xl flex items-center">
            <input
              type="text"
              placeholder="Enter Email Address"
              className="w-full h-10 md:h-10 text-[14px] md:text-[16px] px-3 rounded-full focus:outline-none  px-[30px] py-[24px] bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
