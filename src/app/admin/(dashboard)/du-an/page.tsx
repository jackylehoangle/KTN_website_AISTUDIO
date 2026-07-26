import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { FlashMessage } from "@/components/admin/flash-message";
import { deleteProjectAction } from "@/app/admin/content-actions";
import { databaseTables } from "@/config/database";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectRecord } from "@/types/content";

const sectors = { tech: "KTN Tech", solar: "KTN Solar", build: "KTN Build" };

export default async function AdminProjectsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const messages = await searchParams;
  const supabase = await getSupabaseServerClient();
  const { data } = supabase
    ? await supabase.from(databaseTables.projects).select("*").order("updated_at", { ascending: false })
    : { data: [] };
  const projects = (data ?? []) as ProjectRecord[];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-semibold text-primary">Nội dung</p><h1 className="mt-1 text-3xl font-extrabold text-navy">Dự án</h1></div>
        <Button asChild><Link href="/admin/du-an/moi"><Plus /> Thêm dự án</Link></Button>
      </div>
      <div className="mt-6"><FlashMessage saved={messages.saved} deleted={messages.deleted} error={messages.error} /></div>
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <Table>
          <TableHeader><TableRow><TableHead>Dự án</TableHead><TableHead>Lĩnh vực</TableHead><TableHead>Trạng thái</TableHead><TableHead>Cập nhật</TableHead><TableHead className="text-right">Thao tác</TableHead></TableRow></TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-muted-foreground">Chưa có dự án.</TableCell></TableRow>
            ) : projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell><p className="max-w-md font-bold text-navy">{project.title}</p><p className="mt-1 text-xs text-muted-foreground">/{project.slug}</p></TableCell>
                <TableCell>{sectors[project.sector]}</TableCell>
                <TableCell><Badge className={project.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}>{project.status === "published" ? "Công khai" : "Bản nháp"}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Intl.DateTimeFormat("vi-VN").format(new Date(project.updated_at))}</TableCell>
                <TableCell><div className="flex justify-end gap-2">
                  {project.status === "published" && <Button asChild variant="outline" size="icon-sm"><Link href={`/du-an/${project.slug}`} target="_blank" aria-label="Xem dự án"><ExternalLink /></Link></Button>}
                  <Button asChild variant="outline" size="sm"><Link href={`/admin/du-an/${project.id}`}><Pencil /> Sửa</Link></Button>
                  <form action={deleteProjectAction}><input type="hidden" name="id" value={project.id} /><ConfirmSubmitButton /></form>
                </div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
