import Image from "next/image";

const cardStyles = [
  { bg: "bg-[#EDE8DF]", border: "border-[#DDD6CA]" },
  { bg: "bg-[#E2DAD0]", border: "border-[#CEC5BB]" },
  { bg: "bg-[#F0E9E0]", border: "border-[#E0D8CE]" },
];

const problems = [
  {
    icon: "/image/02aa%20(1).png",
    title: "감당하기 힘든 짐의 양",
    desc: "수년간 쌓인 짐과 가구, 가전제품 등 익숙한 물건들까지 어디서부터 시작해야 할지 막막합니다.",
  },
  {
    icon: "/image/02aa%20(2).png",
    title: "어떻게 처리해야 할지\n모르는 폐기물",
    desc: "일반 쓰레기부터 대형 폐기물까지, 관련 법규와 절차를 몰라 불안하고 어렵습니다.",
  },
  {
    icon: "/image/02aa%20(3).png",
    title: "악취나 오염 문제",
    desc: "장기간 방치로 인한 악취, 오염, 해충 문제 등으로 건강마저 위협받을까 걱정됩니다.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative w-full min-h-[700px] overflow-hidden flex items-center">

      {/* 배경 이미지 — 전체 커버 */}
      <div className="absolute inset-0">
        <Image
          src="/image/02aa%20(5).png"
          alt="유품정리 배경"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 왼쪽 크림 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F3] via-[#FAF7F3]/92 via-50% to-transparent" />

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-16 w-full">
        <div className="max-w-[700px]">

          {/* 헤드라인 */}
          <h2
            className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-5"
            style={{ wordBreak: "keep-all" }}
          >
            갑작스러운 이별, 혼자 감당하기 힘든 순간들
          </h2>

          {/* 부제목 */}
          <p
            className="text-lg text-gray-500 mb-12"
            style={{ wordBreak: "keep-all" }}
          >
            유가족분들의 마음을 누구보다 잘 알기에, 그 어려움에 공감합니다.
          </p>

          {/* 문제 카드 3개 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {problems.map((p, i) => (
              <div
                key={i}
                className={`${cardStyles[i].bg} border ${cardStyles[i].border} rounded-2xl p-6 flex flex-col gap-4`}
              >
                <div className="w-14 h-14 relative">
                  <Image
                    src={p.icon}
                    alt={p.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-base font-bold text-gray-800 leading-snug whitespace-pre-line"
                  style={{ wordBreak: "keep-all" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ wordBreak: "keep-all" }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 인용 미션 문구 */}
          <div className="flex items-start gap-4">
            <span className="text-6xl text-amber-300/80 font-serif leading-none select-none mt-[-6px]">
              &ldquo;
            </span>
            <p
              className="text-gray-600 text-base leading-relaxed"
              style={{ wordBreak: "keep-all" }}
            >
              저희는 단순한 청소가 아닌, 유가족의 아픔을 함께 나누며 공간을 정리해드리는 일에 최선을 다합니다. <strong className="text-gray-800">
                전문적인 정리와 청소로, 새로운 시작을 위한 공간을 만들어 드리겠습니다.
              </strong>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
