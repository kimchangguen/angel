import Link from "next/link";
import { WPPost, decodeHtmlEntities } from "@/lib/wordpress";

interface PostNavigationProps {
  prevPost: WPPost | null;
  nextPost: WPPost | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav
      aria-label="이전글 다음글"
      className="mt-10 pt-5 border-t border-stone-100 flex items-center justify-between gap-4 text-xs md:text-sm"
    >
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="flex items-center gap-1.5 min-w-0 text-stone-600 hover:text-orange-600 transition-colors"
        >
          <span className="flex-shrink-0">‹</span>
          <span className="truncate">{decodeHtmlEntities(prevPost.title.rendered)}</span>
        </Link>
      ) : (
        <span />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="flex items-center gap-1.5 min-w-0 text-stone-600 hover:text-orange-600 transition-colors text-right justify-end"
        >
          <span className="truncate">{decodeHtmlEntities(nextPost.title.rendered)}</span>
          <span className="flex-shrink-0">›</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
