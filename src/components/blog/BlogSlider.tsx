"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WPPost, getFeaturedImage, stripHtml, decodeHtmlEntities, formatDate } from "@/lib/wordpress";

interface SliderPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

const MOCK_SLIDER_POSTS: SliderPost[] = [
  {
    id: 1,
    title: "유품정리 전 꼭 확인해야 할 3가지 필수 절차와 주의사항",
    excerpt: "안녕하세요. 유품정리 전문 브랜드 유진천사620입니다. 고인의 소중한 흔적을 정리하는 유품정리는 단순한 청소와 달리 신중하고 경건하게 진행되어야 합니다. 처분해야 할 품목과 보관할 품목을 분류하는 방법부터...",
    date: "2026년 5월 20일",
    image: "/image/hero (1).png",
    category: "유품정리",
    slug: "test",
  },
  {
    id: 2,
    title: "화재 현장 및 악취 제거를 위한 특수청소 전문 장비와 정화 과정",
    excerpt: "안녕하세요. 특수청소 전문 유진천사620입니다. 일반적인 청소 방법으로는 해결되지 않는 미세 오염물질, 잔류 냄새, 악취의 근본적 원인을 파악하여 정화하고 살균 소독하는 전문 공정을 상세히 소개해 드립니다.",
    date: "2026년 5월 19일",
    image: "/image/hero (2).png",
    category: "특수청소",
    slug: "test-3",
  },
  {
    id: 3,
    title: "고독사 청소 및 유품 정리업체 선정 시 반드시 비교해야 할 체크리스트",
    excerpt: "유품정리 및 특수청소 업체를 선택할 때 비용 외에도 정식 등록 업체인지, 소독 인증서를 발급해 줄 수 있는지 등을 상세히 비교하셔야 합니다. 합리적 비용과 신뢰할 수 있는 서비스를 선택하기 위한 가이드입니다.",
    date: "2026년 5월 18일",
    image: "/image/hero (3).png",
    category: "유용한정보",
    slug: "test-2",
  },
];

interface BlogSliderProps {
  posts?: WPPost[];
}

export default function BlogSlider({ posts = [] }: BlogSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Map real WPPosts to SliderPost structure
  const displayPosts: SliderPost[] = posts.length > 0 
    ? posts.slice(0, 5).map((post) => ({
        id: post.id,
        title: decodeHtmlEntities(post.title.rendered),
        excerpt: decodeHtmlEntities(stripHtml(post.excerpt.rendered)),
        date: formatDate(post.date),
        image: getFeaturedImage(post) || "/image/hero (1).png",
        category: post.categories?.[0]?.name || "추천 글",
        slug: post.slug,
      }))
    : MOCK_SLIDER_POSTS;

  useEffect(() => {
    if (displayPosts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % displayPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayPosts.length]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? displayPosts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % displayPosts.length);
  };

  if (displayPosts.length === 0) return null;

  const activePost = displayPosts[currentIdx];

  return (
    <div className="relative w-full h-[380px] md:h-[480px] rounded-lg overflow-hidden shadow-md group border border-stone-200 bg-white">
      {/* Slides */}
      {displayPosts.map((post, index) => (
        <div
          key={post.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIdx
              ? "opacity-100 z-10 visible"
              : "opacity-0 z-0 invisible pointer-events-none"
          }`}
        >
          {/* Link to post detail page */}
          <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-20 cursor-pointer block">
            {/* Background Image */}
            <div className="absolute inset-0 bg-stone-900/40 z-10 hover:bg-stone-900/30 transition-colors duration-300" />
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority={index === 0}
              sizes="(max-w-1200px) 100vw, 1200px"
              className="object-cover transform scale-100 group-hover:scale-102 transition-transform duration-7000 ease-out"
            />

            {/* Tag */}
            <div className="absolute top-6 left-6 z-30">
              <span className="bg-white/95 text-stone-800 text-[11px] font-semibold px-3 py-1.5 rounded shadow-sm border border-stone-100">
                추천 글
              </span>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-30 text-white flex flex-col justify-end bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent pt-32">
              <span className="text-xs md:text-sm font-semibold text-orange-400 mb-2">
                {post.category}
              </span>
              <h2 className="text-xl md:text-3xl font-bold mb-3 leading-tight tracking-tight max-w-3xl drop-shadow-sm font-[family-name:var(--font-noto-sans-kr)]">
                {post.title}
              </h2>
              <p className="text-stone-200 text-xs md:text-sm mb-4 max-w-2xl line-clamp-2 font-light leading-relaxed">
                {post.excerpt}
              </p>
              <span className="text-[11px] md:text-xs text-stone-300 font-light">
                {post.date}
              </span>
            </div>
          </Link>
        </div>
      ))}

      {/* Navigation Arrows */}
      {displayPosts.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded bg-white/90 text-stone-700 flex items-center justify-center hover:bg-white active:bg-stone-50 transition-colors shadow hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            aria-label="이전 추천 글"
          >
            <span className="text-lg font-bold">&lt;</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded bg-white/90 text-stone-700 flex items-center justify-center hover:bg-white active:bg-stone-50 transition-colors shadow hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            aria-label="다음 추천 글"
          >
            <span className="text-lg font-bold">&gt;</span>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {displayPosts.length > 1 && (
        <div className="absolute bottom-6 right-6 md:right-10 z-30 flex gap-2 items-center">
          <div className="h-1 bg-white/30 w-12 rounded-full overflow-hidden mr-2 hidden sm:block">
            <div
              className="h-full bg-white transition-all duration-6000 ease-linear"
              style={{ width: `${((currentIdx + 1) / displayPosts.length) * 100}%` }}
            />
          </div>
          {displayPosts.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIdx(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIdx ? "bg-white scale-125 shadow-sm" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`${index + 1}번째 슬라이드로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
