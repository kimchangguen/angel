"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const heroImages = [
  "/image/hero%20(1).png",
  "/image/hero%20(2).png",
  "/image/hero%20(3).png",
];

const checkItems = [
  "정성을 다한 유품 분류 및 보관",
  "신속하고 합법적인 폐기물 처리",
  "소각 및 유품 기부 연계 서비스",
  "특수 청소 및 악취/방역 관리",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 배경 이미지 크로스페이드 슬라이드쇼 */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`유진천사620 배경 이미지 ${i + 1}`}
            fill
            className="object-cover object-right md:object-center"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* 왼쪽 집중 그라디언트 오버레이 (왼쪽 → 오른쪽으로 투명해짐) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-8 bg-orange-400" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* 콘텐츠 — max-w-7xl 중앙 컨테이너 내 왼쪽 영역 */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="w-full lg:w-3/5 text-left p-8 lg:p-16">

            {/* 배지 */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-200 text-sm font-medium tracking-wide">
                유품정리 / 특수청소 전문 그룹
              </span>
            </div>

            {/* 메인 슬로건 */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-7"
              style={{ wordBreak: "keep-all" }}
            >
              고인의 아름다운 마무리,
              <br />
              남겨진 분들의 마음까지
              <br />
              잘 헤아려 정리해 드립니다.
            </h1>

            {/* 설명문 */}
            <p
              className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8"
              style={{ wordBreak: "keep-all" }}
            >
              갑작스러운 이별 뒤 막막한 유품정리, 전문가에게 맡겨주세요.
              <br className="hidden sm:block" />
              유족의 무거운 마음을 위로하며 깨끗하게 정리해 드립니다.
            </p>

            {/* 서비스 목록 — 2열 2행 그리드 */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10">
              {checkItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-100 text-sm sm:text-base">
                  <span className="leading-none">✅</span>
                  <span style={{ wordBreak: "keep-all" }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA 버튼 */}
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-full shadow-xl transition-all duration-200 hover:scale-105"
            >
              📞 24시 견적 상담
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
