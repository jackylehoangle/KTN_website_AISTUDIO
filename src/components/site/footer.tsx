import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { mainNavigation, sectors, siteConfig } from "@/config/site";
import { Logo } from "./logo";
import { VisitorCounter } from "./visitor-counter";

export function SiteFooter() {
  return (
    <footer className="relative bg-[#0E2356] text-white overflow-hidden">
      {/* Top logo tri-color accent strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan via-orange to-yellow" />

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-0 top-0 size-96 rounded-full bg-cyan/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-96 rounded-full bg-orange/5 blur-3xl" aria-hidden="true" />

      <div className="site-container relative grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_.65fr_.8fr_1.3fr]">
        <div className="space-y-5">
          <Logo footer />
          <p className="max-w-sm text-sm leading-7 text-slate-300">
            Công ty Cổ phần Công nghệ Năng lượng và Xây dựng KTN kết nối ba mảng giải pháp
            đồng bộ: <strong className="text-cyan">Công nghệ</strong>, <strong className="text-orange">Năng lượng</strong> và <strong className="text-yellow">Xây dựng &amp; Cải tạo</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan/20 px-3.5 py-2 text-xs font-bold text-cyan border border-cyan/30 transition hover:bg-cyan hover:text-white"
            >
              <MessageCircle className="size-4" />
              <span>Chat Zalo ngay</span>
            </a>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3.5 py-2 text-xs text-slate-300 border border-white/10">
              <ShieldCheck className="size-4 text-orange shrink-0" />
              <span>Minh bạch &amp; Thực tế</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan">
            Điều hướng
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan">
            Lĩnh vực KTN
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {sectors.map((sector) => (
              <li key={sector.key}>
                <Link href={sector.href} className="flex items-center gap-2 transition hover:text-white">
                  <span className={`size-2 rounded-full ${sector.key === "tech" ? "bg-cyan" : sector.key === "solar" ? "bg-orange" : "bg-yellow"}`} />
                  <span>{sector.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan">
              Thông tin liên hệ
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-yellow" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex flex-wrap gap-4">
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 transition hover:text-white font-semibold text-white">
                  <Phone className="size-4 text-orange" />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
                <a href={siteConfig.zaloUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan font-semibold transition hover:underline">
                  <MessageCircle className="size-4" />
                  <span>Zalo KTN</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 transition hover:text-white">
                  <Mail className="size-4 text-cyan" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Visitor Counter Widget */}
          <VisitorCounter />
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="site-container flex flex-col gap-3 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KTN. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6">
            <Link href="/chinh-sach-bao-mat" className="transition hover:text-white">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="transition hover:text-white">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
