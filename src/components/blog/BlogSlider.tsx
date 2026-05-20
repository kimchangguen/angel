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

interface BlogSliderProps {
  posts?: WPPost[];
}

export default function BlogSlider({ posts = [] }: BlogSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Map real WPPosts to SliderPost structure
  const displayPosts: SliderPost[] = posts.slice(0, 5).map((post) => ({
    id: post.id,
    title: decodeHtmlEntities(post.title.rendered),
    excerpt: decodeHtmlEntities(stripHtml(post.excerpt.rendered)),
    date: formatDate(post.date),
    image: getFeaturedImage(post) || "/image/hero (1).png",
    category: post.categories?.[0]?.name || "추천 글",
    slug: post.slug,
  }));

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
