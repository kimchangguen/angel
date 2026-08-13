import { SITE } from "@/lib/site";

interface AuthorBoxProps {
  categoryName: string;
  dateFormatted: string;
}

export default function AuthorBox({ categoryName, dateFormatted }: AuthorBoxProps) {
  return (
    <div className="mt-10 pt-6 border-t border-stone-100 flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm flex-shrink-0">
        유
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-stone-800">{SITE.name}</p>
        <p className="text-xs text-stone-500 truncate">
          {categoryName} 전문 · {dateFormatted}
        </p>
      </div>
    </div>
  );
}
