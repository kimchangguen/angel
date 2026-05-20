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

export default async function CaseSection() {
  let posts: WPPost[] = [];
  try {
    posts = await getPosts(16);
  } catch (err) {
    console.error("[CaseSection] failed to fetch posts:", err);
  }

  // Map real posts
  const realPosts: CasePost[] = (posts || []).slice(0, 16).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title.rendered),
    date: formatDate(post.date),
    imageUrl: getFirstImage(post) || "https://placehold.co/400x400/e2e8f0/94a3b8.png?text=유진천사620",
    category: post.categories?.[0]?.name || "작업사례",
  }));

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
        {realPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <span className="text-gray-400 text-base font-medium">등록된 작업 사례가 없습니다.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {realPosts.map((post) => (
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
        )}

      </div>
    </section>
  );
}
