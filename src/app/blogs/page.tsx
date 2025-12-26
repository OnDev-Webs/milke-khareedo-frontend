import HeroSection from "@/components/sections/HeroSection";
import AboutHeroBg from "@/assets/about-us/about-hero-bg.png";
import BlogCard from "@/components/cards/BlogCard";
import BlogImg from "@/assets/blog.png";

export default function Page() {
  return (
    <>
      <HeroSection
        backgroundImage={AboutHeroBg}
        badgeText="Blog"
        title="Lorem Ipsum is"
        highlightText="Simply Dummy"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        headingVariant="h3"
      />

      {/* Blogs */}
      <section className="py-[100px]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
              <BlogCard
                key={i}
                image={BlogImg}
                date="Wed 12 Jan, 2025"
                title="Lorem Ipsum is simply dummy text"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                buttonText="Read More"
                href="/blogs/1"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
