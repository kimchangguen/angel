import Link from "next/link";
import Image from "next/image";

type Post = {
  id: number;
  imageUrl: string;
  category: string;
};

const mockPosts: Post[] = [
  { id: 1,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "유품정리" },
  { id: 2,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "특수청소" },
  { id: 3,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "쓰레기집" },
  { id: 4,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "빈집정리" },
  { id: 5,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "유품정리" },
  { id: 6,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "소독·방역" },
  { id: 7,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "특수청소" },
  { id: 8,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "쓰레기집" },
  { id: 9,  imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "빈집정리" },
  { id: 10, imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "유품정리" },
  { id: 11, imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "폐기물처리" },
  { id: 12, imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "특수청소" },
  { id: 13, imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "소독·방역" },
  { id: 14, imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "쓰레기집" },
  { id: 15, imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "유품정리" },
  { id: 16, imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8?text=작업+사례", category: "빈집정리" },
];

export default function CaseSection() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* 섹션 타이틀 */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            style={{ wordBreak: "keep-all" }}
          >
            유진천사620 실제 작업 사례
          </h2>
          <p className="text-gray-500 text-lg">
            다양한 현장 경험을 바탕으로 고객 감동을 실천합니다.
          </p>
        </div>

        {/* 4열 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* 썸네일 이미지 */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={`작업사례 ${post.id}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* 포스팅 제목 (추후 실제 제목으로 교체) */}
              <div className="px-3 py-2.5 min-h-[40px]" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
