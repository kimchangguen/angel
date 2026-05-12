import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F5F0E8] border-t border-stone-200">
      {/* 메인 푸터 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0 justify-between">

          {/* 왼쪽 — 로고 */}
          <div className="flex items-center gap-2 flex-none">
            <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9 text-stone-500" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 4C18 4 8 10 8 20c0 5.5 4.5 10 10 10s10-4.5 10-10C28 10 18 4 18 4z" />
              <path d="M18 14c0 0-4 3-4 7 0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-7-4-7z" fill="currentColor" fillOpacity="0.15" />
              <path d="M12 8 Q8 4 10 2" />
              <path d="M24 8 Q28 4 26 2" />
            </svg>
            <span className="text-xl font-bold text-gray-700 tracking-tight">유진천사620</span>
          </div>

          {/* 중앙 — 사업자 정보 */}
          <div className="text-xs text-gray-500 leading-relaxed space-y-1 lg:text-center">
            <p className="font-semibold text-gray-700 text-sm">
              유진천사620&nbsp;&nbsp;|&nbsp;&nbsp;대표: 장세은
            </p>
            <p>사업자등록번호: 401-15-52267</p>
            <p>주소: 강원 원주시 지정면 가곡리 1445-6</p>
            <p>이메일: 08220522@naver.com</p>
          </div>

          {/* 오른쪽 — 상담 연락처 */}
          <div className="flex-none text-right">
            <p className="text-xs text-gray-400 mb-1">24시간 상담 · 연중무휴</p>
            <a
              href="tel:01094270522"
              className="block text-2xl font-bold text-gray-800 tracking-wide hover:text-orange-500 transition-colors duration-200 mb-3"
            >
              010-9427-0522
            </a>
            <a
              href="https://open.kakao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3A1D1D] text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 3C6.477 3 2 6.612 2 11.071c0 2.795 1.773 5.244 4.457 6.71l-1.13 4.117a.25.25 0 0 0 .376.276L10.3 19.39A12.137 12.137 0 0 0 12 19.5c5.523 0 10-3.612 10-8.071C22 6.612 17.523 3 12 3z" />
              </svg>
              카카오톡 상담하기
            </a>
          </div>

        </div>
      </div>

      {/* 카피라이트 */}
      <div className="border-t border-stone-200 py-3 text-center text-xs text-gray-400">
        © 2024 유진천사620. All rights reserved.
      </div>
    </footer>
  );
}
