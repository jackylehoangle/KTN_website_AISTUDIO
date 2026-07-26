import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Liên hệ",
  description: "Liên hệ KTN hoặc gửi yêu cầu tư vấn về giải pháp Công nghệ, Năng lượng và Xây dựng cải tạo qua biểu mẫu bảo mật.",
  path: "/lien-he",
});

export default function ContactPage() {
  const contacts = [
    { Icon: Phone, title: "Hotline Điện thoại", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}`, color: "bg-orange/10 text-orange border-orange/20" },
    { Icon: MessageCircle, title: "Chat Zalo Trực tuyến", value: siteConfig.phoneDisplay, href: siteConfig.zaloUrl, color: "bg-cyan/10 text-cyan border-cyan/20" },
    { Icon: Mail, title: "Hộp thư Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: "bg-primary/10 text-primary border-primary/20" },
    { Icon: MapPin, title: "Địa chỉ văn phòng", value: siteConfig.address, href: null, color: "bg-yellow/20 text-amber-900 border-yellow/30" },
  ];

  return (
    <>
      <PageHero
        kicker="Liên hệ KTN"
        title="Trực tiếp kết nối – Trao đổi nhu cầu nhanh chóng"
        description="Quý khách có thể gọi trực tiếp hoặc để lại thông tin. KTN sẵn sàng lắng nghe, khảo sát và phản hồi phương án triển khai thích hợp."
        breadcrumbs={[{ label: "Liên hệ" }]}
      />

      <section className="section-shell bg-slate-50">
        <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div className="space-y-6">
            <div>
              <p className="section-kicker">Thông tin liên hệ</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy">Đồng hành cùng KTN</h2>
            </div>

            <div className="space-y-3.5">
              {contacts.map(({ Icon, title, value, href, color }) => {
                const content = (
                  <div className="group flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className={`grid size-12 shrink-0 place-items-center rounded-2xl border ${color} transition group-hover:scale-110`}>
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{title}</p>
                      <p className="mt-0.5 text-base font-extrabold text-navy">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
                    {content}
                  </a>
                ) : <div key={title}>{content}</div>;
              })}
            </div>

            {/* Zalo Card Highlight */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan/30 bg-gradient-to-br from-cyan/10 via-cyan/5 to-blue-50 p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cyan text-white shadow-lg shadow-cyan/30">
                  <MessageCircle className="size-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy">Nhắn tin Zalo trực tiếp với KTN</h3>
                  <p className="text-xs text-slate-600 mt-0.5">Phản hồi và tư vấn nhanh trong 15 phút</p>
                </div>
              </div>
              <a
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-cyan/25 transition hover:bg-cyan/90"
              >
                Mở ứng dụng Zalo ngay <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="flex gap-3.5 rounded-3xl border border-orange/20 bg-orange/5 p-5 text-sm leading-6 text-slate-700">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-orange" />
              <p>Thời gian làm việc: 8:00 – 17:30 (Thứ 2 – Thứ 7). Trong trường hợp gấp, vui lòng gọi điện thoại trực tiếp.</p>
            </div>
          </div>

          <div id="form-tu-van" className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-9">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange">Hỗ trợ trực tiếp</span>
              <h2 className="mt-1 text-2xl font-extrabold text-navy">Gửi thông tin tư vấn</h2>
            </div>
            <LeadForm source="contact-page" />
          </div>
        </div>
      </section>
    </>
  );
}
