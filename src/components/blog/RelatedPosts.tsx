import Link from "next/link";
import Image from "next/image";
import { WPPost, getFeaturedImage, decodeHtmlEntities, formatDate } from "@/lib/wordpress";

interface RelatedPostsProps {
  posts: WPPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-stone-100">
      <h2 className="text-base md:text-lg font-bold text-stone-900 mb-6">
        관련 글
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
        {posts.map((post) => {
          const title = decodeHtmlEntities(post.title.rendered);
          const categoryName = post.categories?.[0]?.name || "블로그";

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm border border-stone-100 bg-stone-50 mb-3">
                <Image
                  src={getFeaturedImage(post) || "/image/02aa (1).png"}
                  alt={title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
              </div>
              <span className="inline-block w-fit bg-amber-400 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-sm mb-2">
                {categoryName}
              </span>
              <h3 className="text-sm font-semibold text-stone-800 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors mb-1.5">
                {title}
              </h3>
              <span className="text-xs text-stone-400">
                {formatDate(post.date)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
