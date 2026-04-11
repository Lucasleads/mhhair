import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HookVslSection from "@/components/HookVslSection";
import NewMechanismSection from "@/components/NewMechanismSection";
import KitsPricingSection from "@/components/KitsPricingSection";
import UseCasesSection from "@/components/UseCasesSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HookVslSection />
      <NewMechanismSection />
      <KitsPricingSection />
      <UseCasesSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
};

export default Index;
