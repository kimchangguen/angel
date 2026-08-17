import { cache } from "react";

const WP_URL =
  process.env.WP_URL || "https://wordpress-1580849-6411598.cloudwaysapps.com/graphql";

// Revalidation windows (seconds) per data type — see AGENTS.md perf notes.
const REVALIDATE_POST = 180; // single post detail
const REVALIDATE_LIST = 180; // post list / recent posts / prev-next lookups
const REVALIDATE_RELATED = 300; // related posts (category query)
const REVALIDATE_CATEGORIES = 1800; // categories rarely change

const WP_GRAPHQL_URL = WP_URL.endsWith("/graphql")
  ? WP_URL
  : `${WP_URL.replace(/\/$/, "")}/graphql`;

export interface WPPost {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface GraphQLPostNode {
  databaseId: number;
  date: string;
  modified?: string | null;
  slug: string;
  link: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  categories?: {
    nodes?: Array<{
      databaseId: number;
      name: string;
      slug: string;
    }>;
  } | null;
}

interface GraphQLCategoryNode {
  databaseId: number;
  name: string;
  slug: string;
  count?: number | null;
}

export const CATEGORY_ORDER = [
  { slug: "a", label: "유품정리" },
  { slug: "b", label: "특수청소" },
  { slug: "c", label: "유용한정보" },
  { slug: "d", label: "특이사항작업" },
] as const;

export type CategorySlug = (typeof CATEGORY_ORDER)[number]["slug"];

async function fetchGraphQLOnce<T>(
  query: string,
  variables: Record<string, unknown> | undefined,
  revalidateSeconds: number
): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: revalidateSeconds }, // Next.js Data Cache — see wordpress.ts REVALIDATE_* constants
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(`[WP] HTTP ${res.status} from ${WP_GRAPHQL_URL}`);
      return null;
    }

    const json = await res.json();
    if (json.errors?.length) {
      console.error("[WP] GraphQL errors:", JSON.stringify(json.errors));
      return null;
    }
    return json.data as T;
  } catch (err) {
    console.error("[WP] fetch failed:", err instanceof Error ? err.message : err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// The Cloudways WP origin is slow enough under load (observed 2.5-5.5s for a
// single query, worse under concurrent `next build` workers) that one
// transient timeout would otherwise get permanently baked into a static
// page as a 404. Retry once before giving up.
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidateSeconds: number = REVALIDATE_LIST
): Promise<T | null> {
  const first = await fetchGraphQLOnce<T>(query, variables, revalidateSeconds);
  if (first !== null) return first;
  return fetchGraphQLOnce<T>(query, variables, revalidateSeconds);
}

function mapPost(node: GraphQLPostNode): WPPost {
  const image = node.featuredImage?.node?.sourceUrl;
  const alt = node.featuredImage?.node?.altText || "";

  return {
    id: node.databaseId,
    date: node.date,
    modified: node.modified || node.date,
    slug: node.slug,
    link: node.link,
    title: { rendered: node.title },
    excerpt: { rendered: node.excerpt || "" },
    content: { rendered: node.content || "" },
    _embedded: image
      ? {
          "wp:featuredmedia": [
            {
              source_url: image,
              alt_text: alt,
            },
          ],
        }
      : undefined,
    categories: node.categories?.nodes?.map((category) => ({
      id: category.databaseId,
      name: category.name,
      slug: category.slug,
    })),
  };
}

function mapCategory(node: GraphQLCategoryNode): WPCategory {
  return {
    id: node.databaseId,
    name: node.name,
    slug: node.slug,
    count: node.count || 0,
  };
}

const POST_FIELDS = `
  databaseId
  date
  modified
  slug
  link
  title
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  categories {
    nodes {
      databaseId
      name
      slug
    }
  }
`;

// Same as POST_FIELDS minus `content` — list/card views never render full
// article HTML, so omitting it cuts WordPress response time and payload
// substantially (measured ~3.7x faster, ~9x smaller for a 60-post query).
const POST_LIST_FIELDS = `
  databaseId
  date
  modified
  slug
  link
  title
  excerpt
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  categories {
    nodes {
      databaseId
      name
      slug
    }
  }
`;

export async function getCategories(): Promise<WPCategory[]> {
  const data = await fetchGraphQL<{
    categories: { nodes: GraphQLCategoryNode[] };
  }>(
    `
    query GetCategories {
      categories(first: 50) {
        nodes {
          databaseId
          name
          slug
          count
        }
      }
    }
  `,
    undefined,
    REVALIDATE_CATEGORIES
  );

  const raw = data?.categories.nodes.map(mapCategory) || [];
  return CATEGORY_ORDER.flatMap((def) => {
    const found = raw.find((category) => category.slug === def.slug);
    return found ? [found] : [];
  });
}

export async function getPosts(perPage = 12): Promise<WPPost[]> {
  const data = await fetchGraphQL<{
    posts: { nodes: GraphQLPostNode[] };
  }>(
    `
      query GetPosts($first: Int!) {
        posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            ${POST_LIST_FIELDS}
          }
        }
      }
    `,
    { first: perPage },
    REVALIDATE_LIST
  ) as { posts: { nodes: GraphQLPostNode[] } } | null;

  return data?.posts.nodes.map(mapPost) || [];
}

export async function getPostsByCategory(
  categoryId?: number,
  perPage = 20
): Promise<WPPost[]> {
  if (!categoryId) return getPosts(perPage);

  const data = await fetchGraphQL<{
    posts: { nodes: GraphQLPostNode[] };
  }>(
    `
      query GetPostsByCategory($first: Int!, $categoryId: Int!) {
        posts(
          first: $first
          where: {
            categoryId: $categoryId
            orderby: { field: DATE, order: DESC }
          }
        ) {
          nodes {
            ${POST_LIST_FIELDS}
          }
        }
      }
    `,
    { first: perPage, categoryId },
    REVALIDATE_RELATED
  ) as { posts: { nodes: GraphQLPostNode[] } } | null;

  return data?.posts.nodes.map(mapPost) || [];
}

// Wrapped in React `cache()` so generateMetadata() and the page component
// share one WordPress round trip per request instead of two — the GraphQL
// endpoint uses POST, which Next.js's built-in fetch memoization (GET-only)
// does not deduplicate on its own.
export const getPost = cache(async (id: string): Promise<WPPost | null> => {
  const numericId = Number(id);
  const data = await fetchGraphQL<{
    post: GraphQLPostNode | null;
  }>(
    `
      query GetPost($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ${POST_FIELDS}
        }
      }
    `,
    {
      id: Number.isNaN(numericId) ? id : String(numericId),
      idType: Number.isNaN(numericId) ? "SLUG" : "DATABASE_ID",
    },
    REVALIDATE_POST
  );

  return data?.post ? mapPost(data.post) : null;
});

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8230;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'");
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getFirstImage(post: WPPost): string | null {
  // 1. Check featured image first
  const featured = getFeaturedImage(post);
  if (featured) return featured;

  // 2. If not found, extract from content.rendered
  const content = post.content?.rendered;
  if (content) {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
    const match = imgRegex.exec(content);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function normalizePostHtml(html: string, imageAlt: string): string {
  return html
    .replace(/<h1\b/gi, "<h2")
    .replace(/<\/h1>/gi, "</h2>")
    .replace(/<(img)\b(?![^>]*\balt=)([^>]*)>/gi, `<$1 alt="${imageAlt.replace(/"/g, "&quot;")}"$2>`)
    .replace(/\b(src|href)=(["'])http:\/\//gi, "$1=$2https://");
}

export interface PostHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

// Injects anchor ids into h2/h3 tags for table-of-contents navigation
// without altering the underlying WordPress content.
export function injectHeadingIds(html: string): {
  html: string;
  headings: PostHeading[];
} {
  const headings: PostHeading[] = [];
  const usedIds = new Set<string>();

  const htmlWithIds = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]*>/g, "").trim();
      if (!text) return match;

      const baseId =
        text
          .toLowerCase()
          .replace(/[^\w가-힣\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .slice(0, 50) || `section-${headings.length + 1}`;

      let id = baseId;
      let counter = 1;
      while (usedIds.has(id)) {
        id = `${baseId}-${counter++}`;
      }
      usedIds.add(id);

      headings.push({ id, text, level: Number(level) as 2 | 3 });

      const hasId = /\sid=/i.test(attrs);
      const newAttrs = hasId ? attrs : `${attrs} id="${id}"`;
      return `<h${level}${newAttrs}>${inner}</h${level}>`;
    }
  );

  return { html: htmlWithIds, headings };
}

// Splits post HTML at the first h2/h3 so the intro paragraphs can render
// above the table of contents, matching typical magazine-article layout.
export function splitIntroFromContent(html: string): {
  introHtml: string;
  restHtml: string;
} {
  const match = /<h[23]\b/i.exec(html);
  if (!match || match.index === 0) {
    return { introHtml: "", restHtml: html };
  }
  return {
    introHtml: html.slice(0, match.index),
    restHtml: html.slice(match.index),
  };
}
