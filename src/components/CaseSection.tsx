import Link from "next/link";
import Image from "next/image";
import { getPosts, getFirstImage, decodeHtmlEntities, formatDate, WPPost } from "@/lib/wordpress";

type CasePost = {
  id: number | string;
  slug: string;
  title: string;
  date: string;
  imageUrl: string;
  category: string;
};

const fallbackPosts: CasePost[] = [
  { id: 1, slug: "#", title: "유품정리 실제 현장 작업 사례", date: "2026-05-20", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=유품정리", category: "유품정리" },
  { id: 2, slug: "#", title: "화재 현장 특수청소 작업 사례", date: "2026-05-19", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=특수청소", category: "특수청소" },
  { id: 3, slug: "#", title: "쓰레기집 청소 및 탈취 작업 사례", date: "2026-05-18", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=쓰레기집", category: "쓰레기집" },
  { id: 4, slug: "#", title: "빈집정리 및 폐기물 처리 작업 사례", date: "2026-05-17", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=빈집정리", category: "빈집정리" },
  { id: 5, slug: "#", title: "고독사 현장 특수 정화 작업 사례", date: "2026-05-16", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=특수청소", category: "특수청소" },
  { id: 6, slug: "#", title: "상가 방역 및 소독 서비스 사례", date: "2026-05-15", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=소독·방역", category: "소독·방역" },
  { id: 7, slug: "#", title: "가정집 쓰레기 수거 및 살균 서비스", date: "2026-05-14", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=쓰레기집", category: "쓰레기집" },
  { id: 8, slug: "#", title: "사무실 빈집 정리 및 가구 폐기", date: "2026-05-13", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=빈집정리", category: "빈집정리" },
  { id: 9, slug: "#", title: "원룸 오피스텔 유품정리 현장 사례", date: "2026-05-12", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=유품정리", category: "유품정리" },
  { id: 10, slug: "#", title: "지하실 곰팡이 오염 특수청소 사례", date: "2026-05-11", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=특수청소", category: "특수청소" },
  { id: 11, slug: "#", title: "저장강박증 가구 쓰레기집 청소 사례", date: "2026-05-10", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=쓰레기집", category: "쓰레기집" },
  { id: 12, slug: "#", title: "아파트 리모델링 전 빈집 정리 사례", date: "2026-05-09", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=빈집정리", category: "빈집정리" },
  { id: 13, slug: "#", title: "독거노인 가정 유품 정리 현장 사례", date: "2026-05-08", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=유품정리", category: "유품정리" },
  { id: 14, slug: "#", title: "공장 화재 분진 특수 제거 작업 사례", date: "2026-05-07", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=특수청소", category: "특수청소" },
  { id: 15, slug: "#", title: "방치된 원룸 쓰레기 신속 해결 사례", date: "2026-05-06", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=쓰레기집", category: "쓰레기집" },
  { id: 16, slug: "#", title: "이사 전 대형 폐기물 일괄 처리 사례", date: "2026-05-05", imageUrl: "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=빈집정리", category: "빈집정리" },
];

export default async function CaseSection() {
  let posts: WPPost[] = [];
  try {
    posts = await getPosts(16);
  } catch (err) {
    console.error("[CaseSection] failed to fetch posts:", err);
  }

  // 1. Map real posts
  const realPosts: CasePost[] = (posts || []).slice(0, 16).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title.rendered),
    date: formatDate(post.date),
    imageUrl: getFirstImage(post) || "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=유진천사620",
    category: post.categories?.[0]?.name || "작업사례",
  }));

  // 2. Pad up to exactly 16 blocks using fallback posts
  const displayPosts: CasePost[] = [...realPosts];
  let fallbackIndex = 0;
  while (displayPosts.length < 16) {
    const fallbackItem = fallbackPosts[fallbackIndex % fallbackPosts.length];
    displayPosts.push({
      ...fallbackItem,
      id: `fallback-${fallbackItem.id}-${displayPosts.length}`,
    });
    fallbackIndex++;
  }

  return (
    <section id="portfolio" className="w-full bg-gray-50 py-20 scroll-mt-20">
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
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* 썸네일 이미지 */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {post.category && (
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                )}
              </div>

              {/* 포스팅 제목 */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h3 
                  className="text-gray-800 font-semibold text-base leading-snug group-hover:text-orange-500 transition-colors line-clamp-2" 
                  style={{ wordBreak: "keep-all" }}
                >
                  {post.title}
                </h3>
                <span className="text-xs text-gray-400 mt-2 block">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
