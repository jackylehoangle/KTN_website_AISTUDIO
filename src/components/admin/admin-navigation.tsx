"use client";

import Link from "next/link";
import { FileText, FolderKanban, LayoutDashboard, LogOut, Menu, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { logoutAction } from "@/app/admin/auth-actions";

const links = [
  { label: "Tổng quan", href: "/admin", Icon: LayoutDashboard },
  { label: "Dự án", href: "/admin/du-an", Icon: FolderKanban },
  { label: "Bài viết", href: "/admin/bai-viet", Icon: FileText },
];

function NavigationItems({ role }: { role: string }) {
  const items = role === "admin"
    ? [...links, { label: "Khách hàng", href: "/admin/khach-hang", Icon: UsersRound }]
    : links;
  return (
    <nav className="space-y-1" aria-label="Quản trị KTN">
      {items.map(({ label, href, Icon }) => (
        <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-secondary hover:text-primary">
          <Icon className="size-4" /> {label}
        </Link>
      ))}
    </nav>
  );
}

export function AdminNavigation({ name, role }: { name: string; role: string }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-5 lg:flex lg:flex-col">
        <Logo />
        <div className="mt-8 flex-1"><NavigationItems role={role} /></div>
        <div className="border-t pt-4">
          <p className="truncate text-sm font-bold text-navy">{name}</p>
          <p className="mt-0.5 text-xs capitalize text-muted-foreground">{role}</p>
          <form action={logoutAction} className="mt-3">
            <Button type="submit" variant="outline" size="sm" className="w-full"><LogOut /> Đăng xuất</Button>
          </form>
        </div>
      </aside>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
        <Logo className="h-11 w-28" />
        <Sheet>
          <SheetTrigger asChild><Button variant="outline" size="icon" aria-label="Mở menu quản trị"><Menu /></Button></SheetTrigger>
          <SheetContent side="left" className="w-72 p-5">
            <SheetHeader className="text-left">
              <SheetTitle>Quản trị KTN</SheetTitle>
              <SheetDescription>{name}</SheetDescription>
            </SheetHeader>
            <div className="mt-7"><NavigationItems role={role} /></div>
            <form action={logoutAction} className="absolute inset-x-5 bottom-5">
              <Button type="submit" variant="outline" className="w-full"><LogOut /> Đăng xuất</Button>
            </form>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
