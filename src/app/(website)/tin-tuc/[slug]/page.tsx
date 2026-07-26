import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, ExternalLink, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/site/json-ld";
import { MarkdownContent } from "@/components/site/markdown-content";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/lib/data/public-content";
import { absoluteUrl, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const revalidate = 300;

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

function formatFileSize(value: number | null) {
  if (!value) return null;
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return createMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    path: `/tin-tuc/${post.slug}`,
    image: post.cover_url,
    category: "Tin tức KTN",
    type: "article",
    publishedTime: post.published_at || post.created_at,
    modifiedTime: post.updated_at,
  });
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const publishedDate = post.published_at || post.created_at;
  const documentSize = formatFileSize(post.document_size_bytes);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_url || absoluteUrl(siteConfig.ogImage),
    datePublished: publishedDate,
    dateModified: post.updated_at,
    mainEntityOfPage: absoluteUrl(`/tin-tuc/${post.slug}`),
    author: { "@type": "Organization", name: "KTN" },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logo) },
    },
    ...(post.document_url
      ? {
          associatedMedia: {
            "@type": "MediaObject",
            name: post.document_label || post.document_name || "Văn bản đính kèm",
            contentUrl: post.document_url,
            encodingFormat: post.document_mime_type || undefined,
            contentSize: post.document_size_bytes
              ? `${post.document_size_bytes} bytes`
              : undefined,
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="bg-white">
        <header className="bg-secondary py-14 sm:py-20">
          <div className="site-container max-w-4xl">
            <Breadcrumbs items={[{ label: "Tin tức", href: "/tin-tuc" }, { label: post.title }]} />
            <p className="section-kicker mt-8">Tin tức KTN</p>
            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight text-navy sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">{post.excerpt}</p>
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CalendarDays className="size-4 text-cyan" /> {formatDate(publishedDate)}
            </p>
          </div>
        </header>
        <div className="site-container max-w-4xl py-12 sm:py-16">
          {post.cover_url && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-secondary">
              <Image src={post.cover_url} alt={post.title} fill priority sizes="(max-width: 900px) 100vw, 896px" className="object-cover" />
            </div>
          )}
          <MarkdownContent content={post.content} />
          {post.document_url && (
            <aside className="mt-10 rounded-2xl border border-primary/15 bg-secondary/60 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
              <div className="flex min-w-0 items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-white">
                  <FileText className="size-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    Văn bản đính kèm
                  </p>
                  <h2 className="mt-1 text-base font-extrabold text-navy sm:text-lg">
                    {post.document_label || post.document_name || "Tài liệu của bài viết"}
                  </h2>
                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {post.document_name}
                    {documentSize ? ` · ${documentSize}` : ""}
                  </p>
                </div>
              </div>
              <Button asChild className="mt-5 w-full shrink-0 sm:mt-0 sm:w-auto">
                <a href={post.document_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink /> Mở / tải văn bản
                </a>
              </Button>
            </aside>
          )}
        </div>
      </article>
    </>
  );
}
