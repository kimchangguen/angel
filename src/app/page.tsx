import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ServiceSection from "@/components/ServiceSection";
import CaseSection from "@/components/CaseSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/JsonLd";
import { FAQ_ITEMS, SITE } from "@/lib/site";

export const revalidate = 0; // 매 요청마다 실시간 렌더링 (SSR)

export default function Home() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "WebPage", "@id": `${SITE.url}/#webpage`, url: SITE.url, name: "원주 유품정리·특수청소 전문업체", description: SITE.description, inLanguage: "ko-KR", isPartOf: { "@id": `${SITE.url}/#website` } },
        { "@type": "Service", "@id": `${SITE.url}/#service`, name: "유품정리·특수청소 서비스", serviceType: ["유품정리", "특수청소", "폐기물 처리", "악취 제거", "방역"], provider: { "@id": `${SITE.url}/#localbusiness` }, areaServed: SITE.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })) },
        { "@type": "FAQPage", "@id": `${SITE.url}/#faq`, mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      ] }} />
      <Hero />
      <ProblemSection />
      <ServiceSection />
      <CaseSection />
      <ProcessSection />
      <FAQSection />
    </>
  );
}
