"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavigation, sectors, siteConfig } from "@/config/site";
import { Logo } from "./logo";

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Mở menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[min(90vw,380px)] flex-col overflow-hidden p-0">
        <SheetHeader className="border-b p-5 text-left">
          <SheetTitle className="sr-only">Điều hướng website KTN</SheetTitle>
          <Logo />
          <SheetDescription className="sr-only">
            Danh sách các trang trên website KTN
          </SheetDescription>
        </SheetHeader>
        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 pb-2" aria-label="Điều hướng di động">
          {mainNavigation.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-3 py-3.5 text-base font-semibold text-navy hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
          <div className="my-2 border-t pt-2">
            <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Ba lĩnh vực
            </p>
            {sectors.map((sector) => (
              <SheetClose asChild key={sector.key}>
                <Link
                  href={sector.href}
                  className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary"
                >
                  {sector.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </nav>
        <div className="shrink-0 border-t bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button asChild className="w-full bg-orange hover:bg-orange/90">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone /> Gọi {siteConfig.phoneDisplay}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

