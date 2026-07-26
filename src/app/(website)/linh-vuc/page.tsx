import type { Metadata } from "next";
import { ArrowRight, Combine, ListChecks, SearchCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SectorCards } from "@/components/site/sector-cards";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Lĩnh vực hoạt động",
  description: "Tổng quan ba lĩnh vực KTN Tech, KTN Solar và KTN Build cùng cách KTN phối hợp giải pháp cho từng nhu cầu.",
  path: "/linh-vuc",
});

export default function SectorsPage() {
  return (
    <>
      <PageHero
        kicker="Lĩnh vực hoạt động"
        title="Ba lĩnh vực, cùng một định hướng phục vụ"
        description="Mỗi lĩnh vực có chuyên môn riêng, nhưng đều bắt đầu từ việc hiểu nhu cầu, đánh giá hiện trạng và lựa chọn phương án có thể triển khai thực tế."
        breadcrumbs={[{ label: "Lĩnh vực" }]}
      />
      <section className="section-shell bg-white">
        <div className="site-container">
          <SectorCards />
        </div>
      </section>
      <section className="section-shell bg-secondary">
        <div className="site-container grid gap-6 lg:grid-cols-3">
          {[
            { Icon: SearchCheck, title: "Tách đúng bài toán", text: "Xác định phần việc thuộc công nghệ, năng lượng hay xây dựng trước khi đưa ra đề xuất." },
            { Icon: Combine, title: "Phối hợp khi cần", text: "Kết nối nhiều lĩnh vực khi một nhu cầu có các hạng mục liên quan, tránh xử lý rời rạc." },
            { Icon: ListChecks, title: "Bàn giao rõ ràng", text: "Thống nhất kết quả, tài liệu và phạm vi hỗ trợ để khách hàng chủ động tiếp nhận vận hành." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-white p-7 shadow-sm">
              <Icon className="size-7 text-primary" />
              <h2 className="mt-5 text-xl font-extrabold text-navy">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="site-container rounded-3xl bg-navy px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Chưa biết nhu cầu thuộc lĩnh vực nào?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-100/80">
            Gửi mô tả ngắn, KTN sẽ phân loại và sắp xếp đúng người trao đổi cùng anh/chị.
          </p>
          <Button asChild size="lg" className="mt-6 bg-orange hover:bg-orange/90">
            <Link href="/lien-he#form-tu-van">Gửi nhu cầu <ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
