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

const MOCK_A_POSTS: CategoryPost[] = [
  {
    id: 11,
    title: "유품정리 수거 품목 및 현장 무료 견적 안내",
    date: "2026년 5월 18일",
    image: "/image/02aa (1).png",
    slug: "test",
  },
  {
    id: 12,
    title: "가족을 잃은 슬픔 속, 신속하고 경건한 유품정리 모범 진행 과정",
    date: "2026년 5월 18일",
    image: "/image/02aa (2).png",
    slug: "post-12",
  },
];

const MOCK_B_POSTS: CategoryPost[] = [
  {
    id: 21,
    title: "악취 및 오염 현장 복원을 위한 긴급 특수청소 가이드",
    date: "2026년 5월 19일",
    image: "/image/02aa (3).png",
    slug: "test-3",
  },
  {
    id: 22,
    title: "화재 현장 그을음 제거 및 유독 성분 정화 세척 기법",
    date: "2026년 5월 19일",
    image: "/image/02aa (5).png",
    slug: "post-22",
  },
];

const MOCK_C_POSTS: CategoryPost[] = [
  {
    id: 31,
    title: "유품 정리 시 귀중품(통장, 등기권리증 등) 찾기와 안전 보관법",
    date: "2026년 5월 19일",
    image: "/image/02aa (6).png",
    slug: "test-2",
  },
  {
    id: 32,
    title: "고독사 예방을 위한 지역사회 돌봄 서비스와 지원 정책 요약",
    date: "2026년 5월 18일",
    image: "/image/03aa.png",
    slug: "post-32",
  },
];

const MOCK_D_POSTS: CategoryPost[] = [
  {
    id: 41,
    title: "장기 방치된 시골 빈집 정리 및 특이 오염 현장 폐기물 처리 요약",
    date: "2026년 5월 19일",
    image: "/image/05aa.png",
    slug: "test-4",
  },
  {
    id: 42,
    title: "반려동물 사후 거주지 탈취 소독 및 알레르기 유발 물질 청소 사례",
    date: "2026년 5월 18일",
    image: "/image/hero (1).png",
    slug: "post-42",
  },
];

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
    </div>
  );
}

interface CategoryGridProps {
  postsGroupedBySlug?: Record<string, WPPost[]>;
}

export default function CategoryGrid({ postsGroupedBySlug = {} }: CategoryGridProps) {
  
  // Helper to map and merge posts with fallbacks
  const getCategoryPosts = (slug: string, mockPosts: CategoryPost[]): CategoryPost[] => {
    const realPosts = postsGroupedBySlug[slug];
    if (!realPosts || realPosts.length === 0) return mockPosts;
    
    // Map real posts and pad with mock posts if less than 2
    const mappedReal: CategoryPost[] = realPosts.slice(0, 4).map((post) => ({
      id: post.id,
      title: decodeHtmlEntities(post.title.rendered),
      date: formatDate(post.date),
      image: getFeaturedImage(post) || "/image/02aa (1).png",
      slug: post.slug,
    }));

    if (mappedReal.length >= 2) {
      return mappedReal;
    }

    // Pad with mock items that are not already present (checking by slug just in case)
    const padded = [...mappedReal];
    for (const mock of mockPosts) {
      if (padded.length >= 2) break;
      if (!padded.some((p) => p.slug === mock.slug)) {
        padded.push(mock);
      }
    }
    return padded;
  };

  const aPosts = getCategoryPosts("a", MOCK_A_POSTS);
  const bPosts = getCategoryPosts("b", MOCK_B_POSTS);
  const cPosts = getCategoryPosts("c", MOCK_C_POSTS);
  const dPosts = getCategoryPosts("d", MOCK_D_POSTS);

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
