export const siteConfig = {
  name: "Công ty Cổ phần Công nghệ Năng lượng và Xây dựng KTN",
  shortName: "KTN",
  legalName: "CÔNG TY CỔ PHẦN CÔNG NGHỆ NĂNG LƯỢNG VÀ XÂY DỰNG KTN",
  description:
    "KTN cung cấp giải pháp công nghệ, năng lượng mặt trời và xây dựng theo hướng thực tế, đồng bộ và phù hợp nhu cầu vận hành của khách hàng.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.congtyktn.vn",
  ogImage: "/brand/ktn-logo.png",
  logo: "/brand/ktn-logo.png",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "0877008216",
  phoneDisplay: "0877 008 216",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "admin@congtyktn.vn",
  address:
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS ??
    "998 Phạm Văn Đồng, P. Hiệp Bình, TP. Hồ Chí Minh",
  zaloUrl: process.env.NEXT_PUBLIC_ZALO_URL ?? "https://zalo.me/0877008216",
} as const;

export const mainNavigation = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Lĩnh vực", href: "/linh-vuc" },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
] as const;

export const sectors = [
  {
    key: "tech",
    name: "Công nghệ",
    href: "/linh-vuc/ktn-tech",
    tagline: "Giải pháp công nghệ số cho doanh nghiệp",
    description:
      "Xây dựng website, ứng dụng quản lý và quy trình tự động hóa phù hợp với nhu cầu thực tế của doanh nghiệp SME.",
  },
  {
    key: "solar",
    name: "Năng lượng",
    href: "/linh-vuc/ktn-solar",
    tagline: "Giải pháp điện mặt trời phù hợp nhu cầu",
    description:
      "Tư vấn, thiết kế, thi công và hỗ trợ vận hành hệ thống điện mặt trời cho hộ gia đình và doanh nghiệp.",
  },
  {
    key: "build",
    name: "Xây dựng và cải tạo",
    href: "/linh-vuc/ktn-build",
    tagline: "Xây dựng, cải tạo và sửa chữa",
    description:
      "Khảo sát, thiết kế và thi công công trình nhà ở, văn phòng cùng các hạng mục cải tạo, sửa chữa thực tế.",
  },
] as const;
