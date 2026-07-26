import { MapPin, Navigation, Phone, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function MapSection() {
  const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address
  )}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    siteConfig.address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Bản đồ chỉ đường
            </span>
          </div>
          <h3 className="mt-1 text-xl font-extrabold text-navy sm:text-2xl">
            Văn phòng KTN tại TP. Hồ Chí Minh
          </h3>
        </div>

        <Button asChild variant="outline" className="border-cyan/30 text-cyan hover:bg-cyan hover:text-white font-bold shrink-0">
          <a href={mapDirectionsUrl} target="_blank" rel="noreferrer">
            <Navigation className="size-4 mr-1.5" /> Mở Google Maps <ExternalLink className="size-3.5 ml-1" />
          </a>
        </Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Map iframe */}
        <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-slate-200 shadow-inner bg-slate-100">
          <iframe
            title="Bản đồ KTN"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "340px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full"
          />
        </div>

        {/* Location info box */}
        <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange/15 text-orange font-bold">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Địa chỉ trụ sở</p>
                <p className="mt-1 text-sm font-bold text-navy leading-6">{siteConfig.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan font-bold">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Hotline liên hệ</p>
                <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-base font-extrabold text-navy hover:text-orange">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-6 text-slate-600">
            <p className="font-extrabold text-navy">Hướng dẫn di chuyển:</p>
            <p className="mt-0.5">Nằm trên trục đường chính Phạm Văn Đồng, thuận tiện di chuyển từ Sân bay Tân Sơn Nhất, Quận Bình Thạnh và Thủ Đức.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
