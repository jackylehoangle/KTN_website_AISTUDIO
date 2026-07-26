import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { SectorDetailPage } from "@/components/site/sector-detail-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KTN Build - Xây dựng và cải tạo",
  description: "KTN Build khảo sát, thiết kế, thi công xây dựng, cải tạo và sửa chữa nhà ở, văn phòng cùng các công trình phù hợp.",
  path: "/linh-vuc/ktn-build",
});

export default function KtnBuildPage() {
  return (
    <SectorDetailPage
      name="KTN Build"
      title="Xây dựng và cải tạo bám sát hiện trạng công trình"
      description="KTN Build tập trung khảo sát kỹ, làm rõ hạng mục và tổ chức thi công phù hợp để hạn chế phát sinh không cần thiết."
      Icon={Building2}
      accentClass="bg-yellow text-navy"
      services={[
        { title: "Xây dựng công trình", description: "Tổ chức thực hiện các hạng mục xây dựng theo hồ sơ, phạm vi và điều kiện thực tế đã thống nhất." },
        { title: "Cải tạo nhà ở, văn phòng", description: "Điều chỉnh công năng, hoàn thiện không gian và nâng cấp các hạng mục theo nhu cầu sử dụng mới." },
        { title: "Sửa chữa công trình", description: "Khảo sát nguyên nhân và xử lý các hạng mục hư hỏng, xuống cấp trong phạm vi chuyên môn." },
        { title: "Phối hợp hệ thống kỹ thuật", description: "Phối hợp điện, nước và các hạng mục liên quan trong quá trình cải tạo hoặc xây dựng." },
      ]}
      suitableFor={[
        "Gia đình cần xây mới, sửa chữa hoặc thay đổi công năng không gian ở.",
        "Doanh nghiệp cần cải tạo văn phòng, cửa hàng hoặc khu vực làm việc.",
        "Công trình có hạng mục xuống cấp cần khảo sát trước khi lựa chọn cách xử lý.",
        "Nhu cầu cần phối hợp phần xây dựng với điện mặt trời hoặc hệ thống công nghệ.",
      ]}
      process={[
        { title: "Khảo sát hiện trạng", description: "Ghi nhận kích thước, kết cấu nhìn thấy, điều kiện thi công và nhu cầu sử dụng." },
        { title: "Làm rõ hạng mục", description: "Thống nhất công việc, vật tư, phần loại trừ và các điều kiện có thể ảnh hưởng." },
        { title: "Lập phương án", description: "Chuẩn bị giải pháp, dự toán và kế hoạch thi công phù hợp với phạm vi." },
        { title: "Thi công & nghiệm thu", description: "Tổ chức thực hiện, kiểm tra chất lượng và bàn giao theo các hạng mục đã thống nhất." },
      ]}
      commitment="KTN Build ưu tiên khảo sát và làm rõ phạm vi trước khi báo giá. Các điều kiện chưa thể quan sát hoặc hạng mục có nguy cơ phát sinh sẽ được nêu rõ để hai bên cùng kiểm soát."
    />
  );
}
