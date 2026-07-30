import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactDock() {
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-30 flex flex-col gap-3 sm:bottom-6 sm:right-6 sm:z-40 sm:gap-3.5 print:hidden">
      <a
        href={siteConfig.zaloUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Liên hệ KTN qua Zalo"
        className="group relative grid size-12 place-items-center rounded-full bg-cyan text-white shadow-xl shadow-cyan/35 transition-all duration-300 hover:scale-110 hover:bg-cyan/90 sm:size-13"
      >
        <span className="absolute -inset-1 animate-ping rounded-full bg-cyan/30" />
        <MessageCircle className="relative size-6 transition group-hover:rotate-12" />
        <span className="pointer-events-none absolute right-15 whitespace-nowrap rounded-xl bg-navy px-3.5 py-2 text-xs font-black text-white opacity-0 shadow-xl transition-all group-hover:opacity-100">
          Chat Zalo với KTN
        </span>
      </a>
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label={`Gọi KTN theo số ${siteConfig.phoneDisplay}`}
        className="group relative grid size-12 place-items-center rounded-full bg-orange text-white shadow-xl shadow-orange/35 transition-all duration-300 hover:scale-110 hover:bg-orange/90 sm:size-13"
      >
        <span className="absolute -inset-1 animate-ping rounded-full bg-orange/30" />
        <Phone className="relative size-6 transition group-hover:rotate-12" />
        <span className="pointer-events-none absolute right-15 whitespace-nowrap rounded-xl bg-navy px-3.5 py-2 text-xs font-black text-white opacity-0 shadow-xl transition-all group-hover:opacity-100">
          Hotline: {siteConfig.phoneDisplay}
        </span>
      </a>
    </div>
  );
}

