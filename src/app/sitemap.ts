import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedPosts, getPublishedProjects } from "@/lib/data/public-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/gioi-thieu",
    "/linh-vuc",
    "/linh-vuc/ktn-tech",
    "/linh-vuc/ktn-solar",
    "/linh-vuc/ktn-build",
    "/tuyen-dung",
    "/tin-tuc",
    "/lien-he",
    "/chinh-sach-bao-mat",
    "/dieu-khoan-su-dung",
  ];

  const [projects, posts] = await Promise.all([getPublishedProjects(), getPublishedPosts()]);
  const now = new Date();

  return [
    ...staticPaths.map((path, index) => ({
      url: new URL(path || "/", siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: index === 0 ? ("weekly" as const) : ("monthly" as const),
      priority: index === 0 ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: new URL(`/du-an/${project.slug}`, siteConfig.url).toString(),
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: new URL(`/tin-tuc/${post.slug}`, siteConfig.url).toString(),
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
