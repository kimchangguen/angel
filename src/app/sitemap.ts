import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/wordpress";
import { SITE, absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${baseUrl}/estimate`, changeFrequency: "monthly", priority: 0.8 },
    ...["a", "b", "c", "d"].map((slug) => ({ url: `${baseUrl}/blog/category/${slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];

  // Dynamic blog posts from WordPress
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts(100);
    blogPosts = posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.modified || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("[sitemap] failed to fetch posts:", err);
  }

  return [...staticPages, ...blogPosts];
}
