import type { Metadata } from "next";
import { MonitorCog } from "lucide-react";
import { SectorDetailPage } from "@/components/site/sector-detail-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KTN Tech - Giải pháp công nghệ số",
  description: "KTN Tech xây dựng website, ứng dụng quản lý và quy trình tự động hóa phù hợp với doanh nghiệp SME.",
  path: "/linh-vuc/ktn-tech",
});

export default function KtnTechPage() {
  return (
    <SectorDetailPage
      name="KTN Tech"
      title="Công nghệ vừa với doanh nghiệp, giải quyết đúng việc cần làm"
      description="KTN Tech hỗ trợ doanh nghiệp xây dựng các công cụ số dễ sử dụng, có mục tiêu rõ ràng và phù hợp với cách vận hành thực tế."
      Icon={MonitorCog}
      accentClass="bg-cyan text-white"
      services={[
        { title: "Website doanh nghiệp", description: "Thiết kế và xây dựng website giới thiệu, website chuyên ngành hoặc landing page phục vụ kinh doanh." },
        { title: "Ứng dụng quản lý", description: "Xây dựng công cụ quản lý khách hàng, báo giá, công việc, dữ liệu và quy trình nội bộ theo nhu cầu." },
        { title: "Tự động hóa quy trình", description: "Kết nối biểu mẫu, dữ liệu, thông báo và các bước lặp lại để giảm thao tác thủ công phù hợp." },
        { title: "Vận hành hệ thống số", description: "Hỗ trợ tên miền, hosting, bảo mật, sao lưu, theo dõi và xử lý các vấn đề kỹ thuật trong phạm vi thỏa thuận." },
      ]}
      suitableFor={[
        "Doanh nghiệp SME cần website chính thức hoặc website cho một lĩnh vực riêng.",
        "Đội ngũ đang quản lý khách hàng, báo giá hoặc công việc bằng nhiều tệp rời rạc.",
        "Quy trình có thao tác lặp lại và cần kết nối dữ liệu giữa các công cụ.",
        "Doanh nghiệp cần một đầu mối kỹ thuật để duy trì hệ thống số đang sử dụng.",
      ]}
      process={[
        { title: "Khảo sát quy trình", description: "Xác định người dùng, dữ liệu đầu vào, kết quả cần nhận và vấn đề đang gặp." },
        { title: "Thiết kế giải pháp", description: "Đề xuất cấu trúc, chức năng, phạm vi và cách triển khai theo mức độ ưu tiên." },
        { title: "Xây dựng & kiểm thử", description: "Phát triển theo từng phần, kiểm tra trên máy tính và thiết bị di động." },
        { title: "Bàn giao & hỗ trợ", description: "Hướng dẫn sử dụng, bàn giao quyền sở hữu và thống nhất cơ chế bảo trì." },
      ]}
      commitment="KTN Tech không áp dụng một bộ công cụ giống nhau cho mọi doanh nghiệp. Giải pháp chỉ được đề xuất sau khi xác định rõ người dùng, dữ liệu, quy trình và khả năng vận hành của khách hàng."
    />
  );
}
