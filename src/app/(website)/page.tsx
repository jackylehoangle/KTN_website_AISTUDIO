import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Compass,
  Handshake,
  Layers3,
  MonitorCog,
  ShieldCheck,
  SunMedium,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { EmptyState } from "@/components/site/empty-state";
import { PostCard } from "@/components/site/post-card";
import { ProjectCard } from "@/components/site/project-card";
import { getPublishedPosts, getPublishedProjects } from "@/lib/data/public-content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Công nghệ, Năng lượng & Xây dựng",
  description:
    "Website chính thức của KTN: Giải pháp công nghệ số, điện mặt trời, xây dựng và cải tạo cho doanh nghiệp và gia đình.",
  path: "/",
});

export const revalidate = 300;

const steps = [
  {
    number: "01",
    title: "Tiếp nhận & Hiểu nhu cầu",
    description: "Lắng nghe mục tiêu, khảo sát hiện trạng và xác định bài toán cần giải quyết của khách hàng.",
    tag: "Khảo sát thực tế",
    color: "cyan",
  },
  {
    number: "02",
    title: "Khảo sát & Đề xuất phương án",
    description: "Làm rõ phạm vi công việc, tư vấn giải pháp tối ưu chi phí và dự toán nguồn lực thực hiện.",
    tag: "Phạm vi rõ ràng",
    color: "orange",
  },
  {
    number: "03",
    title: "Triển khai & Giám sát chất lượng",
    description: "Tổ chức thi công/phát triển theo kế hoạch, cập nhật tiến độ liên tục và quản lý đầu mối thống nhất.",
    tag: "Đúng tiến độ",
    color: "amber",
  },
  {
    number: "04",
    title: "Bàn giao & Hỗ trợ lâu dài",
    description: "Nghiệm thu thực tế, hướng dẫn bàn giao chi tiết và duy trì kênh hỗ trợ đồng hành bền vững.",
    tag: "Đồng hành 24/7",
    color: "navy",
  },
];

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getPublishedProjects({ limit: 3 }),
    getPublishedPosts(3),
  ]);

  return (
    <>
      {/* 1. HERO SECTION - NEW ASYMMETRIC DASHBOARD CANVAS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0B1A3E] to-[#0E2356] pt-10 pb-20 text-white">
        {/* Glow ambient background elements */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-[550px] rounded-full bg-cyan/15 blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-1/4 size-[500px] rounded-full bg-orange/15 blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 size-[400px] rounded-full bg-yellow/15 blur-[100px]" aria-hidden="true" />

        <div className="site-container relative py-6 text-center lg:py-10">
          <div className="mx-auto max-w-4xl space-y-6">
            <h1 className="text-balance text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-[4rem]">
              Giải Pháp Công Nghệ, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan via-amber-300 to-orange bg-clip-text text-transparent">
                Năng Lượng &amp; Xây Dựng
              </span> <br />
              Toàn Diện &amp; Thực Tế
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Công ty Cổ phần Công nghệ Năng lượng và Xây dựng KTN hợp nhất các giải pháp chuyên sâu,
              giúp doanh nghiệp và gia đình tối ưu hóa vận hành, năng lượng sạch và nâng tầm hạ tầng công trình.
            </p>

            {/* Quick Guarantees Grid */}
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 pt-4 text-xs font-bold text-slate-300 sm:grid-cols-4 sm:gap-4">
              {[
                { text: "Tiếp cận nhu cầu thực tế", color: "text-cyan" },
                { text: "Phạm vi công việc minh bạch", color: "text-orange" },
                { text: "Giải pháp đồng bộ 3 mảng", color: "text-yellow" },
                { text: "Hỗ trợ lâu dài sau bàn giao", color: "text-emerald-400" },
              ].map(({ text, color }) => (
                <div key={text} className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-md">
                  <CheckCircle2 className={`size-4 ${color} shrink-0`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS HIGHLIGHT STRIP */}
        <div className="site-container relative mt-16">
          <div className="grid grid-cols-1 gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:grid-cols-3 md:p-8">
            <div className="flex items-center gap-4 sm:border-r border-white/10 sm:pr-6">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-cyan/20 text-cyan">
                <Layers3 className="size-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">03</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Lĩnh vực chuyên sâu</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:border-r border-white/10 sm:px-6">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-orange/20 text-orange">
                <ClipboardCheck className="size-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Phạm vi rõ ràng</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:pl-6">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-yellow/20 text-yellow">
                <Handshake className="size-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Phản hồi &amp; Đồng hành</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RESTRUCTURED BENTO GRID SECTION: 3 SECTOR OVERVIEW */}
      <section className="section-shell bg-slate-50">
        <div className="site-container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Lĩnh vực hoạt động</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
                Ba lĩnh vực – Một năng lực kết nối đồng bộ
              </h2>
            </div>
            <Button asChild variant="outline" className="border-slate-300 font-extrabold text-navy hover:bg-slate-200">
              <Link href="/linh-vuc">Xem chi tiết dịch vụ <ArrowRight className="size-4" /></Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Bento Card 1: Công nghệ */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-cyan/30 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1.5 hover:border-cyan hover:shadow-2xl">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-cyan/10 blur-xl" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-cyan text-white shadow-md shadow-cyan/30">
                    <MonitorCog className="size-7" />
                  </div>
                  <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-cyan">
                    Giải pháp công nghệ
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-navy">Công nghệ</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tư vấn, xây dựng website doanh nghiệp, ứng dụng quản lý và chuyển đổi số quy trình vận hành tối ưu.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-cyan" /> Website &amp; Web App doanh nghiệp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-cyan" /> Phần mềm quản lý quy trình
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-cyan" /> Tự động hóa &amp; Tích hợp hệ thống
                  </li>
                </ul>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-4">
                <Link href="/linh-vuc/ktn-tech" className="inline-flex items-center gap-2 text-sm font-extrabold text-cyan hover:underline">
                  Tìm hiểu Công nghệ <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Bento Card 2: Năng lượng */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-orange/30 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1.5 hover:border-orange hover:shadow-2xl">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-orange/10 blur-xl" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-orange text-white shadow-md shadow-orange/30">
                    <SunMedium className="size-7" />
                  </div>
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-orange">
                    Điện mặt trời
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-navy">Năng lượng</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Khảo sát, thiết kế và lắp đặt hệ thống điện mặt trời mái nhà cho hộ gia đình và nhà xưởng doanh nghiệp.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-orange" /> Điện mặt trời mái nhà gia đình
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-orange" /> Điện mặt trời doanh nghiệp, nhà xưởng
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-orange" /> Bảo trì &amp; Tối ưu hiệu suất pin
                  </li>
                </ul>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-4">
                <Link href="/linh-vuc/ktn-solar" className="inline-flex items-center gap-2 text-sm font-extrabold text-orange hover:underline">
                  Tìm hiểu Năng lượng <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Xây dựng và cải tạo */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-yellow/40 bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1.5 hover:border-yellow-500 hover:shadow-2xl md:col-span-2 lg:col-span-1">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-yellow/20 blur-xl" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-yellow text-amber-900 font-bold shadow-md shadow-yellow/30">
                    <Building2 className="size-7" />
                  </div>
                  <span className="rounded-full bg-yellow/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-900">
                    Thi công &amp; Cải tạo
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-navy">Xây dựng và cải tạo</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Thi công, cải tạo nâng cấp không gian nhà ở, văn phòng và hạ tầng kỹ thuật với tiến độ chuẩn xác.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-bold text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-yellow-500" /> Thi công nhà ở &amp; Văn phòng
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-yellow-500" /> Cải tạo &amp; Sửa chữa công trình
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-yellow-500" /> Thi công hạ tầng kỹ thuật
                  </li>
                </ul>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-4">
                <Link href="/linh-vuc/ktn-build" className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-800 hover:underline">
                  Tìm hiểu Xây dựng &amp; Cải tạo <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUES & PRINCIPLES BENTO GRID */}
      <section className="section-shell bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker">Triết lý hành động</p>
            <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
              Nguyên tắc làm việc của KTN
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              KTN không theo đuổi việc làm tất cả mọi thứ, mà tập trung làm thật tốt những cam kết
              với khách hàng. Sự cẩn trọng, thực tế và minh bạch là nền tảng cốt lõi trong mọi dự án.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild className="bg-navy font-bold text-white hover:bg-navy/90">
                <Link href="/gioi-thieu">Tìm hiểu về KTN <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                Icon: Compass,
                title: "Thực tế",
                text: "Xuất phát từ nhu cầu và điều kiện thật của từng khách hàng, không tư vấn dư thừa.",
                color: "text-cyan bg-cyan/10 border-cyan/30 hover:border-cyan",
              },
              {
                Icon: ClipboardCheck,
                title: "Rõ ràng",
                text: "Làm rõ phạm vi, chi phí và thời gian bàn giao ngay từ giai đoạn đầu tiên.",
                color: "text-orange bg-orange/10 border-orange/30 hover:border-orange",
              },
              {
                Icon: Layers3,
                title: "Đồng bộ",
                text: "Kết nối nhịp nhàng giữa công nghệ, năng lượng và xây dựng trong cùng một đầu mối.",
                color: "text-amber-900 bg-yellow/20 border-yellow/40 hover:border-yellow-500",
              },
              {
                Icon: Handshake,
                title: "Đồng hành",
                text: "Giữ kênh trao đổi xuyên suốt và hỗ trợ kĩ thuật tận tâm sau khi nghiệm thu.",
                color: "text-navy bg-navy/10 border-navy/30 hover:border-navy",
              },
            ].map(({ Icon, title, text, color }) => (
              <div
                key={title}
                className={`group rounded-3xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${color}`}
              >
                <div className="grid size-12 place-items-center rounded-2xl font-bold transition group-hover:scale-110">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW PIPELINE */}
      <section className="section-shell bg-slate-50">
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker justify-center">Cách làm việc</p>
            <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
              Quy trình 4 bước chuẩn hóa
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Minh bạch từng giai đoạn để khách hàng luôn chủ động và an tâm kiểm soát tiến độ.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => {
              const borderStyles = [
                "border-cyan/40 hover:border-cyan",
                "border-orange/40 hover:border-orange",
                "border-yellow/50 hover:border-yellow-500",
                "border-navy/40 hover:border-navy",
              ][idx];

              const badgeStyles = [
                "bg-cyan/10 text-cyan",
                "bg-orange/10 text-orange",
                "bg-yellow/20 text-amber-900",
                "bg-navy/10 text-navy",
              ][idx];

              return (
                <div
                  key={step.number}
                  className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${borderStyles}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-black text-navy">{step.number}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${badgeStyles}`}>
                        {step.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS ON DARK NAVY CANVAS */}
      <section className="relative overflow-hidden bg-[#0E2356] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute left-0 top-0 size-96 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 bottom-0 size-96 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />

        <div className="site-container relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker !text-cyan">Dự án thực tế</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold sm:text-4xl">
                Công trình &amp; Giải pháp đã triển khai
              </h2>
            </div>
            <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-navy font-bold">
              <Link href="/du-an">Xem tất cả dự án <ArrowRight className="size-4" /></Link>
            </Button>
          </div>

          <div className="mt-10">
            {projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-6 text-slate-800">
                <EmptyState
                  title="Chưa đăng dự án"
                  description="Dự án thực tế sẽ được hiển thị sau khi KTN xuất bản trong hệ thống."
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. NEWS & MAP COMBINED SECTION */}
      <section className="section-shell bg-slate-50">
        <div className="site-container space-y-16">
          {/* News Subsection */}
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker">Tin tức &amp; Hoạt động</p>
                <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">
                  Thông tin mới nhất từ KTN
                </h2>
              </div>
              <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-navy">
                Xem tất cả bài viết <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8">
              {posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Chưa có bài viết"
                  description="Bài viết sẽ hiển thị sau khi được phát hành trong hệ thống."
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTEGRATED CONSULTATION HUB */}
      <section id="tu-van" className="section-shell bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div className="space-y-6">
            <div>
              <p className="section-kicker">Kết nối trực tiếp</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
                Gửi yêu cầu – KTN tư vấn tận tâm
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Hãy chia sẻ sơ bộ nhu cầu của anh/chị. Đội ngũ KTN sẽ liên hệ trực tiếp để tư vấn,
                khảo sát và lập phương án phù hợp.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
              <h3 className="font-extrabold text-navy">Cam kết bảo mật thông tin:</h3>
              <ul className="mt-3 space-y-2.5 text-xs font-bold text-slate-600">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-cyan shrink-0" />
                  <span>Thông tin đăng ký được bảo mật tuyệt đối</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock3 className="size-4 text-orange shrink-0" />
                  <span>Tư vấn &amp; Khảo sát không phát sinh chi phí</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Container */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-9">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-orange">Hỗ trợ trực tiếp</span>
                <h3 className="mt-0.5 text-2xl font-extrabold text-navy">Gửi thông tin tư vấn</h3>
              </div>
              <div className="h-2 w-20 rounded-full bg-gradient-to-r from-cyan via-orange to-yellow" />
            </div>
            <LeadForm source="homepage" />
          </div>
        </div>
      </section>
    </>
  );
}
