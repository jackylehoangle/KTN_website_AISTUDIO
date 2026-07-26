import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

interface PageHeroProps {
  kicker?: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({ kicker = "KTN", title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/80 py-16 sm:py-20 border-b border-slate-100">
      {/* KTN Ambient Logo Brand Flares */}
      <div className="pointer-events-none absolute -right-16 -top-20 size-80 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/3 -bottom-20 size-72 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute left-10 top-1/2 size-60 rounded-full bg-yellow/10 blur-3xl" aria-hidden="true" />

      <div className="site-container relative">
        <Breadcrumbs items={breadcrumbs} />
        <p className="section-kicker mt-7">{kicker}</p>
        <h1 className="mt-4 max-w-4xl text-balance text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
