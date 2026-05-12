"use client";

import { useEffect, useRef, useState, Fragment } from "react";

const steps = [
  {
    num: "01",
    title: "전화/온라인 문의",
    desc: "상담을 통해\n기본 정도를 확인합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41C1.6 2.67 2 2 2.72 2H5.72a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 9.71a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "무료 방문 견적",
    desc: "전문가가 직접 방문하여\n정확한 견적을 제공합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "유품 분류 및 정리",
    desc: "유품을 분류하고\n필요한 물품을 정리합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "폐기물 처리 및 청소",
    desc: "폐기물을 합법적으로 처리하고\n공간을 깨끗이 청소합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "최종 검수 및 결제",
    desc: "고객과 함께 최종 검수 후\n결제를 진행합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F5F0E8] py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-5">
            진행하시려면
          </h2>
          <p className="text-gray-500 text-lg">
            체계적인 5단계 과정으로 안심하고 맡기실 수 있습니다.
          </p>
        </div>

        {/* 단계 목록 — 번호+아이콘+텍스트를 하나의 열 단위로 묶어 스태거 애니메이션 */}
        <div className="flex items-start">
          {steps.map((step, i) => {
            // 오른쪽(05)부터 먼저 나타나도록: 인덱스가 클수록 delay 짧게
            const delay = (steps.length - 1 - i) * 130;

            return (
              <Fragment key={step.num}>
                {/* 단계 열 */}
                <div
                  className="flex-1 flex flex-col items-center text-center"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(90px)",
                    transition: "opacity 0.55s ease, transform 0.55s ease",
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {/* 번호 원 */}
                  <div className="w-14 h-14 rounded-full bg-[#5C6A3E] text-white font-bold text-xl flex items-center justify-center mb-10 z-10 relative">
                    {step.num}
                  </div>

                  {/* 아이콘 원 */}
                  <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-6 text-[#5C6A3E]">
                    {step.icon}
                  </div>

                  {/* 제목 */}
                  <h3 className="font-bold text-gray-800 text-base mb-3 leading-snug" style={{ wordBreak: "keep-all" }}>
                    {step.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                    {step.desc}
                  </p>
                </div>

                {/* 화살표 — 번호 원 높이 중앙에 위치 (pt: (56-22)/2 = 17px) */}
                {i < steps.length - 1 && (
                  <div
                    className="flex-none flex items-start pt-[17px] text-[#8B9C6C]"
                    style={{
                      opacity: visible ? 0.7 : 0,
                      transition: "opacity 0.4s ease",
                      transitionDelay: `${delay + 80}ms`,
                    }}
                  >
                    <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
                      <line x1="0" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                      <path d="M20 5l8 6-8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
