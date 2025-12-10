import AboutSection from "@/components/home/hero/about/about";
import CalculateSave from "@/components/home/hero/calculateSave/calculateSave";
import FAQS from "@/components/home/hero/faqs/faqs";
import Heading from "@/components/home/hero/heading/heading";
import Hero from "@/components/home/hero/HeroSection";
import HowItWorks from "@/components/home/hero/howItsWork/howitswork";
import IntoNews from "@/components/home/hero/intoNews/intoNews";
import CardsSection from "@/components/home/hero/PDP/pdpCards";
import Testimonials from "@/components/home/hero/testimonials/whatYourCustomerSays";

export default function Home() {
  return (
    <div>
      <Hero />
      <CardsSection />
      <AboutSection />
      <HowItWorks />
      <CalculateSave />
      <IntoNews />
      <Testimonials />
      <FAQS />
      <Heading />
    </div>
  );
}
