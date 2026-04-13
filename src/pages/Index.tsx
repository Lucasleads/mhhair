import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HookVslSection from "@/components/HookVslSection";
import NewMechanismSection from "@/components/NewMechanismSection";
import KitsPricingSection from "@/components/KitsPricingSection";
import PerformanceSection from "@/components/PerformanceSection";
import UseCasesSection from "@/components/UseCasesSection";
import OlfactiveConnectionSection from "@/components/OlfactiveConnectionSection";
import SocialProofSection from "@/components/SocialProofSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HookVslSection />
      <NewMechanismSection />
      <KitsPricingSection />
      <PerformanceSection />
      <UseCasesSection />
      <OlfactiveConnectionSection />
      <SocialProofSection />
      <GuaranteeSection />
      <FaqSection />
      <FinalCtaSection />
      <SupportSection />
      <Footer />
    </main>
  );
};

export default Index;
