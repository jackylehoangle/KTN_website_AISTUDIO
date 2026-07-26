import Link from "next/link";
import { ChevronDown, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNavigation, sectors, siteConfig } from "@/config/site";
import { Logo } from "./logo";
import { MobileNavigation } from "./mobile-navigation";

const sectorColors: Record<string, { dot: string; text: string; bg: string }> = {
  tech: { dot: "bg-cyan", text: "text-cyan-700", bg: "bg-cyan/10" },
  solar: { dot: "bg-orange", text: "text-orange-700", bg: "bg-orange/10" },
  build: { dot: "bg-yellow", text: "text-yellow-700", bg: "bg-yellow/15" },
};

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/95 shadow-[0_4px_25px_rgba(14,35,86,0.08)] backdrop-blur-md">
      {/* Top logo tri-color brand strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan via-orange to-yellow" />
      <div className="site-container flex h-20 items-center justify-between gap-4">
        <Logo priority />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {mainNavigation.map((item) =>
            item.href === "/linh-vuc" ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-navy"
                >
                  {item.label} <ChevronDown className="size-3.5 text-slate-400 transition group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-2xl ring-1 ring-black/5">
                    <div className="mb-2 px-3 pt-1 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                      Ba Lĩnh Vực KTN
                    </div>
                    {sectors.map((sector) => {
                      const color = sectorColors[sector.key] || { dot: "bg-primary", text: "text-primary", bg: "bg-primary/10" };
                      return (
                        <Link
                          key={sector.key}
                          href={sector.href}
                          className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                        >
                          <span className={`mt-1 grid size-3.5 shrink-0 place-items-center rounded-full ${color.dot}`} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-navy group-hover/item:text-primary">
                                {sector.name}
                              </span>
                            </div>
                            <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                              {sector.tagline}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-navy"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="group flex items-center gap-2 text-sm font-bold text-navy transition hover:text-orange"
          >
            <div className="grid size-8 place-items-center rounded-full bg-orange/10 text-orange transition group-hover:bg-orange group-hover:text-white">
              <Phone className="size-4" />
            </div>
            <span>{siteConfig.phoneDisplay}</span>
          </a>
          <a
            href={siteConfig.zaloUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1.5 rounded-xl bg-cyan/10 px-3 py-2 text-xs font-extrabold text-cyan transition hover:bg-cyan hover:text-white"
          >
            <span className="size-2 rounded-full bg-cyan animate-pulse group-hover:bg-white" />
            <span>Chat Zalo</span>
          </a>
          <Button asChild className="bg-orange font-extrabold text-white shadow-md shadow-orange/20 transition-all hover:bg-orange/90 hover:shadow-lg hover:shadow-orange/30">
            <Link href="/lien-he#form-tu-van">
              <Sparkles className="size-4" /> Tư vấn ngay
            </Link>
          </Button>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
