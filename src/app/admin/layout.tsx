import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Quản trị KTN", template: "%s | Quản trị KTN" },
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
