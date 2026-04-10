import HeroSection from "@/components/HeroSection";
import KitsPricingSection from "@/components/KitsPricingSection";
import AuthoritySection from "@/components/AuthoritySection";
import UseCasesSection from "@/components/UseCasesSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <KitsPricingSection />
      <AuthoritySection />
      <UseCasesSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
};

export default Index;
