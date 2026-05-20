import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ServiceSection from "@/components/ServiceSection";
import CaseSection from "@/components/CaseSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";

export const revalidate = 0; // 매 요청마다 실시간 렌더링 (SSR)

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
