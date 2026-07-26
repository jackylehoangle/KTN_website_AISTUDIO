import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Điều khoản sử dụng",
  description: "Điều khoản áp dụng khi truy cập và sử dụng website chính thức của KTN.",
  path: "/dieu-khoan-su-dung",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        kicker="Pháp lý website"
        title="Điều khoản sử dụng"
        description="Việc truy cập website đồng nghĩa người dùng chấp nhận các nguyên tắc sử dụng được trình bày dưới đây."
        breadcrumbs={[{ label: "Điều khoản sử dụng" }]}
      />
      <section className="section-shell bg-white">
        <div className="site-container max-w-4xl">
          <p className="mb-8 text-sm text-muted-foreground">Cập nhật ngày 22/07/2026</p>
          <div className="prose-ktn">
            <h2>1. Chủ thể vận hành website</h2>
            <p>
              Website được vận hành bởi {siteConfig.name}. Thông tin liên hệ chính thức được công bố tại trang Liên hệ.
            </p>

            <h2>2. Mục đích thông tin</h2>
            <p>
              Nội dung trên website nhằm giới thiệu doanh nghiệp, lĩnh vực hoạt động, dự án, bài viết và phương thức liên hệ.
              Thông tin chung không tự động được xem là báo giá, cam kết kỹ thuật, tư vấn đầu tư hoặc hợp đồng.
            </p>

            <h2>3. Yêu cầu tư vấn và báo giá</h2>
            <p>
              Việc gửi biểu mẫu chỉ là đề nghị KTN liên hệ. Phạm vi công việc, chi phí, tiến độ, thông số kỹ thuật và trách nhiệm
              của các bên chỉ có giá trị khi được thống nhất trong tài liệu hoặc hợp đồng phù hợp.
            </p>

            <h2>4. Trách nhiệm của người dùng</h2>
            <ul>
              <li>Cung cấp thông tin chính xác, hợp pháp và có quyền sử dụng.</li>
              <li>Không tải lên mã độc, nội dung xâm phạm quyền của người khác hoặc tệp không liên quan.</li>
              <li>Không can thiệp, dò quét, phá hoại hoặc sử dụng website theo cách gây ảnh hưởng đến hệ thống.</li>
              <li>Tự đánh giá và xác minh thông tin trước khi đưa ra quyết định quan trọng.</li>
            </ul>

            <h2>5. Quyền sở hữu nội dung</h2>
            <p>
              Logo, bố cục, nội dung do KTN tạo và các tài sản được ghi nhận trên website thuộc quyền của KTN hoặc bên cấp phép.
              Không được sao chép, khai thác thương mại hoặc làm sai lệch khi chưa có sự đồng ý phù hợp.
            </p>

            <h2>6. Liên kết và dịch vụ bên thứ ba</h2>
            <p>
              Website có thể liên kết đến dịch vụ bên thứ ba như bản đồ, email, Zalo hoặc nền tảng lưu trữ. Các dịch vụ đó có
              điều khoản và chính sách riêng; KTN không kiểm soát toàn bộ hoạt động của các nền tảng bên ngoài.
            </p>

            <h2>7. Giới hạn trách nhiệm</h2>
            <p>
              KTN cố gắng duy trì thông tin chính xác và website ổn định nhưng không bảo đảm hệ thống luôn không gián đoạn hoặc
              mọi nội dung đều phù hợp với từng trường hợp cụ thể. Giới hạn này không loại trừ các trách nhiệm bắt buộc theo pháp luật.
            </p>

            <h2>8. Thay đổi điều khoản</h2>
            <p>
              KTN có thể cập nhật điều khoản để phản ánh thay đổi của website, dịch vụ hoặc quy định. Phiên bản hiện hành được
              công bố tại trang này và áp dụng từ ngày cập nhật.
            </p>

            <h2>9. Liên hệ</h2>
            <p>
              Câu hỏi về điều khoản có thể gửi đến <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> hoặc gọi{" "}
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
