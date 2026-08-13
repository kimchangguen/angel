import type { Metadata } from "next";
import {
  getPost,
  getPosts,
  getPostsByCategory,
  getFeaturedImage,
  getFirstImage,
  decodeHtmlEntities,
  stripHtml,
  formatDate,
  WPPost,
  normalizePostHtml,
  injectHeadingIds,
  splitIntroFromContent,
} from "@/lib/wordpress";
import BlogSidebar from "@/components/blog/BlogSidebar";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPosts from "@/components/blog/RelatedPosts";
import PostNavigation from "@/components/blog/PostNavigation";
import AuthorBox from "@/components/blog/AuthorBox";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const revalidate = 0; // 매 요청마다 실시간 렌더링 (SSR)

const BASE_URL = "https://www.eugeneangel.com";

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

// Dynamic metadata generation for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  try {
    const post = await getPost(slug);

    if (!post) {
      return {
        title: "글을 찾을 수 없습니다",
        description: "요청하신 블로그 글을 찾을 수 없습니다.",
        robots: { index: false, follow: false },
      };
    }

    const title = decodeHtmlEntities(post.title.rendered);
    const description = decodeHtmlEntities(
      stripHtml(post.excerpt.rendered)
    ).slice(0, 160);
    const postUrl = `${BASE_URL}/blog/${post.slug}`;
    const ogImage = getFirstImage(post) || `${BASE_URL}/image/hero%20(1).png`;
    const categoryName = post.categories?.[0]?.name || "블로그";

    return {
      title,
      description,
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        type: "article",
        url: postUrl,
        title: `${title} | 유진천사620`,
        description,
        siteName: "유진천사620",
        publishedTime: post.date,
        section: categoryName,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | 유진천사620`,
        description,
        images: [ogImage],
      },
    };
  } catch (err) {
    console.error("[generateMetadata] failed:", err);
    return {
      title: "블로그",
      description: "유진천사620 블로그",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  
  let post = null;
  let latestPosts: WPPost[] = [];
  let categoryPosts: WPPost[] = [];

  try {
    // Fetch current post first (recent/prev-next lookups depend on nothing else)
    post = await getPost(slug);

    const [fetchedLatest, fetchedCategory] = await Promise.all([
      getPosts(50),
      post?.categories?.[0]?.id
        ? getPostsByCategory(post.categories[0].id, 4)
        : Promise.resolve([]),
    ]);

    latestPosts = fetchedLatest || [];
    categoryPosts = fetchedCategory || [];
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
  const postUrl = `${SITE.url}/blog/${post.slug}`;
  const description = decodeHtmlEntities(stripHtml(post.excerpt.rendered)).slice(0, 160);
  const articleImage = getFirstImage(post) || SITE.image;

  const recentPosts = latestPosts.slice(0, 5);
  const relatedPosts = categoryPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const currentIndex = latestPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex >= 0 ? latestPosts[currentIndex + 1] || null : null;
  const nextPost = currentIndex > 0 ? latestPosts[currentIndex - 1] || null : null;

  const normalizedHtml = normalizePostHtml(post.content.rendered, title);
  const { html: contentWithIds, headings } = injectHeadingIds(normalizedHtml);
  const { introHtml, restHtml } = splitIntroFromContent(contentWithIds);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8 border-t border-stone-200/50">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": ["Article", "BlogPosting"], "@id": `${postUrl}#article`, headline: title, description, image: [articleImage], datePublished: post.date, dateModified: post.modified || post.date, inLanguage: "ko-KR", mainEntityOfPage: { "@id": `${postUrl}#webpage` }, author: { "@id": `${SITE.url}/#organization` }, publisher: { "@id": `${SITE.url}/#organization` }, articleSection: categoryName },
        { "@type": "WebPage", "@id": `${postUrl}#webpage`, url: postUrl, name: title, isPartOf: { "@id": `${SITE.url}/#website` }, breadcrumb: { "@id": `${postUrl}#breadcrumb` } },
        { "@type": "BreadcrumbList", "@id": `${postUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE.url }, { "@type": "ListItem", position: 2, name: "블로그", item: `${SITE.url}/blog` }, { "@type": "ListItem", position: 3, name: categoryName, item: `${SITE.url}/blog/category/${categorySlug}` }, { "@type": "ListItem", position: 4, name: title, item: postUrl }] },
      ] }} />
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
          <main className="flex-1 w-full max-w-[880px] bg-white rounded-sm border border-stone-200/80 p-5 sm:p-6 md:p-10">

            {/* Post Header */}
            <header className="mb-6 md:mb-8 border-b border-stone-100 pb-6">
              <span className="bg-amber-400 text-stone-900 text-[11px] md:text-xs font-bold px-2.5 py-1 rounded-sm mb-3 inline-block">
                {categoryName}
              </span>
              <h1 className="text-[26px] md:text-4xl font-extrabold text-stone-900 tracking-tight leading-[1.35] mb-4 font-[family-name:var(--font-noto-sans-kr)]">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-xs md:text-sm text-stone-500">
                <span>{dateFormatted}</span>
                <span>·</span>
                <span>{SITE.name}</span>
              </div>
            </header>

            {/* Featured Image */}
            {featuredImage && (
              <div className="relative w-full h-[220px] sm:h-[320px] md:h-[440px] rounded-sm overflow-hidden mb-8 border border-stone-100">
                <Image
                  src={featuredImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 880px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Post Intro (content before the first heading) */}
            {introHtml && (
              <div
                className="wordpress-content"
                dangerouslySetInnerHTML={{ __html: introHtml }}
              />
            )}

            {/* Table of Contents */}
            <TableOfContents headings={headings} />

            {/* Post Body (parsed HTML safely rendered) */}
            <article
              className="wordpress-content"
              dangerouslySetInnerHTML={{ __html: restHtml }}
            />

            {/* Author info */}
            <AuthorBox categoryName={categoryName} dateFormatted={dateFormatted} />

            {/* Consultation CTA */}
            <div className="mt-6 rounded-sm border border-orange-100 bg-orange-50/50 px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm text-stone-700 leading-relaxed">
                유품정리·특수청소 관련 문의는 24시간 상담 가능합니다.
              </p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`tel:${SITE.phone}`}
                  className="px-4 py-2 text-xs md:text-sm font-semibold text-stone-800 border border-stone-300 rounded-sm hover:border-orange-300 hover:text-orange-600 transition-colors"
                >
                  {SITE.phoneDisplay}
                </a>
                <Link
                  href="/estimate"
                  className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-sm transition-colors"
                >
                  견적신청
                </Link>
              </div>
            </div>

            {/* Prev / Next post navigation */}
            <PostNavigation prevPost={prevPost} nextPost={nextPost} />

            {/* List back to blog link */}
            <div className="mt-8 pt-6 border-t border-stone-100">
              <Link
                href="/blog"
                className="inline-block px-4 py-2 border border-stone-200 hover:border-orange-300 text-stone-600 hover:text-orange-600 rounded-sm bg-stone-50/50 hover:bg-orange-50/20 transition-all font-medium text-xs md:text-sm"
              >
                목록으로 돌아가기
              </Link>
            </div>

            {/* Related posts */}
            <RelatedPosts posts={relatedPosts} />

          </main>

          {/* Right Sidebar Area */}
          <BlogSidebar recentPosts={recentPosts} />

        </div>

      </div>
    </div>
  );
}
