import Link from "next/link";
import { ArrowUpRight, Building2, MonitorCog, SunMedium } from "lucide-react";
import { sectors } from "@/config/site";
import { cn } from "@/lib/utils";

const visual = {
  tech: {
    icon: MonitorCog,
    card: "border-cyan/30 bg-gradient-to-br from-cyan/[0.06] via-white to-blue-50/50 hover:border-cyan hover:shadow-[0_15px_35px_rgba(47,168,215,0.18)]",
    iconWrap: "bg-cyan text-white shadow-md shadow-cyan/25",
    badge: "bg-cyan/15 text-cyan-800 border-cyan/30",
    line: "bg-cyan",
    actionText: "text-cyan-700 group-hover:text-cyan-900",
  },
  solar: {
    icon: SunMedium,
    card: "border-orange/30 bg-gradient-to-br from-orange/[0.06] via-white to-amber-50/50 hover:border-orange hover:shadow-[0_15px_35px_rgba(240,90,10,0.18)]",
    iconWrap: "bg-orange text-white shadow-md shadow-orange/25",
    badge: "bg-orange/15 text-orange-800 border-orange/30",
    line: "bg-orange",
    actionText: "text-orange-700 group-hover:text-orange-900",
  },
  build: {
    icon: Building2,
    card: "border-yellow-500/40 bg-gradient-to-br from-yellow/[0.10] via-white to-amber-50/40 hover:border-yellow-500 hover:shadow-[0_15px_35px_rgba(246,185,22,0.22)]",
    iconWrap: "bg-yellow text-navy shadow-md shadow-yellow/30",
    badge: "bg-yellow/20 text-amber-900 border-yellow/40",
    line: "bg-yellow",
    actionText: "text-amber-800 group-hover:text-amber-950",
  },
};

export function SectorCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {sectors.map((sector) => {
        const style = visual[sector.key as keyof typeof visual];
        const Icon = style.icon;
        return (
          <Link
            key={sector.key}
            href={sector.href}
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-1.5",
              style.card,
            )}
          >
            {/* Top sector badge and icon */}
            <div>
              <div className="flex items-center justify-between">
                <div className={cn("grid size-13 place-items-center rounded-2xl transition duration-300 group-hover:scale-105", style.iconWrap)}>
                  <Icon className="size-6" />
                </div>
                <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wider", style.badge)}>
                  {sector.name}
                </span>
              </div>
              <div className={cn("mt-6 h-1 w-14 rounded-full transition-all duration-300 group-hover:w-20", style.line)} />
              <h3 className="mt-5 text-2xl font-extrabold text-navy">{sector.name}</h3>
              <p className="mt-1.5 text-base font-bold text-slate-800">{sector.tagline}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{sector.description}</p>
            </div>

            <div className="mt-8 border-t border-slate-200/60 pt-4">
              <span className={cn("inline-flex items-center gap-2 text-sm font-extrabold transition-all", style.actionText)}>
                Khám phá giải pháp <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
