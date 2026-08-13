import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { decodeHtmlEntities, formatDate, getFeaturedImage, getPosts, stripHtml } from "@/lib/wordpress";
import { SITE } from "@/lib/site";

const CATEGORIES: Record<string, string> = { a: "유품정리", b: "특수청소", c: "유용한정보", d: "특이사항작업" };
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return Object.keys(CATEGORIES).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = CATEGORIES[slug];
  if (!name) return { title: "카테고리를 찾을 수 없습니다", robots: { index: false, follow: false } };
  const url = `${SITE.url}/blog/category/${slug}`;
  const description = `원주와 전국 ${name} 현장 사례, 작업 과정과 비용 정보를 확인하세요. 유진천사620이 실제 경험을 바탕으로 정확한 정보를 안내합니다.`;
  return { title: `원주 ${name} 현장 사례와 전문 정보`, description, alternates: { canonical: url }, openGraph: { type: "website", url, title: `원주 ${name} 현장 사례 | 유진천사620`, description, images: [SITE.image] }, twitter: { card: "summary_large_image", title: `원주 ${name} 현장 사례 | 유진천사620`, description, images: [SITE.image] } };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const name = CATEGORIES[slug];
  if (!name) notFound();
  const posts = (await getPosts(100)).filter((post) => post.categories?.some((category) => category.slug === slug));
  const url = `${SITE.url}/blog/category/${slug}`;
  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-10 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: `${name} 현장 사례`, isPartOf: { "@id": `${SITE.url}/#website` }, mainEntity: { "@id": `${url}#items` } },
        { "@type": "ItemList", "@id": `${url}#items`, itemListElement: posts.map((post, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE.url}/blog/${post.slug}`, name: decodeHtmlEntities(post.title.rendered) })) },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: SITE.url }, { "@type": "ListItem", position: 2, name: "블로그", item: `${SITE.url}/blog` }, { "@type": "ListItem", position: 3, name, item: url }] },
      ] }} />
      <div className="mx-auto max-w-5xl">
        <nav aria-label="경로" className="mb-6 text-sm text-stone-500"><Link href="/">홈</Link> / <Link href="/blog">블로그</Link> / {name}</nav>
        <h1 className="text-3xl font-bold text-stone-900">원주 {name} 현장 사례</h1>
        <p className="mt-3 text-stone-600">실제 작업 과정과 현장에서 확인한 전문 정보를 전합니다.</p>
        {posts.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((post) => { const title = decodeHtmlEntities(post.title.rendered); return <article key={post.id} className="overflow-hidden rounded-xl bg-white shadow-sm"><Link href={`/blog/${post.slug}`}><div className="relative aspect-[16/9] bg-stone-100"><Image src={getFeaturedImage(post) || "/image/02aa (5).png"} alt={title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /></div><div className="p-5"><p className="text-xs text-stone-400">{formatDate(post.date)}</p><h2 className="mt-2 font-bold leading-6 text-stone-900">{title}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{decodeHtmlEntities(stripHtml(post.excerpt.rendered))}</p></div></Link></article>; })}</div> : <p className="mt-10 rounded-xl bg-white p-8 text-stone-500">아직 등록된 글이 없습니다.</p>}
      </div>
    </main>
  );
}
