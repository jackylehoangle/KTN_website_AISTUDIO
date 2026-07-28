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
  Zap,
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
  },
  {
    number: "02",
    title: "Khảo sát & Đề xuất phương án",
    description: "Làm rõ phạm vi công việc, tư vấn giải pháp tối ưu chi phí và dự toán nguồn lực thực hiện.",
    tag: "Phạm vi rõ ràng",
  },
  {
    number: "03",
    title: "Triển khai & Giám sát chất lượng",
    description: "Tổ chức thi công/phát triển theo kế hoạch, cập nhật tiến độ liên tục và quản lý đầu mối thống nhất.",
    tag: "Đúng tiến độ",
  },
  {
    number: "04",
    title: "Bàn giao & Hỗ trợ lâu dài",
    description: "Nghiệm thu thực tế, hướng dẫn bàn giao chi tiết và duy trì kênh hỗ trợ đồng hành bền vững.",
    tag: "Đồng hành 24/7",
  },
];

const stepColors = [
  { num: "text-cyan", badge: "bg-cyan/10 text-cyan", bar: "bg-cyan" },
  { num: "text-orange", badge: "bg-orange/10 text-orange", bar: "bg-orange" },
  { num: "text-yellow", badge: "bg-yellow/20 text-amber-800", bar: "bg-yellow" },
  { num: "text-navy", badge: "bg-navy/10 text-navy", bar: "bg-navy" },
];

const coreValues = [
  {
    Icon: ShieldCheck,
    number: "01",
    title: "Trung thực",
    description:
      "Tư vấn dựa trên hiện trạng và nhu cầu thật của khách hàng; nói rõ phần làm được, giới hạn và điều kiện thực hiện — không hứa quá để lấy lòng tin trước mắt.",
    circleBg: "bg-navy",
    circleShadow: "shadow-slate-900/25",
    iconColor: "text-white",
    bar: "bg-navy",
    glow: "bg-navy/8",
  },
  {
    Icon: ClipboardCheck,
    number: "02",
    title: "Trách nhiệm",
    description:
      "Theo sát công việc đã nhận từ đầu đến khi bàn giao, chủ động phối hợp và chịu trách nhiệm trong đúng phạm vi đã cam kết.",
    circleBg: "bg-cyan",
    circleShadow: "shadow-cyan/30",
    iconColor: "text-white",
    bar: "bg-cyan",
    glow: "bg-cyan/8",
  },
  {
    Icon: Compass,
    number: "03",
    title: "Thực tế",
    description:
      "Ưu tiên giải pháp phù hợp với nguồn lực và điều kiện thật, có thể triển khai và vận hành lâu dài — thay vì chạy theo hình thức hay xu hướng nhất thời.",
    circleBg: "bg-orange",
    circleShadow: "shadow-orange/30",
    iconColor: "text-white",
    bar: "bg-orange",
    glow: "bg-orange/8",
  },
  {
    Icon: Handshake,
    number: "04",
    title: "Hợp tác",
    description:
      "Tôn trọng khách hàng, đối tác và người trực tiếp thực hiện; lấy sự rõ ràng làm nền tảng để phối hợp lâu dài, không chỉ cho một lần giao dịch.",
    circleBg: "bg-yellow",
    circleShadow: "shadow-yellow/30",
    iconColor: "text-amber-950",
    bar: "bg-yellow",
    glow: "bg-yellow/15",
  },
  {
    Icon: Zap,
    number: "05",
    title: "Năng động",
    description:
      "Chủ động cập nhật công nghệ, cách làm mới và phản hồi nhanh với nhu cầu khách hàng; không rập khuôn theo lối cũ khi điều đó không còn phù hợp.",
    circleBg: "bg-gradient-to-br from-cyan to-orange",
    circleShadow: "shadow-cyan/20",
    iconColor: "text-white",
    bar: "bg-gradient-to-r from-cyan to-orange",
    glow: "bg-cyan/8",
  },
];

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getPublishedProjects({ limit: 3 }),
    getPublishedPosts(3),
  ]);

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="site-container py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Left: Identity & CTA */}
            <div>
              <h1 className="text-balance text-5xl font-black leading-[1.1] tracking-tight text-navy lg:text-[3.75rem]">
                Công nghệ.<br />
                <span className="text-orange">Năng lượng.</span><br />
                Xây dựng.<br />
                <span className="text-2xl font-bold text-slate-400 lg:text-3xl">— Đồng bộ &amp; Thực tế.</span>
              </h1>

              <div className="mt-6 flex gap-1.5">
                <span className="h-1 w-20 rounded-full bg-cyan" />
                <span className="h-1 w-10 rounded-full bg-orange" />
                <span className="h-1 w-10 rounded-full bg-yellow" />
              </div>

              <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">
                Hợp nhất ba lĩnh vực chuyên sâu, giúp doanh nghiệp và gia đình tối ưu vận hành,
                khai thác năng lượng sạch và nâng tầm hạ tầng công trình — trong cùng một đầu mối tin cậy.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-orange font-bold text-white shadow-lg shadow-orange/25 hover:bg-orange/90">
                  <Link href="/lien-he#form-tu-van">
                    Nhận tư vấn miễn phí <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-navy/30 font-bold text-navy hover:bg-navy hover:text-white">
                  <Link href="/linh-vuc">Khám phá dịch vụ</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  { text: "Phạm vi minh bạch", cls: "bg-cyan/10 text-cyan" },
                  { text: "Tư vấn thực tế", cls: "bg-orange/10 text-orange" },
                  { text: "Hỗ trợ 24/7", cls: "bg-yellow/20 text-amber-800" },
                  { text: "Đầu mối thống nhất", cls: "bg-navy/10 text-navy" },
                ].map(({ text, cls }) => (
                  <span key={text} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cls}`}>
                    <CheckCircle2 className="size-3.5" />
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: 3 Sector Cards stacked */}
            <div className="flex flex-col gap-4">
              <Link href="/linh-vuc/ktn-tech"
                className="group flex items-center gap-5 rounded-2xl bg-cyan p-5 text-white shadow-xl shadow-cyan/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/20">
                  <MonitorCog className="size-7" />
                </div>
                <div className="flex-1">
                  <p className="text-xl font-black">Công nghệ &amp; Chuyển đổi số</p>
                  <p className="mt-0.5 text-sm text-white/70">Website · Phần mềm · Tự động hóa</p>
                </div>
                <ArrowRight className="size-5 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link href="/linh-vuc/ktn-solar"
                className="group flex items-center gap-5 rounded-2xl bg-orange p-5 text-white shadow-xl shadow-orange/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:ml-8">
                <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/20">
                  <SunMedium className="size-7" />
                </div>
                <div className="flex-1">
                  <p className="text-xl font-black">Điện mặt trời</p>
                  <p className="mt-0.5 text-sm text-white/70">Gia đình · Doanh nghiệp · Nhà xưởng</p>
                </div>
                <ArrowRight className="size-5 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>

              <Link href="/linh-vuc/ktn-build"
                className="group flex items-center gap-5 rounded-2xl bg-yellow p-5 text-amber-950 shadow-xl shadow-yellow/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl lg:ml-4">
                <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-black/10">
                  <Building2 className="size-7" />
                </div>
                <div className="flex-1">
                  <p className="text-xl font-black">Xây dựng &amp; Cải tạo</p>
                  <p className="mt-0.5 text-sm text-amber-800">Nhà ở · Văn phòng · Hạ tầng</p>
                </div>
                <ArrowRight className="size-5 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Band */}
        <div className="bg-navy">
          <div className="site-container grid grid-cols-3 divide-x divide-white/10 py-8">
            <div className="flex flex-col items-center gap-1 px-4 text-center sm:flex-row sm:gap-4 sm:px-6 sm:text-left">
              <Layers3 className="size-7 shrink-0 text-cyan" />
              <div>
                <p className="text-2xl font-black text-cyan sm:text-3xl">03</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">Lĩnh vực chuyên sâu</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 px-4 text-center sm:flex-row sm:gap-4 sm:px-6 sm:text-left">
              <ClipboardCheck className="size-7 shrink-0 text-orange" />
              <div>
                <p className="text-2xl font-black text-orange sm:text-3xl">100%</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">Phạm vi minh bạch</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 px-4 text-center sm:flex-row sm:gap-4 sm:px-6 sm:text-left">
              <Handshake className="size-7 shrink-0 text-yellow" />
              <div>
                <p className="text-2xl font-black text-yellow sm:text-3xl">24/7</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">Phản hồi &amp; Hỗ trợ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SECTORS ── */}
      <section className="section-shell bg-slate-50">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Lĩnh vực hoạt động</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
                Ba lĩnh vực – Một năng lực kết nối đồng bộ
              </h2>
            </div>
            <Button asChild variant="outline" className="border-navy/30 font-extrabold text-navy hover:bg-navy hover:text-white">
              <Link href="/linh-vuc">Xem chi tiết dịch vụ <ArrowRight className="size-4" /></Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-2 bg-cyan" />
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-cyan text-white shadow-md shadow-cyan/30">
                    <MonitorCog className="size-7" />
                  </div>
                  <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-cyan">Giải pháp công nghệ</span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-navy">Công nghệ</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  Tư vấn, xây dựng website doanh nghiệp, ứng dụng quản lý và chuyển đổi số quy trình vận hành tối ưu.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-bold text-slate-700">
                  {["Website & Web App doanh nghiệp", "Phần mềm quản lý quy trình", "Tự động hóa & Tích hợp hệ thống"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-full bg-cyan" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-slate-100 pt-4">
                  <Link href="/linh-vuc/ktn-tech" className="inline-flex items-center gap-2 text-sm font-extrabold text-cyan hover:underline">
                    Tìm hiểu thêm <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="h-2 bg-orange" />
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-orange text-white shadow-md shadow-orange/30">
                    <SunMedium className="size-7" />
                  </div>
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-orange">Điện mặt trời</span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-navy">Năng lượng</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  Khảo sát, thiết kế và lắp đặt hệ thống điện mặt trời mái nhà cho hộ gia đình và nhà xưởng doanh nghiệp.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-bold text-slate-700">
                  {["Điện mặt trời mái nhà gia đình", "Điện mặt trời doanh nghiệp, nhà xưởng", "Bảo trì & Tối ưu hiệu suất pin"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-full bg-orange" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-slate-100 pt-4">
                  <Link href="/linh-vuc/ktn-solar" className="inline-flex items-center gap-2 text-sm font-extrabold text-orange hover:underline">
                    Tìm hiểu thêm <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl md:col-span-2 lg:col-span-1">
              <div className="h-2 bg-yellow" />
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-yellow text-amber-900 shadow-md shadow-yellow/30">
                    <Building2 className="size-7" />
                  </div>
                  <span className="rounded-full bg-yellow/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-900">Thi công &amp; Cải tạo</span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-navy">Xây dựng &amp; Cải tạo</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  Thi công, cải tạo nâng cấp không gian nhà ở, văn phòng và hạ tầng kỹ thuật với tiến độ chuẩn xác.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-bold text-slate-700">
                  {["Thi công nhà ở & Văn phòng", "Cải tạo & Sửa chữa công trình", "Thi công hạ tầng kỹ thuật"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-full bg-yellow-500" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-slate-100 pt-4">
                  <Link href="/linh-vuc/ktn-build" className="inline-flex items-center gap-2 text-sm font-extrabold text-amber-800 hover:underline">
                    Tìm hiểu thêm <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CORE VALUES ── */}
      <section className="section-shell bg-white">
        <div className="site-container">
          <div className="mb-14 text-center">
            <p className="section-kicker justify-center">Giá trị cốt lõi</p>
            <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
              Năm giá trị định hướng mọi hoạt động
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500">
              Không phải khẩu hiệu — đây là cách chúng tôi thực sự làm việc với từng khách hàng, từng dự án.
            </p>
          </div>

          {/*
            6-col grid trick:
            Row 1: 3 cards × col-span-2 = fills 6 cols
            Row 2: 1 hidden spacer + 2 cards × col-span-2 = fills 5 cols (col 6 empty → centered)
          */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {coreValues.slice(0, 3).map((v) => (
              <div
                key={v.title}
                className="group flex flex-col items-center rounded-3xl bg-slate-50 p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl lg:col-span-2"
              >
                {/* Outer glow ring */}
                <div className={`mb-6 rounded-full p-3 ${v.glow} transition duration-300 group-hover:scale-105`}>
                  {/* Circle */}
                  <div className={`relative grid size-24 place-items-center rounded-full ${v.circleBg} shadow-xl ${v.circleShadow}`}>
                    <v.Icon className={`size-10 ${v.iconColor}`} />
                    {/* Number badge */}
                    <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-white text-[11px] font-black text-navy shadow-md">
                      {v.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-navy">{v.title}</h3>
                <div className={`mx-auto mt-2 h-0.5 w-12 rounded-full ${v.bar}`} />
                <p className="mt-4 text-sm leading-7 text-slate-600">{v.description}</p>
              </div>
            ))}

            {/* Spacer to center the last 2 cards */}
            <div className="hidden lg:block" />

            {coreValues.slice(3).map((v) => (
              <div
                key={v.title}
                className="group flex flex-col items-center rounded-3xl bg-slate-50 p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl lg:col-span-2"
              >
                <div className={`mb-6 rounded-full p-3 ${v.glow} transition duration-300 group-hover:scale-105`}>
                  <div className={`relative grid size-24 place-items-center rounded-full ${v.circleBg} shadow-xl ${v.circleShadow}`}>
                    <v.Icon className={`size-10 ${v.iconColor}`} />
                    <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-white text-[11px] font-black text-navy shadow-md">
                      {v.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-navy">{v.title}</h3>
                <div className={`mx-auto mt-2 h-0.5 w-12 rounded-full ${v.bar}`} />
                <p className="mt-4 text-sm leading-7 text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-navy/30 font-bold text-navy hover:bg-navy hover:text-white">
              <Link href="/gioi-thieu">Tìm hiểu về chúng tôi <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 4. PROCESS ── */}
      <section className="section-shell bg-slate-50">
        <div className="site-container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-kicker justify-center">Cách làm việc</p>
            <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
              Quy trình 4 bước chuẩn hóa
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Minh bạch từng giai đoạn để khách hàng luôn chủ động và an tâm kiểm soát tiến độ.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => {
              const c = stepColors[idx];
              return (
                <div key={step.number} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className={`h-1.5 ${c.bar}`} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className={`text-5xl font-black ${c.num}`}>{step.number}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${c.badge}`}>{step.tag}</span>
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

      {/* ── 5. PROJECTS ── */}
      <section className="relative overflow-hidden bg-[#0E2356] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-cyan/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-16 right-0 size-96 rounded-full bg-orange/10 blur-3xl" aria-hidden />
        <div className="site-container relative">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker !text-cyan">Dự án thực tế</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold sm:text-4xl">
                Công trình &amp; Giải pháp đã triển khai
              </h2>
            </div>
            <Button asChild variant="outline" className="border-white/30 bg-white/5 font-bold text-white hover:bg-white hover:text-navy">
              <Link href="/du-an">Xem tất cả dự án <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-6 text-slate-800">
              <EmptyState title="Chưa đăng dự án" description="Dự án thực tế sẽ được hiển thị sau khi được xuất bản trong hệ thống." />
            </div>
          )}
        </div>
      </section>

      {/* ── 6. NEWS ── */}
      <section className="section-shell bg-white">
        <div className="site-container">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Tin tức &amp; Hoạt động</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Thông tin mới nhất</h2>
            </div>
            <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-navy">
              Xem tất cả bài viết <ArrowRight className="size-4" />
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState title="Chưa có bài viết" description="Bài viết sẽ hiển thị sau khi được phát hành trong hệ thống." />
          )}
        </div>
      </section>

      {/* ── 7. CONTACT FORM ── */}
      <section id="tu-van" className="section-shell bg-slate-50">
        <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div className="space-y-6">
            <div>
              <p className="section-kicker">Kết nối trực tiếp</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold text-navy sm:text-4xl">
                Gửi yêu cầu – Đội ngũ tư vấn tận tâm
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Hãy chia sẻ sơ bộ nhu cầu của anh/chị. Đội ngũ sẽ liên hệ trực tiếp để tư vấn,
                khảo sát và lập phương án phù hợp.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="font-extrabold text-navy">Cam kết bảo mật thông tin:</h3>
              <ul className="mt-3 space-y-2.5 text-xs font-bold text-slate-600">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-4 shrink-0 text-cyan" />
                  <span>Thông tin đăng ký được bảo mật tuyệt đối</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock3 className="size-4 shrink-0 text-orange" />
                  <span>Tư vấn &amp; Khảo sát không phát sinh chi phí</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "03", label: "Lĩnh vực", cls: "text-cyan" },
                { value: "100%", label: "Minh bạch", cls: "text-orange" },
                { value: "24/7", label: "Hỗ trợ", cls: "text-yellow" },
              ].map(({ value, label, cls }) => (
                <div key={label} className="rounded-2xl bg-navy p-4 text-center">
                  <p className={`text-xl font-black sm:text-2xl ${cls}`}>{value}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-white/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

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
