import type { Metadata } from "next";
import { Eye, Flag, Handshake, Layers3, Scale, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Giới thiệu",
  description:
    "Tìm hiểu định hướng, tầm nhìn, sứ mệnh và giá trị cốt lõi của Công ty Cổ phần Công nghệ Năng lượng và Xây dựng KTN.",
  path: "/gioi-thieu",
});

const values = [
  { Icon: Scale, title: "Trung thực", text: "Tư vấn dựa trên hiện trạng và nhu cầu thật; nói rõ phần làm được, giới hạn và điều kiện thực hiện." },
  { Icon: ShieldCheck, title: "Trách nhiệm", text: "Theo sát công việc đã nhận, chủ động phối hợp và chịu trách nhiệm trong phạm vi cam kết." },
  { Icon: Layers3, title: "Thực tế", text: "Ưu tiên giải pháp phù hợp nguồn lực, có thể triển khai và vận hành thay vì chạy theo hình thức." },
  { Icon: Handshake, title: "Hợp tác", text: "Tôn trọng khách hàng, đối tác và người thực hiện; lấy sự rõ ràng làm nền tảng phối hợp lâu dài." },
  { Icon: Zap, title: "Năng động", text: "Chủ động cập nhật công nghệ, cách làm mới và phản hồi nhanh với nhu cầu khách hàng; không rập khuôn khi điều đó không còn phù hợp." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Về doanh nghiệp KTN"
        title="Kết nối ba năng lực cốt lõi trong một hệ sinh thái đồng bộ"
        description="KTN hợp nhất công nghệ, năng lượng mặt trời và xây dựng tạo ra các giải pháp hữu ích, đúng nhu cầu và có giá trị sử dụng lâu dài."
        breadcrumbs={[{ label: "Giới thiệu" }]}
      />

      <section className="section-shell bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-kicker">Hành trình KTN</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
              Xây dựng nền tảng từ sự thận trọng &amp; chất lượng thực tế
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              Công ty Cổ phần Công nghệ Năng lượng và Xây dựng KTN hoạt động với ba mảng dịch vụ chuyên sâu:
              <strong className="text-cyan"> KTN Tech</strong>, <strong className="text-orange"> KTN Solar</strong> và <strong className="text-amber-800"> KTN Build</strong>. Đây là những trụ cột phục vụ trực tiếp quá trình hình thành, vận hành và hiện đại hóa cho doanh nghiệp và công trình.
            </p>
            <p>
              KTN lựa chọn hướng đi cẩn trọng: hiểu đúng hiện trạng, xác định phạm vi rõ ràng và tổ chức nguồn lực
              phù hợp cho từng dự án. KTN cam kết tập trung làm thật tốt những gì đã thống nhất với khách hàng.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-slate-50">
        <div className="site-container grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-[#0E2356] p-8 text-white shadow-2xl sm:p-10">
            <div className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
            <div className="grid size-14 place-items-center rounded-2xl bg-cyan text-white shadow-lg shadow-cyan/30">
              <Eye className="size-7" />
            </div>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-widest text-cyan">Tầm nhìn KTN</p>
            <h2 className="mt-2 text-2xl font-extrabold">Đối tác giải pháp đồng bộ &amp; đáng tin cậy</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              KTN hướng tới mô hình doanh nghiệp phát triển bền vững, có năng lực liên kết đa ngành chuyên sâu và được đông đảo đối tác, khách hàng tin tưởng lựa chọn nhờ tính minh bạch và hiệu quả thực tế.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xl sm:p-10">
            <div className="grid size-14 place-items-center rounded-2xl bg-orange text-white shadow-lg shadow-orange/30">
              <Flag className="size-7" />
            </div>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-widest text-orange">Sứ mệnh KTN</p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy">Biến nhu cầu thành sản phẩm &amp; dịch vụ dùng được ngay</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              KTN tư vấn, thiết kế và thi công giải pháp công nghệ, năng lượng mặt trời và xây dựng sát với điều kiện thực tế, góp phần giúp khách hàng tối ưu hóa chi phí và vận hành chủ động hơn.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker justify-center">Giá trị cốt lõi</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">5 Nguyên tắc hành động tại KTN</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {values.map(({ Icon, title, text }, idx) => {
              const borderColors = [
                "border-cyan/30 hover:border-cyan",
                "border-orange/30 hover:border-orange",
                "border-yellow-500/40 hover:border-yellow-500",
                "border-navy/30 hover:border-navy",
                "border-cyan/30 hover:border-orange",
              ][idx];
              const iconBg = [
                "bg-cyan/15 text-cyan",
                "bg-orange/15 text-orange",
                "bg-yellow/20 text-amber-900",
                "bg-navy/10 text-navy",
                "bg-gradient-to-br from-cyan/20 to-orange/20 text-cyan",
              ][idx];

              return (
                <div key={title} className={`group rounded-3xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${borderColors}`}>
                  <div className={`grid size-12 place-items-center rounded-2xl font-bold transition group-hover:scale-110 ${iconBg}`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
