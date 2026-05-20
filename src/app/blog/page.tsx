import BlogSlider from "@/components/blog/BlogSlider";
import CategoryGrid from "@/components/blog/CategoryGrid";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { getPosts, WPPost } from "@/lib/wordpress";
import Link from "next/link";

export const revalidate = 3600; // ISR validation time in seconds (1 hour)

export default async function BlogPage() {
  let allPosts: WPPost[] = [];
  
  try {
    // Fetch latest 40 posts from WordPress
    allPosts = await getPosts(40);
  } catch (err) {
    console.error("[BlogPage] failed to fetch posts:", err);
  }

  // 1. Group posts by category slug dynamically
  const postsGroupedBySlug: Record<string, WPPost[]> = {
    a: [],
    b: [],
    c: [],
    d: [],
  };

  allPosts.forEach((post) => {
    post.categories?.forEach((cat) => {
      const slug = cat.slug.toLowerCase();
      if (slug in postsGroupedBySlug) {
        postsGroupedBySlug[slug].push(post);
      }
    });
  });

  // 2. Select recent posts for sidebar (latest 5 posts)
  const recentPosts = allPosts.slice(0, 5);

  // 3. Select featured posts for top wide slider (latest 3 posts)
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8 border-t border-stone-200/50">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-505 font-light">
          <Link href="/" className="hover:text-orange-500 transition-colors text-stone-500">홈</Link>
          <span className="text-stone-400">/</span>
          <span className="font-medium text-stone-700">블로그</span>
        </div>

        {/* 1. 상단 추천 글 메인 영역 (Featured Slider) */}
        <section className="w-full">
          <BlogSlider posts={featuredPosts} />
        </section>

        {/* 2. 하단 메인 영역 (좌측 2단 섹션 그리드 + 우측 사이드바) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 좌측 메인 영역 (4개의 카테고리, 2단씩 배치) */}
          <main className="flex-1 w-full flex flex-col gap-6">
            <CategoryGrid postsGroupedBySlug={postsGroupedBySlug} />
          </main>

          {/* 우측 사이드바 영역 */}
          <BlogSidebar recentPosts={recentPosts} />

        </div>

      </div>
    </div>
  );
}
