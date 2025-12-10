export default function NewsCardBanner() {
  return (
    <div
      className="shadow-[0_0_10px_rgba(0,0,0,0.08)] 
    py-7.5 px-10 rounded-4xl
    "
    >
      <div className="w-300 max-w-300 rounded-4xl bg-[#FFFFFF] flex gap-5">
        <div className="w-140 h-87.5 bg-[#F9F9FF] flex items-center justify-center rounded-4xl">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-gray-400"
          >
            <path d="M21 19l-5.5-7-3.5 4.5-2.5-3L3 19z" />
            <circle cx="9" cy="8" r="2" />
          </svg>
        </div>

        <div className="space-y-5">
          <h2 className="text-[#5D5A88] font-bold text-4xl leading-8">
            Heading
          </h2>
          <p className="text-[#9795B5]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            sunt atque beatae et, quis laboriosam quidem commodi velit earum
            officiis nesciunt possimus pariatur expedita labore in quasi numquam
            praesentium voluptatem.
          </p>
          <button className="mt-6 rounded-full border border-gray-400 px-10 py-3 text-sm font-semibold text-gray-600">
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
