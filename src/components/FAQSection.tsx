"use client";

import { useState } from "react";

const faqList = [
  { question: "견적은 어떻게 산출되나요?", answer: "방문 견적을 원칙으로 하며, 현장의 평수, 폐기물의 양, 오염 정도, 사다리차 필요 여부 등을 종합적으로 파악하여 투명하고 합리적인 정찰제 견적을 산출해 드립니다." },
  { question: "작업 후 추가 비용이 발생할 수도 있나요?", answer: "원칙적으로 사전 계약된 견적 이외의 부당한 추가 요금은 요구하지 않습니다. 단, 작업 당일 고객님의 요청으로 폐기물량이 급증하거나 특수 장비가 추가되어야 하는 예외적인 상황에서는 사전 협의 후 진행됩니다." },
  { question: "폐기물 처리 비용은 견적에 포함되어 있나요?", answer: "네, 그렇습니다. 가구, 가전, 일반 쓰레기 등 현장에서 발생하는 모든 폐기물의 합법적인 수거 및 처리 비용이 기본 견적에 모두 포함되어 있습니다." },
  { question: "결제 방식은 어떻게 되나요? 카드 결제도 가능한가요?", answer: "고객님의 편의를 위해 현금, 계좌이체는 물론 신용카드 결제와 현금영수증, 세금계산서 발행이 모두 가능합니다. (부가세 별도)" },
  { question: "견적 상담 시 현장 사진만으로도 정확한 비용을 알 수 있나요?", answer: "사진이나 영상만으로도 대략적인 가견적 안내는 가능합니다. 하지만 숨겨진 폐기물이나 악취 등은 사진으로 확인이 어려우므로, 정확한 확정 견적을 위해 무료 방문 상담을 권장해 드립니다." },
  { question: "유족이 현장에 없어도 진행되나요?", answer: "네, 가능합니다. 생업이나 거주지 문제로 방문이 어려우신 경우, 비밀번호를 공유해 주시면 비대면으로 작업을 진행합니다. 작업 전, 중, 후의 모든 과정을 사진과 영상으로 상세히 보고해 드립니다." },
  { question: "작업 시간은 얼마나 걸리나요?", answer: "일반적인 원룸이나 투룸의 경우 약 3~5시간, 아파트나 짐이 많은 주택의 경우 하루(8시간 내외) 정도 소요됩니다. 현장 상황에 따라 유동적이며, 견적 시 예상 소요 시간을 미리 안내해 드립니다." },
  { question: "예약은 어떻게 하나요?", answer: "24시간 운영되는 고객센터 전화 상담이나 홈페이지의 간편 견적 신청 폼을 통해 접수해 주시면, 전문 상담원이 빠르게 연락을 드려 일정과 방문 견적을 조율해 드립니다." },
  { question: "주말이나 공휴일, 야간에도 작업이 가능한가요?", answer: "네, 유진천사620은 유족분들의 일정에 최대한 맞추기 위해 주말과 공휴일 작업도 진행하고 있습니다. 필요시 야간 작업도 가능하니 상담 시 미리 말씀해 주시면 됩니다." },
  { question: "이웃에게 피해가 가지 않게 조용히 작업이 가능한가요?", answer: "저희 전문가들은 소음과 먼지 발생을 최소화하는 매뉴얼을 준수합니다. 특히 고독사 현장 등 주변의 시선이 부담스러우신 경우, 이웃의 불편을 최소화하는 방식으로 조심스럽게 작업을 진행합니다." },
  { question: "작업 전 미리 준비하거나 치워둬야 할 것이 있나요?", answer: "유족분들께서 직접 하실 일은 전혀 없습니다. 현장 그대로 두시면 저희가 귀중품 선별부터 폐기, 청소까지 모든 과정을 알아서 처리해 드립니다." },
  { question: "귀중품이 나오면 어떻게 하나요?", answer: "작업 중 발견되는 현금, 귀금속, 통장, 도장, 부동산 계약서 및 사진첩 등은 저희 스태프가 가장 먼저 별도로 분류하여 안전하게 박싱한 후 유족분들께 100% 전달해 드립니다." },
  { question: "개인정보나 중요한 서류는 어떻게 처리되나요?", answer: "고인의 개인정보가 담긴 우편물, 영수증, 다이어리, 각종 서류 등은 외부로 유출되지 않도록 철저하게 분류하여 안전하게 파쇄 및 폐기 처리를 진행합니다." },
  { question: "남은 유품을 기부하거나 소각해 주실 수 있나요?", answer: "네, 쓸 만한 의류나 가전 등은 고객님이 원하실 경우 관련 단체에 기부를 연계해 드리며, 고인의 평소 아끼시던 물품은 합법적인 절차를 거쳐 소각 대행 서비스도 제공하고 있습니다." },
  { question: "냉장고 안의 썩은 음식물도 모두 치워주시나요?", answer: "네, 부패한 음식물 쓰레기와 각종 생활 오물 등 개인이 직접 처리하기 힘든 악취 나는 폐기물들도 모두 저희가 전용 용기에 담아 완벽하게 수거 및 폐기합니다." },
  { question: "특수청소(고독사 등)의 경우 악취가 완벽히 제거되나요?", answer: "네, 단순 청소가 아닌 특수 약품, 고농도 오존 살균기, 자외선 소독기 등을 사용하여 벽지나 바닥에 밴 시취와 부패액을 근본적으로 분해하고 완벽하게 악취를 제거합니다." },
  { question: "감염병 예방을 위한 방역 소독도 함께 진행되나요?", answer: "모든 작업이 완료된 후에는 눈에 보이지 않는 세균과 바이러스를 제거하기 위해 친환경 살균 소독 및 해충 방역 작업을 기본적으로 실시하여 공간을 쾌적하게 복원합니다." },
  { question: "벽지나 장판 등 인테리어 철거도 가능한가요?", answer: "혈흔이나 부패액이 스며들어 오염이 심한 벽지와 장판은 원상복구를 위해 철거를 진행합니다. 필요시 타일, 싱크대 철거 등 부분적인 인테리어 철거도 함께 도와드릴 수 있습니다." },
  { question: "쓰레기집(저장강박증) 청소도 하시나요?", answer: "네, 천장까지 쓰레기가 쌓여있는 심각한 저장강박증 가구나 방치된 빈집 정리 등 극심한 오염 현장도 유진천사620의 노하우로 하루 만에 깨끗한 빈 공간으로 만들어 드립니다." },
  { question: "현장이 지방인데 출장 작업도 가능한가요?", answer: "유진천사620은 전국 네트워크망을 구축하고 있어 지역에 상관없이 동일한 퀄리티의 프리미엄 서비스를 제공해 드립니다. (단, 거리에 따라 소정의 출장비가 발생할 수 있으며, 상담 시 안내해 드립니다.)" },
];

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
    <section className="w-full bg-gray-50 py-20">
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
