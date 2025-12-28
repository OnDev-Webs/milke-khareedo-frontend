import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found relative w-full flex flex-col items-center justify-center h-[calc(100vh-20vh)] py-[100px]">
      <div className="container mx-auto">
        <div className="w-full max-w-[541px] mx-auto flex flex-col items-center justify-center">
          <h2 className="text-black text-[70px] sm:text-[100px] md:text-[200px] font-bold leading-normal">
            404
          </h2>
          <p className="text-[#555555] text-[28px] font-medium">
            We couldn't find the page.
          </p>
          <Link
            href="/"
            className="bg-[#1C4692] hover:bg-[#1c4692e6] text-white rounded-[110] text-base font-semibold mt-[50px] w-full text-center py-[13px]"
          >
            Go Back
          </Link>
        </div>
      </div>
    </section>
  );
}
