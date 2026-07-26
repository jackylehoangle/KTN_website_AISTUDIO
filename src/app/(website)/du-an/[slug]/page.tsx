import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Building2, CalendarDays, MapPin, UserRound } from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { MarkdownContent } from "@/components/site/markdown-content";
import { PageHero } from "@/components/site/page-hero";
import { getProjectBySlug } from "@/lib/data/public-content";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const revalidate = 300;

const sectorLabels: Record<string, string> = { tech: "Công nghệ", solar: "Năng lượng", build: "Xây dựng & Cải tạo" };

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("vi-VN", { month: "2-digit", year: "numeric" }).format(new Date(value));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Không tìm thấy dự án" };
  return createMetadata({
    title: project.seo_title || project.title,
    description: project.seo_description || project.summary,
    path: `/du-an/${project.slug}`,
    image: project.cover_url,
    category: sectorLabels[project.sector] || "Dự án KTN",
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/du-an/${project.slug}`),
    image: project.cover_url || undefined,
    dateCreated: project.completed_at || project.created_at,
    provider: { "@type": "Organization", name: "KTN", url: absoluteUrl("/") },
  };

  const details = [
    { Icon: Building2, label: "Lĩnh vực", value: sectorLabels[project.sector] },
    { Icon: MapPin, label: "Địa điểm", value: project.location },
    { Icon: UserRound, label: "Khách hàng", value: project.client_name },
    { Icon: CalendarDays, label: "Hoàn thành", value: formatDate(project.completed_at) },
  ].filter((item) => item.value);

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        kicker={sectorLabels[project.sector]}
        title={project.title}
        description={project.summary}
        breadcrumbs={[{ label: "Dự án", href: "/du-an" }, { label: project.title }]}
      />
      <section className="section-shell bg-white">
        <div className="site-container">
          {project.cover_url && (
            <div className="relative mb-10 aspect-[16/8] overflow-hidden rounded-3xl bg-secondary">
              <Image src={project.cover_url} alt={project.title} fill priority sizes="(max-width: 1240px) 100vw, 1216px" className="object-cover" />
            </div>
          )}
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <aside>
              <div className="rounded-2xl border bg-secondary/60 p-6 lg:sticky lg:top-28">
                <h2 className="text-lg font-extrabold text-navy">Thông tin dự án</h2>
                <dl className="mt-5 space-y-5">
                  {details.map(({ Icon, label, value }) => (
                    <div key={label} className="flex gap-3">
                      <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
                        <dd className="mt-1 text-sm font-bold text-foreground">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
            <article>
              <h2 className="mb-5 text-2xl font-extrabold text-navy">Nội dung dự án</h2>
              <MarkdownContent content={project.content} />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
