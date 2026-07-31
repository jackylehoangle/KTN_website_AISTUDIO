import { ContactDock } from "@/components/site/contact-dock";
import { Chatbox } from "@/components/site/chatbox";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    email: siteConfig.email,
    telephone: `+84${siteConfig.phone.slice(1)}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "998 Phạm Văn Đồng, P. Hiệp Bình",
      addressLocality: "Thành phố Hồ Chí Minh",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+84${siteConfig.phone.slice(1)}`,
      contactType: "customer service",
      availableLanguage: "Vietnamese",
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={organizationSchema} />
      <SiteHeader />
      <main className="flex-1 pt-20">{children}</main>
      <SiteFooter />
      <Chatbox />
      <ContactDock />
    </div>
  );
}
