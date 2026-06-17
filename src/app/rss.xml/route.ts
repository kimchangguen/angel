import { getPosts, stripHtml, decodeHtmlEntities, WPPost } from "@/lib/wordpress";

export async function GET() {
  const baseUrl = "https://www.eugeneangel.com";
  const siteName = "유진천사620";
  const siteDescription =
    "유품정리·특수청소 전문 유진천사620의 블로그 – 유품정리 사례, 특수청소 정보, 유용한 팁을 전해드립니다.";

  let posts: WPPost[];
  try {
    posts = await getPosts(50);
  } catch (err) {
    console.error("[rss] failed to fetch posts:", err);
    posts = [];
  }

  const escapeXml = (str: string): string =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const items = posts
    .map((post) => {
      const title = escapeXml(decodeHtmlEntities(post.title.rendered));
      const description = escapeXml(
        decodeHtmlEntities(stripHtml(post.excerpt.rendered)).slice(0, 200)
      );
      const link = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const category = post.categories?.[0]?.name
        ? `<category>${escapeXml(post.categories[0].name)}</category>`
        : "";

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      ${category}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
