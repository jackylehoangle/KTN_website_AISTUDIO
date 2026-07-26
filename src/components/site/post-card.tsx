import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import type { PostWithCover } from "@/lib/data/public-content";

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export function PostCard({ post }: { post: PostWithCover }) {
  const date = formatDate(post.published_at || post.created_at);

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/50 hover:shadow-xl hover:shadow-cyan/5">
      <div>
        <Link href={`/tin-tuc/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
          {post.cover_url ? (
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-items-center bg-gradient-to-br from-[#0E2356] via-primary to-[#2FA8D7] text-white/80">
              <Newspaper className="size-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
        <div className="p-6">
          {date && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan/10 px-2.5 py-1 text-xs font-bold text-cyan-800">
                <CalendarDays className="size-3 text-cyan" /> {date}
              </span>
            </div>
          )}
          <h3 className="mt-3 line-clamp-2 text-lg font-extrabold leading-snug text-navy transition group-hover:text-primary">
            <Link href={`/tin-tuc/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <Link
          href={`/tin-tuc/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-primary transition-all group-hover:text-cyan"
        >
          Đọc bài viết <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
