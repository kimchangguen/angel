import type { Metadata } from "next";
import BlogSlider from "@/components/blog/BlogSlider";
import CategoryGrid from "@/components/blog/CategoryGrid";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { getPosts, WPPost } from "@/lib/wordpress";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const revalidate = 0; // 매 요청마다 실시간 렌더링 (SSR)

const BASE_URL = "https://www.eugeneangel.com";

export const metadata: Metadata = {
  title: "원주·충주 유품정리 특수청소 현장 사례 블로그",
  description:
    "원주·충주·제천 등 전국 유품정리와 특수청소 실제 사례, 비용과 작업 절차를 확인하세요. 현장 전문가의 안내를 읽고 24시간 상담을 요청할 수 있습니다.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    title: "원주·충주 유품정리 특수청소 현장 사례 블로그 | 유진천사620",
    description:
      "원주·충주·제천 등 전국 유품정리와 특수청소 실제 사례, 비용과 작업 절차를 확인하고 24시간 상담을 요청하세요.",
    images: [
      {
        url: `${BASE_URL}/image/hero%20(1).png`,
        width: 1200,
        height: 630,
        alt: "유진천사620 블로그",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "원주·충주 유품정리 특수청소 현장 사례 블로그 | 유진천사620",
    description:
      "원주·충주·제천 등 전국 유품정리와 특수청소 실제 사례, 비용과 작업 절차를 확인하고 24시간 상담을 요청하세요.",
    images: [`${BASE_URL}/image/hero%20(1).png`],
  },
};

export default async function BlogPage() {
  let allPosts: WPPost[] = [];
  
  try {
    // Fetch latest 60 posts from WordPress
    allPosts = await getPosts(60);
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
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "Blog", "@id": `${SITE.url}/blog#blog`, url: `${SITE.url}/blog`, name: "유진천사620 현장 사례 블로그", description: "유품정리와 특수청소 현장 사례 및 전문 정보", inLanguage: "ko-KR", publisher: { "@id": `${SITE.url}/#organization` } },
        { "@type": "WebPage", "@id": `${SITE.url}/blog#webpage`, url: `${SITE.url}/blog`, name: "원주·충주 유품정리 특수청소 현장 사례 블로그", isPartOf: { "@id": `${SITE.url}/#website` } },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE.url }, { "@type": "ListItem", position: 2, name: "블로그", item: `${SITE.url}/blog` }] },
      ] }} />
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="sr-only">원주·충주 유품정리 및 특수청소 현장 사례</h1>
        
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
