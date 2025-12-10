import NewsCard from "./newsCard";
import NewsCardBanner from "./newsCardBanner";

export default function IntoNews() {
  return (
    <section className="py-25 px-30">
     <div className="w-300">
       <h2 className="mb-12.5 font-bold text-4xl leading-12 text-[#5D5A88] text-center">
        MK into the News
      </h2>
      <div>
        <NewsCardBanner />

        <div className="flex justify-between pt-5">
          <NewsCard />
          <NewsCard />
        </div>
      </div>
     </div>
    </section>
  );
}
