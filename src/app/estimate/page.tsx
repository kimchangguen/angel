import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const url = `${SITE.url}/estimate`;

export const metadata: Metadata = {
  title: "원주 유품정리·특수청소 24시간 무료 견적 상담",
  description: "원주와 전국 유품정리·특수청소 현장을 사진 또는 방문으로 상담합니다. 작업 범위와 비용을 투명하게 안내받고 24시간 전화로 빠르게 문의하세요.",
  alternates: { canonical: url },
  openGraph: { type: "website", url, title: "원주 유품정리·특수청소 무료 견적 | 유진천사620", description: "현장 상태와 작업 범위를 확인해 투명한 견적을 안내합니다. 24시간 전화 상담이 가능합니다.", images: [{ url: SITE.image, alt: "유진천사620 견적 상담" }] },
  twitter: { card: "summary_large_image", title: "원주 유품정리·특수청소 무료 견적 | 유진천사620", description: "현장 상태와 작업 범위를 확인해 투명한 견적을 안내합니다.", images: [SITE.image] },
};

export default function EstimatePage() {
  return (
    <main className="bg-[#FAF8F5] px-6 py-20">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "ContactPage", "@id": `${url}#webpage`, url, name: "유품정리·특수청소 견적 상담", description: "유진천사620 24시간 견적 상담", isPartOf: { "@id": `${SITE.url}/#website` } },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE.url }, { "@type": "ListItem", position: 2, name: "견적 상담", item: url }] },
      ] }} />
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-14">
        <p className="mb-3 text-sm font-semibold text-orange-500">24시간 · 연중무휴</p>
        <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">유품정리·특수청소 무료 견적 상담</h1>
        <p className="mx-auto mt-6 max-w-2xl leading-7 text-stone-600">현장 위치, 평수, 폐기물 양과 오염 상태를 알려주시면 가견적을 안내합니다. 정확한 비용은 현장을 확인한 뒤 작업 전에 투명하게 설명드립니다.</p>
        <a href={`tel:${SITE.phoneDisplay.replace(/-/g, "")}`} className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-lg font-bold text-white hover:bg-orange-600">전화 상담 {SITE.phoneDisplay}</a>
        <address className="mt-8 not-italic text-sm leading-6 text-stone-500">유진천사620 · 강원특별자치도 원주시 지정면 가곡리 1445-6<br />{SITE.email}</address>
      </div>
    </main>
  );
}
