import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ServiceSection from "@/components/ServiceSection";
import CaseSection from "@/components/CaseSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";

export const revalidate = 3600; // ISR validation time in seconds (1 hour)

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ServiceSection />
      <CaseSection />
      <ProcessSection />
      <FAQSection />
    </>
  );
}
