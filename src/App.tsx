import { InquirySection } from "./components/InquirySection";
import { useState } from "react";
import { MotionConfig } from "motion/react";
import type { Destination } from "./config";
import { NoticeDialog } from "./components/UI";
import { NoticeContext } from "./notice-context";
import {
  AboutSection,
  AnalyticsSection,
  BadgesSection,
  BridgeSection,
  CATSSection,
  CTASection,
  CVSection,
  FAQSection,
  FeaturesSection,
  Footer,
  HeroSection,
  HowItWorksSection,
  Navbar,
  PricingSection,
  ProblemSolutionSection,
  RecruiterSection,
  SkillGapSection,
  TeamSection,
} from "./components/Sections";

export default function App() {
  const [notice, setNotice] = useState<Destination | null>(null);
  return (
    <MotionConfig reducedMotion="user">
      <NoticeContext.Provider value={setNotice}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <HeroSection />
          <ProblemSolutionSection />
          <FeaturesSection />
          <CATSSection />
          <BridgeSection />
          <SkillGapSection />
          <AnalyticsSection />
          <CVSection />
          <BadgesSection />
          <RecruiterSection />
          <HowItWorksSection />
          <PricingSection />
          <AboutSection />
          <TeamSection />
          <FAQSection />
          <CTASection />
          <InquirySection />
        </main>
        <Footer />
        <NoticeDialog kind={notice} onClose={() => setNotice(null)} />
      </NoticeContext.Provider>
    </MotionConfig>
  );
}
