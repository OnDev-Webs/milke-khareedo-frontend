import AboutSection from "@/components/home/hero/about/about";
import CalculateSave from "@/components/home/hero/calculateSave/calculateSave";
import FAQS from "@/components/home/hero/faqs/faqs";
import Heading from "@/components/home/hero/heading/heading";
import Hero from "@/components/home/hero/HeroSection";
import HowItWorks from "@/components/home/hero/howItsWork/howitswork";
import CardsSection from "@/components/home/hero/PDP/pdpCards";
import Testimonials from "@/components/home/hero/testimonials/whatYourCustomerSays";
import FooterSection from "@/components/home/layout/footer";
import Header from "@/components/home/layout/header";

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <CardsSection/>
      <AboutSection/>
      <HowItWorks/>
      <CalculateSave/>
      <Testimonials/>
      <FAQS/>
      <Heading/>
      <FooterSection/>
    </div>
  );
}
