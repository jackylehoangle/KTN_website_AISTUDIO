import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  category?: string;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
}

export function createMetadata({
  title,
  description,
  path,
  image,
  category,
  type = "website",
  publishedTime,
  modifiedTime,
}: MetadataOptions): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const ogApiUrl = new URL("/api/og", siteConfig.url);
  ogApiUrl.searchParams.set("title", title);
  if (description) ogApiUrl.searchParams.set("description", description);
  if (category) ogApiUrl.searchParams.set("category", category);

  const socialImage = image || ogApiUrl.toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "KTN",
      locale: "vi_VN",
      type,
      images: [{ url: socialImage, alt: title }],
      ...(type === "article"
        ? {
            publishedTime: publishedTime ?? undefined,
            modifiedTime: modifiedTime ?? undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
