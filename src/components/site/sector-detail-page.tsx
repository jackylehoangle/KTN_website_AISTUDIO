import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "./page-hero";

interface SectorDetailPageProps {
  name: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  accentClass: string;
  services: { title: string; description: string }[];
  suitableFor: string[];
  process: { title: string; description: string }[];
  commitment: string;
}

export function SectorDetailPage({
  name,
  title,
  description,
  Icon,
  accentClass,
  services,
  suitableFor,
  process,
  commitment,
}: SectorDetailPageProps) {
  return (
    <>
      <PageHero
        kicker={name}
        title={title}
        description={description}
        breadcrumbs={[{ label: "Lĩnh vực", href: "/linh-vuc" }, { label: name }]}
      />

      <section className="section-shell bg-slate-50/70">
        <div className="site-container grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-white/20 bg-[#0E2356] p-8 text-white shadow-2xl lg:sticky lg:top-28">
            <div className={`grid size-16 place-items-center rounded-2xl shadow-lg ${accentClass}`}>
              <Icon className="size-8" />
            </div>
            <span className="mt-6 inline-block text-xs font-extrabold uppercase tracking-widest text-cyan">
              Cam kết từ KTN
            </span>
            <h2 className="mt-2 text-2xl font-extrabold">Cách KTN thực hiện</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{commitment}</p>
            <Button asChild size="lg" className="mt-8 w-full bg-orange font-extrabold text-white shadow-lg shadow-orange/20 hover:bg-orange/90">
              <Link href="/lien-he#form-tu-van">Gửi yêu cầu tư vấn <ArrowRight className="size-4" /></Link>
            </Button>
          </div>

          <div>
            <p className="section-kicker">Dịch vụ trọng tâm</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">Phạm vi KTN có thể hỗ trợ</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-xl">
                  <div className="grid size-10 place-items-center rounded-xl bg-cyan/15 text-cyan transition group-hover:scale-110">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-navy">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Đối tượng phù hợp</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">Nhu cầu thực tế hướng đến</h2>
            <ul className="mt-7 space-y-3.5">
              {suitableFor.map((item) => (
                <li key={item} className="flex gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4.5 text-sm leading-6 text-slate-700 shadow-sm transition hover:bg-white hover:border-cyan/40">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cyan" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-kicker">Quy trình thực hiện</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">Các bước triển khai chính</h2>
            <div className="mt-7 space-y-4">
              {process.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-navy/30">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-navy text-sm font-black text-white shadow-md">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-navy">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="site-container overflow-hidden rounded-3xl bg-[#0E2356] px-6 py-12 text-center text-white shadow-2xl sm:px-12 relative">
          <div className="pointer-events-none absolute left-0 top-0 size-80 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 bottom-0 size-80 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />

          <h2 className="relative text-balance text-2xl font-extrabold sm:text-3xl">Cần tư vấn cho dự án của anh/chị?</h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            KTN sẽ khảo sát nhu cầu, làm rõ giải pháp và gửi phương án triển khai cụ thể hoàn toàn không phát sinh chi phí.
          </p>
          <Button asChild size="lg" className="relative mt-8 bg-orange font-extrabold text-white shadow-lg shadow-orange/30 hover:bg-orange/90">
            <Link href="/lien-he#form-tu-van">Nhận tư vấn ngay <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
