import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Chính sách bảo mật",
  description: "Chính sách thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân trên website KTN.",
  path: "/chinh-sach-bao-mat",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        kicker="Pháp lý website"
        title="Chính sách bảo mật"
        description="Chính sách này giải thích cách KTN tiếp nhận và xử lý thông tin khi người dùng liên hệ qua website."
        breadcrumbs={[{ label: "Chính sách bảo mật" }]}
      />
      <section className="section-shell bg-white">
        <div className="site-container max-w-4xl">
          <p className="mb-8 text-sm text-muted-foreground">Cập nhật ngày 22/07/2026</p>
          <div className="prose-ktn">
            <h2>1. Phạm vi áp dụng</h2>
            <p>
              Chính sách này áp dụng đối với thông tin được người dùng cung cấp qua website chính thức
              của {siteConfig.name} và các biểu mẫu liên hệ do KTN quản lý.
            </p>

            <h2>2. Thông tin KTN có thể thu thập</h2>
            <p>
              Tùy nội dung người dùng chủ động gửi, KTN có thể tiếp nhận họ tên, số điện thoại, email,
              Tỉnh/Thành phố, địa chỉ, lĩnh vực quan tâm, nội dung cần tư vấn, kênh liên hệ mong muốn
              và tệp đính kèm. Hệ thống cũng có thể ghi nhận thông tin kỹ thuật cần thiết để bảo mật và chống spam.
            </p>

            <h2>3. Mục đích sử dụng</h2>
            <ul>
              <li>Tiếp nhận, phân loại và phản hồi yêu cầu của người dùng.</li>
              <li>Trao đổi, khảo sát hoặc chuẩn bị đề xuất phù hợp với nhu cầu đã gửi.</li>
              <li>Bảo vệ website, phát hiện hành vi gửi biểu mẫu bất thường và xử lý sự cố.</li>
              <li>Thực hiện nghĩa vụ pháp lý khi có yêu cầu hợp lệ từ cơ quan có thẩm quyền.</li>
            </ul>

            <h2>4. Lưu trữ và bảo vệ thông tin</h2>
            <p>
              KTN áp dụng biện pháp kỹ thuật và quản trị phù hợp để hạn chế truy cập trái phép, thất thoát
              hoặc sử dụng sai mục đích. Tệp khách hàng được lưu ở khu vực không công khai và quyền truy cập
              quản trị được kiểm soát bằng tài khoản xác thực.
            </p>

            <h2>5. Chia sẻ thông tin</h2>
            <p>
              KTN không bán thông tin cá nhân. Thông tin chỉ được chia sẻ với nhân sự, đối tác xử lý dữ liệu
              cần thiết cho việc cung cấp dịch vụ hoặc cơ quan có thẩm quyền theo quy định, trong phạm vi phù hợp.
            </p>

            <h2>6. Thời gian lưu trữ</h2>
            <p>
              Thông tin được lưu trong thời gian cần thiết để xử lý yêu cầu, duy trì hồ sơ làm việc, giải quyết
              tranh chấp hoặc đáp ứng nghĩa vụ pháp lý. KTN có thể xóa hoặc ẩn danh dữ liệu khi mục đích lưu trữ không còn.
            </p>

            <h2>7. Quyền của người dùng</h2>
            <p>
              Người dùng có thể yêu cầu KTN xác nhận, cập nhật hoặc xóa thông tin đã cung cấp khi yêu cầu đó phù hợp
              với quy định và không ảnh hưởng đến nghĩa vụ lưu trữ hợp pháp của KTN.
            </p>

            <h2>8. Liên hệ về dữ liệu cá nhân</h2>
            <p>
              Vui lòng liên hệ qua email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> hoặc số điện thoại{" "}
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>. KTN có thể cần xác minh người yêu cầu trước khi xử lý.
            </p>

            <h2>9. Thay đổi chính sách</h2>
            <p>
              KTN có thể điều chỉnh chính sách khi website, quy trình xử lý dữ liệu hoặc yêu cầu pháp lý thay đổi.
              Phiên bản mới sẽ được công bố tại trang này cùng ngày cập nhật.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
