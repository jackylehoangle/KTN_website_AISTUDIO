import type { Metadata } from "next";
import { SunMedium } from "lucide-react";
import { SectorDetailPage } from "@/components/site/sector-detail-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KTN Solar - Giải pháp điện mặt trời",
  description: "KTN Solar tư vấn, thiết kế, thi công và hỗ trợ vận hành hệ thống điện mặt trời cho hộ gia đình và doanh nghiệp.",
  path: "/linh-vuc/ktn-solar",
});

export default function KtnSolarPage() {
  return (
    <SectorDetailPage
      name="KTN Solar"
      title="Giải pháp điện mặt trời dựa trên nhu cầu sử dụng thực tế"
      description="KTN Solar khảo sát hiện trạng, phân tích nhu cầu điện và đề xuất cấu hình phù hợp thay vì chỉ lựa chọn hệ thống theo công suất danh nghĩa."
      Icon={SunMedium}
      accentClass="bg-orange text-white"
      services={[
        { title: "Khảo sát & tư vấn", description: "Thu thập nhu cầu điện, hiện trạng mái, hệ thống điện và mục tiêu đầu tư của khách hàng." },
        { title: "Thiết kế hệ thống", description: "Lựa chọn phương án, cấu hình thiết bị, bố trí và hồ sơ kỹ thuật phù hợp cho từng công trình." },
        { title: "Thi công lắp đặt", description: "Tổ chức lắp đặt phần pin, khung, điện DC/AC, bảo vệ và kết nối hệ thống theo thiết kế." },
        { title: "Theo dõi & bảo trì", description: "Hướng dẫn giám sát sản lượng, kiểm tra vận hành và hỗ trợ bảo trì theo thỏa thuận." },
      ]}
      suitableFor={[
        "Hộ gia đình muốn sử dụng điện mặt trời để hỗ trợ giảm chi phí điện ban ngày.",
        "Cơ sở kinh doanh hoặc doanh nghiệp có tải điện ổn định trong giờ nắng.",
        "Công trình cần đánh giá phương án hòa lưới, bám tải hoặc có lưu trữ.",
        "Hệ thống đang vận hành cần kiểm tra, bảo trì hoặc đánh giá lại hiệu quả.",
      ]}
      process={[
        { title: "Thu thập dữ liệu", description: "Xem hóa đơn điện, thời gian sử dụng tải, diện tích mái và điều kiện đấu nối." },
        { title: "Khảo sát hiện trường", description: "Kiểm tra mái, hướng nắng, tủ điện, đường cáp và các điều kiện an toàn liên quan." },
        { title: "Thiết kế & báo giá", description: "Lập phương án kỹ thuật, phạm vi vật tư, chi phí và các giả định tính toán." },
        { title: "Thi công & nghiệm thu", description: "Lắp đặt, kiểm tra, hướng dẫn giám sát và bàn giao hồ sơ thuộc phạm vi công việc." },
      ]}
      commitment="KTN Solar không đưa ra cam kết sản lượng hay thời gian hoàn vốn khi chưa có đủ dữ liệu khảo sát. Các con số dự kiến phải đi kèm giả định rõ ràng về bức xạ, tải tiêu thụ và điều kiện công trình."
    />
  );
}
