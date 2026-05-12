"use client";

import Link from "next/link";

const buttons = [
  {
    label: "전화상담",
    href: "tel:01094270522",
    isExternal: false,
    bg: "bg-orange-500 hover:bg-orange-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41C1.6 2.67 2 2 2.72 2H5.72a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 9.71a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "카톡문의",
    href: "https://open.kakao.com/",
    isExternal: true,
    bg: "bg-[#FEE500] hover:bg-[#F5DC00]",
    textColor: "text-[#3A1D1D]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#3A1D1D]">
        <path d="M12 3C6.477 3 2 6.612 2 11.071c0 2.795 1.773 5.244 4.457 6.71l-1.13 4.117a.25.25 0 0 0 .376.276L10.3 19.39A12.137 12.137 0 0 0 12 19.5c5.523 0 10-3.612 10-8.071C22 6.612 17.523 3 12 3z" />
      </svg>
    ),
  },
  {
    label: "견적신청",
    href: "/estimate",
    isExternal: false,
    bg: "bg-slate-800 hover:bg-slate-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function FloatingMenu() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-end">
      {buttons.map(({ label, href, isExternal, bg, textColor, icon }) => {
        const btnClass = `group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${bg} text-white`;

        const content = (
          <>
            {/* 라벨 — hover 시 왼쪽에서 슥 나타남 */}
            <span className="absolute right-16 whitespace-nowrap bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none select-none">
              {label}
            </span>
            {/* 아이콘 */}
            <span className={textColor ?? "text-white"}>{icon}</span>
          </>
        );

        if (isExternal) {
          return (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={btnClass} aria-label={label}>
              {content}
            </a>
          );
        }

        return (
          <Link key={label} href={href} className={btnClass} aria-label={label}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
