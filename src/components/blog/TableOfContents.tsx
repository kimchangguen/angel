import { PostHeading } from "@/lib/wordpress";

interface TableOfContentsProps {
  headings: PostHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="mb-10 rounded-sm border border-stone-200 bg-white overflow-hidden"
    >
      <div className="bg-[#fff9e8] px-4 py-2.5 border-b border-stone-200">
        <span className="text-xs font-bold text-stone-800 tracking-tight">
          목차
        </span>
      </div>
      <ul className="px-4 py-3.5 flex flex-col gap-2.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="text-orange-600 hover:underline underline-offset-2 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
