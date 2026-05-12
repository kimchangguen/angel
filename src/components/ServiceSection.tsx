import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "유품 정리",
    desc: "고인이 남기신 물건을 품목별로 세심히 분류하고 정성껏 정리해드립니다.",
    accent: "bg-orange-50 text-orange-500 border-orange-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "특수 청소",
    desc: "전문 장비와 친환경 세제로 구석구석 깊이 청소해드립니다.",
    accent: "bg-sky-50 text-sky-500 border-sky-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2L9 9H2l5.5 4-2 7L12 16l6.5 4-2-7L22 9h-7z" />
      </svg>
    ),
  },
  {
    title: "폐기물 처리",
    desc: "대형 폐기물부터 일반 쓰레기까지 법적 절차에 맞게 신속히 처리합니다.",
    accent: "bg-emerald-50 text-emerald-500 border-emerald-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
  },
  {
    title: "소독 · 방역",
    desc: "악취 제거와 해충 방역으로 새로운 시작을 위한 위생적인 공간을 만듭니다.",
    accent: "bg-violet-50 text-violet-500 border-violet-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "유품 보관",
    desc: "선별된 유품을 안전하게 보관하여 유가족이 원하는 시점에 전달해드립니다.",
    accent: "bg-amber-50 text-amber-500 border-amber-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12" strokeWidth="3" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    title: "기부 연계",
    desc: "사용 가능한 물품은 필요한 이웃에게 기부 연계 서비스로 의미 있게 나눕니다.",
    accent: "bg-rose-50 text-rose-500 border-rose-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function ServiceSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 배경 이미지 — 오른쪽 장식용 */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/image/03aa.png"
          alt="서비스 배경"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 상단 장식 라인 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-24">

        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-50 text-orange-500 text-sm font-semibold px-4 py-1.5 rounded-full border border-orange-100 mb-5">
            SERVICES
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-5"
            style={{ wordBreak: "keep-all" }}
          >
            유진천사620의 전문 서비스
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto" style={{ wordBreak: "keep-all" }}>
            유가족의 마음을 헤아리며, 모든 과정을 세심하고 책임감 있게 처리합니다.
          </p>
        </div>

        {/* 서비스 카드 6개 — 3×2 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
            >
              {/* 아이콘 */}
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center ${s.accent} transition-transform duration-300 group-hover:scale-110`}>
                {s.icon}
              </div>

              {/* 텍스트 */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed" style={{ wordBreak: "keep-all" }}>
                  {s.desc}
                </p>
              </div>

              {/* 하단 장식 라인 */}
              <div className={`mt-auto h-0.5 w-8 rounded-full opacity-60 ${s.accent.split(" ")[0].replace("bg-", "bg-").replace("50", "400")}`} />
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="text-center">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          >
            📞 24시 무료 견적 상담
          </Link>
        </div>

      </div>
    </section>
  );
}
