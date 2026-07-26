import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Users,
  Building2,
  Zap,
} from "lucide-react";
import { RecruitmentForm } from "@/components/forms/recruitment-form";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Tuyển dụng & Cơ hội nghề nghiệp",
  description: "Gia nhập Công ty Cổ phần KTN - Cùng phát triển trong các lĩnh vực Công nghệ, Năng lượng mặt trời và Xây dựng cải tạo.",
  path: "/tuyen-dung",
});

const openPositions = [
  {
    title: "Kỹ sư Lập trình Full-stack / Web Developer",
    department: "Lĩnh vực Công nghệ",
    sectorColor: "text-cyan bg-cyan/10 border-cyan/20",
    icon: Building2,
    location: "TP. Hồ Chí Minh / Hybrid",
    type: "Toàn thời gian",
    experience: "1 - 3 năm kinh nghiệm",
    description:
      "Tham gia phát triển các ứng dụng web, hệ thống phần mềm quản lý doanh nghiệp và công cụ tự động hóa quy trình cho khách hàng của KTN.",
    requirements: [
      "Thành thạo React / Next.js, TypeScript, Tailwind CSS, RESTful API",
      "Có tư duy thiết kế giao diện sạch, tối ưu hiệu năng và trải nghiệm người dùng",
      "Kỹ năng giải quyết vấn đề tốt, chủ động học hỏi công nghệ mới",
    ],
  },
  {
    title: "Kỹ sư Thiết kế & Giám sát Điện mặt trời",
    department: "Lĩnh vực Năng lượng",
    sectorColor: "text-orange bg-orange/10 border-orange/20",
    icon: Zap,
    location: "TP. Hồ Chí Minh & Công trình",
    type: "Toàn thời gian",
    experience: "1 - 2 năm kinh nghiệm",
    description:
      "Khảo sát địa hình, thiết kế bản vẽ hệ thống điện mặt trời (Hộ gia đình & Doanh nghiệp) và giám sát thi công lắp đặt đạt chuẩn kỹ thuật.",
    requirements: [
      "Tốt nghiệp đại học/cao đẳng chuyên ngành Điện, Điện tử, Năng lượng tái tạo",
      "Sử dụng thành thạo AutoCAD, phần mềm mô phỏng (PVsyst, PVSOL)",
      "Cẩn thận, có khả năng đi công tác ngắn ngày theo dự án",
    ],
  },
  {
    title: "Kỹ sư Giám sát Thi công & Cải tạo Công trình",
    department: "Lĩnh vực Xây dựng & Cải tạo",
    sectorColor: "text-amber-800 bg-amber-500/10 border-amber-500/20",
    icon: Briefcase,
    location: "TP. Hồ Chí Minh",
    type: "Toàn thời gian",
    experience: "2+ năm kinh nghiệm",
    description:
      "Quản lý, giám sát chất lượng và tiến độ thi công các dự án cải tạo, sửa chữa nhà ở, văn phòng và công trình thương mại.",
    requirements: [
      "Tốt nghiệp chuyên ngành Xây dựng Dân dụng & Công nghiệp",
      "Am hiểu quy trình khảo sát, lập dự toán vật tư và biện pháp thi công",
      "Kỹ năng quản lý đội thợ, giao tiếp tốt với chủ đầu tư",
    ],
  },
  {
    title: "Chuyên viên Tư vấn Giải pháp & Kinh doanh",
    department: "Kinh doanh & Phát triển dự án",
    sectorColor: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20",
    icon: Users,
    location: "TP. Hồ Chí Minh",
    type: "Toàn thời gian",
    experience: "Không yêu cầu (được đào tạo)",
    description:
      "Tìm kiếm, tiếp cận và tư vấn giải pháp Công nghệ, Năng lượng mặt trời hoặc Cải tạo công trình cho khách hàng doanh nghiệp và hộ gia đình.",
    requirements: [
      "Giao tiếp tự tin, đàm phán tốt, tinh thần trách nhiệm cao",
      "Yêu thích công nghệ, năng lượng sạch và kiến trúc xây dựng",
      "Ưu tiên ứng viên có kinh nghiệm tư vấn b2b hoặc dịch vụ kỹ thuật",
    ],
  },
];

const benefits = [
  {
    title: "Môi trường thực tế & Linh hoạt",
    description: "Tập trung vào hiệu quả công việc thực tế, khuyến khích tư duy chủ động và sáng tạo giải pháp.",
    icon: Rocket,
    color: "text-cyan bg-cyan/10 border-cyan/20",
  },
  {
    title: "Thu nhập & Thưởng xứng đáng",
    description: "Lương cạnh tranh + Thưởng dự án hấp dẫn theo kết quả hoàn thành và giá trị đóng góp.",
    icon: HeartHandshake,
    color: "text-orange bg-orange/10 border-orange/20",
  },
  {
    title: "Đào tạo & Phát triển",
    description: "Cơ hội tiếp cận kiến thức chuyên sâu cả 3 lĩnh vực Công nghệ, Điện mặt trời và Xây dựng.",
    icon: GraduationCap,
    color: "text-yellow bg-yellow/20 border-yellow/30",
  },
  {
    title: "Chế độ & Đãi ngộ đầy đủ",
    description: "Bảo hiểm xã hội, nghỉ lễ tết, du lịch hàng năm và trang thiết bị làm việc hiện đại.",
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
];

export default function RecruitmentPage() {
  return (
    <>
      <PageHero
        title="Tuyển dụng & Cơ hội phát triển sự nghiệp"
        description="Gia nhập KTN để cùng xây dựng những giải pháp thiết thực, đồng bộ và giàu giá trị cho khách hàng & cộng đồng."
        breadcrumbs={[{ label: "Tuyển dụng" }]}
      />

      {/* WHY JOIN KTN */}
      <section className="section-shell bg-slate-50/70">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan">
              Văn hóa &amp; Môi trường làm việc
            </span>
            <h2 className="text-3xl font-black text-navy sm:text-4xl">
              Vì sao bạn nên chọn đồng hành cùng KTN?
            </h2>
            <p className="text-sm text-slate-600 leading-6">
              Tại KTN, chúng tôi trân trọng năng lực thực chất, đề cao tinh thần hợp tác đồng đội và tạo điều kiện tối đa để mỗi cá nhân bứt phá giới hạn.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ title, description, icon: Icon, color }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-1"
              >
                <div className={`grid size-12 place-items-center rounded-2xl border ${color}`}>
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-extrabold text-navy text-lg">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="section-shell bg-white" id="vi-tri-tuyen-dung">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange">
                Cơ hội việc làm
              </span>
              <h2 className="mt-2 text-3xl font-black text-navy sm:text-4xl">
                Vị trí đang tuyển dụng
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Ứng tuyển trực tiếp bằng cách gửi CV về email tuyển dụng hoặc liên hệ hotline để nhận tư vấn chi tiết về từng vị trí.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {openPositions.map((pos) => (
              <div
                key={pos.title}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold ${pos.sectorColor}`}>
                      {pos.department}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="size-3.5 text-slate-400" /> {pos.type}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-extrabold text-navy">{pos.title}</h3>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-slate-400" /> {pos.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-3.5 text-slate-400" /> {pos.experience}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-slate-600">{pos.description}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-navy">Yêu cầu cơ bản:</p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {pos.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400">Ứng tuyển trực tiếp / Nộp CV</span>
                  <Button asChild size="sm" className="bg-orange text-white font-extrabold hover:bg-orange/90">
                    <Link href="#form-ung-tuyen">
                      <Send className="size-3.5 mr-1" /> Nộp hồ sơ ngay
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK APPLICATION FORM SECTION */}
      <section className="section-shell bg-slate-50/80">
        <div className="site-container max-w-4xl">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan">Ứng tuyển nhanh</span>
            <h2 className="text-2xl font-black text-navy sm:text-3xl">Điền thông tin &amp; Tải lên CV của bạn</h2>
            <p className="text-xs text-slate-600">KTN cam kết bảo mật mọi thông tin hồ sơ cá nhân của ứng viên.</p>
          </div>

          <RecruitmentForm />
        </div>
      </section>

      {/* HOW TO APPLY / DIRECT APPLICATION HUB */}
      <section className="section-shell bg-[#0E2356] text-white">
        <div className="site-container max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-12 text-center">
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-cyan/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-orange/20 blur-3xl" aria-hidden="true" />

            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-cyan/20 text-cyan border border-cyan/30">
              <Sparkles className="size-8" />
            </div>

            <h2 className="mt-6 text-2xl font-black sm:text-3xl">
              Chưa tìm thấy vị trí phù hợp với bạn?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Hãy gửi CV hoặc thông tin năng lực của bạn về cho KTN. Chúng tôi luôn sẵn sàng chào đón những nhân sự tài năng, nhiệt huyết muốn đồng hành cùng sự phát triển lâu dài của công ty.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 text-left">
              <a
                href={`mailto:${siteConfig.email}?subject=Hồ sơ ứng tuyển tự do - KTN`}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/15"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-cyan/20 text-cyan shrink-0">
                  <Mail className="size-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan">Gửi CV qua Email</span>
                  <p className="mt-0.5 text-sm font-extrabold text-white group-hover:underline">{siteConfig.email}</p>
                </div>
              </a>

              <a
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/15"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-orange/20 text-orange shrink-0">
                  <MessageCircle className="size-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange">Trao đổi qua Zalo</span>
                  <p className="mt-0.5 text-sm font-extrabold text-white group-hover:underline">{siteConfig.phoneDisplay}</p>
                </div>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 border-t border-white/10 pt-6">
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-orange" /> Hotline tuyển dụng: <strong className="text-white">{siteConfig.phoneDisplay}</strong>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-yellow" /> Địa điểm làm việc: <strong className="text-white">TP. Hồ Chí Minh</strong>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
