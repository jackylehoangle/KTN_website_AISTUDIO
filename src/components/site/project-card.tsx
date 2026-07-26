import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, MonitorCog, SunMedium } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectWithCover } from "@/lib/data/public-content";

const sectorMeta = {
  tech: { label: "KTN Tech", Icon: MonitorCog, className: "bg-cyan text-white shadow-sm shadow-cyan/30" },
  solar: { label: "KTN Solar", Icon: SunMedium, className: "bg-orange text-white shadow-sm shadow-orange/30" },
  build: { label: "KTN Build", Icon: Building2, className: "bg-yellow text-navy shadow-sm shadow-yellow/30 font-extrabold" },
};

export function ProjectCard({ project }: { project: ProjectWithCover }) {
  const sector = sectorMeta[project.sector];
  const Icon = sector.Icon;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-navy/40 hover:shadow-2xl hover:shadow-navy/10">
      <div>
        <Link href={`/du-an/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
          {project.cover_url ? (
            <Image
              src={project.cover_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-items-center bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-200">
              <div className="text-center text-navy/70">
                <Icon className="mx-auto size-12" />
                <span className="mt-2 block text-xs font-extrabold uppercase tracking-wider">{sector.label}</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
          <Badge className={`absolute left-4 top-4 border-0 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider ${sector.className}`}>
            <Icon className="mr-1.5 size-3.5 inline" /> {sector.label}
          </Badge>
        </Link>
        <div className="p-6">
          {project.location && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange">
              <MapPin className="size-3.5" /> {project.location}
            </div>
          )}
          <h3 className="mt-2.5 line-clamp-2 text-lg font-extrabold leading-snug text-navy transition group-hover:text-primary">
            <Link href={`/du-an/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-600">{project.summary}</p>
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <Link
          href={`/du-an/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-navy transition-all group-hover:text-orange"
        >
          Xem chi tiết dự án <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
