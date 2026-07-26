import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Dự án - Đang cập nhật",
  description: "Thông tin và hồ sơ dự án thực tế của KTN đang trong quá trình cập nhật và hoàn thiện.",
  path: "/du-an",
});

export const revalidate = 300;

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Dự án KTN"
        title="Thông tin dự án đang được cập nhật"
        description="Hồ sơ năng lực, giải pháp và hình ảnh các dự án thực tế thuộc 3 lĩnh vực Công nghệ, Năng lượng và Xây dựng cải tạo đang trong quá trình tổng hợp."
        breadcrumbs={[{ label: "Dự án" }]}
      />
      <section className="section-shell bg-white">
        <div className="site-container max-w-4xl">
          {/* Main Updating Banner Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 p-8 shadow-lg sm:p-12 text-center">
            <div className="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 size-60 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />

            <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-amber-100 text-amber-700 shadow-sm border border-amber-200/80">
              <Clock className="size-10 animate-pulse" />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-navy sm:text-3xl">
              Nội dung hồ sơ dự án đang được chuẩn bị
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Đội ngũ KTN đang thu thập thông số kỹ thuật, hình ảnh thi công thực tế và tài liệu nghiệm thu từ các công trình đã hoàn thành để công bố minh bạch đến Quý khách hàng &amp; Đối tác.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 text-left">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="grid size-10 place-items-center rounded-xl bg-cyan/10 text-cyan font-bold">
                  01
                </div>
                <h3 className="mt-3 font-extrabold text-navy text-sm">Lĩnh vực Công nghệ</h3>
                <p className="mt-1 text-xs text-slate-500 leading-5">Website doanh nghiệp, ứng dụng quản lý và phần mềm vận hành.</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="grid size-10 place-items-center rounded-xl bg-orange/10 text-orange font-bold">
                  02
                </div>
                <h3 className="mt-3 font-extrabold text-navy text-sm">Lĩnh vực Năng lượng</h3>
                <p className="mt-1 text-xs text-slate-500 leading-5">Dự án điện mặt trời hộ gia đình và hệ thống mái xưởng doanh nghiệp.</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <div className="grid size-10 place-items-center rounded-xl bg-yellow/20 text-amber-900 font-bold">
                  03
                </div>
                <h3 className="mt-3 font-extrabold text-navy text-sm">Xây dựng &amp; Cải tạo</h3>
                <p className="mt-1 text-xs text-slate-500 leading-5">Thi công, sửa chữa nâng cấp không gian nhà ở, văn phòng.</p>
              </div>
            </div>

            {/* Direct Inquiry Action Box */}
            <div className="mt-10 rounded-2xl border border-cyan/20 bg-cyan/5 p-6 sm:p-8">
              <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                <div>
                  <h3 className="font-extrabold text-navy text-lg">Cần tham khảo Hồ sơ năng lực ngay?</h3>
                  <p className="mt-1 text-xs text-slate-600">Liên hệ trực tiếp với KTN để nhận file hồ sơ dự án mẫu và tư vấn giải pháp phù hợp.</p>
                </div>
                <Button asChild size="lg" className="bg-orange font-extrabold text-white shadow-md hover:bg-orange/90 shrink-0">
                  <Link href="/lien-he">
                    Liên hệ tư vấn <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

