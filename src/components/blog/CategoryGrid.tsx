import Link from "next/link";
import Image from "next/image";
import { WPPost, getFeaturedImage, decodeHtmlEntities, formatDate } from "@/lib/wordpress";

interface CategoryPost {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
}

interface CategorySectionProps {
  title: string;
  slug: string;
  posts: CategoryPost[];
}



function CategorySection({ title, slug, posts }: CategorySectionProps) {
  return (
    <div className="flex-1 bg-white rounded-lg border border-stone-200/80 p-5 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
        <h3 className="text-sm md:text-base font-bold text-stone-800 flex items-center gap-1.5 font-[family-name:var(--font-noto-sans-kr)]">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
          {title}
        </h3>
        <Link
          href={`/blog/category/${slug}`}
          className="px-2.5 py-1 text-[10px] md:text-xs font-medium text-stone-500 hover:text-orange-500 border border-stone-200/70 hover:border-orange-200 rounded bg-stone-50/50 hover:bg-orange-50/20 transition-all duration-200"
        >
          더보기
        </Link>
      </div>

      {/* Posts List Layout */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              key={`${post.id}-${post.slug}`}
              href={`/blog/${post.slug}`}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-stone-50/70 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative w-[75px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-stone-100 bg-stone-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="75px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[9px] md:text-[10px] text-stone-400 block mb-1">
                  {post.date}
                </span>
                <h4 className="text-xs font-semibold text-stone-800 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 text-stone-400 text-xs font-light">
          등록된 포스팅이 없습니다.
        </div>
      )}
    </div>
  );
}

interface CategoryGridProps {
  postsGroupedBySlug?: Record<string, WPPost[]>;
}

export default function CategoryGrid({ postsGroupedBySlug = {} }: CategoryGridProps) {
  
  // Helper to map posts
  const getCategoryPosts = (slug: string): CategoryPost[] => {
    const realPosts = postsGroupedBySlug[slug];
    if (!realPosts || realPosts.length === 0) return [];
    
    return realPosts.slice(0, 4).map((post) => ({
      id: post.id,
      title: decodeHtmlEntities(post.title.rendered),
      date: formatDate(post.date),
      image: getFeaturedImage(post) || "/image/02aa (1).png",
      slug: post.slug,
    }));
  };

  const aPosts = getCategoryPosts("a");
  const bPosts = getCategoryPosts("b");
  const cPosts = getCategoryPosts("c");
  const dPosts = getCategoryPosts("d");

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Row 1 */}
      <div className="flex flex-col md:flex-row gap-6">
        <CategorySection
          title="유품정리"
          slug="a"
          posts={aPosts}
        />
        <CategorySection
          title="특수청소"
          slug="b"
          posts={bPosts}
        />
      </div>
      
      {/* Row 2 */}
      <div className="flex flex-col md:flex-row gap-6">
        <CategorySection
          title="유용한정보"
          slug="c"
          posts={cPosts}
        />
        <CategorySection
          title="특이사항작업"
          slug="d"
          posts={dPosts}
        />
      </div>
    </div>
  );
}
