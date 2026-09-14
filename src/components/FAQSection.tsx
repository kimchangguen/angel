"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/site";

const faqList = FAQ_ITEMS;

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors duration-150"
      >
        <span className="font-semibold text-gray-800 text-base leading-relaxed" style={{ wordBreak: "keep-all" }}>
          {question}
        </span>
        <span className="flex-none w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 text-lg leading-none font-light">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* 답변 — max-height 트랜지션으로 부드럽게 펼침 */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "400px" : "0px" }}
      >
        <div className="px-5 pb-4 pt-1">
          <p className="text-gray-700 text-base leading-relaxed" style={{ wordBreak: "keep-all" }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const leftCol = faqList.slice(0, 10);
  const rightCol = faqList.slice(10, 20);

  return (
    <section id="faq" className="w-full bg-gray-50 py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* 타이틀 */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-50 text-orange-500 text-sm font-semibold px-4 py-1.5 rounded-full border border-orange-100 mb-5">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            리얼 현장 정확도 100% FAQ
          </h2>
        </div>

        {/* 2열 레이아웃 — 왼쪽 10개, 오른쪽 10개 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 왼쪽 컬럼 */}
          <div className="flex flex-col gap-3">
            {leftCol.map((item, i) => (
              <AccordionItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="flex flex-col gap-3">
            {rightCol.map((item, i) => (
              <AccordionItem key={i + 10} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
