"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "서비스항목", href: "/services" },
  { label: "대표사례", href: "/portfolio" },
  { label: "FAQ", href: "/faq" },
  { label: "블로그", href: "/blog" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 tracking-tight hover:text-orange-500 transition-colors duration-200"
            style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" }}
          >
            유진천사620
          </Link>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md relative group hover:text-orange-500 transition-colors duration-200"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
            <Link
              href="/estimate"
              className="ml-3 px-5 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 active:bg-orange-700 transition-colors duration-200 shadow-sm"
            >
              견적신청
            </Link>
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            aria-label="메뉴 열기/닫기"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/estimate"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 px-3 py-3 text-sm font-semibold text-white bg-orange-500 rounded-xl text-center hover:bg-orange-600 transition-colors duration-200"
            >
              견적신청
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
