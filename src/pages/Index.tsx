import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import BenefitsSection from "@/components/home/BenefitsSection";
import ResultsSection from "@/components/home/ResultsSection";
import IngredientsSection from "@/components/home/IngredientsSection";
import RoutineSection from "@/components/home/RoutineSection";
import ProductShowcaseSection from "@/components/home/ProductShowcaseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EmailCapture from "@/components/home/EmailCapture";

const Index = () => (
  <main className="pb-24 md:pb-0">
    <HeroSection />
    <TrustBadges />
    <BenefitsSection />
    <ResultsSection />
    <IngredientsSection />
    <RoutineSection />
    <ProductShowcaseSection />
    <TestimonialsSection />
    <EmailCapture />
  </main>
);

export default Index;
