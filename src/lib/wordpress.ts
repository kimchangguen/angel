const WP_URL =
  process.env.WP_URL || "https://wordpress-1580849-6411598.cloudwaysapps.com/graphql";

const WP_GRAPHQL_URL = WP_URL.endsWith("/graphql")
  ? WP_URL
  : `${WP_URL.replace(/\/$/, "")}/graphql`;

export interface WPPost {
  id: number;
  date: string;
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

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // 실시간 데이터 연동
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

function mapPost(node: GraphQLPostNode): WPPost {
  const image = node.featuredImage?.node?.sourceUrl;
  const alt = node.featuredImage?.node?.altText || "";

  return {
    id: node.databaseId,
    date: node.date,
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

export async function getCategories(): Promise<WPCategory[]> {
  const data = await fetchGraphQL<{
    categories: { nodes: GraphQLCategoryNode[] };
  }>(`
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
  `);

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
            ${POST_FIELDS}
          }
        }
      }
    `,
    { first: perPage }
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
            ${POST_FIELDS}
          }
        }
      }
    `,
    { first: perPage, categoryId }
  ) as { posts: { nodes: GraphQLPostNode[] } } | null;

  return data?.posts.nodes.map(mapPost) || [];
}

export async function getPost(id: string): Promise<WPPost | null> {
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
    }
  );

  return data?.post ? mapPost(data.post) : null;
}

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

