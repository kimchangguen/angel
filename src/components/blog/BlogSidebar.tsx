import Link from "next/link";
import Image from "next/image";
import { WPPost, getFeaturedImage, decodeHtmlEntities, formatDate } from "@/lib/wordpress";

interface RecentPost {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
}

const MOCK_RECENT_POSTS: RecentPost[] = [
  {
    id: 1,
    title: "유품정리 전 꼭 확인해야 할 3가지 필수 절차와 주의사항",
    date: "2026년 5월 20일",
    image: "/image/02aa (1).png",
    slug: "test",
  },
  {
    id: 2,
    title: "화재 현장 및 악취 제거를 위한 특수청소 전문 장비와 정화 과정",
    date: "2026년 5월 19일",
    image: "/image/02aa (2).png",
    slug: "test-3",
  },
  {
    id: 3,
    title: "고독사 청소 및 유품 정리업체 선정 시 반드시 비교해야 할 체크리스트",
    date: "2026년 5월 18일",
    image: "/image/02aa (3).png",
    slug: "test-2",
  },
  {
    id: 4,
    title: "부모님 집 정리, 스트레스 없이 수월하게 끝내는 유품 정리 노하우",
    date: "2026년 5월 17일",
    image: "/image/02aa (5).png",
    slug: "post-4",
  },
  {
    id: 5,
    title: "쓰레기 집 특수청소, 비대면 진행 서비스의 장점과 안심 조치 사항",
    date: "2026년 5월 16일",
    image: "/image/02aa (6).png",
    slug: "post-5",
  },
];

interface BlogSidebarProps {
  recentPosts?: WPPost[];
}

export default function BlogSidebar({ recentPosts = [] }: BlogSidebarProps) {
  // Map real recent posts to RecentPost structure
  const displayPosts: RecentPost[] = recentPosts.length > 0
    ? recentPosts.slice(0, 5).map((post) => ({
        id: post.id,
        title: decodeHtmlEntities(post.title.rendered),
        date: formatDate(post.date),
        image: getFeaturedImage(post) || "/image/02aa (1).png",
        slug: post.slug,
      }))
    : MOCK_RECENT_POSTS;

  return (
    <aside className="w-full lg:w-[320px] flex flex-col gap-6">
      {/* Consultation banner card */}
      <div className="relative w-full rounded-lg overflow-hidden border border-stone-200/80 bg-white shadow-sm flex flex-col">
        {/* Background visual with female portrait */}
        <div className="relative w-full h-[220px]">
          <Image
            src="/image/03aa.png"
            alt="상담 신청 안내"
            fill
            sizes="320px"
            priority
            className="object-cover"
          />
        </div>

        {/* Button */}
        <div className="p-4 bg-white">
          <Link
            href="/estimate"
            className="block w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs md:text-sm text-center rounded transition-all duration-200 shadow hover:shadow-md active:scale-[0.99]"
          >
            촬영 문의하기
          </Link>
        </div>
      </div>

      {/* Recent posts card */}
      <div className="w-full rounded-lg border border-stone-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
          <h3 className="text-sm font-bold text-stone-800 tracking-tight">
            최근 글
          </h3>
          <span className="text-[10px] text-stone-400 font-light">최신</span>
        </div>

        <div className="flex flex-col gap-4">
          {displayPosts.map((post) => (
            <Link
              key={`${post.id}-${post.slug}`}
              href={`/blog/${post.slug}`}
              className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
            >
              {/* Thumbnail */}
              <div className="relative w-[70px] h-[55px] rounded overflow-hidden flex-shrink-0 border border-stone-100 bg-stone-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="70px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-stone-800 line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h4>
                <span className="text-[10px] text-stone-400 font-light mt-1 block">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
