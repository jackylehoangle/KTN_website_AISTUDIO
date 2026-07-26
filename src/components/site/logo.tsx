import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  priority?: boolean;
  footer?: boolean;
}

export function Logo({ className, priority = false, footer = false }: LogoProps) {
  if (footer) {
    return (
      <Link
        href="/"
        aria-label="KTN - Về trang chủ"
        className={cn(
          "group inline-flex items-center gap-3.5 rounded-2xl border border-white/15 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-2.5 pr-4 transition duration-300 hover:border-cyan/50 hover:bg-white/15 shadow-xl shadow-black/20",
          className
        )}
      >
        <div className="relative h-12 w-32 shrink-0 rounded-xl bg-white p-1.5 shadow-md transition group-hover:scale-105">
          <Image
            src={siteConfig.logo}
            alt="KTN Tech - Solar - Build"
            fill
            sizes="128px"
            className="object-contain p-1"
            priority={priority}
          />
        </div>
        <div className="flex flex-col justify-center border-l border-white/15 pl-3">
          <span className="text-base font-black tracking-wider text-white">KTN</span>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-cyan" title="KTN Tech" />
            <span className="size-2 rounded-full bg-orange" title="KTN Solar" />
            <span className="size-2 rounded-full bg-yellow" title="KTN Build" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">JSC</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="KTN - Về trang chủ"
      className={cn(
        "relative block h-14 w-[152px] shrink-0 overflow-hidden transition-all hover:opacity-90",
        className
      )}
    >
      <Image
        src={siteConfig.logo}
        alt="KTN Tech - Solar - Build"
        fill
        sizes="152px"
        className="object-contain"
        priority={priority}
      />
    </Link>
  );
}
