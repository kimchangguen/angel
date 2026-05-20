import { getPost, getPosts, getFeaturedImage, decodeHtmlEntities, formatDate, WPPost } from "@/lib/wordpress";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 0; // 매 요청마다 실시간 렌더링 (SSR)

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for build time optimization (Next.js compilation)
export async function generateStaticParams() {
  try {
    const posts = await getPosts(30);
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (err) {
    console.error("[generateStaticParams] failed:", err);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  let post = null;
  let recentPosts: WPPost[] = [];

  try {
    // Fetch current post and recent posts for sidebar in parallel
    const [fetchedPost, fetchedRecent] = await Promise.all([
      getPost(slug),
      getPosts(5),
    ]);

    post = fetchedPost;
    recentPosts = fetchedRecent || [];
  } catch (err) {
    console.error("[BlogPostPage] fetch failed:", err);
  }

  // Handle 404 if post does not exist
  if (!post) {
    notFound();
  }

  const title = decodeHtmlEntities(post.title.rendered);
  const dateFormatted = formatDate(post.date);
  const featuredImage = getFeaturedImage(post);
  const categoryName = post.categories?.[0]?.name || "블로그";
  const categorySlug = post.categories?.[0]?.slug || "a";

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8 border-t border-stone-200/50">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-light">
          <Link href="/" className="hover:text-orange-500 transition-colors">홈</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-orange-500 transition-colors">블로그</Link>
          <span>/</span>
          <Link href={`/blog/category/${categorySlug}`} className="hover:text-orange-500 transition-colors text-orange-600 font-medium">
            {categoryName}
          </Link>
          <span>/</span>
          <span className="font-medium text-stone-700 truncate max-w-[200px]">{title}</span>
        </div>

        {/* 2-column layout (Content Area + Sidebar) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Content Area (Main Post) */}
          <main className="flex-1 w-full bg-white rounded-lg border border-stone-200/80 p-6 md:p-10 shadow-sm">
            
            {/* Post Header */}
            <header className="mb-8 border-b border-stone-100 pb-6">
              <span className="bg-orange-100 text-orange-700 text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                {categoryName}
              </span>
              <h1 className="text-xl md:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4 font-[family-name:var(--font-noto-sans-kr)]">
                {title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-stone-400 font-light">
                <span>유진천사620</span>
                <span>•</span>
                <span>📅 {dateFormatted}</span>
              </div>
            </header>

            {/* Featured Image */}
            {featuredImage && (
              <div className="relative w-full h-[250px] md:h-[420px] rounded-lg overflow-hidden mb-8 border border-stone-100">
                <Image
                  src={featuredImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-w-900px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Post Body (parsed HTML safely rendered) */}
            <article 
              className="wordpress-content text-stone-850 text-sm md:text-base font-light leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* List back to blog link */}
            <div className="mt-12 pt-6 border-t border-stone-100 flex justify-between items-center text-xs md:text-sm">
              <Link 
                href="/blog"
                className="px-4 py-2 border border-stone-200 hover:border-orange-300 text-stone-600 hover:text-orange-600 rounded bg-stone-50/50 hover:bg-orange-50/20 transition-all font-medium"
              >
                목록으로 돌아가기
              </Link>
            </div>

          </main>

          {/* Right Sidebar Area */}
          <BlogSidebar recentPosts={recentPosts} />

        </div>

      </div>
    </div>
  );
}
