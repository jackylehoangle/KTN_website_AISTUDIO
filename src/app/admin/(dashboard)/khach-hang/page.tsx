import Link from "next/link";
import { Paperclip } from "lucide-react";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlashMessage } from "@/components/admin/flash-message";
import { updateLeadStatusAction } from "@/app/admin/content-actions";
import { databaseTables, storageBuckets } from "@/config/database";
import { getCurrentAdmin, getSupabaseServerClient } from "@/lib/supabase/server";
import type { LeadRecord } from "@/types/content";

type LeadWithFiles = LeadRecord & { lead_attachments: { storage_path: string; original_name: string }[] };
const sectorLabels = { tech: "KTN Tech", solar: "KTN Solar", build: "KTN Build" };
const statusLabels = { new: "Mới", contacted: "Đã liên hệ", resolved: "Đã xử lý" };

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const messages = await searchParams;
  const [admin, supabase] = await Promise.all([getCurrentAdmin(), getSupabaseServerClient()]);
  if (!admin || !supabase) redirect("/admin/login");
  if (admin.profile.role !== "admin") redirect("/admin");

  const { data } = await supabase
    .from(databaseTables.leads)
    .select(`*, lead_attachments:${databaseTables.leadAttachments}(storage_path, original_name)`)
    .order("created_at", { ascending: false })
    .limit(100);
  const leads = (data ?? []) as LeadWithFiles[];
  const fileUrls = new Map<string, string>();
  await Promise.all(leads.flatMap((lead) => lead.lead_attachments.map(async (file) => {
    const { data: signed } = await supabase.storage.from(storageBuckets.leadAttachments).createSignedUrl(file.storage_path, 600);
    if (signed?.signedUrl) fileUrls.set(file.storage_path, signed.signedUrl);
  })));

  return (
    <div>
      <p className="text-sm font-semibold text-primary">CRM</p>
      <h1 className="mt-1 text-3xl font-extrabold text-navy">Yêu cầu khách hàng</h1>
      <p className="mt-2 text-sm text-muted-foreground">Hiển thị tối đa 100 yêu cầu gần nhất.</p>
      <div className="mt-6"><FlashMessage updated={messages.updated} error={messages.error} /></div>
      <div className="space-y-4">
        {leads.length === 0 ? (
          <div className="rounded-2xl border bg-white py-20 text-center text-sm text-muted-foreground">Chưa có yêu cầu khách hàng.</div>
        ) : leads.map((lead) => (
          <article key={lead.id} className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-extrabold text-navy">{lead.full_name}</h2>
                  <Badge className={lead.status === "new" ? "bg-orange/10 text-orange" : lead.status === "contacted" ? "bg-primary/10 text-primary" : "bg-emerald-100 text-emerald-800"}>{statusLabels[lead.status]}</Badge>
                  <Badge variant="outline">{sectorLabels[lead.sector]}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold"><a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a>{lead.email && <> · <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a></>}</p>
                <p className="mt-1 text-sm text-muted-foreground">{lead.province}{lead.address ? ` · ${lead.address}` : ""}</p>
              </div>
              <form action={updateLeadStatusAction} className="flex gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <select name="status" defaultValue={lead.status} className="h-10 rounded-lg border bg-white px-3 text-sm">
                  <option value="new">Mới</option><option value="contacted">Đã liên hệ</option><option value="resolved">Đã xử lý</option>
                </select>
                <Button type="submit" size="sm">Cập nhật</Button>
              </form>
            </div>
            <div className="mt-5 rounded-xl bg-secondary/70 p-4 text-sm leading-7 whitespace-pre-wrap">{lead.message}</div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex flex-wrap gap-3">
                <span>Kênh mong muốn: {lead.preferred_channel}</span>
                {lead.lead_attachments.map((file) => fileUrls.get(file.storage_path) ? (
                  <Link key={file.storage_path} href={fileUrls.get(file.storage_path)!} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"><Paperclip className="size-3.5" /> {file.original_name}</Link>
                ) : null)}
              </div>
              <time>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(lead.created_at))}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
